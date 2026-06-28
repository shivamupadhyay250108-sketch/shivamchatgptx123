import {
  IndianRupee,
  GraduationCap,
  BookOpen,
  Trophy,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import type { Scheme } from "../../lib/database.types";

interface Props {
  scheme: Scheme;
}

export default function BenefitsCard({ scheme }: Props) {
  const benefits = [
    {
      icon: IndianRupee,
      title: "Estimated Benefit",
      description: scheme.estimated_benefit,
      stat: `${scheme.ai_score}%`,
      color: "from-green-500/20 to-emerald-500/10",
      iconColor: "text-green-400",
    },
    {
      icon: GraduationCap,
      title: "Benefit Type",
      description: scheme.benefit_type,
      stat: `${scheme.success_probability ?? 90}%`,
      color: "from-cyan-500/20 to-blue-500/10",
      iconColor: "text-cyan-400",
    },
    {
      icon: BookOpen,
      title: "Processing Time",
      description:
        scheme.processing_time ?? "Processing time will be updated.",
      stat: "100%",
      color: "from-orange-500/20 to-yellow-500/10",
      iconColor: "text-orange-400",
    },
    {
      icon: Trophy,
      title: "Difficulty",
      description:
        scheme.difficulty ?? "Easy",
      stat: `${scheme.ai_score}%`,
      color: "from-purple-500/20 to-pink-500/10",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-[36px]
      border border-cyan-500/20
      bg-[#111827]
      p-8
    "
    >
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Header */}

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
            <Sparkles
              className="text-cyan-400"
              size={22}
            />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              Scheme Benefits
            </h2>

            <p className="text-white/50">
              AI generated overview
            </p>

          </div>

        </div>

        <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
          {scheme.status}
        </div>

      </div>

      {/* Stats */}

      <div className="relative z-10 mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-white/5 bg-[#0B1220] p-5">

          <p className="text-sm text-white/40">
            Estimated Benefit
          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-400">
            {scheme.estimated_benefit}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0B1220] p-5">

          <p className="text-sm text-white/40">
            AI Match
          </p>

          <h3 className="mt-2 text-3xl font-bold text-cyan-400">
            {scheme.ai_score}%
          </h3>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0B1220] p-5">

          <p className="text-sm text-white/40">
            Success Probability
          </p>

          <h3 className="mt-2 text-3xl font-bold text-purple-400">
            {scheme.success_probability ?? 90}%
          </h3>

        </div>

      </div>

      {/* Cards */}

      <div className="relative z-10 mt-8 grid gap-6 md:grid-cols-2">

        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="
                group
                rounded-3xl
                border border-white/5
                bg-[#0B1220]
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-cyan-500/30
              "
            >
              <div className="flex items-start justify-between">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.color}`}
                >
                  <Icon
                    size={26}
                    className={benefit.iconColor}
                  />
                </div>

                <ArrowUpRight className="text-white/30 group-hover:text-cyan-400" />

              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                {benefit.title}
              </h3>

              <p className="mt-3 text-white/50">
                {benefit.description}
              </p>

              <div className="mt-5">

                <div className="flex justify-between text-sm">

                  <span className="text-white/40">
                    AI Score
                  </span>

                  <span className="text-cyan-400">
                    {benefit.stat}
                  </span>

                </div>

                <div className="mt-2 h-2 rounded-full bg-white/5">

                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    style={{
                      width: benefit.stat,
                    }}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}