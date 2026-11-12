import React, { useMemo, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiCheck, HiOutlineClipboardCopy } from 'react-icons/hi';
import resume from '../assets/resume.pdf';
import { profile } from '../data/portfolio';

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: HiOutlineMail },
  { label: 'GitHub', value: 'github.com/jhwang2525', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', value: 'Jun Hwang', href: profile.linkedin, icon: FaLinkedin },
];

const PROJECT_TYPES = [
  'New Shopify store',
  'Theme redesign',
  'Custom sections / features',
  'Speed & Core Web Vitals',
  'Wholesale / B2B setup',
  'Store migration',
  'React / web app',
  'Something else',
];
const BUDGETS = ['Under $1k', '$1k – $3k', '$3k – $7k', '$7k+', 'Not sure yet'];
const TIMELINES = ['ASAP', 'Within a month', '1–3 months', 'Flexible'];
const ROLE_TYPES = ['Full-time', 'Contract', 'Part-time', 'Freelance'];

const Chip = ({ active, onClick, children }) => (
  <button
    type='button'
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
      active ? 'border-accent bg-accent text-navy' : 'border-navy-line text-ink hover:border-accent hover:text-accent'
    }`}
  >
    {children}
  </button>
);

const Field = ({ label, children }) => (
  <label className='block'>
    <span className='mb-1.5 block text-xs font-medium text-ink-muted'>{label}</span>
    {children}
  </label>
);

const inputClass =
  'w-full rounded-lg border border-navy-line bg-navy px-3 py-2.5 text-sm text-ink-light placeholder:text-ink-muted focus:border-accent focus:outline-none';

const Question = ({ children, hint }) => (
  <p className='mb-3 text-sm font-semibold text-ink-light'>
    {children} {hint && <span className='font-normal text-ink-muted'>{hint}</span>}
  </p>
);

const Contact = () => {
  const [tab, setTab] = useState('client');
  const [client, setClient] = useState({ types: [], budget: '', timeline: '', name: '', website: '', details: '' });
  const [hiring, setHiring] = useState({ role: 'Full-time', company: '', name: '', position: '', details: '' });
  const [copied, setCopied] = useState(false);

  const setC = (key) => (e) => setClient((c) => ({ ...c, [key]: e.target.value }));
  const setH = (key) => (e) => setHiring((h) => ({ ...h, [key]: e.target.value }));
  const toggleType = (t) =>
    setClient((c) => ({ ...c, types: c.types.includes(t) ? c.types.filter((x) => x !== t) : [...c.types, t] }));

  // Draft the email from the answers
  const email = useMemo(() => {
    if (tab === 'client') {
      const subject = `Project inquiry: ${client.types[0] || 'Shopify project'}${client.name ? ` from ${client.name}` : ''}`;
      const lines = [
        'Hi Jun,',
        '',
        "I'd like to talk about a project.",
        '',
        `What I need: ${client.types.join(', ') || '(not specified)'}`,
        `Budget: ${client.budget || '(not specified)'}`,
        `Timeline: ${client.timeline || '(not specified)'}`,
      ];
      if (client.website) lines.push(`Current website: ${client.website}`);
      lines.push('', client.details || '(add any details here)', '', 'Thanks,', client.name);
      return { subject, body: lines.join('\n') };
    }
    const subject = `${hiring.role} opportunity${hiring.company ? ` at ${hiring.company}` : ''}${
      hiring.position ? `: ${hiring.position}` : ''
    }`;
    const body = [
      'Hi Jun,',
      '',
      `I came across your portfolio and would like to talk about a ${hiring.role.toLowerCase()} ${
        hiring.position || 'role'
      }${hiring.company ? ` at ${hiring.company}` : ''}.`,
      '',
      hiring.details || '(add any details here)',
      '',
      'Best,',
      hiring.name,
    ].join('\n');
    return { subject, body };
  }, [tab, client, hiring]);

  const enc = encodeURIComponent;
  const mailto = `mailto:${profile.email}?subject=${enc(email.subject)}&body=${enc(email.body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${enc(email.subject)}&body=${enc(
    email.body
  )}`;

  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    };
    const text = `To: ${profile.email}\nSubject: ${email.subject}\n\n${email.body}`;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  };

  return (
    <section id='contact' className='section bg-navy-dark'>
      <div className='container-site max-w-[960px]'>
        <div className='text-center'>
          <p className='font-display text-sm tracking-widest text-accent'>05. What's next?</p>
          <h2 className='mt-4 font-display text-4xl font-bold text-ink-light sm:text-5xl'>Get in touch</h2>
          <p className='mx-auto mt-6 max-w-[560px] text-lg leading-relaxed'>
            Tell me a little about what you need and I'll draft the email for you. It takes about 30 seconds.
          </p>
        </div>

        <div className='card mt-10 overflow-hidden'>
          <div className='grid grid-cols-2 border-b border-navy-line' role='tablist' aria-label='Contact type'>
            {[
              ['client', 'Start a project'],
              ['hiring', "I'm hiring"],
            ].map(([id, label]) => (
              <button
                key={id}
                type='button'
                role='tab'
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`py-4 font-display text-sm tracking-wider transition ${
                  tab === id ? 'bg-navy-card text-accent shadow-[inset_0_-2px_0_#3bba9c]' : 'text-ink hover:text-ink-light'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className='grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]'>
            <div className='space-y-6' role='tabpanel'>
              {tab === 'client' ? (
                <>
                  <div>
                    <Question hint='(pick any)'>1. What do you need?</Question>
                    <div className='flex flex-wrap gap-2'>
                      {PROJECT_TYPES.map((t) => (
                        <Chip key={t} active={client.types.includes(t)} onClick={() => toggleType(t)}>
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Question>2. Budget</Question>
                    <div className='flex flex-wrap gap-2'>
                      {BUDGETS.map((b) => (
                        <Chip key={b} active={client.budget === b} onClick={() => setClient((c) => ({ ...c, budget: b }))}>
                          {b}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Question>3. Timeline</Question>
                    <div className='flex flex-wrap gap-2'>
                      {TIMELINES.map((t) => (
                        <Chip
                          key={t}
                          active={client.timeline === t}
                          onClick={() => setClient((c) => ({ ...c, timeline: t }))}
                        >
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <Field label='Your name'>
                      <input className={inputClass} value={client.name} onChange={setC('name')} placeholder='Jane Doe' />
                    </Field>
                    <Field label='Current website (optional)'>
                      <input className={inputClass} value={client.website} onChange={setC('website')} placeholder='yourstore.com' />
                    </Field>
                  </div>
                  <Field label='Anything else?'>
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={client.details}
                      onChange={setC('details')}
                      placeholder='Goals, links, features you have in mind…'
                    />
                  </Field>
                </>
              ) : (
                <>
                  <div>
                    <Question>Type of role</Question>
                    <div className='flex flex-wrap gap-2'>
                      {ROLE_TYPES.map((r) => (
                        <Chip key={r} active={hiring.role === r} onClick={() => setHiring((h) => ({ ...h, role: r }))}>
                          {r}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <Field label='Your name'>
                      <input className={inputClass} value={hiring.name} onChange={setH('name')} placeholder='Alex Kim' />
                    </Field>
                    <Field label='Company'>
                      <input className={inputClass} value={hiring.company} onChange={setH('company')} placeholder='Acme Inc.' />
                    </Field>
                  </div>
                  <Field label='Position'>
                    <input
                      className={inputClass}
                      value={hiring.position}
                      onChange={setH('position')}
                      placeholder='Front-End Developer'
                    />
                  </Field>
                  <Field label='Message (optional)'>
                    <textarea
                      rows={4}
                      className={inputClass}
                      value={hiring.details}
                      onChange={setH('details')}
                      placeholder='Team, stack, location or a link to the job post…'
                    />
                  </Field>
                  <a href={resume} target='_blank' rel='noopener noreferrer' className='link-subtle'>
                    Download Jun's resume (PDF) →
                  </a>
                </>
              )}
            </div>

            {/* Live email preview */}
            <div className='flex flex-col'>
              <p className='mb-3 text-sm font-semibold text-ink-light'>Your email preview</p>
              <div className='flex-1 rounded-lg border border-navy-line bg-navy p-4 font-mono text-xs leading-relaxed text-ink'>
                <p className='text-ink-muted'>To: {profile.email}</p>
                <p className='mb-3 border-b border-navy-line pb-3 text-ink-light'>Subject: {email.subject}</p>
                <p className='max-h-56 overflow-y-auto whitespace-pre-wrap'>{email.body}</p>
              </div>
              <div className='mt-4 grid gap-2 sm:grid-cols-2'>
                <a href={gmail} target='_blank' rel='noopener noreferrer' className='btn-primary border-2 border-transparent !py-3'>
                  Send with Gmail
                </a>
                <a href={mailto} className='btn-outline !py-3'>
                  Open mail app
                </a>
              </div>
              <button type='button' onClick={copy} className='link-subtle mt-3 justify-center' aria-live='polite'>
                {copied ? (
                  <>
                    <HiCheck aria-hidden='true' /> Copied to clipboard
                  </>
                ) : (
                  <>
                    <HiOutlineClipboardCopy aria-hidden='true' /> Copy email text instead
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <ul className='mx-auto mt-10 grid max-w-[340px] gap-4 text-left md:max-w-none md:grid-cols-3'>
          {LINKS.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel='noopener noreferrer'
                className='card flex items-center gap-3 p-4 hover:-translate-y-1 hover:border-accent/50'
              >
                <Icon className='shrink-0 text-2xl text-accent' aria-hidden='true' />
                <span className='min-w-0'>
                  <span className='block text-xs text-ink-muted'>{label}</span>
                  <span className='block truncate text-sm text-ink-light'>{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
