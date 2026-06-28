import { Rocket } from 'lucide-react'

export default function FutureProjectionCard() {
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

          <Rocket
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Future Projection
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* 2026 */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            2026
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            1 Lakh
          </h3>

          <p className="mt-2 text-white/40">
            Families
          </p>

        </div>

        {/* 2027 */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            2027
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            5 Lakh
          </h3>

          <p className="mt-2 text-white/40">
            Families
          </p>

        </div>

        {/* 2028 */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            2028
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            20 Lakh
          </h3>

          <p className="mt-2 text-white/40">
            Families
          </p>

        </div>

        {/* 2030 */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            2030 Goal
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            1 Crore
          </h3>

          <p className="mt-2 text-white/40">
            Citizens
          </p>

        </div>

      </div>

    </div>
  )
}