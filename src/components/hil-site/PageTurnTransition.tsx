"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ScreenId } from "@/types/hil-site";
import styles from "./PageTurnTransition.module.css";

type Phase = "idle" | "out" | "in";

export function usePageTurnTransition() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [phase, setPhase] = useState<Phase>("idle");
  const current = useRef<ScreenId>("home");
  const pending = useRef<ScreenId | null>(null);

  function commit(next: ScreenId) {
    current.current = next;
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function navigate(next: ScreenId) {
    // 同步锁覆盖同一事件轮次内的多次请求，也供正文 CTA 使用。
    if (pending.current || next === current.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      commit(next);
      return;
    }
    pending.current = next;
    setPhase("out");
  }

  function completePhase() {
    if (!pending.current) return;
    if (phase === "out") {
      commit(pending.current);
      setPhase("in");
    } else {
      pending.current = null;
      setPhase("idle");
    }
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      if (!media.matches || !pending.current) return;
      current.current = pending.current;
      setScreen(pending.current);
      pending.current = null;
      window.scrollTo({ top: 0, behavior: "instant" });
      setPhase("idle");
    };
    media.addEventListener("change", finish);
    return () => media.removeEventListener("change", finish);
  }, []);

  useEffect(() => {
    if (phase !== "idle") return;
    // 被锁忽略的方向键仍会移动导航焦点；结束时与真正提交的画面对齐。
    if (document.activeElement?.closest("#screen-navigation")) {
      document.querySelector<HTMLButtonElement>(`[data-od-id="nav-${screen}"]`)?.focus({ preventScroll: true });
    }
  }, [phase, screen]);

  return { screen, phase, navigate, completePhase };
}

export function PageTurnTransition({ phase, onComplete, children }: {
  phase: Phase;
  onComplete: () => void;
  children: ReactNode;
}) {
  return <div data-page-transition={phase} className={phase === "idle" ? undefined : styles[phase]}
    inert={phase !== "idle"} aria-hidden={phase !== "idle" ? true : undefined} onAnimationEnd={(event) => {
      if (event.target === event.currentTarget) onComplete();
    }}>{children}</div>;
}
