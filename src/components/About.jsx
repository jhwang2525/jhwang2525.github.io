import React from 'react';
import { HiOutlineShoppingBag, HiOutlineCode, HiOutlineColorSwatch } from 'react-icons/hi';
import avatar from '../assets/jun.png';
import Reveal from './Reveal';
import { about, skills, services, profile } from '../data/portfolio';

const SERVICE_ICONS = [HiOutlineShoppingBag, HiOutlineCode, HiOutlineColorSwatch];

const About = () => {
  return (
    <section id='about' className='section bg-navy-dark'>
      <div className='container-site'>
        <h2 className='section-title'>
          <span>01.</span> About Me
        </h2>

        <Reveal>
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
        </Reveal>

        <h3 className='mb-6 mt-20 font-display text-sm font-semibold tracking-wider text-ink-light'>What I do</h3>
        <div className='grid gap-6 md:grid-cols-3'>
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <Reveal key={s.title} delay={i * 100}>
                <article className='card h-full p-7 hover:-translate-y-1 hover:border-accent/50'>
                  <span className='mb-5 grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-2xl text-accent'>
                    <Icon aria-hidden='true' />
                  </span>
                  <h4 className='text-lg font-semibold text-ink-light'>{s.title}</h4>
                  <p className='mt-3 text-[15px] leading-relaxed'>{s.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <h3 className='mb-6 mt-20 font-display text-sm font-semibold tracking-wider text-ink-light'>Tech I work with</h3>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 80}>
              <div className='card h-full p-6 hover:border-accent/50'>
                <h4 className='mb-4 font-display text-sm font-semibold tracking-wider text-ink-light'>{group.group}</h4>
                <ul className='flex flex-wrap gap-2'>
                  {group.items.map((item) => (
                    <li key={item} className='rounded-md bg-navy-dark/70 px-2.5 py-1 text-[13px] text-ink'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
