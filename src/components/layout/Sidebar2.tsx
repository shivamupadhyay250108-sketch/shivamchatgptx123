import { motion } from 'framer-motion';
import { LayoutDashboard, Bot, FileText, Users, TriangleAlert as AlertTriangle, Bell, User, Settings, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../ui/utils';

const menuItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'aiAssistant', icon: Bot, path: '/assistant' },
  { key: 'schemes', icon: FileText, path: '/scheme' },
  { key: 'familyWelfare', icon: Users, path: '/family' },
  { key: 'missedOpportunities', icon: AlertTriangle, path: '/missed' },
  { key: 'notifications', icon: Bell, path: '/notifications' },
  { key: 'profile', icon: User, path: '/profile' },
  { key: 'settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white">
            SchemeGPT
            <span className="text-cyan-400"> X</span>
          </h1>
          <p className="mt-2 text-sm text-white/40">
            {t('sidebar.tagline')}
          </p>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const label = t(`nav.${item.key}`);

          return (
            <motion.button
              key={item.key}
              onClick={() => navigate(item.path)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                'group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                )}
              >
                <Icon size={20} />
              </div>
              <span className="font-medium text-[15px]">{label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto h-2 w-2 rounded-full bg-cyan-400"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Card */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">
              {t('sidebar.matchScore')}
            </span>
          </div>
          <div className="text-4xl font-bold text-cyan-400">92%</div>
          <p className="mt-2 text-sm text-white/50">
            {t('sidebar.matchDescription')}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
            />
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
