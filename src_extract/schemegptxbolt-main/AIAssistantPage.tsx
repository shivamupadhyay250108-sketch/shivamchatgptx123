import { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, Bot } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import {
  createConversation,
  getConversations,
  getMessages,
  addMessage,
  updateConversationTitle,
  deleteConversation,
  toggleConversationPin,
} from '../services/conversation.service';
import { generateAIResponse, convertMessagesToGeminiFormat } from '../services/ai.service';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { WelcomeScreen } from '../components/chat/WelcomeScreen';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { FloatingParticles } from '../components/ui/FloatingParticles';
import type { Message } from '../lib/database.types';

export function AIAssistantPage() {
  const { t } = useTranslation();
  const { id: conversationId } = useParams();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    conversations,
    currentConversation,
    messages,
    isLoading,
    isGenerating,
    sidebarOpen,
    error,
    setConversations,
    setCurrentConversation,
    setMessages,
    addMessage: addMessageToState,
    setIsLoading,
    setIsGenerating,
    setSidebarOpen,
    setError,
    addConversation,
    removeConversation,
    stopGeneration,
  } = useChatStore();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Load conversations on mount
  useEffect(() => {
    if (user?.id) {
      loadConversations();
    }
  }, [user?.id]);

  // Load messages when conversation changes
  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
    }
  }, [conversationId]);

  const loadConversations = async () => {
    if (!user?.id) return;
    const data = await getConversations(user.id);
    setConversations(data);
  };

  const loadMessages = async (convId: string) => {
    setIsLoading(true);
    const msgs = await getMessages(convId);
    setMessages(msgs);
    setIsLoading(false);
  };

  const handleNewChat = useCallback(async () => {
    if (!user?.id) return;
    const conversation = await createConversation(user.id, t('chat.newChat'));
    if (conversation) {
      addConversation(conversation);
      setCurrentConversation(conversation);
      setMessages([]);
    }
  }, [user?.id, t]);

  const handleSelectConversation = useCallback((convId: string) => {
    const conv = conversations.find((c) => c.id === convId);
    if (conv) {
      setCurrentConversation(conv);
      loadMessages(convId);
    }
  }, [conversations]);

  const handleRenameConversation = useCallback(async (convId: string, title: string) => {
    const success = await updateConversationTitle(convId, title);
    if (success) {
      const conv = conversations.find((c) => c.id === convId);
      if (conv) {
        addConversation({ ...conv, title });
      }
    }
  }, [conversations]);

  const handleDeleteConversation = useCallback(async (convId: string) => {
    const success = await deleteConversation(convId);
    if (success) {
      removeConversation(convId);
    }
  }, []);

  const handleTogglePin = useCallback(async (convId: string) => {
    const success = await toggleConversationPin(convId);
    if (success) {
      loadConversations();
    }
  }, [user?.id]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !user?.id) return;

    let conversation = currentConversation;
    if (!conversation) {
      conversation = await createConversation(user.id);
      if (conversation) {
        addConversation(conversation);
        setCurrentConversation(conversation);
      }
    }

    if (!conversation) return;

    // Add user message
    const userMessage = await addMessage(conversation.id, 'user', content);
    if (userMessage) {
      addMessageToState(userMessage);
    }

    // Update conversation title if it's the first message
    if (messages.length === 0 && conversation.title === t('chat.newChat')) {
      const newTitle = content.length > 40 ? content.substring(0, 40) + '...' : content;
      await updateConversationTitle(conversation.id, newTitle);
    }

    // Generate AI response
    setIsGenerating(true);

    const allMessages = [...messages, userMessage].filter(Boolean).map((m) => ({
      role: m?.role as 'user' | 'assistant',
      content: m?.content ?? '',
    }));

    try {
      const geminiMessages = convertMessagesToGeminiFormat(allMessages);
      const response = await generateAIResponse(
        geminiMessages,
        undefined,
        t('language.english') === 'हिन्दी' ? 'hi' : 'en'
      );

      const assistantMessage = await addMessage(conversation.id, 'assistant', response);
      if (assistantMessage) {
        addMessageToState(assistantMessage);
      }
    } catch (err) {
      console.error('Error generating response:', err);
      setError(t('chat.errorGeneric'));
    } finally {
      setIsGenerating(false);
    }
  }, [
    currentConversation,
    user?.id,
    messages,
    t,
    addMessageToState,
    setIsGenerating,
    setError,
  ]);

  const handleRegenerate = useCallback(async () => {
    if (messages.length < 2 || !currentConversation) return;

    // Get the last user message
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMessage) return;

    // Get messages before the last exchange
    const messagesBeforeLast = messages.slice(0, messages.length - 2);
    setMessages(messagesBeforeLast);

    // Regenerate the response
    setIsGenerating(true);

    try {
      const allMessages = [...messagesBeforeLast, lastUserMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const geminiMessages = convertMessagesToGeminiFormat(allMessages);
      const response = await generateAIResponse(
        geminiMessages,
        undefined,
        t('language.english') === 'हिन्दी' ? 'hi' : 'en'
      );

      const assistantMessage = await addMessage(currentConversation.id, 'assistant', response);
      if (assistantMessage) {
        addMessageToState(assistantMessage);
      }
    } catch (err) {
      console.error('Error regenerating response:', err);
      setError(t('chat.errorGeneric'));
    } finally {
      setIsGenerating(false);
    }
  }, [messages, currentConversation, t, setMessages, setIsGenerating, setError, addMessageToState]);

  const showWelcome = messages.length === 0 && !isGenerating && !isLoading;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Animated Background */}
      <AnimatedBackground />
      <FloatingParticles count={30} />

      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversation?.id ?? null}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onRenameConversation={handleRenameConversation}
        onDeleteConversation={handleDeleteConversation}
        onTogglePin={handleTogglePin}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-col h-screen ml-0 md:ml-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">{t('chat.title')}</h1>
                <div className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  {t('chat.online')}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16">
          {showWelcome ? (
            <WelcomeScreen onSendMessage={handleSendMessage} />
          ) : (
            <div className="max-w-4xl mx-auto py-8">
              {/* Loading Skeleton */}
              {isLoading && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                      <div className="w-10 h-10 rounded-xl bg-white/5" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-white/5 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Messages */}
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg as Message}
                    onRegenerate={msg.role === 'assistant' && index === messages.length - 1 ? handleRegenerate : undefined}
                    isLast={index === messages.length - 1}
                  />
                ))}

                {/* Typing Indicator */}
                {isGenerating && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 md:px-8 lg:px-16 py-4 border-t border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSend={handleSendMessage}
              onStop={stopGeneration}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
