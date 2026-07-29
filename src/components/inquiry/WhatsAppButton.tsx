import { whatsAppHref, type WhatsAppContext } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  context?: WhatsAppContext;
  children: React.ReactNode;
  className?: string;
  /** Extra classes applied only while no real number is configured. */
  pendingClassName?: string;
};

/**
 * The primary conversion action. Until a real number is configured this renders
 * as a disabled control with an honest label rather than a link to nowhere —
 * see the note in lib/whatsapp.ts.
 */
export default function WhatsAppButton({
  context,
  children,
  className = "",
  pendingClassName = "",
}: WhatsAppButtonProps) {
  const href = whatsAppHref(context);

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="WhatsApp number not configured yet"
        className={`${className} ${pendingClassName} cursor-not-allowed opacity-60`}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
