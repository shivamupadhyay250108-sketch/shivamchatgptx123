import { Mic } from 'lucide-react'

const voices = [
  'Hindi Male Voice',
  'Hindi Female Voice',
  'English Male Voice',
  'English Female Voice',
]

export default function VoiceSettingsCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500">

          <Mic className="text-white" size={24} />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Voice Settings
        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {voices.map((voice) => (
          <button
            key={voice}
            className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 text-left text-white transition-all duration-300 hover:border-cyan-400/40"
          >
            {voice}
          </button>
        ))}

      </div>

    </div>
  )
}