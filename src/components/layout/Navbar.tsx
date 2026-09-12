"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { COMPANY_NAME } from "@/content/company";

const NAV_ITEMS = [
  { label: "Groups", href: "#upcoming-treks" },
  { label: "Treks", href: "#the-treks" },
  { label: "Climbs", href: "#climbs" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.substring(1);
    const isHomepage = window.location.pathname === "/";

    if (!isHomepage) {
      e.preventDefault();
      router.push(`${href}`);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navbarBg = "bg-[#f7f2ea]/90";

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div
        className={`mx-auto flex items-center justify-between rounded-full px-5 py-3 shadow-lg ${navbarBg} backdrop-blur`}
      >
        <Link
          href="/"
          className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-[#14110b] hover:text-[#5a4e3a]"
        >
          {COMPANY_NAME}
        </Link>

        <nav aria-label="Primary" className="hidden sm:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-2 text-[0.9rem] font-medium text-[#14110b]/70 transition-colors hover:text-[#14110b]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#14110b] hover:bg-[#e6dfd6]/20 sm:hidden"
        >
          <Menu
            className={`h-5 w-5 transition-all duration-300 ${menuOpen ? "hidden" : "block"}`}
          />
          <X
            className={`h-5 w-5 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          aria-label="Mobile menu"
          className="mt-2 mx-auto flex flex-col gap-1 rounded-[6px] border border-[#e6dfd6]/12 bg-[#f7f2ea]/95 p-2 shadow-xl sm:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block min-h-[44px] rounded-[4px] px-4 py-3 text-[0.95rem] font-medium text-[#14110b] hover:bg-[#e6dfd6]/20"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
