export type FocalLength = "16mm" | "35mm" | "50mm" | "85mm";
export type DepthOfField = "shallow" | "standard" | "deep";
export type LightingStyle = "natural" | "studio" | "noir" | "golden-hour";

export interface MotionPreset {
  id: string;
  label: string;
}

export const MOTION_PRESETS: MotionPreset[] = [
  { id: "dolly-in", label: "Dolly In" },
  { id: "dolly-out", label: "Dolly Out" },
  { id: "pan-left", label: "Pan Left" },
  { id: "pan-right", label: "Pan Right" },
  { id: "fpv", label: "FPV" },
  { id: "crane-up", label: "Crane Up" },
  { id: "handheld", label: "Handheld" },
  { id: "static", label: "Static" },
];

export const MAX_MOTION_STACK = 3;

export interface CameraState {
  focalLength: FocalLength;
  depthOfField: DepthOfField;
  lighting: LightingStyle;
  motionStack: string[];
}

export const DEFAULT_CAMERA_STATE: CameraState = {
  focalLength: "35mm",
  depthOfField: "shallow",
  lighting: "natural",
  motionStack: [],
};

const DOF_LABEL: Record<DepthOfField, string> = {
  shallow: "shallow depth of field",
  standard: "standard depth of field",
  deep: "deep focus",
};

const LIGHTING_LABEL: Record<LightingStyle, string> = {
  natural: "natural lighting",
  studio: "studio lighting",
  noir: "noir lighting",
  "golden-hour": "golden hour lighting",
};

export function compileMasterPrompt(basePrompt: string, camera: CameraState): string {
  const clauses = [
    basePrompt.trim(),
    "cinematic",
    `${camera.focalLength} lens`,
    DOF_LABEL[camera.depthOfField],
    LIGHTING_LABEL[camera.lighting],
    ...camera.motionStack
      .map((id) => {
        const preset = MOTION_PRESETS.find((p) => p.id === id);
        return preset ? `${preset.label.toLowerCase()} camera movement` : null;
      })
      .filter((v): v is string => Boolean(v)),
  ].filter(Boolean);

  return clauses.join(", ");
}
