import {
  ArrowRight,
  ExternalLink,
  Globe,
} from "lucide-react";

import type { Scheme } from "../../lib/database.types";

interface Props {
  scheme: Scheme;
}

export default function ApplyNowCard({ scheme }: Props) {
  return (
    <div className="rounded-[32px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8">

      <h2 className="text-3xl font-bold text-white">
        Ready to Apply?
      </h2>

      <p className="mt-4 max-w-2xl text-white/60">
        Apply directly through the official government portal. Make sure you
        meet all eligibility criteria before submitting your application.
      </p>

      {/* Info Cards */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

          <p className="text-sm text-white/50">
            Current Status
          </p>

          <h3 className="mt-2 text-xl font-bold text-cyan-400">
            {scheme.status}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

          <p className="text-sm text-white/50">
            Official Website
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white break-all">
            {scheme.official_website}
          </h3>

        </div>

      </div>

      {/* Action Buttons */}

      <div className="mt-8 flex flex-wrap gap-4">

        <a
          href={scheme.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-7 py-4 font-semibold text-white transition hover:scale-105"
        >
          Apply Now
          <ArrowRight size={20} />
        </a>

        <a
          href={scheme.official_website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0B1220] px-7 py-4 font-semibold text-white transition hover:border-cyan-400"
        >
          <Globe size={18} />
          Official Website
          <ExternalLink size={18} />
        </a>

      </div>

    </div>
  );
}