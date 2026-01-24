'use client';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Timeline from '@/components/sections/Timeline';
import Education from '@/components/sections/Education';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Education />
      <Certificates />
      <Contact />
    </div>
  );
}
