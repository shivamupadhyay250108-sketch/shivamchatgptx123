import { BarChart3 } from 'lucide-react'

export default function AnalyticsHeader() {
  return (
    <div
      className="
        rounded-[32px]
        border border-cyan-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="flex items-center gap-6">

        <div
          className="
            flex h-20 w-20 items-center justify-center
            rounded-3xl
            bg-gradient-to-r from-cyan-400 to-purple-500
          "
        >

          <BarChart3
            size={36}
            className="text-white"
          />

        </div>

        <div>

          <p
            className="
              text-sm uppercase
              tracking-[0.3em]
              text-cyan-400
            "
          >
            Analytics Dashboard
          </p>

          <h1 className="mt-3 text-5xl font-bold text-white">
            Welfare Insights
          </h1>

          <p className="mt-3 text-white/40">
            AI-driven analytics for benefits, savings and performance.
          </p>

        </div>

      </div>

    </div>
  )
}