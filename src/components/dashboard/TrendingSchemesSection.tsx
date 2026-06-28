import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Clock, IndianRupee, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Scheme } from '../../lib/database.types';
import { getTrendingSchemes } from '../../services/scheme.service';

export function TrendingSchemesSection() {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrending();
  }, []);

  async function loadTrending() {
    try {
      const data = await getTrendingSchemes(8);
      setSchemes(data);
    } catch (error) {
      console.error('Error loading trending schemes:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Closing Soon':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Closed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section className="mb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {t('dashboard.trendingSchemes')}
            </h2>
            <p className="text-sm text-white/50">
              {t('dashboard.trendingSchemesDescription')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {t('dashboard.newSchemesDiscovered')}
        </div>
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-3xl border border-white/10 bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl transition-all hover:border-purple-500/30"
            >
              <div className="p-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(scheme.status)}`}>
                    {scheme.status}
                  </span>
                  <span className="text-2xl font-bold text-purple-400">#{index + 1}</span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {scheme.name}
                </h3>
                <p className="text-sm text-white/50 mb-4 truncate">
                  {scheme.ministry}
                </p>

                {/* Details */}
                <div className="flex items-center gap-3 mb-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <IndianRupee size={14} className="text-green-400" />
                    <span>{scheme.estimated_benefit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-orange-400" />
                    <span>{scheme.closing_date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/scheme/${scheme.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {t('dashboard.viewDetails')}
                  </Link>
                  <a
                    href={scheme.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
