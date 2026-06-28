import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Scheme } from "../../lib/database.types";

import { getRelatedSchemes } from "../../services/scheme.service";

interface Props {
  scheme: Scheme;
}

export default function RelatedSchemesCard({
  scheme,
}: Props) {
  const [related, setRelated] = useState<Scheme[]>([]);

  useEffect(() => {
    loadRelated();
  }, [scheme]);

  async function loadRelated() {
    const data = await getRelatedSchemes(
      scheme.category,
      scheme.id
    );

    setRelated(data);
  }

  return (
    <div className="rounded-[36px] border border-cyan-500/10 bg-gradient-to-br from-[#0B1220] via-[#0A1020] to-[#09111B] p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-bold">
            Related Schemes
          </h2>

          <p className="mt-2 text-white/50">
            AI found similar schemes for you.
          </p>

        </div>

        <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-400">
          {related.length} Results
        </div>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        {related.map((item) => (

          <div
            key={item.id}
            className="rounded-3xl border border-white/10 bg-[#111827] p-6 transition hover:-translate-y-2 hover:border-cyan-500"
          >

            <div className="flex items-center justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                <GraduationCap
                  className="text-cyan-400"
                  size={24}
                />

              </div>

              <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">

                {item.ai_score}%

              </div>

            </div>

            <h3 className="mt-5 text-xl font-bold">

              {item.name}

            </h3>

            <p className="mt-3 text-white/50">

              {item.estimated_benefit}

            </p>

            <Link
              to={`/scheme/${item.id}`}
              className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 font-medium text-white"
            >

              View Scheme

              <ArrowUpRight size={18} />

            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}