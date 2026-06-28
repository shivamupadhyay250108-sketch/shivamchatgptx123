import { ArrowUpRight } from 'lucide-react'

export default function MatchScoreCard() {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      {/* Main Score Card */}
      <div className="col-span-2 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-[#111827] to-[#0B0F19] p-8">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          AI Eligibility Score
        </p>

        <div className="mt-6 flex items-end gap-3">

          <h1 className="text-7xl font-bold text-white">
            92
          </h1>

          <span className="mb-3 text-3xl font-bold text-cyan-400">
            %
          </span>

        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />

        </div>

        <p className="mt-5 text-white/50">
          Excellent eligibility across Central and State welfare schemes.
        </p>

      </div>

      {/* Stats Card */}
      <div className="space-y-6">

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-white/40">
                Schemes Found
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                84
              </h2>

            </div>

            <ArrowUpRight className="text-cyan-400" />

          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-white/40">
                Active Notifications
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                12
              </h2>

            </div>

            <ArrowUpRight className="text-purple-400" />

          </div>

        </div>

      </div>

    </div>
  )
}