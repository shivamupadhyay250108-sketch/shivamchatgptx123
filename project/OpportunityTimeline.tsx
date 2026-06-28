import { Clock3, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from "lucide-react";

const opportunities = [
  {
    scheme: "PM Yasasvi Scholarship",
    date: "3 Days Left",
    status: "urgent",
  },
  {
    scheme: "AICTE Pragati",
    date: "8 Days Left",
    status: "active",
  },
  {
    scheme: "Post Matric Scholarship",
    date: "14 Days Left",
    status: "active",
  },
  {
    scheme: "Startup India Seed Fund",
    date: "Applied",
    status: "completed",
  },
];

export default function OpportunityTimeline() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Opportunity Timeline
        </h2>

        <p className="mt-2 text-white/50">
          Important deadlines and application progress
        </p>

      </div>

      <div className="space-y-5">

        {opportunities.map((item) => (
          <div
            key={item.scheme}
            className="
              flex items-center justify-between
              rounded-3xl
              border border-white/10
              bg-[#0B0F19]
              p-5
            "
          >

            <div className="flex items-center gap-4">

              <div
                className={`
                  flex h-12 w-12 items-center justify-center rounded-2xl
                  ${
                    item.status === "urgent"
                      ? "bg-red-500/10"
                      : item.status === "completed"
                      ? "bg-green-500/10"
                      : "bg-cyan-500/10"
                  }
                `}
              >
                {item.status === "urgent" && (
                  <AlertCircle className="text-red-400" size={22} />
                )}

                {item.status === "active" && (
                  <Clock3 className="text-cyan-400" size={22} />
                )}

                {item.status === "completed" && (
                  <CheckCircle2 className="text-green-400" size={22} />
                )}
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {item.scheme}
                </h3>

                <p className="text-sm text-white/40">
                  Government Scheme
                </p>

              </div>

            </div>

            <div
              className={`
                rounded-full px-4 py-2 text-sm font-semibold
                ${
                  item.status === "urgent"
                    ? "bg-red-500/10 text-red-400"
                    : item.status === "completed"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-cyan-500/10 text-cyan-400"
                }
              `}
            >
              {item.date}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}