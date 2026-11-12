import React from 'react';
import { Link } from 'react-scroll';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { profile, stats, clientWork } from '../data/portfolio';

// Stacked browser windows showing live client stores
const ShowcaseStack = () => {
  const shots = clientWork.filter((c) => c.image).slice(0, 3);
  const positions = [
    'left-0 top-10 z-10 w-[78%] -rotate-2',
    'right-0 top-0 z-20 w-[72%] rotate-2',
    'left-[12%] top-[48%] z-30 w-[76%]',
  ];
  return (
    <div className='relative hidden aspect-[5/4] w-full lg:block' aria-hidden='true'>
      {shots.map((site, i) => (
        <div
          key={site.name}
          className={`absolute overflow-hidden rounded-xl border border-navy-line bg-navy-card shadow-2xl shadow-black/40 transition duration-500 hover:z-40 hover:-translate-y-2 hover:rotate-0 ${positions[i]}`}
        >
          <div className='flex items-center gap-1.5 border-b border-navy-line px-3 py-2'>
            <span className='h-2 w-2 rounded-full bg-[#ff5f57]' />
            <span className='h-2 w-2 rounded-full bg-[#febc2e]' />
            <span className='h-2 w-2 rounded-full bg-[#28c840]' />
            <span className='ml-2 truncate text-[10px] text-ink-muted'>
              {site.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
            </span>
          </div>
          <img src={site.image} alt='' className='aspect-[16/10] w-full object-cover object-top' />
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <section id='home' className='relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#799fca]/10 blur-3xl'
      />

      <div className='container-site relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]'>
        <div>
          <p className='mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-accent' />
            </span>
            {profile.availability}
          </p>
          <p className='mb-4 font-display text-sm tracking-widest text-accent'>Hi, my name is</p>
          <h1 className='font-display text-5xl font-bold leading-tight text-ink-light sm:text-6xl xl:text-7xl'>
            {profile.name}.
          </h1>
          <h2 className='mt-3 font-display text-3xl font-bold leading-tight text-ink-muted sm:text-5xl'>
            {profile.headline}
          </h2>
          <p className='mt-6 max-w-[580px] text-lg leading-relaxed text-ink'>{profile.intro}</p>

          <div className='mt-10 flex flex-wrap gap-4'>
            <Link to='work' smooth duration={500} offset={-72} className='btn-primary cursor-pointer' href='#work'>
              View my work <HiArrowNarrowRight />
            </Link>
            <Link to='contact' smooth duration={500} offset={-72} className='btn-outline cursor-pointer' href='#contact'>
              Get in touch
            </Link>
          </div>

          <dl className='mt-14 grid max-w-[620px] grid-cols-1 gap-6 border-t border-navy-line pt-8 sm:grid-cols-3'>
            {stats.map((s) => (
              <div key={s.label}>
                <dt className='sr-only'>{s.label}</dt>
                <dd className='font-display text-2xl font-bold text-ink-light'>{s.value}</dd>
                <dd className='mt-1 text-sm text-ink-muted'>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ShowcaseStack />
      </div>
    </section>
  );
};

export default Home;
