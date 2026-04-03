/**
 * Site-wide WhatsApp number (digits only, no +). All marketing CTAs use this number.
 */
export const WHATSAPP_NUMBER = "85291202466";

const DEFAULT_INQUIRY_MESSAGE = "你好，我想了解更多樓盤資料，可以提供詳情嗎？";

/**
 * Non–project pages: default pre-filled message.
 */
export function getDefaultWhatsAppUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_INQUIRY_MESSAGE)}`;
}

/**
 * Project detail / project-context pages: message includes the project display name.
 */
export function getProjectWhatsAppUrl(projectName: string): string {
  const message = `你好，我想了解 ${projectName}，可以提供最新價單嗎？`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
