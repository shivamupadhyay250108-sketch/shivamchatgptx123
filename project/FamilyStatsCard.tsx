import { Users, FileCheck, TriangleAlert as AlertTriangle, PiggyBank } from 'lucide-react'

export default function FamilyStatsCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-white/10
        bg-[#111827]
        p-8
      "
    >
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Family Statistics
        </h2>

        <p className="mt-3 text-white/40">
          AI-generated insights for your family.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Family Members */}
        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <Users
            className="text-cyan-400"
            size={28}
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            4
          </h3>

          <p className="mt-2 text-white/40">
            Family Members
          </p>

        </div>

        {/* Active Schemes */}
        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <FileCheck
            className="text-green-400"
            size={28}
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            28
          </h3>

          <p className="mt-2 text-white/40">
            Active Schemes
          </p>

        </div>

        {/* Missed Opportunities */}
        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <AlertTriangle
            className="text-yellow-400"
            size={28}
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            9
          </h3>

          <p className="mt-2 text-white/40">
            Missed Opportunities
          </p>

        </div>

        {/* Savings */}
        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <PiggyBank
            className="text-purple-400"
            size={28}
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            ₹2.7L
          </h3>

          <p className="mt-2 text-white/40">
            Potential Savings
          </p>

        </div>

      </div>
    </div>
  )
}