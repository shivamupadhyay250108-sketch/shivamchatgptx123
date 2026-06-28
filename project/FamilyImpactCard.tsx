import { HeartHandshake } from 'lucide-react'

export default function FamilyImpactCard() {
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

          <HeartHandshake
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Family Impact
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Families Benefited */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Families Benefited
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            8,500
          </h3>

        </div>

        {/* Scholarships */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Scholarships Received
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            3,200
          </h3>

        </div>

        {/* Healthcare */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Healthcare Claims
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            5,100
          </h3>

        </div>

        {/* Income Growth */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Income Growth
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            +32%
          </h3>

        </div>

      </div>

    </div>
  )
}