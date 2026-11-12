import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiCheck } from 'react-icons/hi';
import { profile } from '../data/portfolio';

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: HiOutlineMail },
  { label: 'GitHub', value: 'github.com/jhwang2525', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', value: 'Jun Hwang', href: profile.linkedin, icon: FaLinkedin },
];

const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
  'Hello Jun'
)}`;

const Contact = () => {
  const [copied, setCopied] = useState(false);

  // mailto only works when the visitor has an email app set up, so also copy the
  // address and show it, so the button always does something useful
  const handleHello = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(profile.email).then(done, done);
    } else {
      done();
    }
  };

  return (
    <section id='contact' className='section bg-navy-dark'>
      <div className='container-site max-w-[960px] text-center'>
        <p className='font-display text-sm tracking-widest text-accent'>05. What's next?</p>
        <h2 className='mt-4 font-display text-4xl font-bold text-ink-light sm:text-5xl'>Get in touch</h2>
        <p className='mx-auto mt-6 max-w-[560px] text-lg leading-relaxed'>
          Need a Shopify store built, fixed or made faster, or looking for a front-end developer for your team? My
          inbox is always open and I'll get back to you soon.
        </p>
        <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
          <a href={`mailto:${profile.email}`} onClick={handleHello} className='btn-primary border-2 border-transparent !px-8 !py-4'>
            Say hello
          </a>
          <a href={GMAIL_URL} target='_blank' rel='noopener noreferrer' className='btn-outline !px-6 !py-4'>
            Email via Gmail
          </a>
        </div>
        <p className='mt-4 h-6 text-sm text-accent' role='status' aria-live='polite'>
          {copied && (
            <span className='inline-flex items-center gap-1.5'>
              <HiCheck aria-hidden='true' /> Email address copied: {profile.email}
            </span>
          )}
        </p>

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
