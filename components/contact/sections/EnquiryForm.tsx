"use client";

import { useEffect, useState } from 'react';
import type React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import type { ContactEnquiryFormSection, ContactSubmissionSuccessSection } from '@/lib/strapi-contact-types';

type EnquiryFormProps = Omit<ContactEnquiryFormSection, '__component' | 'id'> & {
  success: Omit<ContactSubmissionSuccessSection, '__component' | 'id'>;
};

const techTypeByParam: Record<string, string> = {
  'solar-grid': 'Solar Mini-Grid',
  'cold-storage': 'Agro-Processing Solar',
  'clean-cooking': 'Clean Cooking',
  'low-carbon-transport': 'Low-Carbon Public Transport',
};

export default function EnquiryForm({
  heading,
  readinessAlertLabelPrefix,
  readinessAlertLabelSuffix,
  qualifiedAlertBody,
  technicalAssistanceAlertBody,
  fullNameLabel,
  organizationLabel,
  emailAddressLabel,
  technologyTypeLabel,
  capacityLabel,
  institutionTypeLabel,
  investmentTrancheLabel,
  messageLabel,
  prefillIntroTemplate,
  prefillQualifiedBody,
  prefillTechnicalAssistanceBody,
  defaultTechnologyLabel,
  submitLabel,
  success,
}: EnquiryFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const readiness = searchParams.get('readiness');
  const score = searchParams.get('score');
  const tech = searchParams.get('tech');

  const [role, setRole] = useState<'developer' | 'investor' | 'donor'>('developer');
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [techType, setTechType] = useState('Solar Mini-Grid');
  const [capacity, setCapacity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (readiness) {
      setRole('developer');

      let msg = (prefillIntroTemplate ?? '').replace('${score}', score ?? '');
      if (readiness === 'qualified') {
        msg += prefillQualifiedBody ?? '';
      } else if (readiness === 'technical-assistance') {
        msg += prefillTechnicalAssistanceBody ?? '';
      }
      setMessage(msg);

      if (tech) {
        setTechType(techTypeByParam[tech] ?? defaultTechnologyLabel ?? 'Other Green Tech');
      }
    }
  }, [readiness, score, tech, prefillIntroTemplate, prefillQualifiedBody, prefillTechnicalAssistanceBody, defaultTechnologyLabel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="bg-white p-8 md:p-10 rounded-[6px] border border-gray-200/35 text-left"
    >
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form key="contact-form" onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold font-sans mb-4 text-[#051F1A]">{heading}</h3>

            {readiness && (
              <div
                className={`p-4 rounded-[6px] border mb-6 text-xs flex items-start gap-2.5 font-sans ${
                  readiness === 'qualified'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}
              >
                {readiness === 'qualified' ? (
                  <CheckCircle className="shrink-0 mt-0.5 text-green-600" size={16} />
                ) : (
                  <AlertCircle className="shrink-0 mt-0.5 text-blue-600" size={16} />
                )}
                <div>
                  <span className="font-bold uppercase tracking-wider block mb-0.5 font-mono">
                    {readinessAlertLabelPrefix} {score}{readinessAlertLabelSuffix}
                  </span>
                  <p className="font-light leading-relaxed">
                    {readiness === 'qualified' ? qualifiedAlertBody : technicalAssistanceAlertBody}
                  </p>
                </div>
              </div>
            )}

            <div className="flex border-b border-gray-100 pb-2">
              <button
                type="button"
                onClick={() => setRole('developer')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 font-sans transition-colors interactive focus:outline-none ${
                  role === 'developer' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-[#051F1A]'
                }`}
              >
                Developer
              </button>
              <button
                type="button"
                onClick={() => setRole('investor')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 font-sans transition-colors interactive focus:outline-none ${
                  role === 'investor' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-[#051F1A]'
                }`}
              >
                Investor
              </button>
              <button
                type="button"
                onClick={() => setRole('donor')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 font-sans transition-colors interactive focus:outline-none ${
                  role === 'donor' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-[#051F1A]'
                }`}
              >
                Donor / Partner
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative mt-2">
                <input
                  required
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder=" "
                  className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent"
                />
                <label
                  htmlFor="fullName"
                  className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                >
                  {fullNameLabel}
                </label>
              </div>

              <div className="relative mt-2">
                <input
                  required
                  type="text"
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder=" "
                  className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent"
                />
                <label
                  htmlFor="organization"
                  className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                >
                  {organizationLabel}
                </label>
              </div>
            </div>

            <div className="relative mt-2">
              <input
                required
                type="email"
                id="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder=" "
                className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent"
              />
              <label
                htmlFor="emailAddress"
                className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
              >
                {emailAddressLabel}
              </label>
            </div>

            {role === 'developer' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid md:grid-cols-2 gap-6">
                <div className="relative mt-2">
                  <select
                    id="techType"
                    value={techType}
                    onChange={(e) => setTechType(e.target.value)}
                    className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans bg-white"
                  >
                    <option>Solar Mini-Grid</option>
                    <option>Telecom Solar Hubs</option>
                    <option>Agro-Processing Solar</option>
                    <option>Clean Cooking</option>
                    <option>Low-Carbon Public Transport</option>
                    <option>Other Green Tech</option>
                  </select>
                  <label htmlFor="techType" className="absolute text-xs text-brand-primary font-bold uppercase tracking-wider top-1.5 left-4 pointer-events-none">
                    {technologyTypeLabel}
                  </label>
                </div>

                <div className="relative mt-2">
                  <input
                    required
                    type="text"
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder=" "
                    className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent"
                  />
                  <label
                    htmlFor="capacity"
                    className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                  >
                    {capacityLabel}
                  </label>
                </div>
              </motion.div>
            )}

            {role === 'investor' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid md:grid-cols-2 gap-6">
                <div className="relative mt-2">
                  <select
                    id="institutionType"
                    className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans bg-white"
                  >
                    <option>Pension Fund Administrator (PFA)</option>
                    <option>Insurance Company</option>
                    <option>Asset Management Fund</option>
                    <option>Development Partner / DFI</option>
                    <option>Other Corporate Investor</option>
                  </select>
                  <label htmlFor="institutionType" className="absolute text-xs text-brand-primary font-bold uppercase tracking-wider top-1.5 left-4 pointer-events-none">
                    {institutionTypeLabel}
                  </label>
                </div>

                <div className="relative mt-2">
                  <input
                    required
                    type="text"
                    id="investmentTranche"
                    placeholder=" "
                    className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent"
                  />
                  <label
                    htmlFor="investmentTranche"
                    className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                  >
                    {investmentTrancheLabel}
                  </label>
                </div>
              </motion.div>
            )}

            <div className="relative mt-2">
              <textarea
                required
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=" "
                className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent"
              />
              <label
                htmlFor="message"
                className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
              >
                {messageLabel}
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-[#051F1A] text-white py-4 rounded-full flex items-center justify-center gap-3 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-primary/20 transition-all interactive font-sans focus:outline-none"
            >
              <Send size={14} />
              {submitLabel}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="submission-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold font-sans text-brand-primary">{success.heading}</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto font-sans leading-relaxed font-light">
              {success.description}
            </p>
            <div className="pt-6 flex justify-center gap-4">
              <button
                onClick={() => router.push(success.primaryCtaHref ?? '/')}
                className="px-8 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-all interactive font-sans focus:outline-none"
              >
                {success.primaryCtaLabel}
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-gray-50 text-gray-500 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-all interactive font-sans focus:outline-none"
              >
                {success.secondaryCtaLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
