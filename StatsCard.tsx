import { Sparkles, Bell, FileText, Target } from 'lucide-react'

const stats = [
  {
    icon: <Sparkles size={24} />,
    title: 'AI Match Score',
    value: '92%',
    color: 'from-cyan-400 to-purple-500',
  },
  {
    icon: <Target size={24} />,
    title: 'Schemes Found',
    value: '84',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Bell size={24} />,
    title: 'Notifications',
    value: '12',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <FileText size={24} />,
    title: 'Documents',
    value: '4',
    color: 'from-green-400 to-cyan-400',
  },
]

export default function StatsCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        AI Statistics
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-3xl border border-white/10 bg-[#0B0F19] p-7 transition-all duration-300 hover:border-cyan-400/30"
          >

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${stat.color} text-white`}
            >
              {stat.icon}
            </div>

            <h3 className="mt-6 text-lg font-semibold text-white">
              {stat.title}
            </h3>

            <p className="mt-3 text-4xl font-bold text-cyan-400">
              {stat.value}
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}