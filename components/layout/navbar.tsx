"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-neutral-900"
          onClick={() => setIsOpen(false)}
        >
          香港樓盤數據分析
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-neutral-700 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-neutral-900">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/tools/mortgage-calculator"
            className="hidden h-9 items-center justify-center rounded-lg border border-neutral-300 px-3 text-sm font-medium text-neutral-700 hover:border-neutral-500 hover:text-neutral-900 md:inline-flex"
          >
            按揭計算機
          </Link>
          <Link
            href="/get-latest-price"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-600 px-4 text-sm font-medium text-white hover:bg-amber-700"
          >
            索取資料
          </Link>
          {/* Hamburger — mobile only */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="border-t border-neutral-100 bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            <li>
              <Link
                href="/tools/mortgage-calculator"
                className="block py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900"
                onClick={() => setIsOpen(false)}
              >
                按揭計算機
              </Link>
            </li>
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
