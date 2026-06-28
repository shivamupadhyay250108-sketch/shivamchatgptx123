import { User, Mic, Brain, FileSearch, Target } from 'lucide-react'

export function WorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-black py-36">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-24 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            HOW IT WORKS
          </p>

          <h2 className="text-5xl font-bold text-white md:text-7xl">
            From Citizen Data
          </h2>

          <h2 className="mt-2 text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text md:text-7xl">
            To Government Benefits
          </h2>
        </div>

        <div className="relative flex min-h-[800px] items-center justify-center">

          {/* Top Left */}
          <div className="absolute left-20 top-20">
            <Card
              icon={<User />}
              title="Citizen Profile"
              desc="Age, occupation and family details."
            />
          </div>

          {/* Top Right */}
          <div className="absolute right-20 top-20">
            <Card
              icon={<Mic />}
              title="Voice + Documents"
              desc="Hindi voice and OCR extraction."
            />
          </div>

          {/* Center Orb */}

          {/* Center Orb */}
          <div className="relative flex h-[320px] w-[320px] items-center justify-center">

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-400/20 blur-3xl" />

            {/* Outer Ring */}
            <div className="absolute h-[320px] w-[320px] rounded-full border border-cyan-400/20" />

            {/* Inner Ring */}
            <div className="absolute h-[270px] w-[270px] rounded-full border border-purple-500/20" />

            {/* Main Core */}
            <div
              className="relative flex h-[260px] w-[260px] flex-col items-center justify-center rounded-full"
              style={{
                background:
                  'radial-gradient(circle at top,#101827 0%,#050816 100%)',
                boxShadow:
                  '0 0 80px rgba(139,92,246,.4),0 0 120px rgba(0,217,255,.2)',
              }}
            >
            {/* Logo */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-500">
                <div className="h-7 w-7 rounded-full bg-white" />
              </div>

              {/* Title */}
              <h3 className="text-4xl font-bold text-white">
                SchemeGPT
                <span className="text-cyan-400"> X</span>
              </h3>

              {/* Subtitle */}
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
                AI Welfare Twin
              </p>

              {/* Divider */}
              <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 to-cyan-400" />
            </div>

          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-32 left-28">
            <Card
              icon={<Brain />}
              title="AI Eligibility"
              desc="Analyzes 200+ signals."
            />
          </div>

          {/* Bottom Right */}
          <div className="absolute bottom-32 right-28">
            <Card
              icon={<FileSearch />}
              title="Scheme Matching"
              desc="Central + State schemes."
            />
          </div>

          {/* Bottom Center */}
          <div className="absolute -bottom-16">
            <Card
              icon={<Target />}
              title="Personalized Benefits"
              desc="Recommendations and reminders."
            />
          </div>

        </div>

      </div>

    </section>
  )
}

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="w-[260px] rounded-[30px] border border-white/10 bg-[#111827]/60 p-6 backdrop-blur-xl">

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-white/50">
        {desc}
      </p>

    </div>
  )
}