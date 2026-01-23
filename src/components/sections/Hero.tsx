'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function Hero() {
  const { t } = useLanguage();

  const stats = [
    { labelKey: 'hero.stats.internship', value: '3' },
    { labelKey: 'hero.stats.projects', value: '3' },
    { labelKey: 'hero.stats.university', value: '2' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-medium tracking-widest uppercase"
            >
              {t('hero.badge')}
            </motion.span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
              <span className="text-gray-400">{t('hero.greeting')}</span> <br />
              <span className="text-white">Ünzile Nur</span> <br />
              <span className="text-gradient font-sans font-bold italic">
                KAYA
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('/cv.pdf', '_blank')}
            >
              {t('hero.downloadCV')}
            </Button>
          </div>

          {/* Quick Stats Area */}
          <div className="pt-12 flex gap-12 border-t border-white/5">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="text-3xl font-serif text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Visual with Neon Rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            {/* Neon Ring 1 - Outer */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-accent-cyan/40"
              style={{
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.3), inset 0 0 20px rgba(0, 245, 255, 0.1)',
              }}
            >
              {/* Orbiting dot */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50" />
            </motion.div>

            {/* Neon Ring 2 - Middle */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-6 rounded-full border border-accent-lime/30"
              style={{
                boxShadow: '0 0 15px rgba(50, 205, 50, 0.2), inset 0 0 15px rgba(50, 205, 50, 0.1)',
              }}
            >
              {/* Orbiting dot */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-lime shadow-lg shadow-accent-lime/50" />
            </motion.div>

            {/* Neon Ring 3 - Inner Pulse */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-12 rounded-full border border-primary/30"
              style={{
                boxShadow: '0 0 30px rgba(255, 126, 95, 0.2)',
              }}
            />

            {/* Profile Image Container */}
            <div className="absolute inset-16 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
              <Image
                src="/images/profile-pic.png"
                alt="Ünzile Nur KAYA"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 200px, 300px"
              />
            </div>

            {/* Floating Badge - Python */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 glass-card p-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-tighter">
                  {t('hero.expertise')}
                </div>
                <div className="text-sm font-semibold text-white">
                  {t('hero.pythonAutomation')}
                </div>
              </div>
            </motion.div>

            {/* Floating Badge - Data */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-4 -right-4 glass-card p-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-tighter">
                  {t('hero.focus')}
                </div>
                <div className="text-sm font-semibold text-white">{t('hero.dataAnalysis')}</div>
              </div>
            </motion.div>

            {/* Floating Badge - BI & Analytics */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-8 glass-card p-3 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-lime to-green-500 flex items-center justify-center text-white font-bold text-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] text-gray-500 uppercase tracking-tighter">
                  {t('hero.biLabel')}
                </div>
                <div className="text-xs font-semibold text-white">{t('hero.biValue')}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
