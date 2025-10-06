import React from 'react';
import { ModeToggle } from './ThemeToggler';

const Navbar = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl text-gray-900 font-semibold dark:text-white">Anirudh S</span>
          <div className="flex items-center space-x-4 text-gray-900 dark:text-white">
            <a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a>
            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Projects</a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;