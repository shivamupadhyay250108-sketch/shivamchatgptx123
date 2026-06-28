import { Users } from 'lucide-react'

export default function ImpactStatsCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-yellow-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-yellow-400 to-orange-500
          "
        >

          <Users
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Impact Statistics
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Families Helped */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Families Helped
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            25,000+
          </h3>

        </div>

        {/* Benefits Generated */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Benefits Generated
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            ₹120 Cr+
          </h3>

        </div>

        {/* Citizens Impacted */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Citizens Impacted
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            1 Lakh+
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