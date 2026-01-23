'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function About() {
  const { t } = useLanguage();

  const highlights = [
    { icon: '🎓', labelKey: 'about.highlights.student', valueKey: 'about.highlights.studentValue' },
    { icon: '💼', labelKey: 'about.highlights.internship', valueKey: 'about.highlights.internshipValue' },
    { icon: '🐍', labelKey: 'about.highlights.python', valueKey: 'about.highlights.pythonValue' },
    { icon: '📊', labelKey: 'about.highlights.dataAnalysis', valueKey: 'about.highlights.dataAnalysisValue' },
  ];

  const interests = [
    { icon: '🤖', name: 'Yapay Zekâ & Veri Bilimi' },
    { icon: '💬', name: 'Büyük Dil Modelleri (LLM) & Prompt Mühendisliği' },
    { icon: '📊', name: 'İş Analitiği & Veri Görselleştirme' },
    { icon: '⚙️', name: 'Süreç Otomasyonu' },
    { icon: '🚀', name: 'Dijital Dönüşüm' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent-cyan/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md aspect-square">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-accent-lime/20 rounded-3xl transform -rotate-3" />

              {/* Main Card */}
              <div className="relative glass-card rounded-3xl p-8 border border-white/10 h-full flex flex-col justify-center">
                {/* Profile Image */}
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary p-1 mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src="/images/profile-pic.png"
                      alt="Ünzile Nur KAYA"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-2xl font-serif text-white text-center mb-2">
                  {t('hero.name')}
                </h3>
                <p className="text-primary text-center text-sm mb-6">
                  {t('hero.title')}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 rounded-xl p-3 text-center"
                    >
                      <span className="text-xl mb-1 block">{item.icon}</span>
                      <span className="text-white font-medium text-sm block">
                        {t(item.valueKey)}
                      </span>
                      <span className="text-gray-500 text-xs">{t(item.labelKey)}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-6">
                  {[
                    { label: 'LinkedIn', href: 'https://linkedin.com/in/unzilenurkaya' },
                    { label: 'GitHub', href: 'https://github.com/unzilenurkaya' },
                    { label: 'Email', href: 'mailto:unzileenurkaya@gmail.com' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors"
                      aria-label={social.label}
                    >
                      {social.label === 'LinkedIn' && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )}
                      {social.label === 'GitHub' && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {social.label === 'Email' && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Title */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider uppercase mb-4"
              >
                {t('about.title')}
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                {t('about.headline')} <br />
                <span className="text-gradient">{t('about.headlineHighlight')}</span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('about.description')}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {t('about.description2')}
              </p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-white font-medium mb-4">{t('about.interests')}</h4>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
                  >
                    <span>{interest.icon}</span>
                    <span className="text-sm text-white/80">{interest.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education Quick Info */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                {t('about.education')}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-white text-sm">{t('about.universities.bandirma')}</p>
                    <p className="text-gray-500 text-xs">{t('about.universities.bandirmaProgram')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2" />
                  <div>
                    <p className="text-white text-sm">{t('about.universities.anadolu')}</p>
                    <p className="text-gray-500 text-xs">{t('about.universities.anadoluProgram')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
