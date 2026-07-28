"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export type PrimarySection = "Research" | "News" | "Inside the lab";

const SECTION_TRANSITION_MS = 300;
const NAVIGATION_RECOVERY_MS = SECTION_TRANSITION_MS + 4_000;

type PendingSectionNavigation = {
  href: string;
  section: PrimarySection;
};

type SectionNavigationTransitionValue = {
  activeSection: PrimarySection | null;
  isSectionRouteTransition: boolean;
  navigateSection: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    section: PrimarySection,
  ) => void;
  navigateSectionByKeyboard: (
    event: KeyboardEvent<HTMLAnchorElement>,
    href: string,
    section: PrimarySection,
  ) => void;
};

const SectionNavigationTransitionContext =
  createContext<SectionNavigationTransitionValue | null>(null);

function sectionForPathname(pathname: string): PrimarySection | null {
  if (pathname === "/research" || pathname.startsWith("/research/")) {
    return "Research";
  }

  if (pathname === "/news" || pathname.startsWith("/news/")) {
    return "News";
  }

  if (pathname === "/about" || pathname.startsWith("/about/")) {
    return "Inside the lab";
  }

  return null;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SectionNavigationTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingNavigation, setPendingNavigation] =
    useState<PendingSectionNavigation | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const recoveryTimerRef = useRef<number | null>(null);

  const clearNavigationTimers = useCallback(() => {
    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }

    if (recoveryTimerRef.current !== null) {
      window.clearTimeout(recoveryTimerRef.current);
      recoveryTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearNavigationTimers, [clearNavigationTimers]);

  const startSectionNavigation = useCallback(
    (href: string, section: PrimarySection) => {
      if (pathname === href) {
        return;
      }

      clearNavigationTimers();

      if (prefersReducedMotion() || sectionForPathname(pathname) === section) {
        setPendingNavigation(null);
        router.push(href);
        return;
      }

      setPendingNavigation({ href, section });
      navigationTimerRef.current = window.setTimeout(() => {
        navigationTimerRef.current = null;
        router.push(href);
      }, SECTION_TRANSITION_MS);
      recoveryTimerRef.current = window.setTimeout(() => {
        recoveryTimerRef.current = null;
        setPendingNavigation((current) =>
          current?.href === href ? null : current,
        );
      }, NAVIGATION_RECOVERY_MS);
    },
    [clearNavigationTimers, pathname, router],
  );

  const navigateSection = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement>,
      href: string,
      section: PrimarySection,
    ) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      startSectionNavigation(href, section);
    },
    [startSectionNavigation],
  );

  const navigateSectionByKeyboard = useCallback(
    (
      event: KeyboardEvent<HTMLAnchorElement>,
      href: string,
      section: PrimarySection,
    ) => {
      if (
        event.defaultPrevented ||
        event.key !== "Enter" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      startSectionNavigation(href, section);
    },
    [startSectionNavigation],
  );

  const isSectionRouteTransition = pendingNavigation?.href === pathname;

  useEffect(() => {
    if (!isSectionRouteTransition) {
      return;
    }

    clearNavigationTimers();
    const entryTimer = window.setTimeout(() => {
      setPendingNavigation(null);
    }, SECTION_TRANSITION_MS);

    return () => {
      window.clearTimeout(entryTimer);
    };
  }, [clearNavigationTimers, isSectionRouteTransition]);

  const value = useMemo<SectionNavigationTransitionValue>(
    () => ({
      activeSection: pendingNavigation?.section ?? sectionForPathname(pathname),
      isSectionRouteTransition,
      navigateSection,
      navigateSectionByKeyboard,
    }),
    [
      isSectionRouteTransition,
      navigateSection,
      navigateSectionByKeyboard,
      pathname,
      pendingNavigation,
    ],
  );

  return (
    <SectionNavigationTransitionContext.Provider value={value}>
      {children}
    </SectionNavigationTransitionContext.Provider>
  );
}

export function useSectionNavigationTransition() {
  const context = useContext(SectionNavigationTransitionContext);

  if (!context) {
    throw new Error(
      "useSectionNavigationTransition must be used inside its provider.",
    );
  }

  return context;
}

export function SectionRouteContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isSectionRouteTransition } = useSectionNavigationTransition();

  return (
    <div
      id="content"
      key={pathname}
      className={`page-section--main section-route-content${
        isSectionRouteTransition ? " section-route-content--enter" : ""
      }`}
    >
      {children}
    </div>
  );
}
