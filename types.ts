
export interface Project {
  id: number;
  title: string;
  category: string;
  problem: string;
  solution: string;
  features: string[];
  results: string;
  description: string;
  tech: string[];
  year: string;
  link?: string;
  image?: string;
  icon?: any;
  stat?: string;
  elementId?: string;
}

export interface AIPortfolioAgent {
  id: number;
  title: string;
  icon: any;
  features: string[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: any;
}

export interface TrustFactor {
  id: number;
  title: string;
  icon: any;
}

export interface SkillCategory {
  title: string;
  skills: string[];
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

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  expertise: string[];
  downloadLink?: string;
}

/**
 * Something built and run, but with no public URL to send anyone to — an
 * internal tool, a private automation stack, a demo storefront. Deliberately
 * has no `link`: listing these next to the shipped products with a dead button
 * would be worse than describing them plainly.
 */
export interface InternalBuild {
  id: number;
  title: string;
  kind: string;
  summary: string;
  detail: string;
  tech: string[];
  facts: string[];
  status: 'Running privately' | 'Demo build' | 'Internal tool';
  icon?: any;
}
