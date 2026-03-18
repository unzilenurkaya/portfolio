'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const { language } = useLanguage();
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        const frameId = requestAnimationFrame(() => {
            const headings = Array.from(document.querySelectorAll('h2, h3'))
                .filter((h) => h.id)
                .map((h) => ({
                    id: h.id,
                    text: (h as HTMLElement).innerText,
                    level: Number(h.tagName.substring(1)),
                }));

            setToc(headings);

            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { rootMargin: '-10% 0% -80% 0%' }
            );

            document.querySelectorAll('h2, h3').forEach((h) => observer?.observe(h));
        });

        return () => {
            cancelAnimationFrame(frameId);
            observer?.disconnect();
        };
    }, []);

    if (toc.length === 0) return null;

    return (
        <div className="hidden lg:block sticky top-32 h-fit max-w-[240px] p-6 glass-card rounded-2xl border border-white/10">
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">
                {language === 'tr' ? 'İçindekiler' : 'Table of Contents'}
            </h4>
            <nav className="space-y-1">
                {toc.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`block text-sm transition-all duration-300 py-1 ${item.level === 3 ? 'pl-4' : 'pl-0'
                            } ${activeId === item.id
                                ? 'text-primary font-medium border-l-2 border-primary -ml-[1px]'
                                : 'text-gray-500 hover:text-white border-l-2 border-transparent -ml-[1px]'
                            }`}
                    >
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
