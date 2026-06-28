import { Languages } from 'lucide-react'

const languages = [
  'English',
  'Hindi',
  'Marathi',
  'Tamil',
  'Gujarati',
]

export default function LanguageCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500">

          <Languages className="text-white" size={24} />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Language Preferences
        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {languages.map((language) => (
          <button
            key={language}
            className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 text-left text-white transition-all duration-300 hover:border-cyan-400/40"
          >
            {language}
          </button>
        ))}

      </div>

    </div>
  )
}