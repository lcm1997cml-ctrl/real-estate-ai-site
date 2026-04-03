import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/supabase-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ComparisonTable } from "@/components/common/comparison-table";
import { ProjectSelector } from "@/components/compare/project-selector";
import { CTASection } from "@/components/common/cta-section";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "比較兩個樓盤 | 並排比較樓盤數據",
  description: "以價格、呎價、地區、戶型與配套等維度並排比較樓盤數據，協助你更有系統地篩選選項。",
  path: "/compare",
});

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { a, b } = await searchParams;
  const slugA = typeof a === "string" ? a : "";
  const slugB = typeof b === "string" ? b : "";
  const projects = await getProjects();

  const projectA = slugA ? projects.find((p) => p.slug === slugA) : undefined;
  const projectB = slugB ? projects.find((p) => p.slug === slugB) : undefined;
  const bothFound = !!projectA && !!projectB;

  // Build project options for the selector
  const options = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    district: p.district,
    priceFrom: p.priceFrom,
    status: p.status,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-6">
      {/* Page header */}
      <section>
        <h1 className="text-3xl font-semibold text-neutral-900">比較兩個樓盤</h1>
        <p className="mt-2 text-neutral-600">
          以價格、呎價、地區、戶型與配套等維度，並排比較兩個樓盤資料。
        </p>
      </section>

      {/* Project selector */}
      <ProjectSelector
        projects={options}
        initialA={slugA}
        initialB={slugB}
      />

      {/* Comparison results */}
      {bothFound ? (
        <>
          {/* Header bar showing selected projects */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-white px-6 py-4">
            <Link
              href={`/project/${projectA.slug}`}
              className="font-semibold text-neutral-900 hover:text-amber-700"
            >
              {projectA.name}
            </Link>
            <span className="text-neutral-400">vs</span>
            <Link
              href={`/project/${projectB.slug}`}
              className="font-semibold text-neutral-900 hover:text-amber-700"
            >
              {projectB.name}
            </Link>
            <span className="ml-auto text-xs text-neutral-400">
              比較連結可複製分享
            </span>
          </div>

          {/* Full comparison table */}
          <ComparisonTable projects={[projectA, projectB]} />

          {/* Quick action links */}
          <section className="grid gap-4 sm:grid-cols-2">
            {[projectA, projectB].map((p) => {
              const waHref = buildWhatsAppUrl(
                p.whatsappNumber ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
                p.whatsappMessage,
              );
              return (
                <div key={p.slug} className="rounded-xl border bg-white p-5">
                  <p className="font-semibold text-neutral-900">{p.name}</p>
                  <p className="mt-1 text-sm text-neutral-500">{p.district} · {p.priceFrom} 起</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/project/${p.slug}`}
                      className="inline-flex h-8 items-center rounded-lg bg-neutral-900 px-3 text-xs font-medium text-white hover:bg-neutral-700"
                    >
                      查看分析
                    </Link>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-8 items-center rounded-lg border px-3 text-xs font-medium text-neutral-800 hover:bg-neutral-100"
                    >
                      WhatsApp 查詢
                    </a>
                    <Link
                      href={`/get-latest-price`}
                      className="inline-flex h-8 items-center rounded-lg border border-amber-300 bg-amber-50 px-3 text-xs font-medium text-amber-800 hover:bg-amber-100"
                    >
                      索取資料
                    </Link>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Compare other projects */}
          <section className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold">比較其他樓盤</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {projects
                .filter((p) => p.slug !== slugA && p.slug !== slugB)
                .map((p) => (
                  <div key={p.slug} className="flex gap-1.5">
                    <Link
                      href={`/compare?a=${slugA}&b=${p.slug}`}
                      className="rounded-lg border px-3 py-1.5 text-sm text-neutral-700 hover:border-neutral-400"
                    >
                      {projectA!.name} vs {p.name}
                    </Link>
                    <Link
                      href={`/compare?a=${slugB}&b=${p.slug}`}
                      className="rounded-lg border px-3 py-1.5 text-sm text-neutral-700 hover:border-neutral-400"
                    >
                      {projectB!.name} vs {p.name}
                    </Link>
                  </div>
                ))}
            </div>
          </section>
        </>
      ) : (
        /* Prompt when selection is incomplete */
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 px-6 py-16 text-center text-neutral-400">
          {slugA && !projectA ? (
            <p>找不到樓盤「{slugA}」，請重新選擇。</p>
          ) : slugB && !projectB ? (
            <p>找不到樓盤「{slugB}」，請重新選擇。</p>
          ) : (
            <p>選擇兩個樓盤後，即可並排比較所有數據。</p>
          )}
        </div>
      )}

      {/* Bottom CTA */}
      <CTASection
        title="比較後可再延伸查看更多數據"
        description="你可繼續查看個別樓盤分析、供款計算與最新資料更新。"
        primaryHref="/contact"
        primaryLabel="查看分析"
        whatsappLabel="WhatsApp 即時查詢"
      />
    </div>
  );
}
