import { FileText, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from "lucide-react";

interface Props {
  name: string;
  verified: boolean;
}

export default function DocumentCard({
  name,
  verified,
}: Props) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#111827] p-6 transition hover:border-cyan-500">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-4">

            <FileText className="text-cyan-400" />

          </div>

          <div>

            <h3 className="font-bold">
              {name}
            </h3>

            <p className="text-sm text-white/50">
              Government Document
            </p>

          </div>

        </div>

        {verified ? (
          <CheckCircle2
            className="text-green-400"
            size={24}
          />
        ) : (
          <AlertTriangle
            className="text-orange-400"
            size={24}
          />
        )}

      </div>

    </div>
  );
}