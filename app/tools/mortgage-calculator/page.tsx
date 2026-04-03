import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { MortgageCalculator } from "@/components/tools/mortgage-calculator";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project/project-card";
import { Info } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "香港按揭計算機 | 即時供款試算 + 壓力測試",
  description:
    "即時計算香港按揭月供、總利息及 HKMA 壓力測試結果。輸入樓價、首期及利率，立即估算每月供款，協助你評估入場能力。",
  path: "/tools/mortgage-calculator",
  keywords: ["按揭計算機", "供樓計算", "香港按揭", "壓力測試", "月供計算", "首期計算"],
});

export default function MortgageCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "首頁" },
          { href: "/tools/mortgage-calculator", label: "按揭計算機" },
        ]}
      />

      {/* Page header */}
      <section>
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">按揭計算機</h1>
        <p className="mt-2 text-base text-neutral-600 md:text-lg">
          即時計算每月供款、總利息及 HKMA 壓力測試結果，協助你先評估可負擔範圍，再比較樓盤。
        </p>

        {/* How to use guide */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { step: "1", title: "輸入樓價", desc: "拉動滑桿設定目標樓價範圍" },
            { step: "2", title: "選擇首期及利率", desc: "按自身資金調整首期比例與年利率" },
            { step: "3", title: "查看供款結果", desc: "即時顯示月供、總利息及壓力測試數字" },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start gap-3 rounded-xl border bg-white p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                {step}
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-800">{title}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <MortgageCalculator />

      {/* How to read results */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-neutral-900">如何解讀計算結果？</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            {
              term: "每月供款",
              explain:
                "根據你輸入的樓價、首期及利率計算出每個月需還的金額，包含本金及利息。",
            },
            {
              term: "壓力測試（+2%）",
              explain:
                "HKMA 要求借款人在利率上升 2% 後，月供仍不超過月入 50%。此數字是銀行審批的關鍵門檻。",
            },
            {
              term: "本金 vs 利息比例",
              explain:
                "還款期愈長，利息佔比愈高。縮短年期雖月供增加，但整體利息支出大幅減少。",
            },
            {
              term: "所需月入參考",
              explain:
                "壓力測試月供 × 2 = 建議最低月入。這是銀行評估你供款能力的基本標準。",
            },
          ].map(({ term, explain }) => (
            <div key={term} className="rounded-lg bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-800">{term}</p>
              <p className="mt-1 text-sm text-neutral-600">{explain}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-400">
          以上計算為估算參考，實際批核視乎銀行政策、個人信貸及收入而定。建議以計算結果作初步規劃，再諮詢專業按揭顧問。
        </p>
      </section>

      {/* Related projects */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 md:text-2xl">查看相關樓盤</h2>
            <p className="mt-1 text-sm text-neutral-500">
              每張卡片均附入場月供估算，方便你對照剛才計算的結果
            </p>
          </div>
          <Link href="/projects" className="shrink-0 text-sm text-neutral-600 hover:text-neutral-900">
            查看全部 →
          </Link>
        </div>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Compare CTA */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 text-center">
        <h3 className="text-xl font-semibold text-neutral-900">完成估算後，下一步？</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-600">
          計算結果可以幫你鎖定預算範圍，接下來可以用比較工具篩選符合你供款能力的樓盤。
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/compare"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            比較樓盤
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-9 items-center justify-center rounded-lg border px-5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            瀏覽所有樓盤
          </Link>
        </div>
      </div>
    </div>
  );
}
