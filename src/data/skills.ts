import { Skill } from '@/types';

export const skills: Skill[] = [
  // KUTU 1: Temel Yetkinlikler (Core Stack)
  {
    name: 'Python',
    category: 'core',
    icon: 'python',
  },
  {
    name: 'SQL',
    category: 'core',
    icon: 'postgresql',
  },
  {
    name: 'Git',
    category: 'core',
    icon: 'git',
  },
  {
    name: 'REST API',
    category: 'core',
    icon: 'api',
  },

  // KUTU 2: Veri Bilimi & Yapay Zekâ (AI & Data)
  {
    name: 'Pandas',
    category: 'data-ai',
    icon: 'pandas',
  },
  {
    name: 'Scikit-learn',
    category: 'data-ai',
    icon: 'scikitlearn',
  },
  {
    name: 'Streamlit',
    category: 'data-ai',
    icon: 'streamlit',
  },
  {
    name: 'XGBoost',
    category: 'data-ai',
    icon: 'numpy',
  },
  {
    name: 'LLM & AI Tools',
    category: 'data-ai',
    icon: 'openai',
  },

  // KUTU 3: Web & Görselleştirme
  {
    name: 'React',
    category: 'web',
    icon: 'react',
  },
  {
    name: 'JavaScript',
    category: 'web',
    icon: 'javascript',
  },
  {
    name: 'HTML / CSS',
    category: 'web',
    icon: 'html5',
  },
  {
    name: 'Power BI',
    category: 'web',
    icon: 'powerbi',
  },
];

export const getSkillsByCategory = (category: Skill['category']) => {
  return skills.filter((skill) => skill.category === category);
};

export const coreSkills = getSkillsByCategory('core');
export const dataAiSkills = getSkillsByCategory('data-ai');
export const webSkills = getSkillsByCategory('web');
