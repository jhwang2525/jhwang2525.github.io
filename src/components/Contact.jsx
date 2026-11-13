import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiX } from 'react-icons/hi';
import { profile } from '../data/portfolio';
import sideEye from '../assets/side-eye.jpg';
import happyCat from '../assets/happy-cat.mp4';

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: HiOutlineMail },
  { label: 'GitHub', value: 'github.com/jhwang2525', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', value: 'Jun Hwang', href: profile.linkedin, icon: FaLinkedin },
];

const CAT_SECONDS = 5;

// Pop-up that asks the visitor a question, then reacts to the answer
const HelloModal = ({ onClose }) => {
  const [answer, setAnswer] = useState(null); // null | 'yes' | 'no'
  const videoRef = useRef(null);

  // Close with Esc
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // "Yes" plays the happy cat, then closes on its own
  useEffect(() => {
    if (answer !== 'yes') return undefined;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Some browsers block sound: play muted instead
        video.muted = true;
        video.play().catch(() => {});
      });
    }
    const timer = setTimeout(onClose, CAT_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [answer, onClose]);

  return (
    <div
      className='fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className='relative w-[min(420px,100%)] animate-[fadeIn_0.25s_ease-out] overflow-hidden rounded-2xl border border-navy-line bg-navy-dark text-center shadow-2xl shadow-black/60'
        role='dialog'
        aria-modal='true'
        aria-labelledby='hello-title'
      >
        <button
          type='button'
          onClick={onClose}
          className='absolute right-3 top-3 z-10 rounded-md p-1.5 text-xl text-ink transition hover:bg-navy-card hover:text-ink-light'
          aria-label='Close'
        >
          <HiX />
        </button>

        {answer === null && (
          <div className='px-8 pb-8 pt-10'>
            <p className='text-5xl' aria-hidden='true'>
              🤔
            </p>
            <h3 id='hello-title' className='mt-4 font-display text-xl font-bold text-ink-light'>
              Quick question…
            </h3>
            <p className='mt-3 text-lg text-ink'>Did you like the portfolio? Will you hire Jun?</p>
            <div className='mt-8 grid grid-cols-2 gap-3'>
              <button type='button' onClick={() => setAnswer('yes')} className='btn-primary border-2 border-transparent !py-3.5'>
                Yes! 🎉
              </button>
              <button type='button' onClick={() => setAnswer('no')} className='btn-outline !py-3.5'>
                No
              </button>
            </div>
          </div>
        )}

        {answer === 'no' && (
          <div className='px-6 pb-7 pt-12'>
            <img src={sideEye} alt='Dog giving a suspicious side-eye' className='w-full rounded-xl' />
            <h3 id='hello-title' className='mt-5 font-display text-lg font-bold text-ink-light'>
              Are you sure about that? 👀
            </h3>
            <button type='button' onClick={() => setAnswer(null)} className='link-subtle mt-4'>
              Let me answer again
            </button>
          </div>
        )}

        {answer === 'yes' && (
          <div>
            <h3 id='hello-title' className='sr-only'>
              Yay!
            </h3>
            <video
              ref={videoRef}
              src={happyCat}
              playsInline
              className='mx-auto block max-h-[70vh] w-full object-contain'
              aria-label='Happy dancing cat'
            />
            <p className='px-6 pb-1 font-display text-lg font-bold text-accent'>Yay! Let's talk 🎉</p>
            <p className='px-6 pb-4 text-sm text-ink'>{profile.email}</p>
            <div className='h-1 w-full bg-navy-line'>
              <div className='h-full animate-[shrink_5s_linear_forwards] bg-accent' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <section id='contact' className='section bg-navy-dark'>
      <div className='container-site max-w-[960px] text-center'>
        <p className='font-display text-sm tracking-widest text-accent'>05. What's next?</p>
        <h2 className='mt-4 font-display text-4xl font-bold text-ink-light sm:text-5xl'>Get in touch</h2>
        <p className='mx-auto mt-6 max-w-[560px] text-lg leading-relaxed'>
          Need a Shopify store built, fixed or made faster, or looking for a front-end developer for your team? My
          inbox is always open and I'll get back to you soon.
        </p>
        <button type='button' onClick={() => setOpen(true)} className='btn-primary mt-10 !px-10 !py-4'>
          Say hello
        </button>

        <ul className='mx-auto mt-14 grid max-w-[340px] gap-4 text-left md:max-w-none md:grid-cols-3'>
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

      {open && <HelloModal onClose={close} />}
    </section>
  );
};

export default Contact;
