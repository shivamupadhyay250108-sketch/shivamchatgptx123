import { Bell, TriangleAlert as AlertTriangle, FileWarning, Calendar } from 'lucide-react'

export default function AlertsSummaryCard() {
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
            bg-gradient-to-r from-red-400 to-orange-500
          "
        >

          <Bell
            size={24}
            className="text-white"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Alert Summary
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {/* Total Alerts */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <Bell
            size={24}
            className="text-red-400"
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            12
          </h3>

          <p className="mt-2 text-white/40">
            Total Alerts
          </p>

        </div>

        {/* High Priority */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <AlertTriangle
            size={24}
            className="text-orange-400"
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            4
          </h3>

          <p className="mt-2 text-white/40">
            High Priority
          </p>

        </div>

        {/* Expiring Docs */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <FileWarning
            size={24}
            className="text-yellow-400"
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            3
          </h3>

          <p className="mt-2 text-white/40">
            Expiring Documents
          </p>

        </div>

        {/* Deadlines */}

        <div className="rounded-3xl bg-[#0B0F19] p-6">

          <Calendar
            size={24}
            className="text-cyan-400"
          />

          <h3 className="mt-4 text-3xl font-bold text-white">
            5
          </h3>

          <p className="mt-2 text-white/40">
            Upcoming Deadlines
          </p>

        </div>

      </div>

    </div>
  )
}