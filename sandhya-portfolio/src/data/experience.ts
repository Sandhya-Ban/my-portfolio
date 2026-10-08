export interface PipelineStage {
  id: string;
  name: string;
  subtext: string;
  tech: string;
  status: 'active' | 'synced' | 'verified';
  metrics: string;
}

export interface WorkRole {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  bullets: string[];
  techStack: string[];
  keyHighlight: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  notes: string;
}

export interface CertificationInfo {
  title: string;
  issuer: string;
  category: string;
}

export const workExperience: WorkRole[] = [
  {
    id: 'samriddhi',
    company: 'Samriddhi Anveshana',
    role: 'Full Stack Developer',
    period: '03/2026 – Present',
    location: 'Hyderabad, India',
    summary:
      'Leading end-to-end full stack web engineering across the Hospital Management System and Divine Food platform, optimizing performance, REST APIs, and database schemas.',
    bullets: [
      "Engineered full stack features for the organization's website, delivering responsive frontend interfaces and robust backend/API integrations.",
      'Built responsive UI components for the Hospital Management System using React.js and TypeScript, reducing page load time by 20% and supporting 50+ concurrent users.',
      'Developed end-to-end Hospital Management System features covering frontend UI and MySQL-backed backend services, streamlining core patient and data workflows.',
      'Optimized REST APIs and MySQL queries supporting core HMS workflows, reducing response times and ensuring reliable data management at scale.',
      'Independently led the Divine Food project end-to-end, owning frontend and backend development from requirement analysis through deployment.',
      'Architected responsive React.js interfaces and backend REST APIs for the Divine Food platform, enabling seamless order processing and data management.',
    ],
    techStack: ['React.js', 'TypeScript', 'Python', 'FastAPI', 'MySQL', 'REST APIs', 'Cloudflare R2'],
    keyHighlight: 'Reduced HMS page load by 20% & independently delivered Divine Food end-to-end',
  },
  {
    id: 'codetru',
    company: 'CodeTru',
    role: 'Frontend Developer / Tech Intern',
    period: '04/2025 – 10/2025',
    location: 'Hyderabad, India',
    summary:
      'Engineered accessible web interfaces and dynamic data-driven dashboards for email campaign management and payroll processing systems.',
    bullets: [
      'Designed and developed responsive, accessible web interfaces for an email campaign management tool using React.js, JavaScript, Ant Design, and Tailwind CSS, supporting workflows like campaign creation, scheduling, and template management.',
      'Built reusable, modular UI components using component-based architecture, improving scalability and maintainability across the campaign builder and dashboard views.',
      'Developed and maintained dynamic, data-driven dashboards using React.js, TypeScript, Redux, Material UI, and Tailwind CSS.',
      'Implemented centralized state management with Redux and integrated frontend applications with backend REST APIs for payroll processing.',
      'Collaborated in an Agile development environment, participating in daily stand-ups and sprint planning to align on delivery priorities.',
    ],
    techStack: ['React.js', 'TypeScript', 'JavaScript', 'Redux', 'Ant Design', 'Material UI', 'Tailwind CSS', 'REST APIs'],
    keyHighlight: 'Reusable campaign builder UI & centralized Redux state management',
  },
  {
    id: 'vcube',
    company: 'VCube',
    role: 'Python Full Stack Developer Trainee',
    period: '08/2024 – 03/2025',
    location: 'Hyderabad, India',
    summary:
      'Intensive 6-month hands-on full stack engineering program with core focus on Python, OOP architecture, REST API design, and relational database logic.',
    bullets: [
      'Built a full stack application using Python for backend logic, MySQL for data storage, and HTML, CSS, and JavaScript for frontend interfaces.',
      'Practiced REST API design and integration, connecting frontend components with Python-based backend services.',
      'Worked on debugging, testing, and version control (Git) as part of hands-on project assignments and code reviews.',
      'Completed an intensive 6-month full stack development training program with a core focus on Python, covering OOP concepts, data structures & algorithms, and software design principles, applying Agile-based workflows to simulate real-world development practices.',
    ],
    techStack: ['Python', 'MySQL', 'HTML5/CSS3', 'JavaScript', 'REST APIs', 'Git', 'OOP', 'DSA'],
    keyHighlight: 'Intensive 6-month Python OOP, REST APIs & MySQL engineering simulation',
  },
];

export const educationInfo: EducationInfo = {
  degree: 'B.Tech in Computer Science and Engineering',
  institution: 'Vaagdevi College of Engineering',
  location: 'Warangal',
  period: '2020 – 2024',
  score: 'CGPA: 8.5',
  notes: '15 years of full-time education with strong focus on DSA, OOP, Systems, and Web Engineering.',
};

export const certificationsList: CertificationInfo[] = [
  {
    title: 'PCAP – Python Programming Essentials',
    issuer: 'Cisco Networking Academy',
    category: 'Backend & Python Mastery',
  },
  {
    title: 'Python Fundamentals',
    issuer: 'Great Learning',
    category: 'Data Structures & Algorithms',
  },
  {
    title: 'JavaScript Mastery (Basic to Advanced)',
    issuer: 'Udemy',
    category: 'Modern Web Engineering',
  },
];

export const pipelineStages: PipelineStage[] = [
  {
    id: 'frontend',
    name: 'Frontend Interface',
    subtext: 'Responsive React.js & TypeScript UI',
    tech: 'React.js • TypeScript • Tailwind CSS • Redux',
    status: 'verified',
    metrics: '20% Faster Load • Accessible UI',
  },
  {
    id: 'api',
    name: 'REST API Layer',
    subtext: 'Contract validation & high-concurrency routing',
    tech: 'FastAPI • REST APIs • Pydantic',
    status: 'active',
    metrics: '< 45ms latency • OpenAPI Docs',
  },
  {
    id: 'backend',
    name: 'Python Business Logic',
    subtext: 'Modular OOP service layer & async processing',
    tech: 'Python • AsyncIO • Modular OOP',
    status: 'synced',
    metrics: 'Clean Code • Type-safe services',
  },
  {
    id: 'database',
    name: 'Relational Database',
    subtext: 'Optimized MySQL & PostgreSQL queries',
    tech: 'MySQL • PostgreSQL • ACID Locks',
    status: 'verified',
    metrics: '50+ Concurrent Users • 0 Race Conditions',
  },
  {
    id: 'practices',
    name: 'Agile & Version Control',
    subtext: 'Sprints, daily standups & code reviews',
    tech: 'Git • GitHub • Agile/Scrum',
    status: 'active',
    metrics: 'Sprint Delivery • Code Quality',
  },
];

export const experienceStack = {
  frontend: ['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'Ant Design', 'Material UI'],
  backend: ['Python', 'FastAPI', 'RESTful API Development', 'REST API Integration', 'Modular OOP'],
  database: ['MySQL', 'PostgreSQL', 'Query Optimization', 'Relational Schemas'],
  tools: ['Git', 'GitHub', 'Agile/Scrum Methodology', 'Version Control', 'Vite'],
};

export const growthConcepts = [
  {
    id: 'page-optimization',
    title: 'Performance & Optimization',
    summary: 'Reduced page load time by 20% on HMS through modular component architecture, memoization, and streamlined bundle sizing.',
    metric: '20% Latency Reduction',
  },
  {
    id: 'concurrency',
    title: 'High-Concurrency Scaling',
    summary: 'Engineered relational database transaction locks and connection pools supporting 50+ concurrent medical staff users.',
    metric: '50+ Concurrent Users',
  },
  {
    id: 'apis',
    title: 'REST API Architecture',
    summary: 'Designing robust, resource-oriented RESTful endpoints with structured status codes, input schemas, and fast response times.',
    metric: 'RESTful Precision',
  },
  {
    id: 'databases',
    title: 'MySQL Query Optimization',
    summary: 'Indexing foreign keys, analyzing query execution plans, and normalizing schemas to ensure zero data discrepancies.',
    metric: 'Sub-second Execution',
  },
  {
    id: 'oop-dsa',
    title: 'OOP & Algorithms',
    summary: 'Applying clean Object-Oriented Programming and Data Structures & Algorithms to structure maintainable, scalable software.',
    metric: 'Clean Code Practices',
  },
  {
    id: 'agile',
    title: 'Agile / Scrum Ownership',
    summary: 'Proven ownership from requirement analysis through deployment, participating in sprint planning and daily standups.',
    metric: 'End-to-End Ownership',
  },
];
