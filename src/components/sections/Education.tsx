'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { educations } from '@/data/experience';

export default function Education() {
    const { t, language } = useLanguage();

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'education':
                return '🎓';
            case 'internship':
                return '💼';
            case 'work':
                return '🏢';
            default:
                return '📌';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'education':
                return 'from-accent-cyan to-blue-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const getTypeBorderColor = (type: string) => {
        switch (type) {
            case 'education':
                return 'border-accent-cyan/30 hover:border-accent-cyan/50';
            default:
                return 'border-white/10 hover:border-white/20';
        }
    };

    return (
        <section id="education" className="py-24 relative overflow-hidden bg-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        {t('education.title')}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t('education.subtitle')}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line - Neon Effect */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/50 to-transparent" />
                        <motion.div
                            className="absolute inset-x-0 h-full bg-gradient-to-b from-accent-cyan via-blue-500 to-primary"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            style={{ transformOrigin: 'top' }}
                        />
                        {/* Neon Glow */}
                        <div className="absolute inset-x-0 h-full bg-gradient-to-b from-accent-cyan via-blue-500 to-primary blur-sm opacity-50" />
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-12">
                        {educations.map((exp, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            className={`w-16 h-16 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center text-2xl shadow-lg ${getTypeBorderColor(exp.type)}`}
                                        >
                                            <div
                                                className={`absolute inset-1 rounded-full bg-gradient-to-br ${getTypeColor(exp.type)} opacity-20`}
                                            />
                                            <span className="relative z-10">{getTypeIcon(exp.type)}</span>
                                        </motion.div>
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        className={`w-full md:w-[calc(50%-4rem)] ml-24 md:ml-0 ${isLeft ? 'md:pr-8' : 'md:pl-8'
                                            }`}
                                    >
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            className={`glass-card rounded-2xl p-6 border ${getTypeBorderColor(exp.type)} transition-all duration-300`}
                                        >
                                            {/* Period Badge */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span
                                                    className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} bg-opacity-20 text-white`}
                                                >
                                                    {exp.period}
                                                </span>
                                                <span className="text-xs text-gray-500 uppercase tracking-wider">
                                                    {t(`experience.${exp.type}`)}
                                                </span>
                                            </div>

                                            {/* Company & Role */}
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                {exp.company[language]}
                                            </h3>
                                            <p className="text-primary font-medium text-sm mb-3">
                                                {exp.role[language]}
                                            </p>

                                            {/* Description */}
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {exp.description[language]}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block w-[calc(50%-4rem)]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
