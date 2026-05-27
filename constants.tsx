import { Brain, Code2, Sparkles, Terminal, Cpu, MessageSquare, Layers, Rocket, Users, ShieldCheck, Database, Network, Activity, FileText, Wrench, Crop, Youtube, HeartPulse } from "lucide-react";
import { Project, Experiment, Skill, PromptShowcaseItem, Service, Testimonial, Certificate } from "./types";

export const HERO_CONTENT = {
  headline: "Architecting the Future with Prompts",
  subheadline: "I bridge the gap between human intent and machine intelligence. Action-oriented AI Generalist specializing in AI Automation, Multi-Agent Systems, and Full-Stack LLM Integration.",
  cta: "View My Work",
  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
};

export const TECH_STACK = [
  "ChatGPT", "Claude", "Gemini", "DeepSeek", "Meta AI", "Grok", 
  "Make", "n8n", "Power BI", "Excel (AI)", "MidJourney", "HeyGen", "ElevenLabs", "React", "AutoGPT", "Copilot"
];

import { AI_SYSTEM_INSTRUCTION } from './prompt';
export { AI_SYSTEM_INSTRUCTION };

export const SKILLS: Skill[] = [
  { 
    name: "Prompt Engineering", 
    level: 100, 
    icon: Terminal, 
    description: "Chain-of-Thought, System Architecture, & Zero-Shot mastery.",
    demoLink: "#showcase" 
  },
  { 
    name: "Agentic AI & Automation", 
    level: 98, 
    icon: Network, 
    description: "Multi-agent systems, AI Agents, and scalable orchestration architectures.",
    demoLink: "#work" 
  },
  { 
    name: "Workflow Automation", 
    level: 96, 
    icon: Layers, 
    description: "Creating robust autonomous pipelines utilizing Make and n8n.",
    demoLink: "#work" 
  },
  {
    name: "Product Thinking & Building",
    level: 92,
    icon: Cpu,
    description: "Tech 101 to deployment: rapid AI prototyping and MVP validation.",
    demoLink: "#work"
  },
  { 
    name: "Data Analytics (AI & Excel)", 
    level: 94, 
    icon: Database, 
    description: "Advanced data manipulation, numerous automation, and Excel formulas.",
    demoLink: "#work" 
  },
  { 
    name: "Data Visualisation (Power BI)", 
    level: 90, 
    icon: Activity, 
    description: "AI-enhanced reporting, KPI dashboards, and structured visualizations.",
    demoLink: "#work" 
  },
  {
    name: "RAG & Vector Databases",
    level: 90,
    icon: Layers,
    description: "Semantic search, context augmentation, and knowledge bases.",
    demoLink: "#work"
  },
  { 
    name: "Web Development", 
    level: 88, 
    icon: Code2, 
    description: "React, Vercel, client-side processing, mobile-first UI.",
    demoLink: "#work" 
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "QuickResume.Business",
    category: "AI Web App",
    year: "2025",
    description: "Built an AI-powered resume creation platform with LLM-based content generation for tailored summaries and skill sections. Features a fast, mobile-first, no-login experience.",
    tech: ["React", "LLMs", "Client-Side Processing"],
    link: "https://quickresume.business",
    icon: FileText,
    stat: "ATS-OPTIMIZED",
    elementId: "quickresume"
  },
  {
    id: 2,
    title: "Data Insights & Automation",
    category: "BI & Automation",
    year: "2025",
    description: "Orchestrated end-to-end data pipelines using Make and AI. Automated numerous Excel data analysis tasks and built engaging Power BI visualisations for stakeholder reporting.",
    tech: ["Make", "Excel", "Power BI", "AI"],
    link: "#",
    icon: Database,
    stat: "WORKFLOW AUTOMATION",
    elementId: "data-insights"
  },
  {
    id: 3,
    title: "AI Master Tools",
    category: "AI Platform",
    year: "2025",
    description: "Developed a comprehensive AI tools directory featuring 200+ curated tools across 10 categories. Includes SEO-optimized landing pages driving organic traffic.",
    tech: ["React", "SEO", "Vercel"],
    link: "https://aimastertools.space",
    icon: Wrench,
    stat: "200+ AI TOOLS",
    elementId: "ai-master-tool"
  },
  {
    id: 4,
    title: "Photo Resizer",
    category: "Utility Platform",
    year: "2024",
    description: "High-performance, 100% client-side image resizing tool for Indian government exam requirements. Achieved zero server infrastructure with offline capability.",
    tech: ["React", "Image Processing", "Web App"],
    link: "https://photoresizer.click",
    icon: Crop,
    image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://photoresizer.click",
    stat: "1M+ USERS",
    elementId: "photo-resizer"
  },
  {
    id: 5,
    title: "SmartFit AI",
    category: "Health & Fitness",
    year: "2024",
    description: "Responsive AI-based fitness web application providing real-time recommendations. Demonstrated full-cycle AI product development from prompt design to deployment.",
    tech: ["React", "AI Prompts", "Vercel"],
    link: "https://smartfit-8ikq.vercel.app",
    icon: HeartPulse,
    stat: "LIVE PLATFORM",
    elementId: "smartfit"
  }
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 1,
    title: "Portfolio Generator",
    description: "An attempt to auto-generate portfolio websites using single-shot prompting in Gemini 1.5 Pro.",
    model: "Gemini 1.5 Pro",
    status: "Prototype",
    link: "https://v0.dev"
  },
  {
    id: 2,
    title: "Code Refactor Agent",
    description: "A CLI tool that takes legacy code and suggests optimization patterns based on Clean Code principles.",
    model: "Gemini Ultra",
    status: "Archived",
    link: "https://github.com/features/copilot"
  },
  {
    id: 3,
    title: "Dream Journal Visualizer",
    description: "Converting text-based dream logs into surrealist imagery using prompt chaining.",
    model: "Stable Diffusion XL",
    status: "Prototype",
    link: "https://stability.ai/"
  },
  {
    id: 4,
    title: "Crypto Sentiment Tracker",
    description: "Analyzing Twitter/X sentiment for specific altcoins to predict micro-trends.",
    model: "GPT-4o",
    status: "Live",
    link: "https://finance.google.com/"
  },
  {
    id: 5,
    title: "Recipe Remix",
    description: "A fun app that generates fusion recipes based on available ingredients in your fridge photo.",
    model: "Gemini Flash",
    status: "Prototype",
    link: "https://cooklist.com/"
  },
  {
    id: 6,
    title: "Legalese Translator",
    description: "Chrome extension that summarizes complex Terms & Conditions into simple English.",
    model: "Gemini 1.5 Pro",
    status: "Archived",
    link: "https://tosdr.org/"
  },
  {
    id: 7,
    title: "UI Component Gen",
    description: "Generating production-ready Tailwind React components from hand-drawn sketches.",
    model: "Gemini 1.5 Flash",
    status: "Live",
    link: "https://tldraw.com/"
  },
  {
    id: 8,
    title: "Podcast Scriptwriter",
    description: "Turning daily news RSS feeds into engaging 2-person podcast scripts automatically.",
    model: "Claude 3.5 Sonnet",
    status: "Prototype",
    link: "https://notebooklm.google/"
  }
];

export const PROMPT_SHOWCASE: PromptShowcaseItem = {
  id: 1,
  context: "Goal: Generate a cyberpunk city image.",
  before: "Make a picture of a futuristic city with neon lights and rain. Dark vibes.",
  after: "/imagine prompt: extreme low angle shot, towering monolithic skyscrapers in a dystopic neo-tokyo, bioluminescent rain slicking the asphalt, volumetric fog, neon signs reflecting in puddles, cyberpunk aesthetic, cinematic lighting, 8k resolution, photorealistic, unreal engine 5 render --ar 16:9 --v 6.0"
};

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "AI Agent & Workflow Engineering",
    icon: Rocket,
    description: "Building autonomous systems and automating complex workflows using AI Agents, Make, and n8n.",
    features: ["Make & n8n Workflows", "Agentic Pipelines", "Self-Healing Workflows", "No-code Deployments"]
  },
  {
    id: 2,
    title: "Data Analytics & Excel Automations",
    icon: Database,
    description: "Leveraging AI for deep data analysis, building complex Excel models, and streamlining numeric tasks.",
    features: ["Excel Automation", "AI Data Analysis", "Formula Optimization", "Process Efficiency"]
  },
  {
    id: 3,
    title: "Business Intelligence & Power BI",
    icon: Activity,
    description: "Transforming raw data into actionable insights and structured visualizations using Power BI.",
    features: ["Data Visualisation", "KPI Dashboards", "Automated Reporting", "Interactive Charts"]
  },
  {
    id: 4,
    title: "Product Thinking & AI Innovation",
    icon: Brain,
    description: "From Tech 101 to deployment: rapid AI prototyping and validating MVPs for high ROI.",
    features: ["Product Management", "MVP Development", "Rapid Prototyping", "User-Centric AI"]
  },
  {
    id: 5,
    title: "Web Development",
    icon: Layers,
    description: "Building responsive, highly-performant modern web applications using React, TailwindCSS, and Next.js.",
    features: ["Frontend Architecture", "React & Next.js", "TailwindCSS Styling", "Performance Optimization"]
  },
  {
    id: 6,
    title: "Enterprise LLM Strategy",
    icon: ShieldCheck,
    description: "End-to-end implementation of Generative AI within corporate ecosystems, focusing on security & ROI.",
    features: ["RAG Architecture", "Prompt Optimization", "Security & Compliance", "Vendor Selection"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Desai",
    role: "CTO",
    company: "FinEdge India",
    content: "Akshay's implementation of automated data pipelines and AI in our financial reporting reduced analysis time by 80%. His understanding of Make and AI workflows is unmatched.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Director",
    company: "TechFlow Innovations",
    content: "We were struggling with our internal data workflows. Akshay redesigned our system using AI agents and Power BI dashboards, making our operations incredibly seamless.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
   {
    id: 3,
    name: "Vikram Singh",
    role: "Head of Operations",
    company: "HealthPlus Tech",
    content: "The workflow automation and MVP prototyping that Akshay delivered for our logistics team has saved us countless hours. His ability to build zero-to-one is exceptional.",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200"
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: "AI Generalist",
    issuer: "be10x",
    date: "May 23rd, 2026",
    expertise: [
      "AI Fundamentals & Ecosystem Mastery",
      "AI Product Building + AI in Data Analytics",
      "AI Agents & Autonomous Systems",
      "AI Branding & Leadership",
      "AI in Data Analytics"
    ],
    downloadLink: "/ai-generalist-certificate.pdf"
  },
  {
    id: 2,
    title: "Certified AI Foundations & Tools Specialist",
    issuer: "be10x",
    date: "May 23rd, 2026",
    expertise: [
      "The AI Generalist Mindset & Generative AI Ecosystem Deep Dive",
      "AI tools for research work & 10x Productivity"
    ],
    downloadLink: "/ai-foundations-certificate.pdf"
  },
  {
    id: 3,
    title: "Phase 1.2 : AI Product Building, Storytelling & Analytics",
    issuer: "be10x",
    date: "May 27th, 2026",
    expertise: [
      "Workflow Automation with Make",
      "Data Analysis with AI using Excel (numerous / automation)",
      "Data Visualisation with AI using PBI",
      "Product Thinking & AI Innovation",
      "Product Building & Tech 101"
    ],
    downloadLink: "/phase-1-2-certificate.pdf"
  }
];
