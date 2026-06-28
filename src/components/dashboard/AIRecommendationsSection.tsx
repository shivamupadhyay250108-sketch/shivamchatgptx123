import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowUpRight, Clock, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Scheme } from '../../lib/database.types';
import { getAllSchemes } from '../../services/scheme.service';
import { cn } from '../ui/utils';

export function AIRecommendationsSection() {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  async function loadRecommendations() {
    try {
      const data = await getAllSchemes();
      setSchemes(data?.slice(0, 6) ?? []);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {t('dashboard.aiRecommendations')}
            </h2>
            <p className="text-sm text-white/50">
              {t('dashboard.aiRecommendationsDescription')}
            </p>
          </div>
        </div>
        <Link
          to="/scheme"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-white/10"
        >
          {t('dashboard.viewAll')}
          <ArrowUpRight size={16} />
        </Link>
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-3xl border border-white/10 bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {scheme.name}
                    </h3>
                    <p className="text-sm text-white/40 mt-1 truncate">
                      {scheme.ministry}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shrink-0">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <IndianRupee size={14} className="text-green-400" />
                    <span className="text-white/70">{scheme.estimated_benefit}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock size={14} className="text-orange-400" />
                    <span className="text-white/70">{scheme.closing_date}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  {/* Match Score */}
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={cn(
                          'h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500',
                          scheme.ai_score >= 90 && 'from-green-400 to-emerald-500'
                        )}
                        style={{ width: `${scheme.ai_score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-cyan-400">
                      {scheme.ai_score}%
                    </span>
                  </div>

                  {/* View Button */}
                  <Link
                    to={`/scheme/${scheme.id}`}
                    className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {t('dashboard.viewDetails')}
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
