import { useEffect, useMemo, useState } from "react";

import SearchBar from "./SearchBar";
import FilterTabs from "./FilterTabs";
import SchemeCard from "./SchemeCard";

import { getAllSchemes } from "../../services/scheme.service";

import type { Database } from "../../lib/database.types";

type Scheme = Database["public"]["Tables"]["schemes"]["Row"];

export default function SchemeResultsPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadSchemes();
  }, []);

  async function loadSchemes() {
    try {
      setLoading(true);

      const data = await getAllSchemes();

      setSchemes(data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchSearch =
        scheme.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ?? false;

      const matchCategory =
        filter === "All" ||
        scheme.category === filter;

      return matchSearch && matchCategory;
    });
  }, [schemes, search, filter]);

  return (
    <div className="space-y-8">

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <FilterTabs
        active={filter}
        onChange={setFilter}
      />

      {loading ? (
        <div className="py-20 text-center text-white/60">
          Loading Government Schemes...
        </div>
      ) : filteredSchemes.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-12 text-center">
          <h2 className="text-2xl font-bold">
            No Schemes Found
          </h2>

          <p className="mt-3 text-white/50">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
            />
          ))}
        </div>
      )}

    </div>
  );
}