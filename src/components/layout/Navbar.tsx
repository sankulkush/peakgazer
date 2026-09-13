"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { COMPANY_NAME } from "@/content/company";
import { whatsAppHref } from "@/lib/whatsapp";

const NAV_ITEMS = [
  { label: "Groups", href: "#upcoming-treks" },
  { label: "Treks", href: "#the-treks" },
  { label: "Climbs", href: "#climbs" },
  { label: "Blogs", href: "#blogs" },
];

const WhatsAppIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.12c-.24.68-1.42 1.32-1.95 1.36-.5.04-.99.22-3.35-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.86s.71-2.03.96-2.31c.25-.28.55-.35.73-.35h.52c.17 0 .4.06.62.47.24.57.8 1.98.87 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.47l-.42.49c-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.11.07.66-.17 1.35Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TikTokIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M10.5 2.16a8.4 8.4 0 0 1 5.47-1.46 8.53 8.53 0 0 1 2.53.83v3.6a5.06 5.06 0 0 0-1.5-.21 5.26 5.26 0 0 0-4.2 2.17 5.2 5.2 0 0 0-.68 4.27v3.61a5.28 5.28 0 0 1-1.07-.15v-5.2a3.27 3.27 0 0 1 2.4-3.16 3.2 3.2 0 0 1 1.36.72.94.94 0 0 0 .73.28 1 1 0 1 0 .02-1.94 5.3 5.3 0 0 0-1.63-.27 3.27 3.27 0 0 1-2.2-1.23 3.22 3.22 0 0 1-.54-2.25V4.74a9.18 9.18 0 0 0 1.3-.42v5.37a1.94 1.94 0 0 1-1.1 2.42 1.94 1.94 0 0 1-2.19-1 1.94 1.94 0 0 1 .2-2.63 5.42 5.42 0 0 1 3.16-1.28z" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const scrollRaf = useRef<number>(0);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const updateProgress = () => {
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;
      setProgress(Math.min(scrollY / heroHeight, 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(scrollRaf.current);
      scrollRaf.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

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

  const whatsappHref = whatsAppHref();

  const textColorClass = progress < 0.5 ? "text-[#14110b]" : "text-[#f7f2ea]";
  const hoverColorClass =
    progress < 0.5 ? "hover:text-[#5a4e3a]" : "hover:text-[#f0c08c]";
  const iconColorClass =
    progress < 0.5
      ? "text-[#14110b]/60 hover:text-[#14110b]"
      : "text-[#f7f2ea]/60 hover:text-[#f7f2ea]";
  const hoverBgClass =
    progress < 0.5 ? "hover:bg-[#e6dfd6]/20" : "hover:bg-white/5";

  const bgOpacity = 0.9 - progress * 0.75;
  const borderOpacity = progress * 0.2;
  const blurAmount = progress * 12;

  const pillStyle = {
    backgroundColor: `rgba(247, 242, 234, ${bgOpacity})`,
    borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
    backdropFilter: `blur(${blurAmount}px)`,
  } as React.CSSProperties;

  return (
    <>
      {/* Mobile: merged single pill (logo + social icons + hamburger) */}
      <div
        className="fixed top-4 left-[5%] right-[5%] z-50 flex items-center justify-between rounded-full px-5 py-4 sm:top-6 sm:left-[5%] sm:right-[5%] sm:hidden"
        style={{
          ...pillStyle,
          boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Link
          href="/"
          className={
            "font-display text-[0.9rem] font-semibold tracking-[-0.01em]" +
            " " +
            textColorClass +
            " " +
            hoverColorClass
          }
        >
          {COMPANY_NAME}
        </Link>

        <div className="flex items-center gap-1">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={
                "flex h-7 w-7 items-center justify-center rounded-full transition-colors " +
                iconColorClass +
                " " +
                hoverBgClass
              }
            >
              <WhatsAppIcon />
            </a>
          )}
          <a
            href="https://instagram.com/peakgazer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors " +
              iconColorClass +
              " " +
              hoverBgClass
            }
          >
            <InstagramIcon />
          </a>
          <a
            href="https://tiktok.com/@peakgazer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className={
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors " +
              iconColorClass +
              " " +
              hoverBgClass
            }
          >
            <TikTokIcon />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={
              "h-7 w-7 items-center justify-center rounded-full transition-colors " +
              textColorClass +
              " " +
              hoverBgClass
            }
          >
            <Menu
              className={`h-4 w-4 transition-all duration-300 ${menuOpen ? "hidden" : "block"}`}
            />
            <X
              className={`h-4 w-4 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}
            />
          </button>
        </div>

      </div>

      {/* Desktop pills below */}
      {/* Left: logo pill (desktop only) */}
      <div
        className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-full px-5 py-3 sm:top-6 sm:left-6 hidden sm:flex"
        style={{
          ...pillStyle,
          boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Link
          href="/"
          className={
            "font-display text-[1.05rem] font-semibold tracking-[-0.01em]" +
            " " +
            textColorClass +
            " " +
            hoverColorClass
          }
        >
          {COMPANY_NAME}
        </Link>
      </div>

      {/* Center: nav links / hamburger pill (desktop only) */}
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-5 py-3 sm:top-6 hidden sm:flex"
        style={pillStyle}
      >
        <nav aria-label="Primary" className="hidden sm:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={
                "px-4 py-2 text-[0.8rem] font-medium uppercase tracking-[0.1em] transition-colors " +
                textColorClass +
                "/70 hover:" +
                textColorClass
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile menu dropdown (appears below the merged mobile pill) */}
      {menuOpen && (
        <div
          aria-label="Mobile menu"
          className="fixed top-[72px] inset-x-4 z-[60] mx-auto flex flex-col gap-1 rounded-[6px] border border-[#e6dfd6]/12 bg-[#f7f2ea]/95 p-2 shadow-xl sm:hidden"
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

      {/* Right: social/contact pill (desktop only) */}
      <div
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full px-5 py-3 sm:top-6 sm:right-6 hidden sm:flex"
        style={pillStyle}
      >
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors " +
                iconColorClass +
                " " +
                hoverBgClass
              }
            >
              <WhatsAppIcon />
            </a>
          )}
          <a
            href="https://instagram.com/peakgazer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors " +
              iconColorClass +
              " " +
              hoverBgClass
            }
          >
            <InstagramIcon />
          </a>
          <a
            href="https://tiktok.com/@peakgazer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className={
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors " +
              iconColorClass +
              " " +
              hoverBgClass
            }
          >
            <TikTokIcon />
          </a>
      </div>
    </>
  );
}
