"use client";

import { INSTAGRAM_HANDLE, WHATSAPP_DISPLAY } from "@/content/company";

const instagramPending = INSTAGRAM_HANDLE.startsWith("TODO");

/**
 * Social links — Instagram and WhatsApp.
 *
 * Instagram is hidden until a real handle is configured. TikTok is not added
 * yet because there is no URL to point at; the component is structured so a
 * third link can be dropped in later without changing the parent.
 */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {!instagramPending && INSTAGRAM_HANDLE && (
        <a
          href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-[#14110b]/60 transition-colors hover:text-[#14110b]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
      )}
      <a
        href={`https://wa.me/${WHATSAPP_DISPLAY.replace(/\s/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="text-[#14110b]/60 transition-colors hover:text-[#14110b]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.12c-.24.68-1.42 1.32-1.95 1.36-.5.04-.99.22-3.35-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.86s.71-2.03.96-2.31c.25-.28.55-.35.73-.35h.52c.17 0 .4-.06.62.47.24.57.8 1.98.87 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.47l-.42.49c-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.11.07.66-.17 1.35Z" />
        </svg>
      </a>
    </div>
  );
}
