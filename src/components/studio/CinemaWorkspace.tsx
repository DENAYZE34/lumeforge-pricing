"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DEFAULT_CAMERA_STATE, type CameraState } from "@/lib/prompt-compiler";
import { startVideoGeneration, pollJobStatus, type VideoJob, type VideoModel, type VideoResolution } from "@/lib/api-client";
import { CameraControls } from "./CameraControls";
import { PromptBuilder, type ReferenceImage } from "./PromptBuilder";
import { GenerationGallery } from "./GenerationGallery";

const MODELS: { value: VideoModel; label: string }[] = [
  { value: "seedance-2.5", label: "Seedance 2.5" },
  { value: "kling-3.0", label: "Kling 3.0" },
  { value: "veo-3.1", label: "Veo 3.1" },
];

const RESOLUTIONS: VideoResolution[] = ["720p", "1080p", "4k"];

export function CinemaWorkspace() {
  const [model, setModel] = useState<VideoModel>("seedance-2.5");
  const [resolution, setResolution] = useState<VideoResolution>("1080p");
  const [prompt, setPrompt] = useState("");
  const [camera, setCamera] = useState<CameraState>(DEFAULT_CAMERA_STATE);
  const [references, setReferences] = useState<ReferenceImage[]>([]);
  const [jobs, setJobs] = useState<VideoJob[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateJob(job: VideoJob) {
    setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
  }

  async function handleGenerate() {
    if (!prompt.trim() || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const job = await startVideoGeneration({
        model,
        prompt,
        resolution,
        camera,
        referenceImages: references.map((r) => r.dataUrl),
      });
      setJobs((prev) => [job, ...prev]);
      pollJobStatus(job.id, updateJob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start generation");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Cinema Studio</h1>
          <p className="text-sm text-zinc-500">Lumeforge · AI video production workspace</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as VideoModel)}
            className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-[#ff6a1f] focus:outline-none"
          >
            {MODELS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value as VideoResolution)}
            className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-[#ff6a1f] focus:outline-none"
          >
            {RESOLUTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <PromptBuilder
            prompt={prompt}
            onPromptChange={setPrompt}
            camera={camera}
            references={references}
            onReferencesChange={setReferences}
          />

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || submitting}
            className={cn(
              "w-full rounded-xl bg-gradient-to-r from-[#ff6a1f] to-[#ff3d1a] py-3 text-sm font-bold text-black transition",
              (!prompt.trim() || submitting) && "cursor-not-allowed opacity-40"
            )}
          >
            {submitting ? "Starting..." : "Generate"}
          </button>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <GenerationGallery jobs={jobs} />
        </div>

        <CameraControls camera={camera} onChange={setCamera} />
      </div>
    </div>
  );
}
