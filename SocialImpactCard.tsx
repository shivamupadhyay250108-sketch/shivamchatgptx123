import { Globe } from 'lucide-react'

export default function SocialImpactCard() {
  return (
    <div
      className="
        rounded-[32px]
        border border-blue-500/20
        bg-[#111827]
        p-8
      "
    >

      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-gradient-to-r from-blue-400 to-cyan-500
          "
        >

          <Globe
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Social Impact
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Rural Coverage */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Rural Coverage
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            72%
          </h3>

        </div>

        {/* Women Benefited */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Women Benefited
          </p>

          <h3 className="mt-3 text-3xl font-bold text-pink-400">
            48%
          </h3>

        </div>

        {/* Students Supported */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Students Supported
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            22%
          </h3>

        </div>

        {/* Senior Citizens */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <p className="text-sm text-white/40">
            Senior Citizens Helped
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            18%
          </h3>

        </div>

      </div>

    </div>
  )
}