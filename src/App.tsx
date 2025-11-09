// src/App.tsx

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ThreeDBot from './components/ThreeDBot'; // 1. Import Bot กลับเข้ามา
import type { SectionId } from './types';         // 2. Import Type ที่เราแยกไว้

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  // --- "สมอง" (useEffect) ฉบับแก้ไขที่ป้องกันหน้าจอขาว ---
  useEffect(() => {
    const sectionIds: SectionId[] = ['home', 'about', 'skills', 'projects'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      
      // *** นี่คือจุดที่แก้ไข ***
      // เราย้ายการ "ค้นหา" มาไว้ข้างในนี้
      // เพื่อให้แน่ใจว่ามันจะหาเจอหลังจากที่หน้าเว็บโหลดเสร็จแล้ว
      const sections = sectionIds.map(id => document.getElementById(id));
      
      let currentSection: SectionId = 'home';

      for (const section of sections) {
        if (section) { // เช็คว่าหาเจอ (กัน Error)
          const sectionTop = section.offsetTop - innerHeight / 2; 
          if (scrollY >= sectionTop) {
            currentSection = section.id as SectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // [] หมายความว่าให้ "สมอง" นี้ทำงานแค่ครั้งเดียวตอนเปิดหน้า


  return (
    <div className="bg-[#0a192f] text-slate-200">
      <Navbar />

      <main className="container mx-auto px-8 md:px-14 lg:px-24 w-full">
        {/* Component เหล่านี้ต้องมี id="home", "about", "skills", "projects" */}
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>

      <Footer />
      
      {/* 3. เรียกใช้ Bot และส่ง "คำสั่ง" (activeSection) ไปให้มัน */}
      <ThreeDBot currentSection={activeSection} />
    </div>
  );
}

export default App;

