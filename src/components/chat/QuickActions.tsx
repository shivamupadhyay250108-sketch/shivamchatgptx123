import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, CircleCheck as CheckCircle, FileText, GraduationCap, Users, TriangleAlert as AlertTriangle, Tractor, Heart, BookOpen, Crown } from 'lucide-react';
import { cn } from '../ui/utils';

interface QuickActionsProps {
  onAction: (query: string) => void;
}

const quickActionsData = [
  {
    key: 'actionFindSchemes',
    icon: Search,
    gradient: 'from-cyan-500 to-blue-500',
    query: 'Find government schemes for my profile',
  },
  {
    key: 'actionCheckEligibility',
    icon: CheckCircle,
    gradient: 'from-green-500 to-emerald-500',
    query: 'Check my eligibility for schemes',
  },
  {
    key: 'actionRequiredDocuments',
    icon: FileText,
    gradient: 'from-orange-500 to-yellow-500',
    query: 'What documents do I need for scheme applications?',
  },
  {
    key: 'actionScholarshipFinder',
    icon: GraduationCap,
    gradient: 'from-purple-500 to-pink-500',
    query: 'Find scholarships for students',
  },
  {
    key: 'actionFamilyBenefits',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    query: 'What benefits are available for my family?',
  },
  {
    key: 'actionMissedOpportunities',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-orange-500',
    query: 'What schemes have I missed or might miss?',
  },
  {
    key: 'actionFarmerSchemes',
    icon: Tractor,
    gradient: 'from-green-600 to-emerald-600',
    query: 'What schemes are available for farmers?',
  },
  {
    key: 'actionWomenSchemes',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    query: 'What schemes are available for women?',
  },
  {
    key: 'actionStudentSchemes',
    icon: BookOpen,
    gradient: 'from-indigo-500 to-purple-500',
    query: 'What schemes are available for students?',
  },
  {
    key: 'actionSeniorSchemes',
    icon: Crown,
    gradient: 'from-amber-500 to-orange-500',
    query: 'What schemes are available for senior citizens?',
  },
];

export function QuickActions({ onAction }: QuickActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
        {t('chat.quickActions')}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {quickActionsData.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAction(t(`chat.${action.key}Desc`))}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r text-white shadow-lg',
                  action.gradient
                )}
              >
                <Icon size={22} />
              </div>
              <span className="text-sm font-medium text-white/70 text-center group-hover:text-white transition">
                {t(`chat.${action.key}`)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
