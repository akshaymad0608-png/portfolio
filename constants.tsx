import { Brain, Code2, Sparkles, Terminal, Cpu, MessageSquare, Layers, Rocket, Users, ShieldCheck, Database, Network, Activity, FileText, Wrench, Crop, Youtube, HeartPulse } from "lucide-react";
import { Project, Experiment, Skill, PromptShowcaseItem, Service, Testimonial } from "./types";

export const HERO_CONTENT = {
  headline: "Architecting the Future with Prompts",
  subheadline: "I bridge the gap between human intent and machine intelligence. Specializing in AI Automation, Multi-Agent Systems, and LLM Integration.",
  cta: "View My Work",
  image: "/profile-photo.jpg"
};

export const TECH_STACK = [
  "ChatGPT", "Claude", "Gemini", "DeepSeek", "Meta AI", "Grok", 
  "n8n", "Make", "MidJourney", "HeyGen", "ElevenLabs", "React", "AutoGPT", "Copilot"
];

export const AI_SYSTEM_INSTRUCTION = `
You are the AI Representative of Akshay Mahajan, a Prompt Engineer and Agentic AI Specialist.
Your goal is to answer questions from recruiters or potential clients about Akshay's work.
Akshay's background:
- Expertise in Prompt Engineering, Agentic AI Workflows, and Multimodal AI pipeline design.
- Notable projects: QuickResume.business, AI Master Tools, Photo Resizer, and Aiminivlogs4.
- Skills: LLMs (Gemini, Claude, DeepSeek), n8n, Make, React, MidJourney, AutoGPT.
Keep your tone: Professional, futuristic, slightly technical but accessible.
Keep responses concise (under 3 sentences).
If someone asks for a meeting, tell them to use the contact form at the bottom of the page.
`;

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
    level: 95, 
    icon: Network, 
    description: "Multi-agent workflows, n8n, Make, & pipeline design.",
    demoLink: "#work" 
  },
  { 
    name: "AI & LLMs", 
    level: 96, 
    icon: Brain, 
    description: "DeepSeek, Gemini, Claude, and OpenAI integrations.",
    demoLink: "#work" 
  },
  { 
    name: "Multimodal AI", 
    level: 90, 
    icon: Sparkles, 
    description: "MidJourney, HeyGen, ElevenLabs, and AI video/audio.",
    demoLink: "#showcase" 
  },
  { 
    name: "Web Development", 
    level: 88, 
    icon: Code2, 
    description: "React, Vercel, client-side processing, mobile-first UI.",
    demoLink: "#work" 
  },
  { 
    name: "Marketing & SEO", 
    level: 92, 
    icon: Activity, 
    description: "AI-driven content strategy, YouTube growth, and copy.",
    demoLink: "#work" 
  },
  { 
    name: "Data & Productivity", 
    level: 85, 
    icon: Database, 
    description: "Julius AI, data analysis, and workflow optimization.",
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
    id: 3,
    title: "Photo Resizer",
    category: "Utility Platform",
    year: "2024",
    description: "High-performance, 100% client-side image resizing tool for Indian government exam requirements. Achieved zero server infrastructure with offline capability.",
    tech: ["React", "Image Processing", "Web App"],
    link: "https://photoresizer.click",
    icon: Crop,
    stat: "1M+ USERS",
    elementId: "photo-resizer"
  },
  {
    id: 4,
    title: "SmartFit AI",
    category: "Health & Fitness",
    year: "2024",
    description: "Responsive AI-based fitness web application providing real-time recommendations. Demonstrated full-cycle AI product development from prompt design to deployment.",
    tech: ["React", "AI Prompts", "Vercel"],
    link: "https://smartfit-8ikq.vercel.app",
    icon: HeartPulse,
    stat: "LIVE PLATFORM",
    elementId: "smartfit"
  },
  {
    id: 5,
    title: "Aiminivlogs4",
    category: "YouTube Content",
    year: "2024",
    description: "Grew an AI-generated YouTube channel using LLM-scripted content, AI visuals, and data-driven SEO. Implemented end-to-end AI workflows for high engagement.",
    tech: ["LLMs", "HeyGen", "MidJourney", "SEO"],
    link: "https://youtube.com/@aiminivlogs4",
    icon: Youtube,
    stat: "YOUTUBE GROWTH",
    elementId: "aiminivlogs"
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
    title: "Enterprise LLM Strategy",
    icon: Layers,
    description: "End-to-end implementation of Generative AI within corporate ecosystems, focusing on security, scalability, and ROI.",
    features: ["RAG Architecture", "Model Fine-tuning", "Security & Compliance", "Vendor Selection"]
  },
  {
    id: 2,
    title: "AI Agent Engineering",
    icon: Rocket,
    description: "Building autonomous multi-agent systems to automate complex workflows and decision-making processes.",
    features: ["AutoGPT Swarms", "LangChain Orchestration", "Custom Tools & APIs", "Self-Healing Workflows"]
  },
  {
    id: 3,
    title: "Corporate Training",
    icon: Users,
    description: "Upskilling teams to leverage Prompt Engineering effectively, from basic prompting to advanced CoT strategies.",
    features: ["Advanced Prompting", "AI Safety Protocols", "Developer Tooling", "Executive Briefings"]
  },
  {
    id: 4,
    title: "AI Audit & Optimization",
    icon: ShieldCheck,
    description: "Analyzing existing AI implementations for cost, latency, accuracy, and hallucination risks.",
    features: ["Token Optimization", "Latency Reduction", "Hallucination Auditing", "Cost Analysis"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CTO",
    company: "FinTech Sol",
    content: "Akshay's implementation of RAG for our legal compliance team reduced document review time by 80%. His understanding of context windows and retrieval nuances is unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Product Director",
    company: "SaaS Flow",
    content: "We were struggling with hallucination in our customer support bot. Akshay redesigned the prompt architecture and introduced a verification layer that solved it completely.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
   {
    id: 3,
    name: "Elena Rodriguez",
    role: "Head of AI",
    company: "HealthPlus",
    content: "The fine-tuned Llama-3 model Akshay delivered performs on par with GPT-4 for our specific medical coding tasks, but at 1/10th the cost. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  }
];
