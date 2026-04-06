import Link from "next/link";
import { Metadata } from "next";
import { ProjectCarousel } from "@/components/common/project-carousel";
import { CTASection } from "@/components/common/cta-section";
import { ArticleSection } from "@/components/project/article-section";
import { ProjectCard } from "@/components/project/project-card";
import { SiteStats } from "@/components/common/site-stats";
import { buildMetadata } from "@/lib/seo";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";
import { QuickMortgageCalculator } from "@/components/tools/quick-mortgage-calculator";
import { BarChart2, Scale, Calculator } from "lucide-react";
import { getProjects } from "@/lib/supabase-data";
import { projects as fallbackProjects } from "@/data/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "香港一手樓盤數據分析 | 比較、計算、決策",
  description:
    "整合香港新盤入場價、呎價與配套數據，提供即時供款計算、樓盤並排比較工具，協助你作出更清晰的置業決策。",
  path: "/",
});

export default async function HomePage() {
  const projects = await getProjects();
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;
  const featured = displayProjects[0];

  const waHref = getDefaultWhatsAppUrl();

  const features = [
    {
      Icon: BarChart2,
      label: "整合樓盤數據",
      detail:
        "收集各新盤入場價、呎價及配套資訊，讓你在同一平台並排比較，不用逐個發展商網站搜尋。",
      href: "/projects",
      linkLabel: "瀏覽所有樓盤",
    },
    {
      Icon: Calculator,
      label: "即時供款試算",
      detail:
        "以數字為基礎分析供款比率、首期需求及 HKMA 壓力測試，協助你掌握入市的真實成本與風險。",
      href: "/tools/mortgage-calculator",
      linkLabel: "試用按揭計算機",
    },
    {
      Icon: Scale,
      label: "自主比較工具",
      detail:
        "選擇兩個樓盤，並排比較入場價、呎價、戶型、地區及配套，讓你自主模擬，不受銷售壓力影響。",
      href: "/compare",
      linkLabel: "開始比較",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-8 md:px-6">
      {/* Hero carousel — cycles through all featured projects */}
      <ProjectCarousel projects={displayProjects} />

      {/* Quick-glance site stats */}
      <SiteStats projects={displayProjects} />

      {/* Top data-focused CTA */}
      <CTASection
        title="索取最新樓盤數據資料"
        description="提交資料即可獲取入場價、付款辦法及樓盤分析摘要，作為你決策的參考依據。"
        primaryLabel="索取最新資料"
        whatsappHref={waHref}
        whatsappLabel="WhatsApp 查詢"
      />

      {/* All projects grid */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">精選樓盤</h2>
            <p className="mt-1 text-sm text-neutral-500">
              每張卡片已包含入場月供估算（30% 首期 / 3.5% / 30 年）
            </p>
          </div>
          <Link href="/projects" className="shrink-0 text-sm text-neutral-600 hover:text-neutral-900">
            查看全部 →
          </Link>
        </div>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* How we help — analytical, not sales */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">資料導向的選盤方式</h2>
          <p className="mt-2 text-neutral-600">比較、分析、工具——以數據支持你的決定，而非推銷。</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ Icon, label, detail, href, linkLabel }) => (
            <div key={label} className="flex flex-col rounded-xl border bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <Icon className="h-5 w-5 text-amber-600" />
              </div>
              <p className="mt-4 font-semibold text-neutral-900">{label}</p>
              <p className="mt-2 flex-1 text-sm text-neutral-600">{detail}</p>
              <Link
                href={href}
                className="mt-4 text-sm font-medium text-amber-700 hover:underline"
              >
                {linkLabel} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Mid CTA */}
      <CTASection
        title="想了解自己的實際入場能力？"
        description="使用按揭計算機試算供款，或提交資料取得更詳細的樓盤分析，協助你作出更清晰的決策。"
        primaryHref="/tools/mortgage-calculator"
        primaryLabel="試用按揭計算機"
        whatsappHref={waHref}
        whatsappLabel="WhatsApp 查詢"
      />

      {/* Tools teaser */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col rounded-xl border bg-white p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
            <Calculator className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">按揭計算機</h3>
          <p className="mt-2 text-sm text-neutral-600">
            即時計算月供、總利息及 HKMA 壓力測試，輸入樓價即出結果。
          </p>
          <ul className="mt-4 space-y-1 text-sm text-neutral-500">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              月供計算（含首期比例）
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              本金 vs 利息結構圖
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              HKMA 壓力測試（+2%）
            </li>
          </ul>
          <Link
            href="/tools/mortgage-calculator"
            className="mt-auto pt-5 text-sm font-medium text-amber-700 hover:underline"
          >
            開始計算 →
          </Link>
        </div>
        <div className="flex flex-col rounded-xl border bg-white p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
            <Scale className="h-5 w-5 text-neutral-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">樓盤比較工具</h3>
          <p className="mt-2 text-sm text-neutral-600">
            選擇任意兩個樓盤，並排比較入場價、呎價、戶型及配套，快速找出最適合你的選擇。
          </p>
          <ul className="mt-4 space-y-1 text-sm text-neutral-500">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              入場價與呎價對比
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              戶型與配套並排顯示
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              地區及發展商資料
            </li>
          </ul>
          <Link
            href="/compare"
            className="mt-auto pt-5 text-sm font-medium text-neutral-900 hover:underline"
          >
            開始比較 →
          </Link>
        </div>
      </section>

      {/* Featured project articles */}
      <ArticleSection project={featured} />

      {/* Quick mortgage calculator */}
      <QuickMortgageCalculator />

      {/* Bottom CTA */}
      <CTASection
        title="需要更多樓盤資料支持決策？"
        description="提交資料即可獲取最新價單、付款辦法及樓盤分析摘要，協助你比較與規劃。"
        primaryLabel="索取最新資料"
        whatsappHref={waHref}
        whatsappLabel="WhatsApp 查詢"
      />
    </div>
  );
}
