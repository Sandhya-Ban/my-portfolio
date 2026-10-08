import type { ProjectData } from '../types/portfolio';

export const projectsData: ProjectData[] = [
  {
    id: 'divine-food',
    title: 'Divine Food Platform',
    subtitle: 'End-to-End Food & Coupon Processing Platform',
    category: 'Full Stack Platform • Samriddhi Anveshana',
    description:
      'Independently led the Divine Food project end-to-end, owning frontend and backend development from requirement analysis through deployment. Architected responsive React.js interfaces and backend REST APIs enabling seamless order processing, coupon allocation, and reliable data management.',
    technologies: ['React.js', 'TypeScript', 'FastAPI', 'MySQL', 'REST APIs', 'Cloudflare R2'],
    architecture: {
      steps: [
        { name: 'Sponsor Portal', description: 'Creates funding pool & campaigns', icon: 'sponsor' },
        { name: 'Event Coordinator', description: 'Associates quotas & venue parameters', icon: 'event' },
        { name: 'Coupon Engine', description: 'Cryptographic token generation & validation', icon: 'token' },
        { name: 'Program Center', description: 'Regional distribution coordinator', icon: 'center' },
        { name: 'Facility Center', description: 'Local redemption point & mobile scanner', icon: 'facility' },
        { name: 'Ledger Audit', description: 'Atomically verified MySQL ledger updates', icon: 'check' },
      ],
      notes:
        'Engineered with asynchronous REST endpoints, MySQL transactional guarantees for coupon allocation and redemption, and Cloudflare R2 for asset audit logs.',
    },
    features: [
      'Independently led end-to-end development from requirement analysis through deployment',
      'Architected responsive React.js interfaces for multi-tier program and facility centers',
      'Built high-performance backend REST APIs enabling seamless order processing',
      'Integrated MySQL data layer with transactional guarantees for coupon allocation and redemption',
      'Tamper-resistant cryptographic verification workflow and real-time ledger accounting',
    ],
    uiPreviewType: 'coupon',
    accentColor: '#8b5cf6',
    buildingColor: '#6366f1',
    githubUrl: 'https://github.com/sandhya',
    liveUrl: '#',
  },
  {
    id: 'hms',
    title: 'Hospital Management System (HMS)',
    subtitle: 'Clinical Operations & Patient Workflow Portal',
    category: 'Full Stack Healthcare • Samriddhi Anveshana',
    description:
      'Built responsive UI components for the Hospital Management System using React.js and TypeScript, reducing page load time by 20% and supporting 50+ concurrent users. Developed end-to-end HMS features covering frontend UI and MySQL-backed backend services, streamlining core patient and data workflows.',
    technologies: ['React.js', 'TypeScript', 'MySQL', 'REST APIs', 'Tailwind CSS'],
    architecture: {
      steps: [
        { name: 'React.js UI', description: 'High-performance responsive clinic interface', icon: 'ui' },
        { name: 'Auth & RBAC', description: 'JWT tokens with role-based access for Doctors & Staff', icon: 'security' },
        { name: 'Core REST APIs', description: 'Optimized patient and clinical appointment endpoints', icon: 'api' },
        { name: 'MySQL Database', description: 'Partitioned records, appointment locks, and fast queries', icon: 'database' },
        { name: 'Clinical Reports', description: 'Automated reporting queues and patient timeline audits', icon: 'report' },
      ],
      notes:
        'Optimized REST APIs and MySQL queries supporting core HMS workflows, reducing response times, cutting page load by 20%, and ensuring reliable data management at scale for 50+ concurrent users.',
    },
    features: [
      'Reduced page load time by 20% through modular component hierarchy and memoization',
      'Architected robust system supporting 50+ concurrent hospital and administrative users',
      'Engineered end-to-end features spanning React.js frontend and MySQL backend services',
      'Optimized REST APIs and MySQL queries supporting high-volume clinical workflows',
      'Role-based access control protecting confidential patient health records',
    ],
    uiPreviewType: 'hms',
    accentColor: '#38bdf8',
    buildingColor: '#0ea5e9',
    githubUrl: 'https://github.com/sandhya',
    liveUrl: '#',
  },
  {
    id: 'diabetic-retinopathy',
    title: 'Diabetic Retinopathy Detection',
    subtitle: 'Deep Learning Image-Classification Pipeline',
    category: 'Deep Learning & Computer Vision',
    description:
      'Designed and developed an end-to-end deep learning image-classification pipeline in Python, from data handling to model evaluation, to support early-stage detection of diabetic retinopathy. Applied object-oriented and modular coding practices to structure the pipeline; achieved 90–95% classification accuracy, demonstrating a reliable proof-of-concept for automated screening support.',
    technologies: ['Python', 'Deep Learning / CNN', 'Image Processing', 'OOP', 'Data Pipelines'],
    architecture: {
      steps: [
        { name: 'Fundus Ingestion', description: 'Raw high-resolution retinal scan loading', icon: 'sponsor' },
        { name: 'Preprocessing', description: 'CLAHE contrast equalization & circular masking', icon: 'event' },
        { name: 'CNN Feature Maps', description: 'Vascular segmentation & microaneurysm detection', icon: 'token' },
        { name: 'Dense Classifier', description: 'Softmax probability across 5 clinical severity stages', icon: 'center' },
        { name: 'Model Evaluation', description: '90-95% accuracy verification and ROC-AUC curve', icon: 'check' },
      ],
      notes:
        'Structured with modular Python OOP classes separating preprocessing, neural architecture, and clinical inference with comprehensive evaluation metrics.',
    },
    features: [
      'End-to-end deep learning image-classification pipeline from data handling to evaluation',
      'Achieved 90–95% classification accuracy for automated diabetic retinopathy screening',
      'Applied object-oriented and modular coding practices to structure the pipeline',
      'Rigorous evaluation metrics including Confusion Matrix, Precision, Recall, and ROC-AUC (0.962)',
      'Reliable proof-of-concept for automated medical screening and early diagnosis support',
    ],
    uiPreviewType: 'retinopathy',
    accentColor: '#ec4899',
    buildingColor: '#db2777',
    githubUrl: 'https://github.com/sandhya',
    liveUrl: '#',
  },
  {
    id: 'vegetable-inventory',
    title: 'Vegetable Inventory Application',
    subtitle: 'Real-Time Stock & Billing Management Tool',
    category: 'Retail Inventory & Billing System',
    description:
      'Designed and built the application\'s inventory and billing logic in Python with full CRUD functionality, backed by a MySQL data layer. Implemented CRUD operations for inventory items (add, update, remove) and daily revenue tracking, applying debugging and testing to ensure data accuracy tailored to small retail business needs.',
    technologies: ['Python', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'REST APIs'],
    architecture: {
      steps: [
        { name: 'Inventory View', description: 'Dynamic retail catalog with real-time stock filters', icon: 'grid' },
        { name: 'Python CRUD Engine', description: 'Full CRUD operations for items and batch stock updates', icon: 'crud' },
        { name: 'Billing Logic', description: 'Real-time calculation and daily revenue tracking', icon: 'alert' },
        { name: 'MySQL Store', description: 'Relational data layer ensuring consistent stock records', icon: 'database' },
      ],
      notes:
        'Engineered with thorough debugging and testing to ensure complete data accuracy in real-time billing and inventory updates.',
    },
    features: [
      'Full CRUD functionality for inventory management (add, update, and remove items)',
      'Real-time billing engine with automated totals and daily revenue tracking',
      'MySQL data layer maintaining transaction integrity and zero stock drift',
      'Applied rigorous debugging and testing to ensure complete data accuracy',
      'Functional, lightweight tool tailored to small retail and grocery business workflows',
    ],
    uiPreviewType: 'inventory',
    accentColor: '#10b981',
    buildingColor: '#059669',
    githubUrl: 'https://github.com/sandhya',
    liveUrl: '#',
  },
];
