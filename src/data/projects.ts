import { Project } from '@/types';

export const projects: Project[] = [
  // 1. Puantaj Otomasyon Sistemi
  {
    id: 'puantaj-otomasyon',
    title: {
      tr: 'İK Süreçleri için Puantaj ve Vardiya Otomasyon Sistemi',
      en: 'HR Attendance and Shift Automation System',
    },
    description: {
      tr: 'İnsan Kaynakları biriminde manuel süreçleri otomatikleştiren Python tabanlı karar destek sistemi.',
      en: 'Python-based decision support system automating manual HR processes.',
    },
    problem: {
      tr: 'İnsan Kaynakları biriminde günlük 100+ personelin turnike verileri ve vardiya bilgileri manuel olarak Excel üzerinden kontrol ediliyordu. Bu süreç; zaman kaybına, insan hatasına ve tutarsız raporlamaya neden oluyor, karar alma süreçlerini yavaşlatıyordu.',
      en: 'In the HR department, daily turnstile data and shift information of 100+ employees were manually checked via Excel. This process caused time loss, human error, and inconsistent reporting, slowing down decision-making processes.',
    },
    solution: {
      tr: 'Python tabanlı bir otomasyon sistemi tasarlayarak; verileri otomatik okuyan, temizleyen ve kural bazlı kontrollerle sapmaları tespit eden bir yapı kurdum. Pandas ve OpenPyXL ile otomatik raporlama mimarisi geliştirdim.',
      en: 'I designed a Python-based automation system; building a structure that automatically reads, cleans data and detects deviations with rule-based controls. I developed an automatic reporting architecture with Pandas and OpenPyXL.',
    },
    result: {
      tr: 'Manuel süreç süresi %70 azaldı. Hatalı/eksik kayıtlar erken aşamada tespit edildi. İK için güvenilir karar destek çıktıları sağlandı. Sistem, AI destekli anomali tespitine uygun şekilde tasarlandı.',
      en: 'Manual process time reduced by 70%. Erroneous/missing records were detected at an early stage. Reliable decision support outputs were provided for HR. The system was designed to be suitable for AI-supported anomaly detection.',
    },
    technologies: ['Python', 'Pandas', 'Openpyxl'],
    image: '/images/projects/puantaj.png',
    category: 'automation',
  },

  // 2. Otel Rezervasyon İptal Tahmini
  {
    id: 'otel-iptal-tahmini',
    title: {
      tr: 'Makine Öğrenmesi ile Otel Rezervasyon İptal Tahminleme Sistemi',
      en: 'Hotel Reservation Cancellation Prediction with Machine Learning',
    },
    description: {
      tr: '36.000+ satırlık veri seti üzerinde ML modelleri ile rezervasyon iptal tahminlemesi ve interaktif karar destek arayüzü.',
      en: 'Reservation cancellation prediction with ML models on 36,000+ row dataset and interactive decision support interface.',
    },
    problem: {
      tr: 'Otel işletmeleri, iptalleri ancak gerçekleştiğinde fark edebiliyor. Bu durum ciddi gelir kaybına ve kapasite planlama hatalarına neden oluyor.',
      en: 'Hotels can only notice cancellations when they happen. This causes serious revenue loss and capacity planning errors.',
    },
    solution: {
      tr: '36.000+ satırlık veri seti üzerinde; EDA, özellik mühendisliği ve ML modelleri (XGBoost, Scikit-learn) uyguladım. Streamlit ile interaktif bir karar destek arayüzü kurguladım.',
      en: 'I applied EDA, feature engineering and ML models (XGBoost, Scikit-learn) on a 36,000+ row dataset. I designed an interactive decision support interface with Streamlit.',
    },
    result: {
      tr: '%94 doğruluk oranıyla iptal olasılıkları önceden tahmin edilerek, işletmelerin riskli rezervasyonları erken fark etmesi ve gelir planlamasını iyileştirmesi sağlandı. Veri biliminin iş kararlarına entegrasyonu kanıtlandı.',
      en: 'With 94% accuracy, cancellation probabilities were predicted in advance, enabling businesses to identify risky reservations early and improve revenue planning. Integration of data science into business decisions was proven.',
    },
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit'],
    image: '/images/projects/hotel-ai.png',
    github: 'https://github.com/unzilenurkaya/hotel-reservation-app',
    category: 'data',
  },

  // 3. TÜBİTAK Sokak Hayvanları Otomasyon Sistemi
  {
    id: 'sokak-hayvanlari-otomasyon',
    title: {
      tr: 'Sokak Hayvanları Otomasyon Sistemi',
      en: 'Stray Animals Automation System',
    },
    description: {
      tr: 'TÜBİTAK 4006 Bilim Fuarı kapsamında geliştirilen otonom mama dağıtım prototipi.',
      en: 'Autonomous food distribution prototype developed for TÜBİTAK 4006 Science Fair.',
    },
    problem: {
      tr: 'Sokak hayvanlarının beslenmesi insan müdahalesine bağlı kalmakta, bu durum sürdürülebilir bir çözüm sunmamaktadır. İnsan müdahalesi gerektirmeyen, sürdürülebilir bir beslenme mekanizması ihtiyacı bulunmaktadır.',
      en: 'Feeding stray animals depends on human intervention, which does not provide a sustainable solution. There is a need for a sustainable feeding mechanism that does not require human intervention.',
    },
    solution: {
      tr: 'Madeni para ve sensör tetiklemeli mekanik ve elektronik sistem entegrasyonu tasarladım. Otonom çalışan bir mama dağıtım mekanizması geliştirdim.',
      en: 'I designed coin and sensor-triggered mechanical and electronic system integration. I developed an autonomous food distribution mechanism.',
    },
    result: {
      tr: 'TÜBİTAK 4006 Bilim Fuarı\'nda başarıyla sergilendi ve prototip tam not aldı. Sosyal sorumluluk ile mühendislik vizyonu birleştirildi.',
      en: 'Successfully exhibited at TÜBİTAK 4006 Science Fair and the prototype received full marks. Social responsibility and engineering vision were combined.',
    },
    technologies: ['Arduino', 'Elektronik', 'Mekanik Tasarım'],
    image: '/images/projects/tubitak.png',
    category: 'automation',
  },
];

export const getProjectsByCategory = (category: Project['category'] | 'all') => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};
