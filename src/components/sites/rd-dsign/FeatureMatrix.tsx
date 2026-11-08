"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { matrixCategories, plans } from "@/config/pricing";

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-[#ff3d1a]" />
    ) : (
      <X className="h-4 w-4 text-white/20" />
    );
  }
  return <span className="text-white/80">{value}</span>;
}

export function FeatureMatrix() {
  const [activeId, setActiveId] = useState(matrixCategories[0].id);
  const active = matrixCategories.find((c) => c.id === activeId) ?? matrixCategories[0];

  // Header nav links (/pricing#web-dev etc.) land here with a hash instead of
  // clicking a tab, so sync the active tab to the hash on mount and whenever
  // it changes in place (same-document hash navigation doesn't remount us).
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (matrixCategories.some((c) => c.id === hash)) {
        setActiveId(hash);
      }
    };
    const id = setTimeout(syncFromHash, 0);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      clearTimeout(id);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  return (
    <section id="matrix" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-2 text-3xl font-black text-white">Сравнение тарифов</h2>
      <p className="mb-8 text-white/50">Полная детализация по каждому направлению</p>

      <div className="sticky top-16 z-30 -mx-6 bg-black/95 px-6 pb-4 pt-4 backdrop-blur-md">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {matrixCategories.map((category) => (
            <button
              key={category.id}
              id={category.id}
              onClick={() => setActiveId(category.id)}
              className={cn(
                "scroll-mt-28 rounded-full px-4 py-2 text-sm font-semibold transition",
                activeId === category.id
                  ? "bg-gradient-to-r from-[#ff6a1f] to-[#ff3d1a] text-black"
                  : "border border-white/10 text-white/60 hover:border-white/30 hover:text-white"
              )}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 px-5 pt-4 text-xs font-semibold uppercase tracking-wide text-white/40">
          <span>Параметр</span>
          {plans.map((plan) => (
            <span key={plan.id} className="text-center">
              {plan.name}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-b-2xl border border-t-0 border-white/10">
        {active.rows.map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-4 items-center px-5 py-4 text-sm ${
              index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
            }`}
          >
            <span className="text-white/80">{row.label}</span>
            {row.values.map((value, i) => (
              <span key={i} className="flex justify-center">
                <Cell value={value} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
