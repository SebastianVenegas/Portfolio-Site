"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished?: Promise<void>;
  };
};

type ThemeName = "light" | "dark";
const THEME_VIEW_TRANSITION_CLASS = "theme-view-transition";

function getDocumentTheme(): ThemeName | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function isSafariBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const { userAgent, vendor } = navigator;

  return (
    /Safari/i.test(userAgent) &&
    /Apple Computer/i.test(vendor) &&
    !/(CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Chromium|Android)/i.test(userAgent)
  );
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getThemeName(theme: string | undefined): ThemeName | undefined {
  return theme === "light" || theme === "dark" ? theme : undefined;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme =
    getThemeName(resolvedTheme) ?? getDocumentTheme() ?? "light";
  const isDark = currentTheme === "dark";

  React.useEffect(() => {
    const root = document.documentElement;

    function clearThemeViewTransition() {
      root.classList.remove(THEME_VIEW_TRANSITION_CLASS);
    }

    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");

      if (!anchor) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);

      if (url.origin === window.location.origin) {
        clearThemeViewTransition();
      }
    }

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("pagehide", clearThemeViewTransition);
    window.addEventListener("popstate", clearThemeViewTransition);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("pagehide", clearThemeViewTransition);
      window.removeEventListener("popstate", clearThemeViewTransition);
    };
  }, []);

  function switchTheme(theme: "light" | "dark") {
    setTheme(theme);
  }

  function handleToggle() {
    const activeTheme = getDocumentTheme() ?? currentTheme;
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const startViewTransition = (document as ViewTransitionDocument)
      .startViewTransition;

    if (
      typeof startViewTransition === "function" &&
      !isSafariBrowser() &&
      !prefersReducedMotion()
    ) {
      root.classList.add(THEME_VIEW_TRANSITION_CLASS);
      const transition = startViewTransition.call(document, () =>
        switchTheme(nextTheme),
      );
      (transition.finished ?? transition.ready).finally(() => {
        root.classList.remove(THEME_VIEW_TRANSITION_CLASS);
      });
      return;
    }

    switchTheme(nextTheme);
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      suppressHydrationWarning
      onClick={handleToggle}
      className={cn(
        "relative grid size-[42px] shrink-0 place-items-center overflow-hidden rounded-full border border-black/[0.08] bg-white text-[#5f5f5f] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "dark:border-white/[0.1] dark:bg-[#202020] dark:text-white/58 dark:hover:bg-[#262626] dark:hover:text-white/86",
        className,
      )}
    >
      <span className="relative z-10 grid size-[22px] place-items-center overflow-hidden">
        <HugeiconsIcon
          aria-hidden="true"
          icon={Sun03Icon}
          size={20}
          strokeWidth={1.85}
          absoluteStrokeWidth
          className="absolute translate-y-0 rotate-0 opacity-100 dark:translate-y-5 dark:rotate-90 dark:opacity-0"
        />
        <HugeiconsIcon
          aria-hidden="true"
          icon={Moon02Icon}
          size={20}
          strokeWidth={1.85}
          absoluteStrokeWidth
          className="absolute -translate-y-5 -rotate-90 opacity-0 dark:translate-y-0 dark:rotate-0 dark:opacity-100"
        />
      </span>
    </button>
  );
}
