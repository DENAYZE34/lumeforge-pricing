"use client";

import { useRef } from "react";
import { X, Upload } from "lucide-react";
import { compileMasterPrompt, type CameraState } from "@/lib/prompt-compiler";

interface ReferenceImage {
  id: string;
  dataUrl: string;
  name: string;
}

interface PromptBuilderProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  camera: CameraState;
  references: ReferenceImage[];
  onReferencesChange: (references: ReferenceImage[]) => void;
}

const MAX_REFERENCES = 4;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PromptBuilder({
  prompt,
  onPromptChange,
  camera,
  references,
  onReferencesChange,
}: PromptBuilderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const remaining = MAX_REFERENCES - references.length;
    const selected = Array.from(files).slice(0, remaining);

    const added = await Promise.all(
      selected.map(async (file) => ({
        id: crypto.randomUUID(),
        dataUrl: await readFileAsDataUrl(file),
        name: file.name,
      }))
    );

    onReferencesChange([...references, ...added]);
  }

  function removeReference(id: string) {
    onReferencesChange(references.filter((r) => r.id !== id));
  }

  const masterPrompt = compileMasterPrompt(prompt || "...", camera);

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        Prompt
      </h3>

      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Describe the shot: a lone figure walking through a neon-lit alley at night..."
        rows={4}
        className="w-full resize-none rounded-xl border border-zinc-800 bg-black p-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#ff6a1f] focus:outline-none"
      />

      <div>
        <p className="mb-2 text-xs text-zinc-500">
          Soul ID — character &amp; style references ({references.length}/{MAX_REFERENCES})
        </p>
        <div className="flex flex-wrap gap-3">
          {references.map((ref) => (
            <div
              key={ref.id}
              className="group relative h-20 w-20 overflow-hidden rounded-lg border border-zinc-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ref.dataUrl} alt={ref.name} className="h-full w-full object-cover" />
              <button
                onClick={() => removeReference(ref.id)}
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}

          {references.length < MAX_REFERENCES && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-700 text-zinc-500 transition hover:border-zinc-500 hover:text-zinc-300"
            >
              <Upload className="h-4 w-4" />
              <span className="text-[10px]">Upload</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="border-t border-zinc-800 pt-3">
        <p className="mb-1 text-xs text-zinc-500">Compiled master prompt</p>
        <p className="font-mono text-xs leading-relaxed text-zinc-400">{masterPrompt}</p>
      </div>
    </div>
  );
}

export type { ReferenceImage };
