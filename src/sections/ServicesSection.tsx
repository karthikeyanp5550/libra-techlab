import React, { useEffect, useRef } from 'react';
import { Bot, Monitor, ShoppingBag, Code, User, GraduationCap, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  align: 'left' | 'right';
}

const servicesData: ServiceData[] = [
  {
    number: '01',
    icon: <Bot size={22} />,
    title: 'AI WEBSITES',
    description: 'Intelligent websites designed with modern AI-powered experiences.',
    features: ['AI Experiences', 'Smart Interfaces', 'Automation'],
    align: 'left',
  },
  {
    number: '02',
    icon: <Monitor size={22} />,
    title: 'BUSINESS WEBSITES',
    description: 'Professional digital websites designed to build trust and grow businesses.',
    features: ['Modern Design', 'Business Branding', 'Responsive Experience'],
    align: 'right',
  },
  {
    number: '03',
    icon: <ShoppingBag size={22} />,
    title: 'E-COMMERCE',
    description: 'Modern online stores designed for smooth shopping experiences.',
    features: ['Product Experience', 'Shopping Flow', 'Conversion Focus'],
    align: 'left',
  },
  {
    number: '04',
    icon: <Code size={22} />,
    title: 'WEB APPLICATIONS',
    description: 'Custom web applications built around specific business needs.',
    features: ['Custom Solutions', 'Interactive UI', 'Scalable Experience'],
    align: 'right',
  },
  {
    number: '05',
    icon: <User size={22} />,
    title: 'PORTFOLIO WEBSITES',
    description: 'Premium portfolio websites that present work and personal brands.',
    features: ['Personal Branding', 'Project Showcase', 'Creative Interaction'],
    align: 'left',
  },
  {
    number: '06',
    icon: <GraduationCap size={22} />,
    title: 'STUDENT PROJECTS',
    description: 'Project support for students from development to final presentation.',
    features: ['Project Development', 'Documentation', 'Presentation Support'],
    align: 'right',
  },
];

const ServiceCardItem: React.FC<{ service: ServiceData }> = ({ service }) => (
  <div className="service-card">
    <div className="service-card-header">
      <div className="service-icon-box">
        {service.icon}
      </div>
      <div>
        <div className="service-number">{service.number}</div>
        <h3 className="service-card-title">{service.title}</h3>
      </div>
    </div>

    <p className="service-description">{service.description}</p>

    <ul className="service-features">
      {service.features.map((feature, fIdx) => (
        <li key={fIdx} className="service-feature-item">
          <span className="service-feature-check">
            <Check size={11} strokeWidth={3} />
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const isMobile = window.innerWidth <= 900;

    const ctx = gsap.context(() => {
      // 1. Header fade-in
      gsap.fromTo(
        '.services-header-anim',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header-anim',
            start: 'top 90%',
            once: true,
          },
        }
      );

      // 2. Timeline central line progressive draw
      if (timelineProgressRef.current) {
        gsap.fromTo(
          timelineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.services-timeline-wrapper',
              start: 'top 80%',
              end: 'bottom 85%',
              scrub: 0.3,
            },
          }
        );
      }

      // 3. Service Rows Reveal
      const rows = gsap.utils.toArray('.services-timeline-row') as HTMLElement[];
      rows.forEach((row) => {
        const card = row.querySelector('.service-card');
        const node = row.querySelector('.timeline-node-point');
        const connector = row.querySelector('.timeline-connector-line');
        const isLeft = row.classList.contains('row-left');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            once: true,
          },
        });

        if (node) {
          tl.fromTo(
            node,
            { scale: 0.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }
          );
        }

        if (connector) {
          tl.fromTo(
            connector,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.out' },
            '-=0.15'
          );
        }

        if (card) {
          tl.fromTo(
            card,
            {
              x: isMobile ? 0 : (isLeft ? -30 : 30),
              y: isMobile ? 20 : 0,
              opacity: 0,
              filter: 'blur(4px)',
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.55,
              ease: 'power3.out',
            },
            '-=0.2'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-wrapper services-section" style={{ position: 'relative' }}>
      {/* Background Watermark Text */}
      <div className="watermark-text">SERVICES</div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="services-header-anim" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5.5vw, 5rem)' }}>
          <span className="kicker">WHAT WE DO</span>
          <h2 className="section-title">
            SERVICES WE <span className="accent">PROVIDE</span>
          </h2>
        </div>

        {/* Central Vertical Timeline Structure */}
        <div className="services-timeline-wrapper">
          {/* Central Timeline Spine Line */}
          <div className="services-timeline-spine">
            <div ref={timelineProgressRef} className="services-timeline-spine-progress" />
          </div>

          {/* Service Items List */}
          <div className="services-timeline-list">
            {servicesData.map((service) => {
              const isLeft = service.align === 'left';

              return (
                <div
                  key={service.number}
                  className={`services-timeline-row ${isLeft ? 'row-left' : 'row-right'}`}
                >
                  {/* Service Card */}
                  <div className="services-card-slot">
                    <ServiceCardItem service={service} />
                  </div>

                  {/* Center Node & Connector */}
                  <div className="services-center-slot">
                    <div className={`timeline-connector-line ${isLeft ? 'connector-left' : 'connector-right'}`} />
                    <div className="timeline-node-point">
                      <div className="timeline-node-inner" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-section {
            padding-top: 2rem !important;
            padding-bottom: 3.5rem !important;
          }
          .services-header-anim {
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

