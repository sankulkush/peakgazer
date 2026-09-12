"use client";

import Reveal from "@/components/common/Reveal";
import ScrollRow from "./ScrollRow";

const DUMMY_REVIEWS = [
  {
    id: "review-1",
    name: "Dummy Reviewer 1",
    trip: "Langtang Valley Trek",
    rating: 5,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Review+1",
  },
  {
    id: "review-2",
    name: "Dummy Reviewer 2",
    trip: "Annapurna Circuit",
    rating: 5,
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Review+2",
  },
  {
    id: "review-3",
    name: "Dummy Reviewer 3",
    trip: "Everest Base Camp",
    rating: 4,
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Review+3",
  },
  {
    id: "review-4",
    name: "Dummy Reviewer 4",
    trip: "Manaslu Circuit",
    rating: 5,
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Review+4",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[#f0c08c]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="border-b border-[#e6dfd6]/8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            Reviews
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            Real testimonials from people who have walked with us. These will
            appear here once the first group returns.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ScrollRow>
            {DUMMY_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="w-[78vw] shrink-0 sm:w-[22rem] lg:w-[20rem]"
              >
                <div className="flex flex-col rounded-[6px] border border-[#e6dfd6]/12 bg-[#0e1118] p-5 transition-all duration-300 hover:border-[#f0c08c]/30">
                  <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-[4px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={review.image}
                      alt={review.trip}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <StarRating rating={review.rating} />

                  <p className="mt-2 font-display text-[1.1rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
                    {review.name}
                  </p>

                  <p className="mt-1 text-[0.85rem] text-[#e6dfd6]/50">
                    {review.trip}
                  </p>

                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[#e6dfd6]/65">
                    {review.quote}
                  </p>
                </div>
              </div>
            ))}
          </ScrollRow>
        </Reveal>
      </div>
    </section>
  );
}
