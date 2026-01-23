import { Skill } from '@/types';

export const skills: Skill[] = [
  // Core Skills - Ana Yetenekler
  {
    name: 'Python',
    level: 80,
    category: 'core',
    icon: '🐍',
  },
  {
    name: 'SQL',
    level: 75,
    category: 'core',
    icon: '🗄️',
  },
  {
    name: 'Pandas / Excel',
    level: 80,
    category: 'core',
    icon: '📊',
  },
  {
    name: 'Otomasyon',
    level: 75,
    category: 'core',
    icon: '⚙️',
  },

  // Supporting Skills - Destekleyici
  {
    name: 'React',
    level: 65,
    category: 'supporting',
    icon: '⚛️',
  },
  {
    name: 'HTML / CSS',
    level: 70,
    category: 'supporting',
    icon: '🎨',
  },
  {
    name: 'JavaScript',
    level: 65,
    category: 'supporting',
    icon: '🟨',
  },

  // Familiar - Aşina
  {
    name: 'SAP ABAP',
    level: 40,
    category: 'familiar',
    icon: '🔷',
  },
  {
    name: 'C#',
    level: 55,
    category: 'familiar',
    icon: '🟣',
  },
  {
    name: 'Git',
    level: 60,
    category: 'familiar',
    icon: '📝',
  },
  {
    name: 'Power BI',
    level: 45,
    category: 'familiar',
    icon: '📈',
  },
];

export const getSkillsByCategory = (category: Skill['category']) => {
  return skills.filter((skill) => skill.category === category);
};

export const coreSkills = getSkillsByCategory('core');
export const supportingSkills = getSkillsByCategory('supporting');
export const familiarSkills = getSkillsByCategory('familiar');
