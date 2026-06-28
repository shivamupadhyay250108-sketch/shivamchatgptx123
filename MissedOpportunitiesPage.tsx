import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TriangleAlert as AlertTriangle, Filter, TrendingUp } from 'lucide-react';
import { MissedOpportunityCard } from '../components/missed/MissedOpportunityCard';
import { AISuggestionsPanel } from '../components/missed/AISuggestionsPanel';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { FloatingParticles } from '../components/ui/FloatingParticles';
import { Sidebar } from '../components/layout/Sidebar2';
import { Topbar } from '../components/layout/Topbar2';
import {
  getMissedOpportunities,
  getAIMissedSuggestions,
} from '../services/missed-opportunities.service';
import { getFamilyMembers } from '../services/family.service';
import type { MissedOpportunity, AIMissedSuggestion, MissedType } from '../services/missed-opportunities.service';
import { cn } from '../components/ui/utils';

export function MissedOpportunitiesPage() {
  const { t } = useTranslation();
  const [missed, setMissed] = useState<MissedOpportunity[]>([]);
  const [suggestions, setSuggestions] = useState<AIMissedSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<MissedType | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const members = await getFamilyMembers();
      const missedData = await getMissedOpportunities(members);
      setMissed(missedData);

      const aiSuggestions = await getAIMissedSuggestions(missedData);
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Error loading missed opportunities:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMissed = missed.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
    return true;
  });

  const typeFilters: { value: MissedType | 'all'; label: string }[] = [
    { value: 'all', label: 'all' },
    { value: 'expired', label: 'expired' },
    { value: 'income_mismatch', label: 'incomeMismatch' },
    { value: 'age_mismatch', label: 'ageMismatch' },
    { value: 'category_mismatch', label: 'categoryMismatch' },
    { value: 'missing_documents', label: 'missingDocuments' },
    { value: 'upcoming', label: 'upcoming' },
  ];

  const stats = {
    total: missed.length,
    high: missed.filter(m => m.priority === 'high').length,
    medium: missed.filter(m => m.priority === 'medium').length,
    low: missed.filter(m => m.priority === 'low').length,
    fixable: missed.filter(m => m.canFix).length,
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <AnimatedBackground />
      <FloatingParticles />
      <Sidebar />
      <Topbar />

      <main className="ml-[280px] pt-20 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500">
                <AlertTriangle className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{t('missed.title')}</h1>
                <p className="text-white/50">{t('missed.subtitle')}</p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/50 text-sm">{t('missed.totalMissed')}:</span>
                <span className="text-white font-semibold">{stats.total}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30">
                <span className="text-red-400 text-sm">{t('missed.priority.high')}:</span>
                <span className="text-red-400 font-semibold">{stats.high}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30">
                <span className="text-orange-400 text-sm">{t('missed.priority.medium')}:</span>
                <span className="text-orange-400 font-semibold">{stats.medium}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <span className="text-blue-400 text-sm">{t('missed.priority.low')}:</span>
                <span className="text-blue-400 font-semibold">{stats.low}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/30">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-green-400 text-sm">{stats.fixable} {t('missed.fixable')}</span>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-white/40" />
              <span className="text-sm text-white/50">{t('missed.filterBy')}:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {typeFilters.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition',
                    filter === value
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                      : 'border border-white/10 text-white/50 hover:border-white/30'
                  )}
                >
                  {t(`missed.types.${label}`)}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-2">
              {(['all', 'high', 'medium', 'low'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition capitalize',
                    priorityFilter === p
                      ? 'bg-purple-500/20 border border-purple-500/50 text-purple-400'
                      : 'border border-white/10 text-white/50 hover:border-white/30'
                  )}
                >
                  {t(`missed.priority.${p}`)}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-72 rounded-3xl border border-white/10 bg-white/5 animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredMissed.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500/20 mb-6">
                    <TrendingUp className="h-10 w-10 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('missed.noMissed')}</h3>
                  <p className="text-white/50">{t('missed.noMissedDescription')}</p>
                </motion.div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredMissed.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <MissedOpportunityCard item={item} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Suggestions Sidebar */}
            <div className="lg:col-span-1">
              <AISuggestionsPanel suggestions={suggestions} isLoading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
