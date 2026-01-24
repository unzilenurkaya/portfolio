'use client';

import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface BlogMetaProps {
    date: string;
    readingTime: string;
    title: string;
    slug: string;
}

export default function BlogMeta({ date, readingTime, title, slug }: BlogMetaProps) {
    const { t, language } = useLanguage();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://unzilenurkaya.com/blog/${slug}`;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-y border-white/10 my-10">
            {/* Date & Time */}
            <div className="flex items-center gap-6 text-gray-400 text-sm">
                <time dateTime={date} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(date, language)}
                </time>
                <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {readingTime} {t('blog.readingTime')}
                </span>
            </div>

            {/* Share Links */}
            <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">{t('blog.share')}:</span>
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:text-primary transition-all duration-300"
                    aria-label="X'da paylaş"
                >
                    <FaXTwitter />
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:text-primary transition-all duration-300"
                    aria-label="LinkedIn'de paylaş"
                >
                    <FaLinkedinIn />
                </a>
            </div>
        </div>
    );
}
