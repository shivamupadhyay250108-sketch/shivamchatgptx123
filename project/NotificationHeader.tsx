import { Bell } from 'lucide-react'

export default function NotificationHeader() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="flex items-center gap-5">

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500">

          <Bell className="text-white" size={36} />

        </div>

        <div>

          <p className="uppercase tracking-[0.3em] text-cyan-400 text-sm">
            Notification Center
          </p>

          <h1 className="mt-3 text-5xl font-bold text-white">
            Stay Updated
          </h1>

          <p className="mt-3 text-white/40">
            Scheme alerts, reminders and AI recommendations.
          </p>

        </div>

      </div>

    </div>
  )
}