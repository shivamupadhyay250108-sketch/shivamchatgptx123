import { Globe, ExternalLink, CircleHelp as HelpCircle, ShieldCheck, FileText } from "lucide-react";
import type { Scheme } from "../../lib/database.types";
type Props = {
  scheme: Scheme;
};

export default function OfficialLinksCard({ scheme }: Props) {
  const links = [
    {
      title: "Apply Official Portal",
      desc: "Submit your scholarship application",
      icon: Globe,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      url: scheme.apply_link,
    },
    {
      title: "Official Website",
      desc: "Government scheme information",
      icon: ShieldCheck,
      color: "text-green-400",
      bg: "bg-green-500/10",
      url: scheme.official_website,
    },
    {
      title: "Track / Documents",
      desc: "Visit official portal",
      icon: FileText,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      url: scheme.official_website,
    },
    {
      title: "Help & Support",
      desc:
        scheme.official_helpline ||
        "Contact official government helpline",
      icon: HelpCircle,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      url: scheme.official_website,
    },
  ];

  return (
    <div className="rounded-[36px] border border-cyan-500/10 bg-gradient-to-br from-[#0B1220] via-[#0A1020] to-[#080E1A] p-8">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>
          <h2 className="text-4xl font-bold text-white">
            Official Government Links
          </h2>

          <p className="mt-2 text-white/50">
            Secure access to verified government portals
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-blue-400">
          <ShieldCheck size={16} />
          Verified Sources
        </div>

      </div>

      {/* Links */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <div
              key={link.title}
              className="group flex items-center justify-between rounded-3xl border border-white/10 bg-black/20 p-6 transition-all hover:-translate-y-1 hover:border-cyan-400/30"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${link.bg}`}
                >
                  <Icon
                    className={link.color}
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {link.title}
                  </h3>

                  <p className="text-sm text-white/40">
                    {link.desc}
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  window.open(link.url, "_blank")
                }
                className="rounded-xl bg-white/5 p-3 transition hover:bg-white/10"
              >
                <ExternalLink
                  className="text-white/70"
                  size={18}
                />
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}