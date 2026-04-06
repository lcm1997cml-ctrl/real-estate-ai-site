import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects as fallbackProjects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { getProjectWhatsAppUrl } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CTASection } from "@/components/common/cta-section";
import { getArticleBySlug, getArticleSections } from "@/lib/article-content";
import { ComparisonTable } from "@/components/common/comparison-table";
import { LeadForm } from "@/components/forms/lead-form";
import { getProjectDetailBySlug, getProjects } from "@/lib/supabase-data";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return fallbackProjects.flatMap((project) =>
    project.articles.map((article) => ({ slug: project.slug, article: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}): Promise<Metadata> {
  const { slug, article: articleSlug } = await params;
  const project = await getProjectDetailBySlug(slug);
  if (!project) return {};
  const article = getArticleBySlug(project, articleSlug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} | ${project.name}`,
    description: `${article.description} 同步提供樓盤數據比較、供款計算與決策參考。`,
    path: `/project/${project.slug}/${article.slug}`,
    keywords: project.seoKeywords,
  });
}

export default async function ProjectArticlePage({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}) {
  const { slug, article: articleSlug } = await params;
  const project = await getProjectDetailBySlug(slug);
  if (!project) return notFound();
  const article = getArticleBySlug(project, articleSlug);
  if (!article) return notFound();
  const projects = await getProjects();

  const waHref = getProjectWhatsAppUrl(project.name);

  const sections = getArticleSections(article.slug, project.district);
  const midPoint = Math.ceil(sections.length / 2);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "首頁" },
          { href: "/projects", label: "所有樓盤" },
          { href: `/project/${project.slug}`, label: project.name },
          { href: `/project/${project.slug}/${article.slug}`, label: article.title },
        ]}
      />

      <article className="rounded-2xl border bg-white p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-neutral-900">{article.title}</h1>
        <p className="mt-3 text-neutral-600">{article.description}</p>

        {/* First half of content */}
        <div className="mt-6 space-y-5 text-neutral-700">
          {sections.slice(0, midPoint).map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        {/* Mid-article CTA */}
        {sections.length > 1 && (
          <div className="my-8 rounded-xl border border-amber-200 bg-amber-50 px-6 py-6 text-center">
            <p className="font-semibold text-neutral-900">延伸資料：取得價單與比較重點</p>
            <p className="mt-1 text-sm text-neutral-700">可先取得資料，再配合供款計算進一步比較。</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/get-latest-price"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800"
              >
                取得價單資料
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
                WhatsApp 查詢
              </a>
            </div>
          </div>
        )}

        {/* Second half of content */}
        <div className="space-y-5 text-neutral-700">
          {sections.slice(midPoint).map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        {article.slug === "compare-nearby-projects" && (
          <ComparisonTable
            projects={[project, ...projects.filter((p) => p.slug !== project.slug).slice(0, 1)]}
          />
        )}
        {article.slug === "get-price-list" && <LeadForm whatsappHref={waHref} />}
      </article>

      {/* Internal links */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="text-xl font-semibold">相關分析文章</h2>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <Link href={`/project/${project.slug}`} className="text-neutral-700 hover:text-neutral-900 hover:underline">
            查看此樓盤資料
          </Link>
          <Link href="/compare" className="text-neutral-700 hover:text-neutral-900 hover:underline">
            比較其他樓盤
          </Link>
          <Link href="/tools/mortgage-calculator" className="text-neutral-700 hover:text-neutral-900 hover:underline">
            計算供款
          </Link>
        </div>
        <div className="mt-3 grid gap-2 text-sm">
          {project.articles
            .filter((a) => a.slug !== article.slug)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/project/${project.slug}/${a.slug}`}
                className="text-neutral-700 hover:text-neutral-900 hover:underline"
              >
                {a.title}
              </Link>
            ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="需要更多分析資料？"
        description="可索取更新資料，並配合比較頁與供款工具整理決策。"
        whatsappHref={waHref}
        whatsappLabel="WhatsApp 查詢"
      />
    </div>
  );
}
