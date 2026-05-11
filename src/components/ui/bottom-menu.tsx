"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface MenuBarItem {
  icon: (props: { className?: string }) => React.ReactElement;
  label: string;
  href: string;
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuBarItem[];
}

const tooltipTransition = {
  duration: 0.16,
  ease: "easeOut",
} as const;

const THEME_VIEW_TRANSITION_CLASS = "theme-view-transition";

export function MenuBar({ items, className, ...props }: MenuBarProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pendingScrollTargetRef = React.useRef<"top" | string | null>(null);

  React.useEffect(() => {
    const pendingTarget = pendingScrollTargetRef.current;

    if (!pendingTarget || pathname !== "/") {
      return;
    }

    pendingScrollTargetRef.current = null;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (pendingTarget === "top") {
          window.scrollTo({ top: 0, behavior: "auto" });
          window.history.replaceState(null, "", "/");
          return;
        }

        const target = document.querySelector(pendingTarget);

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", pendingTarget);
        }
      });
    });
  }, [pathname]);

  function handleMenuClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) {
      return;
    }

    document.documentElement.classList.remove(THEME_VIEW_TRANSITION_CLASS);

    if (url.pathname !== window.location.pathname) {
      if (url.pathname === "/" && !url.hash) {
        event.preventDefault();
        pendingScrollTargetRef.current = "top";
        router.push("/", { scroll: false });
        return;
      }

      if (url.pathname === "/" && url.hash) {
        event.preventDefault();
        pendingScrollTargetRef.current = url.hash;
        router.push(`/${url.hash}`, { scroll: false });
      }

      return;
    }

    if (!url.hash) {
      if (url.pathname === "/") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
      }

      return;
    }

    event.preventDefault();

    if (url.hash === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      return;
    }

    const target = document.querySelector(url.hash);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", url.hash);
    }
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <div
        ref={menuRef}
        className={cn(
          "z-10 inline-flex items-center justify-center gap-0.5 overflow-visible rounded-[20px]",
          "border border-black/[0.08] bg-white p-1 shadow-[var(--shadow-toggle)]",
          "dark:border-white/[0.12] dark:bg-[#1B1B1B]",
        )}
      >
        {items.map((item, index) => {
          const content = (
            <>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={tooltipTransition}
                    className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-50 -translate-x-1/2 rounded-full bg-black px-2.5 py-1.5 text-[12px] font-semibold leading-none tracking-[-0.02em] text-white dark:bg-white dark:text-[#111111] dark:shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    "flex size-[21px] items-center justify-center overflow-hidden transition-colors",
                    "text-[#5f5f5f] group-hover:text-black dark:text-white/58 dark:group-hover:text-white/86",
                  )}
                >
                  <item.icon className="size-full" />
                </div>
              </div>
              <span className="sr-only">{item.label}</span>
            </>
          );

          const itemClassName = cn(
            "group relative flex h-[36px] w-[52px] items-center justify-center",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "border border-black/[0.08] bg-white text-black transition-colors hover:bg-[#f6f6f6]",
            "dark:border-white/[0.1] dark:bg-[#202020] dark:text-white/76 dark:hover:bg-[#262626]",
            index === 0
              ? "rounded-l-[17px] rounded-r-[9px]"
              : index === items.length - 1
                ? "rounded-l-[9px] rounded-r-[17px]"
                : "rounded-[9px]",
          );

          return (
            <a
              key={item.label}
              href={item.href}
              className={itemClassName}
              onClick={(event) => handleMenuClick(event, item.href)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}
