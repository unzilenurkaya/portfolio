import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'puantaj-otomasyon',
    title: {
      tr: 'Puantaj Otomasyon Sistemi',
      en: 'Attendance Automation System',
    },
    description: {
      tr: 'Manuel olarak yürütülen veri eşleştirme ve vardiya kontrol sürecini Python otomasyonu ile optimize eden bir prototip.',
      en: 'A prototype that optimizes manual data matching and shift control processes with Python automation.',
    },
    problem: {
      tr: 'Günlük 100+ personel turnike giriş/çıkış verisi manuel olarak kontrol ediliyor, bu süreç zaman alıcı ve hataya açıktı.',
      en: 'Daily 100+ employee turnstile entry/exit data was manually checked, which was time-consuming and error-prone.',
    },
    solution: {
      tr: 'Python, Pandas ve Openpyxl kullanarak otomatik veri temizleme, eşleştirme ve Excel raporlama sistemi geliştirdim.',
      en: 'I developed an automatic data cleaning, matching, and Excel reporting system using Python, Pandas, and Openpyxl.',
    },
    result: {
      tr: 'Manuel süreç otomatikleştirildi, veri temizleme ve analiz çalışmaları ile yazılım süreçleri iyileştirildi.',
      en: 'Manual process was automated, software processes improved through data cleaning and analysis work.',
    },
    technologies: ['Python', 'Pandas', 'Openpyxl'],
    image: '/images/projects/puantaj.png',
    category: 'automation',
  },
  {
    id: 'otel-iptal-tahmini',
    title: {
      tr: 'Otel Rezervasyon İptali Tahmini',
      en: 'Hotel Reservation Cancellation Prediction',
    },
    description: {
      tr: '36.000\'den fazla satırlık Kaggle veri seti üzerinde makine öğrenmesi algoritmalarıyla rezervasyon iptal tahminlemesi ve veri analizi çalışması.',
      en: 'Reservation cancellation prediction and data analysis work using machine learning algorithms on a Kaggle dataset with over 36,000 rows.',
    },
    problem: {
      tr: 'Oteller, son dakika iptallerinden dolayı gelir kaybı yaşıyor ve bu iptalleri önceden tahmin etmek zor.',
      en: 'Hotels experience revenue loss due to last-minute cancellations, and predicting these cancellations is difficult.',
    },
    solution: {
      tr: 'Scikit-learn ve XGBoost algoritmaları ile eğitilmiş bir model, Streamlit ile interaktif tahmin arayüzü geliştirdim.',
      en: 'I developed a model trained with Scikit-learn and XGBoost algorithms, and an interactive prediction interface with Streamlit.',
    },
    result: {
      tr: 'Makine öğrenmesi ile iptal tahminleri yapıldı, veri analizi becerileri geliştirildi.',
      en: 'Cancellation predictions were made with machine learning, data analysis skills were improved.',
    },
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit'],
    image: '/images/projects/hotel-ai.png',
    github: 'https://github.com/unzilenurkaya/hotel-cancellation-prediction',
    category: 'data',
  },
];

export const getProjectsByCategory = (category: Project['category'] | 'all') => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};
