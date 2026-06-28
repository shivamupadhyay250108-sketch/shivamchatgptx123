import { Gauge } from 'lucide-react'

export default function PerformanceCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-cyan-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-cyan-400 to-blue-500
          "
        >

          <Gauge
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          AI Performance
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Accuracy */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            AI Accuracy
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            98%
          </h3>

        </div>

        {/* Response Time */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Response Time
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            0.7 sec
          </h3>

        </div>

        {/* Match Score */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Eligibility Match
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            96%
          </h3>

        </div>

        {/* Success Rate */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Success Rate
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            94%
          </h3>

        </div>

      </div>

    </div>
  )
}