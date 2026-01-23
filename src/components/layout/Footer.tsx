'use client';

import { useLanguage } from '@/context/LanguageContext';
import { socialLinks } from '@/data/social';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold text-white mb-4 block">
              ÜNZİLE NUR<span className="text-primary">.</span>
            </Link>
            <p className="text-gray-500 max-w-sm mb-6">
              AI destekli yazılım sistemleri geliştirmeyi hedefleyen Yönetim Bilişim Sistemleri öğrencisi.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-primary transition-all"
                  aria-label={social.name}
                >
                  {/* Icon placeholder */}
                  <span className="text-xs">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/#about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/#projects" className="hover:text-primary transition-colors">{t('nav.projects')}</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">{t('nav.blog')}</Link></li>
              <li><Link href="/cv" className="hover:text-primary transition-colors">{t('nav.cv')}</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4">Yasal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
              <li><span className="cursor-not-allowed opacity-50">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-wider">
          <p>© {currentYear} Ünzile Nur KAYA. All rights reserved.</p>
          <p className="flex items-center gap-1">
            {t('footer.madeWith')} <span className="text-red-500">♥</span> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
