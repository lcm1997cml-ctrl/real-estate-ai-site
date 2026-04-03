import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects as fallbackProjects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  getProjectDetailBySlug,
  getProjects,
} from "@/lib/supabase-data";
import { HeroSection } from "@/components/project/hero-section";
import { ProjectOverview } from "@/components/project/project-overview";
import { HighlightGrid } from "@/components/project/highlight-grid";
import { PricingCard } from "@/components/project/pricing-card";
import { PriceBarChart } from "@/components/project/price-bar-chart";
import { SuitabilityCard } from "@/components/project/suitability-card";
import { GallerySection } from "@/components/project/gallery-section";
import { FloorplanSection } from "@/components/project/floorplan-section";
import { FAQSection } from "@/components/project/faq-section";
import { CTASection } from "@/components/common/cta-section";
import { ArticleSection } from "@/components/project/article-section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { resolveProjectGalleryImages, resolveProjectNeighborhoodImage } from "@/lib/project-media";
import { parseHkdPrice } from "@/lib/mortgage";

export function generateStaticParams() {
  return fallbackProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetailBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.name} | ${project.district} 新盤數據分析`,
    description: `${project.name} 入場價 ${project.priceFrom}、呎價 ${project.avgPricePerSqft}。查看戶型、供款估算、同區比較及客觀優缺點分析，協助置業決策。`,
    path: `/project/${project.slug}`,
    keywords: project.seoKeywords,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectDetailBySlug(slug);
  if (!project) return notFound();
  const isLaMirabelle = project.slug === "la-mirabelle";
  const galleryImages = resolveProjectGalleryImages(project);
  const neighborhoodImage = resolveProjectNeighborhoodImage(project);

  const allProjects = await getProjects();
  const chartProjects = allProjects.length > 0 ? allProjects : fallbackProjects;

  const waHref = buildWhatsAppUrl(
    project.whatsappNumber ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
    project.whatsappMessage,
  );

  const hasAnyUnitPrice = project.unitTypes.some((u) => parseHkdPrice(u.priceFrom) > 0);
  const hasProjectPrice =
    Boolean(project.priceFrom && project.priceFrom !== "-" && project.priceFrom !== "HK$0") ||
    Boolean(
      project.avgPricePerSqft &&
        project.avgPricePerSqft !== "-" &&
        project.avgPricePerSqft !== "HK$0 / 呎",
    );
  const showPricingSection = project.unitTypes.length > 0 || hasProjectPrice;
  const floorPlanImages = project.floorPlanImages?.length
    ? project.floorPlanImages
    : project.floorPlanImage
      ? [project.floorPlanImage]
      : [];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { href: "/", label: "首頁" },
          { href: "/projects", label: "所有樓盤" },
          { href: `/project/${project.slug}`, label: project.name },
        ]}
      />

      {/* Hero — with inline CTAs */}
      <HeroSection
        project={project}
        waHref={waHref}
        compareHref={`/compare?a=${project.slug}`}
        compactStatsText={isLaMirabelle}
      />

      {/* 6-card stats overview */}
      <ProjectOverview project={project} compactText={isLaMirabelle} />

      {/* Quick CTA */}
      <CTASection
        title={`索取 ${project.name} 最新資料`}
        description="可取得入場價、價單更新與付款辦法，作為比較與決策參考。"
        whatsappHref={waHref}
        whatsappLabel={`WhatsApp 查詢 ${project.name}`}
      />

      {/* Key highlights */}
      <HighlightGrid highlights={project.highlights} />

      {/* Suitability — who should buy this */}
      <SuitabilityCard project={project} />

      {/* Floor plans — DB image_type=floorplan or local floorPlanImage */}
      {floorPlanImages.length > 0 && (
        <FloorplanSection images={floorPlanImages} projectName={project.name} />
      )}

      {/* Pricing cards — each with monthly estimate */}
      {showPricingSection && (
        <section>
          <h2 className="text-2xl font-semibold">價格與戶型資料</h2>
          <p className="mt-1 text-sm text-neutral-500">
            {hasAnyUnitPrice || hasProjectPrice
              ? "每款戶型均附入場月供估算（30% 首期 / 3.5% / 30 年），方便初步評估。"
              : "以下為戶型面積參考；入場價單公佈後將以最新價單為準。"}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {project.unitTypes.map((unit, idx) => (
              <PricingCard key={`${unit.name}-${unit.area}-${idx}`} unit={unit} />
            ))}
          </div>
        </section>
      )}

      {/* Mid CTA */}
      <CTASection
        title="按你的預算比較戶型與付款方案"
        description="先用資料篩選合適戶型，再配合供款估算檢視可負擔範圍。"
        primaryHref="/contact"
        primaryLabel="索取資料"
        whatsappHref={waHref}
        whatsappLabel="WhatsApp 即時查詢"
      />

      {/* Price comparison chart vs other projects */}
      <PriceBarChart projects={chartProjects} currentSlug={project.slug} />

      {/* Nearby facilities */}
      <section>
        <h2 className="text-2xl font-semibold">周邊配套</h2>
        {project.neighborhoodDescription && (
          <div
            className={`mt-3 rounded-xl border bg-white p-4 text-neutral-700 whitespace-pre-line ${isLaMirabelle ? "max-w-prose text-base leading-relaxed" : "text-sm leading-7"}`}
          >
            {project.neighborhoodDescription}
          </div>
        )}
        {neighborhoodImage && (
          <div className="mt-4 overflow-hidden rounded-2xl">
            <img
              src={neighborhoodImage}
              alt={`${project.name} 周邊環境`}
              className="h-52 w-full object-cover md:h-64"
            />
          </div>
        )}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {project.nearbyFacilities.map((f) => (
            <div key={f.name} className="rounded-xl border bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                {f.category}
              </p>
              <p className="mt-1 font-medium text-neutral-900">{f.name}</p>
              <p className="text-sm text-neutral-500">{f.distance}</p>
            </div>
          ))}
        </div>
      </section>

      <GallerySection images={galleryImages} />
      <FAQSection faq={project.faq} />

      {/* Articles — only shown when data is available */}
      {project.articles.length > 0 && (
        <>
          <ArticleSection project={project} />

          <section className="rounded-xl border bg-white p-6">
            <h2 className="text-xl font-semibold">深度分析文章</h2>
            <div className="mt-3 grid gap-2 text-sm text-neutral-700 md:grid-cols-2">
              {project.articles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/project/${project.slug}/${item.slug}`}
                  className="hover:text-amber-700 hover:underline"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Bottom CTA */}
      <CTASection
        title="需要更多此樓盤數據？"
        description="可取得價單資料、比較重點與供款估算參考，幫助你整理下一步決策。"
        whatsappHref={waHref}
        whatsappLabel={`WhatsApp 查詢 ${project.name}`}
      />
    </div>
  );
}
