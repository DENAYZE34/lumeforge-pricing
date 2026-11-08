"use client";

import { useMemo, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  plans,
  quizGoals,
  quizGoalCreditWeight,
  quizFeatureChips,
  type BillingCycle,
} from "@/config/pricing";

function recommendPlan(totalCredits: number) {
  if (totalCredits <= 10) return plans[0];
  if (totalCredits <= 40) return plans[1];
  return plans[2];
}

export function PricingCalculator() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["automation"]);
  const [volume, setVolume] = useState(25);
  const [selectedChips, setSelectedChips] = useState<string[]>(["custom-mcp"]);
  const [chipMenuOpen, setChipMenuOpen] = useState(false);
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  function toggleGoal(id: string) {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  function toggleChip(id: string) {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  const goalCredits = selectedGoals.reduce(
    (sum, id) => sum + (quizGoalCreditWeight[id] ?? 0),
    0
  );
  const chipCredits = selectedChips.reduce((sum, id) => {
    const chip = quizFeatureChips.find((c) => c.id === id);
    return sum + (chip?.creditWeight ?? 0);
  }, 0);
  const totalCredits = goalCredits + volume + chipCredits;

  const recommended = useMemo(() => recommendPlan(totalCredits), [totalCredits]);
  const price = cycle === "annual" ? recommended.priceAnnual : recommended.priceMonthly;
  const listPrice = cycle === "annual" ? recommended.listPriceAnnual : undefined;
  const usageRatio = Math.min(1, totalCredits / recommended.creditsPerMonth);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-black text-white">Find the best plan for you</h2>
      <p className="mt-2 text-white/50">Выберите, что хотите делать, и получите рекомендацию</p>

      <div className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:grid-cols-[1fr_340px] lg:p-8">
        <div className="space-y-8">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                1
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Что хотите сделать?</h3>
                <p className="text-xs text-white/40">Можно выбрать несколько</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {quizGoals.map((goal) => {
                const active = selectedGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition",
                      active
                        ? "border-[#ff6a1f] bg-[#ff6a1f]/10 text-white"
                        : "border-white/10 bg-black/40 text-white/60 hover:border-white/30"
                    )}
                  >
                    {goal.label}
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                        active ? "border-[#ff6a1f] bg-[#ff6a1f]" : "border-white/20"
                      )}
                    >
                      {active && <Check className="h-3 w-3 text-black" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                2
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Сколько кредитов в месяц нужно?</h3>
                <p className="text-xs text-white/40">
                  Примерно: 1 кредит ≈ 1 час разработки или консультации
                </p>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={120}
              step={5}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#ff6a1f]"
            />
            <p className="mt-2 text-sm text-white/60">~{volume} кредитов из слайдера</p>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                  3
                </span>
                <h3 className="text-base font-bold text-white">Нужны доп. возможности?</h3>
              </div>
              <div className="relative">
                <button
                  onClick={() => setChipMenuOpen((v) => !v)}
                  className="flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Добавить
                  {selectedChips.length > 0 && (
                    <span className="ml-1 rounded-full bg-[#ff6a1f] px-1.5 text-black">
                      {selectedChips.length}
                    </span>
                  )}
                </button>
                {chipMenuOpen && (
                  <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-xl border border-white/10 bg-[#0c0c0f] p-2 shadow-xl">
                    {quizFeatureChips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => toggleChip(chip.id)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-white/70 hover:bg-white/5"
                      >
                        {chip.label}
                        {selectedChips.includes(chip.id) && (
                          <Check className="h-3.5 w-3.5 text-[#ff6a1f]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedChips.length === 0 && (
                <span className="text-xs text-white/30">Ничего не выбрано</span>
              )}
              {selectedChips.map((id) => {
                const chip = quizFeatureChips.find((c) => c.id === id);
                if (!chip) return null;
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {chip.label}
                    <button onClick={() => toggleChip(id)} aria-label={`Убрать ${chip.label}`}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#ff6a1f]/40 bg-gradient-to-b from-[#2a1308] to-[#140a06] p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs text-white/50">Рекомендуем</span>
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-0.5 text-[11px]">
              <button
                onClick={() => setCycle("monthly")}
                className={cn(
                  "rounded-full px-2 py-1 font-semibold",
                  cycle === "monthly" ? "bg-white text-black" : "text-white/50"
                )}
              >
                Мес
              </button>
              <button
                onClick={() => setCycle("annual")}
                className={cn(
                  "rounded-full px-2 py-1 font-semibold",
                  cycle === "annual" ? "bg-white text-black" : "text-white/50"
                )}
              >
                Год
              </button>
            </div>
          </div>

          <h4 className="text-xl font-black text-white">{recommended.name}</h4>
          <div className="mt-1 flex items-baseline gap-2">
            {listPrice && <span className="text-sm text-white/40 line-through">${listPrice}</span>}
            <span className="text-3xl font-black text-white">${price}</span>
            <span className="text-xs text-white/40">/мес</span>
          </div>

          <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#ff6a1f] to-[#ff3d1a] py-3 text-sm font-bold text-black">
            {recommended.ctaLabel}
          </button>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="mb-1 text-xs text-white/50">
              Ожидаемая нагрузка: {Math.min(totalCredits, recommended.creditsPerMonth)} из{" "}
              {recommended.creditsPerMonth === 999 ? "∞" : recommended.creditsPerMonth} кредитов
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff6a1f] to-[#ff3d1a]"
                style={{ width: `${usageRatio * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
            {recommended.included.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.included ? (
                  <Check className="h-4 w-4 shrink-0 text-[#ff6a1f]" />
                ) : (
                  <X className="h-4 w-4 shrink-0 text-white/20" />
                )}
                <span className={cn(!item.included && "text-white/30")}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
