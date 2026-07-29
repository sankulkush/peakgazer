import { z } from "zod";

/**
 * Shared by the form and the Server Action, so client and server can never
 * disagree about what a valid inquiry is.
 *
 * Six fields. They exist so the founder can write a good first reply — not to
 * qualify or score the lead. Anything that does not change the reply is not
 * asked for.
 */
export const inquirySchema = z.object({
  /** Journey slug, or "unsure". */
  journey: z.string().min(1, "Pick a trek, or choose “Not sure yet”."),
  dates: z
    .string()
    .trim()
    .min(2, "Even a rough month helps.")
    .max(200),
  groupSize: z.coerce
    .number()
    .int("Whole numbers only.")
    .min(1, "At least one traveller.")
    .max(40, "For more than 40, message us on WhatsApp instead."),
  experience: z.enum(["none", "some", "experienced"]),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  contact: z
    .string()
    .trim()
    .min(5, "A phone number or an email address, whichever you prefer.")
    .max(200),

  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   *
   * Deliberately permissive rather than `z.literal("")`: if the schema rejected
   * a filled honeypot, the bot would get a validation error and know to retry.
   * It parses, then the Server Action reports success and discards it, so the
   * bot learns nothing.
   */
  website: z.string().optional(),
});

/**
 * Two types, because `coerce` makes them genuinely different: the form holds
 * `groupSize` as whatever the input element produces, the parsed result holds a
 * number. react-hook-form needs both to type `handleSubmit` correctly.
 */
export type InquiryFormValues = z.input<typeof inquirySchema>;
export type InquiryInput = z.output<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export const EXPERIENCE_LABELS: Record<InquiryInput["experience"], string> = {
  none: "No previous trekking",
  some: "Some — day hikes or one trek",
  experienced: "Experienced — multiple multi-day treks",
};
