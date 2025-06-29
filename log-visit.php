<?php
// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (
    !$data ||
    empty($data['visitorId']) ||
    empty($data['event'])
) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Append to visitors.json with file locking and size limit
$file = __DIR__ . '/visitors.json';
$maxRecords = 1000;
$log = [];

if (file_exists($file)) {
    $fp = fopen($file, 'r+');
    if (flock($fp, LOCK_EX)) {
        $contents = stream_get_contents($fp);
        $log = json_decode($contents, true) ?: [];
        // Truncate if too large
        if (count($log) >= $maxRecords) {
            $log = array_slice($log, -($maxRecords - 1));
        }
        $log[] = $data;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($log, JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
    } else {
        fclose($fp);
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Could not lock file']);
        exit;
    }
} else {
    file_put_contents($file, json_encode([$data], JSON_PRETTY_PRINT), LOCK_EX);
}

http_response_code(204);
?>
