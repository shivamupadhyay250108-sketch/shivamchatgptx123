import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function Particles({ count = 40 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 4,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? 'rgba(139, 92, 246, 0.8)'
                : p.id % 3 === 1
                  ? 'rgba(0, 217, 255, 0.7)'
                  : 'rgba(255, 255, 255, 0.5)',
            boxShadow:
              p.id % 2 === 0
                ? '0 0 6px rgba(139, 92, 246, 0.6)'
                : '0 0 6px rgba(0, 217, 255, 0.5)',
          }}
          animate={{
            y: [0, -30, -60, -30, 0],
            x: [0, Math.random() * 20 - 10, Math.random() * 15 - 7, 0],
            opacity: [0, 0.8, 0.6, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
