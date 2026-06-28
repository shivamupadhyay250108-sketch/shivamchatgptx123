import { Clock3 } from 'lucide-react'

const missedSchemes = [
  {
    name: 'PM Kisan Samman Nidhi',
    loss: '₹60,000',
    deadline: '5 Days Left',
    urgency: 'High',
  },
  {
    name: 'Ayushman Bharat',
    loss: '₹5 Lakhs',
    deadline: '12 Days Left',
    urgency: 'Medium',
  },
  {
    name: 'National Scholarship',
    loss: '₹1.25 Lakhs',
    deadline: '3 Days Left',
    urgency: 'High',
  },
  {
    name: 'Ladli Behna Yojana',
    loss: '₹1.5 Lakhs',
    deadline: '20 Days Left',
    urgency: 'Low',
  },
]

export default function MissedSchemeCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      {missedSchemes.map((scheme) => (
        <div
          key={scheme.name}
          className="
            rounded-[32px]
            border border-red-500/20
            bg-[#111827]
            p-8
            transition-all duration-300
            hover:border-red-400/40
          "
        >

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-white">
              {scheme.name}
            </h2>

            <Clock3
              size={24}
              className="text-red-400"
            />

          </div>

          <div className="mt-8 space-y-4">

            <div>

              <p className="text-sm text-white/40">
                Potential Loss
              </p>

              <h3 className="mt-1 text-2xl font-bold text-red-400">
                {scheme.loss}
              </h3>

            </div>

            <div>

              <p className="text-sm text-white/40">
                Deadline
              </p>

              <h3 className="mt-1 text-lg font-semibold text-white">
                {scheme.deadline}
              </h3>

            </div>

            <div>

              <p className="text-sm text-white/40">
                Urgency Level
              </p>

              <h3 className="mt-1 text-lg font-semibold text-yellow-400">
                {scheme.urgency}
              </h3>

            </div>

          </div>

        </div>
      ))}

    </div>
  )
}