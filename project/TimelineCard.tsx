import { Calendar, Clock3, Sparkles, Rocket, Shield, CircleCheck as CheckCircle2 } from "lucide-react";

import type { Scheme } from "../../lib/database.types";

interface Props {
  scheme: Scheme;
}

export default function TimelineCard({ scheme }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-cyan-500/20 bg-gradient-to-br from-[#081225] via-[#0B132B] to-[#101827] p-8">

      {/* Glow */}

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-4xl font-bold text-white">
              Scheme Timeline
            </h2>

            <p className="mt-2 text-white/50">
              Important dates & AI insights about this scheme.
            </p>

          </div>

          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-400">
            Live Scheme Data
          </div>

        </div>

        {/* Timeline */}

        <div className="mt-10 space-y-6">

          <div className="flex items-start gap-5">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10">
              <Calendar className="text-cyan-400" />
            </div>

            <div>

              <h3 className="text-xl font-semibold text-white">
                Applications Open
              </h3>

              <p className="mt-2 text-white/60">
                {scheme.opening_date}
              </p>

            </div>

          </div>

          <div className="flex items-start gap-5">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
              <Clock3 className="text-orange-400" />
            </div>

            <div>

              <h3 className="text-xl font-semibold text-white">
                Last Date to Apply
              </h3>

              <p className="mt-2 text-white/60">
                {scheme.closing_date}
              </p>

            </div>

          </div>

          <div className="flex items-start gap-5">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Rocket className="text-purple-400" />
            </div>

            <div>

              <h3 className="text-xl font-semibold text-white">
                Processing Time
              </h3>

              <p className="mt-2 text-white/60">
                {scheme.processing_time ?? "7 - 15 Days"}
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Cards */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-5">

            <Sparkles className="mb-3 text-cyan-400" />

            <p className="text-white/50">
              AI Match Score
            </p>

            <h3 className="mt-2 text-3xl font-bold text-cyan-400">
              {scheme.ai_score}%
            </h3>

          </div>

          <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-5">

            <CheckCircle2 className="mb-3 text-green-400" />

            <p className="text-white/50">
              Success Probability
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-400">
              {scheme.success_probability ?? 90}%
            </h3>

          </div>

          <div className="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-5">

            <Shield className="mb-3 text-orange-400" />

            <p className="text-white/50">
              Current Status
            </p>

            <h3 className="mt-2 text-2xl font-bold text-orange-400">
              {scheme.status}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}