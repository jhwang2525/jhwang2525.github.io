import React, { useMemo, useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalLog from './TerminalLog';
import Option from './Option';

const STYLES = {
  minimal: { label: 'Minimal', card: 'bg-white text-[#1d1d1f]', btn: 'bg-[#1d1d1f] text-white', accent: '#1d1d1f', bg: '#ffffff' },
  bold: { label: 'Bold', card: 'bg-[#ffe066] text-[#1d1d1f]', btn: 'bg-[#ff4d6d] text-white', accent: '#ff4d6d', bg: '#ffe066' },
  dark: { label: 'Dark', card: 'bg-[#16182a] text-white', btn: 'bg-[#3bba9c] text-[#16182a]', accent: '#3bba9c', bg: '#16182a' },
};
const BUTTONS = ['Add to cart', 'Buy now', 'Pre-order'];
const CAP_COLORS = { Black: '#1f2024', Sand: '#d8c3a5', Sage: '#9fb59a' };

const BuildCard = () => {
  const [style, setStyle] = useState('minimal');
  const [sale, setSale] = useState(false);
  const [rating, setRating] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [button, setButton] = useState('Add to cart');
  const [color, setColor] = useState('Black');
  const [lastChange, setLastChange] = useState(null);
  const [deployKey, setDeployKey] = useState(0);
  const [deployed, setDeployed] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const s = STYLES[style];
  const change = (key, fn) => {
    fn();
    setLastChange(key);
    setDeployed(false);
  };

  // Generated "real" Liquid + CSS, rebuilt from the visitor's choices
  const lines = useMemo(() => {
    const L = (text, key) => ({ text, status: key && key === lastChange ? 'added' : undefined });
    const out = [
      L(`{% comment %} Product card · style: ${s.label} {% endcomment %}`, 'style'),
      L(`<div class="product-card product-card--${style}">`, 'style'),
    ];
    if (sale) out.push(L(`  {% if product.compare_at_price > product.price %}`, 'sale'), L(`    <span class="badge">Sale</span>`, 'sale'), L(`  {% endif %}`, 'sale'));
    out.push(
      L(`  <img src="{{ product.featured_image | image_url: width: 600 }}" loading="lazy">`),
      L(`  <h3>{{ product.title }}</h3>`),
      L(`  <p class="swatch">Color: ${color}</p>`, 'color')
    );
    if (rating) out.push(L(`  {% render 'star-rating', rating: product.metafields.reviews.rating %}`, 'rating'));
    out.push(L(`  <p class="price">{{ product.price | money }}</p>`));
    if (sale) out.push(L(`  <s>{{ product.compare_at_price | money }}</s>`, 'sale'));
    if (shipping) out.push(L(`  <p class="note">Free shipping over {{ 75 | times: 100 | money }}</p>`, 'shipping'));
    out.push(
      L(`  <button class="btn" data-add-to-cart>${button}</button>`, 'button'),
      L(`</div>`),
      L(``),
      L(`/* ${s.label} theme */`, 'style'),
      L(`.product-card--${style} { background: ${s.bg}; border-radius: 16px; }`, 'style'),
      L(`.product-card--${style} .btn { background: ${s.accent}; }`, 'style')
    );
    return out;
  }, [style, sale, rating, shipping, button, color, lastChange, s]);

  const deployLines = [
    { t: 'cmd', v: '$ shopify theme push --only sections/product-card.liquid' },
    { t: 'info', v: '› Validating Liquid…' },
    { t: 'ok', v: '✔ 0 errors, 0 warnings' },
    { t: 'info', v: '› Uploading 1 file to theme "Live"…' },
    { t: 'ok', v: '✔ Uploaded product-card.liquid' },
    { t: 'info', v: '› Running checks: accessibility, performance' },
    { t: 'ok', v: '✔ Lighthouse 98 · Accessible button contrast' },
    { t: 'ok', v: '🚀 Deployed! Your product card is live.' },
  ];

  return (
    <div className='grid gap-6 lg:grid-cols-[300px_1fr]'>
      {/* Controls */}
      <div className='space-y-5'>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted'>Card style</p>
          <div className='grid grid-cols-3 gap-2'>
            {Object.entries(STYLES).map(([k, v]) => (
              <Option key={k} active={style === k} onClick={() => change('style', () => setStyle(k))}>
                {v.label}
              </Option>
            ))}
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted'>Product color</p>
          <div className='grid grid-cols-3 gap-2'>
            {Object.keys(CAP_COLORS).map((c) => (
              <Option key={c} active={color === c} onClick={() => change('color', () => setColor(c))}>
                {c}
              </Option>
            ))}
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted'>Add features</p>
          <div className='grid gap-2'>
            <Option active={sale} onClick={() => change('sale', () => setSale(!sale))}>🏷️ Show a sale badge</Option>
            <Option active={rating} onClick={() => change('rating', () => setRating(!rating))}>⭐ Show star rating</Option>
            <Option active={shipping} onClick={() => change('shipping', () => setShipping(!shipping))}>🚚 Free shipping note</Option>
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted'>Button text</p>
          <div className='grid grid-cols-3 gap-2'>
            {BUTTONS.map((b) => (
              <Option key={b} active={button === b} onClick={() => change('button', () => setButton(b))}>
                {b}
              </Option>
            ))}
          </div>
        </div>
        <button
          type='button'
          disabled={deploying}
          onClick={() => {
            setDeploying(true);
            setDeployed(false);
            setDeployKey((k) => k + 1);
          }}
          className='btn-primary w-full disabled:opacity-60'
        >
          {deploying ? 'Deploying…' : deployed ? '✔ Deployed · Deploy again' : '🚀 Deploy to store'}
        </button>
      </div>

      {/* Code + preview */}
      <div className='grid gap-4 xl:grid-cols-[1.25fr_1fr]'>
        <CodeEditor file='sections/product-card.liquid' lines={lines} footer={`Liquid · ${lines.length} lines · ${lastChange ? 'edited just now' : 'ready'}`} />
        <div className='flex flex-col gap-4'>
          <div className='grid flex-1 place-items-center rounded-xl border border-navy-line bg-[radial-gradient(circle_at_center,#2a2d45,#1b1d2e)] p-6'>
            <div className={`w-full max-w-[230px] rounded-2xl p-4 shadow-2xl transition-all duration-500 ${s.card}`}>
              <div className='relative grid aspect-square place-items-center rounded-xl bg-black/5'>
                {sale && <span className='absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white' style={{ background: s.accent === '#1d1d1f' ? '#e11d48' : s.accent }}>SALE</span>}
                <svg viewBox='0 0 100 70' className='w-3/4 drop-shadow-lg' aria-hidden='true'>
                  <path d='M12 50 Q14 14 50 12 Q86 14 88 50 Z' fill={CAP_COLORS[color]} />
                  <path d='M8 50 Q50 44 96 54 Q60 64 8 56 Z' fill={CAP_COLORS[color]} opacity='0.85' />
                  <circle cx='50' cy='13' r='3' fill={CAP_COLORS[color]} />
                </svg>
              </div>
              <p className='mt-3 text-sm font-semibold'>Laser Perforated Cap</p>
              <p className='text-[11px] opacity-60'>Color: {color}</p>
              {rating && <p className='mt-1 text-xs text-[#f5a623]'>★★★★★ <span className='opacity-60'>(128)</span></p>}
              <p className='mt-1 text-sm font-bold'>
                $24.00 {sale && <s className='ml-1 text-xs font-normal opacity-50'>$32.00</s>}
              </p>
              {shipping && <p className='mt-1 text-[11px] opacity-70'>🚚 Free shipping over $75</p>}
              <span className={`mt-3 block rounded-lg py-2 text-center text-xs font-semibold ${s.btn}`}>{button}</span>
            </div>
          </div>
          <TerminalLog
            lines={deployKey ? deployLines : []}
            runKey={deployKey}
            onDone={() => {
              setDeploying(false);
              setDeployed(true);
            }}
            className='h-[170px] overflow-y-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default BuildCard;
