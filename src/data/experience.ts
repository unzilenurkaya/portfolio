import { Experience } from '@/types';

export const experiences: Experience[] = [
  // Internships - En yeniden eskiye sıralı
  {
    id: 'intern-celebi',
    company: {
      tr: 'Çelebi Bandırma Limanı',
      en: 'Çelebi Bandırma Port',
    },
    role: {
      tr: 'IT (Bilgi Teknolojileri) - Zorunlu Staj',
      en: 'IT (Information Technology) - Mandatory Internship',
    },
    period: 'Tem 2025 - Ağu 2025',
    description: {
      tr: 'Kurumsal ağ yapısı ve sunucu sistemlerinin topolojisini inceleyerek BT altyapı süreçleri hakkında deneyim kazandım. Liman operasyon yazılımlarının işleyişini analiz ettim ve kullanıcıların karşılaştığı teknik sorunların çözüm süreçlerini gözlemledim. Manuel yürütülen İK puantaj süreçleri için Python ile yazılım tabanlı otomasyon senaryoları üzerinde kavramsal çalışmalar yaptım. Günlük 100+ personel turnike giriş/çıkış verisi üzerinde veri temizleme ve analiz çalışmaları yürüterek yazılım süreçlerini iyileştirdim.',
      en: 'Gained experience in IT infrastructure processes by examining corporate network structure and server system topologies. Analyzed port operation software workflows and observed technical problem-solving processes for users. Conducted conceptual work on Python-based automation scenarios for manual HR attendance processes. Improved software processes through data cleaning and analysis on daily 100+ employee turnstile entry/exit data.',
    },
    type: 'internship',
  },
  {
    id: 'intern-uyu',
    company: {
      tr: 'Uyu Sleep Capsule',
      en: 'Uyu Sleep Capsule',
    },
    role: {
      tr: 'Yazılım Geliştiricisi (Software Developer)',
      en: 'Software Developer',
    },
    period: 'Ağu 2024 - Ara 2024',
    description: {
      tr: 'Startup ekosisteminde çevik (Agile) ürün geliştirme toplantılarına katılarak yazılım yaşam döngüsü süreçlerini gözlemledim. Gömülü sistemler ve web paneli arasındaki veri senkronizasyonu testlerine katılarak iletişim protokolleri üzerine çalışma fırsatı buldum. Python ve C# dillerinde modüler kod yapısı oluşturma üzerine pratikler yaparak sistemin geliştirilmesine destek oldum. Yazılım test senaryolarının koşturulması ve hata raporlama (bug tracking) süreçlerinde görev aldım.',
      en: 'Observed software lifecycle processes by participating in agile product development meetings in the startup ecosystem. Had the opportunity to work on communication protocols by participating in data synchronization tests between embedded systems and web panel. Supported system development by practicing modular code structure in Python and C#. Participated in software test scenario execution and bug tracking processes.',
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
      tr: 'Front-End Geliştirici',
      en: 'Front-End Developer',
    },
    period: 'Tem 2024 - Ağu 2024',
    description: {
      tr: 'HTML, CSS ve JavaScript kullanarak 3\'ten fazla proje duyarlı (responsive) ve kullanıcı dostu arayüzler tasarladım. Git versiyon kontrol sistemini aktif kullanarak ekip içi kod yönetim süreçlerine uyum sağladım. Kullanıcı deneyimi (UX) testleri yaparak arayüz iyileştirmeleri gerçekleştirdim.',
      en: 'Designed responsive and user-friendly interfaces for more than 3 projects using HTML, CSS, and JavaScript. Actively used Git version control system to adapt to team code management processes. Conducted user experience (UX) tests and implemented interface improvements.',
    },
    type: 'internship',
  },
  {
    id: 'ybs-toplulugu',
    company: {
      tr: 'Bandırma Onyedi Eylül Üniversitesi',
      en: 'Bandırma Onyedi Eylül University',
    },
    role: {
      tr: 'YBS Topluluğu - Sponsorluk Ekibi Üyesi',
      en: 'MIS Community - Sponsorship Team Member',
    },
    period: '2023 - Devam',
    description: {
      tr: 'Topluluk etkinlikleri için sponsorluk süreçlerini yönettim ve kurumsal iletişim becerilerimi geliştirdim. Teknoloji şirketleri ile iş birliği süreçlerinde aktif rol aldım. Organizasyon ve koordinasyon yeteneklerimi teknoloji ile iş dünyası arasında köprü kuracak projelerde kullandım.',
      en: 'Managed sponsorship processes for community events and developed corporate communication skills. Took an active role in collaboration processes with technology companies. Used organization and coordination skills in projects bridging technology and business.',
    },
    type: 'internship',
  },
];

export const internships = experiences;
export const educations = [
  {
    id: 'edu-bandirma',
    company: {
      tr: 'Bandırma Onyedi Eylül Üniversitesi',
      en: 'Bandırma Onyedi Eylül University',
    },
    role: {
      tr: 'Yönetim Bilişim Sistemleri',
      en: 'Management Information Systems',
    },
    period: '2022 - 2026',
    description: {
      tr: 'Veri analizi, yazılım geliştirme ve iş süreçleri yönetimi üzerine eğitim.',
      en: 'Education on data analysis, software development, and business process management.',
    },
    type: 'education' as const,
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
      tr: 'İkinci üniversite olarak yazılım geliştirme odaklı eğitim.',
      en: 'Software development focused education as a second university.',
    },
    type: 'education' as const,
  },
];
