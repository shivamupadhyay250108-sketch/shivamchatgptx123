import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  User,
  Pencil,
  Trash2,
  IndianRupee,
  GraduationCap,
  Tractor,
  Heart,
  Users,
  CircleCheck as CheckCircle,
  CircleX as XCircle,
  FileText,
} from 'lucide-react';
import type { FamilyMember } from '../../lib/database.types';
import { cn } from '../ui/utils';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  onDelete: (id: string) => void;
}

const relationIcons: Record<string, React.ReactNode> = {
  father: <Users size={16} />,
  mother: <Users size={16} />,
  wife: <Heart size={16} />,
  husband: <Users size={16} />,
  son: <Users size={16} />,
  daughter: <Users size={16} />,
  grandfather: <Users size={16} />,
  grandmother: <Users size={16} />,
  other: <User size={16} />,
};

export function FamilyMemberCard({ member, onEdit, onDelete }: FamilyMemberCardProps) {
  const { t } = useTranslation();

  const documentFields = [
    { key: 'aadhaar', label: t('family.documents.aadhaar') },
    { key: 'pan', label: t('family.documents.pan') },
    { key: 'ration_card', label: t('family.documents.rationCard') },
    { key: 'bank_account', label: t('family.documents.bankAccount') },
    { key: 'disability_certificate', label: t('family.documents.disabilityCertificate') },
    { key: 'income_certificate', label: t('family.documents.incomeCertificate') },
    { key: 'farmer_id', label: t('family.documents.farmerId') },
  ] as const;

  const categoryTags = [];
  if (member.farmer) categoryTags.push({ icon: <Tractor size={12} />, label: t('family.categories.farmer'), color: 'from-green-500 to-emerald-500' });
  if (member.student) categoryTags.push({ icon: <GraduationCap size={12} />, label: t('family.categories.student'), color: 'from-purple-500 to-pink-500' });
  if (member.widow) categoryTags.push({ icon: <Heart size={12} />, label: t('family.categories.widow'), color: 'from-pink-500 to-rose-500' });
  if (member.disability) categoryTags.push({ icon: <Users size={12} />, label: t('family.categories.disability'), color: 'from-blue-500 to-cyan-500' });
  if (member.minority) categoryTags.push({ icon: <Users size={12} />, label: t('family.categories.minority'), color: 'from-orange-500 to-yellow-500' });
  if (member.bpl_status) categoryTags.push({ icon: <IndianRupee size={12} />, label: t('family.categories.bpl'), color: 'from-red-500 to-orange-500' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl transition-all hover:border-cyan-500/30"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
              {relationIcons[member.relation] || <User size={20} />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-white/50 capitalize">{t(`family.relations.${member.relation}`)}</p>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => onEdit(member)}
              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(member.id)}
              className="p-2 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
          <span>{member.age} {t('family.years')}</span>
          <span className="capitalize">{member.gender}</span>
          {member.occupation && <span>{member.occupation}</span>}
        </div>

        {/* Income */}
        <div className="flex items-center gap-2 mb-4">
          <IndianRupee size={16} className="text-green-400" />
          <span className="text-lg font-semibold text-white">
            {(member.annual_income || 0).toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-white/50">{t('family.perYear')}</span>
        </div>

        {/* Category Tags */}
        {categoryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categoryTags.map((tag, idx) => (
              <span
                key={idx}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white',
                  `bg-gradient-to-r ${tag.color}`
                )}
              >
                {tag.icon}
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Documents Status */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              {t('family.documents.title')}
            </span>
            <span className="text-xs text-white/50">
              {documentFields.filter(d => member[d.key]).length}/{documentFields.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {documentFields.map((doc) => (
              <div
                key={doc.key}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition',
                  member[doc.key]
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-white/5 text-white/30'
                )}
              >
                {member[doc.key] ? <CheckCircle size={10} /> : <XCircle size={10} />}
                {doc.label}
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        {(member.state || member.district) && (
          <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
            <FileText size={12} />
            <span>{member.district}, {member.state}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
