import {
  GraduationCap,
  FileText,
  Clock3,
  IndianRupee,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Props {
  onSelect?: (question: string) => void;
}

const questions = [
  {
    icon: <GraduationCap size={18} />,
    title: "Scholarships",
    question: "Which scholarships am I eligible for?",
  },
  {
    icon: <IndianRupee size={18} />,
    title: "Benefits",
    question: "How much government benefit can I receive?",
  },
  {
    icon: <FileText size={18} />,
    title: "Documents",
    question: "Which documents are missing in my profile?",
  },
  {
    icon: <Clock3 size={18} />,
    title: "Deadlines",
    question: "Show schemes closing this week.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Eligibility",
    question: "Check my eligibility for all schemes.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "AI Recommendation",
    question: "Recommend the best schemes for me.",
  },
];

export default function SuggestedQuestions({
  onSelect,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

      {questions.map((item) => (
        <button
          key={item.title}
          onClick={() => onSelect?.(item.question)}
          className="group rounded-3xl border border-white/10 bg-[#111827] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white">

            {item.icon}

          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">

            {item.title}

          </h3>

          <p className="mt-2 text-sm leading-6 text-white/50 group-hover:text-white/70">

            {item.question}

          </p>

        </button>
      ))}

    </div>
  );
}