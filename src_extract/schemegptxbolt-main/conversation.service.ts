import { supabase } from '../lib/supabase';
import type { Conversation, Message } from '../lib/database.types';

export async function createConversation(
  userId: string,
  title = 'New Chat'
): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ user_id: userId, title })
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }

  return data;
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('pinned', { ascending: false })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }

  return data ?? [];
}

export async function getConversation(conversationId: string): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', conversationId)
    .single();

  if (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }

  return data;
}

export async function updateConversationTitle(
  conversationId: string,
  title: string
): Promise<boolean> {
  const { error } = await supabase
    .from('conversations')
    .update({ title })
    .eq('id', conversationId);

  if (error) {
    console.error('Error updating conversation title:', error);
    return false;
  }

  return true;
}

export async function toggleConversationPin(conversationId: string): Promise<boolean> {
  const { data: conversation, error: fetchError } = await supabase
    .from('conversations')
    .select('pinned')
    .eq('id', conversationId)
    .single();

  if (fetchError) {
    console.error('Error fetching conversation:', fetchError);
    return false;
  }

  const { error } = await supabase
    .from('conversations')
    .update({ pinned: !conversation.pinned })
    .eq('id', conversationId);

  if (error) {
    console.error('Error toggling pin:', error);
    return false;
  }

  return true;
}

export async function deleteConversation(conversationId: string): Promise<boolean> {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId);

  if (error) {
    console.error('Error deleting conversation:', error);
    return false;
  }

  return true;
}

export async function searchConversations(
  userId: string,
  query: string
): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .ilike('title', `%${query}%`)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error searching conversations:', error);
    return [];
  }

  return data ?? [];
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data ?? [];
}

export async function addMessage(
  conversationId: string,
  role: 'user' | 'assistant' | 'system',
  content: string
): Promise<Message | null> {
  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, role, content })
    .select()
    .single();

  if (error) {
    console.error('Error adding message:', error);
    return null;
  }

  return data;
}

export async function getConversationWithMessages(
  conversationId: string
): Promise<{ conversation: Conversation; messages: Message[] } | null> {
  const conversation = await getConversation(conversationId);
  if (!conversation) return null;

  const messages = await getMessages(conversationId);
  return { conversation, messages };
}

export async function deleteMessages(conversationId: string): Promise<boolean> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('conversation_id', conversationId);

  if (error) {
    console.error('Error deleting messages:', error);
    return false;
  }

  return true;
}
