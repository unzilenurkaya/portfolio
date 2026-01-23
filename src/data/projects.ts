import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'puantaj-takip',
    title: {
      tr: 'Puantaj Takip Otomasyonu',
      en: 'Attendance Tracking Automation',
    },
    description: {
      tr: 'Çalışan puantaj verilerini otomatik olarak takip eden ve raporlayan Python tabanlı otomasyon sistemi.',
      en: 'Python-based automation system that automatically tracks and reports employee attendance data.',
    },
    problem: {
      tr: 'Manuel puantaj takibi zaman alıcı ve hata yapmaya açık bir süreçti. Çalışan sayısı arttıkça takip zorlaşıyordu.',
      en: 'Manual attendance tracking was time-consuming and error-prone. Tracking became difficult as the number of employees increased.',
    },
    solution: {
      tr: 'Python ve Pandas kullanarak otomatik veri toplama, işleme ve Excel raporlama sistemi geliştirdim.',
      en: 'I developed an automatic data collection, processing, and Excel reporting system using Python and Pandas.',
    },
    result: {
      tr: '%70 zaman tasarrufu sağlandı. Hata oranı sıfıra indirildi. Günlük raporlar otomatik oluşturulmaya başlandı.',
      en: '70% time savings achieved. Error rate reduced to zero. Daily reports started to be generated automatically.',
    },
    technologies: ['Python', 'Pandas', 'Excel', 'Automation'],
    image: '/images/projects/puantaj.png',
    category: 'automation',
  },
  {
    id: 'otel-iptal-tahmini',
    title: {
      tr: 'Otel İptal Tahmini AI',
      en: 'Hotel Cancellation Prediction AI',
    },
    description: {
      tr: 'Makine öğrenmesi ile otel rezervasyon iptallerini önceden tahmin eden web uygulaması.',
      en: 'Web application that predicts hotel reservation cancellations in advance using machine learning.',
    },
    problem: {
      tr: 'Oteller, son dakika iptallerinden dolayı gelir kaybı yaşıyordu. İptalleri önceden tahmin etmek mümkün değildi.',
      en: 'Hotels were experiencing revenue loss due to last-minute cancellations. It was not possible to predict cancellations in advance.',
    },
    solution: {
      tr: 'XGBoost algoritması ile eğitilmiş bir model ve Streamlit ile interaktif tahmin arayüzü geliştirdim.',
      en: 'I developed a model trained with XGBoost algorithm and an interactive prediction interface with Streamlit.',
    },
    result: {
      tr: '%85 doğruluk oranı ile iptal tahminleri yapıldı. Oteller proaktif önlemler alabilir hale geldi.',
      en: 'Cancellation predictions were made with 85% accuracy. Hotels became able to take proactive measures.',
    },
    technologies: ['Python', 'XGBoost', 'Streamlit', 'Machine Learning', 'Pandas'],
    image: '/images/projects/hotel-ai.png',
    github: 'https://github.com/unzilenurkaya/hotel-cancellation-prediction',
    category: 'data',
  },
  {
    id: 'sokak-hayvanlari-iot',
    title: {
      tr: 'Sokak Hayvanları IoT Sistemi',
      en: 'Stray Animals IoT System',
    },
    description: {
      tr: 'Arduino tabanlı akıllı yemlik ve su sistemi ile sokak hayvanlarının beslenmesini otomatikleştiren IoT projesi.',
      en: 'IoT project that automates feeding of stray animals with Arduino-based smart feeder and water system.',
    },
    problem: {
      tr: 'Sokak hayvanları düzensiz besleniyor, yemlik ve suluklar boş kalıyordu. Manuel takip mümkün değildi.',
      en: 'Stray animals were fed irregularly, feeders and water bowls were left empty. Manual tracking was not possible.',
    },
    solution: {
      tr: 'Sensörlerle yemek ve su seviyesini izleyen, otomatik dolum yapan ve mobil bildirim gönderen sistem tasarladım.',
      en: 'I designed a system that monitors food and water levels with sensors, automatically refills, and sends mobile notifications.',
    },
    result: {
      tr: 'Hayvanların düzenli beslenmesi sağlandı. Belediye ile pilot uygulama için görüşmeler yapıldı.',
      en: 'Regular feeding of animals was ensured. Discussions were held with the municipality for pilot implementation.',
    },
    technologies: ['Arduino', 'C++', 'IoT', 'Sensors', 'Mobile App'],
    image: '/images/projects/iot-animals.png',
    category: 'iot',
  },
  {
    id: 'sponsorluk-yonetimi',
    title: {
      tr: 'Sponsorluk Yönetim Sistemi',
      en: 'Sponsorship Management System',
    },
    description: {
      tr: 'Etkinlik ve proje sponsorluklarını takip eden, raporlayan tam kapsamlı web tabanlı yönetim sistemi.',
      en: 'Comprehensive web-based management system that tracks and reports event and project sponsorships.',
    },
    problem: {
      tr: 'Sponsorluklarla ilgili bilgiler dağınık, takip ve raporlama zor, iletişim koordinasyonu yetersizdi.',
      en: 'Information about sponsorships was scattered, tracking and reporting was difficult, communication coordination was insufficient.',
    },
    solution: {
      tr: 'React ve Node.js ile modern bir dashboard, sponsor takip sistemi ve otomatik raporlama modülü geliştirdim.',
      en: 'I developed a modern dashboard with React and Node.js, sponsor tracking system, and automatic reporting module.',
    },
    result: {
      tr: 'Tüm sponsorluklar tek platformda toplandı. Raporlama süresi %60 azaldı.',
      en: 'All sponsorships were gathered on a single platform. Reporting time decreased by 60%.',
    },
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    image: '/images/projects/sponsorship.png',
    github: 'https://github.com/unzilenurkaya/sponsorship-management',
    category: 'web',
  },
];

export const getProjectsByCategory = (category: Project['category'] | 'all') => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};
