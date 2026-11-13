import React from 'react';

// Lightweight syntax colouring for Liquid / HTML / CSS / JS snippets
const TOKEN = /(\b[a-zA-Z_]\w*(?=:\s)|\{%-?.*?-?%\}|\{\{.*?\}\}|"[^"]*"|'[^']*'|<\/?[a-zA-Z][\w-]*|\/\*.*?\*\/|\/\/.*$|\b(?:const|let|return|function|if|else|await|async|import|from|export|default)\b|\b\d+(?:\.\d+)?(?:px|ms|s|%|rem)?\b)/g;

const colorFor = (tok) => {
  if (/^[a-zA-Z_]\w*$/.test(tok) && !/^(const|let|return|function|if|else|await|async|import|from|export|default)$/.test(tok)) return 'text-[#82aaff]';
  if (tok.startsWith('{%') || tok.startsWith('{{')) return 'text-[#f78c6c]';
  if (tok.startsWith('"') || tok.startsWith("'")) return 'text-[#c3e88d]';
  if (tok.startsWith('<')) return 'text-[#ff5370]';
  if (tok.startsWith('/*') || tok.startsWith('//')) return 'text-[#676e95] italic';
  if (/^\d/.test(tok)) return 'text-[#f78c6c]';
  return 'text-[#c792ea]';
};

const highlight = (line) =>
  line.split(TOKEN).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={colorFor(part)}>
        {part}
      </span>
    ) : (
      part
    )
  );

/**
 * lines: [{ text, status?: 'added' | 'removed' | 'error' | 'fixed', id? }]
 * onLineClick: optional (index) => void, makes lines clickable
 */
const CodeEditor = ({ file, lines, onLineClick, selected, footer, wrap = false, cursor = false, className = '' }) => (
  <div className={`flex flex-col overflow-hidden rounded-xl border border-navy-line bg-[#0f111a] shadow-2xl shadow-black/40 ${className}`}>
    <div className='flex items-center gap-2 border-b border-[#1f2233] bg-[#151826] px-3 py-2'>
      <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
      <span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
      <span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
      <span className='ml-3 rounded-t-md border-b-2 border-accent bg-[#0f111a] px-3 py-1 font-mono text-[11px] text-ink-light'>
        {file}
      </span>
    </div>
    <div className={`flex-1 py-3 font-mono text-[12.5px] leading-6 ${wrap ? '' : 'overflow-x-auto'}`}>
      {lines.map((line, i) => {
        const clickable = Boolean(onLineClick);
        const bg =
          line.status === 'added' || line.status === 'fixed'
            ? 'bg-[#3bba9c]/10'
            : line.status === 'removed'
            ? 'bg-[#ff5370]/10 line-through opacity-60'
            : line.status === 'error'
            ? 'bg-[#ff5370]/15'
            : selected === i
            ? 'bg-[#82aaff]/15'
            : '';
        const marker =
          line.status === 'added' || line.status === 'fixed' ? '+' : line.status === 'removed' ? '-' : line.status === 'error' ? '!' : ' ';
        const Tag = clickable ? 'button' : 'div';
        return (
          <Tag
            key={line.id || `${i}-${line.text}`}
            type={clickable ? 'button' : undefined}
            onClick={clickable ? () => onLineClick(i) : undefined}
            className={`flex w-full text-left ${wrap ? '' : 'min-w-max'} ${bg} ${
              clickable ? 'cursor-pointer hover:bg-[#82aaff]/10' : ''
            } ${line.status === 'added' || line.status === 'fixed' ? 'animate-[typeIn_0.5s_ease-out]' : ''}`}
          >
            <span className='w-10 shrink-0 select-none pr-3 text-right text-[#3b3f58]'>{i + 1}</span>
            <span
              className={`w-4 shrink-0 select-none ${
                marker === '+' ? 'text-accent' : marker === '!' || marker === '-' ? 'text-[#ff5370]' : ''
              }`}
            >
              {marker}
            </span>
            <span className={`pr-4 text-[#babed8] ${wrap ? 'whitespace-pre-wrap break-words pl-[2ch] -indent-[2ch]' : 'whitespace-pre'}`}>
              {highlight(line.text)}
              {cursor && i === lines.length - 1 && (
                <span className='ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-[blink_1s_steps(1)_infinite] bg-accent' />
              )}
            </span>
          </Tag>
        );
      })}
    </div>
    {footer && <div className='border-t border-[#1f2233] bg-[#151826] px-3 py-1.5 font-mono text-[11px] text-ink-muted'>{footer}</div>}
  </div>
);

export default CodeEditor;
