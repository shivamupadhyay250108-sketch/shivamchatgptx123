import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Copy, Check, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { Message } from '../../lib/database.types';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
  isLast?: boolean;
}

export function ChatMessage({ message, onRegenerate, isLast }: ChatMessageProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isAssistant = message.role === 'assistant';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(message.content);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.onend = () => setSpeaking(false);
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      {isAssistant && (
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
      )}

      <div
        className={`relative max-w-[80%] ${
          isAssistant
            ? 'rounded-2xl bg-white/5 border border-white/10 p-4'
            : 'rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 p-4'
        }`}
      >
        {/* Message Content */}
        <div className={isAssistant ? 'text-white/90' : 'text-white'}>
          {isAssistant ? (
            <MarkdownRenderer content={message.content} />
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Actions for assistant messages */}
        {isAssistant && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span className="text-green-400">{t('chat.copied')}</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>{t('chat.copy')}</span>
                </>
              )}
            </button>

            <button
              onClick={handleSpeak}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5"
            >
              {speaking ? (
                <>
                  <VolumeX size={14} className="text-red-400" />
                  <span className="text-red-400">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>{t('chat.listen')}</span>
                </>
              )}
            </button>

            {isLast && onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5"
              >
                <RotateCcw size={14} />
                <span>{t('chat.regenerate')}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {!isAssistant && (
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
      )}
    </motion.div>
  );
}
