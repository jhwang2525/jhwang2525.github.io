import React, { useMemo, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineExternalLink, HiOutlineCode, HiArrowNarrowRight } from 'react-icons/hi';
import { projects, projectFilters, uxDesigns, profile } from '../data/portfolio';

const ProjectCard = ({ project }) => (
  <article className='card group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:border-accent/50'>
    <div className='relative aspect-[16/9] overflow-hidden bg-navy-dark'>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading='lazy'
          className='h-full w-full object-cover object-top transition duration-500 group-hover:scale-105'
        />
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#3a3d5c] via-navy-card to-navy-dark p-6 text-center transition duration-500 group-hover:scale-105'>
          <HiOutlineCode className='text-3xl text-accent' aria-hidden='true' />
          <span className='font-display text-lg font-bold tracking-wider text-ink-light'>{project.name}</span>
        </div>
      )}
      {project.status && (
        <span className='absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-xs font-medium text-accent'>
          {project.status}
        </span>
      )}
    </div>

    <div className='flex flex-1 flex-col p-6'>
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-lg font-semibold text-ink-light'>{project.name}</h3>
        <div className='flex shrink-0 items-center gap-3 text-lg'>
          {project.code && (
            <a
              href={project.code}
              target='_blank'
              rel='noopener noreferrer'
              className='text-ink transition hover:text-accent'
              aria-label={`${project.name} source code on GitHub`}
              title='Code'
            >
              <FaGithub />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target='_blank'
              rel='noopener noreferrer'
              className='text-ink transition hover:text-accent'
              aria-label={`${project.name} live demo`}
              title='Live demo'
            >
              <HiOutlineExternalLink />
            </a>
          )}
        </div>
      </div>
      <p className='mt-1 font-display text-[11px] tracking-widest text-accent'>{project.category}</p>
      <p className='mt-3 flex-1 text-sm leading-relaxed'>{project.description}</p>
      <ul className='mt-5 flex flex-wrap gap-x-3 gap-y-1 font-display text-[11px] tracking-wide text-ink-muted'>
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  </article>
);

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id='projects' className='section'>
      <div className='container-site'>
        <h2 className='section-title'>
          <span>04.</span> Projects
        </h2>

        <div className='mb-10 flex flex-wrap gap-2' role='group' aria-label='Filter projects'>
          {projectFilters.map((f) => (
            <button
              key={f}
              type='button'
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-1.5 font-display text-xs tracking-wider transition ${
                filter === f
                  ? 'border-accent bg-accent text-navy'
                  : 'border-navy-line text-ink hover:border-accent hover:text-accent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {shown.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>

        <div className='mt-12 text-center'>
          <a href={profile.github} target='_blank' rel='noopener noreferrer' className='btn-outline'>
            More on GitHub <HiArrowNarrowRight />
          </a>
        </div>

        {/* UX designs */}
        <h3 className='mb-10 mt-28 font-display text-xl font-bold text-ink-light sm:text-2xl'>UX Design</h3>
        <div className='grid gap-8 md:grid-cols-2'>
          {uxDesigns.map((d) => (
            <article key={d.name} className='card flex flex-col gap-6 p-6 sm:flex-row sm:items-center'>
              <div className='mx-auto w-[150px] shrink-0 sm:mx-0'>
                <img
                  src={d.image}
                  alt={`${d.name} app screen`}
                  loading='lazy'
                  className='w-full rounded-2xl border-4 border-navy-dark shadow-xl shadow-black/30'
                />
              </div>
              <div>
                <p className='font-display text-[11px] tracking-widest text-accent'>{d.type}</p>
                <h4 className='mt-1 text-xl font-semibold text-ink-light'>{d.name}</h4>
                <p className='mt-3 text-sm leading-relaxed'>{d.description}</p>
                <ul className='mt-4 flex flex-wrap gap-2'>
                  {d.tags.map((t) => (
                    <li key={t} className='tag'>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
