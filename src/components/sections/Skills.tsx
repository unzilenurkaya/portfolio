'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { coreSkills, dataAiSkills, webSkills } from '@/data/skills';
import { Skill } from '@/types';

// Simple Icons imports
import {
  SiPython,
  SiPostgresql,
  SiGit,
  SiPandas,
  SiScikitlearn,
  SiStreamlit,
  SiNumpy,
  SiOpenai,
  SiReact,
  SiJavascript,
  SiHtml5,
} from 'react-icons/si';
import { FaServer, FaChartBar } from 'react-icons/fa';
import { VscTerminal } from 'react-icons/vsc';

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  python: SiPython,
  postgresql: SiPostgresql,
  git: SiGit,
  api: FaServer,
  pandas: SiPandas,
  scikitlearn: SiScikitlearn,
  streamlit: SiStreamlit,
  numpy: SiNumpy,
  openai: SiOpenai,
  react: SiReact,
  javascript: SiJavascript,
  html5: SiHtml5,
  powerbi: FaChartBar,
};

// Skill Card Component with Simple Icons
function SkillCard({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const IconComponent = skill.icon ? iconMap[skill.icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300 cursor-default border border-transparent hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/10"
    >
      {/* Icon - White default, orange on hover */}
      <div className="flex justify-center mb-3">
        {IconComponent && (
          <IconComponent className="w-8 h-8 text-white/80 group-hover:text-secondary transition-colors duration-300" />
        )}
      </div>
      {/* Skill Name */}
      <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}

// Skill Box Component - Dikey Kutu
function SkillBox({
  title,
  description,
  skills,
  accentColor,
  delay = 0,
}: {
  title: string;
  description: string;
  skills: Skill[];
  accentColor: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card rounded-3xl p-6 border border-white/10 hover:border-${accentColor}/30 transition-all duration-300`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} delay={delay + index * 0.05} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Main Grid: Stats + 3 Skill Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Card - Sol taraf */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-300 flex flex-col justify-center"
          >
            <div className="text-center space-y-6">
              {/* Terminal Icon - Turuncu */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20">
                <VscTerminal className="w-8 h-8 text-secondary" />
              </div>

              {/* Stats - Turuncu ve Bold */}
              <div>
                <div className="text-5xl font-bold text-secondary mb-2">3</div>
                <p className="text-gray-400">{t('skills.stats.internship')}</p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

              <div>
                <div className="text-4xl font-bold text-secondary mb-1">3</div>
                <p className="text-gray-500 text-sm">{t('skills.stats.projects')}</p>
              </div>
            </div>
          </motion.div>

          {/* Kutu 1: Temel Yetkinlikler */}
          <SkillBox
            title={t('skills.core')}
            description={t('skills.coreDescription')}
            skills={coreSkills}
            accentColor="primary"
            delay={0.1}
          />

          {/* Kutu 2: Veri Bilimi & Yapay Zekâ */}
          <SkillBox
            title={t('skills.dataAi')}
            description={t('skills.dataAiDescription')}
            skills={dataAiSkills}
            accentColor="secondary"
            delay={0.2}
          />

          {/* Kutu 3: Web & Görselleştirme */}
          <SkillBox
            title={t('skills.web')}
            description={t('skills.webDescription')}
            skills={webSkills}
            accentColor="accent-cyan"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
