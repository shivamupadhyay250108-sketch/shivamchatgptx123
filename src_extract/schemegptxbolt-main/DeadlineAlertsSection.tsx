import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TriangleAlert as AlertTriangle, Clock, ArrowUpRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Scheme } from '../../lib/database.types';
import { getDeadlineAlerts } from '../../services/scheme.service';

export function DeadlineAlertsSection() {
  const { t } = useTranslation();
  const [deadlines, setDeadlines] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeadlines();
  }, []);

  async function loadDeadlines() {
    try {
      const data = await getDeadlineAlerts(30);
      setDeadlines(data);
    } catch (error) {
      console.error('Error loading deadlines:', error);
    } finally {
      setLoading(false);
    }
  }

  const getUrgencyLevel = (closingDate: string) => {
    const days = Math.ceil(
      (new Date(closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (days <= 3) return { level: 'urgent', color: 'red', label: t('dashboard.urgent') };
    if (days <= 7) return { level: 'warning', color: 'orange', label: t('dashboard.expiresSoon') };
    return { level: 'normal', color: 'cyan', label: t('dashboard.active') };
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {t('dashboard.deadlineAlerts')}
            </h2>
            <p className="text-sm text-white/50">
              {t('dashboard.deadlineAlertsDescription')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : deadlines.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No upcoming deadlines</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deadlines.map((scheme, index) => {
            const urgency = getUrgencyLevel(scheme.closing_date);
            const daysLeft = Math.ceil(
              (new Date(scheme.closing_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );

            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/scheme/${scheme.id}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-4 transition-all hover:border-white/20 hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        urgency.color === 'red'
                          ? 'bg-red-500/20'
                          : urgency.color === 'orange'
                          ? 'bg-orange-500/20'
                          : 'bg-cyan-500/20'
                      }`}
                    >
                      {urgency.level === 'urgent' ? (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      ) : (
                        <Clock
                          className={`h-5 w-5 ${
                            urgency.color === 'orange'
                              ? 'text-orange-400'
                              : 'text-cyan-400'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                        {scheme.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-white/50">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {scheme.closing_date}
                        </span>
                        <span>{scheme.estimated_benefit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center gap-4">
                    {/* Days left */}
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          urgency.color === 'red'
                            ? 'text-red-400'
                            : urgency.color === 'orange'
                            ? 'text-orange-400'
                            : 'text-cyan-400'
                        }`}
                      >
                        {daysLeft}
                      </div>
                      <div className="text-xs text-white/40">{t('dashboard.daysLeft')}</div>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        urgency.color === 'red'
                          ? 'bg-red-500/20 text-red-400'
                          : urgency.color === 'orange'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      {urgency.label}
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="text-white/30 transition group-hover:text-cyan-400"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
