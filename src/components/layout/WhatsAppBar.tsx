import WhatsAppButton from "@/components/inquiry/WhatsAppButton";

/**
 * Persistent conversion action, present on every page and every viewport.
 *
 * Deliberately outside the hero's entrance timeline and carrying no reveal of
 * its own: it exists at first paint. Our market messages before it emails, and
 * the one action that matters must never be waiting on an animation.
 *
 * Server Component — no interaction beyond following a link.
 */
export default function WhatsAppBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-6">
      <WhatsAppButton
        className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-[#f0c08c] px-5 py-3 text-[0.9rem] font-medium text-[#14110b] shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-[#f8d3a6]"
        pendingClassName="pointer-events-auto"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-[1.15em] w-[1.15em]"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.12c-.24.68-1.42 1.32-1.95 1.36-.5.04-.99.22-3.35-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.86s.71-2.03.96-2.31c.25-.28.55-.35.73-.35h.52c.17 0 .4-.06.62.47.24.57.8 1.98.87 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.47l-.42.49c-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.11.07.66-.17 1.35Z" />
        </svg>
        WhatsApp
      </WhatsAppButton>
    </div>
  );
}
