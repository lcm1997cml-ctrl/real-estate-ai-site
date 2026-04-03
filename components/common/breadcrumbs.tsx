import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            {idx > 0 && <ChevronRight className="h-4 w-4 text-neutral-400" />}
            {idx === items.length - 1 ? (
              <span className="font-medium text-neutral-900">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-neutral-900">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
