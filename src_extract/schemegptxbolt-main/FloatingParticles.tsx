import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'cyan' | 'purple' | 'white';
}

export function FloatingParticles({ count = 50 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        type: ['cyan', 'purple', 'white'][Math.floor(Math.random() * 3)] as Particle['type'],
      })),
    [count]
  );

  const getColor = (type: Particle['type']) => {
    switch (type) {
      case 'cyan':
        return 'bg-cyan-400/60';
      case 'purple':
        return 'bg-purple-400/60';
      case 'white':
        return 'bg-white/40';
    }
  };

  const getGlow = (type: Particle['type']) => {
    switch (type) {
      case 'cyan':
        return 'shadow-[0_0_8px_rgba(34,211,238,0.5)]';
      case 'purple':
        return 'shadow-[0_0_8px_rgba(168,85,247,0.5)]';
      case 'white':
        return 'shadow-[0_0_6px_rgba(255,255,255,0.3)]';
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${getColor(particle.type)} ${getGlow(particle.type)}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, -200, -100, 0],
            x: [0, Math.random() * 30 - 15, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0.6, 0.8, 0],
            scale: [0.5, 1, 1.2, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
