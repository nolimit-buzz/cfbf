"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  FileCheck
} from 'lucide-react';

interface AnswerState {
  // Step 1: Corporate
  nigeriaBase: boolean | null;
  pencomCompliant: boolean | null;
  experienceYears: string; // '<2', '2-5', '5+'
  
  // Step 2: Tech & ESG
  techType: string; // 'solar-grid', 'cold-storage', 'clean-cooking', 'low-carbon-transport', 'fossil-fuel', 'other-green'
  humanRights: boolean | null;
  ifcCompliance: boolean | null;
  
  // Step 3: Scale
  capacityCheck: boolean | null; // '>=150kW', '<150kW'
  activeSites: number; // 0, 1, 2+
  payingCustomers: boolean | null; // '>=200', '<200'
  scalableModel: boolean | null;
  
  // Step 4: Finance
  nairaDenominated: boolean | null;
  fundingStructure: string; // 'debt', 'equity-only'
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
  securityPackage: null
};

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AnswerState>(initialAnswers);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto scroll to top of card on step change
  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [step]);

  const handleSelect = (field: keyof AnswerState, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      setStep(5); // Show results
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
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
      return answers.nigeriaBase !== null && answers.pencomCompliant !== null && answers.experienceYears !== '';
    }
    if (step === 2) {
      return answers.techType !== '' && answers.humanRights !== null && answers.ifcCompliance !== null;
    }
    if (step === 3) {
      return answers.capacityCheck !== null && answers.payingCustomers !== null && answers.scalableModel !== null;
    }
    if (step === 4) {
      return answers.nairaDenominated !== null && answers.fundingStructure !== '' && answers.tenorLimit !== null && answers.securityPackage !== null;
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
        title: "Criteria Conflict Detected",
        desc: "Your project parameters do not align with the core regulatory/exclusion list filters. InfraCredit guarantees require Naira-denominated debt instruments, PENCOM compliance, and zero coal/heavy fossil technology components."
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
        title: "Eligible for Technical Assistance",
        desc: "Your clean energy project meets core parameters but lacks full operational scale (e.g., operational history or target customer base). You qualify for CFBF Project Preparation & Technical Assistance support to achieve guarantee-readiness."
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
      title: "Highly Qualified for Guarantees",
      desc: "Outstanding project parameters. Your mini-grid initiative satisfies all core operational, financial, ESG, and regulatory thresholds. You are fully qualified to fast-track your Guarantee Request with the Climate Finance Blending Facility."
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
      customers: answers.payingCustomers ? 'eligible' : 'under'
    });
    router.push(`/contact?${query.toString()}`);
  };

  // SVG Circumference calculation
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = result ? circumference - (result.score / 100) * circumference : circumference;

  return (
    <div className="bg-[#051F1A] text-white min-h-screen pb-24 font-sans text-left flex flex-col pt-44 px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Form Content Wrapper */}
      <div 
        ref={cardRef}
        className="w-full container mx-auto max-w-5xl relative z-10"
      >
        {/* Distraction-free wizard header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-5">
          <button 
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors uppercase font-bold tracking-wider focus:outline-none"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          {step <= 4 ? (
            <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest bg-brand-accent/10 px-2.5 py-1 rounded">
              Step {step} of 4
            </span>
          ) : (
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded">
              Assessment Summary
            </span>
          )}
        </div>

        {/* Step Progress Line */}
        {step <= 4 && (
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-10 flex">
            <div 
              className="h-full bg-brand-accent transition-all duration-500 ease-out" 
              style={{ width: `${(step - 1) * 25}%` }} 
            />
          </div>
        )}

        {/* Form Screens Inside AnimatePresence */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                Corporate Compliance Profile
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                Confirm your developer legal status, registration region, and historical active track record.
              </p>

              {/* Q1: Nigeria Base */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Is your business entity incorporated and active in Nigeria? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('nigeriaBase', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.nigeriaBase === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, Registered in Nigeria
                  </button>
                  <button
                    onClick={() => handleSelect('nigeriaBase', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.nigeriaBase === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No, International Entity
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Guarantees and blenders are legally structured in NGN and are exclusively deployable for local assets.
                </p>
              </div>

              {/* Q2: PENCOM Compliance */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Is the issuer compliant with National Pension Commission (PENCOM) regulations? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('pencomCompliant', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.pencomCompliant === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, PENCOM Compliant
                  </button>
                  <button
                    onClick={() => handleSelect('pencomCompliant', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.pencomCompliant === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No / Not Applicable
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  All target bond issuers under the blend structure must satisfy institutional pension framework parameters in Nigeria.
                </p>
              </div>

              {/* Q3: Experience Years */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Years of active experience in clean energy infrastructure? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['<2', '2-5', '5+'].map(val => (
                    <button
                      key={val}
                      onClick={() => handleSelect('experienceYears', val)}
                      className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                        answers.experienceYears === val 
                          ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                          : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                      }`}
                    >
                      {val === '<2' ? 'Less than 2' : val === '2-5' ? '2 to 5' : '5+ Years'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                Technology Cleanliness & Safeguards
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                Projects must fall under renewable technology categories and comply with human rights frameworks.
              </p>

              {/* Q4: Tech Sector */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Clean Tech Deployment Category <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'solar-grid', label: 'Solar Hybrid Grids / SHS' },
                    { id: 'cold-storage', label: 'Cold Storage / Agro-Use' },
                    { id: 'clean-cooking', label: 'Clean Cooking Products' },
                    { id: 'low-carbon-transport', label: 'Low-Carbon Public Transport' },
                    { id: 'other-green', label: 'Other Approved Clean Tech' },
                    { id: 'fossil-fuel', label: 'Heavy Fossil Hybrid (Excl.)' }
                  ].map(tech => (
                    <button
                      key={tech.id}
                      onClick={() => handleSelect('techType', tech.id)}
                      className={`py-3 px-2 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                        answers.techType === tech.id 
                          ? tech.id === 'fossil-fuel'
                            ? 'bg-red-500/20 text-red-400 border-red-500/50'
                            : 'bg-brand-accent text-brand-dark border-brand-accent'
                          : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                      }`}
                    >
                      {tech.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q5: Human Rights */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Component sourcing complies with non-forced labor & human rights? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('humanRights', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.humanRights === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, Sourcing Complies
                  </button>
                  <button
                    onClick={() => handleSelect('humanRights', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.humanRights === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No / Non-Compliant
                  </button>
                </div>
              </div>

              {/* Q6: IFC ESG Compliance */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Does the project align with IFC Environmental & Social Safeguard Standards? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('ifcCompliance', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.ifcCompliance === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, Aligned with IFC ESG
                  </button>
                  <button
                    onClick={() => handleSelect('ifcCompliance', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.ifcCompliance === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No, Out of Alignment
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                Project Operational Capacity Thresholds
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                Confirm your capacity thresholds, site footprint, and paying customer scale.
              </p>

              {/* Q7: Capacity check */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Total project designed capacity (kWp) <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('capacityCheck', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.capacityCheck === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    150 kWp or Higher (Combined)
                  </button>
                  <button
                    onClick={() => handleSelect('capacityCheck', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.capacityCheck === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Less than 150 kWp
                  </button>
                </div>
              </div>

              {/* Q8: Active Sites */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Number of active operational mini-grid sites? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map(val => (
                    <button
                      key={val}
                      onClick={() => handleSelect('activeSites', val)}
                      className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                        answers.activeSites === val 
                          ? val === 0
                            ? 'bg-red-500/20 text-red-400 border-red-500/50'
                            : 'bg-brand-accent text-brand-dark border-brand-accent' 
                          : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                      }`}
                    >
                      {val === 0 ? '0 Sites' : val === 1 ? '1 Site' : '2 or More'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q9: Paying Customers */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Do you currently serve 200 or more paying customers? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('payingCustomers', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.payingCustomers === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, 200+ Paying Customers
                  </button>
                  <button
                    onClick={() => handleSelect('payingCustomers', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.payingCustomers === false 
                        ? 'bg-white/10 text-white border-white/10 hover:border-white/30' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No, Less than 200
                  </button>
                </div>
              </div>

              {/* Q10: Scalable model */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Is the operational business model scalable across regions? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('scalableModel', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.scalableModel === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, Scalable Model
                  </button>
                  <button
                    onClick={() => handleSelect('scalableModel', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.scalableModel === false 
                        ? 'bg-white/10 text-white border-white/10 hover:border-white/30' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No / Hard to Scale
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-tight font-sans text-white">
                Financing & Capital Structure
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light mb-8">
                Confirm your transaction parameters, currency alignment, and security reserves.
              </p>

              {/* Q11: Naira Denominated */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Is your proposed debt transaction denominated in Nigerian Naira (NGN)? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('nairaDenominated', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.nairaDenominated === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, Denominated in NGN
                  </button>
                  <button
                    onClick={() => handleSelect('nairaDenominated', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.nairaDenominated === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No, Hard Currency (USD/EUR)
                  </button>
                </div>
              </div>

              {/* Q12: Funding type */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Funding Structure Instrument <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('fundingStructure', 'debt')}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.fundingStructure === 'debt' 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Debt Instrument / Guaranteed Loan
                  </button>
                  <button
                    onClick={() => handleSelect('fundingStructure', 'equity-only')}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.fundingStructure === 'equity-only' 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Equity Funding Only (Excl.)
                  </button>
                </div>
              </div>

              {/* Q13: Tenor limit */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Requested debt maturity/tenor is up to 10 years? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('tenorLimit', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.tenorLimit === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, Tenor Up to 10 Years
                  </button>
                  <button
                    onClick={() => handleSelect('tenorLimit', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.tenorLimit === false 
                        ? 'bg-white/10 text-white border-white/10 hover:border-white/30' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No, Tenor Over 10 Years
                  </button>
                </div>
              </div>

              {/* Q14: Security Package */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wider">
                  Are adequate security assets / collateral package available? <span className="text-[#81C34D] font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('securityPackage', true)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.securityPackage === true 
                        ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    Yes, Security Package Available
                  </button>
                  <button
                    onClick={() => handleSelect('securityPackage', false)}
                    className={`py-3.5 rounded-[6px] border text-xs font-bold transition-all focus:outline-none ${
                      answers.securityPackage === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                    }`}
                  >
                    No Security Package Available
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && result && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 text-center flex flex-col items-center"
            >
              {/* Dynamic Readiness Chart Dial */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    className="stroke-white/5 fill-none"
                    strokeWidth={strokeWidth}
                  />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r={radius}
                    className={`fill-none ${
                      result.status === 'qualified' 
                        ? 'stroke-brand-accent' 
                        : result.status === 'technical-assistance'
                          ? 'stroke-[#009FD4]'
                          : 'stroke-red-500'
                    }`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tighter">
                    {result.score}%
                  </span>
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold font-mono">
                    Readiness
                  </span>
                </div>
              </div>

              {/* Status Header & Icon */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  {result.status === 'qualified' && (
                    <div className="p-1 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent">
                      <Award size={20} />
                    </div>
                  )}
                  {result.status === 'technical-assistance' && (
                    <div className="p-1 rounded-full bg-[#009FD4]/10 border border-[#009FD4]/25 text-[#009FD4]">
                      <Sparkles size={20} />
                    </div>
                  )}
                  {result.status === 'excluded' && (
                    <div className="p-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400">
                      <XCircle size={20} />
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-extrabold text-white font-sans tracking-tight">
                    {result.title}
                  </h3>
                </div>
                
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light max-w-lg mx-auto">
                  {result.desc}
                </p>
              </div>

              {/* Summary parameters checklist preview */}
              <div className="w-full bg-[#02100d] border border-white/5 rounded-[6px] p-5 text-left text-xs font-sans space-y-2.5">
                <h5 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] border-b border-white/5 pb-2 mb-2 font-mono">
                  Framework Alignment Log
                </h5>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Nigeria Incorporation Base:</span>
                  <span className={answers.nigeriaBase ? 'text-[#81C34D] font-bold' : 'text-red-400 font-bold'}>
                    {answers.nigeriaBase ? 'Valid Base' : 'Non-Compliant'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Legal Sourcing Compliance:</span>
                  <span className={answers.humanRights && answers.ifcCompliance ? 'text-[#81C34D] font-bold' : 'text-red-400 font-bold'}>
                    {answers.humanRights && answers.ifcCompliance ? 'ESG Aligned' : 'Non-Compliant'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Scale Threshold (&gt;=150kW):</span>
                  <span className={answers.capacityCheck ? 'text-[#81C34D] font-bold' : 'text-red-400 font-bold'}>
                    {answers.capacityCheck ? 'Passed' : 'Under Capacity'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Paying Customer Threshold (&gt;=200):</span>
                  <span className={answers.payingCustomers ? 'text-[#81C34D] font-bold' : 'text-yellow-400 font-bold'}>
                    {answers.payingCustomers ? 'Passed' : 'Under Minimum Scale (TA Focus)'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Transaction Currency (Naira):</span>
                  <span className={answers.nairaDenominated ? 'text-[#81C34D] font-bold' : 'text-red-400 font-bold'}>
                    {answers.nairaDenominated ? 'NGN Aligned' : 'Hard Currency Excl.'}
                  </span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col md:flex-row gap-4 w-full pt-4">
                {result.status !== 'excluded' ? (
                  <button
                    onClick={handleResultSubmit}
                    className="flex-1 py-3.5 rounded-full bg-[#81C34D] hover:bg-white text-brand-dark hover:text-[#051F1A] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 focus:outline-none interactive"
                  >
                    <FileCheck size={16} /> 
                    {result.status === 'qualified' ? 'Priority Guarantee Request' : 'Apply for Technical Assistance'}
                  </button>
                ) : (
                  <button
                    onClick={() => router.push('/eligibility')}
                    className="flex-1 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 focus:outline-none interactive"
                  >
                    <BookOpen size={16} /> View Framework Guidelines
                  </button>
                )}
                
                <button
                  onClick={restartQuiz}
                  className="py-3.5 px-6 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 focus:outline-none interactive"
                >
                  <RotateCcw size={14} /> Restart
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next / Back navigation buttons (Footer of card) */}
        {step <= 4 && (
          <div className="flex justify-between items-center mt-10 pt-5 border-t border-white/5">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 rounded text-xs text-gray-400 hover:text-white transition-colors uppercase font-bold tracking-wider focus:outline-none"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 focus:outline-none interactive ${
                isStepValid()
                  ? 'bg-brand-accent text-brand-dark hover:bg-white'
                  : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
              }`}
            >
              Next Step <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
