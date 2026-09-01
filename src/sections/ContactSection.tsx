import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, PenLine, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralGlobe } from '../components/NeuralGlobe';
import { Toast } from '../components/Toast';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  details: string;
  botField: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  details?: string;
}

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    details: '',
    botField: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-anim-wrap',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-anim-wrap',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    const trimmed = value.trim();
    if (name === 'name') {
      if (!trimmed) return 'Name is required.';
      if (trimmed.length < 2) return 'Name must be at least 2 characters.';
    }
    if (name === 'email') {
      if (!trimmed) return 'Email is required.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return 'Please enter a valid email address.';
    }
    if (name === 'details') {
      if (!trimmed) return 'Project details are required.';
      if (trimmed.length < 5) return 'Please describe your project in at least 5 characters.';
    }
    return undefined;
  };

  const validateAll = (): boolean => {
    const errors: FormErrors = {};
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const detailsErr = validateField('details', formData.details);

    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (detailsErr) errors.details = detailsErr;

    setFormErrors(errors);
    setTouched({ name: true, email: true, details: true });
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setStatusMessage('');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          details: formData.details.trim(),
          botField: formData.botField,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Thanks! Your project inquiry has been sent successfully.');
        setFormData({ name: '', email: '', details: '', botField: '' });
        setFormErrors({});
        setTouched({});
        setToastOpen(true);
      } else {
        setSubmitStatus('error');
        setStatusMessage(
          data.error || 'Something went wrong. Please try again.'
        );
      }
    } catch (err: any) {
      console.error('[Contact Form Network Error]:', err);
      setSubmitStatus('error');
      setStatusMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-wrapper contact-section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div
          className="contact-anim-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: 'clamp(2rem, 4vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: 3D/Canvas Neural Globe Network Visual */}
          <div
            className="contact-globe-visual"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '380px',
              position: 'relative',
            }}
          >
            <NeuralGlobe />
          </div>

          {/* Right Column: CTA Heading & Form */}
          <div className="contact-form-container">
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              HAVE AN <span style={{ color: 'var(--color-primary)' }}>IDEA?</span>
              <br />
              LET'S <span style={{ color: 'var(--color-primary)' }}>BUILD IT.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                color: 'var(--text-muted)',
                marginBottom: '1.75rem',
                lineHeight: 1.6,
              }}
            >
              Tell us about your idea and let's turn it into a powerful digital experience.
            </p>

            {/* Success Feedback Banner */}
            {submitStatus === 'success' && (
              <div
                role="alert"
                style={{
                  background: 'rgba(78, 94, 67, 0.1)',
                  border: '1.5px solid #75876A',
                  borderRadius: '14px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#263020',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <CheckCircle2 size={20} color="#4E5E43" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.45 }}>
                  {statusMessage || 'Thanks! Your project inquiry has been sent successfully.'}
                </span>
              </div>
            )}

            {/* Error Feedback Banner */}
            {submitStatus === 'error' && (
              <div
                role="alert"
                style={{
                  background: 'rgba(180, 60, 50, 0.08)',
                  border: '1.5px solid rgba(180, 60, 50, 0.25)',
                  borderRadius: '14px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#7A241C',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <AlertCircle size={20} color="#B43C32" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.45 }}>
                  {statusMessage || 'Something went wrong. Please try again.'}
                </span>
              </div>
            )}

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Anti-spam Honeypot Field (Hidden from normal users) */}
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  left: '-9999px',
                }}
                aria-hidden="true"
              >
                <label htmlFor="website-hp-field">Leave this field blank</label>
                <input
                  type="text"
                  id="website-hp-field"
                  name="botField"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botField}
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
                className="form-row-2col"
              >
                {/* Name Input */}
                <div className="form-group" style={{ position: 'relative' }}>
                  <span className="form-icon">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="NAME"
                    required
                    disabled={isSubmitting}
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    className={`form-control ${formErrors.name && touched.name ? 'input-error' : ''}`}
                    aria-label="Your Name"
                  />
                  {formErrors.name && touched.name && (
                    <span
                      id="name-error"
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        color: '#B43C32',
                        marginTop: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Email Input */}
                <div className="form-group" style={{ position: 'relative' }}>
                  <span className="form-icon">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="EMAIL"
                    required
                    disabled={isSubmitting}
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    className={`form-control ${formErrors.email && touched.email ? 'input-error' : ''}`}
                    aria-label="Your Email"
                  />
                  {formErrors.email && touched.email && (
                    <span
                      id="email-error"
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        color: '#B43C32',
                        marginTop: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="form-group" style={{ position: 'relative' }}>
                <span className="form-icon textarea-icon">
                  <PenLine size={18} />
                </span>
                <textarea
                  name="details"
                  id="contact-details"
                  value={formData.details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="PROJECT DETAILS"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  aria-invalid={!!formErrors.details}
                  aria-describedby={formErrors.details ? 'details-error' : undefined}
                  className={`form-control ${formErrors.details && touched.details ? 'input-error' : ''}`}
                  aria-label="Project Details"
                />
                {formErrors.details && touched.details && (
                  <span
                    id="details-error"
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      color: '#B43C32',
                      marginTop: '0.35rem',
                      fontWeight: 600,
                    }}
                  >
                    {formErrors.details}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.75 : 1,
                  transition: 'all 0.25s ease',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin-slow" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <span>START A PROJECT</span>
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Thank you for reaching out!"
        submessage="We have received your project details and will get back to you shortly."
      />

      <style>{`
        .input-error {
          border-color: #B43C32 !important;
          background-color: rgba(180, 60, 50, 0.02) !important;
        }
        @media (max-width: 900px) {
          .contact-anim-wrap {
            grid-template-columns: 1fr !important;
          }
          .contact-globe-visual {
            height: 280px !important;
          }
        }
        @media (max-width: 580px) {
          .form-row-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
