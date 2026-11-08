import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/rd-dsign/SiteHeader";
import { SiteFooter } from "@/components/sites/rd-dsign/SiteFooter";
import { PromoBanner } from "@/components/sites/rd-dsign/PromoBanner";
import { PricingCards } from "@/components/sites/rd-dsign/PricingCards";
import { PricingCalculator } from "@/components/sites/rd-dsign/PricingCalculator";
import { FeatureMatrix } from "@/components/sites/rd-dsign/FeatureMatrix";
import { FaqSection } from "@/components/sites/rd-dsign/FaqSection";

export const metadata: Metadata = {
  title: "Тарифы — Lumeforge",
  description:
    "Веб-разработка, AI-автоматизация, кастомные MCP-серверы и видеопродакшн. Выберите тариф Lumeforge.",
};

export default function PricingPage() {
  return (
    <div id="top" className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <PromoBanner />
        </div>
        <PricingCards />
        <PricingCalculator />
        <FeatureMatrix />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
