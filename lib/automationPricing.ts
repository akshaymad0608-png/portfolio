/**
 * Everything the /ai-automation-pricing page quotes, in one place.
 *
 * Separate from lib/pricing.ts on purpose. That file prices one-off builds —
 * a website, an agent, a full product — quoted per project. This one prices
 * packaged automation retainers: a setup fee plus a monthly maintenance fee.
 * Two different shapes of deal, so two different tables; changing one must not
 * silently change the other.
 *
 * Rupee amounts are the source of truth for the page and the estimator. Edit
 * them here and both follow.
 */

export interface AutomationPlan {
  id: 'starter' | 'business' | 'premium';
  name: string;
  /** Shown verbatim. "Starting at" belongs in the string, not in code. */
  setup: string;
  setupLabel: string;
  monthly: string;
  monthlyLabel: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  /** What the estimator treats this tier as covering. */
  covers: {
    workflows: number;
    ai: AiLevel;
    volume: VolumeTier;
  };
}

export type AiLevel = 'none' | 'basic' | 'advanced' | 'agents';
export type VolumeTier = 'under100' | '100to1000' | '1000to5000' | 'over5000';
export type HostingChoice = 'self' | 'cloud' | 'unsure';

export const AUTOMATION_PLANS: AutomationPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    setup: '₹9,999',
    setupLabel: 'One-Time Setup',
    monthly: '+ ₹1,999/month',
    monthlyLabel: 'Maintenance & Support',
    description: 'Perfect for individuals, startups and small businesses.',
    features: [
      'Simple n8n Automation',
      'Up to 2 Workflows',
      'Form to Email Automation',
      'Google Sheets Integration',
      'Daily Automated Reports',
      'Basic AI Integration',
      'Workflow Testing & Deployment',
      'Basic Support',
    ],
    cta: 'Get Started',
    covers: { workflows: 2, ai: 'basic', volume: '100to1000' },
  },
  {
    id: 'business',
    name: 'Business',
    setup: '₹24,999',
    setupLabel: 'One-Time Setup',
    monthly: '+ ₹4,999/month',
    monthlyLabel: 'Maintenance & Support',
    description:
      'Perfect for growing businesses that need smarter workflows and AI automation.',
    features: [
      'Advanced n8n Workflows',
      'Up to 5 Workflows',
      'AI Lead Qualification',
      'Automated Email Workflows',
      'CRM Integration',
      'Google Sheets & Database Integration',
      'AI-Powered Daily Reports',
      'Lead Notifications',
      'Automated Business Workflows',
      'Workflow Testing & Deployment',
      'Priority Support',
    ],
    cta: 'Start Automating',
    popular: true,
    covers: { workflows: 5, ai: 'advanced', volume: '1000to5000' },
  },
  {
    id: 'premium',
    name: 'Premium AI Automation',
    setup: 'Starting at ₹49,999',
    setupLabel: 'Custom One-Time Setup',
    monthly: '+ ₹9,999/month',
    monthlyLabel: 'Maintenance & Support',
    description: 'For businesses that need a complete custom automation ecosystem.',
    features: [
      'Complete Custom AI Automation System',
      'AI Agents & Multi-Step Workflows',
      'Advanced Lead Generation System',
      'AI Lead Scoring & Qualification',
      'Email + WhatsApp Automation',
      'Automated Follow-Up System',
      'CRM Pipeline Automation',
      'Advanced Integrations',
      'Analytics & Automated Reporting',
      'Custom Database Integration',
      'Priority Support',
    ],
    cta: 'Book a Consultation',
    covers: { workflows: 99, ai: 'agents', volume: 'over5000' },
  },
];

/** The flow drawn in the "what is an execution" diagram. */
export const EXECUTION_FLOW = [
  '1 New Lead',
  'n8n Workflow Starts',
  'AI Processes the Lead',
  'Email / CRM / Notification Sent',
  '1 Execution',
];

export const USAGE_EXAMPLES = [
  { leads: '100 Leads', executions: 'Around 100 Workflow Executions' },
  { leads: '1,000 Leads', executions: 'Around 1,000 Workflow Executions' },
  { leads: '5,000 Leads', executions: 'Around 5,000 Workflow Executions' },
];

export const HOSTING_OPTIONS = [
  {
    id: 'self' as const,
    name: 'Self-Hosted n8n',
    description: 'Run your automation on your own VPS or cloud server.',
    bestFor: [
      'Higher workflow usage',
      'Custom automation requirements',
      'Greater control',
      'Advanced integrations',
      'Businesses planning to scale',
    ],
    note:
      'n8n Community Edition is available without a separate n8n subscription fee. Server/VPS, infrastructure and related service costs are charged separately by the selected provider.',
    cta: 'Discuss Self-Hosted Setup',
  },
  {
    id: 'cloud' as const,
    name: 'n8n Cloud',
    description: 'Use the official n8n hosted platform.',
    bestFor: ['Quick setup', 'No server management', 'Managed infrastructure', 'Easy maintenance'],
    note:
      'n8n Cloud pricing depends on the selected plan and included workflow execution limits. The n8n Cloud subscription is separate from my automation development and maintenance fees.',
    cta: 'Discuss n8n Cloud',
  },
];

/**
 * Third-party services. Every entry says what drives the cost and none of them
 * names a price — I do not sell these and their pricing is not mine to quote.
 */
export const THIRD_PARTY_COSTS = [
  {
    name: 'AI Models',
    emoji: '🤖',
    what: 'Claude, Gemini, ChatGPT and other AI APIs.',
    driver: 'Cost depends on selected models, number of requests and token usage.',
  },
  {
    name: 'Email Services',
    emoji: '📧',
    what: 'Email sending platforms and automation services.',
    driver: 'Cost depends on email volume and selected provider plan.',
  },
  {
    name: 'WhatsApp Automation',
    emoji: '💬',
    what: 'WhatsApp Business API or approved messaging providers.',
    driver: 'Cost depends on message/conversation volume, region and selected provider.',
  },
  {
    name: 'Hosting & Database',
    emoji: '☁️',
    what: 'VPS, cloud servers, databases and storage.',
    driver: 'Cost depends on selected infrastructure and resource usage.',
  },
  {
    name: 'CRM & Integrations',
    emoji: '📊',
    what: 'CRM subscriptions, premium APIs and other third-party tools.',
    driver: 'Cost depends on selected software and provider plans.',
  },
];

export const COST_FORMULA = [
  'My Maintenance & Support Fee',
  'n8n Cloud Plan OR VPS Hosting',
  'AI API Usage',
  'Email / WhatsApp Costs',
  'CRM & Other Third-Party Services',
];

export const WORKED_EXAMPLE = {
  heading: 'Example: AI Lead Generation Automation',
  setup: '₹24,999',
  setupLabel: 'One-Time Development',
  monthly: '₹4,999/month',
  monthlyLabel: 'Monthly Maintenance',
  additional: [
    'n8n Cloud plan or VPS hosting',
    'Claude, Gemini or ChatGPT API usage',
    'Email sending service',
    'WhatsApp API, if required',
    'CRM or database services',
  ],
  note:
    'Final third-party costs depend on the selected providers, plan limits and actual usage.',
};

export const AUTOMATION_FAQ = [
  {
    q: 'Does the pricing include n8n costs?',
    a: 'No. My development and maintenance pricing is separate from n8n hosting/cloud and other third-party service costs.',
  },
  {
    q: 'What is an n8n execution?',
    a: 'An execution generally means a workflow run. Actual usage can vary depending on triggers, workflow design and how workflows are structured.',
  },
  {
    q: 'Can I use my own n8n account?',
    a: 'Yes. Wherever possible, the automation can be configured using your own accounts and infrastructure.',
  },
  {
    q: 'Are AI API costs included?',
    a: 'No. Claude, Gemini, ChatGPT and other AI API usage is charged separately based on the selected provider and actual usage.',
  },
  {
    q: 'Can you create a custom automation?',
    a: 'Yes. Custom automation pricing depends on workflow complexity, integrations, AI requirements and expected scale.',
  },
  {
    q: 'Do I need technical knowledge?',
    a: 'No. I help with planning, development, testing and deployment. You can focus on your business while the automation handles repetitive workflows.',
  },
  {
    q: 'Can the automation scale later?',
    a: 'Yes. The architecture can be designed with future scaling requirements in mind, depending on the selected infrastructure and integrations.',
  },
];

/* --------------------------------------------------------- the estimator -- */

export const VOLUME_OPTIONS: { id: VolumeTier; label: string }[] = [
  { id: 'under100', label: 'Less than 100' },
  { id: '100to1000', label: '100–1,000' },
  { id: '1000to5000', label: '1,000–5,000' },
  { id: 'over5000', label: '5,000+' },
];

export const AI_OPTIONS: { id: AiLevel; label: string }[] = [
  { id: 'none', label: 'No AI Required' },
  { id: 'basic', label: 'Basic AI' },
  { id: 'advanced', label: 'Advanced AI' },
  { id: 'agents', label: 'AI Agents' },
];

export const HOSTING_CHOICES: { id: HostingChoice; label: string }[] = [
  { id: 'self', label: 'Self-Hosted' },
  { id: 'cloud', label: 'n8n Cloud' },
  { id: 'unsure', label: 'Not Sure' },
];

export const INTEGRATION_OPTIONS = [
  'Email',
  'WhatsApp',
  'CRM',
  'Google Sheets',
  'Database',
  'Other',
] as const;

export type Integration = (typeof INTEGRATION_OPTIONS)[number];

const AI_RANK: Record<AiLevel, number> = { none: 0, basic: 1, advanced: 2, agents: 3 };
const VOLUME_RANK: Record<VolumeTier, number> = {
  under100: 0,
  '100to1000': 1,
  '1000to5000': 2,
  over5000: 3,
};

/**
 * The smallest plan that covers a set of selections.
 *
 * This is the only "calculation" on the page, and it deliberately does not
 * invent money: it never produces a number that is not one of the three
 * published plan prices. Asking for AI agents or five thousand leads a month
 * moves you up a tier — it does not generate a surcharge I have not quoted.
 */
export const recommendPlan = (opts: {
  ai: AiLevel;
  volume: VolumeTier;
  integrations: Integration[];
}): AutomationPlan => {
  const needsAi = AI_RANK[opts.ai];
  const needsVolume = VOLUME_RANK[opts.volume];
  // Each integration is roughly a workflow's worth of work to build and keep running.
  const needsWorkflows = Math.max(1, opts.integrations.length);

  const fits = AUTOMATION_PLANS.find(
    (p) =>
      AI_RANK[p.covers.ai] >= needsAi &&
      VOLUME_RANK[p.covers.volume] >= needsVolume &&
      p.covers.workflows >= needsWorkflows,
  );
  return fits ?? AUTOMATION_PLANS[AUTOMATION_PLANS.length - 1];
};

/**
 * Which third-party bills the selections imply. Named, never priced — the
 * point is that the client knows what else they will be paying for, and pays
 * those providers directly.
 */
export const thirdPartyFor = (opts: {
  ai: AiLevel;
  hosting: HostingChoice;
  integrations: Integration[];
}): string[] => {
  const out: string[] = [];
  if (opts.hosting === 'cloud') out.push('n8n Cloud subscription');
  else if (opts.hosting === 'self') out.push('VPS or cloud server for self-hosted n8n');
  else out.push('n8n Cloud plan or a VPS, once we pick one');
  if (opts.ai !== 'none') out.push('AI API usage (Claude, Gemini or ChatGPT)');
  if (opts.integrations.includes('Email')) out.push('Email sending service');
  if (opts.integrations.includes('WhatsApp')) out.push('WhatsApp Business API provider');
  if (opts.integrations.includes('CRM')) out.push('CRM subscription');
  if (opts.integrations.includes('Database')) out.push('Database or storage hosting');
  return out;
};

/** The service option on /contact that this page's enquiries belong to. */
export const CONTACT_SERVICE = 'Automation setup (n8n / Make / Zapier)';
export const WHATSAPP_NUMBER = '917600885080';
