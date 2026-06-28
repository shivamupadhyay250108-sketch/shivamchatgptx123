import { supabase } from '../lib/supabase';
import type { Scheme, FamilyMember } from '../lib/database.types';

export type MissedType =
  | 'expired'
  | 'income_mismatch'
  | 'age_mismatch'
  | 'category_mismatch'
  | 'state_mismatch'
  | 'missing_documents'
  | 'upcoming'
  | 'unclaimed';

export interface MissedOpportunity {
  id: string;
  scheme: Scheme;
  type: MissedType;
  reason: string;
  howToFix: string;
  estimatedBenefit: string;
  deadline: string | null;
  priority: 'high' | 'medium' | 'low';
  canFix: boolean;
  relatedMember?: FamilyMember;
}

export interface AIMissedSuggestion {
  id: string;
  action: string;
  benefit: string;
  deadline: string | null;
  priority: 'high' | 'medium' | 'low';
  schemeId?: string;
}

export async function getMissedOpportunities(members: FamilyMember[]): Promise<MissedOpportunity[]> {
  const missed: MissedOpportunity[] = [];

  // Get all schemes
  const { data: schemes, error } = await supabase
    .from('schemes')
    .select('*')
    .order('closing_date', { ascending: true });

  if (error || !schemes) return missed;

  // Check each member against each scheme
  for (const member of members) {
    for (const scheme of schemes) {
      const missedItem = checkMissedOpportunity(scheme, member);
      if (missedItem) {
        missed.push(missedItem);
      }
    }
  }

  // Check for upcoming schemes (opening soon)
  const upcoming = await getUpcomingSchemes();
  for (const scheme of upcoming) {
    missed.push({
      id: `upcoming-${scheme.id}`,
      scheme,
      type: 'upcoming',
      reason: `Scheme opens on ${scheme.opening_date || 'soon'}`,
      howToFix: 'Prepare documents and apply when scheme opens',
      estimatedBenefit: scheme.estimated_benefit,
      deadline: scheme.closing_date,
      priority: 'medium',
      canFix: true,
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  missed.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return deduplicateMissed(missed);
}

function checkMissedOpportunity(scheme: Scheme, member: FamilyMember): MissedOpportunity | null {
  // Skip if scheme is closed
  if (scheme.status === 'Closed') {
    return {
      id: `expired-${scheme.id}-${member.id}`,
      scheme,
      type: 'expired',
      reason: 'Application deadline has passed',
      howToFix: 'Wait for the scheme to reopen or find similar schemes',
      estimatedBenefit: scheme.estimated_benefit,
      deadline: scheme.closing_date,
      priority: determinePriority(scheme),
      canFix: false,
      relatedMember: member,
    };
  }

  // Check income mismatch
  const income = member.annual_income || 0;
  const eligibilityIncome = parseIncomeLimit(scheme.eligibility);
  if (eligibilityIncome && income > eligibilityIncome) {
    return {
      id: `income-${scheme.id}-${member.id}`,
      scheme,
      type: 'income_mismatch',
      reason: `Annual income (${income.toLocaleString('en-IN')}) exceeds limit (${eligibilityIncome.toLocaleString('en-IN')})`,
      howToFix: 'Look for schemes with higher income limits or reduce declared income legitimately',
      estimatedBenefit: scheme.estimated_benefit,
      deadline: scheme.closing_date,
      priority: 'medium',
      canFix: false,
      relatedMember: member,
    };
  }

  // Check age mismatch
  const ageRange = parseAgeRange(scheme.eligibility);
  if (ageRange && (member.age < ageRange.min || member.age > ageRange.max)) {
    return {
      id: `age-${scheme.id}-${member.id}`,
      scheme,
      type: 'age_mismatch',
      reason: `Age ${member.age} is outside eligible range (${ageRange.min}-${ageRange.max})`,
      howToFix: member.age < ageRange.max ? 'Wait until eligible or find age-appropriate schemes' : 'Look for senior citizen schemes',
      estimatedBenefit: scheme.estimated_benefit,
      deadline: scheme.closing_date,
      priority: 'low',
      canFix: member.age < ageRange.max,
      relatedMember: member,
    };
  }

  // Check category mismatch
  const requiredCategories = parseCategories(scheme.eligibility);
  if (requiredCategories.length > 0) {
    const memberCategories = getMemberCategories(member);
    const hasMatchingCategory = requiredCategories.some(c => memberCategories.includes(c));

    if (!hasMatchingCategory) {
      return {
        id: `category-${scheme.id}-${member.id}`,
        scheme,
        type: 'category_mismatch',
        reason: `Missing required category: ${requiredCategories.join(', ')}`,
        howToFix: 'Check if you qualify under any category or find open schemes',
        estimatedBenefit: scheme.estimated_benefit,
        deadline: scheme.closing_date,
        priority: 'medium',
        canFix: false,
        relatedMember: member,
      };
    }
  }

  // Check missing documents
  const requiredDocs = scheme.documents_required || [];
  const missingDocs = getMissingDocuments(member, requiredDocs);
  if (missingDocs.length > 0) {
    return {
      id: `docs-${scheme.id}-${member.id}`,
      scheme,
      type: 'missing_documents',
      reason: `Missing documents: ${missingDocs.join(', ')}`,
      howToFix: `Apply for: ${missingDocs.join(', ')} at your local government office`,
      estimatedBenefit: scheme.estimated_benefit,
      deadline: scheme.closing_date,
      priority: missingDocs.length <= 2 ? 'low' : 'medium',
      canFix: true,
      relatedMember: member,
    };
  }

  return null;
}

function determinePriority(scheme: Scheme): 'high' | 'medium' | 'low' {
  if (scheme.status === 'Closing Soon') return 'high';
  const closingDate = new Date(scheme.closing_date);
  const now = new Date();
  const daysUntilClose = Math.ceil((closingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilClose < 7) return 'high';
  if (daysUntilClose < 30) return 'medium';
  return 'low';
}

function parseIncomeLimit(eligibility: string[]): number | null {
  for (const item of eligibility) {
    const match = item.match(/income[:\s]*(?:up to |below |less than )?(\d+)/i);
    if (match) {
      const value = parseInt(match[1]);
      if (item.toLowerCase().includes('lakh')) {
        return value * 100000;
      }
      if (item.toLowerCase().includes('thousand')) {
        return value * 1000;
      }
      return value;
    }
  }
  return null;
}

function parseAgeRange(eligibility: string[]): { min: number; max: number } | null {
  for (const item of eligibility) {
    const match = item.match(/age[:\s]*(?:between )?(\d+)[-\s]*(?:to |and )?(\d+)/i);
    if (match) {
      return { min: parseInt(match[1]), max: parseInt(match[2]) };
    }
    const minMatch = item.match(/age[:\s]*(?:above |more than )?(\d+)/i);
    if (minMatch) {
      return { min: parseInt(minMatch[1]), max: 120 };
    }
  }
  return null;
}

function parseCategories(eligibility: string[]): string[] {
  const categories: string[] = [];
  const categoryKeywords = ['sc', 'st', 'obc', 'general', 'minority', 'bpl', 'farmer', 'student', 'widow', 'disabled', 'woman', 'senior'];

  for (const item of eligibility) {
    const lower = item.toLowerCase();
    for (const keyword of categoryKeywords) {
      if (lower.includes(keyword) && !categories.includes(keyword)) {
        categories.push(keyword);
      }
    }
  }
  return categories;
}

function getMemberCategories(member: FamilyMember): string[] {
  const categories: string[] = [];
  if (member.farmer) categories.push('farmer');
  if (member.student) categories.push('student');
  if (member.widow) categories.push('widow');
  if (member.disability) categories.push('disabled');
  if (member.minority) categories.push('minority');
  if (member.bpl_status) categories.push('bpl');
  if (member.gender.toLowerCase() === 'female') categories.push('woman');
  if (member.age >= 60) categories.push('senior');
  if (member.caste) {
    const casteLower = member.caste.toLowerCase();
    if (casteLower.includes('sc')) categories.push('sc');
    if (casteLower.includes('st')) categories.push('st');
    if (casteLower.includes('obc')) categories.push('obc');
  }
  return categories;
}

function getMissingDocuments(member: FamilyMember, required: string[]): string[] {
  const missing: string[] = [];
  const docMap: Record<string, keyof FamilyMember> = {
    'aadhaar': 'aadhaar',
    'aadhar': 'aadhaar',
    'pan': 'pan',
    'ration': 'ration_card',
    'bank': 'bank_account',
    'disability': 'disability_certificate',
    'income': 'income_certificate',
    'farmer': 'farmer_id',
    'kisan': 'farmer_id',
  };

  for (const req of required) {
    const reqLower = req.toLowerCase();
    for (const [keyword, field] of Object.entries(docMap)) {
      if (reqLower.includes(keyword) && !member[field]) {
        if (!missing.some(m => m.toLowerCase().includes(keyword))) {
          missing.push(req);
        }
        break;
      }
    }
  }
  return missing;
}

async function getUpcomingSchemes(): Promise<Scheme[]> {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('status', 'Open')
    .order('opening_date', { ascending: true })
    .limit(5);

  if (error || !data) return [];
  return data.filter(s => s.opening_date && new Date(s.opening_date) > new Date());
}

function deduplicateMissed(missed: MissedOpportunity[]): MissedOpportunity[] {
  const seen = new Set<string>();
  return missed.filter(item => {
    const key = `${item.scheme.id}-${item.type}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function getAIMissedSuggestions(missed: MissedOpportunity[]): Promise<AIMissedSuggestion[]> {
  const suggestions: AIMissedSuggestion[] = [];

  // Generate AI-powered suggestions based on missed opportunities
  const highPriorityFixable = missed.filter(m => m.priority === 'high' && m.canFix);
  const mediumPriorityFixable = missed.filter(m => m.priority === 'medium' && m.canFix);
  const missingDocs = missed.filter(m => m.type === 'missing_documents');

  for (const item of highPriorityFixable.slice(0, 3)) {
    suggestions.push({
      id: `ai-high-${item.scheme.id}`,
      action: `Apply for ${item.scheme.name} - deadline approaching`,
      benefit: item.estimatedBenefit,
      deadline: item.deadline,
      priority: 'high',
      schemeId: item.scheme.id,
    });
  }

  for (const item of missingDocs.slice(0, 2)) {
    suggestions.push({
      id: `ai-doc-${item.scheme.id}`,
      action: `Get ${item.howToFix.replace('Apply for: ', '').replace(' at your local government office', '')}`,
      benefit: `Enables application for ${item.scheme.name}`,
      deadline: null,
      priority: 'medium',
      schemeId: item.scheme.id,
    });
  }

  for (const item of mediumPriorityFixable.slice(0, 2)) {
    suggestions.push({
      id: `ai-med-${item.scheme.id}`,
      action: `Prepare application for ${item.scheme.name}`,
      benefit: item.estimatedBenefit,
      deadline: item.deadline,
      priority: 'medium',
      schemeId: item.scheme.id,
    });
  }

  // Add general recommendations
  suggestions.push({
    id: 'ai-general-1',
    action: 'Complete Aadhaar linking for all family members',
    benefit: 'Required for most government schemes',
    deadline: null,
    priority: 'high',
  });

  suggestions.push({
    id: 'ai-general-2',
    action: 'Link bank account with Aadhaar',
    benefit: 'Enables direct benefit transfer',
    deadline: null,
    priority: 'high',
  });

  return suggestions.slice(0, 10);
}
