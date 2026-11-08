"use client";

import { cn } from "@/lib/utils";
import {
  MOTION_PRESETS,
  MAX_MOTION_STACK,
  type CameraState,
  type FocalLength,
  type DepthOfField,
  type LightingStyle,
} from "@/lib/prompt-compiler";

const FOCAL_LENGTHS: FocalLength[] = ["16mm", "35mm", "50mm", "85mm"];
const DEPTH_OF_FIELDS: { value: DepthOfField; label: string }[] = [
  { value: "shallow", label: "Shallow" },
  { value: "standard", label: "Standard" },
  { value: "deep", label: "Deep focus" },
];
const LIGHTING_STYLES: { value: LightingStyle; label: string }[] = [
  { value: "natural", label: "Natural" },
  { value: "studio", label: "Studio" },
  { value: "noir", label: "Noir" },
  { value: "golden-hour", label: "Golden hour" },
];

interface CameraControlsProps {
  camera: CameraState;
  onChange: (camera: CameraState) => void;
}

export function CameraControls({ camera, onChange }: CameraControlsProps) {
  function toggleMotion(id: string) {
    const active = camera.motionStack.includes(id);
    if (active) {
      onChange({ ...camera, motionStack: camera.motionStack.filter((m) => m !== id) });
      return;
    }
    if (camera.motionStack.length >= MAX_MOTION_STACK) return;
    onChange({ ...camera, motionStack: [...camera.motionStack, id] });
  }

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        Lens &amp; film direction
      </h3>

      <div>
        <p className="mb-2 text-xs text-zinc-500">Focal length</p>
        <div className="flex flex-wrap gap-2">
          {FOCAL_LENGTHS.map((value) => (
            <button
              key={value}
              onClick={() => onChange({ ...camera, focalLength: value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition",
                camera.focalLength === value
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 text-zinc-300 hover:border-zinc-600"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-zinc-500">Depth of field</p>
        <div className="flex flex-wrap gap-2">
          {DEPTH_OF_FIELDS.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange({ ...camera, depthOfField: option.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition",
                camera.depthOfField === option.value
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 text-zinc-300 hover:border-zinc-600"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-zinc-500">Lighting style</p>
        <div className="flex flex-wrap gap-2">
          {LIGHTING_STYLES.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange({ ...camera, lighting: option.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition",
                camera.lighting === option.value
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 text-zinc-300 hover:border-zinc-600"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4">
        <p className="mb-2 flex items-center justify-between text-xs text-zinc-500">
          <span>Motion stack</span>
          <span>{camera.motionStack.length}/{MAX_MOTION_STACK}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {MOTION_PRESETS.map((preset) => {
            const active = camera.motionStack.includes(preset.id);
            const disabled = !active && camera.motionStack.length >= MAX_MOTION_STACK;
            return (
              <button
                key={preset.id}
                onClick={() => toggleMotion(preset.id)}
                disabled={disabled}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm transition",
                  active
                    ? "border-[#ff6a1f] bg-[#ff6a1f]/20 text-white"
                    : "border-zinc-800 text-zinc-300 hover:border-zinc-600",
                  disabled && "cursor-not-allowed opacity-30"
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
