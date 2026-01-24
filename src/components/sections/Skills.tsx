'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  backendSkills,
  processingSkills,
  mlSkills,
  llmSkills,
  experiencedSkills,
} from '@/data/skills';
import { Skill } from '@/types';

// Reusable Skill Card Component - Grid Kart Yapısı
function SkillCard({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300 cursor-default border border-transparent hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/10"
    >
      {/* Icon - Beyaz default, hover'da turuncu */}
      <span className="text-2xl mb-2 block filter grayscale group-hover:grayscale-0 group-hover:drop-shadow-[0_0_8px_rgba(255,107,53,0.5)] transition-all duration-300">
        {skill.icon}
      </span>
      {/* Skill Name */}
      <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}

// Sub-block Component for Data & AI section
function DataAiSubBlock({
  title,
  skills,
  icon,
  baseDelay = 0,
}: {
  title: string;
  skills: Skill[];
  icon: string;
  baseDelay?: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} delay={baseDelay + index * 0.05} />
        ))}
      </div>
    </div>
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* GRUP 1: Backend & Core - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 glass-card rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                🎯
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {t('skills.backend')}
                </h3>
                <p className="text-sm text-gray-500">{t('skills.backendDescription')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {backendSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Quick Stats Card - 3 Staj, 3 Proje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border border-white/10 hover:border-accent-cyan/30 transition-all duration-300 flex flex-col justify-center"
          >
            <div className="text-center space-y-4">
              {/* Terminal Icon - Modern Turuncu */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary text-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <div>
                <div className="text-5xl font-serif text-white mb-2">3</div>
                <p className="text-gray-400">{t('skills.stats.internship')}</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
              <div>
                <div className="text-3xl font-serif text-white mb-1">3</div>
                <p className="text-gray-500 text-sm">{t('skills.stats.projects')}</p>
              </div>
            </div>
          </motion.div>

          {/* GRUP 2: Veri & Yapay Zeka Araçları - 3 Alt Blok */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-3xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-xl">
                🔧
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {t('skills.dataAi')}
                </h3>
                <p className="text-sm text-gray-500">{t('skills.dataAiDescription')}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* 📊 Veri İşleme */}
              <DataAiSubBlock
                title={t('skills.processing')}
                skills={processingSkills}
                icon="📊"
                baseDelay={0}
              />

              {/* 🤖 Makine Öğrenmesi */}
              <DataAiSubBlock
                title={`${t('skills.ml')} (${t('skills.mlLevel')})`}
                skills={mlSkills}
                icon="🤖"
                baseDelay={0.15}
              />

              {/* 🧠 LLM & AI Araçları */}
              <DataAiSubBlock
                title={t('skills.llm')}
                skills={llmSkills}
                icon="🧠"
                baseDelay={0.25}
              />
            </div>
          </motion.div>

          {/* GRUP 3: Deneyim Kazanılan Teknolojiler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-3xl p-8 border border-white/10 hover:border-accent-lime/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-lime/20 flex items-center justify-center text-xl">
                📚
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {t('skills.experienced')}
                </h3>
                <p className="text-sm text-gray-500 text-xs">{t('skills.experiencedDescription')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {experiencedSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
