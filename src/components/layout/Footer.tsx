import { useLanguage } from '@/context/LanguageContext';
import { socialLinks } from '@/data/social';
import Link from 'next/link';
import NavLink from '@/components/ui/NavLink';
import { FaLinkedinIn, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  twitter: FaXTwitter,
  email: FaEnvelope,
  instagram: FaInstagram,
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <NavLink href="/" className="font-serif text-2xl font-bold text-white mb-4 block">
              ÜNZİLE NUR<span className="text-primary">.</span>
            </NavLink>
            <p className="text-gray-500 max-w-sm mb-6">
              {t('footer.bio')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-primary transition-all"
                    aria-label={social.name}
                  >
                    {Icon && <Icon className="text-sm" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><NavLink href="/#about" className="hover:text-primary transition-colors">{t('nav.about')}</NavLink></li>
              <li><NavLink href="/#projects" className="hover:text-primary transition-colors">{t('nav.projects')}</NavLink></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">{t('nav.blog')}</Link></li>
              <li><Link href="/cv" className="hover:text-primary transition-colors">{t('nav.cv')}</Link></li>
              <li><NavLink href="/#contact" className="hover:text-primary transition-colors">{t('nav.contact')}</NavLink></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
              <li><span className="cursor-not-allowed opacity-50">{t('footer.terms')}</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6 text-[10px] sm:text-xs text-gray-600 uppercase tracking-[0.2em]">
          <p className="font-medium text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
