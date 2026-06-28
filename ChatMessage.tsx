type Props = {
  ai?: boolean;
  message: string;
};

export default function ChatMessage({
  ai = false,
  message,
}: Props) {
  return (
    <div
      className={`flex ${
        ai ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 ${
          ai
            ? "bg-cyan-500/10 border border-cyan-500/20 text-white"
            : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}