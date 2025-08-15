import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Questions - Interest Scale (Holland Code)
  {
    id: 'psych-1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy working with structured systems and troubleshooting problems.',
    weight: 1,
  },
  {
    id: 'psych-2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find satisfaction in organizing and optimizing complex data systems.',
    weight: 1,
  },
  {
    id: 'psych-3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I prefer working with technology rather than directly with people.',
    weight: 1,
  },

  // Psychometric Questions - Personality (Big Five)
  {
    id: 'psych-4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I prefer working in well-structured environments with predictable outcomes.',
    weight: 1,
  },
  {
    id: 'psych-5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I pay close attention to details and rarely make careless mistakes.',
    weight: 1,
  },
  {
    id: 'psych-6',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I remain calm and focused when systems fail or problems arise.',
    weight: 1,
  },

  // Psychometric Questions - Motivation
  {
    id: 'psych-7',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I would pursue this field even if it required significant effort to master.',
    weight: 1,
  },
  {
    id: 'psych-8',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'Learning new technologies excites me more than earning a high salary.',
    weight: 1,
  },

  // Technical Questions - General Aptitude
  {
    id: 'tech-1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'aptitude',
    question: 'What does 1 TB (terabyte) equal?',
    options: ['1,000 GB', '1,024 GB', '100 GB', '10,000 GB'],
    correctAnswer: 1,
    weight: 1,
  },
  {
    id: 'tech-2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'aptitude',
    question: 'Which Linux command lists files and directories?',
    options: ['cd', 'ls', 'pwd', 'mkdir'],
    correctAnswer: 1,
    weight: 1,
  },
  {
    id: 'tech-3',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'aptitude',
    question: 'In a sequence: 2, 6, 18, 54, ?, what comes next?',
    options: ['108', '162', '216', '180'],
    correctAnswer: 1,
    weight: 1,
  },

  // Technical Questions - Domain Specific
  {
    id: 'tech-4',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain',
    question: 'Which AWS storage class is best for data accessed less than once a year?',
    options: ['S3 Standard', 'S3 Glacier', 'S3 Glacier Deep Archive', 'S3 Intelligent-Tiering'],
    correctAnswer: 2,
    weight: 1,
  },
  {
    id: 'tech-5',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain',
    question: 'What type of storage is best for databases requiring low latency?',
    options: ['Object Storage', 'Block Storage', 'File Storage', 'Archive Storage'],
    correctAnswer: 1,
    weight: 1,
  },
  {
    id: 'tech-6',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain',
    question: 'What does RAID 1 provide?',
    options: ['Improved performance', 'Data mirroring', 'Data striping', 'Compression'],
    correctAnswer: 1,
    weight: 1,
  },

  // WISCAR Questions - Will
  {
    id: 'wiscar-1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'will',
    question: 'You\'ve been struggling with a complex cloud storage configuration for 3 hours. How likely are you to continue working on it?',
    options: ['Give up and ask for help immediately', 'Take a break and try a different approach', 'Keep working until I solve it', 'Research similar problems online first'],
    weight: 1,
  },
  {
    id: 'wiscar-2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I am willing to spend evenings and weekends learning new cloud technologies.',
    weight: 1,
  },

  // WISCAR Questions - Interest
  {
    id: 'wiscar-3',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I actively follow cloud technology news and updates.',
    weight: 1,
  },
  {
    id: 'wiscar-4',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I enjoy experimenting with different storage solutions and configurations.',
    weight: 1,
  },

  // WISCAR Questions - Cognitive
  {
    id: 'wiscar-5',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'If System A can process 100 requests/second and System B can process 150 requests/second, how many requests can they process together in 10 seconds?',
    options: ['250', '1,500', '2,500', '1,250'],
    correctAnswer: 2,
    weight: 1,
  },
  {
    id: 'wiscar-6',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'A storage system shows 95% utilization. What should be your FIRST priority?',
    options: ['Immediately add more storage', 'Analyze usage patterns and growth trends', 'Alert all users about the issue', 'Switch to a different storage provider'],
    weight: 1,
  },

  // WISCAR Questions - Ability to Learn
  {
    id: 'wiscar-7',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I believe I can improve my technical skills significantly with proper training.',
    weight: 1,
  },
  {
    id: 'wiscar-8',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'When I don\'t understand a concept, I try multiple learning approaches.',
    weight: 1,
  },

  // WISCAR Questions - Real-World Alignment
  {
    id: 'wiscar-9',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'realworld',
    question: 'What does a Cloud Storage Engineer typically do daily?',
    options: ['Only write code', 'Monitor systems, optimize performance, and ensure data security', 'Sell cloud services to customers', 'Only troubleshoot when things break'],
    correctAnswer: 1,
    weight: 1,
  },
  {
    id: 'wiscar-10',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'realworld',
    question: 'Your company needs to store 10PB of data with 99.99% availability. What\'s your approach?',
    options: ['Use a single cloud provider for simplicity', 'Design a multi-region, redundant architecture', 'Store everything locally for security', 'Use the cheapest storage option available'],
    weight: 1,
  },
];

export const likertScale = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree'
];