import { Shield } from 'lucide-react'

const privacyOptions = [
  {
    title: 'Notifications',
    status: 'Enabled',
  },
  {
    title: 'Data Sharing',
    status: 'Disabled',
  },
  {
    title: 'Two-Factor Authentication',
    status: 'Enabled',
  },
  {
    title: 'Biometric Login',
    status: 'Enabled',
  },
]

export default function PrivacyCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500">

          <Shield
            className="text-white"
            size={24}
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Privacy & Security
        </h2>

      </div>

      <div className="space-y-5">

        {privacyOptions.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#0B0F19] p-6 transition-all duration-300 hover:border-cyan-400/30"
          >

            <div>

              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

            </div>

            <div
              className={`rounded-full px-5 py-2 text-sm font-medium ${
                item.status === 'Enabled'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {item.status}
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}