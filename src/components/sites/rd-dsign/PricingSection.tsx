"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans, type BillingCycle } from "@/config/pricing";

export function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-white sm:text-4xl">Все тарифы</h1>
        <p className="mt-2 text-white/50">Для фрилансеров, команд и агентств</p>

        <div className="mx-auto mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {(
            [
              { key: "monthly", label: "Помесячно" },
              { key: "annual", label: "Ежегодно" },
            ] as const
          ).map((option) => (
            <button
              key={option.key}
              onClick={() => setCycle(option.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                cycle === option.key
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              )}
            >
              {option.label}
              {option.key === "annual" && (
                <span className="ml-2 text-[#ff3d1a]">экономия до 35%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan) => {
          const price = cycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
          const listPrice = cycle === "annual" ? plan.listPriceAnnual : undefined;

          return (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col gap-5 rounded-3xl border p-7",
                plan.featured
                  ? "border-[#ff6a1f]/60 bg-gradient-to-b from-[#2a1308] to-[#140a06]"
                  : "border-white/10 bg-white/[0.03]"
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">
                    {plan.name}
                  </h2>
                  {plan.badge && (
                    <span className="rounded-full bg-[#ff3d1a] px-2.5 py-0.5 text-[11px] font-bold text-black">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-white/50">{plan.tagline}</p>
              </div>

              <div className="flex items-baseline gap-2">
                {listPrice && (
                  <span className="text-lg text-white/40 line-through">${listPrice}</span>
                )}
                <span className="text-4xl font-black text-white">${price}</span>
                <span className="text-xs text-white/40">/мес, оплата {cycle === "annual" ? "за год" : "помесячно"}</span>
              </div>

              <button
                className={cn(
                  "rounded-xl py-3 text-sm font-bold transition",
                  plan.featured
                    ? "bg-gradient-to-r from-[#ff6a1f] to-[#ff3d1a] text-black hover:opacity-90"
                    : "bg-white text-black hover:bg-white/90"
                )}
              >
                {plan.ctaLabel}
              </button>

              <div className="border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{plan.creditsLabel}</p>
                <ul className="mt-2 space-y-1 text-xs text-white/50">
                  {plan.breakdown.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              {plan.groups.map((group) => (
                <div key={group.title} className="border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                    {group.title}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between gap-2 text-sm"
                      >
                        <span className={cn("flex items-center gap-2", !item.included && "text-white/30 line-through")}>
                          {item.included ? (
                            <Check className="h-4 w-4 shrink-0 text-[#ff3d1a]" />
                          ) : (
                            <X className="h-4 w-4 shrink-0 text-white/20" />
                          )}
                          {item.label}
                        </span>
                        {item.tag && (
                          <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/40">
                            {item.tag}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Включено в тариф
                </p>
                <ul className="mt-2 space-y-2">
                  {plan.included.map((item) => (
                    <li key={item.label} className="flex items-center gap-2 text-sm">
                      {item.included ? (
                        <Check className="h-4 w-4 shrink-0 text-[#ff3d1a]" />
                      ) : (
                        <X className="h-4 w-4 shrink-0 text-white/20" />
                      )}
                      <span className={cn(!item.included && "text-white/30")}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
