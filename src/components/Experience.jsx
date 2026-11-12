import React from 'react';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { experience, education } from '../data/portfolio';

const Experience = () => {
  return (
    <section id='experience' className='section'>
      <div className='container-site'>
        <h2 className='section-title'>
          <span>02.</span> Experience
        </h2>

        <div className='grid gap-12 lg:grid-cols-[1fr_320px]'>
          <ol className='relative space-y-10 border-l border-navy-line pl-8'>
            {experience.map((job) => (
              <li key={job.title + job.company} className='relative'>
                <span
                  className='absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-navy'
                  aria-hidden='true'
                />
                <p className='font-display text-xs tracking-widest text-accent'>{job.period}</p>
                <h3 className='mt-2 text-xl font-semibold text-ink-light'>{job.title}</h3>
                <p className='text-ink-muted'>{job.company}</p>
                <ul className='mt-4 space-y-2'>
                  {job.points.map((point) => (
                    <li key={point} className='flex gap-3 leading-relaxed'>
                      <span className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' aria-hidden='true' />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div>
            <h3 className='mb-5 font-display text-sm font-semibold tracking-wider text-ink-light'>Education</h3>
            <ul className='space-y-4'>
              {education.map((ed) => (
                <li key={ed.title} className='card flex gap-4 p-5'>
                  <HiOutlineAcademicCap className='mt-0.5 shrink-0 text-2xl text-accent' aria-hidden='true' />
                  <div>
                    <p className='font-semibold text-ink-light'>{ed.title}</p>
                    <p className='text-sm text-ink-muted'>{ed.org}</p>
                    <p className='mt-1 font-display text-xs text-accent'>{ed.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
