import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, Eye, ArrowUpRight, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Scheme } from '../../lib/database.types';

// Mock data for recently viewed (would come from user_schemes in production)
const mockRecentlyViewed: (Scheme & { viewedAt: string })[] = [
  {
    id: '1',
    name: 'PM Yasasvi Scholarship',
    description: 'Scholarship for OBC/EBC/NT students',
    ministry: 'Ministry of Social Justice',
    category: 'Education',
    eligibility: [],
    estimated_benefit: '₹1.25 Lakhs',
    benefit_type: 'Scholarship',
    ai_score: 96,
    success_probability: 92,
    opening_date: '2026-01-01',
    closing_date: '2026-12-31',
    status: 'Open',
    featured: true,
    apply_link: 'https://example.com',
    official_website: 'https://example.com',
    official_helpline: null,
    documents_required: [],
    why_eligible: null,
    ai_tips: [],
    common_mistakes: [],
    processing_time: null,
    difficulty: null,
    created_at: '',
    updated_at: '',
    viewedAt: '2 hours ago',
  },
  {
    id: '2',
    name: 'AICTE Pragati Scholarship',
    description: 'For girls pursuing technical education',
    ministry: 'AICTE',
    category: 'Education',
    eligibility: [],
    estimated_benefit: '₹50,000',
    benefit_type: 'Scholarship',
    ai_score: 94,
    success_probability: 88,
    opening_date: '2026-01-01',
    closing_date: '2026-06-30',
    status: 'Open',
    featured: false,
    apply_link: 'https://example.com',
    official_website: 'https://example.com',
    official_helpline: null,
    documents_required: [],
    why_eligible: null,
    ai_tips: [],
    common_mistakes: [],
    processing_time: null,
    difficulty: null,
    created_at: '',
    updated_at: '',
    viewedAt: '5 hours ago',
  },
  {
    id: '3',
    name: 'PM Kisan Samman Nidhi',
    description: 'Income support scheme for farmers',
    ministry: 'Ministry of Agriculture',
    category: 'Agriculture',
    eligibility: [],
    estimated_benefit: '₹6,000/year',
    benefit_type: 'Direct Benefit',
    ai_score: 92,
    success_probability: 95,
    opening_date: '2026-01-01',
    closing_date: '2026-12-31',
    status: 'Open',
    featured: true,
    apply_link: 'https://example.com',
    official_website: 'https://example.com',
    official_helpline: null,
    documents_required: [],
    why_eligible: null,
    ai_tips: [],
    common_mistakes: [],
    processing_time: null,
    difficulty: null,
    created_at: '',
    updated_at: '',
    viewedAt: '1 day ago',
  },
];

export function RecentlyViewedSection() {
  const { t } = useTranslation();
  const [recentlyViewed, setRecentlyViewed] = useState<typeof mockRecentlyViewed>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setRecentlyViewed(mockRecentlyViewed);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
            <Eye className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {t('dashboard.recentlyViewed')}
            </h2>
            <p className="text-sm text-white/50">
              {t('dashboard.recentlyViewedDescription')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : recentlyViewed.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No recently viewed schemes</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentlyViewed.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={`/scheme/${scheme.id}`}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-5 transition-all hover:border-blue-500/30 hover:bg-white/5"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <Eye className="h-5 w-5 text-blue-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition">
                    {scheme.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <IndianRupee size={12} />
                      {scheme.estimated_benefit}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {scheme.viewedAt}
                    </span>
                  </div>
                </div>

                {/* Match */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-lg font-bold text-blue-400">{scheme.ai_score}%</span>
                  <ArrowUpRight
                    size={16}
                    className="text-white/30 transition group-hover:text-cyan-400"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
