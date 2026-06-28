import { useEffect, useState } from "react";
import { GraduationCap, CircleCheck as CheckCircle2, TrendingUp } from "lucide-react";

import type { Database } from "../../lib/database.types";
import { getSuccessStories } from "../../services/scheme.service";

type Scheme =
  Database["public"]["Tables"]["schemes"]["Row"];

type SuccessStory =
  Database["public"]["Tables"]["success_stories"]["Row"];

interface Props {
  scheme: Scheme;
}

export default function SuccessStoriesCard({
  scheme,
}: Props) {
  const [stories, setStories] = useState<SuccessStory[]>([]);

  useEffect(() => {
    loadStories();
  }, [scheme.id]);

  async function loadStories() {
    const data = await getSuccessStories(scheme.id);
    setStories(data);
  }

  const averageRating =
    stories.length > 0
      ? (
          stories.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / stories.length
        ).toFixed(1)
      : "0";

  return (
    <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#0A1020] to-[#080E1A] p-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-4xl font-bold text-white">
            Success Stories
          </h2>

          <p className="mt-2 text-white/50">
            Verified beneficiaries of this scheme.
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-green-400">

          <TrendingUp size={16} />

          {stories.length} Verified

        </div>

      </div>

      {/* Stats */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <p className="text-sm text-white/50">
            Beneficiaries
          </p>

          <h3 className="mt-2 text-2xl font-bold text-cyan-400">
            {stories.length}
          </h3>

        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">

          <p className="text-sm text-white/50">
            Average Rating
          </p>

          <h3 className="mt-2 text-2xl font-bold text-purple-400">
            {averageRating} ⭐
          </h3>

        </div>

                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

          <p className="text-sm text-white/50">
            Scheme Status
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-400">
            Active
          </h3>

        </div>

      </div>

      {/* Stories */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {stories.map((story) => (

          <div
            key={story.id}
            className="group rounded-3xl border border-white/10 bg-black/20 p-6 transition-all hover:border-cyan-400/30"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                {story.photo ? (

                  <img
                    src={story.photo}
                    alt={story.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />

                ) : (

                  <GraduationCap
                    className="text-cyan-400"
                    size={26}
                  />

                )}

              </div>

              <div>

                <h3 className="text-xl font-semibold text-white">
                  {story.name}
                </h3>

                <p className="text-sm text-white/40">
                  {story.city}
                </p>

              </div>

            </div>

            <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

              <p className="text-sm text-green-400">
                Amount Received
              </p>

              <h4 className="mt-1 text-2xl font-bold text-white">
                {story.amount_received}
              </h4>

            </div>

            <p className="mt-5 italic text-white/60">
              "{story.story}"
            </p>

            <div className="mt-5 flex items-center justify-between">

              <div className="flex items-center gap-2 text-sm text-green-400">

                <CheckCircle2 size={16} />

                Verified Beneficiary

              </div>

              <div className="text-yellow-400">
                {"⭐".repeat(story.rating)}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}