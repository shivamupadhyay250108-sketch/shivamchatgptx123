import { motion } from 'framer-motion'
import {
  Brain,
  Mic,
  FileText,
  Rocket,
  HeartHandshake,
  Users,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Eligibility Engine',
    desc: 'Matches citizens to schemes instantly using 200+ signals.',
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    desc: 'Talk naturally in Hindi or English with AI guidance.',
  },
  {
    icon: FileText,
    title: 'Document Intelligence',
    desc: 'Auto extracts Aadhaar, PAN and income proof details.',
  },
  {
    icon: Rocket,
    title: 'Missed Opportunity Detector',
    desc: 'Find benefits families often miss.',
  },
  {
    icon: HeartHandshake,
    title: 'Life Event Engine',
    desc: 'Marriage, education and retirement updates.',
  },
  {
    icon: Users,
    title: 'Family Dashboard',
    desc: 'Manage benefits for parents, spouse and children.',
  },
]

export function FeatureSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-black py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-bold text-white md:text-7xl">
            An operating system
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              for welfare
            </span>
          </h2>

          <p className="mt-6 text-lg text-white/50">
            Six intelligent engines working together continuously.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border border-white/10
                bg-gradient-to-br
                from-[#0B1020]
                to-[#111827]
                p-8
                h-[320px]
                backdrop-blur-xl
                "
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/20">
                    <Icon className="h-9 w-9 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-3xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-8 text-white/50">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}