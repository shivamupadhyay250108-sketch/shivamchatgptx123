import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, MessageSquare } from 'lucide-react';

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

const suggestedQuestions = [
  {
    en: 'What schemes am I eligible for based on my profile?',
    hi: 'मेरी प्रोफ़ाइल के आधार पर मैं किन योजनाओं के लिए पात्र हूं?',
  },
  {
    en: 'List all scholarships available for OBC students',
    hi: 'OBC छात्रों के लिए सभी छात्रवृत्तियां सूचीबद्ध करें',
  },
  {
    en: 'How to apply for PM Kisan Samman Nidhi?',
    hi: 'PM किसान सम्मान निधि के लिए कैसे आवेदन करें?',
  },
  {
    en: 'What are the deadlines for National Scholarship Portal?',
    hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल की समय सीमा क्या है?',
  },
  {
    en: 'Compare PM Awas Yojana with State Housing Schemes',
    hi: 'PM आवास योजना की तुलना राज्य आवास योजनाओं से करें',
  },
  {
    en: 'What documents are required for Post Matric Scholarship?',
    hi: 'पोस्ट मैट्रिक छात्रवृत्ति के लिए कौन से दस्तावेज आवश्यक हैं?',
  },
];

export function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  return (
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Sparkles size={14} className="text-cyan-400" />
        {t('chat.suggestedQuestions')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {suggestedQuestions.map((q, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelectQuestion(q[isHindi ? 'hi' : 'en'])}
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all hover:border-cyan-500/30 hover:bg-white/10"
          >
            <MessageSquare size={16} className="text-white/40 shrink-0 group-hover:text-cyan-400 transition" />
            <p className="text-sm text-white/70 group-hover:text-white transition truncate">
              {q[isHindi ? 'hi' : 'en']}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
