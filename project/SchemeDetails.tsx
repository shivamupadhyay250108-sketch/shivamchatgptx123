import FloatingAIAssistant from "../FloatingAIAssistant";

import SchemeHeader from "./SchemeHeader";
import EligibilityCard from "./EligibilityCard";
import BenefitsCard from "./BenefitsCard";
import DocumentsRequiredCard from "./DocumentsCard";
import TimelineCard from "./TimelineCard";
import ApplyNowCard from "./ApplyNowCard";
import RelatedSchemesCard from "./RelatedSchemesCard";
import SuccessStoriesCard from "./SuccessStoriesCard";
import OfficialLinksCard from "./OfficialLinksCard";
import AIRecommendationCard from "./AIRecommendationCard";

import { useScheme } from "../../hooks/useScheme";

interface Props {
  id?: string;
}

export default function SchemeDetails({ id }: Props) {
  const { scheme, loading } = useScheme(id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070B14] text-white">
        Loading Scheme...
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070B14] text-red-400">
        Scheme not found.
      </div>
    );
  }

  return (
    <div className="space-y-10 bg-[#070B14] p-6">

      <SchemeHeader scheme={scheme} />

      <EligibilityCard scheme={scheme} />

      <BenefitsCard scheme={scheme} />

      <DocumentsRequiredCard scheme={scheme} />

      <TimelineCard scheme={scheme} />

      <ApplyNowCard scheme={scheme} />

      <RelatedSchemesCard scheme={scheme} />

      <SuccessStoriesCard scheme={scheme} />

      <OfficialLinksCard scheme={scheme} />

      <AIRecommendationCard scheme={scheme} />

      <FloatingAIAssistant />

    </div>
  );
}