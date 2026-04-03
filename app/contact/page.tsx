import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/lead-form";
import { CTASection } from "@/components/common/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "聯絡我們 | 香港樓盤數據分析",
  description: "提交資料取得最新樓盤數據、付款辦法分析及置業參考資訊。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      {/* Top info section */}
      <CTASection
        title="取得樓盤分析資料"
        description="提交資料即可獲取入場價、付款辦法重點及樓盤比較摘要，作為你分析的參考依據。"
        primaryHref="/get-latest-price"
        primaryLabel="索取最新資料"
        whatsappLabel="WhatsApp 查詢"
      />

      {/* Intro */}
      <section className="rounded-2xl border bg-white p-8">
        <h1 className="text-3xl font-semibold">提交查詢</h1>
        <p className="mt-3 text-neutral-700">
          填寫以下資料，我們會盡快提供相關樓盤分析及資訊。
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600">
          <li>最新價單數據與付款辦法重點</li>
          <li>入場成本與供款比率分析</li>
          <li>樓盤比較參考資料</li>
        </ul>
      </section>

      {/* Form */}
      <LeadForm />

      {/* Disclaimer */}
      <section className="rounded-xl border bg-stone-100 p-5 text-sm text-neutral-700">
        <p>Disclaimer：以上資料僅供參考，實際安排以發展商及相關機構最新公布為準。置業前請諮詢持牌專業人士意見。</p>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="想直接討論？透過 WhatsApp 聯絡我們"
        description="我們可協助提供最新數據資料，支持你作出更清晰的決策。"
        primaryHref="/get-latest-price"
        primaryLabel="索取最新資料"
        whatsappLabel="WhatsApp 聯絡"
      />
    </div>
  );
}
