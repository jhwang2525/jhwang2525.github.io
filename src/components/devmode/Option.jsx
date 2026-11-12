import React from 'react';

// Plain-English choice button used by every mission
const Option = ({ active, onClick, children, disabled, tone = 'default' }) => (
  <button
    type='button'
    onClick={onClick}
    disabled={disabled}
    aria-pressed={active}
    className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
      active
        ? 'border-accent bg-accent/15 text-ink-light shadow-[0_0_0_1px_#3bba9c]'
        : tone === 'wrong'
        ? 'border-[#ff5370]/60 bg-[#ff5370]/10 text-ink-light'
        : 'border-navy-line bg-navy-card/60 text-ink hover:border-accent/60 hover:text-ink-light'
    }`}
  >
    {children}
  </button>
);

export default Option;
