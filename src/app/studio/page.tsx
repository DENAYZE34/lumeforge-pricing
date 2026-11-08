import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/rd-dsign/SiteHeader";
import { CinemaWorkspace } from "@/components/studio/CinemaWorkspace";

export const metadata: Metadata = {
  title: "Cinema Studio — Lumeforge",
  description: "Configure cinematic video generation jobs across multiple AI models.",
};

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <CinemaWorkspace />
    </div>
  );
}
