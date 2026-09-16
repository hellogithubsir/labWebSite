"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ScreenId } from "@/types/hil-site";
import styles from "./PageTurnTransition.module.css";

type Phase = "idle" | "out" | "in";

export type NavigationSource = "desktop" | "mobile" | "content";

export function usePageTurnTransition() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [phase, setPhase] = useState<Phase>("idle");
  const [pendingTarget, setPendingTarget] = useState<ScreenId | null>(null);
  const current = useRef<ScreenId>("home");
  const pending = useRef<{ screen: ScreenId; source: NavigationSource } | null>(null);

  function commit(next: ScreenId) {
    current.current = next;
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function navigate(next: ScreenId, source: NavigationSource = "content") {
    // 同步锁也覆盖同一事件轮次的连续输入；焦点归属于首个接受的请求。
    if (pending.current || next === current.current) return;
    pending.current = { screen: next, source };
    // active rail 与内容区立即对准目标画面，不等过渡完成（按下即确认）。
    setPendingTarget(next);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      commit(next);
      setPendingTarget(null);
      return;
    }
    setPhase("out");
  }

  // 事件驱动：离场动画结束即提交新画面并入场；入场结束回到 idle（FR-011 250ms，无散落定时器）。
  function onTransitionAnimationEnd(direction: "out" | "in") {
    if (!pending.current) return;
    if (direction === "out") {
      commit(pending.current.screen);
      setPhase("in");
    } else if (phase === "in") {
      setPhase("idle");
      setPendingTarget(null);
    }
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      if (!media.matches || !pending.current) return;
      current.current = pending.current.screen;
      setScreen(pending.current.screen);
      window.scrollTo({ top: 0, behavior: "instant" });
      setPhase("idle");
    };
    media.addEventListener("change", finish);
    return () => media.removeEventListener("change", finish);
  }, []);

  useEffect(() => {
    if (phase !== "idle" || !pending.current) return;
    const { source, screen: target } = pending.current;
    pending.current = null;
    const selector = source === "desktop" ? `[data-od-id="nav-${target}"]`
      : source === "mobile" ? '[data-od-id="menu-toggle"]' : "#site-content";
    document.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
  }, [phase, screen]);

  return { screen, phase, navigate, onTransitionAnimationEnd, pendingTarget };
}

export function PageTurnTransition({ phase, onAnimationEnd, children }: {
  phase: Phase;
  onAnimationEnd: (direction: "out" | "in") => void;
  children: ReactNode;
}) {
  return <div data-page-transition={phase} className={phase === "idle" ? undefined : styles[phase]}
    inert={phase !== "idle"} aria-hidden={phase !== "idle" ? true : undefined} onAnimationEnd={(event) => {
      if (event.target === event.currentTarget) onAnimationEnd(phase === "out" ? "out" : "in");
    }}>{children}</div>;
}
