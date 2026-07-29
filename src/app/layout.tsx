import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

// Body. Weight axis only — Inter's optical-size axis is not worth the extra
// payload at body sizes, and the performance budget is a trust requirement.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display. A grotesque with character rather than a luxury serif: the buyer is
// organising a college trek, not booking a resort. `opsz` is requested so large
// headings automatically pick up the display cut.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uthbus Tours — Treks in Annapurna and Langtang",
  description:
    "Four treks in Nepal, five to ten days, from Pokhara and Kathmandu. Real walking hours, real altitudes, and the cost broken down line by line.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      {/* Browser extensions commonly stamp attributes onto <body> before React
          hydrates. This suppresses that single element's attribute diff only —
          mismatches anywhere inside the tree are still reported. */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
