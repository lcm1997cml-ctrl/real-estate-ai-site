import Link from "next/link";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  whatsappHref?: string;
  whatsappLabel?: string;
};

export function CTASection({
  title,
  description,
  primaryHref = "/get-latest-price",
  primaryLabel = "索取最新資料",
  whatsappHref,
  whatsappLabel = "WhatsApp 查詢",
}: Props) {
  const waHref = whatsappHref ?? getDefaultWhatsAppUrl("你好，我想查詢最新樓盤資訊");
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center">
      <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-3xl text-neutral-700">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={primaryHref}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800"
        >
          {primaryLabel}
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
        >
          {whatsappLabel}
        </a>
      </div>
    </section>
  );
}
