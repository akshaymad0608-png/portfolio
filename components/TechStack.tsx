import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const GROUPS = [
  { label: 'Automation', items: ['n8n', 'Make', 'Zapier', 'Apps Script'] },
  { label: 'Models', items: ['OpenAI', 'Claude', 'Gemini', 'DeepSeek', 'Grok'] },
  { label: 'Build', items: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Vercel'] },
  { label: 'Data', items: ['Supabase', 'PostgreSQL', 'Airtable', 'Vector DBs', 'Power BI'] },
  { label: 'Media', items: ['Midjourney', 'HeyGen', 'ElevenLabs', 'Runway'] },
  { label: 'Connects to', items: ['Slack', 'Notion', 'HubSpot', 'Sheets', 'WhatsApp'] },
];

const TechStack: React.FC = () => (
  <section className="relative py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="The stack"
        title="What I plug into"
        lead="Automations get built around the tools you already pay for, not instead of them."
        className="mb-14"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="panel h-full p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-5 bg-wire/50" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-wire">
                  {group.label}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-ink px-2.5 py-1.5 text-[13px] text-textSecondary transition-colors hover:border-wire/35 hover:text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
