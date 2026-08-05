import { Suspense } from 'react';

export default function StrapiPage({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        fallback ?? (
          <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest" />
        )
      }
    >
      {children}
    </Suspense>
  );
}
