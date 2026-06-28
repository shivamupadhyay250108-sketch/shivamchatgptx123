import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Users, TriangleAlert as AlertTriangle } from 'lucide-react';
import { FamilyMemberCard } from '../components/family/FamilyMemberCard';
import { FamilyMemberForm } from '../components/family/FamilyMemberForm';
import { FamilyStatsCards } from '../components/family/FamilyStatsCards';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { FloatingParticles } from '../components/ui/FloatingParticles';
import { Sidebar } from '../components/layout/Sidebar2';
import { Topbar } from '../components/layout/Topbar2';
import type { FamilyMember } from '../lib/database.types';
import type { FamilyMemberInput } from '../services/family.service';
import {
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  calculateFamilyStats,
  subscribeToFamilyMembers,
} from '../services/family.service';
import type { FamilyStats } from '../services/family.service';

export function FamilyWelfarePage() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [stats, setStats] = useState<FamilyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadFamilyMembers();

    // Subscribe to realtime updates
    const unsubscribe = subscribeToFamilyMembers((updatedMembers) => {
      setMembers(updatedMembers);
      setStats(calculateFamilyStats(updatedMembers));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function loadFamilyMembers() {
    try {
      const data = await getFamilyMembers();
      setMembers(data);
      setStats(calculateFamilyStats(data));
    } catch (error) {
      console.error('Error loading family members:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData: FamilyMemberInput) {
    setSaving(true);
    try {
      if (editingMember) {
        await updateFamilyMember(editingMember.id, formData);
      } else {
        await addFamilyMember(formData);
      }
      setShowForm(false);
      setEditingMember(null);
      await loadFamilyMembers();
    } catch (error) {
      console.error('Error saving family member:', error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t('family.confirmDelete'))) return;

    try {
      await deleteFamilyMember(id);
      await loadFamilyMembers();
    } catch (error) {
      console.error('Error deleting family member:', error);
    }
  }

  function handleEdit(member: FamilyMember) {
    setEditingMember(member);
    setShowForm(true);
  }

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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{t('family.title')}</h1>
                  <p className="text-white/50">{t('family.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingMember(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                <Plus size={18} />
                {t('family.addMember')}
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          {stats && (
            <div className="mb-8">
              <FamilyStatsCards stats={stats} />
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-3xl border border-white/10 bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : members.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 mb-6">
                <AlertTriangle className="h-10 w-10 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t('family.noMembers')}</h3>
              <p className="text-white/50 mb-6">{t('family.noMembersDescription')}</p>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                <Plus size={18} />
                {t('family.addFirstMember')}
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FamilyMemberCard
                    member={member}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Combined Eligibility Section */}
          {members.length > 0 && stats && stats.eligibleCategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl"
            >
              <h2 className="text-xl font-bold text-white mb-4">{t('family.combinedEligibility')}</h2>
              <p className="text-white/50 mb-6">{t('family.combinedEligibilityDescription')}</p>
              <div className="flex flex-wrap gap-3">
                {stats.eligibleCategories.map((category) => (
                  <span
                    key={category}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium capitalize"
                  >
                    {t(`family.categories.${category}`)}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <FamilyMemberForm
          member={editingMember}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingMember(null);
          }}
          isLoading={saving}
        />
      )}
    </div>
  );
}
