'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie-consent';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

export default function CookieBanner() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      setConsentStatus(savedConsent as ConsentStatus);
    } else {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setConsentStatus('accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setConsentStatus('rejected');
    setIsVisible(false);
  };

  // Don't render if consent was already given
  if (consentStatus !== 'pending') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">
                    Cerez Kullanimi
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Deneyiminizi iyilestirmek icin cerezler kullaniyoruz. 
                    Devam ederek{' '}
                    <Link 
                      href="/privacy" 
                      className="text-primary hover:underline"
                    >
                      gizlilik politikamizi
                    </Link>
                    {' '}kabul etmis olursunuz.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={handleReject}
                    className="flex-1 md:flex-none px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors border border-white/10 rounded-lg hover:border-white/20"
                  >
                    Reddet
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 md:flex-none px-6 py-2 text-sm bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Kabul Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
