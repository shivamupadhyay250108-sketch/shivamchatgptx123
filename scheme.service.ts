import { supabase } from '../lib/supabase';
import type { Scheme, SuccessStory, UserScheme } from '../lib/database.types';

export async function getAllSchemes(): Promise<Scheme[] | null> {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .order('ai_score', { ascending: false });

  if (error) {
    console.error('Error fetching schemes:', error);
    return null;
  }

  return data;
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching scheme:', error);
    return null;
  }

  return data;
}

export async function getRelatedSchemes(
  category: string,
  excludeId: string
): Promise<Scheme[]> {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .limit(3);

  if (error) {
    console.error('Error fetching related schemes:', error);
    return [];
  }

  return data ?? [];
}

export async function getSuccessStories(
  schemeId: string
): Promise<SuccessStory[]> {
  const { data, error } = await supabase
    .from('success_stories')
    .select('*')
    .eq('scheme_id', schemeId)
    .eq('verified', true);

  if (error) {
    console.error('Error fetching success stories:', error);
    return [];
  }

  return data ?? [];
}

export async function getUserSchemes(
  userId: string,
  status?: UserScheme['status']
): Promise<(UserScheme & { scheme: Scheme })[]> {
  let query = supabase
    .from('user_schemes')
    .select('*, scheme:schemes(*)')
    .eq('user_id', userId);

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user schemes:', error);
    return [];
  }

  return (data as (UserScheme & { scheme: Scheme })[]) ?? [];
}

export async function getTrendingSchemes(limit = 6): Promise<Scheme[]> {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('status', 'Open')
    .order('ai_score', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trending schemes:', error);
    return [];
  }

  return data ?? [];
}

export async function getDeadlineAlerts(days = 30): Promise<Scheme[]> {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);

  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('status', 'Open')
    .lte('closing_date', futureDate.toISOString().split('T')[0])
    .order('closing_date', { ascending: true })
    .limit(10);

  if (error) {
    console.error('Error fetching deadline alerts:', error);
    return [];
  }

  return data ?? [];
}

export async function getRecentlyViewed(
  userId: string,
  limit = 5
): Promise<(UserScheme & { scheme: Scheme })[]> {
  const { data, error } = await supabase
    .from('user_schemes')
    .select('*, scheme:schemes(*)')
    .eq('user_id', userId)
    .order('viewed_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recently viewed:', error);
    return [];
  }

  return (data as (UserScheme & { scheme: Scheme })[]) ?? [];
}

export async function markSchemeViewed(
  userId: string,
  schemeId: string
): Promise<void> {
  const { error } = await supabase.from('user_schemes').upsert(
    {
      user_id: userId,
      scheme_id: schemeId,
      viewed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,scheme_id' }
  );

  if (error) {
    console.error('Error marking scheme viewed:', error);
  }
}
