import React, { useState } from 'react';
import BuildCard from './BuildCard';
import FixBug from './FixBug';
import SpeedUp from './SpeedUp';

const MISSIONS = [
  { id: 'build', icon: '🧱', title: 'Build a product card', time: '1 min', Component: BuildCard },
  { id: 'bug', icon: '🐞', title: 'Fix the bug', time: '2 min', Component: FixBug },
  { id: 'speed', icon: '⚡', title: 'Speed up the store', time: '1 min', Component: SpeedUp },
];

const DevMode = () => {
  const [active, setActive] = useState('build');
  const mission = MISSIONS.find((m) => m.id === active);
  const { Component } = mission;

  return (
    <section id='devmode' className='section relative overflow-hidden'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]'
      />
      <div className='container-site relative'>
        <h2 className='section-title'>
          <span>05.</span> Dev Mode
        </h2>
        <p className='-mt-6 mb-10 max-w-[640px] text-lg leading-relaxed'>
          Step into my shoes for a minute. <span className='text-ink-light'>No coding experience needed:</span> pick
          options in plain English and watch real Shopify code write itself, run and ship.
        </p>

        <div className='mb-8 grid gap-3 sm:grid-cols-3' role='tablist' aria-label='Dev Mode missions'>
          {MISSIONS.map((m, i) => (
            <button
              key={m.id}
              type='button'
              role='tab'
              aria-selected={active === m.id}
              onClick={() => setActive(m.id)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                active === m.id
                  ? 'border-accent bg-accent/10 shadow-[0_0_24px_-8px_#3bba9c]'
                  : 'border-navy-line bg-navy-card/40 hover:border-accent/50'
              }`}
            >
              <span className='text-2xl' aria-hidden='true'>
                {m.icon}
              </span>
              <span>
                <span className='block font-display text-[11px] tracking-widest text-accent'>Mission {i + 1}</span>
                <span className='block font-semibold text-ink-light'>{m.title}</span>
                <span className='block text-xs text-ink-muted'>~{m.time}</span>
              </span>
            </button>
          ))}
        </div>

        <div className='rounded-2xl border border-navy-line bg-navy-dark/80 p-4 sm:p-6' role='tabpanel'>
          <Component key={active} />
        </div>
      </div>
    </section>
  );
};

export default DevMode;
