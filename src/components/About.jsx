import React from 'react';
import { HiOutlineShoppingBag, HiOutlineCode, HiOutlineColorSwatch } from 'react-icons/hi';
import Reveal from './Reveal';
import CodeEditor from './CodeEditor';
import { about, skills, services, profile, education } from '../data/portfolio';

const SERVICE_ICONS = [HiOutlineShoppingBag, HiOutlineCode, HiOutlineColorSwatch];

const list = (items) => `[${items.map((i) => `"${i}"`).join(', ')}]`;

// "About me" written as a code file (display only)
const ABOUT_CODE = [
  '// about-jun.js',
  'const jun = {',
  `  name: "${profile.name}",`,
  `  role: "${profile.role}",`,
  `  location: "${profile.location}",`,
  '  experience: "Building e-commerce since 2020",',
  `  focus: ${list(['Custom Shopify themes', 'Wholesale & B2B', 'Core Web Vitals'])},`,
  `  stack: ${list(['Liquid', 'JavaScript', 'React', 'Tailwind', 'Node.js'])},`,
  `  education: ${list(education.map((e) => e.title.replace('Full Stack Web Development', 'UCLA Full Stack').replace(' Specialization', '').replace('AWS Cloud Practitioner', 'AWS Cloud Practitioner (in progress)')))},`,
  '  currently: "Growing AGA Nature on Shopify",',
  `  openTo: ${list(['Freelance projects', 'Full-time roles'])},`,
  '};',
  '',
  'export default jun;',
].map((text) => ({ text }));

const About = () => {
  return (
    <section id='about' className='section bg-navy-dark'>
      <div className='container-site'>
        <h2 className='section-title'>
          <span>01.</span> About Me
        </h2>

        <Reveal>
          <div className='grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]'>
            <div className='space-y-5 text-[17px] leading-relaxed'>
              {about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p>
                Based in <span className='text-ink-light'>{profile.location}</span> and open to freelance projects and
                full-time front-end or Shopify roles.
              </p>
            </div>

            <CodeEditor file='about-jun.js' lines={ABOUT_CODE} wrap cursor footer='JavaScript · UTF-8 · main ✓' />
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
