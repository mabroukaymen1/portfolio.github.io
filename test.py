import os
import time
import re
import hashlib
import math
from collections import Counter

# --- For a better user experience ---
# You need to install these libraries first:
# pip install tqdm colorama
try:
    from tqdm import tqdm
    from colorama import init, Fore, Style
    init(autoreset=True)
except ImportError:
    print("Please install required libraries: pip install tqdm colorama")
    # Define dummy classes and functions if libraries are not found
    class TqdmDummy:
        def __init__(self, iterable=None, **kwargs): self.iterable = iterable
        def __iter__(self): return iter(self.iterable)
        def update(self, n=1): pass
        def close(self): pass
    tqdm = TqdmDummy
    class Fore: pass
    class Style: pass
    for color in ['RED', 'GREEN', 'YELLOW', 'CYAN', 'RESET']: setattr(Fore, color, ''); setattr(Style, color, '')


# --- Configuration ---
CONFIG = {
    # Directories to scan. Use raw strings (r'...') for Windows paths.
    'directories_to_scan': [
        r'C:\Windows\Temp',
        r'C:\Users',
        # r'C:\'  # Caution: Scanning the entire C: drive can be VERY slow.
    ],
    # Directories to exclude from the scan for performance.
    'exclusion_list': [
        r'C:\Windows\WinSxS',
        r'C:\Python',
        r'$Recycle.Bin' # Common pattern for recycle bins on all drives
    ],
    # File extensions often associated with malware.
    'suspicious_extensions': {'.exe', '.dll', '.bat', '.vbs', '.js', '.ps1', '.scr', '.msi'},
    
    # Simple regex for suspicious patterns in filenames.
    'suspicious_patterns': re.compile(r'(mimikatz|powersploit|cobaltstrike|metasploit|hacktool)', re.IGNORECASE),
    
    # A fake "database" of known malicious file hashes (SHA-256).
    # In a real tool, this would be a massive, frequently updated database.
    # The first hash is for the EICAR test file, a standard way to test AV.
    'known_bad_hashes': {
        '275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f',
        'e0934145d8363574944b36024976451e5e6aaf3b56a42a033b8b3986a735c243' # Example of another hash
    },

    # Thresholds for suspicion scoring
    'entropy_threshold': 7.5, # Entropy > 7.5 is highly suspicious (likely packed/encrypted)
    'suspicion_score_threshold': 100,
    'recent_modification_days': 7,
}

# --- Helper Functions ---

def calculate_sha256(file_path):
    """Calculates the SHA-256 hash of a file."""
    sha256_hash = hashlib.sha256()
    try:
        with open(file_path, "rb") as f:
            # Read and update hash in chunks to handle large files
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
            return sha256_hash.hexdigest()
    except (IOError, PermissionError):
        return None # Return None if the file cannot be read

def calculate_entropy(file_path):
    """Calculates the Shannon entropy of a file's content."""
    try:
        with open(file_path, 'rb') as f:
            byte_data = f.read()
        if not byte_data:
            return 0
        
        counts = Counter(byte_data)
        file_len = len(byte_data)
        
        entropy = -sum((count / file_len) * math.log2(count / file_len) for count in counts.values())
        return entropy
    except (IOError, PermissionError):
        return 0 # Return 0 if file cannot be read

def is_excluded(path, exclusion_list):
    """Checks if a path should be excluded from the scan."""
    for exclusion in exclusion_list:
        if exclusion.lower() in path.lower():
            return True
    return False

# --- Main Scanner Function ---

def scan_files():
    """Main function to scan files based on configured heuristics."""
    suspicious_files = []
    current_time = time.time()
    
    # 1. Collect all files to scan first
    all_files = []
    print(Style.BRIGHT + Fore.CYAN + "Collecting files to scan. This may take a moment...")
    for directory in CONFIG['directories_to_scan']:
        print(f"Walking through: {directory}")
        for root, dirs, files in os.walk(directory, topdown=True):
            # Performance: Exclude directories on the fly
            if is_excluded(root, CONFIG['exclusion_list']):
                dirs[:] = [] # Don't descend into subdirectories of an excluded folder
                continue

            for file_name in files:
                file_path = os.path.join(root, file_name)
                if not is_excluded(file_path, CONFIG['exclusion_list']):
                    all_files.append(file_path)

    print(f"Collected {len(all_files)} files. Starting analysis...")
    
    # 2. Analyze collected files with a progress bar
    for file_path in tqdm(all_files, desc="Analyzing files", unit="file", ncols=100):
        try:
            suspicion_score = 0
            reasons = []

            # Basic file info
            file_name = os.path.basename(file_path)
            file_ext = os.path.splitext(file_name)[1].lower()
            file_stats = os.stat(file_path)
            is_hidden = bool(file_stats.st_file_attributes & 2 if os.name == 'nt' else file_name.startswith('.'))
            
            # --- Scoring Logic ---

            # 1. Signature Check (High Confidence)
            file_hash = calculate_sha256(file_path)
            if file_hash in CONFIG['known_bad_hashes']:
                suspicion_score += 1000
                reasons.append(Fore.RED + f"MATCHED KNOWN BAD HASH: {file_hash[:15]}...")

            # 2. Entropy Check
            entropy = calculate_entropy(file_path)
            if entropy > CONFIG['entropy_threshold']:
                suspicion_score += 50
                reasons.append(Fore.YELLOW + f"High entropy ({entropy:.2f}) suggests packing/encryption.")

            # 3. Extension and Location Check
            if file_ext in CONFIG['suspicious_extensions']:
                suspicion_score += 15
                reasons.append(f"Suspicious extension ('{file_ext}')")
                # Increase score if in a risky location like Temp
                if 'temp' in file_path.lower() or 'appdata' in file_path.lower():
                    suspicion_score += 20
                    reasons.append("Located in a high-risk directory (Temp/AppData).")
            
            # 4. Filename Pattern Check
            if CONFIG['suspicious_patterns'].search(file_name):
                suspicion_score += 60
                reasons.append(Fore.YELLOW + "Filename contains suspicious keyword.")

            # 5. Hidden File Check
            if is_hidden:
                suspicion_score += 25
                reasons.append("File is hidden.")

            # 6. Recently Modified Check
            mod_time = file_stats.st_mtime
            if (current_time - mod_time) < (86400 * CONFIG['recent_modification_days']):
                # This is a weak indicator, so it has a low score.
                suspicion_score += 5
                reasons.append(f"Modified within the last {CONFIG['recent_modification_days']} days.")
            
            # --- Final Verdict ---
            if suspicion_score >= CONFIG['suspicion_score_threshold']:
                suspicious_files.append({
                    'path': file_path,
                    'score': suspicion_score,
                    'reasons': reasons,
                    'hash': file_hash
                })
        
        except (PermissionError, FileNotFoundError):
            continue # Skip files we can't access
        except Exception as e:
            print(f"\n{Fore.RED}An unexpected error occurred processing {file_path}: {e}")

    return suspicious_files

def print_results(suspicious_files):
    """Prints the final report of suspicious files."""
    if suspicious_files:
        print("\n" + Fore.RED + Style.BRIGHT + "🚨 WARNING: POTENTIAL THREATS DETECTED! 🚨")
        print(Style.BRIGHT + f"Found {len(suspicious_files)} suspicious file(s) with a score >= {CONFIG['suspicion_score_threshold']}.")
        
        # Sort files by score, highest first
        suspicious_files.sort(key=lambda x: x['score'], reverse=True)
        
        for sf in suspicious_files:
            print(Fore.RED + Style.BRIGHT + f"\n- Path: {sf['path']}")
            print(f"  {Fore.RED}Suspicion Score: {sf['score']}")
            print(f"  {Fore.CYAN}File Hash (SHA-256): {sf['hash']}")
            print(f"  {Fore.YELLOW}Reasons for suspicion:")
            for reason in sf['reasons']:
                print(f"    - {reason}")
            
        print("\n" + Fore.YELLOW + Style.BRIGHT + "--- Recommended Actions ---")
        print("1. " + Style.BRIGHT + "DO NOT DELETE these files randomly. You might delete a critical system file.")
        print("2. " + Style.BRIGHT + "INVESTIGATE: Copy the File Hash and search for it on VirusTotal (www.virustotal.com).")
        print("3. " + Style.BRIGHT + "ISOLATE: Disconnect your computer from the internet to prevent any potential spread.")
        print("4. " + Style.BRIGHT + "RUN A PROFESSIONAL SCAN: Use a trusted antivirus program (like Malwarebytes or the built-in Windows Defender) to run a full, deep scan.")
        print("5. " + Style.BRIGHT + "CONSULT AN EXPERT if you confirm an infection.")

    else:
        print("\n" + Fore.GREEN + Style.BRIGHT + "✅ Scan complete. No files exceeded the suspicion threshold in the scanned directories.")

if __name__ == "__main__":
    print(Style.BRIGHT + Fore.CYAN + "--- Educational Malware Scanner ---")
    print(Fore.YELLOW + "Note: This is an educational tool and not a replacement for a real antivirus.\n")
    print("Starting scan with the following configuration:")
    print(f"  - Directories: {CONFIG['directories_to_scan']}")
    print(f"  - Exclusions: {CONFIG['exclusion_list']}")
    print(f"  - Score Threshold: {CONFIG['suspicion_score_threshold']}\n")
    
    try:
        results = scan_files()
        print_results(results)
    except KeyboardInterrupt:
        print("\n" + Fore.YELLOW + "Scan aborted by user.")