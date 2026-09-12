"use client";

import { useState } from "react";
import Reveal from "@/components/common/Reveal";

const FAQS = Array.from({ length: 15 }, (_, i) => ({
  question: `Question ${i + 1}`,
  answer: `Answer text for question ${i + 1}. This is placeholder content — swap it for real copy once the Q&A pairs are finalised.`,
}));

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="border-b border-[#e6dfd6]/8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal delay={0.06} className="mt-12">
          <div className="divide-y divide-[#e6dfd6]/8">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              const answerId = `faq-answer-${i}`;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left outline-none"
                  >
                    <span className="font-display text-[1.1rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
                      {faq.question}
                    </span>
                    <span
                      className="text-[1.25rem] text-[#e9c9a8] transition-transform duration-300"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id={answerId}
                    role="region"
                    aria-hidden={!isOpen}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height: isOpen ? "auto" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="pb-1 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/60">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
