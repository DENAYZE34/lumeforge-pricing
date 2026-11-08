import { Check, X } from "lucide-react";
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
  return (
    <section id="matrix" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-10 text-3xl font-black text-white">Сравнение тарифов</h2>

      <div className="space-y-10">
        {matrixCategories.map((category) => (
          <div key={category.id} id={category.id} className="scroll-mt-24">
            <h3 className="mb-4 text-xl font-bold text-white">{category.title}</h3>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-4 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white/40">
                <span>Параметр</span>
                {plans.map((plan) => (
                  <span key={plan.id} className="text-center">
                    {plan.name}
                  </span>
                ))}
              </div>
              {category.rows.map((row, index) => (
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
          </div>
        ))}
      </div>
    </section>
  );
}
