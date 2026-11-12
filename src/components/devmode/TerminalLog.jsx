import React, { useEffect, useState } from 'react';

const COLORS = { ok: 'text-accent', err: 'text-[#ff5370]', info: 'text-ink-muted', cmd: 'text-ink-light', warn: 'text-[#ffcb6b]' };

/**
 * Prints lines one by one. lines: [{ t: 'ok'|'err'|'info'|'cmd'|'warn', v: string }]
 * Changing `runKey` restarts the animation.
 */
const TerminalLog = ({ lines, runKey, onDone, speed = 280, className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!lines.length) return undefined;
    let n = 0;
    const timer = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= lines.length) {
        clearInterval(timer);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey]);

  return (
    <div className={`rounded-lg border border-[#1f2233] bg-[#0b0c14] p-3 font-mono text-[12px] leading-6 ${className}`} aria-live='polite'>
      {lines.length === 0 ? (
        <p className='text-[#3b3f58]'>$ waiting for a command…</p>
      ) : (
        lines.slice(0, count).map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap ${COLORS[l.t] || COLORS.info}`}>
            {l.v}
          </p>
        ))
      )}
      {lines.length > 0 && count < lines.length && <span className='inline-block h-3.5 w-2 animate-[blink_1s_steps(1)_infinite] bg-accent' />}
    </div>
  );
};

export default TerminalLog;
