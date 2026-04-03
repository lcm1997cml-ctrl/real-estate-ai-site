import { FAQItem } from "@/types/project";

export function FAQSection({ faq }: { faq: FAQItem[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">常見問題</h2>
      <div className="mt-4 space-y-3">
        {faq.map((item) => (
          <details key={item.question} className="rounded-xl border bg-white p-4">
            <summary className="cursor-pointer font-medium">{item.question}</summary>
            <p className="mt-2 text-neutral-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
