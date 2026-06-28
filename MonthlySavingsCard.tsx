import { TrendingUp } from 'lucide-react'

export default function MonthlySavingsCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-green-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-green-400 to-emerald-500
          "
        >

          <TrendingUp
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Monthly Savings
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* January */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            January
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            ₹15,000
          </h3>

        </div>

        {/* February */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            February
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            ₹22,000
          </h3>

        </div>

        {/* March */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            March
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            ₹31,000
          </h3>

        </div>

        {/* April */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            April
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            ₹48,000
          </h3>

        </div>

      </div>

    </div>
  )
}