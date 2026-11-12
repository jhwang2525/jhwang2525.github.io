import React, { useMemo, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineExternalLink, HiOutlineFolder, HiArrowNarrowRight } from 'react-icons/hi';
import Reveal from './Reveal';
import { projects, projectFilters, uxDesigns, profile } from '../data/portfolio';

const ProjectLinks = ({ project, size = 'text-lg' }) => (
  <div className={`flex shrink-0 items-center gap-4 ${size}`}>
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
);

// Large, alternating cards for the best projects
const FeaturedProject = ({ project, flip }) => (
  <article className='grid items-center gap-8 lg:grid-cols-12'>
    <a
      href={project.demo || project.code}
      target='_blank'
      rel='noopener noreferrer'
      className={`group relative block overflow-hidden rounded-xl border border-navy-line shadow-2xl shadow-black/30 lg:col-span-7 ${
        flip ? 'lg:order-2' : ''
      }`}
      aria-label={`Open ${project.name}`}
    >
      <img
        src={project.image}
        alt={`${project.name} screenshot`}
        loading='lazy'
        className='aspect-[16/9] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]'
      />
      <span className='absolute inset-0 bg-navy/20 transition group-hover:bg-transparent' />
    </a>

    <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
      <p className='font-display text-xs tracking-widest text-accent'>Featured · {project.category}</p>
      <h3 className='mt-2 text-2xl font-semibold text-ink-light'>{project.name}</h3>
      <p className='card mt-5 p-5 text-[15px] leading-relaxed'>{project.description}</p>
      <ul className='mt-5 flex flex-wrap gap-x-4 gap-y-1 font-display text-[11px] tracking-wide text-ink-muted'>
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className='mt-6 flex items-center gap-6'>
        {project.demo && (
          <a href={project.demo} target='_blank' rel='noopener noreferrer' className='btn-primary !py-2.5'>
            Live demo <HiOutlineExternalLink />
          </a>
        )}
        {project.code && (
          <a href={project.code} target='_blank' rel='noopener noreferrer' className='link-subtle'>
            <FaGithub /> Source code
          </a>
        )}
      </div>
    </div>
  </article>
);

// Compact cards for everything else
const ProjectCard = ({ project }) => (
  <article className='card group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:border-accent/50'>
    {project.image ? (
      <div className='aspect-[16/9] overflow-hidden bg-navy-dark'>
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading='lazy'
          className='h-full w-full object-cover object-top transition duration-500 group-hover:scale-105'
        />
      </div>
    ) : (
      <div className='flex items-center justify-between px-6 pt-6'>
        <HiOutlineFolder className='text-4xl text-accent' aria-hidden='true' />
        {project.status && (
          <span className='rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent'>{project.status}</span>
        )}
      </div>
    )}

    <div className='flex flex-1 flex-col p-6'>
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-lg font-semibold text-ink-light group-hover:text-accent'>{project.name}</h3>
        <ProjectLinks project={project} />
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
  const featured = projects.filter((p) => p.featured);
  const others = useMemo(() => {
    // Projects with screenshots first, so the grid reads evenly
    const rest = projects.filter((p) => !p.featured).sort((a, b) => Boolean(b.image) - Boolean(a.image));
    return filter === 'All' ? rest : rest.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id='projects' className='section'>
      <div className='container-site'>
        <h2 className='section-title'>
          <span>04.</span> Projects
        </h2>

        <div className='space-y-24'>
          {featured.map((p, i) => (
            <Reveal key={p.name}>
              <FeaturedProject project={p} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <div className='mb-8 mt-28 flex flex-wrap items-end justify-between gap-4'>
          <h3 className='font-display text-xl font-bold text-ink-light sm:text-2xl'>Other projects</h3>
          <div className='flex flex-wrap gap-2' role='group' aria-label='Filter projects'>
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
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {others.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
          {!others.length && <p className='text-ink-muted'>No other projects in this category.</p>}
        </div>

        <div className='mt-12 text-center'>
          <a href={profile.github} target='_blank' rel='noopener noreferrer' className='btn-outline'>
            More on GitHub <HiArrowNarrowRight />
          </a>
        </div>

        {/* UX designs */}
        <h3 className='mb-10 mt-28 font-display text-xl font-bold text-ink-light sm:text-2xl'>UX Design</h3>
        <div className='grid gap-8 md:grid-cols-2'>
          {uxDesigns.map((d, i) => (
            <Reveal key={d.name} delay={i * 100}>
              <article className='card flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-center'>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
