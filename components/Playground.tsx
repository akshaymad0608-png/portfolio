import React, { useMemo, useState } from 'react';
import { Wand2, Image as ImageIcon, Braces, Check, Copy, Play } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

/**
 * A working playground, not a screenshot.
 *
 * Three tools that run entirely in the browser — the same client-side approach
 * behind Photo Resizer (1M+ users, no server, nothing uploaded). Visitors can
 * try the actual thing instead of reading that I can build it.
 */

type TabId = 'prompt' | 'resize' | 'json';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'prompt', label: 'Prompt builder', icon: Wand2 },
  { id: 'resize', label: 'Image resizer', icon: ImageIcon },
  { id: 'json', label: 'JSON formatter', icon: Braces },
];

const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard blocked — nothing to do */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-textSecondary transition-colors hover:border-wire/50 hover:text-wire"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : label}
    </button>
  );
};

/* ---------------------------------------------------------------- prompt -- */

const ROLES = ['senior engineer', 'technical writer', 'growth marketer', 'data analyst'];
const FORMATS = ['bullet points', 'a short table', 'step-by-step', 'plain paragraphs'];

const PromptBuilder: React.FC = () => {
  const [task, setTask] = useState('review my landing page copy');
  const [role, setRole] = useState(ROLES[0]);
  const [format, setFormat] = useState(FORMATS[0]);
  const [constraints, setConstraints] = useState(true);

  const prompt = useMemo(
    () =>
      [
        `# Role`,
        `You are a ${role}. Be specific and concrete; skip preamble.`,
        ``,
        `# Task`,
        task.trim() || 'describe the task',
        ``,
        `# Output`,
        `Answer in ${format}.`,
        ...(constraints
          ? ['', '# Constraints', '1. Name every assumption you make.', '2. Flag anything you cannot verify.', '3. If something is wrong, say so before improving it.']
          : []),
      ].join('\n'),
    [task, role, format, constraints],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-4">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">What do you need done?</span>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-ink px-4 py-3 text-[15px] text-text outline-none transition-colors placeholder:text-muted focus:border-wire"
            placeholder="review my landing page copy"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">Act as</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-ink px-3 py-3 text-[15px] text-text outline-none focus:border-wire"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">Answer as</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-ink px-3 py-3 text-[15px] text-text outline-none focus:border-wire"
            >
              {FORMATS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-ink px-4 py-3">
          <input
            type="checkbox"
            checked={constraints}
            onChange={(e) => setConstraints(e.target.checked)}
            className="h-4 w-4 accent-wire"
          />
          <span className="text-[14px] text-textSecondary">Add anti-hallucination constraints</span>
        </label>
      </div>

      <div className="min-w-0 flex flex-col rounded-xl border border-border bg-ink">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">prompt.md</span>
          <CopyButton text={prompt} />
        </div>
        <pre className="flex-1 overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-textSecondary">{prompt}</pre>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- resize -- */

const ImageResizer: React.FC = () => {
  const [out, setOut] = useState<{ url: string; kb: number; w: number; h: number } | null>(null);
  const [targetKb, setTargetKb] = useState(50);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File) => {
    setBusy(true);
    try {
      const bitmap = await createImageBitmap(file);
      const maxSide = 1200;
      const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
      const w = Math.round(bitmap.width * scale);
      const h = Math.round(bitmap.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d')?.drawImage(bitmap, 0, 0, w, h);

      // walk quality down until it fits the target — the Photo Resizer trick
      let quality = 0.92;
      let blob: Blob | null = null;
      for (let i = 0; i < 8; i++) {
        blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', quality));
        if (!blob || blob.size / 1024 <= targetKb) break;
        quality -= 0.1;
        if (quality < 0.2) break;
      }
      if (blob) setOut({ url: URL.createObjectURL(blob), kb: Math.round(blob.size / 1024), w, h });
    } catch {
      /* unsupported file — silently ignore */
    }
    setBusy(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-4">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Target size — {targetKb} KB
          </span>
          <input
            type="range"
            min={10}
            max={300}
            step={5}
            value={targetKb}
            onChange={(e) => setTargetKb(Number(e.target.value))}
            className="mt-3 w-full accent-wire"
          />
        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-ink px-6 py-10 text-center transition-colors hover:border-wire/50">
          <ImageIcon size={22} className="text-wire" />
          <span className="text-[15px] font-medium text-text">Choose a photo</span>
          <span className="text-[13px] text-muted">It never leaves your device — everything runs here in the browser.</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      </div>

      <div className="min-w-0 flex flex-col items-center justify-center rounded-xl border border-border bg-ink p-5">
        {busy && <p className="font-mono text-[12px] text-muted">compressing…</p>}
        {!busy && !out && <p className="font-mono text-[12px] text-muted">output appears here</p>}
        {!busy && out && (
          <div className="w-full text-center">
            <img src={out.url} alt="Resized result" className="mx-auto max-h-52 rounded-lg border border-border" />
            <p className="mt-3 font-mono text-[12px] text-textSecondary">
              <span className="text-wire">{out.kb} KB</span> · {out.w}×{out.h}px
            </p>
            <a
              href={out.url}
              download="resized.jpg"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-textSecondary transition-colors hover:border-wire/50 hover:text-wire"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ json -- */

const JsonFormatter: React.FC = () => {
  const [raw, setRaw] = useState('{"name":"Akshay","stack":["React","Node"],"ships":true}');
  const result = useMemo(() => {
    try {
      return { ok: true as const, text: JSON.stringify(JSON.parse(raw), null, 2) };
    } catch (e: any) {
      return { ok: false as const, text: e.message as string };
    }
  }, [raw]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <label className="min-w-0 flex flex-col">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">Paste JSON</span>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={9}
          spellCheck={false}
          className="mt-2 w-full flex-1 resize-none rounded-xl border border-border bg-ink p-4 font-mono text-[12.5px] text-text outline-none focus:border-wire"
        />
      </label>

      <div className="min-w-0 flex flex-col rounded-xl border border-border bg-ink">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {result.ok ? 'formatted' : 'invalid json'}
          </span>
          {result.ok && <CopyButton text={result.text} />}
        </div>
        <pre
          className={`flex-1 overflow-auto p-4 font-mono text-[12.5px] leading-relaxed ${
            result.ok ? 'text-textSecondary' : 'text-[#B91C1C]'
          }`}
        >
          {result.text}
        </pre>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ shell -- */

const Playground: React.FC = () => {
  const [tab, setTab] = useState<TabId>('prompt');

  return (
    <section className="relative border-y border-border bg-section py-24 md:py-32" aria-labelledby="playground-heading">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Playground"
          title={<span id="playground-heading">Try the work,<br className="hidden md:block" /> don't just read about it.</span>}
          lead="Three real tools running in this page — no server, no upload, no signup. The same client-side approach behind Photo Resizer."
          className="mb-10"
        />

        <Reveal delay={0.1}>
          <div className="panel ticked overflow-hidden">
            <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-frame px-3 py-2.5">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-pressed={active}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      active ? 'bg-wire text-ink' : 'text-textSecondary hover:bg-frame hover:text-text'
                    }`}
                  >
                    <Icon size={14} />
                    {t.label}
                  </button>
                );
              })}
              <span className="ml-auto hidden shrink-0 items-center gap-1.5 pr-2 font-mono text-[11px] text-wire sm:inline-flex">
                <Play size={11} /> live
              </span>
            </div>

            <div className="p-5 md:p-7">
              {tab === 'prompt' && <PromptBuilder />}
              {tab === 'resize' && <ImageResizer />}
              {tab === 'json' && <JsonFormatter />}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Playground;
