import Link from "next/link";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

export function StickyContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-3 md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">
        <Link
          href="/get-latest-price"
          className="flex-1 rounded-md bg-neutral-900 px-4 py-3 text-center text-sm font-medium text-white"
        >
          索取最新資料
        </Link>
        <a
          href={getDefaultWhatsAppUrl("你好，我想查詢最新樓盤資訊")}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-md border px-4 py-3 text-center text-sm font-medium text-neutral-900"
        >
          WhatsApp 查詢
        </a>
      </div>
    </div>
  );
}
