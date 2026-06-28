import {
  LayoutDashboard,
  Bot,
  FileText,
  Bell,
  Settings,
  User,
} from 'lucide-react'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0B0F19] px-6 py-8">

      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white">
          SchemeGPT
          <span className="text-cyan-400"> X</span>
        </h1>

        <p className="mt-2 text-sm text-white/40">
          {t("sidebar.tagline")}
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-3">

      <MenuItem
        icon={<LayoutDashboard size={20} />}
        title={t("nav.dashboard")}
        onClick={() => navigate('/dashboard')}
      />

      <MenuItem
        icon={<Bot size={20} />}
        title={t("nav.ai")}
        onClick={() => navigate('/assistant')}
      />

      <MenuItem
        icon={<FileText size={20} />}
        title={t("nav.schemes")}
        onClick={() => navigate('/scheme')}
      />

      <MenuItem
        icon={<User size={20} />}
        title={t("nav.profile")}
        onClick={() => navigate('/family')}
      />

      <MenuItem
        icon={<Bell size={20} />}
        title={t("nav.notifications")}
        onClick={() => navigate('/notifications')}
      />

      <MenuItem
        icon={<Settings size={20} />}
        title={t("nav.settings")}
        onClick={() => navigate('/settings')}
      />

      </div>

      {/* Bottom Card */}
      <div className="mt-auto rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-5">

        <h3 className="text-lg font-semibold text-white">
          {t("sidebar.matchScore")}
        </h3>

        <div className="mt-3 text-4xl font-bold text-cyan-400">
          92%
        </div>

        <p className="mt-2 text-sm text-white/50">
          {t("sidebar.matchDescription")}
        </p>

      </div>

    </div>
  )
}

function MenuItem({
  icon,
  title,
  onClick,
  active = false,
}: {
  icon: React.ReactNode
  title: string
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
        active
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>
    </button>
  )
}