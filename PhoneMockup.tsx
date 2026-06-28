import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const schemes = [
  { name: 'PM Yasasvi Scholarship', score: 95 },
  { name: 'AICTE Pragati Scholarship', score: 90 },
  { name: 'Post Matric Scholarship', score: 96 },
]

export function PhoneMockup() {
  return (
    <motion.div
      className="pointer-events-auto relative z-30 scale-[0.75] sm:scale-[0.9] lg:scale-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
    >
      <div className="relative">
        {/* Glow */}
        <div
          className="absolute -inset-8 rounded-[3rem] opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139,92,246,.35) 0%, rgba(0,217,255,.15) 50%, transparent 70%)',
          }}
        />

        {/* Phone */}
        <div
          className="glass-panel glass-border relative w-[220px] overflow-hidden rounded-[2rem] sm:w-[240px]"
          style={{
            boxShadow:
              '0 25px 60px rgba(0,0,0,.6),0 0 40px rgba(139,92,246,.15), inset 0 1px 0 rgba(255,255,255,.1)',
          }}
        >
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-black/80" />

          {/* Screen */}
          <div className="relative bg-gradient-to-b from-[#0a0a12] to-[#050508] px-4 pb-5 pt-10">

            {/* Header */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8B5CF6]/20">
                <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                SchemeGPT X
              </span>
            </div>

            {/* Match Score */}
            <div className="mb-4 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
              <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-white/40">
                Match Score
              </p>

              <div className="flex items-end gap-1">
                <motion.span
                  className="font-display text-3xl font-bold text-shimmer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1,
                    duration: 0.5,
                    type: 'spring',
                  }}
                >
                  92
                </motion.span>

                <span className="mb-1 text-sm font-semibold text-[#00D9FF]">
                  %
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#00D9FF]"
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  transition={{
                    delay: 1.2,
                    duration: 1,
                  }}
                />
              </div>
            </div>

            {/* Schemes */}
            <div>
              <p className="mb-2.5 text-[10px] font-medium uppercase tracking-wide text-white/40">
                Top Schemes
              </p>

              <div className="space-y-2">
                {schemes.map((scheme, i) => (
                  <motion.div
                    key={scheme.name}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-2 ring-1 ring-white/[0.04]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.3 + i * 0.15,
                    }}
                  >
                    <span className="max-w-[130px] truncate text-[11px] font-medium text-white/80">
                      {scheme.name}
                    </span>

                    <span className="text-[11px] font-bold text-[#00D9FF]">
                      {scheme.score}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center bg-[#050508] py-2">
            <div className="h-1 w-16 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

