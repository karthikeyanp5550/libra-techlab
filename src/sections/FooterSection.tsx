import React from 'react';

export const FooterSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#EBE7DD',
        borderTop: '1px solid rgba(78, 94, 67, 0.14)',
        paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
        paddingBottom: '2.5rem',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container">
        {/* Main Footer 4-Column Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr 1.1fr 1fr',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div className="footer-col-brand">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ width: '32px', height: '32px' }}>
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
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#1D231A',
                    letterSpacing: '0.06em',
                  }}
                >
                  LIBRA
                </div>
                <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.22em', color: '#75876A' }}>
                  TECHLAB
                </div>
              </div>
            </a>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-body)',
                lineHeight: '1.65',
                maxWidth: '340px',
              }}
            >
              We create modern websites, web applications and AI-powered digital experiences that help businesses and
              individuals grow.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1D231A',
                marginBottom: '1.25rem',
              }}
            >
              QUICK LINKS
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Services', id: 'services' },
                { label: 'Process', id: 'process' },
                { label: 'About', id: 'about' },
                { label: 'Security & Maintenance', id: 'security' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      color: 'var(--text-body)',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1D231A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-col">
            <h4
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1D231A',
                marginBottom: '1.25rem',
              }}
            >
              SERVICES
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {[
                'AI Websites',
                'Business Websites',
                'E-Commerce',
                'Web Applications',
                'Portfolio Websites',
                'Student Projects',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('services');
                    }}
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      color: 'var(--text-body)',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1D231A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Follow Us */}
          <div className="footer-col">
            <h4
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1D231A',
                marginBottom: '1.25rem',
              }}
            >
              FOLLOW US
            </h4>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/_.karthiikz._/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-badge-link"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/karthikeyan-p-827888341"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-badge-link"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/karthikeyanp5550"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-badge-link"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918939315550"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-badge-link"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="M9.5 9c.2 0 .4.1.5.3l.8 1.8c.1.2.1.4 0 .6l-.5.6c.4.8 1.1 1.5 1.9 1.9l.6-.5c.2-.1.4-.1.6 0l1.8.8c.2.1.3.3.3.5 0 .8-.6 1.5-1.4 1.5-3.3 0-6-2.7-6-6 0-.8.7-1.4 1.4-1.5z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(78, 94, 67, 0.12)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © 2026 <strong style={{ color: '#1D231A' }}>LIBRA TECHLAB</strong>. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a
              href="#privacy"
              onClick={(e) => e.preventDefault()}
              style={{ textDecoration: 'none', color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1D231A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="#terms"
              onClick={(e) => e.preventDefault()}
              style={{ textDecoration: 'none', color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1D231A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .social-badge-link {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FAF8F4;
          border: 1px solid rgba(78, 94, 67, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3A4732;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .social-badge-link:hover {
          transform: translateY(-3px);
          background: #4E5E43;
          color: #FFFFFF;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
