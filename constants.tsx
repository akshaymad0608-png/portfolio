import { Brain, Code2, Sparkles, Terminal, Cpu, MessageSquare, Layers, Rocket, Users, ShieldCheck, Database, Network, Activity, FileText, Wrench, Crop, Youtube, HeartPulse, Globe, Search, Play, Settings, Navigation, Image as ImageIcon, Video, CheckCircle2, Award, Zap, FastForward, Clock, LayoutDashboard, Target } from "lucide-react";
import { Project, Experiment, Skill, PromptShowcaseItem, Service, Testimonial, Certificate, AIPortfolioAgent, ProcessStep, TrustFactor, SkillCategory } from "./types";
import { AVATAR_DATA_URI } from "./lib/avatarImage";

export const HERO_CONTENT = {
  headline: "I Build AI Automation & Smart Workflows to Scale Your Business",
  subheadline: "Stop doing repetitive tasks. I'm Akshay Mahajan — I build intelligent AI agents, chatbots, automation pipelines, and high-conversion websites that save hours of manual work and boost your revenue.",
  cta: "See My Work",
  cta2: "Hire Me Now",
  image: AVATAR_DATA_URI,
  badges: ["AI Automation", "Smart Chatbots", "Custom Web Apps", "Prompt Engineering"]
};

export const DASHBOARD_SKILLS: SkillCategory[] = [
  {
    title: "AI Strategy & Deployment",
    skills: ["Generative AI", "Real-World Problem Framing", "End-to-End Solutions", "The AI Generalist Mindset", "Ecosystem Deep Dive"]
  },
  {
    title: "Automation & Operations",
    skills: ["Workflow Automation", "AI System Design", "AI in Business Communication", "Team Leadership"]
  },
  {
    title: "Creative & Media AI",
    skills: ["AI Image Generation", "AI Video Generation", "MidJourney", "Prompt Engineering"]
  },
  {
    title: "Career & Branding",
    skills: ["LinkedIn Optimization", "ATS Resume Writing", "Agentic Job Hunting", "Interview Skills"]
  },
  {
    title: "Web & Development",
    skills: ["React", "Next.js", "Web Deployment", "Client-Side Tools"]
  },
  {
    title: "Business Growth",
    skills: ["Make Money Using AI", "Marketing Automation", "Research using AI"]
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
    name: "AI System Design & Workflow Automation", 
    level: 98, 
    icon: Network, 
    description: "Designing end-to-end architectures, multi-agent systems, and scalable orchestration.",
    demoLink: "#work" 
  },
  { 
    name: "Generative AI Ecosystem Deep Dive", 
    level: 96, 
    icon: Cpu, 
    description: "Mastery over LLMs, Prompt Engineering, and the broader AI Generalist Mindset.",
    demoLink: "#showcase" 
  },
  { 
    name: "AI Powered Image & Video Generation", 
    level: 95, 
    icon: Layers, 
    description: "Creating high-quality visuals, marketing assets, and video content using cutting-edge AI.",
    demoLink: "#work" 
  },
  {
    name: "Real-World Problem Framing",
    level: 94,
    icon: Terminal,
    description: "Identifying bottlenecks and framing them into actionable AI and automation solutions.",
    demoLink: "#work"
  },
  { 
    name: "AI in Business Communication", 
    level: 92, 
    icon: Database, 
    description: "Leveraging AI for team leadership, process documentation, and seamless communication.",
    demoLink: "#work" 
  },
  { 
    name: "End-to-End Solution Deployment", 
    level: 90, 
    icon: Code2, 
    description: "Full-stack development, Vercel deployments, and delivering client-ready products.",
    demoLink: "#work" 
  },
  {
    name: "Agentic Job Hunting & Resume Writing",
    level: 88,
    icon: Activity,
    description: "ATS optimization, interview skills, and deploying AI agents for job applications.",
    demoLink: "#work"
  },
  { 
    name: "Research & LinkedIn Optimization", 
    level: 90, 
    icon: Layers, 
    description: "Deep research methodologies and personal branding strategies using AI.",
    demoLink: "#work" 
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Master Tools",
    category: "AI Tools Directory",
    problem: "Finding the right AI tool meant opening ten tabs and trusting whichever listicle ranked first. Tool makers had nowhere to get found.",
    solution: "A directory where search understands what you are trying to do, not just the words you typed, and where every tool page is generated automatically so the catalogue can grow without me hand-writing each one.",
    features: ["Semantic Search Engine", "Automated SEO Generation", "Admin Dashboard", "Dynamic Filtering"],
    results: "Indexing 200+ tools across 10 categories, with organic search traffic arriving inside the first month.",
    description: "A searchable AI tools directory with automatically generated, SEO-ready pages for every listing.",
    tech: ["React", "Next.js", "TailwindCSS", "PostgreSQL"],
    year: "2024",
    link: "https://aimastertools.space",
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://aimastertools.space",
    icon: Wrench,
    stat: "200+ AI TOOLS",
    elementId: "ai-master-tool"
  },
  {
    id: 2,
    title: "QuickResume.Business",
    category: "AI SaaS",
    problem: "Job seekers spend hours on a resume that an applicant tracking filter rejects before a human ever opens it.",
    solution: "A builder that takes plain answers about your experience and writes them up in a format ATS parsers can actually read, with a score showing what would fail before you send it.",
    features: ["LLM Content Generation", "ATS Score Checker", "PDF Export", "Real-time Preview"],
    results: "Turns an afternoon of rewriting into a single pass. Free to use, with no signup wall in front of it.",
    description: "An AI resume builder that writes ATS-readable resumes and scores them before you send.",
    tech: ["React", "LLMs", "Client-Side Processing"],
    year: "2024",
    link: "https://quickresume.business",
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://quickresume.business",
    icon: FileText,
    stat: "ATS-OPTIMIZED",
    elementId: "quickresume"
  },
  {
    id: 3,
    title: "Photo Resizer",
    category: "Utility App",
    problem: "Indian government exam portals reject photos over exact dimension and file-size limits, and rarely say which one you broke.",
    solution: "A resizer that runs entirely in the browser. Pick the exam, get a file that fits the spec — no upload, no queue, no account.",
    features: ["Client-Side Cropping", "Compression Algorithm", "Offline capability", "Format Conversion"],
    results: "Used by over a million people. Works offline once loaded, and no photo ever leaves the device.",
    description: "A fully client-side image resizer built for Indian government exam upload rules.",
    tech: ["React", "Image Processing", "Web App"],
    year: "2024",
    link: "https://photoresizer.click",
    icon: Crop,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://photoresizer.click",
    stat: "1M+ USERS",
    elementId: "photo-resizer"
  },
  {
    id: 4,
    title: "SmartFit AI",
    category: "AI Agent",
    problem: "Generic workout plans assume a full gym. Most people have a mat, two dumbbells and forty minutes.",
    solution: "An agent that asks what equipment and time you actually have, writes the plan around those limits, and adjusts it as you log sessions.",
    features: ["AI Plan Generation", "Progress Tracking", "Equipment-Aware Output", "Responsive UI"],
    results: "A working demonstration of constraint-aware prompting — change your inputs and the plan genuinely changes, rather than returning the same template.",
    description: "An AI fitness planner that builds around the equipment and time you actually have.",
    tech: ["React", "AI Prompts", "Vercel"],
    year: "2025",
    link: "https://smartfit-8ikq.vercel.app",
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://smartfit-8ikq.vercel.app",
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
    title: "Capstone Project",
    issuer: "be10X | AI Career Accelerator Program",
    date: "July 6th, 2026",
    expertise: [
      "Real-World Problem Framing",
      "AI System Design & Workflow Automation",
      "End-to-End Solution Deployment"
    ]
  },
  {
    id: 2,
    title: "Phase 1.5 : AI Strategy, Branding & Leadership",
    issuer: "be10X | AI Career Accelerator Program",
    date: "July 6th, 2026",
    expertise: [
      "AI Powered Image & Video Generation",
      "AI in Business Communication & Team leadership",
      "Make Money Using AI"
    ]
  },
  {
    id: 3,
    title: "Phase 1.4 : Career Readiness Using AI",
    issuer: "be10X | AI Career Accelerator Program",
    date: "July 6th, 2026",
    expertise: [
      "ATS Friendly Resume Writing + Interview Skills",
      "Job Hunting and Job Application Using AI - (Agentic Process)"
    ]
  },
  {
    id: 4,
    title: "Phase 1.1: AI Fundamentals & Ecosystem Mastery",
    issuer: "be10X | AI Career Accelerator Program",
    date: "July 6th, 2026",
    expertise: [
      "The AI Generalist Mindset",
      "Generative AI Ecosystem Deep Dive",
      "Research work using AI - Linkedin optimisation with AI"
    ]
  }
];
