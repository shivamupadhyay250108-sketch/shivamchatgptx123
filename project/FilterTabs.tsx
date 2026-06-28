interface Props {
  active: string;
  onChange: (value: string) => void;
}

const filters = [
  "All",
  "Education",
  "Agriculture",
  "Business",
  "Health",
  "Women",
];

export default function FilterTabs({
  active,
  onChange,
}: Props) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">

      {filters.map((item) => (

        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-full px-6 py-3 font-medium transition ${
            active === item
              ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
              : "border border-white/10 bg-[#111827] text-white/60 hover:border-cyan-500"
          }`}
        >
          {item}
        </button>

      ))}

    </div>
  );
}