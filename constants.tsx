import { Brain, Code2, Sparkles, Terminal, Cpu, MessageSquare, Layers, Rocket, Users, ShieldCheck, Database, Network, Activity, FileText, Wrench, Crop, Youtube, HeartPulse, Globe, Search, Play, Settings, Navigation, Image as ImageIcon, Video, CheckCircle2, Award, Zap, FastForward, Clock, LayoutDashboard, Target } from "lucide-react";
import { Project, Experiment, Skill, PromptShowcaseItem, Service, Testimonial, Certificate, AIPortfolioAgent, ProcessStep, TrustFactor, SkillCategory } from "./types";

export const HERO_CONTENT = {
  headline: "AI Portfolio Built to Win Clients & Company Projects",
  subheadline: "Hi, I'm Akshay Mahajan — I build client-ready AI tools, automation workflows, chatbots and high-conversion websites that companies can review, trust and hire quickly.",
  cta: "View Client Work",
  cta2: "Start a Project",
  image: "./akshay_avatar.jpeg",
  badges: ["AI Portfolio", "Client Projects", "AI Automation", "Chatbots", "Web Apps"]
};

export const DASHBOARD_SKILLS: SkillCategory[] = [
  {
    title: "Prompt Engineering",
    skills: ["Prompt Design", "Chain-of-Thought", "Few/Zero-Shot", "System Architecture"]
  },
  {
    title: "AI & LLMs",
    skills: ["ChatGPT", "Claude", "Gemini", "DeepSeek", "Grok", "OpenAI API"]
  },
  {
    title: "Agentic & Automation",
    skills: ["n8n", "Make", "AI Agents", "Agent Workflows", "AI Pipeline Design"]
  },
  {
    title: "Multimodal AI",
    skills: ["MidJourney", "Runway", "ElevenLabs", "Sora", "HeyGen", "Veo"]
  },
  {
    title: "Web & Development",
    skills: ["React", "Next.js", "Replit", "Lovable AI", "Vercel", "TailwindCSS"]
  },
  {
    title: "Marketing & SEO",
    skills: ["SEO Strategy", "Marketing Automation", "Copywriting", "YouTube Growth"]
  },
  {
    title: "Data & Productivity",
    skills: ["Data Analysis", "Excel", "Julius AI", "Manus AI", "Nano Banana AI"]
  }
];

export const AI_SYSTEMS: AIPortfolioAgent[] = [
  {
    id: 1,
    title: "Customer Support AI Agent",
    icon: MessageSquare,
    features: ["24/7 Support", "Website Chatbot", "WhatsApp Integration"]
  },
  {
    id: 2,
    title: "SEO Automation Agent",
    icon: Search,
    features: ["Keyword Research", "Blog Generation", "Meta Tags"]
  },
  {
    id: 3,
    title: "Resume AI Agent",
    icon: FileText,
    features: ["ATS Checking", "Resume Builder", "Suggestions"]
  },
  {
    id: 4,
    title: "Data Analysis Agent",
    icon: Database,
    features: ["Excel Analysis", "Reports", "Charts"]
  },
  {
    id: 5,
    title: "Content Creation Agent",
    icon: Video,
    features: ["Scripts", "Images", "Videos"]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 1, title: "Share Idea", description: "Deep dive into your business bottlenecks and identify areas where AI can drive ROI.", icon: Target },
  { id: 2, title: "Plan Solution", description: "Architect a custom, scalable AI integrated solution tailored specifically to your needs.", icon: Brain },
  { id: 3, title: "Build Prototype", description: "Develop and train the MVP, chaining prompts and connecting backend AI models.", icon: Code2 },
  { id: 4, title: "Review", description: "Rigorous testing, edge-case mitigation, prompt optimization and refinement.", icon: Settings },
  { id: 5, title: "Launch", description: "Deployment, system monitoring, scaling, and handing over the keys to automation.", icon: Rocket }
];

export const TRUST_FACTORS: TrustFactor[] = [
  { id: 1, title: "Fast Delivery", icon: FastForward },
  { id: 2, title: "AI First Approach", icon: Brain },
  { id: 3, title: "Latest AI Knowledge", icon: Zap },
  { id: 4, title: "Real Working Projects", icon: Code2 },
  { id: 5, title: "Long Term Support", icon: Clock }
];

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
    title: "AI Master Tools",
    category: "AI Tools Directory",
    problem: "Users needed a centralized platform to discover and compare AI tools, while creators needed visibility.",
    solution: "Built an exhaustive AI tools directory with semantic search, robust categorizations, and an automated SEO engine.",
    features: ["Semantic Search Engine", "Automated SEO Generation", "Admin Dashboard", "Dynamic Filtering"],
    results: "Scaled to 200+ curated tools across 10 categories, driving significant organic traffic within a month.",
    description: "Developed a comprehensive AI tools directory with a focus on SEO and performance.",
    tech: ["React", "Next.js", "TailwindCSS", "PostgreSQL"],
    year: "2024",
    link: "https://aimastertools.space",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    icon: Wrench,
    stat: "200+ AI TOOLS",
    elementId: "ai-master-tool"
  },
  {
    id: 2,
    title: "QuickResume.Business",
    category: "AI SaaS",
    problem: "Job seekers spent hours writing resumes that still struggled to beat ATS systems.",
    solution: "Developed an AI-powered resume builder connecting user input with LLM APIs to generate tailored, ATS-friendly resumes instantly.",
    features: ["LLM Content Generation", "ATS Score Checker", "PDF Export", "Real-time Preview"],
    results: "Helped thousands of users generate optimized resumes quickly, reducing writing time by 80%.",
    description: "Built an AI-powered resume creation platform with LLM-based content generation for tailored summaries.",
    tech: ["React", "LLMs", "Client-Side Processing"],
    year: "2024",
    link: "https://quickresume.business",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    icon: FileText,
    stat: "ATS-OPTIMIZED",
    elementId: "quickresume"
  },
  {
    id: 3,
    title: "Photo Resizer",
    category: "Utility App",
    problem: "Applicants struggled with strict government exam image sizing requirements.",
    solution: "Created a pure client-side image processing utility ensuring privacy and speed.",
    features: ["Client-Side Cropping", "Compression Algorithm", "Offline capability", "Format Conversion"],
    results: "Processed thousands of images, cutting down rejection rates for forms by 90%.",
    description: "High-performance, 100% client-side image resizing tool for Indian government exam requirements.",
    tech: ["React", "Image Processing", "Web App"],
    year: "2024",
    link: "https://photoresizer.click",
    icon: Crop,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    stat: "1M+ USERS",
    elementId: "photo-resizer"
  },
  {
    id: 4,
    title: "SmartFit AI",
    category: "AI Agent",
    problem: "People lacked customized workout plans that adapted to their limited equipment and fitness level.",
    solution: "Deployed an interactive AI Agent that generates and monitors bespoke fitness plans.",
    features: ["AI Plan Generation", "Progress Tracking", "Equipment Adapting", "Responsive UI"],
    results: "Showcased robust RAG and prompt engineering techniques for personalized outputs.",
    description: "Responsive AI-based fitness web application providing real-time recommendations.",
    tech: ["React", "AI Prompts", "Vercel"],
    year: "2025",
    link: "https://smartfit-8ikq.vercel.app",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    icon: HeartPulse,
    stat: "LIVE PLATFORM",
    elementId: "smartfit"
  }
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 1,
    title: "AI Prompt Generator",
    description: "Create optimized prompts for Midjourney, ChatGPT, and Claude instantly.",
    model: "GPT-4o",
    status: "Live",
  },
  {
    id: 2,
    title: "Resume Analyzer",
    description: "Scan your resume against a job description and get an ATS match score.",
    model: "Claude 3.5 Sonnet",
    status: "Live",
    link: "https://quickresume.business"
  },
  {
    id: 3,
    title: "SEO Generator",
    description: "Automated pipeline that generates full-length, SEO-optimized blog posts.",
    model: "Gemini 1.5 Pro",
    status: "Prototype",
  },
  {
    id: 4,
    title: "Image Prompt Creator",
    description: "Generate highly detailed image prompts for Midjourney v6.",
    model: "GPT-4o",
    status: "Prototype",
  },
  {
    id: 5,
    title: "AI Tools Finder",
    description: "Semantic search engine to find the exact AI tool you need.",
    model: "DeepSeek R1",
    status: "Live",
    link: "https://aimastertools.space"
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
    title: "AI Chatbot Development",
    icon: MessageSquare,
    description: "Client-facing chatbots trained on your business data to capture leads, answer FAQs and support customers 24/7.",
    features: ["Custom Knowledge Base", "Lead Generation", "Human Handoff", "Multi-channel Support"]
  },
  {
    id: 2,
    title: "AI Automation with n8n/Zapier",
    icon: Layers,
    description: "Connect your business apps and automate repetitive work such as leads, emails, reports, CRM updates and content tasks.",
    features: ["Data Entry Automation", "CRM Syncing", "Email Triaging", "Custom Workflows"]
  },
  {
    id: 3,
    title: "AI Agent Development",
    icon: Rocket,
    description: "Build practical AI agents that research, summarize, draft, route information and complete multi-step business tasks.",
    features: ["Multi-Agent Systems", "Task Orchestration", "API Integration", "Autonomous Research"]
  },
  {
    id: 4,
    title: "Prompt Engineering",
    icon: Terminal,
    description: "Create reliable prompt systems, content workflows and AI instructions for consistent business outputs.",
    features: ["Zero/Few-Shot Prompting", "Chain-of-Thought", "Output Structuring", "Cost Optimization"]
  },
  {
    id: 5,
    title: "SEO & Content Automation",
    icon: Search,
    description: "Scale SEO blogs, social media captions, reels scripts and marketing content with repeatable AI workflows.",
    features: ["Programmatic SEO", "Blog Generation", "Social Media Auto-posting", "Keyword Targeting"]
  },
  {
    id: 6,
    title: "AI Website Development",
    icon: Globe,
    description: "Build premium, fast-loading portfolio, product, service and landing pages that help companies understand your offer quickly.",
    features: ["Responsive Design", "Next.js & React", "High Performance", "Modern UI/UX"]
  },
  {
    id: 7,
    title: "AI Image/Video Generation",
    icon: Crop,
    description: "Create AI visuals, product creatives, reel assets, avatars and video prompts for business marketing.",
    features: ["Midjourney Mastery", "HeyGen Avatars", "Brand Consistency", "Marketing Assets"]
  },
  {
    id: 8,
    title: "Custom AI Tools",
    icon: Wrench,
    description: "Build custom web tools and micro-SaaS MVPs that solve one clear business problem and are easy to demo.",
    features: ["Client-Side Processing", "API Integration", "MVP Development", "Monetizable Utilities"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "E-commerce Founder",
    role: "CEO",
    company: "D2C Brand",
    content: "Akshay's implementation of automated data pipelines and an AI chatbot for our support reduced resolution time by 80%. His understanding of automation workflows is unmatched.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Marketing Director",
    role: "Head of Growth",
    company: "Tech Agency",
    content: "We were struggling with our content generation workflows. Akshay redesigned our system using AI agents and SEO automation, making our operations incredibly seamless and fast.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
   {
    id: 3,
    name: "Tech Startup CEO",
    role: "Founder",
    company: "SaaS Platform",
    content: "The workflow automation and AI features that Akshay delivered for our MVP saved us countless hours. His ability to build zero-to-one is exceptional and highly professional.",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200"
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: "Certificate of Mastery — AI Generalist",
    issuer: "be10X | AI Career Accelerator Program (ISO Certified | DPIIT Startup India)",
    date: "May 2026",
    expertise: [
      "AI Fundamentals & Ecosystem Mastery",
      "AI Product Building",
      "AI in Data Analytics",
      "AI Agents & Autonomous Systems",
      "AI Branding & Leadership"
    ]
  },
  {
    id: 2,
    title: "Certificate of Mastery — Certified AI Foundations & Tools Specialist",
    issuer: "be10X | AI Career Accelerator Program (ISO Certified | DPIIT Startup India)",
    date: "May 2026",
    expertise: [
      "AI Generalist Mindset",
      "Generative AI Ecosystem Deep Dive",
      "AI Tools for Research",
      "10x Productivity"
    ]
  },
  {
    id: 3,
    title: "Certificate of Mastery — AI Product Building, Storytelling & Analytics",
    issuer: "be10X | AI Career Accelerator Program (ISO Certified | DPIIT Startup India)",
    date: "May 2026",
    expertise: [
      "Workflow Automation with Make",
      "Data Analysis with AI using Excel",
      "Data Visualisation with AI using Power BI",
      "Product Thinking & AI Innovation",
      "Product Building & Tech 101"
    ]
  }
];
