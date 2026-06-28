import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
        size={20}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Government Schemes..."
        className="w-full rounded-3xl border border-white/10 bg-[#111827] py-5 pl-14 pr-5 text-white outline-none transition focus:border-cyan-400"
      />

    </div>
  );
}