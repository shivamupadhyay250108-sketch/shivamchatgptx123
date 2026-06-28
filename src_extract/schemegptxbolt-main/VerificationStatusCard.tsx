import { ShieldCheck, TriangleAlert as AlertTriangle, Circle as XCircle } from 'lucide-react'

export default function VerificationStatusCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-cyan-500/20
        bg-[#111827]
        p-8
      "
    >

      <h2 className="mb-8 text-3xl font-bold text-white">
        AI Verification Status
      </h2>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Verified */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <ShieldCheck
            size={28}
            className="text-green-400"
          />

          <h3 className="mt-4
            text-3xl
            font-bold
            text-white
          ">
            5
          </h3>

          <p className="mt-2 text-white/40">
            Verified
          </p>

        </div>

        {/* Pending */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <AlertTriangle
            size={28}
            className="text-yellow-400"
          />

          <h3 className="
            mt-4
            text-3xl
            font-bold
            text-white
          ">
            1
          </h3>

          <p className="mt-2 text-white/40">
            Pending
          </p>

        </div>

        {/* Missing */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <XCircle
            size={28}
            className="text-red-400"
          />

          <h3 className="
            mt-4
            text-3xl
            font-bold
            text-white
          ">
            2
          </h3>

          <p className="mt-2 text-white/40">
            Missing
          </p>

        </div>

        {/* Trust Score */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <ShieldCheck
            size={28}
            className="text-cyan-400"
          />

          <h3 className="
            mt-4
            text-3xl
            font-bold
            text-white
          ">
            94%
          </h3>

          <p className="mt-2 text-white/40">
            Trust Score
          </p>

        </div>

      </div>

    </div>
  )
}