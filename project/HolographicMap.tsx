import { motion } from 'framer-motion'
import {
  INDIA_VIEWBOX,
  MAP_CENTER,
  CATEGORY_ANCHORS,
  indiaLocations,
} from '../../data/indiaOutline'
import { Particles } from './Particles'

const categories = [
  { key: 'students' as const, emoji: '🎓', label: 'Students' },
  { key: 'farmers' as const, emoji: '🌾', label: 'Farmers' },
  { key: 'women' as const, emoji: '👩', label: 'Women' },
  { key: 'workers' as const, emoji: '🛠', label: 'Workers' },
  { key: 'entrepreneurs' as const, emoji: '🚀', label: 'Entrepreneurs' },
  { key: 'seniors' as const, emoji: '❤️', label: 'Senior Citizens' },
]

function ConnectionLine({
  from,
  to,
  delay,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  delay: number
}) {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2 - 25

  return (
    <motion.path
      d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
      fill="none"
      stroke="url(#lineGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.65 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      style={{ filter: 'url(#lineGlow)' }}
    />
  )
}

function CategoryPill({
  emoji,
  label,
  x,
  y,
  delay,
}: {
  emoji: string
  label: string
  x: number
  y: number
  delay: number
}) {
  return (
    <motion.foreignObject
      x={x - 72}
      y={y - 18}
      width={144}
      height={36}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="glass-panel glass-border flex cursor-default items-center justify-center gap-1.5 rounded-full px-3 py-1.5 whitespace-nowrap"
        whileHover={{
          scale: 1.08,
          boxShadow: '0 0 24px rgba(139, 92, 246, 0.4)',
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          y: { duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <span>{emoji}</span>
        <span>{label}</span>
      </motion.div>
    </motion.foreignObject>
  )
}

export function HolographicMap() {
  return (
      <div className="relative flex h-[340px] w-full items-center justify-center sm:h-[420px] md:h-[500px] lg:h-[620px]">
      <Particles count={35} />

      {/* Concentric circles */}
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="pointer-events-none absolute rounded-full border border-white/[0.04]"
          style={{
            width: `${ring * 130 + 90}px`,
            height: `${ring * 130 + 90}px`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.28 - ring * 0.05, scale: 1 }}
          transition={{ delay: ring * 0.15, duration: 0.8 }}
        />
      ))}

      {/* Pulsing rings at center */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="pulse-ring pointer-events-none absolute rounded-full border border-[#8B5CF6]/25"
          style={{
            width: '200px',
            height: '200px',
            animationDelay: `${i * 1}s`,
          }}
        />
      ))}

      <motion.svg
        viewBox={INDIA_VIEWBOX}
        className="relative z-10 h-full w-full max-w-[300px] sm:max-w-[360px] md:max-w-[430px] lg:max-w-[480px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        aria-label="Holographic map of India"
        role="img"
      >
        <defs>
          <linearGradient id="mapStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
          <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="orbFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1033" />
            <stop offset="45%" stopColor="#0d0820" />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>
          <radialGradient id="orbLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#00D9FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        {categories.map((cat, i) => (
          <ConnectionLine
            key={cat.key}
            from={CATEGORY_ANCHORS[cat.key]}
            to={MAP_CENTER}
            delay={0.4 + i * 0.1}
          />
        ))}

        {/* India map — all states */}
        <g filter="url(#mapGlow)">
          {indiaLocations.map((location, i) => (
            <motion.path
              key={location.id}
              d={location.path}
              fill="url(#mapFill)"
              stroke="url(#mapStroke)"
              strokeWidth="1.2"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.02 }}
            />
          ))}
        </g>

        {/* Animated holographic scan overlay */}
        {indiaLocations.map((location) => (
          <path
            key={`scan-${location.id}`}
            d={location.path}
            fill="none"
            stroke="#00D9FF"
            strokeWidth="0.4"
            strokeDasharray="3 6"
            opacity="0.25"
            style={{ animation: 'dash-flow 4s linear infinite' }}
          />
        ))}

        {/* Central orb */}
        <motion.g
          filter="url(#orbFilter)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 150 }}
        >
          <motion.circle
            cx={MAP_CENTER.x}
            cy={MAP_CENTER.y}
            r="54"
            fill="none"
            stroke="rgba(139, 92, 246, 0.35)"
            strokeWidth="1"
            animate={{ r: [52, 56, 52] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle
            cx={MAP_CENTER.x}
            cy={MAP_CENTER.y}
            r="46"
            fill="url(#orbGradient)"
            stroke="url(#mapStroke)"
            strokeWidth="1.5"
          />
          <circle
            cx={MAP_CENTER.x}
            cy={MAP_CENTER.y}
            r="40"
            fill="none"
            stroke="rgba(0, 217, 255, 0.25)"
            strokeWidth="0.5"
          />
          {/* Orb light emission */}
          <circle
            cx={MAP_CENTER.x}
            cy={MAP_CENTER.y}
            r="70"
            fill="url(#orbLight)"
            opacity="0.15"
          />
        </motion.g>

        {/* Orb text */}
        <motion.foreignObject
          x={MAP_CENTER.x - 52}
          y={MAP_CENTER.y - 30}
          width={104}
          height={60}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span
              className="font-display text-[11px] font-bold tracking-[0.22em] text-white"
              style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.9)' }}
            >
              SCHEMEGPT
            </span>
            <span
              className="mt-0.5 text-[10px] font-semibold tracking-[0.32em] text-[#00D9FF]"
              style={{ textShadow: '0 0 15px rgba(0, 217, 255, 0.7)' }}
            >
              INDIA
            </span>
          </div>
        </motion.foreignObject>

        {/* Category pills */}
        {categories.map((cat, i) => {
          const anchor = CATEGORY_ANCHORS[cat.key]
          return (
            <CategoryPill
              key={cat.key}
              emoji={cat.emoji}
              label={cat.label}
              x={anchor.x}
              y={anchor.y}
              delay={0.6 + i * 0.12}
            />
          )
        })}
      </motion.svg>
    </div>
  )
}
