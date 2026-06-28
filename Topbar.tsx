import { Search, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Topbar() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#0B0F19] px-8 py-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          {t("nav.dashboard")}
        </h1>

        <p className="mt-1 text-white/40">
          {t("dashboard.welcome")}
        </p>
      </div>

      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827] px-4 py-3">

          <Search size={18} className="text-white/40" />

          <input
            placeholder={t("common.search")}
            className="bg-transparent text-white outline-none placeholder:text-white/30"
          />

        </div>

        {/* Notification */}
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827] text-white/70 transition hover:text-cyan-400">

          <Bell size={20} />

        </button>

        <LanguageSwitcher />

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-lg font-bold text-white">
            S
          </div>

          <div>

            <h3 className="font-semibold text-white">
              Shivam
            </h3>

            <p className="text-sm text-white/40">
              Student
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}