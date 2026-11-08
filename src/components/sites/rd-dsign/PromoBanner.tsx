"use client";

import { useEffect, useState } from "react";

function getNextMidnightDiff() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return Math.max(0, next.getTime() - now.getTime());
}

function format(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function PromoBanner() {
  const [remaining, setRemaining] = useState(() => getNextMidnightDiff());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => (prev <= 1000 ? getNextMidnightDiff() : prev - 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const { hours, minutes, seconds } = format(remaining);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_#3d1406,_#07070a_70%)] px-6 py-10 text-center sm:px-10">
      <p className="text-2xl font-black leading-tight text-white sm:text-3xl">
        NEXT.JS, КАСТОМНЫЕ MCP-СЕРВЕРЫ И AI-АВТОМАТИЗАЦИЯ
        <br />
        ПОДКЛЮЧИТЕ CREATOR PRO СО СКИДКОЙ 40%
      </p>
      <p className="mt-3 text-sm text-white/50">
        Акция ограничена по времени. Годовая оплата тарифов Creator Pro и Enterprise со скидкой 40%.
      </p>

      <div className="mx-auto mt-6 max-w-md rounded-2xl bg-gradient-to-r from-[#ff6a1f]/30 to-[#ff3d1a]/20 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/60">
          Скидка действует ещё...
        </p>
        <div className="flex justify-center gap-3">
          {[
            { value: hours, label: "часов" },
            { value: minutes, label: "минут" },
            { value: seconds, label: "секунд" },
          ].map((block) => (
            <div
              key={block.label}
              className="min-w-[72px] rounded-xl bg-black/40 px-3 py-2"
            >
              <div className="text-2xl font-black text-white">{block.value}</div>
              <div className="text-[11px] uppercase text-white/40">{block.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
