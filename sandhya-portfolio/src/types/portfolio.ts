export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  architecture: {
    steps: {
      name: string;
      description: string;
      icon: string;
    }[];
    notes: string;
  };
  uiPreviewType: 'coupon' | 'hms' | 'job' | 'inventory' | 'retinopathy';
  accentColor: string;
  buildingColor: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'core' | 'frontend' | 'backend' | 'database' | 'tools';
  color: string;
  position: [number, number, number];
  description: string;
  connectionTo: string[];
  codeSnippet?: string;
}

export interface DebugStep {
  id: number;
  label: string;
  status: 'pending' | 'active' | 'success' | 'warning';
  title: string;
  detail: string;
  layer: 'Frontend' | 'API Gateway' | 'Business Logic' | 'Database';
  timestamp: string;
}

export interface ChapterInfo {
  index: number;
  id: string;
  chapterNumber: string;
  title: string;
  tagline: string;
  progressRange: [number, number];
  cameraTarget: [number, number, number];
  cameraOffset: [number, number, number];
}
