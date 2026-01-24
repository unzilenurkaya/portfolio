'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/types';
import Image from 'next/image';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
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
                {certificate.title}
              </h2>
              <p className="text-sm text-gray-400">
                {certificate.issuer} - {certificate.date}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="relative overflow-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            {isPdf && certificate.image ? (
              <iframe
                src={certificate.image}
                className="w-full h-[70vh]"
                title={certificate.title}
              />
            ) : certificate.image ? (
              <div className="relative w-full flex items-center justify-center p-4 bg-[#050505]">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  width={800}
                  height={600}
                  className="max-w-full h-auto object-contain rounded-lg"
                  priority
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                Sertifika gorseli bulunamadi
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
