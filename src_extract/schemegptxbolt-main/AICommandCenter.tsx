import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

export default function AICommandCenter() {
  return (
    <section className="relative overflow-hidden rounded-[42px] border border-cyan-500/20 bg-gradient-to-br from-[#0B1325] via-[#111827] to-[#161B2F] p-10">

      {/* Aurora Background */}

      <div className="absolute inset-0">

        <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />

        <div className="absolute right-10 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[150px] animate-pulse" />

      </div>

      {/* Floating Blur */}

      <div className="absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/5 blur-[170px]" />

      <div className="relative z-10 grid gap-10 xl:grid-cols-[1.3fr_0.8fr]">

        {/* LEFT */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2">

            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-cyan-300">
              AI Welfare Twin Online
            </span>

          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.45em] text-cyan-400">
            SchemeGPT Intelligence
          </p>

          <h1 className="mt-5 text-7xl font-black leading-[1] text-white">

            Your

            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">

              AI Welfare

            </span>

            <br />

            Twin

          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-white/60">

            Continuously discovering schemes, predicting eligibility,
            optimizing benefits and guiding every application using AI.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="group rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-semibold text-white transition hover:scale-105">

              <span className="flex items-center gap-3">

                Explore Opportunities

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </span>

            </button>

            <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white hover:bg-white/10">

              AI Report

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-center">

          <div className="relative flex h-[420px] w-[420px] items-center justify-center">

            {/* Rings */}

            <div className="absolute h-[340px] w-[340px] rounded-full border border-cyan-500/10 animate-pulse" />

            <div className="absolute h-[270px] w-[270px] rounded-full border border-cyan-400/20" />

            <div className="absolute h-[200px] w-[200px] rounded-full border border-purple-500/20" />

            {/* Brain */}

            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_80px_rgba(34,211,238,0.45)]">

              <BrainCircuit
                size={58}
                className="text-white"
              />

            </div>

            {/* Floating Cards */}

            <div className="absolute left-0 top-10 rounded-3xl border border-white/10 bg-[#111827]/80 px-6 py-5 backdrop-blur-xl">

              <p className="text-sm text-white/40">

                Benefits

              </p>

              <h3 className="mt-2 text-4xl font-bold text-cyan-400">

                ₹14.7L

              </h3>

            </div>

            <div className="absolute right-0 top-40 rounded-3xl border border-white/10 bg-[#111827]/80 px-6 py-5 backdrop-blur-xl">

              <p className="text-sm text-white/40">

                Schemes

              </p>

              <h3 className="mt-2 text-4xl font-bold text-purple-400">

                127

              </h3>

            </div>

            <div className="absolute bottom-4 right-10 rounded-3xl border border-white/10 bg-[#111827]/80 px-6 py-5 backdrop-blur-xl">

              <div className="flex items-center gap-2">

                <TrendingUp
                  size={18}
                  className="text-green-400"
                />

                <span className="text-sm text-white/50">

                  AI Confidence

                </span>

              </div>

              <h3 className="mt-2 text-5xl font-bold text-green-400">

                98%

              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Strip */}

      <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <ShieldCheck className="text-cyan-400" />

          <h3 className="mt-4 text-xl font-bold text-white">

            Verified AI

          </h3>

          <p className="mt-2 text-white/50">

            Government datasets continuously synced.

          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <TrendingUp className="text-green-400" />

          <h3 className="mt-4 text-xl font-bold text-white">

            Live Intelligence

          </h3>

          <p className="mt-2 text-white/50">

            Scanning new schemes every few minutes.

          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <BadgeCheck className="text-purple-400" />

          <h3 className="mt-4 text-xl font-bold text-white">

            Personalized

          </h3>

          <p className="mt-2 text-white/50">

            Recommendations built uniquely for your profile.

          </p>

        </div>

      </div>

    </section>
  );
}