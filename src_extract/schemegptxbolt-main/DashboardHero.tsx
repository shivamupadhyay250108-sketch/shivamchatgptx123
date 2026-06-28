import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, IndianRupee, FileText, CircleCheck as CheckCircle, Clock, Bell, TrendingUp } from 'lucide-react';
import { cn } from '../ui/utils';

interface HeroStats {
  aiMatchScore: number;
  totalBenefits: string;
  eligibleSchemes: number;
  appliedSchemes: number;
  pendingApplications: number;
  recentNotifications: number;
}

interface DashboardHeroProps {
  stats?: HeroStats;
}

const defaultStats: HeroStats = {
  aiMatchScore: 92,
  totalBenefits: '₹14.7L',
  eligibleSchemes: 127,
  appliedSchemes: 4,
  pendingApplications: 3,
  recentNotifications: 12,
};

const statConfig = [
  {
    key: 'aiMatchScore',
    icon: Sparkles,
    gradient: 'from-cyan-500 to-purple-500',
    bgGradient: 'from-cyan-500/20 to-purple-500/20',
    textColor: 'text-cyan-400',
    format: (v: number | string) => (typeof v === 'number' ? `${v}%` : v),
  },
  {
    key: 'totalBenefits',
    icon: IndianRupee,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-400',
    format: (v: number | string) => v,
  },
  {
    key: 'eligibleSchemes',
    icon: FileText,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
    format: (v: number | string) => v,
  },
  {
    key: 'appliedSchemes',
    icon: CheckCircle,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    textColor: 'text-blue-400',
    format: (v: number | string) => v,
  },
  {
    key: 'pendingApplications',
    icon: Clock,
    gradient: 'from-orange-500 to-yellow-500',
    bgGradient: 'from-orange-500/20 to-yellow-500/20',
    textColor: 'text-orange-400',
    format: (v: number | string) => v,
  },
  {
    key: 'recentNotifications',
    icon: Bell,
    gradient: 'from-red-500 to-orange-500',
    bgGradient: 'from-red-500/20 to-orange-500/20',
    textColor: 'text-red-400',
    format: (v: number | string) => v,
  },
] as const;

export function DashboardHero({ stats = defaultStats }: DashboardHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative mb-10">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {t('dashboard.welcome')}, <span className="text-cyan-400">Shivam</span>
            </h1>
            <p className="text-white/50 mt-1">{t('dashboard.welcomeMessage')}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statConfig.map((stat, index) => {
          const Icon = stat.icon;
          const value = stats[stat.key as keyof HeroStats];

          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-6 transition-all duration-300',
                'hover:border-white/20 hover:shadow-lg'
              )}
            >
              {/* Background Glow */}
              <div
                className={cn(
                  'absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30',
                  stat.bgGradient
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  'mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r text-white shadow-lg',
                  stat.gradient
                )}
              >
                <Icon size={22} />
              </div>

              {/* Label */}
              <p className="text-sm text-white/50 mb-1">
                {t(`dashboard.${stat.key}`)}
              </p>

              {/* Value */}
              <p className={cn('text-3xl font-bold', stat.textColor)}>
                {stat.format(value)}
              </p>

              {/* Progress Bar for AI Match Score */}
              {stat.key === 'aiMatchScore' && (
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.aiMatchScore}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r',
                      stat.gradient
                    )}
                  />
                </div>
              )}

              {/* Trend indicator */}
              {stat.key === 'eligibleSchemes' && (
                <div className="mt-3 flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp size={14} />
                  <span>+12 this week</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
