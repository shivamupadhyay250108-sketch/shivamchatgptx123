import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, IndianRupee, Save } from 'lucide-react';
import type { FamilyMember } from '../../lib/database.types';
import type { FamilyMemberInput, FamilyMemberRelation } from '../../services/family.service';
import { cn } from '../ui/utils';

interface FamilyMemberFormProps {
  member?: FamilyMember | null;
  onSubmit: (data: FamilyMemberInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const relations: FamilyMemberRelation[] = ['father', 'mother', 'wife', 'husband', 'son', 'daughter', 'grandfather', 'grandmother', 'other'];

export function FamilyMemberForm({ member, onSubmit, onCancel, isLoading }: FamilyMemberFormProps) {
  const { t } = useTranslation();
  const isEditing = !!member;

  const [formData, setFormData] = useState<FamilyMemberInput>({
    name: member?.name || '',
    relation: member?.relation || 'father',
    age: member?.age || 30,
    gender: member?.gender || 'Male',
    occupation: member?.occupation || '',
    annual_income: member?.annual_income || 0,
    education: member?.education || '',
    disability: member?.disability || false,
    farmer: member?.farmer || false,
    student: member?.student || false,
    widow: member?.widow || false,
    minority: member?.minority || false,
    bpl_status: member?.bpl_status || false,
    caste: member?.caste || '',
    state: member?.state || '',
    district: member?.district || '',
    aadhaar: member?.aadhaar || false,
    pan: member?.pan || false,
    ration_card: member?.ration_card || false,
    bank_account: member?.bank_account || false,
    disability_certificate: member?.disability_certificate || false,
    income_certificate: member?.income_certificate || false,
    farmer_id: member?.farmer_id || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof FamilyMemberInput>(key: K, value: FamilyMemberInput[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-[#0B0F19]/95">
            <h2 className="text-xl font-bold text-white">
              {isEditing ? t('family.editMember') : t('family.addMember')}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
                {t('family.basicInfo')}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.name')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.relation')}</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => updateField('relation', e.target.value as FamilyMemberRelation)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-cyan-500/50 transition"
                  >
                    {relations.map(r => (
                      <option key={r} value={r}>{t(`family.relations.${r}`)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.age')}</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-cyan-500/50 transition"
                    min="0"
                    max="120"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.gender')}</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-cyan-500/50 transition"
                  >
                    <option value="Male">{t('family.genders.male')}</option>
                    <option value="Female">{t('family.genders.female')}</option>
                    <option value="Other">{t('family.genders.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.occupation')}</label>
                  <input
                    type="text"
                    value={formData.occupation || ''}
                    onChange={(e) => updateField('occupation', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                  />
                </div>
              </div>
            </div>

            {/* Financial & Education */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
                {t('family.financialInfo')}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.annualIncome')}</label>
                  <div className="relative">
                    <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="number"
                      value={formData.annual_income || ''}
                      onChange={(e) => updateField('annual_income', parseFloat(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-cyan-500/50 transition"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.education')}</label>
                  <input
                    type="text"
                    value={formData.education || ''}
                    onChange={(e) => updateField('education', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
                {t('family.locationInfo')}
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.state')}</label>
                  <input
                    type="text"
                    value={formData.state || ''}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.district')}</label>
                  <input
                    type="text"
                    value={formData.district || ''}
                    onChange={(e) => updateField('district', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">{t('family.fields.caste')}</label>
                  <input
                    type="text"
                    value={formData.caste || ''}
                    onChange={(e) => updateField('caste', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
                {t('family.categories.title')}
              </h3>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { key: 'farmer', label: t('family.categories.farmer') },
                  { key: 'student', label: t('family.categories.student') },
                  { key: 'widow', label: t('family.categories.widow') },
                  { key: 'disability', label: t('family.categories.disability') },
                  { key: 'minority', label: t('family.categories.minority') },
                  { key: 'bpl_status', label: t('family.categories.bpl') },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => updateField(key as keyof FamilyMemberInput, !formData[key as keyof FamilyMemberInput])}
                    className={cn(
                      'px-4 py-3 rounded-xl border text-sm font-medium transition',
                      formData[key as keyof FamilyMemberInput]
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
                {t('family.documents.title')}
              </h3>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { key: 'aadhaar', label: t('family.documents.aadhaar') },
                  { key: 'pan', label: t('family.documents.pan') },
                  { key: 'ration_card', label: t('family.documents.rationCard') },
                  { key: 'bank_account', label: t('family.documents.bankAccount') },
                  { key: 'disability_certificate', label: t('family.documents.disabilityCertificate') },
                  { key: 'income_certificate', label: t('family.documents.incomeCertificate') },
                  { key: 'farmer_id', label: t('family.documents.farmerId') },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => updateField(key as keyof FamilyMemberInput, !formData[key as keyof FamilyMemberInput])}
                    className={cn(
                      'px-4 py-3 rounded-xl border text-sm font-medium transition',
                      formData[key as keyof FamilyMemberInput]
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                <Save size={18} />
                {isLoading ? t('common.saving') : t('common.save')}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
