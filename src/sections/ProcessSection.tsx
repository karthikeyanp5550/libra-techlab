import React, { useEffect, useRef } from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BotanicalDecor } from '../components/BotanicalDecor';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    icon: <Search size={26} />,
    title: 'DISCOVER',
    description: 'We understand your idea, goals and requirements.',
  },
  {
    number: '02',
    icon: <PenTool size={26} />,
    title: 'DESIGN',
    description: 'We design stunning interfaces and experiences.',
  },
  {
    number: '03',
    icon: <Code2 size={26} />,
    title: 'DEVELOP',
    description: 'We build high-performance, scalable and secure solutions.',
  },
  {
    number: '04',
    icon: <Rocket size={26} />,
    title: 'LAUNCH',
    description: 'We test, optimize and launch your project successfully.',
  },
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        '.process-title-anim',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(
        '.process-step-node',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-wrapper process-section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Enclosed Warm Banner Container */}
        <div
          ref={containerRef}
          style={{
            background: '#EDE8DE',
            borderRadius: '28px',
            border: '1px solid rgba(78, 94, 67, 0.12)',
            padding: 'clamp(3rem, 5.5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
            boxShadow: '0 12px 36px rgba(45, 55, 35, 0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Corner Botanical Accent */}
          <BotanicalDecor position="mid-right" opacity={0.4} scale={0.9} />

          {/* Section Header */}
          <div className="process-title-anim" style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              HOW WE <span className="accent">WORK</span>
            </h2>
          </div>

          {/* Process Flow Track Container */}
          <div className="process-steps-container" style={{ position: 'relative', width: '100%' }}>
            {/* Flowing Connecting SVG Path on Desktop */}
            <div
              className="process-connector-svg-wrap"
              style={{
                position: 'absolute',
                top: '36px',
                left: '8%',
                right: '8%',
                height: '40px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <svg width="100%" height="40" viewBox="0 0 900 40" fill="none" preserveAspectRatio="none">
                <path
                  className="process-curve-svg"
                  d="M 20 20 Q 225 5, 450 20 T 880 20"
                  stroke="#75876A"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  strokeOpacity="0.45"
                />
                {/* Mid-point connector beads */}
                <circle cx="235" cy="18" r="3" fill="#B89343" />
                <circle cx="450" cy="20" r="3" fill="#B89343" />
                <circle cx="665" cy="18" r="3" fill="#B89343" />
              </svg>
            </div>

            {/* 4 Steps Row */}
            <div
              className="process-steps-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.5rem',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {steps.map((step) => (
                <div key={step.number} className="process-step-node">
                  <div className="process-icon-wrap">
                    {step.icon}
                  </div>
                  <div className="process-step-num">{step.number}</div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .process-connector-svg-wrap {
            display: none !important;
          }
          .process-steps-row {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem 1.5rem !important;
          }
        }
        @media (max-width: 520px) {
          .process-steps-row {
            grid-template-columns: 1fr !important;
            gap: 2.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
