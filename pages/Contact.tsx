import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Check, ArrowRight, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';

const SERVICES = [
  'Automation setup (n8n / Make / Zapier)',
  'AI agent or chatbot',
  'Full product build',
  'Prompt engineering / content systems',
  'SEO & content automation',
  'Not sure yet',
];

const BUDGETS = ['Under $1,000', '$1,000 – $3,000', '$3,000 – $10,000', 'Over $10,000', 'Need guidance'];

const fieldClass =
  'w-full rounded-xl border border-border bg-ink px-4 py-3 text-[15px] text-text placeholder-muted transition-colors focus:border-wire/50 focus:outline-none';

const Contact: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', service: '', budget: '', details: '',
  });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('https://formspree.io/f/mbdndbdr', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(
          data?.errors?.map((x: any) => x.message).join(', ') ||
            "That didn't go through. Email me directly at akshaymad0608@gmail.com and I'll pick it up.",
        );
      }
    } catch {
      setError("That didn't go through. Check your connection, or email akshaymad0608@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 blueprint blueprint-fade pointer-events-none" aria-hidden="true" />
        <SEO
          title="Contact | Akshay Mahajan"
          description="Tell me about the workflow you want automated. I reply within one working day."
        />

        <div className="container relative z-10 mx-auto max-w-shell px-6">
          <div className="mb-14 max-w-2xl">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-wire/50" />
                <span className="eyebrow">Get in touch</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[38px] font-bold leading-[1.05] tracking-tightest text-text md:text-[54px]">
                Tell me what keeps
                <br className="hidden md:block" /> coming back every week.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-textSecondary">
                The more specific you are about the task, the more useful my first reply will be.
                I answer within one working day.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            {/* form */}
            <Reveal>
              {sent ? (
                <div className="panel ticked flex flex-col items-center justify-center p-12 text-center">
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-wire/40 bg-ink text-wire">
                    <Check size={26} />
                  </span>
                  <h2 className="font-display text-2xl font-bold text-text">Message received</h2>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-textSecondary">
                    I'll reply within one working day, usually with a couple of questions about the
                    workflow before I quote anything.
                  </p>
                  <a
                    href="https://calendly.com/akshaymad0608"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-7 inline-flex items-center gap-2 px-6 py-3 text-[14.5px] font-medium"
                  >
                    Skip ahead and book a call <ArrowRight size={15} />
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="panel flex flex-col gap-5 p-7 md:p-9">
                  {error && (
                    <p className="rounded-xl border border-signal/40 bg-signal/10 px-4 py-3 text-[14px] text-signal">
                      {error}
                    </p>
                  )}

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-[13.5px] font-medium text-textSecondary">
                        Your name
                      </label>
                      <input id="name" name="name" required value={form.name} onChange={update}
                             placeholder="Priya Shah" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-[13.5px] font-medium text-textSecondary">
                        Email
                      </label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={update}
                             placeholder="priya@company.com" className={fieldClass} />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="whatsapp" className="mb-2 block text-[13.5px] font-medium text-textSecondary">
                        WhatsApp <span className="text-muted">(optional)</span>
                      </label>
                      <input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={update}
                             placeholder="+91 00000 00000" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="budget" className="mb-2 block text-[13.5px] font-medium text-textSecondary">
                        Budget range
                      </label>
                      <select id="budget" name="budget" value={form.budget} onChange={update} className={fieldClass}>
                        <option value="">Select a range</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-[13.5px] font-medium text-textSecondary">
                      What do you need
                    </label>
                    <select id="service" name="service" value={form.service} onChange={update} className={fieldClass}>
                      <option value="">Select the closest fit</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="details" className="mb-2 block text-[13.5px] font-medium text-textSecondary">
                      Describe the task
                    </label>
                    <textarea id="details" name="details" rows={5} required value={form.details} onChange={update}
                              placeholder="Every morning someone copies new orders from email into our sheet, then messages the customer. Roughly 2 hours a day."
                              className={`${fieldClass} resize-y`} />
                    <p className="mt-2 font-mono text-[11.5px] text-muted">
                      Who does it, how often, and which tools are involved — that's all I need to scope it.
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileTap={{ scale: 0.98 }}
                    className="btn-signal mt-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Send it over'}
                    {!submitting && <ArrowRight size={17} />}
                  </motion.button>
                </form>
              )}
            </Reveal>

            {/* aside */}
            <div className="flex flex-col gap-4">
              <Reveal delay={0.08}>
                <div className="panel p-7">
                  <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Faster than a form
                  </h2>
                  <div className="space-y-3">
                    <a href="https://calendly.com/akshaymad0608" target="_blank" rel="noopener noreferrer"
                       className="btn-signal flex items-center justify-center gap-2 px-5 py-3 text-[14.5px]">
                      Book a 20-minute call <ArrowRight size={15} />
                    </a>
                    <a href="https://wa.me/917600885080?text=Hi%20Akshay%2C%20I%27d%20like%20to%20discuss%20a%20project"
                       target="_blank" rel="noopener noreferrer"
                       className="btn-ghost flex items-center justify-center gap-2 px-5 py-3 text-[14.5px] font-medium">
                      <MessageCircle size={16} /> WhatsApp me
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="panel space-y-5 p-7">
                  <div className="flex items-start gap-3">
                    <Mail size={17} className="mt-0.5 shrink-0 text-wire" />
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Email</div>
                      <a href="mailto:akshaymad0608@gmail.com" className="text-[15px] text-text hover:text-wire">
                        akshaymad0608@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-wire" />
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Based in</div>
                      <p className="text-[15px] text-text">Surat, Gujarat &middot; working IST, flexible for calls</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={17} className="mt-0.5 shrink-0 text-wire" />
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Reply time</div>
                      <p className="text-[15px] text-text">Within one working day</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="panel p-7">
                  <h2 className="mb-3 font-display text-[16px] font-bold text-text">
                    What happens next
                  </h2>
                  <ol className="space-y-3">
                    {[
                      'I read it and reply with questions or a straight answer.',
                      'Short call to walk through the workflow as it runs today.',
                      'Fixed quote and timeline, in writing, before anything starts.',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-textSecondary">
                        <span className="font-mono text-[12px] text-wire">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
