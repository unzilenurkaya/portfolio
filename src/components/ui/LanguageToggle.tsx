'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center gap-2 px-3 py-2 rounded-full glass-card hover:border-primary/30 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={language === 'tr' ? t('common.switchToEnglish') : t('common.switchToTurkish')}
    >
      <Languages className="w-4 h-4 text-white/70 group-hover:text-primary transition-colors" />
      <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
        {language.toUpperCase()}
      </span>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,126,95,0.15) 0%, transparent 70%)',
        }}
      />
    </motion.button>
  );
}
