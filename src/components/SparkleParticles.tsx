import React, { useMemo } from 'react';

interface SparkleParticlesProps {
  count?: number;
  className?: string;
}

export const SparkleParticles: React.FC<SparkleParticlesProps> = ({
  count = 14,
  className = '',
}) => {
  // Deterministic seed for particle positions to avoid SSR / hydration mismatches
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // STRICT RED FAMILY: Bright red, deep crimson, dark red, and subtle white/soft red highlight
      const colors = ['#F9040C', '#D71920', '#A51E22', '#8B1E1E', '#FCE9E9'];
      const color = colors[i % colors.length];
      
      const left = ((i * 23 + 17) % 94) + 3; // 3% to 97%
      const top = ((i * 37 + 11) % 90) + 5;  // 5% to 95%
      const size = (i % 3 === 0 ? 3.5 : i % 2 === 0 ? 2.5 : 2); // 2px to 3.5px
      const duration = 8 + (i % 5) * 2; // 8s to 16s slow drift
      const delay = (i * 0.7) % 5;
      const opacity = 0.25 + (i % 4) * 0.1; // 0.25 to 0.55 low opacity

      return {
        id: i,
        left: `${left}%`,
        top: `${top}%`,
        size,
        color,
        duration: `${duration}s`,
        delay: `${delay}s`,
        baseOpacity: opacity,
      };
    });
  }, [count]);

  return (
    <div 
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
      aria-hidden="true"
    >
      <style>{`
        @keyframes ev-sparkle-float {
          0% {
            transform: translateY(0px) translateX(0px) scale(0.9);
            opacity: var(--base-op);
          }
          50% {
            transform: translateY(-22px) translateX(12px) scale(1.15);
            opacity: calc(var(--base-op) * 1.5);
          }
          100% {
            transform: translateY(0px) translateX(0px) scale(0.9);
            opacity: var(--base-op);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ev-sparkle-dot {
            animation: none !important;
            transform: none !important;
            opacity: 0.15 !important;
          }
        }
      `}</style>
      
      {particles.map((p) => (
        <span
          key={p.id}
          className="ev-sparkle-dot absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            ['--base-op' as any]: p.baseOpacity,
            animation: `ev-sparkle-float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
