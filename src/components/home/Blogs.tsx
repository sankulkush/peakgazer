"use client";

import Reveal from "@/components/common/Reveal";
import ScrollRow from "./ScrollRow";

const DUMMY_BLOGS = [
  {
    id: "blog-1",
    title: "How to Prepare for Your First Himalayan Trek",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Preparation",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Blog+1",
  },
  {
    id: "blog-2",
    title: "Gear Checklist: What to Pack Above 4000m",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    category: "Gear",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Blog+2",
  },
  {
    id: "blog-3",
    title: "Best Seasons for Trekking in the Annapurna Region",
    excerpt:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    category: "Seasons",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Blog+3",
  },
  {
    id: "blog-4",
    title: "Altitude Sickness: What You Need to Know",
    excerpt:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    category: "Health",
    image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Blog+4",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="border-b border-[#e6dfd6]/8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            From the trail
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            Practical notes on fitness, gear, seasons and what to expect —
            written from the routes themselves.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ScrollRow>
            {DUMMY_BLOGS.map((blog) => (
              <article
                key={blog.id}
                className="flex w-[78vw] shrink-0 flex-col rounded-[6px] border border-[#e6dfd6]/12 bg-[#0e1118] p-5 transition-all duration-300 hover:border-[#f0c08c]/30 sm:w-[22rem] lg:w-[20rem]"
              >
                <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-[4px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-[0.75rem] font-medium text-[#e9c9a8] uppercase">
                  {blog.category}
                </span>

                <h3 className="mt-2 font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
                  {blog.title}
                </h3>

                <p className="mt-2 text-[0.95rem] leading-relaxed text-[#e6dfd6]/60">
                  {blog.excerpt}
                </p>

                <span className="mt-3 inline-flex items-center gap-1 text-[0.875rem] text-[#e6dfd6]/70">
                  Read more →
                </span>
              </article>
            ))}
          </ScrollRow>
        </Reveal>
      </div>
    </section>
  );
}
