import React, { useEffect, useState } from 'react';
import { initSmoothScroll } from './utils/smoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProcessSection } from './sections/ProcessSection';
import { AboutSection } from './sections/AboutSection';
import { SecuritySection } from './sections/SecuritySection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const cleanupScroll = initSmoothScroll();

    // 2. Active Section Spy for Single Page
    const sections = ['hero', 'services', 'process', 'about', 'security', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);

    return () => {
      cleanupScroll();
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  return (
    <div className="app-root">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Header Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Single-Page Static Main Content */}
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <SecuritySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default App;
