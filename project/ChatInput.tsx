import { useState } from "react";
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
} from "lucide-react";

interface Props {
  onSend?: (message: string) => void;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend?.(message.trim());

    setMessage("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="rounded-[32px] border border-cyan-500/20 bg-[#0B0F19] p-5">

      <div className="flex items-center gap-3">

        {/* Attachment */}

        <button
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:text-cyan-400"
        >
          <Paperclip size={20} />
        </button>

        {/* Input */}

        <div className="relative flex-1">

          <input
            type="text"
            placeholder="Ask about schemes, scholarships, pensions..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-5 pr-14 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />

          <Sparkles
            size={18}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-400"
          />

        </div>

        {/* Voice */}

        <button
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:text-purple-400"
        >
          <Mic size={20} />
        </button>

        {/* Send */}

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={20} />
        </button>

      </div>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between text-xs text-white/40">

        <span>
          Press <b>Enter</b> to send
        </span>

        <span className="flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

          SchemeGPT-X AI Online

        </span>

      </div>

    </div>
  );
}