import React, { useEffect, useRef, useState } from 'react';
import { HiX } from 'react-icons/hi';
import resume from '../assets/resume.pdf';
import { profile, clientWork, moreStores, projects, skills, experience, education } from '../data/portfolio';

const PROMPT = 'guest@jun-hwang:~$';

const BANNER = [
  { t: 'accent', v: ' ╦╦ ╦╔╗╔  ╦ ╦╦ ╦╔═╗╔╗╔╔═╗' },
  { t: 'accent', v: ' ║║ ║║║║  ╠═╣║║║╠═╣║║║║ ╦' },
  { t: 'accent', v: '╚╝╚═╝╝╚╝  ╩ ╩╚╩╝╩ ╩╝╚╝╚═╝' },
  { t: 'muted', v: `${profile.role} · ${profile.location}` },
  { t: 'text', v: "Type 'help' to see available commands." },
  { t: 'text', v: '' },
];

const COMMANDS = {
  help: () => [
    { t: 'accent', v: 'Available commands:' },
    ...[
      ['whoami', 'Who is Jun?'],
      ['shopify', 'Live Shopify stores'],
      ['projects', 'Featured projects'],
      ['skills', 'Tech stack'],
      ['experience', 'Work history'],
      ['education', 'Education & certifications'],
      ['contact', 'How to reach Jun'],
      ['resume', 'Open resume (PDF)'],
      ['hire', 'Start the hiring process'],
      ['clear', 'Clear the screen'],
      ['exit', 'Close the terminal'],
    ].map(([c, d]) => ({ t: 'text', v: `  ${c.padEnd(12)} ${d}` })),
    { t: 'muted', v: 'Tip: use ↑/↓ for history and Tab to autocomplete.' },
  ],
  whoami: () => [
    { t: 'text', v: `${profile.name}: ${profile.role}.` },
    { t: 'text', v: 'Builds custom Shopify themes, wholesale & B2B storefronts and fast front-ends.' },
    { t: 'muted', v: profile.availability },
  ],
  shopify: () => [
    ...clientWork.map((c) => ({ t: 'link', v: `  ${c.name.padEnd(20)} ${c.type}`, href: c.url })),
    ...moreStores.map((s) => ({ t: 'link', v: `  ${s.name.padEnd(20)} ${s.theme} theme`, href: s.url })),
  ],
  projects: () =>
    projects
      .filter((p) => p.featured || p.demo)
      .map((p) => ({ t: 'link', v: `  ${p.name.padEnd(22)} ${p.tags.slice(0, 3).join(' · ')}`, href: p.demo || p.code })),
  skills: () => skills.map((g) => ({ t: 'text', v: `  ${g.group.padEnd(15)} ${g.items.slice(0, 6).join(', ')}` })),
  experience: () =>
    experience.flatMap((e) => [
      { t: 'accent', v: `  ${e.period}` },
      { t: 'text', v: `  ${e.title} @ ${e.company.split(' · ')[0]}` },
    ]),
  education: () => education.map((e) => ({ t: 'text', v: `  ${e.year.padEnd(12)} ${e.title} (${e.org})` })),
  contact: () => [
    { t: 'link', v: `  email     ${profile.email}`, href: `mailto:${profile.email}` },
    { t: 'link', v: '  linkedin  linkedin.com/in/jun-hwang', href: profile.linkedin },
    { t: 'link', v: '  github    github.com/jhwang2525', href: profile.github },
  ],
  resume: () => {
    window.open(resume, '_blank', 'noopener');
    return [{ t: 'muted', v: 'Opening resume in a new tab…' }];
  },
  hire: () => [
    { t: 'accent', v: '✔ Excellent choice.' },
    { t: 'text', v: `Email ${profile.email}, or close this terminal and use the "Get in touch" form.` },
  ],
  sudo: () => [{ t: 'error', v: "Nice try. You don't need sudo to hire Jun: just type 'hire'." }],
  ls: () => [{ t: 'text', v: 'about.txt  shopify/  projects/  skills.json  resume.pdf' }],
  cat: () => COMMANDS.whoami(),
  date: () => [{ t: 'text', v: new Date().toString() }],
  echo: (args) => [{ t: 'text', v: args.join(' ') }],
};

const ALIASES = { about: 'whoami', work: 'shopify', stores: 'shopify', stack: 'skills', cv: 'resume', email: 'contact', '?': 'help' };

const COLORS = {
  accent: 'text-accent',
  muted: 'text-ink-muted',
  text: 'text-ink-light',
  error: 'text-[#ff7a85]',
  cmd: 'text-ink-light',
  link: 'text-ink-light hover:text-accent underline-offset-2 hover:underline',
};

const Terminal = ({ open, onClose }) => {
  const [lines, setLines] = useState(BANNER);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  if (!open) return null;

  const run = (raw) => {
    const value = raw.trim();
    const [name, ...args] = value.split(/\s+/);
    const cmd = ALIASES[name?.toLowerCase()] || name?.toLowerCase();
    const echo = { t: 'cmd', v: `${PROMPT} ${value}` };

    if (!value) return setLines((l) => [...l, echo]);
    setHistory((h) => [value, ...h].slice(0, 50));
    setHIndex(-1);

    if (cmd === 'clear') return setLines([]);
    if (cmd === 'exit') {
      setLines((l) => [...l, echo]);
      return onClose();
    }
    const output = COMMANDS[cmd]
      ? COMMANDS[cmd](args)
      : [{ t: 'error', v: `command not found: ${name}. Type 'help' for a list of commands.` }];
    setLines((l) => [...l, echo, ...output, { t: 'text', v: '' }]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = [...Object.keys(COMMANDS), 'clear', 'exit'].find((c) => c.startsWith(input.toLowerCase()));
      if (input && match) setInput(match);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-[70] grid place-items-center bg-black/60 p-4 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className='flex h-[min(520px,85vh)] w-[min(760px,100%)] flex-col overflow-hidden rounded-xl border border-navy-line bg-[#14152a] shadow-2xl shadow-black/60'
        role='dialog'
        aria-label='Developer terminal'
      >
        <div className='flex items-center gap-2 border-b border-navy-line bg-navy-card px-4 py-2.5'>
          <button type='button' onClick={onClose} className='h-3 w-3 rounded-full bg-[#ff5f57]' aria-label='Close terminal' />
          <span className='h-3 w-3 rounded-full bg-[#febc2e]' />
          <span className='h-3 w-3 rounded-full bg-[#28c840]' />
          <span className='flex-1 text-center font-mono text-xs text-ink-muted'>jun@portfolio: ~</span>
          <button type='button' onClick={onClose} className='text-lg text-ink-muted hover:text-ink-light' aria-label='Close terminal'>
            <HiX />
          </button>
        </div>

        <div
          ref={bodyRef}
          className='flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed'
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) =>
            line.href ? (
              <a
                key={i}
                href={line.href}
                target={line.href.startsWith('mailto') ? undefined : '_blank'}
                rel='noopener noreferrer'
                className={`block whitespace-pre-wrap ${COLORS.link}`}
              >
                {line.v}
              </a>
            ) : (
              <p key={i} className={`min-h-[1.25em] whitespace-pre-wrap ${COLORS[line.t]}`}>
                {line.v}
              </p>
            )
          )}
          <div className='flex items-center gap-2'>
            <span className='shrink-0 text-accent'>{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className='min-w-0 flex-1 bg-transparent text-ink-light caret-accent outline-none'
              aria-label='Terminal command'
              autoComplete='off'
              autoCapitalize='off'
              spellCheck='false'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
