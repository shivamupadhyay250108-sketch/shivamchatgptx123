import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { HolographicMap } from './HolographicMap'
import { PhoneMockup } from './PhoneMockup'
import { FeatureSection } from './features/FeatureSection'
import { Link } from 'react-router-dom'

const headingLines = ['Every Scheme.', 'Every Citizen.', 'Zero Missed Opportunities.']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function HeroSection() {
  return (
  <>
    <section className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="aurora-bg absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="aurora-bg absolute -right-1/4 -bottom-1/4 h-[700px] w-[700px] rounded-full opacity-25 blur-[100px]"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 217, 255, 0.35) 0%, transparent 70%)',
            animationDelay: '-7s',
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full opacity-15 blur-[80px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(139, 92, 246, 0.3) 0%, rgba(0, 217, 255, 0.15) 50%, transparent 80%)',
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Nav */}
      <motion.nav
        className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#00D9FF]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            SchemeGPT<span className="text-[#8B5CF6]"> X</span>
          </span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-white/50 md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#schemes" className="transition-colors hover:text-white">
            Schemes
          </a>
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
        </div>
        <Link to="/login">
          <motion.button
            type="button"
            className="glass-panel glass-border rounded-full px-5 py-2 text-sm font-medium text-white/80 transition-all hover:text-white"
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </Link>
      </motion.nav>

      {/* Hero content */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-4 lg:px-16">
        <motion.div
          className="relative z-20 pt-4 lg:pt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="glass-panel glass-border inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8B5CF6]" />
              </span>
              India&apos;s First AI Welfare Twin
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display mb-6 text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {headingLines.map((line, i) => (
              <span key={line} className="block">
                {i === 2 ? (
                  <span className="text-shimmer">{line}</span>
                ) : (
                  <span className="text-white">{line}</span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg"
          >
            SchemeGPT X is an AI-powered Welfare Twin that discovers government
            schemes personalized for you and your family.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8B5CF6]/25"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 8px 40px rgba(139, 92, 246, 0.45)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              type="button"
              className="group glass-panel glass-border flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.15)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-all group-hover:bg-[#00D9FF]/10 group-hover:ring-[#00D9FF]/30">
                <Play className="h-3 w-3 fill-current text-[#00D9FF]" />
              </span>
              See How It Works
            </motion.button>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center gap-6 text-sm text-white/30"
          >
            <div className="flex -space-x-2">
              {['#8B5CF6', '#00D9FF', '#A78BFA', '#22D3EE'].map((color) => (
                <div
                  key={color}
                  className="h-8 w-8 rounded-full ring-2 ring-black"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
                />
              ))}
            </div>
            <p>
              <span className="font-semibold text-white/60">2,400+</span> schemes indexed
              across India
            </p>
          </motion.div>
        </motion.div>

        {/* Right side — holographic map */}
        <motion.div
          className="relative flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HolographicMap />

          <div className="lg:absolute lg:-bottom-10 lg:right-0">
            <PhoneMockup />
          </div>
        </motion.div>
      </div>

      {/* Phone mockup — bottom right */}
      
    </section>

    </>
  )
}