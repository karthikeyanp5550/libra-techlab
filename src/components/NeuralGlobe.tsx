import React, { useEffect, useRef } from 'react';

export const NeuralGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 360;
      height = canvas.height = canvas.parentElement.clientHeight || 360;
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D sphere node points
    const numPoints = 65;
    const radius = Math.min(width, height) * 0.38;
    const points: { x: number; y: number; z: number; origX: number; origY: number; origZ: number; isGold: boolean }[] = [];

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      points.push({
        x,
        y,
        z,
        origX: x,
        origY: y,
        origZ: z,
        isGold: Math.random() > 0.45,
      });
    }

    let angleY = 0;
    let angleX = 0.2;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 0.03;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 0.03;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleY += 0.006 + mouseX;
      angleX += 0.002 + mouseY;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project points
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origZ * cosY + p.origX * sinY;

        // Rotate X
        let y1 = p.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.origY * sinX;

        // Perspective scale
        const fov = 420;
        const scale = fov / (fov + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;

        return {
          px,
          py,
          scale,
          z: z2,
          isGold: p.isGold,
        };
      });

      // Draw connection lines between nearest neighbors
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const alpha = (1 - dist / 65) * 0.45 * Math.min(projected[i].scale, projected[j].scale);
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.strokeStyle = `rgba(184, 147, 67, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.sort((a, b) => a.z - b.z);
      projected.forEach((p) => {
        const nodeRadius = (p.isGold ? 3.2 : 2.4) * p.scale;
        const alpha = Math.max(0.15, (p.z + radius) / (2 * radius));

        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold ? `rgba(184, 147, 67, ${alpha * 0.95})` : `rgba(78, 94, 67, ${alpha * 0.85})`;
        ctx.fill();

        // Node halo
        if (p.isGold && alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, nodeRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 147, 67, 0.15)`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '340px', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        aria-label="Neural Network Globe Visual"
      />
    </div>
  );
};
