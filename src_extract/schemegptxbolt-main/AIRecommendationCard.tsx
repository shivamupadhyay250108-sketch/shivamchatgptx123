import { Sparkles } from "lucide-react";
import type { Scheme } from "../../lib/database.types";

type Props = {
  scheme: Scheme;
};

export default function AIRecommendationCard({ scheme }: Props) {
  return (
    <div className="rounded-[30px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
          <Sparkles className="text-white" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Recommendation
          </h2>

          <p className="text-cyan-300">
            Match Score • {scheme.ai_score}%
          </p>
        </div>

      </div>

      <p className="mt-6 leading-8 text-white/70">
        {scheme.why_eligible}
      </p>

      {scheme.ai_tips.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-cyan-300">
            AI Tips
          </h3>

          <ul className="space-y-3">
            {scheme.ai_tips.map((tip, index) => (
              <li
                key={index}
                className="rounded-xl border border-cyan-500/10 bg-black/20 p-3 text-white/70"
              >
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {scheme.common_mistakes.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-red-300">
            Common Mistakes
          </h3>

          <ul className="space-y-3">
            {scheme.common_mistakes.map((item, index) => (
              <li
                key={index}
                className="rounded-xl border border-red-500/10 bg-red-500/5 p-3 text-white/70"
              >
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}