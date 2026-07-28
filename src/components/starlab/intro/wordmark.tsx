import type { CSSProperties } from "react";
import styles from "./wordmark.module.css";
import { getIntroState, type IntroState } from "./timeline";

/** Local public asset supplied with the StarLab intro. */
export const STARLAB_LOCKUP_SRC = "/starlab/brand/starlab-lockup.png";
/** Exact RGB terminal crop supplied by A2; never used during assembly frames. */
export const STARLAB_FINAL_HOLD_SRC = "/starlab/brand/starlab-final-hold.png";

export interface StarLabWordmarkProps {
  readonly frame: number;
  readonly reducedMotion?: boolean;
  readonly className?: string;
}

interface LocalWordmarkImageProps {
  readonly className: string;
}

/**
 * The final RGB crop fades in only over the last 25 integer display frames.
 * Its end frame is deliberately one frame before the frozen hold begins: the
 * candidate at frame 374 must already be byte-for-byte geometrically aligned
 * with the frame-375 terminal layer, while still having changed on its way
 * there.
 */
const TERMINAL_CROSSFADE_START_FRAME = 350;
const TERMINAL_CROSSFADE_END_FRAME = 374;
/** 3 working-lockup pixels expressed in the cropped 288px layer's space. */
const TERMINAL_HOLD_TRANSLATE_Y = "1.0416666667%";

/**
 * The verified working PNG has source pixels calibrated against the frozen
 * terminal crop. Keep it out of the framework image optimizer: at the 1920px
 * QA viewport it is rendered at its native 772×304 logical dimensions, so an
 * optimizer-induced re-encode cannot alter its edge pixels between frames.
 */
function LocalWordmarkImage({ className }: LocalWordmarkImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className={className}
      decoding="async"
      draggable={false}
      height={304}
      src={STARLAB_LOCKUP_SRC}
      width={772}
    />
  );
}

export type WordmarkVisualStep =
  | "ambient"
  | "reveal-one"
  | "reveal-two"
  | "reveal-three"
  | "scan-one"
  | "scan-two"
  | "scan-three"
  | "settle-one"
  | "settle-two"
  | "settle-three"
  | "final";

const stepClassNames: Record<WordmarkVisualStep, string> = {
  ambient: styles.stepAmbient,
  "reveal-one": styles.stepRevealOne,
  "reveal-two": styles.stepRevealTwo,
  "reveal-three": styles.stepRevealThree,
  "scan-one": styles.stepScanOne,
  "scan-two": styles.stepScanTwo,
  "scan-three": styles.stepScanThree,
  "settle-one": styles.stepSettleOne,
  "settle-two": styles.stepSettleTwo,
  "settle-three": styles.stepSettleThree,
  final: styles.stepFinal,
};

type WordmarkFrameBand =
  | "scan-entry"
  | "scan-build"
  | "scan-read"
  | "scan-refine"
  | "scan-resolve"
  | "scan-complete"
  | "settle-entry"
  | "settle-bloom"
  | "settle-whiten"
  | "settle-quiet"
  | "settle-near-final";

const frameBandClassNames: Record<WordmarkFrameBand, string> = {
  "scan-entry": styles.scanEntry,
  "scan-build": styles.scanBuild,
  "scan-read": styles.scanRead,
  "scan-refine": styles.scanRefine,
  "scan-resolve": styles.scanResolve,
  "scan-complete": styles.scanComplete,
  "settle-entry": styles.settleEntry,
  "settle-bloom": styles.settleBloom,
  "settle-whiten": styles.settleWhiten,
  "settle-quiet": styles.settleQuiet,
  "settle-near-final": styles.settleNearFinal,
};

/**
 * Renders the deterministic StarLab wordmark layer. The supplied frame is the
 * only animation input; this component deliberately has no autonomous timer
 * or looping keyframe animation.
 */
export function StarLabWordmark({
  frame,
  reducedMotion = false,
  className,
}: StarLabWordmarkProps) {
  const state = getIntroState(frame);
  const visualStep = getWordmarkVisualStep(state);
  const frameBand = getWordmarkFrameBand(state.frame);
  const useFinalHold = reducedMotion || state.phase === "final";
  const useFrameInterpolation = !useFinalHold && state.frame >= 192;
  const useTerminalCrossfade =
    !useFinalHold &&
    state.frame >= TERMINAL_CROSSFADE_START_FRAME &&
    state.frame <= TERMINAL_CROSSFADE_END_FRAME;
  const terminalCrossfade = useTerminalCrossfade
    ? getTerminalCrossfade(state.frame)
    : 0;
  const mountTerminalHold = useFinalHold || useTerminalCrossfade;
  const rootClassName = [
    styles.root,
    stepClassNames[visualStep],
    frameBand ? frameBandClassNames[frameBand] : undefined,
    state.scan.active ? styles.scanActive : styles.scanInactive,
    reducedMotion ? styles.reducedMotion : undefined,
    useFinalHold ? styles.useFinalHold : undefined,
    useTerminalCrossfade ? styles.terminalCrossfade : undefined,
    useFrameInterpolation ? styles.frameInterpolated : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClassName}
      data-intro-frame={state.frame}
      data-intro-phase={state.phase}
      data-wordmark-step={visualStep}
      style={
        useFrameInterpolation
          ? getInterpolatedWordmarkStyle(state.frame, terminalCrossfade)
          : undefined
      }
    >
      <span className={styles.screenReaderText}>STAR LAB 星科技 TECHNOLOGY</span>
      <div aria-hidden="true" className={styles.visual}>
        <span className={styles.ambient} />
        <span className={styles.lockupViewport}>
          <LocalWordmarkImage className={styles.lockup} />
        </span>
        <span className={styles.fragmentViewport}>
          <LocalWordmarkImage className={styles.fragmentLockup} />
        </span>
        <span className={styles.whiteChineseViewport}>
          <LocalWordmarkImage className={styles.whiteChineseLockup} />
        </span>
        <span className={styles.whiteTechnologyViewport} />
        <span className={styles.assemblyLayer}>
          <span className={styles.assemblyLatinViewport}>
            <LocalWordmarkImage className={styles.assemblyLatinLockup} />
          </span>
          <span className={styles.assemblyChineseViewport}>
            <LocalWordmarkImage className={styles.assemblyChineseLockup} />
          </span>
          <span className={styles.assemblyTechnologyViewport}>
            <LocalWordmarkImage className={styles.assemblyTechnologyLockup} />
          </span>
        </span>
        <span className={styles.texture} />
        <span className={styles.scan} />
        {mountTerminalHold ? (
          <span className={styles.finalHoldViewport}>
            {/* The exact terminal crop must never pass through the Next image optimizer. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className={styles.finalHold}
              decoding="sync"
              draggable={false}
              height={288}
              src={STARLAB_FINAL_HOLD_SRC}
              width={756}
            />
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Maps the frame state to static CSS snapshots used by the wordmark. */
export function getWordmarkVisualStep(state: IntroState): WordmarkVisualStep {
  switch (state.phase) {
    case "ambient":
      return "ambient";
    case "reveal":
      return getProgressStep(state.phaseProgress, "reveal");
    case "scan":
      return getProgressStep(state.phaseProgress, "scan");
    case "settle":
      return getProgressStep(state.phaseProgress, "settle");
    case "final":
      return "final";
  }
}

function getProgressStep(
  phaseProgress: number,
  prefix: "reveal" | "scan" | "settle",
): WordmarkVisualStep {
  if (phaseProgress < 1 / 3) {
    return `${prefix}-one`;
  }

  if (phaseProgress < 2 / 3) {
    return `${prefix}-two`;
  }

  return `${prefix}-three`;
}

function getWordmarkFrameBand(frame: number): WordmarkFrameBand | undefined {
  if (frame < 192 || frame >= 375) {
    return undefined;
  }

  if (frame <= 203) {
    return "scan-entry";
  }

  if (frame <= 217) {
    return "scan-build";
  }

  if (frame <= 235) {
    return "scan-read";
  }

  if (frame <= 243) {
    return "scan-refine";
  }

  if (frame <= 259) {
    return "scan-resolve";
  }

  if (frame <= 269) {
    return "scan-complete";
  }

  if (frame <= 286) {
    return "settle-entry";
  }

  if (frame <= 303) {
    return "settle-bloom";
  }

  if (frame <= 332) {
    return "settle-whiten";
  }

  if (frame <= 349) {
    return "settle-quiet";
  }

  if (frame <= 374) {
    return "settle-near-final";
  }

  return undefined;
}

type WordmarkCustomProperties = CSSProperties & Record<`--${string}`, string>;

interface FrameAnchor {
  readonly frame: number;
  readonly value: number;
}

/**
 * Returns the deterministic, frame-derived CSS-variable snapshot for the
 * 192–374 assembly. The forensic handoff establishes phase and readability
 * states, not source clip, scan, alpha, or easing measurements. Accordingly,
 * the intermediate controls below are deliberately labeled visual
 * approximations; they interpolate integer-frame snapshots without claiming
 * unmeasured source geometry.
 */
function getInterpolatedWordmarkStyle(
  frame: number,
  terminalCrossfade: number,
): WordmarkCustomProperties {
  const scale = interpolateFrameAnchors(frame, [
    { frame: 192, value: 1.55 },
    { frame: 216, value: 1.4 },
    { frame: 228, value: 1.4 },
    { frame: 252, value: 1.32 },
    { frame: 270, value: 1.23 },
    { frame: 288, value: 1.15 },
    { frame: 324, value: 1.06 },
    { frame: 352, value: 1.01 },
    { frame: 374, value: 1 },
  ]);
  const assemblyOffsetX = interpolateFrameAnchors(frame, [
    { frame: 192, value: -4 },
    { frame: 216, value: -3 },
    { frame: 228, value: -2 },
    { frame: 252, value: 0 },
    { frame: 374, value: 0 },
  ]);
  const assemblyOffsetY = interpolateFrameAnchors(frame, [
    { frame: 192, value: 2 },
    { frame: 216, value: 1.5 },
    { frame: 228, value: 1 },
    { frame: 252, value: 0.55 },
    { frame: 288, value: 0.45 },
    { frame: 374, value: 0 },
  ]);
  const mainOffsetY = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0 },
    { frame: 288, value: 0.3 },
    { frame: 324, value: 0.5 },
    { frame: 352, value: 0.65 },
    { frame: 374, value: 0.9868421053 },
  ]);
  /*
   * These anchors consume only the measured ordering of readable groups.
   * Their fractional coverage is a deterministic CSS approximation, not a
   * forensic measurement of the source clip geometry.
   */
  const latinCoverage = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0.18 },
    { frame: 216, value: 1 },
    { frame: 374, value: 1 },
  ]);
  const chineseCoverage = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0 },
    { frame: 216, value: 0.08 },
    { frame: 228, value: 0.22 },
    { frame: 252, value: 0.62 },
    { frame: 270, value: 0.92 },
    { frame: 288, value: 1 },
    { frame: 374, value: 1 },
  ]);
  const technologyCoverage = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0 },
    { frame: 216, value: 0.08 },
    { frame: 228, value: 0.28 },
    { frame: 252, value: 0.58 },
    { frame: 270, value: 1 },
    { frame: 374, value: 1 },
  ]);
  const technologyWhiteCoverage = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0 },
    { frame: 216, value: 0 },
    { frame: 228, value: 0.12 },
    { frame: 252, value: 0.42 },
    { frame: 270, value: 0.7 },
    { frame: 288, value: 0.92 },
    { frame: 300, value: 1 },
    { frame: 374, value: 1 },
  ]);
  const scanEnergy = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0 },
    { frame: 216, value: 0.15 },
    { frame: 228, value: 0.55 },
    { frame: 252, value: 0.8 },
    { frame: 270, value: 0.25 },
    { frame: 288, value: 0 },
    { frame: 374, value: 0 },
  ]);
  const scanOffsetX = interpolateFrameAnchors(frame, [
    { frame: 192, value: -44 },
    { frame: 216, value: -24 },
    { frame: 228, value: -4 },
    { frame: 252, value: 47 },
    { frame: 270, value: 84 },
    { frame: 288, value: 122 },
    { frame: 374, value: 132 },
  ]);
  const whiteCoverage = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0 },
    { frame: 216, value: 0 },
    { frame: 228, value: 0 },
    { frame: 252, value: 0.04 },
    { frame: 270, value: 0.12 },
    { frame: 288, value: 0.44 },
    { frame: 300, value: 0.7 },
    { frame: 324, value: 1 },
    { frame: 374, value: 1 },
  ]);
  const textureEnergy = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0.3 },
    { frame: 216, value: 0.55 },
    { frame: 228, value: 0.72 },
    { frame: 252, value: 0.82 },
    { frame: 270, value: 0.5 },
    { frame: 288, value: 0.18 },
    { frame: 324, value: 0 },
    { frame: 374, value: 0 },
  ]);
  const ambientOpacity = interpolateFrameAnchors(frame, [
    { frame: 192, value: 0.5 },
    { frame: 228, value: 0.4 },
    { frame: 270, value: 0.24 },
    { frame: 324, value: 0.04 },
    { frame: 352, value: 0.01 },
    { frame: 374, value: 0 },
  ]);
  const mainOpacity = smoothstep(300, 324, frame);
  const assemblyOpacity = 1 - mainOpacity;
  const whiteBottomInset = 23 + 77 * (1 - whiteCoverage);

  return {
    "--starlab-main-opacity": formatFrameValue(mainOpacity),
    "--starlab-working-opacity": formatFrameValue(1 - terminalCrossfade),
    "--starlab-main-scale": formatFrameValue(scale),
    "--starlab-main-y": formatPercent(mainOffsetY),
    "--starlab-assembly-opacity": formatFrameValue(assemblyOpacity),
    "--starlab-assembly-scale": formatFrameValue(scale),
    "--starlab-assembly-x": formatPercent(assemblyOffsetX),
    "--starlab-assembly-y": formatPercent(assemblyOffsetY),
    "--starlab-latin-right": formatPercent(100 - 70 * latinCoverage),
    "--starlab-chinese-right": formatPercent(29 * (1 - chineseCoverage)),
    "--starlab-technology-right": formatPercent(87 - 75 * technologyCoverage),
    "--starlab-chinese-white-right": formatPercent(29 * (1 - whiteCoverage)),
    "--starlab-technology-white-right": formatPercent(
      87 - 75 * technologyWhiteCoverage,
    ),
    "--starlab-technology-white-opacity": formatFrameValue(assemblyOpacity),
    "--starlab-white-bottom": formatPercent(whiteBottomInset),
    "--starlab-white-opacity": formatFrameValue(assemblyOpacity),
    "--starlab-scan-opacity": formatFrameValue(scanEnergy),
    "--starlab-scan-x": formatPercent(scanOffsetX),
    "--starlab-texture-opacity": formatFrameValue(
      textureEnergy * (1 - terminalCrossfade),
    ),
    "--starlab-ambient-opacity": formatFrameValue(ambientOpacity),
    "--starlab-terminal-opacity": formatFrameValue(terminalCrossfade),
    "--starlab-terminal-y": TERMINAL_HOLD_TRANSLATE_Y,
  };
}

/**
 * The terminal crop is a fixed, provenance-checked RGB image.  A frame-only
 * smoothstep gives it a visible, deterministic 350–373 transition and an
 * exact opacity of one at 374; no wall-clock CSS transition participates.
 */
function getTerminalCrossfade(frame: number): number {
  return smoothstep(
    TERMINAL_CROSSFADE_START_FRAME,
    TERMINAL_CROSSFADE_END_FRAME,
    frame,
  );
}

function interpolateFrameAnchors(frame: number, anchors: readonly FrameAnchor[]): number {
  const first = anchors[0];
  const last = anchors[anchors.length - 1];

  if (frame <= first.frame) {
    return first.value;
  }

  if (frame >= last.frame) {
    return last.value;
  }

  for (let index = 1; index < anchors.length; index += 1) {
    const right = anchors[index];
    const left = anchors[index - 1];

    if (frame <= right.frame) {
      const progress = (frame - left.frame) / (right.frame - left.frame);
      return left.value + (right.value - left.value) * progress;
    }
  }

  return last.value;
}

function smoothstep(start: number, end: number, value: number): number {
  if (value <= start) {
    return 0;
  }

  if (value >= end) {
    return 1;
  }

  const progress = (value - start) / (end - start);
  return progress * progress * (3 - 2 * progress);
}

function formatFrameValue(value: number): string {
  return value.toFixed(6);
}

function formatPercent(value: number): string {
  return `${value.toFixed(6)}%`;
}
