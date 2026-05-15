
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  link?: string;
  image?: string;
  icon?: any;
  stat?: string;
  elementId?: string;
}

export interface Experiment {
  id: number;
  title: string;
  description: string;
  model: string;
  status: 'Prototype' | 'Live' | 'Archived';
  link?: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: any;
  description: string;
  demoLink?: string;
}

export interface PromptShowcaseItem {
  id: number;
  before: string;
  after: string;
  context: string;
}

export interface Service {
  id: number;
  title: string;
  icon: any;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}
