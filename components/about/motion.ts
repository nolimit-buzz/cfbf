// Shared motion tokens for the About page sections, lifted verbatim out of the
// old monolithic app/about/page.tsx so every section animates identically.

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

export const statRow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};

export const statCard = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
