import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CinematicIntro } from './components/CinematicIntro/CinematicIntro';
import { MissMinutes } from './components/MissMinutes/MissMinutes';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { TVADashboard } from './components/sections/TVADashboard';
import { AboutSection } from './components/sections/AboutSection';
import { AgendaSection } from './components/sections/AgendaSection';
import { SpeakersSection } from './components/sections/SpeakersSection';
import { MissionsSection } from './components/sections/MissionsSection';
import { SponsorsSection } from './components/sections/SponsorsSection';
import { RegistrationSection } from './components/sections/RegistrationSection';
import { GallerySection } from './components/sections/GallerySection';
import { FAQSection } from './components/sections/FAQSection';
import { Footer } from './components/layout/Footer';
import { soundManager } from './utils/sound';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Check if user has already watched the intro in this session or skipped via URL param
    try {
      if (typeof window !== 'undefined') {
        if (window.location.search.includes('skipIntro=true') || window.location.hash === '#home') {
          return false;
        }
        const watched = sessionStorage.getItem('TVA_INTRO_WATCHED_2026');
        return watched !== 'true';
      }
    } catch {}
    return true;
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Track active section for navigation underline and Miss Minutes contextual dialogues
  useEffect(() => {
    const sections = ['home', 'about', 'dashboard', 'agenda', 'speakers', 'workshops', 'sponsors', 'register', 'gallery', 'faq', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('TVA_INTRO_WATCHED_2026', 'true');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayIntro = () => {
    soundManager.playAnalogClick(800, 0.05);
    setShowIntro(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#100F0C] text-[#E8DFCA]">
      {/* Cinematic Full-Screen Opening Sequence */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Main Website Homepage */}
      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar
          activeSection={activeSection}
          onReplayIntro={handleReplayIntro}
          onNavigateToRegister={() => scrollToSection('register')}
        />

        <main>
          <Hero
            onRegisterClick={() => scrollToSection('register')}
            onExploreClick={() => scrollToSection('dashboard')}
          />

          <TVADashboard
            onNavigate={(target) => scrollToSection(target)}
          />

          <AboutSection />

          <AgendaSection />

          <SpeakersSection />

          <MissionsSection
            onRegisterMission={() => scrollToSection('register')}
          />

          <SponsorsSection />

          <RegistrationSection />

          <GallerySection />

          <FAQSection />
        </main>

        <Footer onReplayIntro={handleReplayIntro} />

        {/* Miss Minutes Interactive Website Mascot */}
        {!showIntro && (
          <MissMinutes
            currentSection={activeSection}
            onNavigate={scrollToSection}
          />
        )}
      </div>
    </div>
  );
};

export default App;
