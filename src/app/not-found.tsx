'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative"
        >
          <h1 className="text-[150px] md:text-[200px] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-none">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wider">
            {t('notFound.subtitle')}
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            {t('notFound.description')}
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity uppercase text-xs tracking-widest"
          >
            {t('notFound.backHome')}
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </main>
  );
}
