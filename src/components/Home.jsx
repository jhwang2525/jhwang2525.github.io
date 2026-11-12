import React from 'react';
import { Link } from 'react-scroll';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { profile, stats } from '../data/portfolio';

const Home = () => {
  return (
    <section id='home' className='relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28'>
      {/* Soft background glow */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#799fca]/10 blur-3xl'
      />

      <div className='container-site relative'>
        <p className='mb-5 font-display text-sm tracking-widest text-accent'>Hi, my name is</p>
        <h1 className='font-display text-5xl font-bold leading-tight text-ink-light sm:text-7xl'>{profile.name}.</h1>
        <h2 className='mt-3 font-display text-3xl font-bold leading-tight text-ink-muted sm:text-6xl'>
          {profile.headline}
        </h2>
        <p className='mt-6 max-w-[620px] text-lg leading-relaxed text-ink'>{profile.intro}</p>

        <div className='mt-10 flex flex-wrap gap-4'>
          <Link to='work' smooth duration={500} offset={-72} className='btn-primary cursor-pointer' href='#work'>
            View my work <HiArrowNarrowRight />
          </Link>
          <Link to='contact' smooth duration={500} offset={-72} className='btn-outline cursor-pointer' href='#contact'>
            Get in touch
          </Link>
        </div>

        <dl className='mt-16 grid max-w-[720px] grid-cols-1 gap-6 border-t border-navy-line pt-8 sm:grid-cols-3'>
          {stats.map((s) => (
            <div key={s.label}>
              <dt className='sr-only'>{s.label}</dt>
              <dd className='font-display text-2xl font-bold text-ink-light'>{s.value}</dd>
              <dd className='mt-1 text-sm text-ink-muted'>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Home;
