'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function BlogNewsletter() {
    const { t } = useLanguage();

    return (
        <div className="p-8 md:p-12 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(255,126,95,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,245,255,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] border border-white/10 relative overflow-hidden group">
            {/* Decorative Orbs */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-colors" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <p className="text-[11px] uppercase tracking-[0.28em] text-primary/80 mb-4">{t('blog.focusLabel')}</p>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                    {t('blog.newsletterTitle')}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    {t('blog.newsletterDesc')}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="https://linkedin.com/in/unzilenurkaya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,126,95,0.35)]"
                    >
                        {t('blog.ctaPrimary')}
                    </Link>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary/50 text-primary bg-transparent font-medium transition-all duration-300 hover:border-primary hover:bg-primary/10"
                    >
                        {t('blog.ctaSecondary')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
