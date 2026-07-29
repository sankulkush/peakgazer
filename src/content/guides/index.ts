import type { Guide } from "@/lib/schema";

/**
 * Named guides with licence numbers and route counts are a first-class trust
 * surface, not a nice touch — customers recommend people, not companies.
 *
 * Everything here is a placeholder. Nothing is invented: fields we do not yet
 * know are left empty or marked TODO rather than filled with plausible values.
 */
export const GUIDES: Guide[] = [
  {
    slug: "guide-one",
    name: "TODO — guide name",
    licenceNumber: "TODO — NTB licence number",
    licenceStatus: "indicative",
    yearsGuiding: 0,
    routeCounts: {},
    languages: [],
    certifications: [],
    homeVillage: "TODO",
    photo: {
      src: "",
      alt: "TODO — guide portrait",
      place: "TODO",
      month: "January",
      year: 2026,
      width: 0,
      height: 0,
    },
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
