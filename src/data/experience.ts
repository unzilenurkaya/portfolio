import { Experience } from '@/types';

export const experiences: Experience[] = [
  // Education
  {
    id: 'edu-bandirma',
    company: {
      tr: 'Bandırma 17 Eylül Üniversitesi',
      en: 'Bandirma 17 Eylül University',
    },
    role: {
      tr: 'Yönetim Bilişim Sistemleri',
      en: 'Management Information Systems',
    },
    period: '2022 - 2026',
    description: {
      tr: 'Veri analizi, yazılım geliştirme ve iş süreçleri yönetimi üzerine eğitim. Aktif olarak proje geliştirme ve staj deneyimleri.',
      en: 'Education on data analysis, software development, and business process management. Actively developing projects and gaining internship experience.',
    },
    type: 'education',
  },
  {
    id: 'edu-anadolu',
    company: {
      tr: 'Anadolu Üniversitesi',
      en: 'Anadolu University',
    },
    role: {
      tr: 'Bilgisayar Programcılığı',
      en: 'Computer Programming',
    },
    period: '2022 - Devam',
    description: {
      tr: 'İkinci üniversite olarak yazılım geliştirme odaklı eğitim. Programlama dilleri ve veritabanı yönetimi.',
      en: 'Software development focused education as a second university. Programming languages and database management.',
    },
    type: 'education',
  },

  // Internships
  {
    id: 'intern-uyu',
    company: {
      tr: 'Uyu Sleep Capsule',
      en: 'Uyu Sleep Capsule',
    },
    role: {
      tr: 'Software Developer',
      en: 'Software Developer',
    },
    period: 'Ağu 2024 - Ara 2024',
    description: {
      tr: 'Python ile otomasyon sistemleri geliştirme. Veri analizi ve raporlama süreçlerinin otomatikleştirilmesi. İç süreç iyileştirme projeleri.',
      en: 'Developing automation systems with Python. Automating data analysis and reporting processes. Internal process improvement projects.',
    },
    type: 'internship',
  },
  {
    id: 'intern-kma',
    company: {
      tr: 'KMA Yazılım',
      en: 'KMA Software',
    },
    role: {
      tr: 'Front-End Developer',
      en: 'Front-End Developer',
    },
    period: 'Tem 2024 - Ağu 2024',
    description: {
      tr: 'React ve modern JavaScript ile web uygulamaları geliştirme. UI/UX tasarım ilkeleri ve responsive web tasarımı.',
      en: 'Developing web applications with React and modern JavaScript. UI/UX design principles and responsive web design.',
    },
    type: 'internship',
  },
  {
    id: 'intern-celebi',
    company: {
      tr: 'Çelebi Bandırma Limanı',
      en: 'Çelebi Bandırma Port',
    },
    role: {
      tr: 'IT Stajyeri',
      en: 'IT Intern',
    },
    period: 'Tem 2025 - Ağu 2025',
    description: {
      tr: 'Liman operasyonları IT altyapısı. Sistem yönetimi ve teknik destek süreçleri. SAP sistemleri ile çalışma deneyimi.',
      en: 'Port operations IT infrastructure. System management and technical support processes. Experience working with SAP systems.',
    },
    type: 'internship',
  },
];

export const getExperiencesByType = (type: Experience['type']) => {
  return experiences.filter((exp) => exp.type === type);
};

export const educations = getExperiencesByType('education');
export const internships = getExperiencesByType('internship');
