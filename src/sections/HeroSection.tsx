import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import gsap from 'gsap';
import ThreeCubeCanvas from '../components/ThreeCubeCanvas';
import { BotanicalDecor } from '../components/BotanicalDecor';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const visualGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-kicker-anim', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
      .from('.hero-heading-line', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      }, '-=0.5')
      .from('.hero-desc-anim', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-btns-anim', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from(visualGroupRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, '-=1.0');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(7.5rem, 12vh, 9.5rem)',
        paddingBottom: 'clamp(3rem, 6vh, 5.5rem)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambience & Botanical Leaves */}
      <div className="bg-ambient-glow" style={{ top: '10%', left: '20%' }} />
      <div className="bg-ambient-glow" style={{ bottom: '10%', right: '15%', background: 'radial-gradient(circle, rgba(117, 135, 106, 0.08) 0%, transparent 70%)' }} />
      <BotanicalDecor position="top-left" opacity={0.65} scale={1.15} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            alignItems: 'center',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          {/* Left Column: Hero Text Content */}
          <div ref={textGroupRef} className="hero-text-content">
            <div className="hero-kicker-anim">
              <span className="kicker">DIGITAL SOLUTIONS THAT EMPOWER</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-heading-line" style={{ display: 'block' }}>WE BUILD</span>
              <span className="hero-heading-line highlight-digital">DIGITAL</span>
              <span className="hero-heading-line" style={{ display: 'block' }}>EXPERIENCES</span>
            </h1>

            <div className="hero-desc-anim">
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.25vw, 1.075rem)',
                  color: 'var(--text-body)',
                  maxWidth: '490px',
                  lineHeight: '1.65',
                  marginBottom: '2rem',
                }}
              >
                We create modern websites, web applications and AI-powered digital experiences that help businesses grow.
              </p>
            </div>

            <div
              className="hero-btns-anim"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={scrollToContact}
                className="btn btn-primary"
                style={{ padding: '0.875rem 1.85rem' }}
              >
                <span>START A PROJECT</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={scrollToServices}
                className="btn btn-secondary"
                style={{ padding: '0.875rem 1.75rem' }}
              >
                <span>VIEW OUR WORK</span>
                <span className="btn-icon-circle">
                  <Play size={10} fill="currentColor" style={{ marginLeft: '1px' }} />
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Abstract Cube Cluster Visual */}
          <div
            ref={visualGroupRef}
            className="hero-visual-wrapper"
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(420px, 52vw, 650px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
        <ThreeCubeCanvas />
        </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-text-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-btns-anim {
            justify-content: center;
          }
          .hero-visual-wrapper {
            height: 420px !important;
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
};
