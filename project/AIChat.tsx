import { useEffect, useRef, useState } from "react";
import { X, Bot } from "lucide-react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";

import { askGemini } from "../../services/gemini.service";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Message = {
  ai: boolean;
  message: string;
};

export default function AIChat({
  open,
  onClose,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      ai: true,
      message:
        "👋 Hello! I'm SchemeGPT-X AI. Ask me anything about Government Schemes, Scholarships, Eligibility, Documents or Benefits.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        ai: false,
        message: text,
      },
    ]);

    setLoading(true);

    try {
      const reply = await askGemini(text);

      setMessages((prev) => [
        ...prev,
        {
          ai: true,
          message: reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          ai: true,
          message:
            "⚠️ Sorry, something went wrong while contacting SchemeGPT-X AI.",
        },
      ]);
    }

    setLoading(false);
  };

  if (!open) return null;

  return (
        <div className="fixed bottom-28 right-8 z-[9999]">
      <div
        className="
          flex
          h-[700px]
          w-[430px]
          flex-col
          overflow-hidden
          rounded-[32px]
          border
          border-cyan-500/20
          bg-[#08111F]/95
          backdrop-blur-2xl
          shadow-[0_0_60px_rgba(0,255,255,.12)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
              <Bot className="text-white" />
            </div>

            <div>
              <h2 className="font-bold text-white">
                SchemeGPT-X AI
              </h2>

              <p className="text-sm text-cyan-300">
                Online
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <X className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              ai={msg.ai}
              message={msg.message}
            />
          ))}

          {loading && (
            <ChatMessage
              ai
              message="✍️ SchemeGPT-X is typing..."
            />
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested Questions */}
        <div className="border-t border-white/10 px-5 py-4">
          <SuggestedQuestions />
        </div>

        {/* Chat Input */}
        <div className="border-t border-white/10 p-5">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}