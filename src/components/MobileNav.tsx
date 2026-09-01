import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'services', label: 'SERVICES' },
    { id: 'process', label: 'PROCESS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'security', label: 'SECURITY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(244, 241, 234, 0.98)',
        backdropFilter: 'blur(20px)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        animation: 'fadeInMobile 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px' }}>
            <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
              <path
                d="M14 10V36C14 37.1 14.9 38 16 38H36"
                stroke="#4E5E43"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="14" cy="10" r="3.5" fill="#B89343" />
              <circle cx="36" cy="38" r="3.5" fill="#B89343" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#1D231A' }}>
              LIBRA
            </div>
            <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.22em', color: '#75876A' }}>
              TECHLAB
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(78, 94, 67, 0.15)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1D231A',
            cursor: 'pointer',
          }}
          aria-label="Close navigation menu"
        >
          <X size={22} />
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1, justifyContent: 'center' }}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
              onClose();
            }}
            style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: activeSection === item.id ? '#4E5E43' : '#2A3225',
              padding: '0.4rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(78, 94, 67, 0.08)',
            }}
          >
            <span>{item.label}</span>
            {activeSection === item.id && (
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B89343' }} />
            )}
          </a>
        ))}
      </nav>

      <div style={{ paddingTop: '1.5rem' }}>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('contact');
            onClose();
          }}
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem' }}
        >
          START A PROJECT <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
};
