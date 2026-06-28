import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, IndianRupee, Sparkles, FileText, Award } from 'lucide-react';
import type { FamilyStats } from '../../services/family.service';
import { cn } from '../ui/utils';

interface FamilyStatsCardsProps {
  stats: FamilyStats;
}

export function FamilyStatsCards({ stats }: FamilyStatsCardsProps) {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('family.stats.totalMembers'),
      value: stats.totalMembers,
      icon: Users,
      gradient: 'from-cyan-500 to-blue-500',
      suffix: '',
    },
    {
      title: t('family.stats.totalIncome'),
      value: stats.totalIncome.toLocaleString('en-IN'),
      icon: IndianRupee,
      gradient: 'from-green-500 to-emerald-500',
      suffix: t('family.perYear'),
    },
    {
      title: t('family.stats.welfareScore'),
      value: stats.welfareScore,
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
      suffix: '/100',
      isScore: true,
    },
    {
      title: t('family.stats.documentsComplete'),
      value: stats.documentsComplete,
      icon: FileText,
      gradient: 'from-orange-500 to-yellow-500',
      suffix: `/${stats.documentsComplete + stats.documentsPending}`,
    },
    {
      title: t('family.stats.eligibleCategories'),
      value: stats.eligibleCategories.length,
      icon: Award,
      gradient: 'from-indigo-500 to-purple-500',
      suffix: t('family.categories.title'),
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-6 transition-all hover:border-white/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r text-white shadow-lg',
                card.gradient
              )}>
                <Icon size={22} />
              </div>
              {card.isScore && (
                <div className={cn('text-2xl font-bold', getScoreColor(card.value as number))}>
                  {card.value}
                </div>
              )}
            </div>

            {!card.isScore && (
              <div className="text-2xl font-bold text-white mb-1">
                {card.value}
              </div>
            )}

            <p className="text-sm text-white/50">{card.title}</p>

            {card.suffix && (
              <p className="text-xs text-white/30 mt-1">{card.suffix}</p>
            )}

            {card.isScore && (
              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${card.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={cn(
                    'h-full rounded-full bg-gradient-to-r',
                    (card.value as number) >= 80
                      ? 'from-green-500 to-emerald-500'
                      : (card.value as number) >= 60
                        ? 'from-yellow-500 to-orange-500'
                        : (card.value as number) >= 40
                          ? 'from-orange-500 to-red-500'
                          : 'from-red-500 to-pink-500'
                  )}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
