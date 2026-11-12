import React, { useEffect, useState } from 'react';
import { Link, scroller } from 'react-scroll';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineDocumentText } from 'react-icons/hi';
import avatar from '../assets/jun.png';
import resume from '../assets/resume.pdf';
import { profile } from '../data/portfolio';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Shopify Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SCROLL = { spy: true, smooth: true, duration: 500, offset: -72 };

const SOCIALS = [
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: HiOutlineMail },
  { label: 'Resume', href: resume, icon: HiOutlineDocumentText },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stop the page behind the mobile menu from scrolling
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  // Mobile: close the menu first (unlocks page scrolling), then scroll to the section
  const goTo = (id) => {
    setOpen(false);
    setTimeout(() => scroller.scrollTo(id, { smooth: true, duration: 500, offset: -72 }), 50);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          scrolled || open ? 'bg-navy/90 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'
        }`}
      >
        <nav className='container-site flex h-[72px] items-center justify-between px-6' aria-label='Main'>
          <Link to='home' {...SCROLL} onClick={close} className='flex cursor-pointer items-center gap-3'>
            <img src={avatar} alt='' className='h-10 w-10 rounded-lg' width='40' height='40' />
            <span className='font-display text-sm font-bold tracking-wider text-ink-light'>JUN HWANG</span>
          </Link>

          <ul className='hidden items-center gap-1 md:flex'>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  {...SCROLL}
                  activeClass='!text-accent'
                  className='cursor-pointer px-3 py-2 font-display text-xs tracking-wider text-ink transition hover:text-accent'
                >
                  <span className='text-accent'>0{i + 1}.</span> {item.label}
                </Link>
              </li>
            ))}
            <li className='ml-3'>
              <a href={resume} target='_blank' rel='noopener noreferrer' className='btn-outline !px-4 !py-2 !text-xs'>
                Resume
              </a>
            </li>
          </ul>

          <button
            type='button'
            className='rounded p-2 text-xl text-ink-light md:hidden'
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

      </header>

      {/* Mobile menu (outside the header: its backdrop blur would trap a fixed child) */}
        <div
          className={`fixed inset-x-0 bottom-0 top-[72px] z-40 bg-navy transition duration-300 md:hidden ${
            open ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <ul className='flex h-full flex-col items-center justify-center gap-8'>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id}>
                <button
                  type='button'
                  onClick={() => goTo(item.id)}
                  className='font-display text-2xl text-ink-light hover:text-accent'
                >
                  <span className='mr-2 text-base text-accent'>0{i + 1}.</span>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a href={resume} target='_blank' rel='noopener noreferrer' className='btn-outline' onClick={close}>
                Resume
              </a>
            </li>
          </ul>
        </div>

      {/* Social bar (large screens) */}
      <ul className='fixed bottom-0 left-8 z-40 hidden flex-col items-center gap-5 after:mt-2 after:h-24 after:w-px after:bg-ink-muted lg:flex'>
        {SOCIALS.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel='noopener noreferrer'
              aria-label={label}
              title={label}
              className='block text-xl text-ink transition hover:-translate-y-1 hover:text-accent'
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
