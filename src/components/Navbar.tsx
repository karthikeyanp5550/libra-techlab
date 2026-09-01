import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import { MobileNav } from './MobileNav';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar-container" aria-label="Main Navigation">
          {/* Left Brand Logo */}
          <a
            href="#hero"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
          >
            <div className="brand-logo-icon">
              <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
                <path
                  d="M12 8V38C12 39.1 12.9 40 14 40H38"
                  stroke="#4E5E43"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="8" r="3.5" fill="#B89343" />
                <circle cx="38" cy="40" r="3.5" fill="#B89343" />
              </svg>
            </div>
            <div className="brand-logo-text">
              <span className="brand-logo-name">LIBRA</span>
              <span className="brand-logo-sub">TECHLAB</span>
            </div>
          </a>

          {/* Navigation Links */}
          <ul className="nav-links-list">
            <li className="nav-link-item">
              <a
                href="#hero"
                className={activeSection === 'hero' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
              >
                HOME
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#services"
                className={activeSection === 'services' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
              >
                SERVICES
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#process"
                className={activeSection === 'process' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('process');
                }}
              >
                PROCESS
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#about"
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                ABOUT
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#security"
                className={activeSection === 'security' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('security');
                }}
              >
                SECURITY
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#contact"
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                CONTACT
              </a>
            </li>
          </ul>

          {/* Right Action & Mobile Toggle */}
          <div className="nav-actions">
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={15} />
            </a>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={(id) => scrollToSection(id)}
      />
    </>
  );
};
