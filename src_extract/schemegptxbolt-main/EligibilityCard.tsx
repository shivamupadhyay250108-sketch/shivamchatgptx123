import { CircleCheck as CheckCircle2 } from "lucide-react";

import type { Scheme } from "../../lib/database.types";

interface Props {
  scheme: Scheme;
}

export default function EligibilityCard({ scheme }: Props) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#111827] p-8">

      <h2 className="text-2xl font-bold">
        Eligibility Criteria
      </h2>

      <div className="mt-6 space-y-5">

        {scheme.eligibility.map((item, index) => (

          <div
            key={index}
            className="flex items-start gap-4"
          >

            <CheckCircle2
              className="mt-1 text-green-400"
              size={22}
            />

            <span className="text-white/80">
              {item}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}