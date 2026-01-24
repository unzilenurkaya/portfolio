import { Certificate } from '@/types';

export const certificates: Certificate[] = [
  {
    id: 'sql-udemy',
    title: {
      tr: 'Uygulamalarla SQL Öğreniyorum',
      en: 'SQL Learning with Applications',
    },
    issuer: {
      tr: 'Udemy',
      en: 'Udemy',
    },
    date: '02.11.2025',
    image: '/images/certificates/sql.jpg',
    fileType: 'image',
    hasViewButton: true,
    featured: true,
  },
  {
    id: 'proje-yonetimi-btk',
    title: {
      tr: 'Proje Yönetimi',
      en: 'Project Management',
    },
    issuer: {
      tr: 'BTK Akademi',
      en: 'BTK Academy',
    },
    date: '01.11.2025',
    image: '/images/certificates/proje-yonetimi.pdf',
    fileType: 'pdf',
    hasViewButton: true,
  },
  {
    id: 'prompt-engineering',
    title: {
      tr: 'Yapay Zeka ile Etkili İletişim: Prompt Engineering',
      en: 'Effective Communication with AI: Prompt Engineering',
    },
    issuer: {
      tr: 'Bandırma Onyedi Eylül Üniversitesi',
      en: 'Bandirma Onyedi Eylul University',
    },
    date: '17.10.2024',
    image: '/images/certificates/indir.png',
    fileType: 'image',
    hasViewButton: true,
  },
  {
    id: 'raporlama-egitimi',
    title: {
      tr: 'Raporlama Eğitimi',
      en: 'Reporting Training',
    },
    issuer: {
      tr: 'İş Kulübü Derneği',
      en: 'Business Club Association',
    },
    date: '06.02.2024',
    image: '/images/certificates/raporlama.png',
    fileType: 'image',
    hasViewButton: true,
  },
  {
    id: 'bankacilik-guncel',
    title: {
      tr: 'Bankacılık Sektöründeki Güncel Gelişmeler',
      en: 'Current Developments in the Banking Sector',
    },
    issuer: {
      tr: 'Türkiye Bankalar Birliği',
      en: 'Banks Association of Türkiye',
    },
    date: '17.12.2023',
    image: '/images/certificates/banka.pdf',
    fileType: 'pdf',
    hasViewButton: true,
  },
  {
    id: 'csharp-turkcell',
    title: {
      tr: 'C# ile Algoritma ve Programlama',
      en: 'Algorithm and Programming with C#',
    },
    issuer: {
      tr: 'Turkcell Geleceği Yazanlar',
      en: 'Turkcell Gelecegi Yazanlar',
    },
    date: '11.12.2023',
    image: '/images/certificates/csharp.pdf',
    fileType: 'pdf',
    hasViewButton: true,
  },
  {
    id: 'tubitak-erguvanlar',
    title: {
      tr: 'Tubitak Erguvanlar Çiçek Açıyor (Proje Katılımı)',
      en: 'Tubitak Erguvanlar Blooming (Project Participation)',
    },
    issuer: {
      tr: 'TÜBİTAK',
      en: 'TUBITAK',
    },
    date: '2012',
    image: '/images/certificates/erguvanlar.jpeg',
    fileType: 'image',
    hasViewButton: false,
  },
];
