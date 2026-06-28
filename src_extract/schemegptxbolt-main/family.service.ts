import { supabase } from '../lib/supabase';
import type { FamilyMember } from '../lib/database.types';

export type FamilyMemberRelation = FamilyMember['relation'];

export interface FamilyMemberInput {
  name: string;
  relation: FamilyMemberRelation;
  age: number;
  gender: string;
  occupation?: string;
  annual_income?: number;
  education?: string;
  disability?: boolean;
  farmer?: boolean;
  student?: boolean;
  widow?: boolean;
  minority?: boolean;
  bpl_status?: boolean;
  caste?: string;
  state?: string;
  district?: string;
  aadhaar?: boolean;
  pan?: boolean;
  ration_card?: boolean;
  bank_account?: boolean;
  disability_certificate?: boolean;
  income_certificate?: boolean;
  farmer_id?: boolean;
}

export interface FamilyStats {
  totalMembers: number;
  totalIncome: number;
  welfareScore: number;
  documentsComplete: number;
  documentsPending: number;
  eligibleCategories: string[];
}

export async function getFamilyMembers(): Promise<FamilyMember[]> {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getFamilyMember(id: string): Promise<FamilyMember | null> {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function addFamilyMember(input: FamilyMemberInput): Promise<FamilyMember> {
  const { data, error } = await supabase
    .from('family_members')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateFamilyMember(id: string, input: Partial<FamilyMemberInput>): Promise<FamilyMember> {
  const { data, error } = await supabase
    .from('family_members')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFamilyMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('family_members')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export function calculateFamilyStats(members: FamilyMember[]): FamilyStats {
  const totalMembers = members.length;
  const totalIncome = members.reduce((sum, m) => sum + (m.annual_income || 0), 0);

  // Calculate documents status
  const documentFields: (keyof FamilyMember)[] = [
    'aadhaar', 'pan', 'ration_card', 'bank_account',
    'disability_certificate', 'income_certificate', 'farmer_id'
  ];

  const documentsComplete = members.reduce((sum, m) => {
    return sum + documentFields.filter(field => m[field]).length;
  }, 0);

  const totalPossibleDocs = members.length * documentFields.length;
  const documentsPending = totalPossibleDocs - documentsComplete;

  // Determine eligible categories
  const eligibleCategories: string[] = [];
  const hasFarmer = members.some(m => m.farmer);
  const hasStudent = members.some(m => m.student);
  const hasWidow = members.some(m => m.widow);
  const hasDisability = members.some(m => m.disability);
  const hasMinority = members.some(m => m.minority);
  const hasBPL = members.some(m => m.bpl_status);
  const hasWomen = members.some(m => m.gender.toLowerCase() === 'female');
  const hasSenior = members.some(m => m.age >= 60);

  if (hasFarmer) eligibleCategories.push('farmer');
  if (hasStudent) eligibleCategories.push('student');
  if (hasWidow) eligibleCategories.push('widow');
  if (hasDisability) eligibleCategories.push('disability');
  if (hasMinority) eligibleCategories.push('minority');
  if (hasBPL) eligibleCategories.push('bpl');
  if (hasWomen) eligibleCategories.push('women');
  if (hasSenior) eligibleCategories.push('senior');

  // Calculate welfare score (0-100)
  let welfareScore = 0;

  // Base score for having family members
  welfareScore += Math.min(totalMembers * 5, 20);

  // Score for document completeness (max 40 points)
  if (totalPossibleDocs > 0) {
    welfareScore += (documentsComplete / totalPossibleDocs) * 40;
  }

  // Score for category coverage (max 30 points)
  welfareScore += Math.min(eligibleCategories.length * 3, 30);

  // Income consideration (max 10 points)
  const avgIncome = totalMembers > 0 ? totalIncome / totalMembers : 0;
  if (avgIncome < 100000) {
    welfareScore += 10;
  } else if (avgIncome < 250000) {
    welfareScore += 7;
  } else if (avgIncome < 500000) {
    welfareScore += 4;
  }

  welfareScore = Math.min(Math.round(welfareScore), 100);

  return {
    totalMembers,
    totalIncome,
    welfareScore,
    documentsComplete,
    documentsPending,
    eligibleCategories,
  };
}

export function subscribeToFamilyMembers(callback: (members: FamilyMember[]) => void) {
  const channel = supabase
    .channel('family_members_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'family_members',
      },
      async () => {
        const members = await getFamilyMembers();
        callback(members);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
