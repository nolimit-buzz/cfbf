"use client";

// NOTE: deliberately does not import from "@/lib/strapi" — that module is
// server-only. The data is fetched in app/contact/page.tsx and passed in.
import { motion } from 'framer-motion';
import type { ContactSection } from '@/lib/strapi-contact-types';

import ContactHero from '@/components/contact/sections/ContactHero';
import FacilityContacts from '@/components/contact/sections/FacilityContacts';
import EligibilityReminder from '@/components/contact/sections/EligibilityReminder';
import FunStats from '@/components/contact/sections/FunStats';
import EnquiryForm from '@/components/contact/sections/EnquiryForm';
import ContactNextSteps from '@/components/contact/sections/ContactNextSteps';
import ContactDownloadCta from '@/components/contact/sections/ContactDownloadCta';

function find<C extends ContactSection['__component']>(sections: ContactSection[], component: C) {
  return sections.find((section) => section.__component === component) as
    | Extract<ContactSection, { __component: C }>
    | undefined;
}

/**
 * The contact page has a fixed two-column layout (contacts/reminder/stats on
 * the left, the enquiry form on the right) rather than a simple stacked
 * dynamiczone, so sections are picked out by component name and slotted into
 * that layout instead of mapped in array order.
 */
export default function ContactSections({ sections }: { sections: ContactSection[] }) {
  const hero = find(sections, 'contact-page.hero-section');
  const facilityContacts = find(sections, 'contact-page.facility-contacts-section');
  const eligibilityReminder = find(sections, 'contact-page.eligibility-reminder-section');
  const funStats = find(sections, 'contact-page.fun-stats-section');
  const enquiryForm = find(sections, 'contact-page.enquiry-form-section');
  const submissionSuccess = find(sections, 'contact-page.submission-success-section');
  const nextSteps = find(sections, 'contact-page.next-steps-section');
  const downloadCta = find(sections, 'contact-page.download-cta-section');

  return (
    <>
      {hero && <ContactHero {...hero} />}

      <div className="container mx-auto px-6 pt-20 pb-0 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            {facilityContacts && <FacilityContacts {...facilityContacts} />}
            {eligibilityReminder && <EligibilityReminder {...eligibilityReminder} />}
            {funStats && <FunStats {...funStats} />}
          </motion.div>

          <div className="lg:col-span-7 space-y-8">
            {enquiryForm && <EnquiryForm {...enquiryForm} success={submissionSuccess ?? {}} />}
          </div>
        </div>
      </div>

      {nextSteps && <ContactNextSteps {...nextSteps} />}
      {downloadCta && <ContactDownloadCta {...downloadCta} />}
    </>
  );
}
