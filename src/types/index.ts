// Language Types
export type Language = 'tr' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Skill Types
export interface Skill {
  name: string;
  category: 'backend' | 'data-ai' | 'experienced';
  subCategory?: 'processing' | 'ml' | 'llm'; // For data-ai group sub-blocks
  icon?: string;
}

// Project Types
export interface Project {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  problem?: {
    tr: string;
    en: string;
  };
  solution?: {
    tr: string;
    en: string;
  };
  result?: {
    tr: string;
    en: string;
  };
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  category: 'data' | 'web' | 'automation';
}

// Experience Types
export interface Experience {
  id: string;
  company: {
    tr: string;
    en: string;
  };
  role: {
    tr: string;
    en: string;
  };
  period: string;
  description: {
    tr: string;
    en: string;
  };
  type: 'internship' | 'education' | 'work';
}

// Certificate Types
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  url?: string;
  featured?: boolean;
}

// Social Links
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Blog Types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}
