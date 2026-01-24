'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { certificates } from '@/data/certificates';
import { Certificate } from '@/types';
import Card from '@/components/ui/Card';
import CertificateModal from '@/components/ui/CertificateModal';

export default function Certificates() {
  const { t } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const handleCertificateClick = (cert: Certificate) => {
    if (cert.hasViewButton !== false) {
      setSelectedCertificate(cert);
    }
  };

  return (
    <section id="certificates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {t('certificates.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('certificates.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`h-full group ${cert.hasViewButton !== false ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => handleCertificateClick(cert)}
                hover={cert.hasViewButton !== false}
              >
                {/* Certificate Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 rounded-t-2xl relative overflow-hidden p-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
                  <div className="text-4xl">{cert.featured ? '🏆' : '📜'}</div>
                  
                  {/* Overlay - only show if hasViewButton is not false */}
                  {cert.hasViewButton !== false && (
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-medium px-4 py-2 border border-white rounded-full">
                        {t('certificates.viewCertificate')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">
                    {cert.issuer}
                  </div>
                  <h3 className={`text-lg font-semibold text-white mb-2 leading-tight ${cert.hasViewButton !== false ? 'group-hover:text-primary' : ''} transition-colors`}>
                    {cert.title}
                  </h3>
                  <div className="text-sm text-gray-500">{cert.date}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
