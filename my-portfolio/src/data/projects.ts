export interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  hero?: string; // Image URL
  link?: string;
  demoUrl?: string;
  githubUrl?: string;
  status?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    id: 'megatell',
    title: 'MegaTell',
    summary: 'A full-stack mobile application connecting users with professional agents across various services using Flutter and Node.js.',
    tags: ['Flutter', 'Node.js', 'MongoDB', 'REST API'],
    hero: 'image/megaintroduce.png',
    link: '/projects/megatell',
    githubUrl: 'https://github.com/mabroukaymen1/mega-tell',
    status: 'Prototype / Prototype',
    features: [
      'Agent Directory with filtering',
      'Booking & Checkout System',
      'JWT-based Authentication',
      'RESTful API with Postman docs'
    ]
  },
  {
    id: 'babytracker',
    title: 'BabyTracker',
    summary: 'A comprehensive healthcare mobile application for monitoring newborn health, tracking vaccinations, and supporting parents with real-time data.',
    tags: ['Flutter', 'Firebase', 'Provider', 'Healthcare'],
    hero: 'image/softintro.png',
    link: '/projects/babytracker',
    githubUrl: 'https://github.com/mabroukaymen1/SoftShot',
    status: 'Prototype / Prototype',
    features: [
      'Breastfeeding & Sleep Tracking',
      'Automated Vaccination Schedule',
      'NIPS Pain Score Monitoring',
      'Integrated Medical Library'
    ]
  },
  {
    id: 'smartshift',
    title: 'Port Service Management System',
    summary: 'Enterprise-grade mobile application for port operations, maintenance tracking, and workflow optimization.',
    tags: ['Flutter', 'Firebase', 'REST API', 'Provider'],
    hero: 'image/port.jpg',
    link: '/projects/port-management',
    githubUrl: 'https://github.com/mabroukaymen1/smartshift',
    status: 'Active',
    features: ['Equipment maintenance', 'Employee workflows', 'Real-time tracking']
  },
  {
    id: 'beemo',
    title: 'Beemo',
    summary: 'AI-powered office automation system with voice control, smart device integration, and real-time responsiveness.',
    tags: ['Flutter', 'Firebase', 'VOSK', 'Gemini AI'],
    hero: 'image/beemo01.png',
    link: '/projects/beemo',
    githubUrl: 'https://github.com/mabroukaymen1/beemo',
    status: 'Active',
    features: ['Voice Commands', 'AI Intent Analysis', 'Mobile Control', 'Smart Devices']
  },
  {
    id: 'smarthome',
    title: 'Smart Home',
    summary: 'IoT-powered home automation with Flutter, ESP32, Firebase, and MQTT for real-time control and safety monitoring.',
    tags: ['Flutter', 'ESP32', 'Firebase', 'MQTT'],
    hero: 'image/smartintro.png',
    link: '/projects/smart-home',
    githubUrl: 'https://github.com/mabroukaymen1/smarthome',
    status: 'Completed',
    features: ['Device Control', 'Fire Detection', 'Energy Monitoring', 'Real-time Dashboard']
  },
  {
    id: 'lora',
    title: 'LoRaMétéo',
    summary: 'Low-power, long-range IoT solution for environmental monitoring using LoRa technology with Firebase cloud integration.',
    tags: ['LoRa ESP32', 'DHT11', 'Firebase', 'Arduino'],
    hero: 'image/loraapp.png',
    link: '/projects/lora-monitoring',
    githubUrl: 'https://github.com/mabroukaymen1/loradht',
    status: 'Completed',
    features: ['300m Range', '0.5mA Power', 'Real-time Dashboard', 'Cloud Sync']
  },
  {
    id: 'linefollower',
    title: 'Line Follower Robot',
    summary: 'Arduino-based robot combining autonomous line following with Bluetooth control and obstacle avoidance.',
    tags: ['Arduino', 'C/C++', 'HC-05', 'IR Sensors'],
    hero: 'image/robot.png',
    link: '/projects/line-follower',
    githubUrl: 'https://github.com/mabroukaymen1/flowingcar',
    status: 'Completed',
    features: ['Autonomous Navigation', 'Bluetooth Control', 'Obstacle Avoidance', 'Dual Mode']
  },
  {
    id: 'aquatech',
    title: 'AquaTech',
    summary: 'Flutter-based IoT solution for automated bottle filling and capping with real-time production monitoring.',
    tags: ['Flutter', 'Firebase', 'ESP32', 'IoT'],
    hero: 'image/farma.png',
    link: '/projects/aquatech',
    githubUrl: 'https://github.com/mabroukaymen1/AquaTechPro',
    status: 'Active',
    features: ['Automated Filling', 'Auto Capping', 'Real-Time Dashboard', 'Remote Control']
  },
  {
    id: 'translator',
    title: 'Tunisian Translator',
    summary: 'Neural machine translation using mBART-50 fine-tuned for Tunisian Arabic dialect to English.',
    tags: ['Python', 'PyTorch', 'mBART-50', 'NLP'],
    hero: 'image/aitranslation.png',
    link: '/projects/translation-ai',
    githubUrl: 'https://github.com/mabroukaymen1/tunisian_english',
    status: 'Active',
    features: ['Dialect Processing', 'Memory Optimization', 'BLEU 32.7', 'FastAPI Deployment']
  }
];
