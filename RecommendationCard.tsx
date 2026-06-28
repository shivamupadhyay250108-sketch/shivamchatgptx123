import { Sparkles } from 'lucide-react'

const recommendations = [
  {
    title: 'PM Awas Yojana',
    score: '96%',
  },
  {
    title: 'PM Kisan Samman Nidhi',
    score: '94%',
  },
  {
    title: 'National Scholarship Portal',
    score: '92%',
  },
  {
    title: 'Mukhyamantri Yuva Internship Scheme',
    score: '89%',
  },
]

export default function RecommendationCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        AI Recommendations
      </h2>

      <div className="space-y-5">

        {recommendations.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-cyan-400/20 bg-[#0B0F19] p-6 transition-all duration-300 hover:border-cyan-400/50"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500">

                  <Sparkles
                    size={24}
                    className="text-white"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-white/40">
                    AI Match Probability
                  </p>

                </div>

              </div>

              <div className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2 text-white font-semibold">

                {item.score}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}