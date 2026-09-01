import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  submessage?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, submessage, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        background: '#FFFFFF',
        border: '1px solid rgba(78, 94, 67, 0.25)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 20px 40px rgba(35, 45, 30, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '420px',
        animation: 'slideUpToast 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      role="alert"
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(78, 94, 67, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4E5E43',
          flexShrink: 0,
        }}
      >
        <CheckCircle2 size={24} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#171C14' }}>{message}</h4>
        {submessage && (
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: '#6E7B67', lineHeight: 1.4 }}>
            {submessage}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#8E9B85',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Close message"
      >
        <X size={18} />
      </button>
    </div>
  );
};
