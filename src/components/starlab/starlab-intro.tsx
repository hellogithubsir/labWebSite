"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  INTRO_FINAL_FRAME,
  INTRO_FPS,
  StarLabWordmark,
  clampIntroFrame,
} from "./intro";
import { CircuitScene, type CircuitRenderer } from "./scene/circuit-scene";
import sceneStyles from "./scene/circuit-scene.module.css";
import styles from "./starlab-intro.module.css";

const MAX_QA_FRAME = 449;

export type StarlabIntroProps = {
  className?: string;
  mode?: "autoplay" | "fixed";
  frame?: number;
};

type StarlabQaController = {
  setFrame: (nextFrame: number) => void;
  renderedFrame: number;
  renderer: CircuitRenderer;
};

type IntroRenderer = CircuitRenderer | "pending";
type BootstrapMode = "bootstrapping" | "interactive" | "static";
type PresentationMode = "interactive" | "static";
type AutoplayStartGate = {
  initialFrame: number;
  version: number;
};

declare global {
  interface Window {
    __STARLAB_QA__?: StarlabQaController;
    __STARLAB_BOOTSTRAP_MODE__?: Exclude<BootstrapMode, "bootstrapping">;
  }
}

/*
 * This runs while the server HTML is being parsed, before DOMContentLoaded and
 * before React hydration. It intentionally decides only the binary initial
 * presentation: normal WebGL starts at f0; a reduced-motion preference or an
 * unavailable WebGL context starts directly at the static f375 hold.
 *
 * Keeping this probe parser-blocking is important. A useEffect-based repair
 * would first expose f0 in the production DOM and only then switch to f375,
 * which makes a forced fallback/reduced-motion session visibly flicker and
 * gives the QA MutationObserver a nonterminal history entry.
 */
const BOOTSTRAP_PRESENTATION_SCRIPT = `(function () {
  // The script is deliberately the first child of .stage so the section keeps
  // its historical firstElementChild contract for QA. Its target is therefore
  // the stage's parent, not the script's immediate parent.
  var root = document.currentScript && document.currentScript.parentElement &&
    document.currentScript.parentElement.parentElement;
  var mode = "interactive";

  try {
    var reducedMotion = typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      mode = "static";
    } else {
      var probe = document.createElement("canvas");
      var context = probe.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false
      });

      if (!context) {
        mode = "static";
      } else {
        // The probe canvas is never rendered. Release its context immediately
        // so repeated isolated QA pages cannot consume Chromium's WebGL budget.
        try {
          var loseContext = context.getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        } catch (releaseError) {
          // Capability was already established; a missing release extension
          // must not turn an otherwise capable browser into a false fallback.
        }
      }
    }
  } catch (error) {
    mode = "static";
  }

  window.__STARLAB_BOOTSTRAP_MODE__ = mode;

  if (root) {
    var isStatic = mode === "static";
    var requestedFrame = Number(root.getAttribute("data-requested-frame"));
    var interactiveFrame = Number.isSafeInteger(requestedFrame)
      ? Math.min(375, Math.max(0, requestedFrame))
      : 0;
    root.setAttribute("data-starlab-bootstrap", mode);
    root.setAttribute("data-starlab-presentation", isStatic ? "static" : "interactive");
    root.setAttribute("data-intro-frame", String(isStatic ? 375 : interactiveFrame));
    root.setAttribute("data-renderer", isStatic ? "fallback" : "pending");
  }
})();`;

function normalizeRequestedFrame(frame: number): number {
  if (!Number.isFinite(frame) || frame <= 0) {
    return 0;
  }

  return Math.min(MAX_QA_FRAME, Math.floor(frame));
}

function joinClassNames(...classNames: Array<string | undefined>): string {
  return classNames.filter((className) => Boolean(className)).join(" ");
}

function getReducedMotionPreference(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function probeBootstrapMode(): Exclude<BootstrapMode, "bootstrapping"> {
  if (getReducedMotionPreference()) {
    return "static";
  }

  try {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });

    if (!context) {
      return "static";
    }

    // This probe runs on client-side navigations, where no parser-time script
    // exists. It must release just like the parser probe above; otherwise many
    // QA contexts eventually exhaust Chromium's finite WebGL context budget.
    try {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      // Keep the capability result. The extension is optional by design.
    }

    return "interactive";
  } catch {
    return "static";
  }
}

function getBootstrapMode(): BootstrapMode {
  if (typeof window === "undefined") {
    // The server must not emit data-intro-frame. The inline parser-time probe
    // writes that observable attribute before DCL, after it can know whether
    // the browser can run the interactive path.
    return "bootstrapping";
  }

  const scriptedMode = window.__STARLAB_BOOTSTRAP_MODE__;
  if (scriptedMode === "interactive" || scriptedMode === "static") {
    return scriptedMode;
  }

  // Client-side navigations have no server parser pass. Make the same
  // capability decision synchronously during the initial render instead of
  // momentarily mounting f0 and correcting it in an effect.
  return probeBootstrapMode();
}

type StaticSceneShellProps = {
  className?: string;
  frame: number;
};

/**
 * Structural counterpart of CircuitScene used before capability selection and
 * for the direct static route. It intentionally never calls getContext(), so
 * reduced-motion and forced-fallback sessions cannot acquire WebGL merely
 * because an invisible canvas was mounted.
 */
function StaticSceneShell({ className, frame }: StaticSceneShellProps) {
  return (
    <div
      className={joinClassNames(sceneStyles.root, className)}
      data-frame-state={frame >= INTRO_FINAL_FRAME ? "terminal" : "active"}
      data-renderer="pending"
    >
      <canvas
        aria-hidden="true"
        className={sceneStyles.canvas}
        data-starlab-scene="circuit"
        data-renderer="pending"
      />
    </div>
  );
}

/**
 * Owns the sole animation clock for the source-video recreation. The visible
 * shader/wordmark frame is capped at 375; QA may still request and observe
 * frames 376–449 to prove that the terminal presentation does not drift.
 */
export function StarlabIntro({
  className,
  mode = "autoplay",
  frame = 0,
}: StarlabIntroProps) {
  const normalizedPropFrame = normalizeRequestedFrame(frame);
  const [bootstrapMode] = useState<BootstrapMode>(getBootstrapMode);
  const [autoplayFrame, setAutoplayFrame] = useState(() =>
    normalizeRequestedFrame(frame),
  );
  const [autoplayStartGate, setAutoplayStartGate] =
    useState<AutoplayStartGate | null>(null);
  const [qaFrame, setQaFrame] = useState<number | null>(null);
  const requestedFrame =
    mode === "fixed" ? (qaFrame ?? normalizedPropFrame) : autoplayFrame;
  const requestedFrameRef = useRef(requestedFrame);
  const autoplayGateVersionRef = useRef(0);
  const [renderer, setRenderer] = useState<IntroRenderer>(() =>
    bootstrapMode === "static" ? "fallback" : "pending",
  );
  const [reducedMotion, setReducedMotion] = useState(getReducedMotionPreference);

  useEffect(() => {
    requestedFrameRef.current = requestedFrame;
  }, [requestedFrame]);

  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(query.matches);
    query.addEventListener("change", updateReducedMotion);

    return () => query.removeEventListener("change", updateReducedMotion);
  }, []);

  const presentation: PresentationMode =
    bootstrapMode === "static" || reducedMotion || renderer === "fallback"
      ? "static"
      : "interactive";
  const effectiveRenderer: IntroRenderer =
    presentation === "static" ? "fallback" : renderer;
  const displayFrame =
    presentation === "static"
      ? INTRO_FINAL_FRAME
      : clampIntroFrame(requestedFrame);
  const inertSceneFrame = clampIntroFrame(requestedFrame);
  const shouldMountCircuitScene =
    bootstrapMode === "interactive" && !reducedMotion;

  useEffect(() => {
    if (
      mode !== "autoplay" ||
      presentation !== "interactive" ||
      renderer !== "webgl"
    ) {
      autoplayGateVersionRef.current += 1;
      return undefined;
    }

    const version = autoplayGateVersionRef.current + 1;
    autoplayGateVersionRef.current = version;
    let lifecycleFrame = 0;
    let lifecycleTask = 0;
    let disposed = false;

    const releaseAfterInitialLifecycle = () => {
      // The production probe becomes eligible at DOMContentLoaded. Do not
      // start the source clock until the initial document lifecycle has
      // crossed load; this rAF also gives a completed client navigation the
      // same explicit browser scheduling boundary.
      lifecycleFrame = window.requestAnimationFrame(() => {
        if (disposed || autoplayGateVersionRef.current !== version) {
          return;
        }

        setAutoplayStartGate({
          initialFrame: requestedFrameRef.current,
          version,
        });
      });
    };

    const handoffAfterInitialLifecycle = () => {
      // Yield one zero-duration task after load so a DCL-triggered external
      // observation can read the committed f0 before this component queues
      // its own rAF. This orders tasks without becoming an animation delay.
      lifecycleTask = window.setTimeout(releaseAfterInitialLifecycle, 0);
    };

    if (document.readyState === "complete") {
      handoffAfterInitialLifecycle();
    } else {
      window.addEventListener("load", handoffAfterInitialLifecycle, {
        once: true,
      });
    }

    return () => {
      disposed = true;
      window.removeEventListener("load", handoffAfterInitialLifecycle);
      window.clearTimeout(lifecycleTask);
      window.cancelAnimationFrame(lifecycleFrame);
    };
  }, [mode, presentation, renderer]);

  useEffect(() => {
    if (
      mode !== "autoplay" ||
      presentation !== "interactive" ||
      renderer !== "webgl" ||
      !autoplayStartGate ||
      autoplayStartGate.version !== autoplayGateVersionRef.current
    ) {
      return undefined;
    }

    let animationFrame = 0;
    let disposed = false;
    let startedAt = 0;
    const initialAutoplayFrame = autoplayStartGate.initialFrame;

    const tick = (now: number) => {
      const nextFrame = Math.min(
        INTRO_FINAL_FRAME,
        Math.floor(((now - startedAt) / 1000) * INTRO_FPS),
      );

      setAutoplayFrame((currentFrame) =>
        currentFrame === nextFrame ? currentFrame : nextFrame,
      );

      if (nextFrame < INTRO_FINAL_FRAME) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    // Establish the source-time origin in its own rAF. The following callback
    // is therefore the first one allowed to advance past the committed frame.
    animationFrame = window.requestAnimationFrame((now) => {
      if (disposed) {
        return;
      }

      startedAt = now - (initialAutoplayFrame / INTRO_FPS) * 1000;
      animationFrame = window.requestAnimationFrame(tick);
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
    };
  }, [autoplayStartGate, mode, presentation, renderer]);

  const setQaControllerFrame = useCallback((nextFrame: number) => {
    setQaFrame(normalizeRequestedFrame(nextFrame));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("qa") !== "1") {
      delete window.__STARLAB_QA__;
      return undefined;
    }

    if (effectiveRenderer === "pending") {
      return undefined;
    }

    delete window.__STARLAB_QA__;
    let firstAnimationFrame = 0;
    let secondAnimationFrame = 0;

    firstAnimationFrame = window.requestAnimationFrame(() => {
      secondAnimationFrame = window.requestAnimationFrame(() => {
        window.__STARLAB_QA__ = {
          setFrame: setQaControllerFrame,
          renderedFrame: requestedFrame,
          renderer: effectiveRenderer,
        };
      });
    });

    return () => {
      window.cancelAnimationFrame(firstAnimationFrame);
      window.cancelAnimationFrame(secondAnimationFrame);
      delete window.__STARLAB_QA__;
    };
  }, [effectiveRenderer, requestedFrame, setQaControllerFrame]);

  useEffect(() => {
    return () => {
      delete window.__STARLAB_QA__;
    };
  }, []);

  return (
    <section
      aria-label="Starlab Technology intro"
      className={joinClassNames(styles.root, className)}
      data-intro-frame={
        bootstrapMode === "bootstrapping" ? undefined : displayFrame
      }
      data-renderer={
        bootstrapMode === "bootstrapping" ? undefined : effectiveRenderer
      }
      data-requested-frame={requestedFrame}
      data-starlab-bootstrap={
        bootstrapMode === "bootstrapping" ? undefined : bootstrapMode
      }
      data-starlab-presentation={
        bootstrapMode === "bootstrapping" ? undefined : presentation
      }
    >
      <div className={styles.stage}>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP_PRESENTATION_SCRIPT }} />
        {shouldMountCircuitScene ? (
          <CircuitScene
            className={styles.scene}
            frame={displayFrame}
            onRendererChange={(nextRenderer) => setRenderer(nextRenderer)}
          />
        ) : (
          <StaticSceneShell className={styles.scene} frame={inertSceneFrame} />
        )}
        <div className={styles.wordmarkLayer}>
          <div className={styles.staticWordmark}>
            <StarLabWordmark frame={INTRO_FINAL_FRAME} />
          </div>
          <div className={styles.interactiveWordmark}>
            <StarLabWordmark frame={inertSceneFrame} />
          </div>
        </div>
      </div>
    </section>
  );
}
