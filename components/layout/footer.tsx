import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-base font-semibold text-white">香港樓盤數據分析</p>
          <p className="mt-2 text-sm leading-6 text-neutral-400">
            整合香港一手樓盤數據，提供客觀比較工具與按揭分析，協助你在置業前掌握清晰的數字依據。
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium text-white">快速連結</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/projects" className="hover:text-white">
              所有樓盤
            </Link>
            <Link href="/compare" className="hover:text-white">
              樓盤比較
            </Link>
            <Link href="/tools/mortgage-calculator" className="hover:text-white">
              按揭計算機
            </Link>
            <Link href="/get-latest-price" className="hover:text-white">
              索取最新資料
            </Link>
            <Link href="/contact" className="hover:text-white">
              聯絡我們
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
