import { Suspense } from 'react';
import AssessmentClient from '@/components/eligibility/AssessmentClient';
import { findSection, getEligibilitySections } from '@/lib/strapi';
import type {
  EligibilityAssessmentChromeSection,
  EligibilityAssessmentStepsSection,
  EligibilityAssessmentResultSection,
} from '@/lib/strapi-eligibility-types';

async function AssessmentContent() {
  const sections = await getEligibilitySections();
  const chrome = findSection(sections, 'eligibility-page.assessment-chrome-section');
  const stepsSection = findSection(sections, 'eligibility-page.assessment-steps-section');
  const resultSection = findSection(sections, 'eligibility-page.assessment-result-section');

  return (
    <AssessmentClient
      chrome={chrome}
      stepsSection={stepsSection}
      resultSection={resultSection}
    />
  );
}

export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          Loading assessment...
        </div>
      }
    >
      <AssessmentContent />
    </Suspense>
  );
}
