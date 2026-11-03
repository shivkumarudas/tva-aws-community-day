import React from 'react';
import { ArchitectOfTimeHero } from '../hero/ArchitectOfTimeHero';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  return (
    <section id="home" className="relative w-full min-h-screen bg-[#100F0C] overflow-hidden">
      <ArchitectOfTimeHero
        onRegisterClick={onRegisterClick}
        onExploreClick={onExploreClick}
        isIntroScene={false}
      />
    </section>
  );
};
