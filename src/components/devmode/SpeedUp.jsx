import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalLog from './TerminalLog';
import Option from './Option';

const BASE = { score: 38, lcp: 6.8, cls: 0.31, tbt: 1240, weight: 8.4 };

const FIXES = [
  {
    id: 'images',
    label: '🖼️ Compress & resize images',
    desc: 'Serve right-sized WebP images instead of huge originals.',
    gain: { score: 18, lcp: -2.4, weight: -5.1 },
    replace: [3, '  <img src="{{ section.settings.hero | image_url: width: 1600, format: \'webp\' }}"'],
  },
  {
    id: 'lazy',
    label: '💤 Lazy-load images below the fold',
    desc: "Only load images when the shopper scrolls to them.",
    gain: { score: 9, lcp: -0.6, weight: -1.6 },
    replace: [8, '  {{ product.featured_image | image_url: width: 600 | image_tag: loading: \'lazy\' }}'],
  },
  {
    id: 'scripts',
    label: '⏱️ Defer third-party app scripts',
    desc: "Don't let review and chat widgets block the page.",
    gain: { score: 15, tbt: -980 },
    replace: [12, '<script src="{{ \'reviews-widget.js\' | asset_url }}" defer></script>'],
  },
  {
    id: 'size',
    label: '📐 Reserve space for images',
    desc: 'Stops the page jumping around while it loads.',
    gain: { score: 11, cls: -0.29 },
    replace: [4, '       width="1600" height="900" alt="New season collection">'],
  },
  {
    id: 'preload',
    label: '⚡ Preload the hero image',
    desc: 'Start downloading the biggest image right away.',
    gain: { score: 9, lcp: -1.4 },
    insert: [0, '{{ section.settings.hero | image_url: width: 1600 | preload_tag: as: \'image\' }}'],
  },
];

const BASE_CODE = [
  '{% comment %} Homepage hero + product grid {% endcomment %}',
  '<section class="hero">',
  '  <!-- 4.2 MB original photo -->',
  '  <img src="{{ section.settings.hero | img_url: \'master\' }}"',
  '       alt="New season collection">',
  '</section>',
  '<div class="grid">',
  '  {% for product in collection.products %}',
  '  <img src="{{ product.featured_image | img_url: \'master\' }}">',
  '  {% endfor %}',
  '</div>',
  '',
  '<script src="{{ \'reviews-widget.js\' | asset_url }}"></script>',
];

const scoreColor = (s) => (s >= 90 ? '#3bba9c' : s >= 50 ? '#ffb020' : '#ff5370');

const Gauge = ({ value }) => {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className='relative h-36 w-36'>
      <svg viewBox='0 0 120 120' className='h-full w-full -rotate-90'>
        <circle cx='60' cy='60' r={r} fill='none' stroke='#2a2d45' strokeWidth='10' />
        <circle
          cx='60'
          cy='60'
          r={r}
          fill='none'
          stroke={scoreColor(value)}
          strokeWidth='10'
          strokeLinecap='round'
          strokeDasharray={c}
          strokeDashoffset={c - (value / 100) * c}
          style={{ transition: 'stroke-dashoffset 0.9s ease, stroke 0.6s' }}
        />
      </svg>
      <div className='absolute inset-0 grid place-items-center text-center'>
        <div>
          <p className='font-display text-4xl font-bold' style={{ color: scoreColor(value) }}>
            {value}
          </p>
          <p className='text-[10px] uppercase tracking-wider text-ink-muted'>Speed score</p>
        </div>
      </div>
    </div>
  );
};

// Smoothly counts a number toward its target
const useCountTo = (target, ms = 900) => {
  const [v, setV] = useState(target);
  useEffect(() => {
    const start = v;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / ms, 1);
      setV(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return v;
};

const SpeedUp = () => {
  const [applied, setApplied] = useState([]);
  const [last, setLast] = useState(null);
  const [log, setLog] = useState([]);
  const [runKey, setRunKey] = useState(0);

  const metrics = applied.reduce(
    (m, id) => {
      const g = FIXES.find((f) => f.id === id).gain;
      return {
        score: m.score + (g.score || 0),
        lcp: m.lcp + (g.lcp || 0),
        cls: m.cls + (g.cls || 0),
        tbt: m.tbt + (g.tbt || 0),
        weight: m.weight + (g.weight || 0),
      };
    },
    { ...BASE }
  );
  metrics.score = Math.min(100, metrics.score);

  const score = Math.round(useCountTo(metrics.score));
  const lcp = useCountTo(metrics.lcp);
  const cls = useCountTo(metrics.cls);
  const tbt = Math.round(useCountTo(metrics.tbt));
  const weight = useCountTo(metrics.weight);
  const allDone = applied.length === FIXES.length;

  // Build the code with the applied fixes marked as changes
  const lines = [];
  BASE_CODE.forEach((text, i) => {
    const pre = FIXES.find((f) => f.insert && f.insert[0] === i && applied.includes(f.id));
    if (pre) lines.push({ text: pre.insert[1], status: last === pre.id ? 'added' : undefined, id: pre.id });
    const rep = FIXES.find((f) => f.replace && f.replace[0] === i && applied.includes(f.id));
    if (rep) {
      if (last === rep.id) lines.push({ text, status: 'removed' });
      lines.push({ text: rep.replace[1], status: last === rep.id ? 'added' : undefined, id: rep.id });
    } else if (!(i === 2 && applied.includes('images'))) {
      lines.push({ text });
    }
  });

  const apply = (fix) => {
    if (applied.includes(fix.id)) return;
    const next = [...applied, fix.id];
    setApplied(next);
    setLast(fix.id);
    const newScore = Math.min(100, next.reduce((s, id) => s + (FIXES.find((f) => f.id === id).gain.score || 0), BASE.score));
    setLog([
      { t: 'cmd', v: '$ lighthouse https://demo-store.myshopify.com --view' },
      { t: 'info', v: `› Applied: ${fix.label.replace(/^\S+\s/, '')}` },
      { t: 'ok', v: `✔ Performance ${newScore}/100` },
      ...(next.length === FIXES.length ? [{ t: 'ok', v: '🏆 Perfect score! Faster pages = more sales.' }] : []),
    ]);
    setRunKey((k) => k + 1);
  };

  const reset = () => {
    setApplied([]);
    setLast(null);
    setLog([]);
  };

  const Metric = ({ label, value, good }) => (
    <div className='rounded-lg bg-navy/60 px-3 py-2'>
      <p className='text-[10px] uppercase tracking-wider text-ink-muted'>{label}</p>
      <p className={`font-mono text-sm font-semibold ${good ? 'text-accent' : 'text-[#ffb020]'}`}>{value}</p>
    </div>
  );

  return (
    <div className='grid gap-6 lg:grid-cols-[300px_1fr]'>
      <div className='space-y-3'>
        <p className='rounded-lg border border-[#ffb020]/40 bg-[#ffb020]/10 p-3 text-sm text-ink-light'>
          🐢 This store takes almost 7 seconds to load on a phone, so shoppers leave. Pick fixes to speed it up.
        </p>
        {FIXES.map((f) => (
          <Option key={f.id} active={applied.includes(f.id)} onClick={() => apply(f)}>
            <span className='flex items-center justify-between gap-2 font-medium'>
              {f.label}
              {applied.includes(f.id) && <span className='text-xs text-accent'>+{f.gain.score} ✓</span>}
            </span>
            <span className='block text-xs text-ink-muted'>{f.desc}</span>
          </Option>
        ))}
        {applied.length > 0 && (
          <button type='button' onClick={reset} className='link-subtle w-full justify-center pt-1'>
            ↺ Reset store
          </button>
        )}
      </div>

      <div className='grid gap-4 xl:grid-cols-[1.25fr_1fr]'>
        <CodeEditor file='sections/homepage.liquid' lines={lines} footer={`${applied.length}/${FIXES.length} optimizations applied`} />
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col items-center gap-4 rounded-xl border border-navy-line bg-navy-card/50 p-5'>
            <Gauge value={score} />
            <div className='grid w-full grid-cols-2 gap-2'>
              <Metric label='Load time (LCP)' value={`${lcp.toFixed(1)}s`} good={metrics.lcp <= 2.5} />
              <Metric label='Layout shift' value={cls.toFixed(2)} good={metrics.cls <= 0.1} />
              <Metric label='Blocking time' value={`${tbt}ms`} good={metrics.tbt <= 300} />
              <Metric label='Page weight' value={`${weight.toFixed(1)} MB`} good={metrics.weight <= 2} />
            </div>
            {allDone && <p className='text-center text-sm text-accent'>🚀 From 38 to 100. This is the kind of fix Jun ships for real stores.</p>}
          </div>
          <TerminalLog lines={log} runKey={runKey} speed={260} className='min-h-[120px]' />
        </div>
      </div>
    </div>
  );
};

export default SpeedUp;
