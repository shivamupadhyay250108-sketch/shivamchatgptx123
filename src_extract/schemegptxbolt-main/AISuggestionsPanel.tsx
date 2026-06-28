import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Clock, IndianRupee, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';
import type { AIMissedSuggestion } from '../../services/missed-opportunities.service';
import { cn } from '../ui/utils';

interface AISuggestionsPanelProps {
  suggestions: AIMissedSuggestion[];
  isLoading?: boolean;
}

const priorityColors = {
  high: 'bg-red-500/20 border-red-500/30 text-red-400',
  medium: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
  low: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
};

const priorityBorders = {
  high: 'border-l-red-500',
  medium: 'border-l-orange-500',
  low: 'border-l-blue-500',
};

export function AISuggestionsPanel({ suggestions, isLoading }: AISuggestionsPanelProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{t('missed.aiSuggestions')}</h2>
            <p className="text-sm text-white/50">{t('missed.aiSuggestionsDescription')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-xl border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-white/50">{t('missed.allCaughtUp')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 border-l-4 transition hover:bg-white/10',
                  priorityBorders[suggestion.priority]
                )}
              >
                {/* Priority Badge */}
                <div className="flex flex-col items-center gap-2">
                  <span className={cn(
                    'rounded-full border px-2 py-0.5 text-xs font-semibold capitalize',
                    priorityColors[suggestion.priority]
                  )}>
                    {t(`missed.priority.${suggestion.priority}`)}
                  </span>
                  <span className="text-xs text-white/30">#{index + 1}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white mb-1">
                    {suggestion.action}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={12} className="text-green-400" />
                      <span>{suggestion.benefit}</span>
                    </div>
                    {suggestion.deadline && (
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-orange-400" />
                        <span>{suggestion.deadline}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Arrow */}
                <ArrowRight
                  size={18}
                  className="text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
