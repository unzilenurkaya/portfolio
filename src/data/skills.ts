import { Skill } from '@/types';

export const skills: Skill[] = [
  // Core Skills - Ana Yetenekler
  {
    name: 'Python',
    level: 85,
    category: 'core',
    icon: '🐍',
  },
  {
    name: 'SQL',
    level: 80,
    category: 'core',
    icon: '🗄️',
  },
  {
    name: 'JavaScript',
    level: 75,
    category: 'core',
    icon: '🟨',
  },
  {
    name: 'React',
    level: 70,
    category: 'core',
    icon: '⚛️',
  },
  {
    name: 'HTML / CSS',
    level: 80,
    category: 'core',
    icon: '🎨',
  },
  {
    name: 'Git',
    level: 75,
    category: 'core',
    icon: '📝',
  },

  // AI / Data Skills - AI & Veri Destekleyici
  {
    name: 'Pandas',
    level: 80,
    category: 'supporting',
    icon: '🐼',
  },
  {
    name: 'Power BI',
    level: 70,
    category: 'supporting',
    icon: '📈',
  },
  {
    name: 'Scikit-learn',
    level: 65,
    category: 'supporting',
    icon: '🤖',
  },
  {
    name: 'XGBoost',
    level: 65,
    category: 'supporting',
    icon: '🚀',
  },
  {
    name: 'Prompt Engineering',
    level: 75,
    category: 'supporting',
    icon: '💬',
  },
  {
    name: 'LLM Tools (ChatGPT)',
    level: 80,
    category: 'supporting',
    icon: '🧠',
  },

  // Tools - Araçlar & Diğer
  {
    name: 'Streamlit',
    level: 70,
    category: 'familiar',
    icon: '🌊',
  },
  {
    name: 'Excel',
    level: 85,
    category: 'familiar',
    icon: '📊',
  },
];

export const getSkillsByCategory = (category: Skill['category']) => {
  return skills.filter((skill) => skill.category === category);
};

export const coreSkills = getSkillsByCategory('core');
export const supportingSkills = getSkillsByCategory('supporting');
export const familiarSkills = getSkillsByCategory('familiar');
