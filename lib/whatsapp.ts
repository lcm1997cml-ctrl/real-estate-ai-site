/**
 * Build a wa.me URL with an optional pre-filled message.
 * number – digits only (e.g. "85291234567")
 */
export function buildWhatsAppUrl(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Return a WhatsApp URL using the site-wide default number from env.
 * Safe to call in both Server and Client Components (NEXT_PUBLIC_ prefix).
 */
export function getDefaultWhatsAppUrl(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567";
  return buildWhatsAppUrl(number, message);
}
