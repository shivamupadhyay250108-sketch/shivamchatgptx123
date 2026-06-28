import {
  ArrowUpRight,
  Clock3,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

const opportunities = [
  {
    name: "PM Yasasvi Scholarship",
    match: "96%",
    benefit: "₹1.25L",
    deadline: "3 Days Left",
    color: "from-cyan-500 to-purple-500",
  },
  {
    name: "AICTE Pragati Scholarship",
    match: "94%",
    benefit: "₹50K",
    deadline: "8 Days Left",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Ayushman Bharat",
    match: "91%",
    benefit: "Health Coverage",
    deadline: "Active",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Startup India Seed Fund",
    match: "88%",
    benefit: "₹10L Funding",
    deadline: "Open",
    color: "from-orange-500 to-red-500",
  },
];

export default function LiveOpportunityEngine() {
  return (
    <div className="rounded-[40px] border border-cyan-500/10 bg-[#111827] p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
            Live Intelligence
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Opportunity Engine
          </h2>

          <p className="mt-2 text-white/50">
            AI continuously scans welfare opportunities for you
          </p>

        </div>

        <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-400">
          ● Live Scanning
        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {opportunities.map((item) => (
          <div
            key={item.name}
            className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0B1220] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
          >

            <div
              className={`absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-r ${item.color} opacity-20 blur-3xl`}
            />

            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-2xl font-bold text-white">
                  {item.name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">

                  <div className="rounded-full bg-cyan-500/10 px-3 py-2 text-cyan-400">
                    Match {item.match}
                  </div>

                  <div className="rounded-full bg-green-500/10 px-3 py-2 text-green-400">
                    {item.benefit}
                  </div>

                </div>

              </div>

              <ArrowUpRight className="text-cyan-400 transition group-hover:translate-x-1 group-hover:-translate-y-1" />

            </div>

            <div className="mt-6 flex items-center justify-between">

              <div className="flex items-center gap-2 text-white/50">

                <Clock3 size={16} />

                {item.deadline}

              </div>

              <div className="flex items-center gap-2 text-white/50">

                <ShieldCheck size={16} />

                AI Verified

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Bottom Insight Bar */}

      <div className="mt-8 rounded-[28px] border border-cyan-500/20 bg-cyan-500/5 p-5">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <IndianRupee className="text-cyan-400" />

            <div>

              <p className="text-sm text-white/50">
                Estimated Total Benefits
              </p>

              <h3 className="text-2xl font-bold text-white">
                ₹14.7 Lakhs
              </h3>

            </div>

          </div>

          <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-semibold text-white">
            View All Opportunities
          </button>

        </div>

      </div>

    </div>
  );
}