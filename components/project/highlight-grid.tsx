export function HighlightGrid({ highlights }: { highlights: string[] }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold">精華賣點</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {highlights.map((item, i) => {
          const sepIdx = item.indexOf(" — ");
          const hasTitle = sepIdx !== -1;
          const title = hasTitle ? item.slice(0, sepIdx) : null;
          const desc = hasTitle ? item.slice(sepIdx + 3) : item;

          return (
            <div
              key={item}
              className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                {i + 1}
              </div>
              <div className="flex-1">
                {title && (
                  <p className="font-semibold text-neutral-900">{title}</p>
                )}
                <p
                  className={`text-sm leading-relaxed text-neutral-600 ${title ? "mt-1" : ""}`}
                >
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
