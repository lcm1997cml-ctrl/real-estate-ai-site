import { CheckCircle2, AlertCircle } from "lucide-react";
import { Project } from "@/types/project";

export function SuitabilityCard({ project }: { project: Project }) {
  const hasSuitability = project.suitability && project.suitability.length > 0;
  const hasPros = project.pros && project.pros.length > 0;
  const hasCons = project.cons && project.cons.length > 0;

  if (!hasSuitability && !hasPros && !hasCons) return null;

  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-semibold text-neutral-900">適合誰買？</h2>
      <p className="mt-1 text-sm text-neutral-500">
        以下為客觀分析，供你判斷此盤是否符合自身需求
      </p>

      {/* Audience tags */}
      {hasSuitability && (
        <div className="mt-5 flex flex-wrap gap-3">
          {project.suitability!.map((s) => (
            <div
              key={s.label}
              className="min-w-36 flex-1 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
            >
              <p className="text-sm font-semibold text-amber-800">{s.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-amber-700">{s.reason}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pros & cons */}
      {(hasPros || hasCons) && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {hasPros && (
            <div>
              <p className="mb-3 text-sm font-semibold text-neutral-700">優點</p>
              <ul className="space-y-2">
                {project.pros!.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasCons && (
            <div>
              <p className="mb-3 text-sm font-semibold text-neutral-700">注意事項</p>
              <ul className="space-y-2">
                {project.cons!.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-neutral-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
