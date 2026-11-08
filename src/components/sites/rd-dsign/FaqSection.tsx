"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqItems } from "@/config/pricing";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-10 text-center text-3xl font-black text-white">
        Частые вопросы
      </h2>

      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const open = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <button
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white"
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-white/40 transition-transform",
                    open && "rotate-180"
                  )}
                />
              </button>
              {open && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-white/60">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <span className="text-white/60">Готовы начать?</span>
        <a
          href="#top"
          className="rounded-full bg-gradient-to-r from-[#ff6a1f] to-[#ff3d1a] px-5 py-2.5 text-sm font-bold text-black"
        >
          Выбрать тариф
        </a>
      </div>
    </section>
  );
}
