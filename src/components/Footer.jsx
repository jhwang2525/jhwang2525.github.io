import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { profile } from '../data/portfolio';

const Footer = () => (
  <footer className='border-t border-navy-line/60 px-6 py-8'>
    <div className='container-site flex flex-col items-center justify-between gap-4 text-sm text-ink-muted sm:flex-row'>
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React & Tailwind CSS.
      </p>
      <div className='flex items-center gap-5 text-lg lg:hidden'>
        <a href={profile.github} target='_blank' rel='noopener noreferrer' aria-label='GitHub' className='hover:text-accent'>
          <FaGithub />
        </a>
        <a href={profile.linkedin} target='_blank' rel='noopener noreferrer' aria-label='LinkedIn' className='hover:text-accent'>
          <FaLinkedin />
        </a>
        <a href={`mailto:${profile.email}`} aria-label='Email' className='hover:text-accent'>
          <HiOutlineMail />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
