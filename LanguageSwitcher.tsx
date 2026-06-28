import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-cyan-400" />

      <select
        value={i18n.language}
        onChange={changeLanguage}
        className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white outline-none hover:border-cyan-400 transition"
      >
        <option value="en">🇬🇧 English</option>
        <option value="hi">🇮🇳 हिन्दी</option>
      </select>
    </div>
  );
}