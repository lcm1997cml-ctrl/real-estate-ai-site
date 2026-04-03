import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/lead-form";
import { CTASection } from "@/components/common/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "索取最新樓盤資料 | 香港樓盤數據分析",
  description: "提交資料即獲最新價單數據、付款辦法比較及樓盤分析摘要。",
  path: "/get-latest-price",
});

export default function GetLatestPricePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      {/* Top info block */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
        <h1 className="text-3xl font-semibold">索取最新樓盤資料</h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-700">
          提交資料後，我們會提供最新價單數據、付款辦法重點及入場門檻分析，作為你決策的參考。
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-600">
          <span>✓ 最新價單數據</span>
          <span>✓ 付款辦法比較</span>
          <span>✓ 中立分析，無銷售壓力</span>
        </div>
      </section>

      {/* Lead form */}
      <LeadForm />

      {/* Bottom CTA */}
      <CTASection
        title="想先討論再提交？"
        description="可透過 WhatsApp 直接聯絡，我們提供數據資料支持你的分析。"
        primaryHref="/contact"
        primaryLabel="了解更多"
        whatsappLabel="立即 WhatsApp 聯絡"
      />
    </div>
  );
}
