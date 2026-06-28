import {
  ShieldCheck,
  Bookmark,
  ArrowRight,
  Sparkles,
  Clock3,
  IndianRupee,
} from "lucide-react";

import type { Scheme } from "../../lib/database.types";

interface Props {
  scheme: Scheme;
}

export default function SchemeHeader({ scheme }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0B1220]">

      <div className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[120px]" />

      {/* Hero */}

      <div className="relative h-[320px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt={scheme.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/60 to-[#0B1220]/90" />

        <div className="absolute left-6 top-6">
          <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300 backdrop-blur-md">
            <ShieldCheck size={16} />
            Government Verified
          </div>
        </div>

        <div className="absolute right-6 top-6">
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-md">
            <Sparkles size={16} />
            AI Recommended
          </div>
        </div>

      </div>

      {/* Content */}

      <div className="relative z-10 p-8 md:p-10">

        <p className="text-xs uppercase tracking-[0.45em] text-cyan-400">
          {scheme.ministry}
        </p>

        <h1 className="mt-4 text-5xl font-extrabold text-white md:text-6xl">
          {scheme.name}
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-white/60">
          {scheme.description}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
            <p className="text-xs text-white/50">
              AI Match Score
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              {scheme.ai_score}%
            </h3>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-xs text-white/50">
              Estimated Benefit
            </p>

            <h3 className="mt-2 flex items-center gap-1 text-2xl font-bold text-green-400">
              <IndianRupee size={18} />
              {scheme.estimated_benefit}
            </h3>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
            <p className="text-xs text-white/50">
              Success Probability
            </p>

            <h3 className="mt-2 text-2xl font-bold text-purple-400">
              {scheme.success_probability ?? 90}%
            </h3>
          </div>

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
            <p className="text-xs text-white/50">
              Closing Date
            </p>

            <h3 className="mt-2 flex items-center gap-2 text-lg font-bold text-orange-400">
              <Clock3 size={16} />
              {scheme.closing_date}
            </h3>
          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <a
            href={scheme.apply_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Apply Now
            <ArrowRight size={18} />
          </a>

          <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-white hover:bg-white/10">
            <Bookmark size={16} />
            Save Scheme
          </button>

        </div>

      </div>

    </div>
  );
}