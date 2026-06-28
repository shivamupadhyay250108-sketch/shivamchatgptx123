import { Clock3 } from 'lucide-react'

const deadlines = [
  {
    title: 'Post Matric Scholarship',
    date: '30 June 2026',
  },
  {
    title: 'PM Kisan Verification',
    date: '05 July 2026',
  },
  {
    title: 'Aadhaar Update Reminder',
    date: '10 July 2026',
  },
]

export default function DeadlineCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Upcoming Deadlines
      </h2>

      <div className="space-y-5">

        {deadlines.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-yellow-500/20 bg-[#0B0F19] p-6 transition-all duration-300 hover:border-yellow-500/50"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/20">

                <Clock3
                  size={24}
                  className="text-yellow-400"
                />

              </div>

              <div>

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-white/40">
                  Deadline: {item.date}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}