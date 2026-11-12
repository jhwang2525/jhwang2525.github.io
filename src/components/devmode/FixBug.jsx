import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalLog from './TerminalLog';
import Option from './Option';

const BUGS = [
  {
    file: 'snippets/product-price.liquid',
    complaint: '“The price shows as 2999 instead of $29.99.”',
    from: 'Customer email',
    code: [
      '{% comment %} Product price {% endcomment %}',
      '<div class="price-wrapper">',
      '  <span class="price">{{ product.price }}</span>',
      '  {% if product.available == false %}',
      '    <span class="sold-out">Sold out</span>',
      '  {% endif %}',
      '</div>',
    ],
    bugLine: 2,
    fixed: '  <span class="price">{{ product.price | money }}</span>',
    test: 'price renders as currency',
    expect: "Expected \"$29.99\" but got \"2999\"",
    hint: 'Look for the line that prints the price.',
    fixes: [
      { label: 'Format the number as money', correct: true, why: 'Shopify stores prices in cents. The money filter turns 2999 into $29.99.' },
      { label: 'Divide it by 100 with CSS', why: "CSS styles things, it can't do math on text." },
      { label: 'Hide the price', why: 'Customers need to see the price to buy!' },
    ],
  },
  {
    file: 'assets/product-card.css',
    complaint: '“I can’t find the Add to cart button on my phone.”',
    from: 'Customer review · 2★',
    code: [
      '.btn {',
      '  display: block;',
      '  padding: 14px 24px;',
      '}',
      '',
      '@media (max-width: 749px) {',
      '  .btn { display: none; }',
      '}',
    ],
    bugLine: 6,
    fixed: '  .btn { display: block; width: 100%; }',
    test: 'add to cart button visible on mobile',
    expect: 'Expected button to be visible at 375px wide, but it is hidden',
    hint: 'Look inside the rule for small screens (max-width: 749px).',
    fixes: [
      { label: 'Show the button full-width on phones', correct: true, why: 'The phone rule was hiding it. Now it shows, full-width and easy to tap.' },
      { label: 'Make the text bigger', why: "Bigger text won't help if the button is hidden." },
      { label: 'Hide it on desktop too', why: "That would break it for everyone. Let's fix it instead!" },
    ],
  },
  {
    file: 'assets/cart.js',
    complaint: '“I click Add to cart and nothing happens.”',
    from: 'Support ticket #482',
    code: [
      'async function addToCart(variantId) {',
      "  const res = await fetch('/cart/add.js', {",
      "    method: 'GET',",
      "    headers: { 'Content-Type': 'application/json' },",
      '    body: JSON.stringify({ id: variantId, quantity: 1 }),',
      '  });',
      '  return res.json();',
      '}',
    ],
    bugLine: 2,
    fixed: "    method: 'POST',",
    test: 'adds item to cart',
    expect: 'Request failed: GET requests cannot send a body',
    hint: 'Check how the request is being sent to the cart.',
    fixes: [
      { label: 'Send the item to the cart (POST)', correct: true, why: 'Adding to a cart changes data, so it must be a POST request, not a GET.' },
      { label: 'Reload the page after clicking', why: "The item still wouldn't be added." },
      { label: 'Remove the Add to cart button', why: "Then nobody could buy anything!" },
    ],
  },
];

const FixBug = () => {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState('start'); // start → failing → found → fixed → passed
  const [selected, setSelected] = useState(null);
  const [wrongLine, setWrongLine] = useState(false);
  const [wrongFix, setWrongFix] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const bug = BUGS[index];
  const done = index === BUGS.length - 1 && stage === 'passed';
  const correctFix = bug.fixes.find((f) => f.correct);

  const lines = bug.code.flatMap((text, i) => {
    if (i !== bug.bugLine) return [{ text }];
    if (stage === 'fixed' || stage === 'passed') return [{ text, status: 'removed' }, { text: bug.fixed, status: 'fixed' }];
    if (stage === 'found') return [{ text, status: 'error' }];
    return [{ text }];
  });

  const runTests = () => {
    const passing = stage === 'fixed';
    setLog([
      { t: 'cmd', v: '$ npm test' },
      { t: 'info', v: `› ${bug.file}` },
      passing ? { t: 'ok', v: `  ✔ ${bug.test}` } : { t: 'err', v: `  ✖ ${bug.test}` },
      passing ? { t: 'ok', v: '1 passing · 0 failing' } : { t: 'err', v: `    ${bug.expect}` },
      passing ? { t: 'ok', v: '✔ Bug fixed. Ready to ship!' } : { t: 'warn', v: '1 failing. Find the line causing it ↑' },
    ]);
    setRunning(true);
    setRunKey((k) => k + 1);
  };

  const onTestsDone = () => {
    setRunning(false);
    setStage((st) => (st === 'start' ? 'failing' : st === 'fixed' ? 'passed' : st));
  };

  const clickLine = (i) => {
    if (stage !== 'failing') return;
    setSelected(i);
    if (i === bug.bugLine) {
      setWrongLine(false);
      setStage('found');
    } else {
      setWrongLine(true);
    }
  };

  const chooseFix = (fix) => {
    if (fix.correct) {
      setWrongFix(null);
      setStage('fixed');
    } else {
      setWrongFix(fix);
    }
  };

  const next = () => {
    setIndex((i) => (done ? 0 : i + 1));
    setStage('start');
    setSelected(null);
    setWrongLine(false);
    setWrongFix(null);
    setLog([]);
  };

  const step = { start: 1, failing: 2, found: 3, fixed: 4, passed: 4 }[stage];

  return (
    <div className='grid gap-6 lg:grid-cols-[300px_1fr]'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between text-xs text-ink-muted'>
          <span>
            Bug {index + 1} of {BUGS.length}
          </span>
          <span className='flex gap-1'>
            {BUGS.map((_, i) => (
              <span key={i} className={`h-1.5 w-6 rounded-full ${i < index || (i === index && stage === 'passed') ? 'bg-accent' : 'bg-navy-line'}`} />
            ))}
          </span>
        </div>

        <div className='rounded-lg border border-[#ff5370]/40 bg-[#ff5370]/10 p-4'>
          <p className='text-[11px] font-semibold uppercase tracking-wider text-[#ff8a9a]'>🐞 {bug.from}</p>
          <p className='mt-1 text-sm text-ink-light'>{bug.complaint}</p>
        </div>

        <ol className='space-y-3 text-sm'>
          {[
            ['Run the tests to confirm the bug', 1],
            ['Click the line of code causing it', 2],
            ['Pick the right fix', 3],
            ['Run the tests again', 4],
          ].map(([label, n]) => (
            <li key={n} className={`flex items-center gap-2 ${step === n ? 'text-ink-light' : step > n ? 'text-accent' : 'text-ink-muted'}`}>
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold ${step > n || stage === 'passed' ? 'bg-accent text-navy' : step === n ? 'border border-accent text-accent' : 'border border-navy-line'}`}>
                {step > n || stage === 'passed' ? '✓' : n}
              </span>
              {label}
            </li>
          ))}
        </ol>

        {(stage === 'start' || stage === 'fixed') && (
          <button type='button' onClick={runTests} disabled={running} className='btn-primary w-full disabled:opacity-60'>
            {running ? 'Running…' : '▶ Run tests'}
          </button>
        )}

        {stage === 'failing' && (
          <p className='rounded-lg bg-navy-card/70 p-3 text-sm text-ink'>
            👉 Click a line in the code editor.
            {wrongLine && <span className='mt-1 block text-[#ffcb6b]'>Not that one. Hint: {bug.hint}</span>}
          </p>
        )}

        {stage === 'found' && (
          <div className='space-y-2'>
            <p className='text-sm text-ink-light'>Found it! How should we fix it?</p>
            {bug.fixes.map((f) => (
              <Option key={f.label} onClick={() => chooseFix(f)} tone={wrongFix === f ? 'wrong' : 'default'}>
                {f.label}
              </Option>
            ))}
            {wrongFix && <p className='text-sm text-[#ffcb6b]'>Hmm: {wrongFix.why}</p>}
          </div>
        )}

        {stage === 'fixed' && <p className='text-sm text-accent'>✔ {correctFix.why}</p>}

        {stage === 'passed' && (
          <div className='space-y-3'>
            <p className='rounded-lg bg-accent/10 p-3 text-sm text-ink-light'>
              {done ? '🏆 All bugs fixed and every test is passing. You think like a developer!' : '✅ Tests passing. Nice work!'}
            </p>
            <button type='button' onClick={next} className='btn-primary w-full'>
              {done ? '↺ Play again' : 'Next bug →'}
            </button>
          </div>
        )}
      </div>

      <div className='grid gap-4'>
        <CodeEditor
          file={bug.file}
          lines={lines}
          onLineClick={stage === 'failing' ? clickLine : undefined}
          selected={selected}
          footer={stage === 'failing' ? 'Click the line you think is broken' : stage === 'passed' ? '✔ All checks passed' : 'main · 1 issue open'}
        />
        <TerminalLog lines={log} runKey={runKey} onDone={onTestsDone} speed={330} className='min-h-[150px]' />
      </div>
    </div>
  );
};

export default FixBug;
