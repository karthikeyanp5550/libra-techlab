import React from 'react';

interface BotanicalDecorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'mid-right';
  className?: string;
  opacity?: number;
  scale?: number;
  rotation?: number;
}

export const BotanicalDecor: React.FC<BotanicalDecorProps> = ({
  position = 'top-left',
  className = '',
  opacity = 0.55,
  scale = 1,
  rotation = 0,
}) => {
  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 0,
      opacity,
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: 'center center',
      transition: 'opacity 0.4s ease',
    };

    switch (position) {
      case 'top-left':
        return { ...base, top: '4%', left: '-20px' };
      case 'top-right':
        return { ...base, top: '6%', right: '-20px', transform: `scale(${scale}) scaleX(-1) rotate(${rotation}deg)` };
      case 'mid-right':
        return { ...base, top: '45%', right: '-15px', transform: `scale(${scale}) scaleX(-1) rotate(${rotation}deg)` };
      case 'bottom-left':
        return { ...base, bottom: '5%', left: '-20px' };
      case 'bottom-right':
        return { ...base, bottom: '6%', right: '-10px', transform: `scale(${scale}) scaleX(-1) rotate(${rotation}deg)` };
      default:
        return base;
    }
  };

  return (
    <div style={getPositionStyles()} className={`botanical-decor ${className}`} aria-hidden="true">
      <svg width="220" height="320" viewBox="0 0 220 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A9D7D" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#677A5B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4A5B40" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C7F60" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4A5B40" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Main curved branch stem */}
        <path
          d="M20 310 C 60 250, 90 180, 110 90 C 120 45, 125 15, 128 5"
          stroke="url(#stemGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Leaf 1 (Top Left) */}
        <path
          d="M128 5 C 105 18, 90 40, 105 55 C 120 40, 126 22, 128 5 Z"
          fill="url(#leafGrad)"
        />
        {/* Leaf 2 (Top Right) */}
        <path
          d="M124 20 C 145 28, 160 50, 142 64 C 130 50, 125 32, 124 20 Z"
          fill="url(#leafGrad)"
        />

        {/* Leaf 3 (Upper Left) */}
        <path
          d="M116 65 C 80 75, 60 105, 85 125 C 105 105, 114 82, 116 65 Z"
          fill="url(#leafGrad)"
        />
        {/* Leaf 4 (Upper Right) */}
        <path
          d="M110 88 C 140 100, 165 128, 140 148 C 122 130, 114 105, 110 88 Z"
          fill="url(#leafGrad)"
        />

        {/* Leaf 5 (Mid Left) */}
        <path
          d="M98 140 C 55 155, 30 190, 62 215 C 85 190, 95 160, 98 140 Z"
          fill="url(#leafGrad)"
        />
        {/* Leaf 6 (Mid Right) */}
        <path
          d="M88 175 C 125 190, 150 225, 120 248 C 100 225, 90 198, 88 175 Z"
          fill="url(#leafGrad)"
        />

        {/* Leaf 7 (Bottom Left) */}
        <path
          d="M68 228 C 25 245, 8 280, 38 302 C 60 280, 68 250, 68 228 Z"
          fill="url(#leafGrad)"
        />
      </svg>
    </div>
  );
};
