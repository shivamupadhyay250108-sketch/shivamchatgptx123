import {
  ArrowRight,
  Calendar,
  IndianRupee,
  Sparkles,
  ExternalLink,
} from "lucide-react";

import type { Scheme } from "../../lib/database.types";

interface Props {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: Props) {
  const statusColor: Record<string, string> = {
    Open: "bg-green-500/20 text-green-400",
    "Closing Soon": "bg-yellow-500/20 text-yellow-400",
    Closed: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="group rounded-[32px] border border-white/10 bg-[#111827] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,.15)]">
      {/* Header */}

      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-white">
              {scheme.name}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusColor[scheme.status] ??
                "bg-gray-500/20 text-gray-300"
              }`}
            >
              {scheme.status}
            </span>

            {scheme.featured && (
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                ⭐ Featured
              </span>
            )}
          </div>

          <p className="mt-2 text-white/50">
            {scheme.ministry}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 text-center">
          <p className="text-xs text-white/50">
            AI Match
          </p>

          <h3 className="text-3xl font-bold text-cyan-400">
            {scheme.ai_score}%
          </h3>
        </div>
      </div>

      {/* Description */}

      <p className="mt-6 leading-7 text-white/60">
        {scheme.description}
      </p>

      {/* Stats */}

      <div className="mt-7 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <IndianRupee
            size={18}
            className="text-green-400"
          />

          <span>{scheme.estimated_benefit}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar
            size={18}
            className="text-orange-400"
          />

          <span>{scheme.closing_date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Sparkles
            size={18}
            className="text-cyan-400"
          />

          <span>{scheme.category}</span>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:scale-105">
            View Details
          </button>

          <a
            href={scheme.apply_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-white transition hover:border-cyan-400"
          >
            Apply

            <ExternalLink size={18} />
          </a>
        </div>

        <ArrowRight
          size={24}
          className="transition-transform group-hover:translate-x-2"
        />
      </div>
    </div>
  );
}