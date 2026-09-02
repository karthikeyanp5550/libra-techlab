import React, { useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  CheckCircle2,
  Database,
  RefreshCw,
  Wrench,
  Gauge,
  HardDriveDownload,
  Check,
  ArrowUpRight,
  Shield,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BotanicalDecor } from '../components/BotanicalDecor';

gsap.registerPlugin(ScrollTrigger);

export const SecuritySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const compCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // 1. Entrance animation for hero left
      gsap.fromTo(
        '.sec-left-anim',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sec-left-anim',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Entrance animation for right protective card
      if (heroCardRef.current) {
        gsap.fromTo(
          heroCardRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Maintenance items stagger
      gsap.fromTo(
        '.sec-maint-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sec-maint-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 4. Complimentary card
      if (compCardRef.current) {
        gsap.fromTo(
          compCardRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: compCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="security"
      ref={sectionRef}
      className="section-wrapper security-section"
      style={{
        position: 'relative',
        paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambience & Botanical Leaves */}
      <div className="bg-ambient-glow" style={{ top: '8%', left: '10%' }} />
      <div
        className="bg-ambient-glow"
        style={{
          bottom: '15%',
          right: '12%',
          background: 'radial-gradient(circle, rgba(117, 135, 106, 0.08) 0%, transparent 70%)',
        }}
      />
      <BotanicalDecor position="top-left" opacity={0.6} scale={1.1} />
      <BotanicalDecor position="bottom-right" opacity={0.5} scale={1.05} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* =========================================================================
            PART 1: HERO / MAIN TWO-COLUMN CONTENT
        ========================================================================= */}
        <div
          className="sec-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
            marginBottom: 'clamp(4rem, 7vw, 6.5rem)',
          }}
        >
          {/* Left Column: Title, Description, and 4 Security Items */}
          <div className="sec-left-anim">
            <span className="kicker">SECURITY & MAINTENANCE</span>

            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.025em',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              SECURE.
              <br />
              <span className="accent" style={{ color: 'var(--color-primary)' }}>
                UPDATED.
              </span>
              <br />
              RELIABLE.
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.075rem)',
                color: 'var(--text-body)',
                lineHeight: '1.7',
                marginBottom: '2.5rem',
                maxWidth: '540px',
              }}
            >
              Every website we build is developed with practical security and maintenance in mind. We help keep your
              website secure, updated and running smoothly after launch.
            </p>

            {/* 4 Simple Security Items (2x2 Grid) */}
            <div
              className="sec-items-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
              }}
            >
              {/* 1. SSL / HTTPS */}
              <div
                className="sec-mini-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(78, 94, 67, 0.13)',
                  borderRadius: '18px',
                  padding: '1.35rem 1.25rem',
                  boxShadow: '0 8px 24px rgba(50, 60, 40, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#FAF8F4',
                      border: '1px solid rgba(78, 94, 67, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <Lock size={18} />
                  </div>
                  <h3
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      color: 'var(--text-heading)',
                      margin: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    SSL / HTTPS
                  </h3>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  Secure connections for your website and visitors.
                </p>
              </div>

              {/* 2. Secure Access */}
              <div
                className="sec-mini-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(78, 94, 67, 0.13)',
                  borderRadius: '18px',
                  padding: '1.35rem 1.25rem',
                  boxShadow: '0 8px 24px rgba(50, 60, 40, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#FAF8F4',
                      border: '1px solid rgba(78, 94, 67, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <KeyRound size={18} />
                  </div>
                  <h3
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      color: 'var(--text-heading)',
                      margin: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    SECURE ACCESS
                  </h3>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  Authentication and access-control practices where required.
                </p>
              </div>

              {/* 3. Input Validation */}
              <div
                className="sec-mini-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(78, 94, 67, 0.13)',
                  borderRadius: '18px',
                  padding: '1.35rem 1.25rem',
                  boxShadow: '0 8px 24px rgba(50, 60, 40, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#FAF8F4',
                      border: '1px solid rgba(78, 94, 67, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={18} />
                  </div>
                  <h3
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      color: 'var(--text-heading)',
                      margin: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    INPUT VALIDATION
                  </h3>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  Protect forms and user inputs against common security risks.
                </p>
              </div>

              {/* 4. Data Protection */}
              <div
                className="sec-mini-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(78, 94, 67, 0.13)',
                  borderRadius: '18px',
                  padding: '1.35rem 1.25rem',
                  boxShadow: '0 8px 24px rgba(50, 60, 40, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#FAF8F4',
                      border: '1px solid rgba(78, 94, 67, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <Database size={18} />
                  </div>
                  <h3
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      color: 'var(--text-heading)',
                      margin: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    DATA PROTECTION
                  </h3>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  Follow secure practices when handling website information.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder-Style Protective Card */}
          <div ref={heroCardRef} className="sec-founder-card-wrapper" style={{ position: 'relative' }}>
            <div
              className="card-premium"
              style={{
                background: '#FAF8F4',
                border: '1.5px solid rgba(78, 94, 67, 0.14)',
                borderRadius: '24px',
                padding: 'clamp(2.25rem, 3.8vw, 3rem)',
                boxShadow: '0 16px 40px rgba(45, 55, 35, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Circular Emblem */}
              <div
                style={{
                  width: 'clamp(85px, 11vw, 105px)',
                  height: 'clamp(85px, 11vw, 105px)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D5C9B3 0%, #B8A88E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(78, 94, 67, 0.15)',
                  border: '3px solid #FAF8F4',
                  marginBottom: '1.5rem',
                  color: '#2A3524',
                }}
              >
                <ShieldCheck size={44} strokeWidth={1.8} />
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#1D231A',
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  lineHeight: '1.25',
                }}
              >
                WE PROTECT
                <br />
                YOUR DIGITAL PRESENCE
              </h3>

              {/* Gold Accent Divider */}
              <div
                style={{
                  width: '36px',
                  height: '2.5px',
                  background: 'var(--color-gold)',
                  borderRadius: '2px',
                  margin: '0.75rem auto 1.25rem auto',
                }}
              />

              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-body)',
                  lineHeight: '1.65',
                  marginBottom: '2rem',
                  maxWidth: '340px',
                }}
              >
                Security is considered throughout development, deployment and ongoing maintenance.
              </p>

              {/* Three Small Indicators */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  width: '100%',
                  borderTop: '1px solid rgba(78, 94, 67, 0.12)',
                  paddingTop: '1.5rem',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: 'var(--color-gold)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    01
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#1D231A',
                      textTransform: 'uppercase',
                    }}
                  >
                    SECURITY
                  </div>
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    borderLeft: '1px solid rgba(78, 94, 67, 0.1)',
                    borderRight: '1px solid rgba(78, 94, 67, 0.1)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: 'var(--color-gold)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    02
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#1D231A',
                      textTransform: 'uppercase',
                    }}
                  >
                    UPDATES
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: 'var(--color-gold)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    03
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#1D231A',
                      textTransform: 'uppercase',
                    }}
                  >
                    SUPPORT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 2: WEBSITE MAINTENANCE HORIZONTAL SECTION
        ========================================================================= */}
        <div style={{ marginBottom: 'clamp(4rem, 7vw, 6.5rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 4.5vw, 3.75rem)' }}>
            <span className="kicker">WEBSITE MAINTENANCE</span>
            <h2 className="section-title" style={{ maxWidth: '680px', margin: '0 auto 1rem auto' }}>
              WE KEEP YOUR WEBSITE <span className="accent">RUNNING SMOOTHLY.</span>
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.925rem, 1.2vw, 1.025rem)',
                color: 'var(--text-muted)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.65',
              }}
            >
              Websites need regular updates and technical care after launch. Our maintenance service helps keep your
              website stable, updated and performing well.
            </p>
          </div>

          {/* 4 Simple Maintenance Cards */}
          <div
            className="sec-maint-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.25rem',
            }}
          >
            {/* 1. Website Updates */}
            <div
              className="sec-maint-anim card-premium"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(78, 94, 67, 0.13)',
                borderRadius: '20px',
                padding: '1.85rem 1.5rem',
                boxShadow: '0 10px 30px rgba(50, 60, 40, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#F8F5EE',
                  border: '1px solid rgba(78, 94, 67, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <RefreshCw size={20} />
              </div>
              <h3
                style={{
                  fontSize: '0.975rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                WEBSITE UPDATES
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
                Regular updates to supported website components.
              </p>
            </div>

            {/* 2. Bug Fixes */}
            <div
              className="sec-maint-anim card-premium"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(78, 94, 67, 0.13)',
                borderRadius: '20px',
                padding: '1.85rem 1.5rem',
                boxShadow: '0 10px 30px rgba(50, 60, 40, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#F8F5EE',
                  border: '1px solid rgba(78, 94, 67, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <Wrench size={20} />
              </div>
              <h3
                style={{
                  fontSize: '0.975rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                BUG FIXES
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
                Fix technical issues that may appear after launch.
              </p>
            </div>

            {/* 3. Performance Checks */}
            <div
              className="sec-maint-anim card-premium"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(78, 94, 67, 0.13)',
                borderRadius: '20px',
                padding: '1.85rem 1.5rem',
                boxShadow: '0 10px 30px rgba(50, 60, 40, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#F8F5EE',
                  border: '1px solid rgba(78, 94, 67, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <Gauge size={20} />
              </div>
              <h3
                style={{
                  fontSize: '0.975rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                PERFORMANCE
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
                Check and improve website performance when required.
              </p>
            </div>

            {/* 4. Backup Checks */}
            <div
              className="sec-maint-anim card-premium"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(78, 94, 67, 0.13)',
                borderRadius: '20px',
                padding: '1.85rem 1.5rem',
                boxShadow: '0 10px 30px rgba(50, 60, 40, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#F8F5EE',
                  border: '1px solid rgba(78, 94, 67, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <HardDriveDownload size={20} />
              </div>
              <h3
                style={{
                  fontSize: '0.975rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                BACKUPS
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
                Maintain appropriate backup practices for supported websites.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 3: 3 MONTH COMPLIMENTARY MAINTENANCE HIGHLIGHTED CARD
        ========================================================================= */}
        <div style={{ maxWidth: '960px', margin: '0 auto clamp(3.5rem, 6vw, 5.5rem) auto' }}>
          <div
            ref={compCardRef}
            className="card-premium comp-card"
            style={{
              background: '#FAF8F4',
              border: '1.5px solid rgba(184, 147, 67, 0.35)',
              borderRadius: '24px',
              padding: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              boxShadow: '0 16px 40px rgba(78, 94, 67, 0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Badge */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(184, 147, 67, 0.12)',
                  border: '1px solid rgba(184, 147, 67, 0.3)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#9C7A2E',
                  textTransform: 'uppercase',
                }}
              >
                <Shield size={13} />
                INCLUDED WITH EVERY PROJECT
              </span>
            </div>

            <div
              className="comp-header-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'start',
                marginBottom: '2rem',
              }}
            >
              {/* Left Info */}
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.35rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: '1.15',
                    color: '#1D231A',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  3 MONTHS
                  <br />
                  <span style={{ color: 'var(--color-primary)' }}>COMPLIMENTARY MAINTENANCE</span>
                </h3>

                <p
                  style={{
                    fontSize: 'clamp(0.925rem, 1.2vw, 1.025rem)',
                    color: 'var(--text-body)',
                    lineHeight: '1.65',
                    margin: 0,
                  }}
                >
                  Every website developed by LIBRA TECHLAB includes 3 months of complimentary maintenance after launch.
                </p>
              </div>

              {/* Right Checklist */}
              <div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                  }}
                >
                  {[
                    'Basic security checks',
                    'Website updates',
                    'Bug fixes',
                    'Performance checks',
                    'Backup checks',
                    'Minor content updates',
                    'Basic technical support',
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-heading)',
                      }}
                    >
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'rgba(78, 94, 67, 0.12)',
                          color: 'var(--color-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Scope Note */}
            <div
              style={{
                borderTop: '1px solid rgba(78, 94, 67, 0.12)',
                paddingTop: '1.25rem',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                lineHeight: '1.55',
                fontStyle: 'italic',
              }}
            >
              Complimentary maintenance applies for the first 3 months after launch and is subject to the agreed project
              scope.
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 4: AFTER 3 MONTHS / CONTINUED SUPPORT
        ========================================================================= */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div
            className="maint-support-card"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(78, 94, 67, 0.14)',
              borderRadius: '24px',
              padding: 'clamp(2.25rem, 4vw, 3.25rem)',
              textAlign: 'center',
              boxShadow: '0 12px 32px rgba(45, 55, 35, 0.05)',
            }}
          >
            <span className="kicker">AFTER 3 MONTHS</span>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#1D231A',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              CONTINUED SUPPORT
            </h3>

            <p
              style={{
                fontSize: 'clamp(0.925rem, 1.2vw, 1.025rem)',
                color: 'var(--text-body)',
                lineHeight: '1.7',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
              }}
            >
              After the initial 3-month complimentary maintenance period, ongoing maintenance and technical support are
              available as a paid service based on website requirements.
            </p>

            <button
              onClick={scrollToContact}
              className="btn btn-primary maint-support-btn"
              style={{ padding: '0.9rem 2.2rem' }}
            >
              <span>GET MAINTENANCE SUPPORT</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .sec-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .sec-maint-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .comp-header-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .sec-items-grid {
            grid-template-columns: 1fr !important;
          }
          .sec-maint-grid {
            grid-template-columns: 1fr !important;
          }
          .card-premium.comp-card {
            padding: 1.5rem 1.15rem !important;
            border-radius: 20px !important;
          }
          .maint-support-card {
            padding: 1.75rem 1.15rem !important;
            border-radius: 20px !important;
          }
          .maint-support-btn {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0.85rem 1rem !important;
            font-size: 0.875rem !important;
            letter-spacing: 0.05em !important;
            white-space: normal !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem !important;
            box-sizing: border-box !important;
            border-radius: 9999px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SecuritySection;
