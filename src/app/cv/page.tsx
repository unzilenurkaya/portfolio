'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { skills } from '@/data/skills';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';
import { socialLinks } from '@/data/social';
import Image from 'next/image';
import Link from 'next/link';

export default function CVPage() {
  const { t, language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.open('/cv.pdf', '_blank');
  };

  const educations = experiences.filter((e) => e.type === 'education');
  const internships = experiences.filter((e) => e.type === 'internship');
  const backendSkills = skills.filter((s) => s.category === 'backend');
  const dataAiSkills = skills.filter((s) => s.category === 'data-ai');

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 print:bg-white print:pt-0 print:pb-0">
      {/* Action Buttons - Hidden on print */}
      <div className="max-w-4xl mx-auto px-6 mb-8 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
          </Link>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              {t('cv.print')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-primary text-black text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('cv.download')}
            </motion.button>
          </div>
        </div>
      </div>

      {/* CV Content */}
      <div className="max-w-4xl mx-auto px-6 print:px-8 print:max-w-none">
        <div className="bg-[#111] rounded-3xl border border-white/10 p-8 md:p-12 print:bg-white print:border-none print:rounded-none print:p-0 print:text-black">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 pb-8 border-b border-white/10 print:border-gray-200">
            {/* Profile Photo */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/50 flex-shrink-0 relative print:border-gray-300">
              <Image
                src="/images/profile-pic.png"
                alt="Ünzile Nur KAYA"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 print:text-black">
                Ünzile Nur KAYA
              </h1>
              <p className="text-primary text-lg mb-4 print:text-gray-700">
                {t('hero.title')}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400 print:text-gray-600">
                <a href="mailto:unzileenurkaya@gmail.com" className="flex items-center gap-1 hover:text-white print:text-black">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  unzileenurkaya@gmail.com
                </a>
                <a href="https://linkedin.com/in/unzilenurkaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white print:text-black">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://github.com/unzilenurkaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white print:text-black">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-10">
            <p className="text-gray-300 leading-relaxed print:text-gray-700">
              {t('about.description')}
            </p>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Column - Skills */}
            <div className="md:col-span-1 space-y-8">
              {/* Skills */}
              <section>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                  <svg className="w-5 h-5 text-primary print:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {t('cv.skills')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2 print:text-gray-600">{t('skills.backend')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {backendSkills.map((skill) => (
                        <span key={skill.name} className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary print:bg-gray-200 print:text-gray-700">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2 print:text-gray-600">{t('skills.dataAi')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {dataAiSkills.map((skill) => (
                        <span key={skill.name} className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 print:bg-gray-100 print:text-gray-600">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                  <svg className="w-5 h-5 text-primary print:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {language === 'tr' ? 'Diller' : 'Languages'}
                </h2>
                <ul className="space-y-2 text-sm text-gray-300 print:text-gray-700">
                  <li className="flex justify-between">
                    <span>{language === 'tr' ? 'Türkçe' : 'Turkish'}</span>
                    <span className="text-gray-500">{language === 'tr' ? 'Ana Dil' : 'Native'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{language === 'tr' ? 'İngilizce' : 'English'}</span>
                    <span className="text-gray-500">{language === 'tr' ? 'Orta Seviye' : 'Intermediate'}</span>
                  </li>
                </ul>
              </section>
            </div>

            {/* Right Column - Experience & Education */}
            <div className="md:col-span-2 space-y-8">
              {/* Education */}
              <section>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                  <svg className="w-5 h-5 text-primary print:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  {t('cv.education')}
                </h2>
                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-primary/50 pl-4 print:border-gray-300">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h3 className="text-white font-medium print:text-black">{edu.company[language]}</h3>
                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded print:bg-gray-100">{edu.period}</span>
                      </div>
                      <p className="text-primary text-sm print:text-gray-600">{edu.role[language]}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                  <svg className="w-5 h-5 text-primary print:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('cv.experience')}
                </h2>
                <div className="space-y-6">
                  {internships.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-accent-cyan/50 pl-4 print:border-gray-300">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h3 className="text-white font-medium print:text-black">{exp.company[language]}</h3>
                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded print:bg-gray-100">{exp.period}</span>
                      </div>
                      <p className="text-accent-cyan text-sm mb-2 print:text-gray-600">{exp.role[language]}</p>
                      <p className="text-gray-400 text-sm print:text-gray-600">{exp.description[language]}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                  <svg className="w-5 h-5 text-primary print:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  {t('cv.projects')}
                </h2>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="bg-white/5 rounded-xl p-4 print:bg-gray-50 print:border print:border-gray-200">
                      <h3 className="text-white font-medium mb-1 print:text-black">{project.title[language]}</h3>
                      <p className="text-gray-400 text-sm mb-2 print:text-gray-600">{project.description[language]}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-xs text-primary print:text-gray-600">#{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          nav, footer, .cookie-banner {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
