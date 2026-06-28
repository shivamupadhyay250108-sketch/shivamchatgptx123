import {
  Upload,
  Mic,
  Search,
  User,
} from 'lucide-react'

const actions = [
  {
    icon: <Upload size={28} />,
    title: 'Upload Documents',
    subtitle: 'Verify documents instantly',
  },
  {
    icon: <Mic size={28} />,
    title: 'Voice Assistant',
    subtitle: 'Talk in your language',
  },
  {
    icon: <Search size={28} />,
    title: 'Find Schemes',
    subtitle: 'Explore all benefits',
  },
  {
    icon: <User size={28} />,
    title: 'View Profile',
    subtitle: 'Manage personal details',
  },
]

export default function QuickActions() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Quick Actions
        </h2>

        <p className="mt-2 text-white/40">
          Frequently used actions
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => (
          <button
            key={action.title}
            className="group rounded-3xl border border-white/10 bg-[#0B0F19] p-7 text-left transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1"
          >

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white">

              {action.icon}

            </div>

            <h3 className="text-xl font-semibold text-white">

              {action.title}

            </h3>

            <p className="mt-2 text-sm text-white/40">

              {action.subtitle}

            </p>

          </button>
        ))}

      </div>

    </div>
  )
}