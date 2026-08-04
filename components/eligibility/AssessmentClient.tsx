'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type {
  EligibilityAssessmentChromeSection,
  EligibilityAssessmentStepsSection,
  EligibilityAssessmentResultSection,
} from '@/lib/strapi-eligibility-types';

type Props = {
  chrome?: EligibilityAssessmentChromeSection;
  stepsSection?: EligibilityAssessmentStepsSection;
  resultSection?: EligibilityAssessmentResultSection;
};

interface AnswerState {
  nigeriaBase: boolean | null;
  pencomCompliant: boolean | null;
  experienceYears: string;
  techType: string;
  humanRights: boolean | null;
  ifcCompliance: boolean | null;
  capacityCheck: boolean | null;
  activeSites: number;
  payingCustomers: boolean | null;
  scalableModel: boolean | null;
  nairaDenominated: boolean | null;
  fundingStructure: string;
  tenorLimit: boolean | null;
  securityPackage: boolean | null;
}

const initialAnswers: AnswerState = {
  nigeriaBase: null,
  pencomCompliant: null,
  experienceYears: '',
  techType: '',
  humanRights: null,
  ifcCompliance: null,
  capacityCheck: null,
  activeSites: 0,
  payingCustomers: null,
  scalableModel: null,
  nairaDenominated: null,
  fundingStructure: '',
  tenorLimit: null,
  securityPackage: null,
};

// Map question ordinal position to AnswerState field key
// This ensures CMS questions stay in sync with the AnswerState
const FIELD_KEYS = [
  'nigeriaBase',
  'pencomCompliant',
  'experienceYears',
  'techType',
  'humanRights',
  'ifcCompliance',
  'capacityCheck',
  'activeSites',
  'payingCustomers',
  'scalableModel',
  'nairaDenominated',
  'fundingStructure',
  'tenorLimit',
  'securityPackage',
] as const;

export default function AssessmentClient({
  chrome,
  stepsSection,
  resultSection,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AnswerState>(initialAnswers);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto scroll to top of card on step change
  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [step]);

  const handleSelect = (field: keyof AnswerState, value: any) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      setStep(5); // Show results
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.push('/eligibility');
    }
  };

  const restartQuiz = () => {
    setAnswers(initialAnswers);
    setStep(1);
  };

  // Validation checking per step
  const isStepValid = () => {
    if (step === 1) {
      return (
        answers.nigeriaBase !== null &&
        answers.pencomCompliant !== null &&
        answers.experienceYears !== ''
      );
    }
    if (step === 2) {
      return (
        answers.techType !== '' &&
        answers.humanRights !== null &&
        answers.ifcCompliance !== null
      );
    }
    if (step === 3) {
      return (
        answers.capacityCheck !== null &&
        answers.payingCustomers !== null &&
        answers.scalableModel !== null
      );
    }
    if (step === 4) {
      return (
        answers.nairaDenominated !== null &&
        answers.fundingStructure !== '' &&
        answers.tenorLimit !== null &&
        answers.securityPackage !== null
      );
    }
    return true;
  };

  // Readiness Calculations
  const calculateResult = () => {
    // 1. Check fatal exclusions
    const hasFatalFailure =
      answers.nigeriaBase === false ||
      answers.pencomCompliant === false ||
      answers.techType === 'fossil-fuel' ||
      answers.humanRights === false ||
      answers.ifcCompliance === false ||
      answers.capacityCheck === false ||
      answers.activeSites === 0 ||
      answers.nairaDenominated === false ||
      answers.fundingStructure === 'equity-only' ||
      answers.securityPackage === false;

    if (hasFatalFailure) {
      // Excluded
      // Calculate score based on total positive checks passed
      let passedChecks = 0;
      if (answers.nigeriaBase) passedChecks++;
      if (answers.pencomCompliant) passedChecks++;
      if (answers.techType !== 'fossil-fuel' && answers.techType !== '') passedChecks++;
      if (answers.humanRights) passedChecks++;
      if (answers.ifcCompliance) passedChecks++;
      if (answers.capacityCheck) passedChecks++;
      if (answers.activeSites > 0) passedChecks++;
      if (answers.nairaDenominated) passedChecks++;
      if (answers.fundingStructure === 'debt') passedChecks++;
      if (answers.securityPackage) passedChecks++;

      const pct = Math.round((passedChecks / 10) * 40); // Max 40% if fatal failed
      return {
        status: 'excluded' as const,
        score: pct,
      };
    }

    // 2. Check operational/capacity thresholds
    const isEarlyStageOrUnderScale =
      answers.experienceYears === '<2' ||
      answers.payingCustomers === false ||
      answers.scalableModel === false;

    if (isEarlyStageOrUnderScale) {
      // Eligible with Technical Assistance
      // Base score 60%, plus 10% for experience, 10% for active sites
      let bonus = 0;
      if (answers.experienceYears === '2-5') bonus += 5;
      if (answers.experienceYears === '5+') bonus += 10;
      if (answers.activeSites > 1) bonus += 10;

      const pct = 60 + bonus;
      return {
        status: 'technical-assistance' as const,
        score: pct,
      };
    }

    // 3. Fully Qualified
    let scoreBonus = 0;
    if (answers.experienceYears === '5+') scoreBonus += 5;
    if (answers.activeSites > 1) scoreBonus += 5;
    const pct = 90 + scoreBonus;

    return {
      status: 'qualified' as const,
      score: pct,
    };
  };

  const result = step === 5 ? calculateResult() : null;

  // Handle Submit & Route Pre-fill
  const handleResultSubmit = () => {
    if (!result) return;
    const query = new URLSearchParams({
      readiness: result.status,
      score: String(result.score),
      tech: answers.techType,
      capacity: answers.capacityCheck ? 'eligible' : 'under',
      customers: answers.payingCustomers ? 'eligible' : 'under',
    });
    router.push(`/contact?${query.toString()}`);
  };

  // SVG Circumference calculation
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = result
    ? circumference - (result.score / 100) * circumference
    : circumference;

  // Group questions by step
  const questionsByStep = stepsSection?.questions?.reduce(
    (acc, q, idx) => {
      const stepNum = parseInt(q.stepNumber ?? '1', 10);
      if (!acc[stepNum]) acc[stepNum] = [];
      acc[stepNum].push({ question: q, ordinal: idx });
      return acc;
    },
    {} as Record<number, Array<{ question: any; ordinal: number }>>
  ) ?? {};

  // Find outcome and log rows for the result
  const outcome = resultSection?.outcomes?.find((o) => o.status === result?.status);
  const logRows = resultSection?.logRows ?? [];

  // Determine which log rows should pass/fail
  const logRowStatuses = [
    answers.nigeriaBase, // Row 0
    answers.techType !== 'fossil-fuel', // Row 1
    answers.capacityCheck, // Row 2
    answers.payingCustomers, // Row 3
    answers.nairaDenominated, // Row 4
  ];

  return (
    <div className="bg-brand-dark text-white min-h-screen pb-24 font-sans text-left flex flex-col pt-44 px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Form Content Wrapper */}
      <div ref={cardRef} className="w-full container mx-auto max-w-5xl relative z-10">
        {/* Distraction-free wizard header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-5">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors uppercase font-bold tracking-wider focus:outline-none"
          >
            <ArrowLeft size={16} /> {chrome?.backLabel ?? 'Back'}
          </button>

          {step <= 4 ? (
            <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest bg-brand-accent/10 px-2.5 py-1 rounded">
              {chrome?.stepCounterPrefix ?? 'Step'} {step} {chrome?.stepCounterMiddle ?? 'of'}{' '}
              {chrome?.stepCounterTotal ?? '4'}
            </span>
          ) : (
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded">
              {chrome?.summaryBadge ?? 'Assessment Summary'}
            </span>
          )}
        </div>

        {/* Step Progress Line */}
        {step <= 4 && (
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-10 flex">
            <div
              className="h-full bg-brand-accent transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) * 25) % 100}%` }}
            />
          </div>
        )}

        {/* Form Screens Inside AnimatePresence */}
        <AnimatePresence mode="wait">
          {step === 1 && stepsSection?.steps?.[0] && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                {stepsSection.steps[0].title}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                {stepsSection.steps[0].description}
              </p>

              {questionsByStep[1]?.map((item) => {
                const q = item.question;
                const fieldKey = FIELD_KEYS[item.ordinal] as keyof AnswerState;
                const currentValue = answers[fieldKey];

                return (
                  <div key={item.ordinal} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                      {q.label}{' '}
                      {q.requiredMarker && (
                        <span className="text-[#81C34D] font-bold">{q.requiredMarker}</span>
                      )}
                    </label>
                    {q.options && q.options.length > 0 ? (
                      <div
                        className={`grid gap-3 ${
                          q.options.length === 2
                            ? 'grid-cols-2'
                            : q.options.length === 3
                              ? 'grid-cols-3'
                              : 'grid-cols-2'
                        }`}
                      >
                        {q.options.map((opt: any, oi: number) => {
                          // Coerce value based on field type
                          let typedValue: any = opt.value;
                          if (
                            fieldKey === 'nigeriaBase' ||
                            fieldKey === 'pencomCompliant' ||
                            fieldKey === 'humanRights' ||
                            fieldKey === 'ifcCompliance' ||
                            fieldKey === 'capacityCheck' ||
                            fieldKey === 'payingCustomers' ||
                            fieldKey === 'scalableModel' ||
                            fieldKey === 'nairaDenominated' ||
                            fieldKey === 'tenorLimit' ||
                            fieldKey === 'securityPackage'
                          ) {
                            typedValue = opt.value === 'true';
                          } else if (fieldKey === 'activeSites') {
                            typedValue = parseInt(opt.value, 10);
                          }

                          const isSelected =
                            typeof currentValue === 'boolean'
                              ? currentValue === typedValue
                              : String(currentValue) === String(typedValue);

                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(fieldKey, typedValue)}
                              className={`py-3.5 px-2 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                                isSelected
                                  ? fieldKey === 'techType' && typedValue === 'fossil-fuel'
                                    ? 'bg-red-500/20 text-red-400 border-red-500/50'
                                    : 'bg-brand-accent text-brand-dark border-brand-accent'
                                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                    {q.helperText && <p className="text-[10px] text-gray-500 leading-normal">{q.helperText}</p>}
                  </div>
                );
              })}
            </motion.div>
          )}

          {step === 2 && stepsSection?.steps?.[1] && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                {stepsSection.steps[1].title}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                {stepsSection.steps[1].description}
              </p>

              {questionsByStep[2]?.map((item) => {
                const q = item.question;
                const fieldKey = FIELD_KEYS[item.ordinal] as keyof AnswerState;
                const currentValue = answers[fieldKey];

                return (
                  <div key={item.ordinal} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                      {q.label}{' '}
                      {q.requiredMarker && (
                        <span className="text-[#81C34D] font-bold">{q.requiredMarker}</span>
                      )}
                    </label>
                    {q.options && q.options.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {q.options.map((opt: any, oi: number) => {
                          let typedValue: any = opt.value;
                          if (
                            fieldKey === 'nigeriaBase' ||
                            fieldKey === 'pencomCompliant' ||
                            fieldKey === 'humanRights' ||
                            fieldKey === 'ifcCompliance' ||
                            fieldKey === 'capacityCheck' ||
                            fieldKey === 'payingCustomers' ||
                            fieldKey === 'scalableModel' ||
                            fieldKey === 'nairaDenominated' ||
                            fieldKey === 'tenorLimit' ||
                            fieldKey === 'securityPackage'
                          ) {
                            typedValue = opt.value === 'true';
                          }

                          const isSelected =
                            typeof currentValue === 'boolean'
                              ? currentValue === typedValue
                              : String(currentValue) === String(typedValue);

                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(fieldKey, typedValue)}
                              className={`py-3 px-2 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                                isSelected
                                  ? fieldKey === 'techType' && typedValue === 'fossil-fuel'
                                    ? 'bg-red-500/20 text-red-400 border-red-500/50'
                                    : 'bg-brand-accent text-brand-dark border-brand-accent'
                                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                    {q.helperText && <p className="text-[10px] text-gray-500 leading-normal">{q.helperText}</p>}
                  </div>
                );
              })}
            </motion.div>
          )}

          {step === 3 && stepsSection?.steps?.[2] && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                {stepsSection.steps[2].title}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                {stepsSection.steps[2].description}
              </p>

              {questionsByStep[3]?.map((item) => {
                const q = item.question;
                const fieldKey = FIELD_KEYS[item.ordinal] as keyof AnswerState;
                const currentValue = answers[fieldKey];

                return (
                  <div key={item.ordinal} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                      {q.label}{' '}
                      {q.requiredMarker && (
                        <span className="text-[#81C34D] font-bold">{q.requiredMarker}</span>
                      )}
                    </label>
                    {q.options && q.options.length > 0 ? (
                      <div
                        className={`grid gap-3 ${
                          q.options.length === 3
                            ? 'grid-cols-3'
                            : q.options.length === 2
                              ? 'grid-cols-2'
                              : 'grid-cols-2'
                        }`}
                      >
                        {q.options.map((opt: any, oi: number) => {
                          let typedValue: any = opt.value;
                          if (fieldKey === 'activeSites') {
                            typedValue = parseInt(opt.value, 10);
                          } else if (
                            fieldKey === 'nigeriaBase' ||
                            fieldKey === 'pencomCompliant' ||
                            fieldKey === 'humanRights' ||
                            fieldKey === 'ifcCompliance' ||
                            fieldKey === 'capacityCheck' ||
                            fieldKey === 'payingCustomers' ||
                            fieldKey === 'scalableModel' ||
                            fieldKey === 'nairaDenominated' ||
                            fieldKey === 'tenorLimit' ||
                            fieldKey === 'securityPackage'
                          ) {
                            typedValue = opt.value === 'true';
                          }

                          const isSelected =
                            typeof currentValue === 'number'
                              ? currentValue === typedValue
                              : typeof currentValue === 'boolean'
                                ? currentValue === typedValue
                                : String(currentValue) === String(typedValue);

                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(fieldKey, typedValue)}
                              className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                                isSelected
                                  ? 'bg-brand-accent text-brand-dark border-brand-accent'
                                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                    {q.helperText && <p className="text-[10px] text-gray-500 leading-normal">{q.helperText}</p>}
                  </div>
                );
              })}
            </motion.div>
          )}

          {step === 4 && stepsSection?.steps?.[3] && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                {stepsSection.steps[3].title}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                {stepsSection.steps[3].description}
              </p>

              {questionsByStep[4]?.map((item) => {
                const q = item.question;
                const fieldKey = FIELD_KEYS[item.ordinal] as keyof AnswerState;
                const currentValue = answers[fieldKey];

                return (
                  <div key={item.ordinal} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                      {q.label}{' '}
                      {q.requiredMarker && (
                        <span className="text-[#81C34D] font-bold">{q.requiredMarker}</span>
                      )}
                    </label>
                    {q.options && q.options.length > 0 ? (
                      <div
                        className={`grid gap-3 ${
                          q.options.length === 2
                            ? 'grid-cols-2'
                            : q.options.length === 3
                              ? 'grid-cols-3'
                              : 'grid-cols-2'
                        }`}
                      >
                        {q.options.map((opt: any, oi: number) => {
                          let typedValue: any = opt.value;
                          if (
                            fieldKey === 'nigeriaBase' ||
                            fieldKey === 'pencomCompliant' ||
                            fieldKey === 'humanRights' ||
                            fieldKey === 'ifcCompliance' ||
                            fieldKey === 'capacityCheck' ||
                            fieldKey === 'payingCustomers' ||
                            fieldKey === 'scalableModel' ||
                            fieldKey === 'nairaDenominated' ||
                            fieldKey === 'tenorLimit' ||
                            fieldKey === 'securityPackage'
                          ) {
                            typedValue = opt.value === 'true';
                          }

                          const isSelected =
                            typeof currentValue === 'boolean'
                              ? currentValue === typedValue
                              : String(currentValue) === String(typedValue);

                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(fieldKey, typedValue)}
                              className={`py-3.5 px-2 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                                isSelected
                                  ? fieldKey === 'fundingStructure' && typedValue === 'equity-only'
                                    ? 'bg-red-500/20 text-red-400 border-red-500/50'
                                    : 'bg-brand-accent text-brand-dark border-brand-accent'
                                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                    {q.helperText && <p className="text-[10px] text-gray-500 leading-normal">{q.helperText}</p>}
                  </div>
                );
              })}
            </motion.div>
          )}

          {step === 5 && result && outcome && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Score Circle SVG */}
              <div className="flex justify-center mb-8">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke={
                        result.status === 'qualified'
                          ? '#81C34D'
                          : result.status === 'technical-assistance'
                            ? '#FFA500'
                            : '#EF4444'
                      }
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                  </svg>
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{result.score}%</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                      {resultSection?.readinessLabel ?? 'Readiness'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Outcome */}
              <div className="text-center">
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    result.status === 'qualified'
                      ? 'text-[#81C34D]'
                      : result.status === 'technical-assistance'
                        ? 'text-[#FFA500]'
                        : 'text-red-400'
                  }`}
                >
                  {outcome.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  {outcome.description}
                </p>
              </div>

              {/* Framework Alignment Log */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-6">
                  {resultSection?.logHeading ?? 'Framework Alignment Log'}
                </h4>
                <div className="space-y-3">
                  {logRows.map((row, idx) => {
                    const passed = logRowStatuses[idx];
                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-4 bg-white/5 rounded-[6px] border border-white/10"
                      >
                        <span className="text-xs text-gray-300">{row.label}</span>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            passed
                              ? 'text-[#81C34D]'
                              : 'text-red-400'
                          }`}
                        >
                          {passed ? row.passLabel : row.failLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                {result.status !== 'excluded' ? (
                  <button
                    onClick={handleResultSubmit}
                    className="px-8 py-3.5 bg-[#81C34D] text-brand-dark hover:bg-white font-bold uppercase tracking-wider rounded-[6px] transition-all duration-300 text-sm focus:outline-none"
                  >
                    {result.status === 'qualified'
                      ? outcome.ctaLabel ?? 'Priority Guarantee Request'
                      : outcome.ctaLabel ?? 'Apply for Technical Assistance'}
                  </button>
                ) : (
                  <button
                    onClick={handleResultSubmit}
                    className="px-8 py-3.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 font-bold uppercase tracking-wider rounded-[6px] transition-all duration-300 text-sm border border-red-500/50 focus:outline-none"
                  >
                    {outcome.ctaLabel ?? resultSection?.excludedCtaLabel ?? 'View Framework Guidelines'}
                  </button>
                )}
                <button
                  onClick={restartQuiz}
                  className="px-8 py-3.5 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-wider rounded-[6px] transition-all duration-300 text-sm border border-white/10 focus:outline-none"
                >
                  {chrome?.cancelLabel ?? resultSection?.restartLabel ?? 'Restart'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="mt-12 flex justify-between items-center gap-4">
            <div />
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="px-8 py-3.5 bg-[#81C34D] text-brand-dark hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-wider rounded-[6px] transition-all duration-300 text-sm focus:outline-none"
            >
              {chrome?.nextLabel ?? 'Next Step'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
