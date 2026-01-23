'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { coreSkills, supportingSkills, familiarSkills } from '@/data/skills';
import SkillBar from '@/components/ui/SkillBar';

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
          {/* Core Skills - Large Card */}
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
                  {t('skills.core')}
                </h3>
                <p className="text-sm text-gray-500">Main expertise areas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreSkills.map((skill, index) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="text-2xl">{skill.icon}</span>
                  <div className="flex-1">
                    <SkillBar
                      name={skill.name}
                      level={skill.level}
                      delay={index * 0.1}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border border-white/10 hover:border-accent-cyan/30 transition-all duration-300 flex flex-col justify-center"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-cyan/20 text-accent-cyan text-3xl">
                💻
              </div>
              <div>
                <div className="text-5xl font-serif text-white mb-2">3+</div>
                <p className="text-gray-400">Staj Deneyimi</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
              <div>
                <div className="text-3xl font-serif text-white mb-1">15+</div>
                <p className="text-gray-500 text-sm">Tamamlanan Proje</p>
              </div>
            </div>
          </motion.div>

          {/* Supporting Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-xl">
                🔧
              </div>
              <h3 className="text-lg font-semibold text-white">
                {t('skills.supporting')}
              </h3>
            </div>

            <div className="space-y-4">
              {supportingSkills.map((skill, index) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className="text-lg">{skill.icon}</span>
                  <div className="flex-1">
                    <SkillBar
                      name={skill.name}
                      level={skill.level}
                      delay={index * 0.1}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Familiar Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 glass-card rounded-3xl p-8 border border-white/10 hover:border-accent-lime/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-lime/20 flex items-center justify-center text-xl">
                📚
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {t('skills.familiar')}
                </h3>
                <p className="text-sm text-gray-500">Learning & exploring</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {familiarSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors cursor-default"
                >
                  <span className="text-2xl mb-2 block">{skill.icon}</span>
                  <span className="text-sm text-white/80">{skill.name}</span>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-lime to-accent-cyan"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
