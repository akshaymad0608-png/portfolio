import { Brain, Code2, Sparkles, Terminal, Cpu, MessageSquare, Layers, Rocket, Users, ShieldCheck, Database, Network, Activity, FileText, Wrench, Crop, Youtube, HeartPulse, Globe, Search, Play, Settings, Navigation, Image as ImageIcon, Video, CheckCircle2, Award, Zap, FastForward, Clock, LayoutDashboard, Target, Languages, Send, Inbox } from "lucide-react";
import { Project, Experiment, Skill, PromptShowcaseItem, Service, Certificate, AIPortfolioAgent, ProcessStep, TrustFactor, SkillCategory, InternalBuild } from "./types";

export const HERO_CONTENT = {
  headline: "I build full-stack websites, wired with AI.",
  subheadline: "I'm Akshay Mahajan — a full-stack developer who ships fast with LLMs. Websites, web apps and custom tools, plus the AI agents and automation that make them smarter.",
  cta: "See My Work",
  cta2: "Hire Me Now",
  image: "/akshay-avatar-256.webp",
  badges: ["Full-Stack Web Dev", "AI Web Apps", "Custom AI Tools", "Automation"]
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
    skills: ["React", "Next.js", "Node.js", "GitHub", "Vercel", "Google AI Studio"]
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
  { id: 1, title: "Share Idea", description: "We dig into what you want to build, who it's for, and where AI genuinely earns its place.", icon: Target },
  { id: 2, title: "Plan Solution", description: "Architect the build — pages, data, and the AI wired in — as a scope you can see and sign off.", icon: Brain },
  { id: 3, title: "Build It", description: "Ship the MVP fast: front-end, back-end and any AI, chatbots or automation it needs.", icon: Code2 },
  { id: 4, title: "Review", description: "Rigorous testing, edge cases, performance and polish until it holds up in the real world.", icon: Settings },
  { id: 5, title: "Launch", description: "Deploy, monitor, scale — and hand over something you own and can keep running.", icon: Rocket }
];

export const TRUST_FACTORS: TrustFactor[] = [
  { id: 1, title: "Fast Delivery", icon: FastForward },
  { id: 2, title: "AI First Approach", icon: Brain },
  { id: 3, title: "Latest AI Knowledge", icon: Zap },
  { id: 4, title: "Real Working Projects", icon: Code2 },
  { id: 5, title: "Long Term Support", icon: Clock }
];

export const TECH_STACK = [
  "React", "Next.js", "Node.js", "TypeScript", "Tailwind", "Supabase",
  "GitHub", "Vercel", "Google AI Studio", "Claude", "ChatGPT", "Gemini",
  "n8n", "Make", "MidJourney", "HeyGen", "ElevenLabs"
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
  },
  {
    name: "React, TypeScript & Vite",
    level: 95,
    icon: Code2,
    description: "The stack behind every product here — typed components, fast builds, deployed on Vercel.",
    demoLink: "#work"
  },
  {
    name: "Technical SEO & Structured Data",
    level: 93,
    icon: Target,
    description: "JSON-LD graphs, canonicals, sitemaps and Search Console work — the markup search engines actually read.",
    demoLink: "#work"
  },
  {
    name: "Pre-rendering & AI Crawlability",
    level: 92,
    icon: Search,
    description: "Baking real content into static HTML so ChatGPT, Perplexity and Google's first pass see a page, not an empty shell.",
    demoLink: "#work"
  },
  {
    name: "PWAs & Offline-First Web",
    level: 90,
    icon: Zap,
    description: "Service workers, offline fallbacks and install prompts — shipping on tools used by a million people.",
    demoLink: "#work"
  },
  {
    name: "Performance & Accessibility",
    level: 89,
    icon: ShieldCheck,
    description: "Core Web Vitals, contrast ratios, tap targets and keyboard paths — checked, not assumed.",
    demoLink: "#work"
  },
  {
    name: "n8n, Docker & Self-Hosting",
    level: 88,
    icon: Database,
    description: "Containerised workflow stacks with backups, health checks and one-command deploys.",
    demoLink: "#work"
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Master Tools",
    category: "AI Tools Directory",
    problem: "Finding the right AI tool meant opening ten tabs and trusting whichever listicle ranked first. Tool makers had nowhere to get found.",
    solution: "A directory where search understands the job you're trying to do, not just the words you typed. Every tool, category and guide page is pre-rendered at build time with its own title, description and structured data — so the catalogue grows to thousands of indexable pages without hand-writing any of them.",
    features: ["Job-based Search", "Pre-rendered SEO Pages", "Side-by-side Compare", "Installable PWA (offline)"],
    results: "640+ hand-checked tools across 49 categories, plus an Earn Online directory of 145 sites. 1,700+ pages pre-rendered for search, and organic impressions grew ~7x over three months.",
    description: "A searchable AI tools directory with automatically generated, SEO-ready pages for every listing.",
    tech: ["React", "TypeScript", "TailwindCSS", "Vite", "Vercel"],
    year: "2024",
    link: "https://aimastertools.space",
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://aimastertools.space",
    icon: Wrench,
    stat: "640+ AI TOOLS",
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
    title: "FitSmart",
    category: "Fitness Platform",
    problem: "Working out what to eat and how much to train starts with six numbers — BMI, BMR, TDEE, body fat, ideal weight, macros. Every site that has them wants an account first, then sells you a plan you can't see yet.",
    solution: "A platform where the calculators are the front door: run your numbers, download them as a PDF, then follow a progressive program or ask the AI coach to build one. Nutrition guides and a food database sit alongside, so the plan and the eating advice agree with each other.",
    features: ["Six Health Calculators", "Progressive Programs", "AI Coach", "PDF Reports"],
    results: "Nine workout categories and three multi-week programs, from a 30-day beginner challenge to a 12-week push-pull-legs split with deloads. Calculators and guides need no account.",
    description: "A fitness platform pairing health calculators and structured programs with an AI coach and nutrition guides.",
    tech: ["React", "TypeScript", "TailwindCSS", "jsPDF", "Vite"],
    year: "2025",
    link: "https://fitsmart.space",
    // wait/8 lets the app hydrate before the shot, otherwise it captures skeletons.
    // The ?v suffix is a cache key — thum.io keys on the exact URL, so bump it
    // whenever the site changes visibly and the old screenshot needs retiring.
    image: "https://image.thum.io/get/wait/8/width/1200/crop/750/noanimate/https://fitsmart.space/?v=3",
    icon: HeartPulse,
    stat: "6 FREE CALCULATORS",
    elementId: "smartfit"
  },
  {
    id: 5,
    title: "Rosetta",
    category: "Voice & Video Translator",
    problem: "Two people who don't share a language usually need the same app installed on both phones, an account each, and a server in the middle that hears every word.",
    solution: "A translator that runs in the browser and nowhere else. Type or speak for a quick translation, pass one phone back and forth for a two-way spoken conversation, or share a room code for a video call where each side reads live translated subtitles.",
    features: ["Speech In and Out", "Two-Way Conversation Mode", "Video Call Subtitles", "40+ Languages"],
    results: "40+ languages including ten Indian ones. Video calls connect device to device, so nothing said on a call passes through a server — and there is no install and no sign-up on either end.",
    description: "A free browser translator for text, speech, live two-way conversation and video calls with translated subtitles.",
    tech: ["Web Speech API", "WebRTC / PeerJS", "JavaScript", "Static HTML"],
    year: "2025",
    link: "https://languagetransalator.com/",
    image: "https://image.thum.io/get/wait/8/width/1200/crop/750/noanimate/https://languagetransalator.com/?v=2",
    icon: Languages,
    stat: "40+ LANGUAGES",
    elementId: "language-translator"
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
    title: "Full-Stack Web Development",
    icon: Globe,
    description: "The core of what I do — fast, modern websites and web apps built end to end. Landing pages, dashboards, SaaS front-ends and everything behind them, shipped in weeks with AI doing the heavy lifting.",
    features: ["React & Next.js", "Node & APIs", "Responsive UI/UX", "SEO & Performance", "Vercel Deploy"]
  },
  {
    id: 2,
    title: "Custom AI Tools & Micro-SaaS",
    icon: Wrench,
    description: "Web tools and micro-SaaS MVPs that solve one clear problem and are easy to demo — like Photo Resizer (1M+ users) and QuickResume. From idea to live product.",
    features: ["MVP Development", "Client-Side Processing", "API Integration", "Monetizable Utilities"]
  },
  {
    id: 3,
    title: "AI Chatbot Development",
    icon: MessageSquare,
    description: "Client-facing chatbots trained on your business data to capture leads, answer FAQs and support customers 24/7 — embedded straight into your site.",
    features: ["Custom Knowledge Base", "Lead Generation", "Human Handoff", "Multi-channel Support"]
  },
  {
    id: 4,
    title: "AI Agent Development",
    icon: Rocket,
    description: "Practical AI agents that research, summarize, draft, route information and complete multi-step tasks — built into the products I ship.",
    features: ["Multi-Agent Systems", "Task Orchestration", "API Integration", "Autonomous Research"]
  },
  {
    id: 5,
    title: "AI Automation with n8n/Make",
    icon: Layers,
    description: "Connect your business apps and automate the repetitive work — leads, emails, reports, CRM updates and content tasks — so it runs without you.",
    features: ["Data Entry Automation", "CRM Syncing", "Email Triaging", "Custom Workflows"]
  },
  {
    id: 6,
    title: "Prompt Engineering",
    icon: Terminal,
    description: "Reliable prompt systems, content workflows and AI instructions that give consistent, production-ready outputs instead of one-off luck.",
    features: ["Zero/Few-Shot Prompting", "Chain-of-Thought", "Output Structuring", "Cost Optimization"]
  },
  {
    id: 7,
    title: "SEO & Content Automation",
    icon: Search,
    description: "Scale SEO blogs, social captions, reels scripts and marketing content with repeatable AI workflows — the same programmatic SEO behind my own tools.",
    features: ["Programmatic SEO", "Blog Generation", "Social Media Auto-posting", "Keyword Targeting"]
  },
  {
    id: 8,
    title: "AI Image/Video Generation",
    icon: Crop,
    description: "Product creatives, reel assets, avatars and video prompts for marketing — Midjourney, HeyGen and ElevenLabs, on brand.",
    features: ["Midjourney Mastery", "HeyGen Avatars", "Brand Consistency", "Marketing Assets"]
  },
  {
    id: 9,
    title: "Technical SEO & AI Search",
    icon: Target,
    description: "The half of SEO that happens in the markup: structured data, pre-rendered pages, canonicals and crawl budget — plus the newer job of being readable to ChatGPT, Perplexity and Google's AI answers, which don't run your JavaScript.",
    features: ["JSON-LD Structured Data", "Pre-rendering for Crawlers", "llms.txt & GEO/AEO", "Core Web Vitals", "Search Console Fixes"]
  },
  {
    id: 10,
    title: "Site Audit & Rescue",
    icon: ShieldCheck,
    description: "You already have a site and something is wrong with it — pages not indexing, zero clicks, a broken mobile layout, link previews showing nothing. I go through it end to end, find what's actually breaking, and fix it.",
    features: ["Indexing & Soft-404 Fixes", "Mobile & Layout Bugs", "Broken Links & Assets", "Accessibility Pass", "Written Findings"]
  },
  {
    id: 11,
    title: "Local SEO & Google Business",
    icon: Navigation,
    description: "For businesses that need to be found in one city. Consistent name, address and phone across your site and listing, local schema with real coordinates, service-area pages and a Google Business Profile that agrees with all of it.",
    features: ["NAP Consistency", "LocalBusiness Schema", "Google Business Profile", "Service-Area Pages", "Map Pack Targeting"]
  },
  {
    id: 12,
    title: "Installable & Offline Web Apps",
    icon: Zap,
    description: "Web apps that install to the home screen and keep working with no signal — service workers, offline fallbacks and an install prompt. The same setup running on AI Master Tools and Photo Resizer.",
    features: ["Service Workers", "Offline Fallback", "Install Prompt", "App Manifest", "Cache Strategy"]
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

/**
 * Builds with no public URL. They sit apart from PROJECTS on purpose — the
 * case-study section promises "open it and try it yourself", and these cannot
 * honour that. Described plainly instead, with no button that goes nowhere.
 */
export const INTERNAL_BUILDS: InternalBuild[] = [
  {
    id: 1,
    title: "Akshay LinkedIn OS",
    kind: "Automation stack",
    status: "Running privately",
    icon: Network,
    summary: "A LinkedIn content and lead system: ten n8n workflows on a Google Sheets brain, driven from Telegram.",
    detail: "Content drafting, AI-news collection, lead generation, engagement, connection handling, DM classification and profile optimisation each run as their own workflow, sharing a set of subworkflows. The news collector is the piece that runs live: six AI blogs polled every morning, cut to the day's eight after deduplication, written to a sheet and pushed to Telegram as one digest. The rest are built against a self-hosted stack that comes up with one command, with backups, health checks and a restore path.",
    tech: ["n8n", "Docker Compose", "Postgres", "Google Sheets", "Telegram Bot API"],
    facts: ["10 workflows", "News digest live, 9am daily", "200-prompt library", "69 passing tests"],
    diagram: { src: "/diagrams/wf-ai-news.svg", caption: "The AI news collector, the workflow in this stack that runs live" },
  },
  {
    id: 2,
    title: "Sweet Crumbs",
    kind: "E-commerce build",
    status: "Demo build",
    icon: Sparkles,
    summary: "A bakery storefront with a real cart and checkout, built to show a full commerce flow without a backend behind it.",
    detail: "Fourteen products across five categories with filtering, a slide-out cart that survives a refresh through localStorage, quantity controls and a complete checkout flow. Entirely client-side, so it deploys anywhere static.",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS"],
    facts: ["14 products, 5 categories", "Cart persisted locally", "Full checkout flow", "No backend required"],
  },
  {
    id: 3,
    title: "SEO Audit Toolkit",
    kind: "Internal tooling",
    status: "Internal tool",
    icon: Target,
    summary: "The zero-dependency Node CLI I run against my own sites every week, plus the page generators that came out of it.",
    detail: "Point it at a URL and it reports titles, descriptions, canonicals, heading structure, structured data and crawlability. Alongside it sit Search Console analysis scripts and the generators that produced the programmatic pages on several of the products listed above.",
    tech: ["Node.js", "Zero dependencies", "Search Console API"],
    facts: ["Run weekly on 6 sites", "No install step", "Schema + canonical checks", "Feeds the page generators"],
  },
  {
    id: 4,
    title: "Jewellery Business Intelligence",
    kind: "Automation stack",
    status: "Running privately",
    icon: LayoutDashboard,
    summary: "Thirteen n8n workflows that read a jewellery shop's sales sheet every night and send the owner a written analysis by 8pm.",
    detail: "A Google Sheet is the whole database — sales, customers, inventory. Every evening the system validates each row and logs what it rejects and why, then computes the day's revenue, order value and growth, re-segments customers from VIP to dormant, scores inventory for stockouts and dead stock, and raises restock alerts. Only then does an LLM see the numbers, as a brief carrying no names or phone numbers, and write the analysis. The report reaches Telegram and email in about twenty seconds. Marketing campaigns it proposes go nowhere until the owner approves them from a Telegram button, and only customers who have given marketing consent are ever contacted. The workflows are generated from source rather than clicked together, so a fix is a code change and a rebuild.",
    tech: ["n8n", "Google Sheets API", "Gemini", "Telegram Bot API", "Gmail API"],
    facts: ["13 workflows, 171 nodes", "Full report in ~22s", "193 automated checks", "Consent-gated, PII masked"],
    diagram: { src: "/diagrams/wf-jewellery-bi.svg", caption: "The master orchestrator; the other twelve run as sub-workflows" },
  },
  {
    id: 5,
    title: "Job Application Engine",
    kind: "Automation stack",
    status: "Running privately",
    icon: Send,
    summary: "Reads five public job boards every morning, scores each role against what I have actually shipped, and writes the application.",
    detail: "Remotive, RemoteOK, Arbeitnow, Himalayas and Jobicy are pulled at 07:30 and merged. A scoring pass runs before any model is called, so the LLM only ever sees plausible roles: title and stack matching, and a location rule read from the posting's location field rather than its prose — judging geography from the description let roles locked to Brazil, Mexico and a Berlin office through the filter on the first run, and every one was correctly rejected downstream at the cost of a model call. Surviving roles are deduplicated against everything already seen, then Gemini scores fit out of 100 and drafts the email, allowed to cite only the products on this site and told to skip rather than invent a reason to apply. A role is emailed automatically only if it scores 70 or above and the posting exposes a real address, capped at six a day. Most boards publish an apply link instead, so most runs end with a finished letter and a one-tap link waiting in Telegram rather than a sent email — which is the honest shape of the problem, not a workaround.",
    tech: ["n8n", "Gemini", "Gmail API", "Telegram Bot API", "n8n Data Tables"],
    facts: ["5 job APIs, no keys", "Scored 16 roles in two runs", "Best match 92/100", "Max 6 auto-applications a day"],
    diagram: { src: "/diagrams/wf-job-engine.svg", caption: "The whole engine, from the five feeds to the sent application" },
  },
  {
    id: 6,
    title: "Inbound Lead Engine",
    kind: "Automation stack",
    status: "Running privately",
    icon: Inbox,
    summary: "Triages my inbox every fifteen minutes and answers genuine enquiries before I have opened them.",
    detail: "Every enquiry from this site lands in one mailbox, so the system reads that rather than asking the site to change. Automated senders are dropped before the model is billed for them. Gemini then puts each mail in exactly one bucket — client lead, recruiter, job alert, vendor pitch, other — scores how much it is worth, and drafts a reply that repeats the specific ask back, cites at most two builds that prove the relevant thing, and asks the two questions that actually unblock a quote. It is forbidden to name a price or promise a date. Only leads and recruiters scoring 60 or more are answered automatically, never more than fifteen a day and never the same address twice inside a fortnight; everything else is logged and reported without a reply. It answered its first real enquiry twelve seconds after the mail arrived, citing the bakery storefront for order logic and the fitness platform for conversational AI.",
    tech: ["n8n", "Gmail API", "Gemini", "Telegram Bot API", "n8n Data Tables"],
    facts: ["Polls every 15 minutes", "First live reply in ~12s", "Max 15 replies a day", "14-day per-sender cooldown"],
    diagram: { src: "/diagrams/wf-lead-engine.svg", caption: "The whole engine, from unread mail to the answered enquiry" },
  },
];
