import { IndianRupee } from 'lucide-react'

export default function LossSummaryCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-red-500/20
        bg-[#111827]
        p-8
      "
    >
      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-red-500 to-orange-500
          "
        >
          <IndianRupee
            size={24}
            className="text-white"
          />
        </div>

        <h2 className="text-3xl font-bold text-white">
          Loss Summary
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {/* Potential Loss */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Potential Loss
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            ₹3.75 Lakhs
          </h3>

        </div>

        {/* Missed Schemes */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Missed Schemes
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            4
          </h3>

        </div>

        {/* Risk Level */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Risk Level
          </p>

          <h3 className="mt-3 text-3xl font-bold text-orange-400">
            High
          </h3>

        </div>

      </div>

    </div>
  )
}