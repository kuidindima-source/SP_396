import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return `<code>${math}</code>`;
    }
  }, [math, block]);

  return (
    <div
      className={`overflow-visible no-scrollbar select-text font-serif ${className} ${
        block ? 'my-2 py-1 text-center' : 'inline-block'
      }`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
