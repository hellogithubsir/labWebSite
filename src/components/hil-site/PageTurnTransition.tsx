"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ScreenId } from "@/types/hil-site";
import styles from "./PageTurnTransition.module.css";

type Phase = "idle" | "out" | "in";

export type NavigationSource = "desktop" | "mobile" | "content";

export function usePageTurnTransition() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [phase, setPhase] = useState<Phase>("idle");
  const current = useRef<ScreenId>("home");
  const pending = useRef<{ screen: ScreenId; source: NavigationSource } | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function commit(next: ScreenId) {
    current.current = next;
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function navigate(next: ScreenId, source: NavigationSource = "content") {
    // 同步锁也覆盖同一事件轮次的连续输入；焦点归属于首个接受的请求。
    if (pending.current || next === current.current) return;
    pending.current = { screen: next, source };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      commit(next);
      return;
    }
    setPhase("out");
    // 参考站在离场淡出结束前提交；唯一计时器负责这个明确的 700ms 边界。
    leaveTimer.current = setTimeout(() => {
      leaveTimer.current = null;
      commit(next);
      setPhase("in");
    }, 700);
  }

  function completePhase() {
    if (phase === "in" && pending.current) setPhase("idle");
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      if (!media.matches || !pending.current) return;
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
      current.current = pending.current.screen;
      setScreen(pending.current.screen);
      window.scrollTo({ top: 0, behavior: "instant" });
      setPhase("idle");
    };
    media.addEventListener("change", finish);
    return () => {
      media.removeEventListener("change", finish);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "idle" || !pending.current) return;
    const { source, screen: target } = pending.current;
    pending.current = null;
    const selector = source === "desktop" ? `[data-od-id="nav-${target}"]`
      : source === "mobile" ? '[data-od-id="menu-toggle"]' : "#site-content";
    document.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
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
