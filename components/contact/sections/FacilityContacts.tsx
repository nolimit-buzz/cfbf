"use client";

import { Mail, MapPin, Phone } from 'lucide-react';
import type { ContactFacilityContactsSection } from '@/lib/strapi-contact-types';

type FacilityContactsProps = Omit<ContactFacilityContactsSection, '__component' | 'id'>;

export default function FacilityContacts({
  heading,
  officeLocationLabel,
  officeAddressLineOne,
  officeAddressLineTwo,
  emailLabel,
  emailAddress,
  emailHref,
  phoneLabel,
  phoneNumber,
  phoneHref,
}: FacilityContactsProps) {
  return (
    <div className="bg-white p-8 rounded-[6px] border border-gray-200/35 space-y-6">
      <h3 className="text-xl font-bold font-sans text-[#051F1A]">{heading}</h3>

      <div className="flex gap-4 items-start">
        <MapPin className="text-brand-primary shrink-0 mt-1" size={20} />
        <div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-sans mb-1">
            {officeLocationLabel}
          </span>
          <p className="text-gray-600 text-sm font-sans leading-relaxed">
            {officeAddressLineOne} <br />
            {officeAddressLineTwo}
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <Mail className="text-brand-primary shrink-0 mt-1" size={20} />
        <div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-sans mb-1">
            {emailLabel}
          </span>
          <a
            href={emailHref}
            className="text-brand-primary text-sm font-sans hover:text-[#051F1A] transition-colors font-medium interactive focus:outline-none"
          >
            {emailAddress}
          </a>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <Phone className="text-brand-primary shrink-0 mt-1" size={20} />
        <div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-sans mb-1">
            {phoneLabel}
          </span>
          <a
            href={phoneHref}
            className="text-brand-primary text-sm font-sans hover:text-[#051F1A] transition-colors font-medium interactive focus:outline-none"
          >
            {phoneNumber}
          </a>
        </div>
      </div>
    </div>
  );
}
