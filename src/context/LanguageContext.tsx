'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Language, LanguageContextType } from '@/types';
import { translations } from '@/data/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
      const savedLang = localStorage.getItem('portfolio-language') as Language;
      if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
        document.cookie = `portfolio-language=${savedLang}; path=/; max-age=31536000; samesite=lax`;
        if (savedLang !== 'tr') {
          router.refresh();
        }
        return;
      }

      document.documentElement.lang = 'tr';
      document.cookie = 'portfolio-language=tr; path=/; max-age=31536000; samesite=lax';
    });

    return () => cancelAnimationFrame(frameId);
  }, [router]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
    document.documentElement.lang = lang;
    document.cookie = `portfolio-language=${lang}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'tr', setLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  // Provide a safe fallback for SSR/Build time if context is missing
  if (context === undefined) {
    return {
      language: 'tr' as Language,
      setLanguage: () => { },
      t: (key: string) => key.split('.').pop() || key,
    };
  }

  return context;
}
