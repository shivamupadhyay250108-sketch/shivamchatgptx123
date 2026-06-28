import { TriangleAlert as AlertTriangle } from 'lucide-react'

export default function MissedHeader() {
  return (
    <div className="rounded-[32px] border border-red-500/20 bg-[#111827] p-8">

      <div className="flex items-center gap-6">

        <div
          className="
            flex h-20 w-20 items-center justify-center
            rounded-3xl
            bg-gradient-to-r from-red-500 to-orange-500
          "
        >

          <AlertTriangle
            size={36}
            className="text-white"
          />

        </div>

        <div>

          <p
            className="
              text-sm uppercase
              tracking-[0.3em]
              text-red-400
            "
          >
            Welfare Alert
          </p>

          <h1 className="mt-3 text-5xl font-bold text-white">
            Missed Opportunities
          </h1>

          <p className="mt-3 text-white/40">
            AI detected schemes that your family may have missed.
          </p>

        </div>

      </div>

    </div>
  )
}