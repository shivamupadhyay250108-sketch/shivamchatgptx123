import { ArrowRight } from 'lucide-react'

const schemes = [
  {
    name: 'PM Yasasvi Scholarship',
    match: '96%',
  },
  {
    name: 'AICTE Pragati Scholarship',
    match: '94%',
  },
  {
    name: 'Post Matric Scholarship',
    match: '93%',
  },
  {
    name: 'PM Kisan Samman Nidhi',
    match: '92%',
  },
  {
    name: 'Ayushman Bharat Yojana',
    match: '91%',
  },
  {
    name: 'Sukanya Samriddhi Yojana',
    match: '90%',
  },
  {
    name: 'PM Mudra Loan Scheme',
    match: '89%',
  },
  {
    name: 'Startup India Seed Fund',
    match: '88%',
  },
]

export default function RecommendedSchemes() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Top Recommended Schemes
          </h2>

          <p className="mt-2 text-white/40">
            Personalized recommendations powered by AI
          </p>

        </div>

        <button className="flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300">

          View All

          <ArrowRight size={18} />

        </button>

      </div>

      <div className="space-y-4">

        {schemes.map((scheme) => (
          <div
            key={scheme.name}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B0F19] px-6 py-5 transition hover:border-cyan-400/30"
          >

            <div>

              <h3 className="text-lg font-semibold text-white">
                {scheme.name}
              </h3>

              <p className="mt-1 text-sm text-white/40">
                High eligibility probability
              </p>

            </div>

            <div className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2 font-semibold text-white">
              {scheme.match}
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}