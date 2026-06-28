import { Sparkles, TrendingUp } from "lucide-react";
import RecommendationCard from "./RecommendationCard";
import { useSchemes } from "../../hooks/useSchemes";

export default function RecommendationRadar() {
  const { schemes, loading } = useSchemes();

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      {/* Left */}
      <div className="lg:col-span-2 rounded-[32px] border border-white/10 bg-[#0B1220] p-8">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              AI Recommendations
            </h2>

            <p className="mt-2 text-white/50">
              Schemes ranked specifically for your profile
            </p>

          </div>

          <button className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-cyan-300 transition hover:bg-cyan-500/20">
            View All
          </button>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          {loading ? (

            <div className="col-span-2 py-20 text-center text-white/50">
              Loading recommendations...
            </div>

          ) : schemes.length === 0 ? (

            <div className="col-span-2 py-20 text-center text-white/50">
              No schemes found.
            </div>

          ) : (

            schemes.map((scheme) => (
              <RecommendationCard
                key={scheme.id}
                scheme={scheme}
              />
            ))

          )}

        </div>

      </div>

      {/* Right */}
      <div className="rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#0B1220] to-purple-500/10 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
            <Sparkles className="text-white" />
          </div>

          <div>

            <h3 className="text-2xl font-bold text-white">
              AI Match Score
            </h3>

            <p className="text-cyan-300">
              Personalized Recommendation
            </p>

          </div>

        </div>

        <div className="mt-10 flex items-center justify-center">

          <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-8 border-cyan-500/20">

            <div className="text-center">

              <div className="text-6xl font-extrabold text-cyan-400">
                96%
              </div>

              <div className="mt-2 text-white/50">
                Match
              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-green-400" />

            <div>

              <p className="font-semibold text-white">
                Excellent Eligibility
              </p>

              <p className="text-sm text-white/50">
                Based on your profile, you have a high probability of qualifying for multiple government schemes.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}