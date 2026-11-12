import React from 'react';
import avatar from '../assets/jun.png';
import { about, skills, profile } from '../data/portfolio';

const About = () => {
  return (
    <section id='about' className='section bg-navy-dark'>
      <div className='container-site'>
        <h2 className='section-title'>
          <span>01.</span> About Me
        </h2>

        <div className='grid gap-12 md:grid-cols-[1fr_280px]'>
          <div className='space-y-5 text-[17px] leading-relaxed'>
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>
              Based in <span className='text-ink-light'>{profile.location}</span> and open to freelance projects and
              full-time front-end or Shopify roles.
            </p>
          </div>

          <div className='mx-auto w-full max-w-[280px]'>
            <div className='group relative'>
              <div className='absolute inset-0 translate-x-4 translate-y-4 rounded-xl border-2 border-accent transition group-hover:translate-x-3 group-hover:translate-y-3' />
              <img
                src={avatar}
                alt='Jun Hwang avatar'
                className='relative aspect-square w-full rounded-xl object-cover'
                width='280'
                height='280'
                loading='lazy'
              />
            </div>
          </div>
        </div>

        <div className='mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {skills.map((group) => (
            <div key={group.group} className='card p-6 hover:border-accent/50'>
              <h3 className='mb-4 font-display text-sm font-semibold tracking-wider text-ink-light'>{group.group}</h3>
              <ul className='space-y-2'>
                {group.items.map((item) => (
                  <li key={item} className='flex items-start gap-2 text-sm'>
                    <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' aria-hidden='true' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
