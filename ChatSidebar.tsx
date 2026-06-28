import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Search, MoveHorizontal as MoreHorizontal, Pin, PinOff, Pencil, Trash2, MessageSquare, Pin as PinIcon } from 'lucide-react';
import type { Conversation } from '../../lib/database.types';
import { cn } from '../ui/utils';

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onRenameConversation: (id: string, title: string) => void;
  onDeleteConversation: (id: string) => void;
  onTogglePin: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
  onRenameConversation,
  onDeleteConversation,
  onTogglePin,
  isOpen,
}: ChatSidebarProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery) return conversations;
    return conversations.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const pinnedConversations = filteredConversations.filter((c) => c.pinned);
  const unpinnedConversations = filteredConversations.filter((c) => !c.pinned);

  const groupByDate = (items: Conversation[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      today: items.filter((c) => new Date(c.updated_at) >= today),
      yesterday: items.filter(
        (c) => new Date(c.updated_at) >= yesterday && new Date(c.updated_at) < today
      ),
      thisWeek: items.filter(
        (c) => new Date(c.updated_at) >= weekAgo && new Date(c.updated_at) < yesterday
      ),
      earlier: items.filter((c) => new Date(c.updated_at) < weekAgo),
    };
  };

  const renderGroup = (title: string, items: Conversation[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="px-4 mb-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
          {title}
        </h3>
        <div className="space-y-1">
          {items.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={currentConversationId === conversation.id}
              onSelect={() => onSelectConversation(conversation.id)}
              onRename={(title) => {
                onRenameConversation(conversation.id, title);
                setEditingId(null);
              }}
              onDelete={() => onDeleteConversation(conversation.id)}
              onTogglePin={() => onTogglePin(conversation.id)}
              menuOpen={menuOpenId === conversation.id}
              setMenuOpen={setMenuOpenId}
              isEditing={editingId === conversation.id}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              startEdit={() => {
                setEditingId(conversation.id);
                setEditTitle(conversation.title);
                setMenuOpenId(null);
              }}
              cancelEdit={() => setEditingId(null)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {}}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-80 bg-[#0B0F19]/95 backdrop-blur-xl border-r border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {t('chat.chatHistory')}
                </h2>
                <button
                  onClick={onNewChat}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-105"
                >
                  <Plus size={16} />
                  {t('chat.newChat')}
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('chat.searchChats')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-2">
              {/* Pinned Section */}
              {pinnedConversations.length > 0 && (
                <>
                  <h3 className="px-4 mb-2 text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1">
                    <PinIcon size={12} />
                    {t('chat.pinned')}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {pinnedConversations.map((conversation) => (
                      <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={currentConversationId === conversation.id}
                        onSelect={() => onSelectConversation(conversation.id)}
                        onRename={(title) => {
                          onRenameConversation(conversation.id, title);
                          setEditingId(null);
                        }}
                        onDelete={() => onDeleteConversation(conversation.id)}
                        onTogglePin={() => onTogglePin(conversation.id)}
                        menuOpen={menuOpenId === conversation.id}
                        setMenuOpen={setMenuOpenId}
                        isEditing={editingId === conversation.id}
                        editTitle={editTitle}
                        setEditTitle={setEditTitle}
                        startEdit={() => {
                          setEditingId(conversation.id);
                          setEditTitle(conversation.title);
                          setMenuOpenId(null);
                        }}
                        cancelEdit={() => setEditingId(null)}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Other Conversations */}
              {(() => {
                const grouped = groupByDate(unpinnedConversations);
                return (
                  <>
                    {renderGroup(t('chat.today'), grouped.today)}
                    {renderGroup(t('chat.yesterday'), grouped.yesterday)}
                    {renderGroup(t('chat.thisWeek'), grouped.thisWeek)}
                    {renderGroup(t('chat.earlier'), grouped.earlier)}
                  </>
                );
              })()}
            </div>

            {/* Empty State */}
            {filteredConversations.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <MessageSquare className="w-12 h-12 text-white/20 mb-4" />
                <p className="text-white/50">{t('chat.noConversations')}</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onRename,
  onDelete,
  onTogglePin,
  menuOpen,
  setMenuOpen,
  isEditing,
  editTitle,
  setEditTitle,
  startEdit,
  cancelEdit,
}: {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
  onTogglePin: () => void;
  menuOpen: boolean;
  setMenuOpen: (id: string | null) => void;
  isEditing: boolean;
  editTitle: string;
  setEditTitle: (title: string) => void;
  startEdit: () => void;
  cancelEdit: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition cursor-pointer',
        isActive
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'
          : 'hover:bg-white/5'
      )}
    >
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onRename(editTitle);
              if (e.key === 'Escape') cancelEdit();
            }}
            className="flex-1 bg-transparent text-white text-sm outline-none border-b border-cyan-500"
            autoFocus
          />
          <button
            onClick={() => onRename(editTitle)}
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            {t('chat.save')}
          </button>
        </div>
      ) : (
        <>
          <MessageSquare size={16} className="text-white/40 shrink-0" />
          <button
            onClick={onSelect}
            className="flex-1 text-sm text-white truncate text-left"
          >
            {conversation.title}
          </button>
          {conversation.pinned && <Pin size={12} className="text-cyan-400" />}
        </>
      )}

      {/* Menu Button */}
      {!isEditing && (
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(menuOpen ? null : conversation.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
          >
            <MoreHorizontal size={16} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-white/10 bg-[#111827] p-1 shadow-xl z-50"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
                >
                  <Pencil size={14} />
                  {t('chat.rename')}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin();
                    setMenuOpen(null);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
                >
                  {conversation.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                  {conversation.pinned ? t('chat.unpin') : t('chat.pin')}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                    setMenuOpen(null);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                >
                  <Trash2 size={14} />
                  {t('chat.delete')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
