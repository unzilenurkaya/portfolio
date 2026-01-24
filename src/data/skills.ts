import { Skill } from '@/types';

export const skills: Skill[] = [
  // GRUP 1: Backend & Core (Ana Omurga)
  {
    name: 'Python',
    category: 'backend',
    icon: '🐍',
  },
  {
    name: 'SQL',
    category: 'backend',
    icon: '🗄️',
  },
  {
    name: 'Veri Yapıları & Algoritmik Düşünme',
    category: 'backend',
    icon: '🧬',
  },
  {
    name: 'Git',
    category: 'backend',
    icon: '📝',
  },

  // GRUP 2: Veri & Yapay Zeka Araçları (Uzmanlık)
  // 📊 Veri İşleme
  {
    name: 'Pandas',
    category: 'data-ai',
    subCategory: 'processing',
    icon: '🐼',
  },
  {
    name: 'SQL',
    category: 'data-ai',
    subCategory: 'processing',
    icon: '🗄️',
  },
  {
    name: 'Excel',
    category: 'data-ai',
    subCategory: 'processing',
    icon: '📊',
  },
  // 🤖 Makine Öğrenmesi (Temel-Orta)
  {
    name: 'Scikit-learn',
    category: 'data-ai',
    subCategory: 'ml',
    icon: '🤖',
  },
  {
    name: 'XGBoost',
    category: 'data-ai',
    subCategory: 'ml',
    icon: '🚀',
  },
  // 🧠 LLM & AI Araçları
  {
    name: 'Prompt Engineering',
    category: 'data-ai',
    subCategory: 'llm',
    icon: '💬',
  },
  {
    name: 'LLM Tabanlı Otomasyonlar',
    category: 'data-ai',
    subCategory: 'llm',
    icon: '🧠',
  },
  {
    name: 'Streamlit',
    category: 'data-ai',
    subCategory: 'llm',
    icon: '🌊',
  },

  // GRUP 3: Deneyim Kazanılan Teknolojiler
  {
    name: 'React',
    category: 'experienced',
    icon: '⚛️',
  },
  {
    name: 'JavaScript',
    category: 'experienced',
    icon: '🟨',
  },
  {
    name: 'HTML / CSS',
    category: 'experienced',
    icon: '🎨',
  },
  {
    name: 'Power BI',
    category: 'experienced',
    icon: '📈',
  },
];

export const getSkillsByCategory = (category: Skill['category']) => {
  return skills.filter((skill) => skill.category === category);
};

export const getSkillsBySubCategory = (subCategory: Skill['subCategory']) => {
  return skills.filter((skill) => skill.subCategory === subCategory);
};

export const backendSkills = getSkillsByCategory('backend');
export const dataAiSkills = getSkillsByCategory('data-ai');
export const experiencedSkills = getSkillsByCategory('experienced');

// Sub-categories for data-ai
export const processingSkills = getSkillsBySubCategory('processing');
export const mlSkills = getSkillsBySubCategory('ml');
export const llmSkills = getSkillsBySubCategory('llm');
