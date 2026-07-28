/** Frames per second used by the StarLab intro player. */
export const INTRO_FPS = 30;

/** The first frame of the fully settled, static lockup. */
export const INTRO_FINAL_FRAME = 375;

export type IntroPhase = "ambient" | "reveal" | "scan" | "settle" | "final";

export interface IntroPhaseRange {
  readonly startFrame: number;
  readonly endFrame: number | null;
}

/**
 * Inclusive frame ranges. `null` means that the phase has no upper bound.
 * Keeping these boundaries in one place makes the player and CircuitScene
 * deterministic at every supplied frame.
 */
export const INTRO_PHASE_RANGES = {
  ambient: { startFrame: 0, endFrame: 132 },
  reveal: { startFrame: 133, endFrame: 191 },
  scan: { startFrame: 192, endFrame: 269 },
  settle: { startFrame: 270, endFrame: 374 },
  final: { startFrame: INTRO_FINAL_FRAME, endFrame: null },
} as const satisfies Record<IntroPhase, IntroPhaseRange>;

export interface IntroLogoState {
  readonly visible: boolean;
  readonly opacity: number;
  readonly scale: number;
  readonly translateYPercent: number;
  readonly blurPx: number;
  readonly stable: boolean;
}

export interface IntroScanState {
  readonly active: boolean;
  readonly opacity: number;
  /** Position through the scan pass, normalized to the inclusive range 0–1. */
  readonly progress: number;
}

export interface IntroAmbientState {
  readonly visible: boolean;
  readonly opacity: number;
  readonly intensity: number;
}

export interface IntroState {
  /**
   * The caller's unmodified frame request. This remains available to a parent
   * player even when the visual output is held at the terminal display frame.
   */
  readonly requestedFrame: number;
  /** Sanitized integer frame in the closed interval 0–375. */
  readonly frame: number;
  readonly phase: IntroPhase;
  /** Progress through the current phase, normalized to the inclusive range 0–1. */
  readonly phaseProgress: number;
  readonly logo: IntroLogoState;
  readonly scan: IntroScanState;
  readonly ambient: IntroAmbientState;
}

/**
 * Normalizes player input without making the timeline depend on wall-clock time.
 * Fractions are floored; negative, NaN, and -Infinity inputs become frame 0;
 * +Infinity and all frames at or after the final frame become frame 375.
 */
export function clampIntroFrame(frame: number): number {
  if (Number.isNaN(frame) || frame <= 0) {
    return 0;
  }

  if (frame >= INTRO_FINAL_FRAME) {
    return INTRO_FINAL_FRAME;
  }

  return Math.floor(frame);
}

/**
 * Returns the full visual state for one deterministic intro frame.
 * The final branch intentionally contains only settled values: consumers can
 * render any frame >= 375 without a scan, flicker, or follow-on transition.
 */
export function getIntroState(frame: number): IntroState {
  const requestedFrame = frame;
  const normalizedFrame = clampIntroFrame(frame);

  if (normalizedFrame <= INTRO_PHASE_RANGES.ambient.endFrame) {
    const phaseProgress = getRangeProgress(
      normalizedFrame,
      INTRO_PHASE_RANGES.ambient.startFrame,
      INTRO_PHASE_RANGES.ambient.endFrame,
    );

    return {
      requestedFrame,
      frame: normalizedFrame,
      phase: "ambient",
      phaseProgress,
      logo: {
        visible: false,
        opacity: 0,
        scale: 1.3,
        translateYPercent: 10,
        blurPx: 18,
        stable: false,
      },
      scan: {
        active: false,
        opacity: 0,
        progress: 0,
      },
      ambient: {
        visible: true,
        opacity: lerp(0.08, 0.56, phaseProgress),
        intensity: lerp(0.12, 0.72, phaseProgress),
      },
    };
  }

  if (normalizedFrame <= INTRO_PHASE_RANGES.reveal.endFrame) {
    const phaseProgress = getRangeProgress(
      normalizedFrame,
      INTRO_PHASE_RANGES.reveal.startFrame,
      INTRO_PHASE_RANGES.reveal.endFrame,
    );

    return {
      requestedFrame,
      frame: normalizedFrame,
      phase: "reveal",
      phaseProgress,
      logo: {
        visible: true,
        opacity: lerp(0.1, 0.78, phaseProgress),
        scale: lerp(1.28, 1.14, phaseProgress),
        translateYPercent: lerp(12, 4, phaseProgress),
        blurPx: lerp(14, 3, phaseProgress),
        stable: false,
      },
      scan: {
        active: false,
        opacity: 0,
        progress: 0,
      },
      ambient: {
        visible: true,
        opacity: lerp(0.62, 0.84, phaseProgress),
        intensity: lerp(0.74, 0.94, phaseProgress),
      },
    };
  }

  if (normalizedFrame <= INTRO_PHASE_RANGES.scan.endFrame) {
    const phaseProgress = getRangeProgress(
      normalizedFrame,
      INTRO_PHASE_RANGES.scan.startFrame,
      INTRO_PHASE_RANGES.scan.endFrame,
    );

    return {
      requestedFrame,
      frame: normalizedFrame,
      phase: "scan",
      phaseProgress,
      logo: {
        visible: true,
        opacity: lerp(0.8, 1, phaseProgress),
        scale: lerp(1.14, 1.06, phaseProgress),
        translateYPercent: lerp(4, 1, phaseProgress),
        blurPx: lerp(3, 0, phaseProgress),
        stable: false,
      },
      scan: {
        active: true,
        opacity: lerp(0.92, 0.68, phaseProgress),
        progress: phaseProgress,
      },
      ambient: {
        visible: true,
        opacity: lerp(0.82, 0.58, phaseProgress),
        intensity: lerp(0.92, 0.62, phaseProgress),
      },
    };
  }

  if (normalizedFrame <= INTRO_PHASE_RANGES.settle.endFrame) {
    const phaseProgress = getRangeProgress(
      normalizedFrame,
      INTRO_PHASE_RANGES.settle.startFrame,
      INTRO_PHASE_RANGES.settle.endFrame,
    );

    return {
      requestedFrame,
      frame: normalizedFrame,
      phase: "settle",
      phaseProgress,
      logo: {
        visible: true,
        opacity: 1,
        scale: lerp(1.06, 1, phaseProgress),
        translateYPercent: lerp(1, 0, phaseProgress),
        blurPx: 0,
        stable: false,
      },
      scan: {
        active: phaseProgress < 0.55,
        opacity: phaseProgress < 0.55 ? lerp(0.36, 0, phaseProgress / 0.55) : 0,
        progress: 1,
      },
      ambient: {
        visible: true,
        opacity: lerp(0.54, 0.045, phaseProgress),
        intensity: lerp(0.58, 0.05, phaseProgress),
      },
    };
  }

  return {
    requestedFrame,
    frame: INTRO_FINAL_FRAME,
    phase: "final",
    phaseProgress: 1,
    logo: {
      visible: true,
      opacity: 1,
      scale: 1,
      translateYPercent: 0,
      blurPx: 0,
      stable: true,
    },
    scan: {
      active: false,
      opacity: 0,
      progress: 1,
    },
    ambient: {
      visible: true,
      opacity: 0.045,
      intensity: 0.05,
    },
  };
}

function getRangeProgress(frame: number, startFrame: number, endFrame: number): number {
  if (frame <= startFrame) {
    return 0;
  }

  if (frame >= endFrame) {
    return 1;
  }

  return (frame - startFrame) / (endFrame - startFrame);
}

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}
