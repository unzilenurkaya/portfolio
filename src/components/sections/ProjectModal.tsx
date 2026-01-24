'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Project } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

// Helper function to highlight numbers in text (make them orange and bold)
function highlightNumbers(text: string): React.ReactNode {
  // Regex to match numbers with optional % or + signs
  const parts = text.split(/(\d+[\.,]?\d*[+%]?)/g);
  
  return parts.map((part, index) => {
    // Check if this part is a number (with optional % or +)
    if (/^\d+[\.,]?\d*[+%]?$/.test(part)) {
      return (
        <span key={index} className="text-secondary font-bold">
          {part}
        </span>
      );
    }
    return part;
  });
}

// Kategori ikonları
const categoryIcons: Record<string, string> = {
  'industrial': '⚙️',
  'business-ai': '🧠',
  'social': '💚',
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden"
      >
        <div className="h-full w-full bg-[#111111] rounded-3xl border border-white/10 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                {categoryIcons[project.category] || '📊'}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {project.title[language]}
                </h2>
                <Badge variant="outline" size="sm">
                  {t(`projects.filters.${project.category}`)}
                </Badge>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Description */}
            <div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description[language]}
              </p>
            </div>

            {/* PSR Grid - Problem, Solution, Result */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Problem */}
              {project.problem && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">❌</span>
                    <h3 className="text-red-400 font-semibold">
                      {t('projects.problem')}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {highlightNumbers(project.problem[language])}
                  </p>
                </motion.div>
              )}

              {/* Solution */}
              {project.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">💡</span>
                    <h3 className="text-blue-400 font-semibold">
                      {t('projects.solution')}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {highlightNumbers(project.solution[language])}
                  </p>
                </motion.div>
              )}

              {/* Result */}
              {project.result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">✅</span>
                    <h3 className="text-green-400 font-semibold">
                      {t('projects.result')}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {highlightNumbers(project.result[language])}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>🛠️</span>
                {t('projects.technologies')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const techs = Array.isArray(project.technologies) 
                    ? project.technologies 
                    : project.technologies[language];
                  return techs.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-white/5 text-white/80 border border-white/10 text-sm hover:bg-white/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Footer - Actions */}
          <div className="flex items-center justify-end gap-4 p-6 border-t border-white/10">
            {project.github && (
              <Button
                variant="outline"
                size="md"
                onClick={() => window.open(project.github, '_blank')}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('projects.viewCode')}
              </Button>
            )}
            {project.demo && (
              <Button
                variant="primary"
                size="md"
                onClick={() => window.open(project.demo, '_blank')}
              >
                {t('projects.liveDemo')} →
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
