'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';
import MobileMenu from './MobileMenu';
import Link from 'next/link';

export default function Navbar() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Dynamic header styles based on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.8)']
  );
  
  const headerBackdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.08)']
  );

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBackground,
          backdropFilter: headerBackdropBlur,
          borderBottom: `1px solid`,
          borderColor: headerBorder,
        }}
        className="sticky top-0 w-full z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-bold tracking-tighter text-white uppercase relative z-50">
            ÜNZİLE NUR<span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/#skills" className="hover:text-white transition-colors">
              {t('nav.skills')}
            </Link>
            <Link href="/#projects" className="hover:text-white transition-colors">
              {t('nav.projects')}
            </Link>
             <Link href="/#certificates" className="hover:text-white transition-colors">
              {t('nav.certificates')}
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              {t('nav.blog')}
            </Link>
            <Link href="/cv" className="hover:text-white transition-colors">
              {t('nav.cv')}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Link
              href="/#contact"
              className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-primary/50 transition-all"
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
            aria-label="Menüyü aç"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
