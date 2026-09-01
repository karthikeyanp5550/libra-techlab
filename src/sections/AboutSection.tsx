import React, { useEffect, useRef } from 'react';
import { FolderGit2, Users, Calendar, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatCounter } from '../components/StatCounter';
import { BotanicalDecor } from '../components/BotanicalDecor';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const founderCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-left-anim',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-left-anim',
            start: 'top 85%',
            once: true,
          },
        }
      );

      if (founderCardRef.current) {
        gsap.fromTo(
          founderCardRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: founderCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-wrapper about-section" style={{ position: 'relative' }}>
      <BotanicalDecor position="bottom-right" opacity={0.5} scale={1.05} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: About Info & Stats */}
          <div className="about-left-anim">
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              ABOUT LIBRA <span className="accent">TECHLAB</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.075rem)',
                color: 'var(--text-body)',
                lineHeight: '1.7',
                marginBottom: '3rem',
                maxWidth: '540px',
              }}
            >
              LIBRA TECHLAB is a digital development studio creating modern websites, web applications and AI-powered digital experiences for businesses, creators and students.
            </p>

            {/* 4 Stats Grid */}
            <div
              className="about-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.25rem',
              }}
            >
              <StatCounter
                end={10}
                suffix="+"
                label="PROJECTS"
                icon={<FolderGit2 size={24} color="#4E5E43" />}
              />

              <StatCounter
                end={8}
                suffix="+"
                label="CLIENTS"
                icon={<Users size={24} color="#4E5E43" />}
              />

              <StatCounter
                end={2}
                suffix="+"
                label="YEARS"
                icon={<Calendar size={24} color="#4E5E43" />}
              />

              <StatCounter
                end={100}
                suffix="%"
                label="DEDICATION"
                icon={<Target size={24} color="#4E5E43" />}
              />
            </div>
          </div>

          {/* Right Column: Founder Card */}
          <div
            ref={founderCardRef}
            className="founder-card-wrapper"
            style={{ position: 'relative' }}
          >
            <div
              className="founder-card-box"
              style={{
                background: '#FAF8F4',
                border: '1.5px solid rgba(78, 94, 67, 0.14)',
                borderRadius: '24px',
                padding: 'clamp(2rem, 3.5vw, 2.75rem)',
                boxShadow: '0 16px 40px rgba(45, 55, 35, 0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 3vw, 2.25rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Founder Profile Image */}
              <div
                className="founder-avatar-circle"
                style={{
                  width: 'clamp(105px, 15vw, 135px)',
                  height: 'clamp(105px, 15vw, 135px)',
                  borderRadius: '50%',
                  background: '#EAE6DC',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 8px 24px rgba(78, 94, 67, 0.15)',
                  border: '2.5px solid #FAF8F4',
                  position: 'relative',
                }}
              >
                <img
                  src="/assets/profile.png"
                  alt="Karthikeyan - Founder & Developer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 12%',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Founder Details */}
              <div className="founder-details" style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#1D231A',
                    margin: '0 0 0.25rem 0',
                    textTransform: 'uppercase',
                  }}
                >
                  KARTHIKEYAN
                </h3>

                <div
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--color-gold)',
                    letterSpacing: '0.06em',
                    marginBottom: '0.75rem',
                  }}
                >
                  Founder & Developer
                </div>

                <div
                  style={{
                    width: '32px',
                    height: '2.5px',
                    background: 'var(--color-gold)',
                    borderRadius: '2px',
                    marginBottom: '1rem',
                  }}
                />

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-body)',
                    lineHeight: '1.55',
                    marginBottom: '1.25rem',
                  }}
                >
                  Passionate about technology and creating digital solutions that make an impact.
                </p>

                <div className="signature-text" style={{ fontSize: '2.4rem', color: '#2E3827' }}>
                  Karthikeyan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .stat-icon-wrap {
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-number {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2.8vw, 2.25rem);
          font-weight: 800;
          color: var(--text-heading);
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .stat-suffix {
          color: var(--color-primary);
        }
        .stat-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            margin-bottom: 1rem;
          }
        }
        @media (max-width: 600px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem 1rem !important;
          }
          .founder-card-box {
            flex-direction: column !important;
            text-align: center !important;
          }
          .founder-details {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
