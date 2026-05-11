"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type TOCItemType = {
  title: ReactNode;
  url: string;
  depth: number;
};

export type TOCMinimapProps = {
  /** @fumadocsHref #tocitemtype */
  items: TOCItemType[];
  className?: string;
  ariaLabel?: string;
};

export function TOCMinimap({
  items,
  className,
  ariaLabel = "Page sections",
}: TOCMinimapProps) {
  const itemIds = useMemo(
    () => items.map((item) => item.url.replace("#", "")),
    [items],
  );

  const [activeHeading, setActiveHeading] = useActiveHeading(itemIds);
  const [isPointerOpen, setIsPointerOpen] = useState(false);
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const pointerActivatedRef = useRef(false);
  const isOpen = isPointerOpen || isFocusOpen;

  if (!items.length) {
    return null;
  }

  return (
    <nav
      aria-label={ariaLabel}
      onPointerEnter={() => setIsPointerOpen(true)}
      onPointerLeave={() => setIsPointerOpen(false)}
      onFocusCapture={() => setIsFocusOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocusOpen(false);
        }
      }}
      className={cn(
        "w-18 transition-[width] duration-200 ease-out motion-reduce:transition-none",
        isOpen && "w-56",
        className,
      )}
    >
      <div className="flex flex-col items-end gap-2.5">
        {items.map((item, index) => {
          const id = item.url.replace("#", "");
          const isActive = id === activeHeading;
          const label =
            typeof item.title === "string" ? item.title : `Section ${index + 1}`;

          return (
            <a
              key={item.url}
              href={item.url}
              aria-label={`Jump to ${label}`}
              aria-current={isActive ? "location" : undefined}
              data-depth={item.depth}
              onPointerDown={() => {
                pointerActivatedRef.current = true;
              }}
              onClick={(event) => {
                handleItemClick(event);
                setActiveHeading(id);
                if (pointerActivatedRef.current) {
                  setIsPointerOpen(false);
                  setIsFocusOpen(false);
                  event.currentTarget.blur();
                }
                pointerActivatedRef.current = false;
              }}
              className="group/item relative flex h-5 w-full items-center justify-end rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/18 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:focus-visible:ring-white/24"
            >
              <span
                className={cn(
                  "pointer-events-none absolute right-12 max-w-44 translate-x-1 overflow-hidden whitespace-nowrap text-right text-[12px] font-medium tracking-[-0.01em] text-black/0 opacity-0 transition-[opacity,transform,color] duration-200 ease-out motion-reduce:transition-none dark:text-white/0",
                  isOpen &&
                    "translate-x-0 text-black/48 opacity-100 group-hover/item:text-black/70 dark:text-white/50 dark:group-hover/item:text-white/72",
                  isOpen && isActive && "text-black/78 dark:text-white/82",
                )}
              >
                {item.title}
              </span>
              <span
                data-active={isActive}
                className={cn(
                  "block h-px w-4 shrink-0 rounded-full bg-black/24 transition-[width,height,background-color] duration-200 ease-out group-hover/item:bg-black/44 motion-reduce:transition-none dark:bg-white/24 dark:group-hover/item:bg-white/46",
                  "group-data-[depth=3]/item:w-3 group-data-[depth=4]/item:w-2",
                  isActive && "h-[2px] w-9 bg-black/80 dark:bg-white/84",
                )}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(itemIds[0] ?? null);

  useEffect(() => {
    if (itemIds.length === 0) {
      return;
    }

    let animationFrameId: number | null = null;

    const updateActiveHeading = () => {
      const documentElement = document.documentElement;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScrollY = Math.max(
        0,
        documentElement.scrollHeight - viewportHeight,
      );
      const distanceFromBottom =
        documentElement.scrollHeight - (scrollY + viewportHeight);
      const bottomThreshold = Math.max(96, viewportHeight * 0.22);
      const sectionPositions = itemIds
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) {
            return null;
          }

          return {
            id,
            top: element.getBoundingClientRect().top + scrollY,
          };
        })
        .filter((section): section is { id: string; top: number } =>
          Boolean(section),
        );

      if (sectionPositions.length === 0) {
        setActiveId(itemIds[0] ?? null);
        return;
      }

      const firstSection = sectionPositions[0];
      const pageTopThreshold = Math.max(
        24,
        Math.min(firstSection.top, viewportHeight * 0.18),
      );

      if (scrollY <= pageTopThreshold) {
        setActiveId(firstSection.id);
        return;
      }

      if (distanceFromBottom <= bottomThreshold || scrollY >= maxScrollY - 1) {
        setActiveId(sectionPositions[sectionPositions.length - 1]?.id ?? itemIds[0]);
        return;
      }

      const viewportAnchor = scrollY + viewportHeight * 0.4;
      const currentHeading =
        sectionPositions.reduce((current, section, index) => {
          const previousSection = sectionPositions[index - 1];
          const activationPoint = previousSection
            ? previousSection.top + (section.top - previousSection.top) / 2
            : Number.NEGATIVE_INFINITY;

          return viewportAnchor >= activationPoint
            ? section.id
            : current;
        }, sectionPositions[0]?.id ?? itemIds[0]) || itemIds[0];

      if (currentHeading) {
        setActiveId(currentHeading);
      }
    };

    const scheduleActiveHeadingUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateActiveHeading();
      });
    };

    scheduleActiveHeadingUpdate();
    window.addEventListener("scroll", scheduleActiveHeadingUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleActiveHeadingUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", scheduleActiveHeadingUpdate);
      window.removeEventListener("resize", scheduleActiveHeadingUpdate);
    };
  }, [itemIds]);

  return [activeId, setActiveId] as const;
}

function handleItemClick(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  scrollToHeading(event.currentTarget.getAttribute("href") ?? "");
}

function scrollToHeading(url: string) {
  const id = url.replace("#", "");

  if (!id) {
    return;
  }

  history.pushState(null, "", `#${id}`);
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
