"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cfbf_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
    setConsent(stored);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  }

  if (consent !== null || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0 16px 20px",
        animation: "cfbf-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <style>{`
        @keyframes cfbf-slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="
          w-full max-w-4xl
          bg-brand-dark border border-white/10
          rounded-xl shadow-2xl
          px-6 py-5
          flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6
        "
        style={{ backdropFilter: "blur(12px)" }}
      >
        {/* Icon + text */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">🍪</span>
          <div className="min-w-0">
            <p className="text-white font-medium text-sm mb-1 leading-snug">
              We use cookies to improve your experience
            </p>
            <p className="text-white/50 text-xs leading-relaxed font-light">
              We use essential cookies to make this site work, and optional analytics
              cookies to understand how visitors use the platform. No personal data is
              sold to third parties.{" "}
              <a
                href="/privacy"
                className="text-brand-accent underline underline-offset-2 hover:text-brand-primary transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-xs font-medium text-white/50 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs font-medium bg-brand-accent hover:bg-brand-primary text-brand-dark px-5 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  );
}
