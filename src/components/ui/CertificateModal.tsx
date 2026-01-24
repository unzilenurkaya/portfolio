'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const { t, language } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Focus trap and ESC handling
  useEffect(() => {
    if (certificate) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousFocusRef.current?.focus();
      };
    }
  }, [certificate, handleKeyDown]);

  if (!certificate) return null;

  const isPdf = certificate.fileType === 'pdf';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
      >
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]">
            <div>
              <h2 id="certificate-modal-title" className="text-lg font-semibold text-white">
                {certificate.title[language]}
              </h2>
              <p className="text-sm text-gray-400">
                {certificate.issuer[language]} - {certificate.date}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
              aria-label={t('common.close')}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="relative overflow-auto bg-[#050505]" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            {isPdf && certificate.image ? (
              <div className="flex flex-col w-full">
                <iframe
                  src={`${certificate.image}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-[70vh] border-none"
                  title={certificate.title[language]}
                />
                <div className="p-4 bg-[#0a0a0a] border-t border-white/10 flex justify-center">
                  <a
                    href={certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all text-sm"
                  >
                    <span>📄</span>
                    {t('certificates.viewFullPage')}
                  </a>
                </div>
              </div>
            ) : certificate.image ? (
              <div className="relative w-full flex items-center justify-center p-4">
                <Image
                  src={certificate.image}
                  alt={certificate.title[language]}
                  width={1200}
                  height={900}
                  className="max-w-full h-auto object-contain rounded-lg shadow-2xl"
                  priority
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
                <span className="text-4xl">🔍</span>
                {t('certificates.notFound')}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
