import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/supabase-data";
import { ProjectCard } from "@/components/project/project-card";
import { CTASection } from "@/components/common/cta-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "香港新盤一覽 | 按地區篩選及比較樓盤",
  description:
    "整合香港不同新盤入場價、呎價、地區及配套資料，提供月供估算，方便你進行比較、篩選，作出置業決策。",
  path: "/projects",
  keywords: ["香港新盤", "一手樓盤", "樓盤比較", "入場價", "按地區篩選"],
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { district: districtParam } = await searchParams;
  const selectedDistrict = typeof districtParam === "string" ? districtParam : "";
  const projects = await getProjects();

  const districts = Array.from(new Set(projects.map((p) => p.district)));
  const filtered = selectedDistrict
    ? projects.filter((p) => p.district === selectedDistrict)
    : projects;
  const displayProjects = filtered;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-6">
      {/* Page header */}
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">香港新盤一覽</h1>
          <p className="mt-2 text-neutral-600">
            整合各新盤入場價、呎價及月供估算，按地區篩選，快速決策。
          </p>
        </div>
        <Link
          href="/compare"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 hover:border-neutral-500 hover:text-neutral-900"
        >
          並排比較樓盤 →
        </Link>
      </section>

      {/* District filter */}
      <nav className="flex flex-wrap gap-2" aria-label="地區篩選">
        <Link
          href="/projects"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            !selectedDistrict
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
          }`}
        >
          全部地區
        </Link>
        {districts.map((d) => (
          <Link
            key={d}
            href={`/projects?district=${encodeURIComponent(d)}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              selectedDistrict === d
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
            }`}
          >
            {d}
          </Link>
        ))}
      </nav>

      {/* Results count */}
      <p className="text-sm text-neutral-500">
        {selectedDistrict ? `${selectedDistrict} · ` : ""}共 {displayProjects.length} 個樓盤
      </p>

      {/* Project grid */}
      {displayProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border bg-white py-16 text-center text-neutral-500">
          <p>目前暫無{selectedDistrict}樓盤，請選擇其他地區。</p>
          <Link href="/projects" className="mt-4 inline-block text-sm font-medium text-neutral-900 hover:underline">
            查看全部樓盤
          </Link>
        </div>
      )}

      {/* Bottom CTA */}
      <CTASection
        title="需要更多數據先作比較？"
        description="可索取最新價單資料，或先查看分析內容與供款估算工具。"
        primaryHref="/contact"
        primaryLabel="索取資料"
        whatsappLabel="WhatsApp 查詢"
      />
    </div>
  );
}
