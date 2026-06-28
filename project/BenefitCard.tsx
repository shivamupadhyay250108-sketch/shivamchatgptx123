import { IndianRupee } from 'lucide-react'

export default function BenefitCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-white/10
        bg-[#111827]
        p-8
      "
    >
      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-cyan-400 to-purple-500
          "
        >
          <IndianRupee
            size={24}
            className="text-white"
          />
        </div>

        <h2 className="text-3xl font-bold text-white">
          Family Benefits Overview
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Total Schemes
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            42
          </h3>

        </div>

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Total Benefits
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            ₹9.45L
          </h3>

        </div>

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            AI Match Score
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            96%
          </h3>

        </div>

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Family Coverage
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            100%
          </h3>

        </div>

      </div>

    </div>
  )
}