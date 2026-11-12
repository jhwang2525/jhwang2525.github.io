import React, { useEffect, useRef, useState } from 'react';
import { scroller } from 'react-scroll';
import { HiOutlineChatAlt2, HiX, HiPaperAirplane } from 'react-icons/hi';
import avatar from '../assets/jun.png';
import resume from '../assets/resume.pdf';
import { getReply, SUGGESTIONS } from '../data/assistant';

const WELCOME = {
  from: 'bot',
  text: "Hi! I'm Jun's assistant. Ask me anything about his work, or pick a question below.",
};

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Small "Ask me anything" nudge a few seconds after the page loads
  useEffect(() => {
    const t = setTimeout(() => setShowNudge(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setShowNudge(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const send = async (text) => {
    const question = text.trim();
    if (!question || typing) return;
    setInput('');
    setMessages((m) => [...m, { from: 'user', text: question }]);
    setTyping(true);
    const reply = await getReply(question);
    // short, natural-feeling delay
    await new Promise((r) => setTimeout(r, 450 + Math.min(reply.text.length * 6, 900)));
    setTyping(false);
    setMessages((m) => [...m, { from: 'bot', ...reply }]);
  };

  const runAction = (action) => {
    if (action.section) {
      scroller.scrollTo(action.section, { smooth: true, duration: 500, offset: -72 });
      if (window.innerWidth < 640) setOpen(false);
    }
  };

  const asked = new Set(messages.filter((m) => m.from === 'user').map((m) => m.text));
  const suggestions = SUGGESTIONS.filter((s) => !asked.has(s));

  return (
    <div className='fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3'>
      {open && (
        <section
          className='flex h-[min(560px,calc(100vh-110px))] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-navy-line bg-navy-dark shadow-2xl shadow-black/50'
          role='dialog'
          aria-label='Ask Jun assistant'
        >
          <header className='flex items-center gap-3 border-b border-navy-line bg-navy-card/70 px-4 py-3'>
            <img src={avatar} alt='' className='h-9 w-9 rounded-full' />
            <div className='flex-1'>
              <p className='font-display text-sm font-bold text-ink-light'>Ask Jun</p>
              <p className='flex items-center gap-1.5 text-xs text-ink-muted'>
                <span className='h-1.5 w-1.5 rounded-full bg-accent' /> Portfolio assistant · replies instantly
              </p>
            </div>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='rounded-md p-1.5 text-xl text-ink transition hover:bg-navy-card hover:text-ink-light'
              aria-label='Close chat'
            >
              <HiX />
            </button>
          </header>

          <div ref={listRef} className='flex-1 space-y-3 overflow-y-auto px-4 py-4' aria-live='polite'>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'rounded-br-md bg-accent text-navy'
                      : 'rounded-bl-md border border-navy-line bg-navy-card text-ink-light'
                  }`}
                >
                  {m.text}
                  {m.actions && (
                    <div className='mt-2.5 flex flex-wrap gap-2'>
                      {m.actions.map((a) =>
                        a.href || a.resume ? (
                          <a
                            key={a.label}
                            href={a.resume ? resume : a.href}
                            target={a.href?.startsWith('mailto') ? undefined : '_blank'}
                            rel='noopener noreferrer'
                            className='rounded-full border border-accent/50 px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent hover:text-navy'
                          >
                            {a.label}
                          </a>
                        ) : (
                          <button
                            key={a.label}
                            type='button'
                            onClick={() => runAction(a)}
                            className='rounded-full border border-accent/50 px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent hover:text-navy'
                          >
                            {a.label} →
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className='flex'>
                <div className='flex gap-1 rounded-2xl rounded-bl-md border border-navy-line bg-navy-card px-4 py-3' aria-label='Typing'>
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className='h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted'
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className='flex gap-2 overflow-x-auto border-t border-navy-line px-4 py-2.5'>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type='button'
                  onClick={() => send(s)}
                  className='shrink-0 rounded-full bg-navy-card px-3 py-1.5 text-xs text-ink transition hover:text-accent'
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className='flex items-center gap-2 border-t border-navy-line p-3'
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor='chat-input' className='sr-only'>
              Ask a question
            </label>
            <input
              id='chat-input'
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Ask about Jun…'
              maxLength={200}
              autoComplete='off'
              className='min-w-0 flex-1 rounded-lg border border-navy-line bg-navy px-3 py-2.5 text-sm text-ink-light placeholder:text-ink-muted focus:border-accent focus:outline-none'
            />
            <button
              type='submit'
              disabled={!input.trim() || typing}
              className='grid h-10 w-10 place-items-center rounded-lg bg-accent text-navy transition hover:bg-accent-dark disabled:opacity-40'
              aria-label='Send'
            >
              <HiPaperAirplane className='rotate-90' />
            </button>
          </form>
        </section>
      )}

      {!open && showNudge && (
        <button
          type='button'
          onClick={() => setOpen(true)}
          className='animate-[fadeIn_0.4s_ease-out] rounded-xl border border-navy-line bg-navy-card px-4 py-2.5 text-sm text-ink-light shadow-xl shadow-black/30'
        >
          👋 Questions about Jun? Ask me.
        </button>
      )}

      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className='group grid h-14 w-14 place-items-center rounded-full bg-accent text-2xl text-navy shadow-xl shadow-accent/30 transition hover:scale-105 hover:bg-accent-dark'
        aria-label={open ? 'Close Ask Jun assistant' : 'Open Ask Jun assistant'}
        aria-expanded={open}
      >
        {open ? <HiX /> : <HiOutlineChatAlt2 />}
      </button>
    </div>
  );
};

export default ChatAssistant;
