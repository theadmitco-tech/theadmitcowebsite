import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sections = ['how-it-works', 'success-stories', 'services', 'resources', 'about'];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Special case for hero (top)
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'how-it-works', label: 'How it works' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'services', label: 'Services' },
    { id: 'resources', label: 'Resources' },
    { id: 'about', label: 'About' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-blue/80 backdrop-blur-md border-b border-brand-cream/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center transition-opacity hover:opacity-80 cursor-pointer"
        >
          <img
            src="/Main%20logo.svg"
            alt="The Admit Co. Logo"
            className="h-24 md:h-32 w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`small-caps transition-all duration-300 cursor-pointer text-left relative py-1
                ${activeSection === item.id
                  ? 'text-brand-cream font-bold'
                  : 'text-brand-cream/60 hover:text-brand-cream'
                }
              `}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-cream/40 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href="https://calendar.app.google/vC5Rx3vFJmPktLKu8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary py-2 px-5 text-sm whitespace-nowrap"
          >
            Get Your Profile Reviewed
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
