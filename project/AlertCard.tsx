import { CircleAlert as AlertCircle } from 'lucide-react'

const alerts = [
  {
    title: 'PM Awas Yojana Match Found',
    description: 'You are eligible for housing benefits.',
  },
  {
    title: 'Scholarship Available',
    description: 'Post Matric Scholarship applications are open.',
  },
  {
    title: 'New Government Scheme Added',
    description: 'AI discovered a newly launched state scheme.',
  },
]

export default function AlertCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Alerts
      </h2>

      <div className="space-y-5">

        {alerts.map((alert) => (
          <div
            key={alert.title}
            className="rounded-3xl border border-red-500/20 bg-[#0B0F19] p-6 transition-all duration-300 hover:border-red-500/50"
          >

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20">

                <AlertCircle
                  className="text-red-400"
                  size={24}
                />

              </div>

              <div>

                <h3 className="text-xl font-semibold text-white">
                  {alert.title}
                </h3>

                <p className="mt-2 text-white/40">
                  {alert.description}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}