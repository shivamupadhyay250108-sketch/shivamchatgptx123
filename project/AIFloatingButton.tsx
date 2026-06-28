import { Sparkles } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function AIFloatingButton({ onClick }: Props) {
  return (
    <>
      {/* Glow */}
      <div className="fixed bottom-8 right-8 z-[9998] h-20 w-20 rounded-full bg-cyan-500/30 blur-3xl animate-pulse" />

      {/* Button */}
      <button
        onClick={onClick}
        className="
          group
          fixed
          bottom-8
          right-8
          z-[9999]
          flex
          items-center
          gap-3
          rounded-full
          border
          border-cyan-400/20
          bg-[#08111F]/90
          backdrop-blur-xl
          px-6
          py-4
          shadow-[0_0_40px_rgba(0,255,255,0.15)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-400
          hover:shadow-[0_0_60px_rgba(0,255,255,0.35)]
        "
      >
        {/* Icon */}
        <div
          className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-purple-500
          "
        >
          <Sparkles className="text-white" size={22} />

          {/* Notification Dot */}
          <span
            className="
              absolute
              -right-1
              -top-1
              h-3
              w-3
              rounded-full
              bg-green-400
              ring-2
              ring-[#08111F]
              animate-pulse
            "
          />
        </div>

        {/* Text */}
        <div className="hidden sm:block text-left">
          <p className="text-xs text-cyan-300">
            SchemeGPT AI
          </p>

          <p className="font-semibold text-white">
            Ask AI
          </p>
        </div>
      </button>
    </>
  );
}