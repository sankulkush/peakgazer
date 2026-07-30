"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitInquiry } from "@/lib/inquiry";
import {
  EXPERIENCE_LABELS,
  inquirySchema,
  type InquiryFormValues,
  type InquiryInput,
  type InquiryResult,
} from "@/lib/inquiry-schema";

type JourneyOption = { slug: string; name: string };

/**
 * Six fields, no account, no captcha.
 *
 * Validation runs on the client through react-hook-form for fast feedback, and
 * again on the server through the same zod schema — the client pass is a
 * courtesy, the server pass is the one that counts.
 */
export default function InquiryForm({
  journeys,
  defaultJourney = "unsure",
}: {
  journeys: JourneyOption[];
  /** Slug to pre-select — a journey page knows which trek is being read. */
  defaultJourney?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<InquiryResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues, unknown, InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      journey: defaultJourney,
      experience: "none",
      website: "",
    },
  });

  const onSubmit = (data: InquiryInput) => {
    startTransition(async () => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value == null ? "" : String(value));
      }
      const res = await submitInquiry(null, formData);
      setResult(res);
      if (res.ok) reset();
    });
  };

  const field = "w-full rounded-md border border-[#e6dfd6]/20 bg-[#11131a] px-3.5 py-2.5 text-[1.0625rem] text-[#f0ece5] outline-none transition-colors focus:border-[#f0c08c]";
  const label = "mb-1.5 block text-[0.9rem] text-[#e6dfd6]/80";
  const error = "mt-1.5 block text-[0.85rem] text-[#f0a58c]";

  if (result?.ok) {
    return (
      <p
        role="status"
        className="rounded-md border border-[#f0c08c]/40 bg-[#f0c08c]/10 px-4 py-3.5 text-[1.0625rem] text-[#f0ece5]"
      >
        {result.message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="journey" className={label}>
          Which trek?
        </label>
        <select id="journey" className={field} {...register("journey")}>
          <option value="unsure">Not sure yet</option>
          {journeys.map((j) => (
            <option key={j.slug} value={j.slug}>
              {j.name}
            </option>
          ))}
        </select>
        {errors.journey && <span className={error}>{errors.journey.message}</span>}
      </div>

      <div>
        <label htmlFor="dates" className={label}>
          Roughly when?
        </label>
        <input
          id="dates"
          className={field}
          placeholder="Second half of October, or just “autumn”"
          {...register("dates")}
        />
        {errors.dates && <span className={error}>{errors.dates.message}</span>}
      </div>

      <div>
        <label htmlFor="groupSize" className={label}>
          How many of you?
        </label>
        <input
          id="groupSize"
          type="number"
          inputMode="numeric"
          min={1}
          className={field}
          {...register("groupSize")}
        />
        {errors.groupSize && (
          <span className={error}>{errors.groupSize.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="experience" className={label}>
          Trekking before?
        </label>
        <select id="experience" className={field} {...register("experience")}>
          {Object.entries(EXPERIENCE_LABELS).map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={label}>
          Anything we should know?
        </label>
        <textarea
          id="notes"
          rows={4}
          className={field}
          placeholder="Fitness worries, a knee, someone's first time at altitude, a fixed return flight — anything that changes the answer."
          {...register("notes")}
        />
      </div>

      <div>
        <label htmlFor="contact" className={label}>
          Phone or email — whichever you prefer
        </label>
        <input id="contact" className={field} {...register("contact")} />
        {errors.contact && <span className={error}>{errors.contact.message}</span>}
      </div>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {result && !result.ok && (
        <p role="alert" className="text-[0.95rem] text-[#f0a58c]">
          {result.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
