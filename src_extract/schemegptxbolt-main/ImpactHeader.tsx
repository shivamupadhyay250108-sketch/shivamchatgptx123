import { Trophy } from 'lucide-react'

export default function ImpactHeader() {
  return (
    <div
      className="
        rounded-[32px]
        border border-yellow-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="flex items-center gap-6">

        <div
          className="
            flex h-20 w-20 items-center justify-center
            rounded-3xl
            bg-gradient-to-r from-yellow-400 to-orange-500
          "
        >

          <Trophy
            size={36}
            className="text-white"
          />

        </div>

        <div>

          <p
            className="
              text-sm uppercase
              tracking-[0.3em]
              text-yellow-400
            "
          >
            Impact Dashboard
          </p>

          <h1 className="mt-3 text-5xl font-bold text-white">
            Welfare Impact Insights
          </h1>

          <p className="mt-3 text-white/40">
            Measure the social and financial impact created by SchemeGPT X.
          </p>

        </div>

      </div>

    </div>
  )
}