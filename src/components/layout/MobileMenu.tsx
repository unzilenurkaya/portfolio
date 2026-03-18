'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';
import NavLink from '@/components/ui/NavLink';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  const menuItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/#about' },
    { key: 'nav.skills', href: '/#skills' },
    { key: 'nav.projects', href: '/#projects' },
    { key: 'nav.experience', href: '/#experience' },
    { key: 'nav.certificates', href: '/#certificates' },
    { key: 'nav.blog', href: '/blog' },
    { key: 'nav.cv', href: '/cv' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[#111] border-l border-white/10 z-50 md:hidden p-6 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
                aria-label="Menüyü kapat"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 space-y-6">
              {menuItems.map((item) => (
                <NavLink
                  key={item.key}
                  href={item.href}
                  onClick={onClose}
                  className="block text-2xl font-serif text-white/80 hover:text-primary transition-colors"
                >
                  {t(item.key)}
                </NavLink>
              ))}
              <NavLink
                href="/#contact"
                onClick={onClose}
                className="block text-2xl font-serif text-primary"
              >
                {t('nav.contact')}
              </NavLink>
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Dil / Language</span>
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
