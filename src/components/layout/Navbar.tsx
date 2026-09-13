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

import { SiWhatsapp, SiInstagram, SiTiktok } from "react-icons/si";

const WhatsAppIcon = ({ progress = 0, colorClass = "text-[#14110b]" }: { progress?: number; colorClass?: string }) => (
  <div className="relative h-6 w-6">
    <img src="/icons/whatsapp.svg" alt="WhatsApp" className="absolute inset-0 h-full w-full object-contain" style={{ opacity: 1 - progress }} />
    <div className={`absolute inset-0 flex items-center justify-center ${colorClass}`} style={{ opacity: progress }}>
      <SiWhatsapp className="text-current" size={20} />
    </div>
  </div>
);

const InstagramIcon = ({ progress = 0, colorClass = "text-[#14110b]" }: { progress?: number; colorClass?: string }) => (
  <div className="relative h-6 w-6">
    <img src="/icons/instagram.svg" alt="Instagram" className="absolute inset-0 h-full w-full object-contain" style={{ opacity: 1 - progress }} />
    <div className={`absolute inset-0 flex items-center justify-center ${colorClass}`} style={{ opacity: progress }}>
      <SiInstagram className="text-current" size={20} />
    </div>
  </div>
);

const TikTokIcon = ({ progress = 0, colorClass = "text-[#14110b]" }: { progress?: number; colorClass?: string }) => (
  <div className="relative h-6 w-6">
    <img src="/icons/tiktok.svg" alt="TikTok" className="absolute inset-0 h-full w-full object-contain" style={{ opacity: 1 - progress }} />
    <div className={`absolute inset-0 flex items-center justify-center ${colorClass}`} style={{ opacity: progress }}>
      <SiTiktok className="text-current" size={20} />
    </div>
  </div>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
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

  useEffect(() => {
    const sectionIds = ["upcoming-treks", "the-treks", "climbs", "blogs"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 1) {
          setActiveSection(intersecting[0].target.id);
        } else if (intersecting.length > 1) {
          const sorted = [...intersecting].sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveSection(sorted[0].target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
              <WhatsAppIcon progress={progress} colorClass={textColorClass} />
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
            <InstagramIcon progress={progress} colorClass={textColorClass} />
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
            <TikTokIcon progress={progress} colorClass={textColorClass} />
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
        className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-full px-6 py-4 sm:top-6 sm:left-6 hidden sm:flex"
        style={{
          ...pillStyle,
          boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Link
          href="/"
          className={progress < 0.5
            ? "font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#14110b] hover:text-[#5a4e3a]"
            : "font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f7f2ea] hover:text-[#f0c08c]"
          }
        >
          {COMPANY_NAME}
        </Link>
      </div>

      {/* Center: nav links / hamburger pill (desktop only) */}
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full px-6 py-4 sm:top-6 hidden sm:flex"
        style={pillStyle}
      >
        <nav aria-label="Primary" className="hidden sm:flex items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={progress < 0.5
                ? "px-5 py-2.5 text-[0.85rem] font-semibold uppercase tracking-[0.08em] transition-colors " +
                  (activeSection === item.href.substring(1)
                    ? "text-[#5a4e3a]"
                    : "text-[#14110b]/70 hover:text-[#5a4e3a]")
                : "px-5 py-2.5 text-[0.85rem] font-semibold uppercase tracking-[0.08em] transition-colors " +
                  (activeSection === item.href.substring(1)
                    ? "text-[#f0c08c]"
                    : "text-[#f7f2ea]/70 hover:text-[#f0c08c]")
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
        className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full px-6 py-4 sm:top-6 sm:right-6 hidden sm:flex"
        style={pillStyle}
      >
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={progress < 0.5
                ? "flex h-10 w-10 items-center justify-center rounded-full transition-colors text-[#14110b]/60 hover:text-[#14110b] hover:bg-[#e6dfd6]/20"
                : "flex h-10 w-10 items-center justify-center rounded-full transition-colors text-[#f7f2ea]/60 hover:text-[#f7f2ea] hover:bg-white/5"
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
            className={progress < 0.5
              ? "flex h-10 w-10 items-center justify-center rounded-full transition-colors text-[#14110b]/60 hover:text-[#14110b] hover:bg-[#e6dfd6]/20"
              : "flex h-10 w-10 items-center justify-center rounded-full transition-colors text-[#f7f2ea]/60 hover:text-[#f7f2ea] hover:bg-white/5"
            }
          >
            <InstagramIcon />
          </a>
          <a
            href="https://tiktok.com/@peakgazer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className={progress < 0.5
              ? "flex h-10 w-10 items-center justify-center rounded-full transition-colors text-[#14110b]/60 hover:text-[#14110b] hover:bg-[#e6dfd6]/20"
              : "flex h-10 w-10 items-center justify-center rounded-full transition-colors text-[#f7f2ea]/60 hover:text-[#f7f2ea] hover:bg-white/5"
            }
          >
            <TikTokIcon />
          </a>
      </div>
    </>
  );
}
