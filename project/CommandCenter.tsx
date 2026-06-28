import {
  Sparkles,
  ArrowRight,
  Bell,
  IndianRupee,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function CommandCenter() {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-cyan-500/20 bg-[#111827] p-8">

      {/* Glow Effects */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              Welfare Twin
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Welcome Back 👋
            </h1>

            <p className="mt-3 max-w-2xl text-white/60">
              AI has analyzed your profile and found high-value welfare
              opportunities available for you.
            </p>

          </div>

          <div className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-3 text-green-400">
            AI Confidence 98%
          </div>

        </div>

        {/* Main Stats */}

        <div className="mt-10 grid gap-5 md:grid-cols-4">

          <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-5">

            <p className="text-sm text-white/50">
              Potential Benefits
            </p>

            <div className="mt-3 flex items-center gap-2">

              <IndianRupee size={24} className="text-cyan-400" />

              <h3 className="text-3xl font-bold text-white">
                14.7L
              </h3>

            </div>

          </div>

          <div className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-5">

            <p className="text-sm text-white/50">
              Eligible Schemes
            </p>

            <h3 className="mt-3 text-3xl font-bold text-white">
              127
            </h3>

          </div>

          <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-5">

            <p className="text-sm text-white/50">
              Deadlines
            </p>

            <div className="mt-3 flex items-center gap-2">

              <Clock3 size={22} className="text-orange-400" />

              <h3 className="text-3xl font-bold text-white">
                12
              </h3>

            </div>

          </div>

          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-5">

            <p className="text-sm text-white/50">
              Approved
            </p>

            <div className="mt-3 flex items-center gap-2">

              <ShieldCheck size={22} className="text-green-400" />

              <h3 className="text-3xl font-bold text-white">
                4
              </h3>

            </div>

          </div>

        </div>

        {/* AI Alert */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

              <Sparkles className="text-cyan-400" />

            </div>

            <div>

              <h3 className="text-lg font-semibold text-white">
                AI Insight
              </h3>

              <p className="text-white/50">
                Upload Income Certificate to unlock 23 additional schemes.
              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:scale-105">

            Explore Benefits

            <ArrowRight size={18} />

          </button>

        </div>

        {/* Notifications */}

        <div className="mt-6 flex items-center gap-3 text-white/60">

          <Bell size={18} />

          <span>
            3 new opportunities discovered today
          </span>

        </div>

      </div>

    </div>
  );
}