import {
  Upload,
  Mic,
  Search,
  FileCheck,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    icon: Upload,
    title: "Upload Documents",
    desc: "Verify eligibility instantly",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    desc: "Talk in Hindi, English & more",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "Find Schemes",
    desc: "Discover all matching benefits",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: FileCheck,
    title: "Track Applications",
    desc: "Monitor approval status",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function SmartActionHub() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Smart Action Hub
          </h2>

          <p className="mt-2 text-white/50">
            Everything you need in one place
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#0B0F19]
                p-6
                text-left
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-cyan-500/30
              "
            >

              <div
                className={`
                  mb-6
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  ${action.gradient}
                `}
              >
                <Icon
                  size={30}
                  className="text-white"
                />
              </div>

              <h3 className="text-xl font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-white/50">
                {action.desc}
              </p>

              <div className="mt-6 flex items-center gap-2 text-cyan-400">

                Open

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}