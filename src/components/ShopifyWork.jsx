import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { clientWork, moreStores } from '../data/portfolio';

// Browser-window frame: shows a screenshot if one is set, otherwise a branded cover
const BrowserFrame = ({ site }) => {
  const host = site.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  return (
    <a
      href={site.url}
      target='_blank'
      rel='noopener noreferrer'
      className='group block overflow-hidden rounded-xl border border-navy-line bg-navy-card shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-accent/60'
      aria-label={`Visit ${site.name} website`}
    >
      <div className='flex items-center gap-1.5 border-b border-navy-line px-4 py-2.5'>
        <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
        <span className='ml-3 truncate rounded bg-navy-dark px-3 py-0.5 text-xs text-ink-muted'>{host}</span>
      </div>
      <div className='aspect-[16/10] overflow-hidden'>
        {site.image ? (
          <img
            src={site.image}
            alt={`${site.name} storefront`}
            loading='lazy'
            className='h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]'
          />
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${site.accent} p-8 text-center transition duration-500 group-hover:scale-[1.03]`}
          >
            <p className='font-display text-3xl font-bold tracking-wider text-white sm:text-4xl'>{site.name}</p>
            <p className='mt-3 text-sm text-white/80'>{site.type}</p>
          </div>
        )}
      </div>
    </a>
  );
};

const ShopifyWork = () => {
  return (
    <section id='work' className='section bg-navy-dark'>
      <div className='container-site'>
        <h2 className='section-title'>
          <span>03.</span> Shopify Client Work
        </h2>

        <div className='space-y-20'>
          {clientWork.map((site, i) => (
            <article key={site.name} className='grid items-center gap-8 lg:grid-cols-2 lg:gap-14'>
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <BrowserFrame site={site} />
              </div>

              <div>
                <p className='font-display text-xs tracking-widest text-accent'>{site.type}</p>
                <h3 className='mt-2 text-3xl font-semibold text-ink-light'>{site.name}</h3>
                <p className='mt-4 leading-relaxed'>{site.summary}</p>

                <ul className='mt-5 space-y-2'>
                  {site.highlights.map((h) => (
                    <li key={h} className='flex gap-3 text-[15px] leading-relaxed'>
                      <span className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' aria-hidden='true' />
                      {h}
                    </li>
                  ))}
                </ul>

                <ul className='mt-6 flex flex-wrap gap-2'>
                  {site.tags.map((t) => (
                    <li key={t} className='tag'>
                      {t}
                    </li>
                  ))}
                </ul>

                <div className='mt-7 flex flex-wrap items-center gap-6'>
                  <a href={site.url} target='_blank' rel='noopener noreferrer' className='btn-primary !py-2.5'>
                    Visit site <HiOutlineExternalLink />
                  </a>
                  {site.code && (
                    <a href={site.code} target='_blank' rel='noopener noreferrer' className='link-subtle'>
                      <FaGithub /> Theme code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='mt-24'>
          <h3 className='mb-6 font-display text-sm font-semibold tracking-wider text-ink-light'>More Shopify stores</h3>
          <ul className='grid gap-4 sm:grid-cols-3'>
            {moreStores.map((store) => (
              <li key={store.name}>
                <a
                  href={store.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='card group flex items-center justify-between gap-3 p-5 hover:-translate-y-1 hover:border-accent/50'
                >
                  <span>
                    <span className='block font-semibold text-ink-light'>{store.name}</span>
                    <span className='mt-0.5 block font-display text-[11px] tracking-widest text-accent'>
                      {store.theme} theme
                    </span>
                  </span>
                  <HiOutlineExternalLink className='shrink-0 text-lg text-ink-muted transition group-hover:text-accent' />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShopifyWork;
