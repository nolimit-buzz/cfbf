"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountUpProps {
  /** Formatted display string, e.g. "£10M", "7,500+", "₦7.86B+", "48%". */
  value?: string | number;
  /** Backwards-compatible numeric target (home page). */
  to?: number;
  duration?: number;
  className?: string;
}

// Captures an optional prefix, the numeric token (commas / decimal) and a suffix.
const NUM_RE = /^(.*?)(-?\d[\d,]*(?:\.\d+)?)(.*)$/;

export default function CountUp({ value, to, duration = 1.6, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const source = value !== undefined ? value : to;
  const isNumberInput = typeof source === 'number';

  let prefix = '';
  let suffix = '';
  let target = 0;
  let decimals = 0;
  let group = false;
  let parsed = true;

  if (isNumberInput) {
    target = source as number;
    decimals = target % 1 === 0 ? 0 : 1;
    group = true; // thousands-group raw numbers like the original component
  } else {
    const raw = String(source ?? '');
    const m = raw.match(NUM_RE);
    if (!m) {
      parsed = false;
    } else {
      prefix = m[1];
      suffix = m[3];
      const numStr = m[2];
      group = numStr.includes(',');
      decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
      target = parseFloat(numStr.replace(/,/g, ''));
    }
  }

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    if (!group) return fixed;
    const [intPart, dec] = fixed.split('.');
    const grouped = Number(intPart).toLocaleString('en-US');
    return dec ? `${grouped}.${dec}` : grouped;
  };

  const [display, setDisplay] = useState(() => (parsed ? format(0) : String(source ?? '')));

  useEffect(() => {
    if (!parsed) return;
    if (!inView) {
      setDisplay(format(0));
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, parsed, target, duration]);

  if (!parsed) return <span ref={ref} className={className}>{String(source ?? '')}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
