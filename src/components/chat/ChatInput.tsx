import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Send,
  Mic,
  MicOff,
  Image,
  FileText,
  X,
  Square,
} from 'lucide-react';
import { cn } from '../ui/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isGenerating?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isGenerating, disabled }: ChatInputProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSend = useCallback(() => {
    if (isGenerating && onStop) {
      onStop();
      return;
    }

    if (!message.trim() && !attachedFile) return;

    let finalMessage = message.trim();
    if (attachedFile) {
      finalMessage += `\n\n[Attached: ${attachedFile.name}]`;
    }

    onSend(finalMessage);
    setMessage('');
    setAttachedFile(null);
    setFilePreview(null);
  }, [message, attachedFile, isGenerating, onSend, onStop]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoice = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      {/* File Preview */}
      <AnimatePresence>
        {attachedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-20 left-4 right-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] p-3"
          >
            {filePreview ? (
              <img src={filePreview} alt="Preview" className="h-12 w-12 rounded-lg object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                <FileText size={20} className="text-white/50" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{attachedFile.name}</p>
              <p className="text-xs text-white/50">{(attachedFile.size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={removeFile} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Container */}
      <div className="flex items-end gap-3 rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-4">
        {/* File Upload Buttons */}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-400/30"
            title={t('chat.uploadImage')}
          >
            <Image size={18} />
          </button>
        </div>

        {/* Text Input */}
        <div className="relative flex-1">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.inputPlaceholder')}
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-transparent text-white placeholder:text-white/30 outline-none text-base leading-relaxed max-h-[200px] disabled:opacity-50"
          />
        </div>

        {/* Voice Input */}
        <button
          onClick={toggleVoice}
          disabled={!recognitionRef.current}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border transition',
            isListening
              ? 'border-red-500/50 bg-red-500/20 text-red-400 animate-pulse'
              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-purple-400 hover:border-purple-400/30'
          )}
          title={t('chat.voiceInput')}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        {/* Send/Stop Button */}
        <motion.button
          onClick={handleSend}
          disabled={(isGenerating ? !onStop : (!message.trim() && !attachedFile)) || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl transition',
            isGenerating
              ? 'border border-red-500/50 bg-red-500/20 text-red-400 hover:bg-red-500/30'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed'
          )}
          title={isGenerating ? t('chat.stopGenerating') : t('chat.send')}
        >
          {isGenerating ? <Square size={18} /> : <Send size={18} />}
        </motion.button>
      </div>

      {/* Voice Listening Indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 px-4 py-2 text-sm text-white"
          >
            <Mic size={14} className="text-cyan-400" />
            {t('chat.speakNow')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
