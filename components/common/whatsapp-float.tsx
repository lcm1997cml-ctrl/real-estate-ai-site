import { MessageCircle } from "lucide-react";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={getDefaultWhatsAppUrl("你好，我想查詢最新樓盤資訊")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-emerald-600 md:bottom-6"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp 查詢
    </a>
  );
}
