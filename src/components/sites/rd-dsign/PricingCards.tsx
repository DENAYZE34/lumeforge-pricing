"use client";

import { useState } from "react";
import { Check, ChevronDown, Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  plans,
  businessPlans,
  type BillingCycle,
  type PlanMode,
  type PlanFeatureGroup,
} from "@/config/pricing";

const VISIBLE_ITEMS = 3;

function FeatureGroup({ group }: { group: PlanFeatureGroup }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = group.items.length > VISIBLE_ITEMS;
  const visibleItems = expanded ? group.items : group.items.slice(0, VISIBLE_ITEMS);
  const hiddenCount = group.items.length - VISIBLE_ITEMS;

  return (
    <div className="border-t border-white/10 pt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{group.title}</p>
      <ul className="mt-2 space-y-2">
        {visibleItems.map((item) => (
          <li key={item.label} className="flex items-center justify-between gap-2 text-sm">
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
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs font-semibold text-white/50 hover:text-white"
        >
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
          {expanded ? "Свернуть" : `+${hiddenCount} ещё`}
        </button>
      )}
    </div>
  );
}

function CycleToggle({ cycle, onChange }: { cycle: BillingCycle; onChange: (c: BillingCycle) => void }) {
  return (
    <div className="mx-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {(
        [
          { key: "monthly", label: "Помесячно" },
          { key: "annual", label: "Ежегодно" },
        ] as const
      ).map((option) => (
        <button
          key={option.key}
          onClick={() => onChange(option.key)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition",
            cycle === option.key ? "bg-white text-black" : "text-white/60 hover:text-white"
          )}
        >
          {option.label}
          {option.key === "annual" && <span className="ml-2 text-[#ff3d1a]">экономия до 35%</span>}
        </button>
      ))}
    </div>
  );
}

function IndividualCards({ cycle }: { cycle: BillingCycle }) {
  return (
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
                <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">{plan.name}</h2>
                {plan.badge && (
                  <span className="rounded-full bg-[#ff3d1a] px-2.5 py-0.5 text-[11px] font-bold text-black">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-white/50">{plan.tagline}</p>
            </div>

            <div className="flex items-baseline gap-2">
              {listPrice && <span className="text-lg text-white/40 line-through">${listPrice}</span>}
              <span className="text-4xl font-black text-white">${price}</span>
              <span className="text-xs text-white/40">
                /мес, оплата {cycle === "annual" ? "за год" : "помесячно"}
              </span>
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
              <FeatureGroup key={group.title} group={group} />
            ))}

            <FeatureGroup group={{ title: "Включено в тариф", items: plan.included }} />
          </div>
        );
      })}
    </div>
  );
}

function BusinessCards({ cycle }: { cycle: BillingCycle }) {
  const [seats, setSeats] = useState<Record<string, number>>(() =>
    Object.fromEntries(businessPlans.map((p) => [p.id, p.minSeats]))
  );

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {businessPlans.map((plan) => {
        const seatCount = seats[plan.id] ?? plan.minSeats;
        const isCustom = plan.pricePerSeatMonthly === null;
        const perSeat = cycle === "annual" ? plan.pricePerSeatAnnual : plan.pricePerSeatMonthly;
        const listPerSeat = cycle === "annual" ? plan.listPricePerSeatAnnual : undefined;
        const totalPrice = perSeat !== null && perSeat !== undefined ? perSeat * seatCount : null;
        const extraSeats = Math.max(0, seatCount - plan.minSeats);
        const credits =
          plan.creditsPerSeat !== null
            ? plan.creditsPerSeat * seatCount + (plan.bonusCreditsPerExtraSeat ?? 0) * extraSeats
            : null;

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
                <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">{plan.name}</h2>
                {plan.badge && (
                  <span className="rounded-full bg-[#ff3d1a] px-2.5 py-0.5 text-[11px] font-bold text-black">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-white/50">{plan.tagline}</p>
            </div>

            {isCustom ? (
              <div className="text-2xl font-black text-white">По запросу</div>
            ) : (
              <div className="flex items-baseline gap-2">
                {listPerSeat && <span className="text-lg text-white/40 line-through">${listPerSeat}</span>}
                <span className="text-4xl font-black text-white">${totalPrice}</span>
                <span className="text-xs text-white/40">
                  /мес за {seatCount} {seatCount === 1 ? "место" : "мест"}
                </span>
              </div>
            )}

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

            {!isCustom && (
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-white/60">Места в команде</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSeats((s) => ({ ...s, [plan.id]: Math.max(plan.minSeats, s[plan.id] - 1) }))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-white/40"
                    aria-label="Меньше мест"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-white">{seatCount}</span>
                  <button
                    onClick={() => setSeats((s) => ({ ...s, [plan.id]: s[plan.id] + 1 }))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-white/40"
                    aria-label="Больше мест"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {credits !== null && (
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{credits} проектных кредитов / месяц</p>
                <p className="mt-1 text-xs text-white/50">
                  {plan.creditsPerSeat} на место + бонус за доп. места
                </p>
              </div>
            )}

            {plan.groups.map((group) => (
              <FeatureGroup key={group.title} group={group} />
            ))}

            <FeatureGroup group={{ title: "Включено в тариф", items: plan.included }} />
          </div>
        );
      })}
    </div>
  );
}

export function PricingCards() {
  const [mode, setMode] = useState<PlanMode>("individual");
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-white sm:text-4xl">Все тарифы</h1>
        <p className="mt-2 text-white/50">Для фрилансеров, команд и агентств</p>

        <div className="mx-auto mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {(
              [
                { key: "individual", label: "Individual" },
                { key: "business", label: "Business" },
              ] as const
            ).map((option) => (
              <button
                key={option.key}
                onClick={() => setMode(option.key)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition",
                  mode === option.key ? "bg-white text-black" : "text-white/60 hover:text-white"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <CycleToggle cycle={cycle} onChange={setCycle} />
        </div>
      </div>

      {mode === "individual" ? <IndividualCards cycle={cycle} /> : <BusinessCards cycle={cycle} />}
    </section>
  );
}
