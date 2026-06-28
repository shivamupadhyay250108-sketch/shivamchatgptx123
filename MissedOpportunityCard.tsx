import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, IndianRupee, ExternalLink, TriangleAlert as AlertTriangle, FileText, User, ArrowRight, Ban, TrendingUp } from 'lucide-react';
import type { MissedOpportunity } from '../../services/missed-opportunities.service';
import { cn } from '../ui/utils';

interface MissedOpportunityCardProps {
  item: MissedOpportunity;
  onApply?: (schemeId: string) => void;
}

const typeConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  expired: { label: 'expired', color: 'from-red-500 to-orange-500', icon: <Ban size={14} /> },
  income_mismatch: { label: 'incomeMismatch', color: 'from-orange-500 to-yellow-500', icon: <IndianRupee size={14} /> },
  age_mismatch: { label: 'ageMismatch', color: 'from-yellow-500 to-amber-500', icon: <User size={14} /> },
  category_mismatch: { label: 'categoryMismatch', color: 'from-purple-500 to-pink-500', icon: <AlertTriangle size={14} /> },
  state_mismatch: { label: 'stateMismatch', color: 'from-blue-500 to-cyan-500', icon: <ArrowRight size={14} /> },
  missing_documents: { label: 'missingDocuments', color: 'from-orange-500 to-red-500', icon: <FileText size={14} /> },
  upcoming: { label: 'upcoming', color: 'from-cyan-500 to-blue-500', icon: <TrendingUp size={14} /> },
  unclaimed: { label: 'unclaimed', color: 'from-green-500 to-emerald-500', icon: <IndianRupee size={14} /> },
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export function MissedOpportunityCard({ item, onApply }: MissedOpportunityCardProps) {
  const { t } = useTranslation();
  const config = typeConfig[item.type] || typeConfig.missing_documents;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl transition-all hover:border-white/20"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
              config.color,
              'text-white'
            )}>
              {config.icon}
              {t(`missed.types.${config.label}`)}
            </span>
            <span className={cn(
              'rounded-full border px-2 py-0.5 text-xs font-semibold capitalize',
              priorityColors[item.priority]
            )}>
              {t(`missed.priority.${item.priority}`)}
            </span>
          </div>
        </div>

        {/* Scheme Name */}
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {item.scheme.name}
        </h3>

        {/* Reason */}
        <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-white/5">
          <AlertTriangle size={16} className="text-orange-400 shrink-0 mt-0.5" />
          <p className="text-sm text-white/70">{item.reason}</p>
        </div>

        {/* Benefit & Deadline */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-green-400">
            <IndianRupee size={16} />
            <span className="font-semibold">{item.estimatedBenefit}</span>
          </div>
          {item.deadline && (
            <div className="flex items-center gap-2 text-white/50">
              <Clock size={14} />
              <span>{item.deadline}</span>
            </div>
          )}
        </div>

        {/* How to Fix */}
        <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <ArrowRight size={16} className="text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              {t('missed.howToFix')}
            </p>
            <p className="text-sm text-white/70">{item.howToFix}</p>
          </div>
        </div>

        {/* Related Member */}
        {item.relatedMember && (
          <div className="flex items-center gap-2 mb-4 text-xs text-white/40">
            <User size={12} />
            <span>{item.relatedMember.name}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {item.canFix && item.scheme.status !== 'Closed' && (
            <button
              onClick={() => onApply?.(item.scheme.id)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              {t('missed.applyNow')}
            </button>
          )}
          <a
            href={item.scheme.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
