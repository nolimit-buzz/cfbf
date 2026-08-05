"use client";

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import type { ContactEligibilityReminderSection } from '@/lib/strapi-contact-types';

type EligibilityReminderProps = Omit<ContactEligibilityReminderSection, '__component' | 'id'>;

export default function EligibilityReminder({
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
}: EligibilityReminderProps) {
  return (
    <div className="bg-[#FAFDFB] rounded-[6px] p-8 border border-[#81C34D]/30 space-y-4">
      <div className="flex items-center gap-2 text-[#00A788]">
        <ShieldCheck size={20} className="shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider font-mono">{eyebrow}</span>
      </div>
      <h4 className="font-bold text-lg font-sans text-brand-dark">{heading}</h4>
      <p className="text-xs text-gray-500 font-sans leading-relaxed">{description}</p>
      <Link
        href={ctaHref ?? '#'}
        className="w-full bg-[#051F1A] text-white py-3.5 rounded-[6px] flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs hover:bg-brand-primary transition-all interactive font-sans justify-center"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
