'use client';

import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/90">{name}</span>
        <span className="text-sm text-white/60">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}
