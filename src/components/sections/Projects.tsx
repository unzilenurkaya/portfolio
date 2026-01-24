'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { projects, getProjectsByCategory } from '@/data/projects';
import { Project } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic import for ProjectModal
const ProjectModal = dynamic(() => import('./ProjectModal'), {
  ssr: false,
});

type FilterCategory = 'all' | 'industrial' | 'business-ai' | 'social';

const filterButtons: { key: FilterCategory; icon: string }[] = [
  { key: 'all', icon: '🔮' },
  { key: 'industrial', icon: '⚙️' },
  { key: 'business-ai', icon: '🧠' },
  { key: 'social', icon: '💚' },
];

// Kategori ikonları
const categoryIcons: Record<string, string> = {
  'industrial': '⚙️',
  'business-ai': '🧠',
  'social': '💚',
};

export default function Projects() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = getProjectsByCategory(activeFilter);

  return (
    <section id="projects" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterButtons.map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{t(`projects.filters.${filter.key}`)}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className="h-full cursor-pointer group hover:shadow-[0_0_30px_rgba(255,107,53,0.15)] hover:border-secondary/40 transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                  hover
                >
                  {/* Project Image - aspect-video (16:9) */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-6 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title[language]}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50 group-hover:scale-105 transition-transform duration-500">
                        {categoryIcons[project.category] || '📊'}
                      </div>
                    )}
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Sayısal Başarı Rozeti - Sol Alt */}
                    {project.badge && (
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-secondary/90 backdrop-blur-sm rounded-lg text-white text-sm font-bold shadow-lg shadow-secondary/30">
                        {typeof project.badge === 'string' ? project.badge : project.badge[language]}
                      </div>
                    )}
                    
                    {/* Hover Overlay - Sağ Alt */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        {t('projects.viewProject')} →
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-secondary transition-colors">
                        {project.title[language]}
                      </h3>
                      <Badge variant="default" size="sm" className="shrink-0">
                        {categoryIcons[project.category]} {t(`projects.filters.${project.category}`)}
                      </Badge>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2">
                      {project.description[language]}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(() => {
                        const techs = Array.isArray(project.technologies) 
                          ? project.technologies 
                          : project.technologies[language];
                        return (
                          <>
                            {techs.slice(0, 4).map((tech: string) => (
                              <span
                                key={tech}
                                className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                            {techs.length > 4 && (
                              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                                +{techs.length - 4}
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400">{t('projects.noProjects')}</p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
