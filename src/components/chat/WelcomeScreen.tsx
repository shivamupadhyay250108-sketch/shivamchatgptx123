import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bot } from 'lucide-react';
import { QuickActions } from './QuickActions';
import { SuggestedQuestions } from './SuggestedQuestions';

interface WelcomeScreenProps {
  onSendMessage: (message: string) => void;
}

export function WelcomeScreen({ onSendMessage }: WelcomeScreenProps) {
  const { t } = useTranslation();

  const welcomeFeatures = [
    { icon: '🎯', text: 'Government Schemes' },
    { icon: '🎓', text: 'Scholarships' },
    { icon: '📄', text: 'Documents' },
    { icon: '✅', text: 'Eligibility' },
    { icon: '💰', text: 'Benefits' },
    { icon: '📝', text: 'Applications' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 max-w-4xl mx-auto">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-500">
            <Bot size={48} className="text-white" />
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          {t('chat.title')}
        </h1>
        <p className="text-white/50">
          {t('chat.subtitle')}
        </p>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 text-center"
      >
        <p className="text-white/70 mb-4">
          {t('chat.welcomeMessage')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {welcomeFeatures.map((feature, index) => (
            <motion.span
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/80"
            >
              <span>{feature.icon}</span>
              <span>{feature.text}</span>
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Online Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="text-sm text-green-400">{t('chat.online')}</span>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full mb-8"
      >
        <QuickActions onAction={onSendMessage} />
      </motion.div>

      {/* Suggested Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full"
      >
        <SuggestedQuestions onSelectQuestion={onSendMessage} />
      </motion.div>
    </div>
  );
}
