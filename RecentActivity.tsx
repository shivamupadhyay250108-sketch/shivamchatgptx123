import {
  Bell,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react'

const activities = [
  {
    icon: <Sparkles size={18} />,
    title: 'New Scheme Found',
    desc: 'PM Yasasvi Scholarship matched with 96% score.',
    color: 'text-cyan-400',
  },
  {
    icon: <CheckCircle size={18} />,
    title: 'Document Verified',
    desc: 'Income certificate successfully verified.',
    color: 'text-green-400',
  },
  {
    icon: <Bell size={18} />,
    title: 'Reminder Generated',
    desc: 'Application deadline approaching in 5 days.',
    color: 'text-purple-400',
  },
  {
    icon: <Clock size={18} />,
    title: 'Recent Activity',
    desc: 'Profile updated successfully.',
    color: 'text-yellow-400',
  },
]

export default function RecentActivity() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="mt-2 text-white/40">
          Latest updates from your account
        </p>

      </div>

      <div className="space-y-5">

        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center gap-5 rounded-3xl border border-white/10 bg-[#0B0F19] p-6 transition-all hover:border-cyan-400/20"
          >

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div>

              <h3 className="text-lg font-semibold text-white">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-white/40">
                {activity.desc}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}