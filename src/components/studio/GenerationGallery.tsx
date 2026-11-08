"use client";

import { Loader2, CheckCircle2, XCircle, Clock, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VideoJob } from "@/lib/api-client";

interface GenerationGalleryProps {
  jobs: VideoJob[];
}

const STATUS_CONFIG: Record<
  VideoJob["status"],
  { label: string; icon: typeof Clock; className: string }
> = {
  queued: { label: "Queued", icon: Clock, className: "text-zinc-400" },
  processing: { label: "Processing", icon: Loader2, className: "text-[#ff3d1a] animate-spin" },
  ready: { label: "Ready", icon: CheckCircle2, className: "text-emerald-400" },
  failed: { label: "Failed", icon: XCircle, className: "text-red-400" },
};

export function GenerationGallery({ jobs }: GenerationGalleryProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center text-sm text-zinc-600">
        No generations yet. Configure your shot and hit Generate.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {jobs.map((job) => {
        const status = STATUS_CONFIG[job.status];
        const StatusIcon = status.icon;

        return (
          <div
            key={job.id}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
          >
            <div className="flex aspect-video items-center justify-center bg-black">
              {job.status === "ready" && job.videoUrl ? (
                <video src={job.videoUrl} controls className="h-full w-full" />
              ) : (
                <StatusIcon className={cn("h-8 w-8", status.className)} />
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2 text-xs">
                <StatusIcon className={cn("h-3.5 w-3.5", status.className)} />
                <span className="text-zinc-300">{status.label}</span>
                <span className="text-zinc-600">#{job.id.slice(0, 8)}</span>
              </div>
              {job.status === "ready" && (
                <button className="flex items-center gap-1 text-xs text-[#ff6a1f] hover:text-[#ff8a4d]">
                  <ArrowUpCircle className="h-3.5 w-3.5" />
                  Upscale
                </button>
              )}
            </div>
            {job.status === "failed" && job.error && (
              <p className="px-4 pb-3 text-xs text-red-400/80">{job.error}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
