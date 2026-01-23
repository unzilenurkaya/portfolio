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
  {
    id: 'sokak-hayvanlari-otomasyon',
    title: {
      tr: 'Sokak Hayvanları Otomasyon Sistemi',
      en: 'Stray Animals Automation System',
    },
    description: {
      tr: 'Madeni para ile çalışan mekanik otomat sistemlerinden esinlenerek sokak hayvanları için mama sağlayan ünitenin tasarım ve prototip geliştirme projesi.',
      en: 'A design and prototype development project for a unit that provides food for stray animals, inspired by coin-operated mechanical vending machines.',
    },
    problem: {
      tr: 'Sokak hayvanları düzensiz besleniyor, otomatik ve sürdürülebilir bir çözüm gerekiyor.',
      en: 'Stray animals are fed irregularly, an automatic and sustainable solution is needed.',
    },
    solution: {
      tr: 'TÜBİTAK 4006 kapsamında mekanik otomat prensibinden yola çıkarak mama dağıtım ünitesi tasarladım.',
      en: 'I designed a food distribution unit based on mechanical vending machine principles within the scope of TÜBİTAK 4006.',
    },
    result: {
      tr: 'Prototip başarıyla geliştirildi, TÜBİTAK 4006 projesine katılım sağlandı.',
      en: 'Prototype was successfully developed, participation in TÜBİTAK 4006 project was achieved.',
    },
    technologies: ['TÜBİTAK 4006', 'Prototip Geliştirme'],
    image: '/images/projects/sokak-hayvanlari.png',
    category: 'iot',
  },
];

export const getProjectsByCategory = (category: Project['category'] | 'all') => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};
