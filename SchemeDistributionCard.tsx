import { PieChart } from 'lucide-react'

export default function SchemeDistributionCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-purple-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-purple-400 to-pink-500
          "
        >

          <PieChart
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Scheme Distribution
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Central Schemes */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Central Schemes
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            55%
          </h3>

        </div>

        {/* State Schemes */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            State Schemes
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            30%
          </h3>

        </div>

        {/* Education */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Education
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            10%
          </h3>

        </div>

        {/* Healthcare */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Healthcare
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            5%
          </h3>

        </div>

      </div>

    </div>
  )
}