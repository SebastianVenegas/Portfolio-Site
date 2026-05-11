"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import { useBodyModalState } from "@/lib/use-body-modal-state";

interface ProjectImageCarouselProps {
  images: readonly string[];
  title: string;
}

export function ProjectImageCarousel({
  images,
  title,
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);
  const [viewerDirection, setViewerDirection] = React.useState(0);
  const [viewerLayoutId, setViewerLayoutId] = React.useState<string | null>(null);
  const hasMultipleImages = images.length > 1;
  const activeImageLayoutId = getImageLayoutId(title, activeIndex);
  const fullscreenLayoutId = viewerLayoutId ?? activeImageLayoutId;

  useBodyModalState(isViewerOpen);

  React.useEffect(() => {
    if (!isViewerOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsViewerOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewerOpen]);

  function showPrevious() {
    setDirection(-1);
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNext() {
    setDirection(1);
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  function showImage(index: number) {
    if (index === activeIndex) {
      return;
    }

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function openViewer() {
    setViewerLayoutId(activeImageLayoutId);
    setViewerIndex(activeIndex);
    setViewerDirection(0);
    setIsViewerOpen(true);
  }

  function closeViewer() {
    setIsViewerOpen(false);
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closeViewer();
    }
  }

  function stopViewerEvent(event: React.SyntheticEvent) {
    event.stopPropagation();
  }

  function showViewerPrevious() {
    setViewerDirection(-1);
    setViewerIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showViewerNext() {
    setViewerDirection(1);
    setViewerIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  function handleFullscreenPrevious(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showViewerPrevious();
  }

  function handleFullscreenNext(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showViewerNext();
  }

  function handleCloseViewer(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    closeViewer();
  }

  return (
    <>
      <div className="space-y-3">
        <div className="relative aspect-[1.6/1] overflow-hidden rounded-[22px] border border-transparent bg-[#F5F6FA] dark:border-white/[0.09] dark:bg-[#1B1B1B]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={images[activeIndex]}
              layoutId={activeImageLayoutId}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 12 : -12, scale: 1.006 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction >= 0 ? -12 : 12, scale: 0.998 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <button
                type="button"
                aria-label={`Open ${title} project visual ${activeIndex + 1} fullscreen`}
                onClick={openViewer}
                className="group/image absolute inset-0 cursor-pointer focus:outline-none"
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${title} project visual ${activeIndex + 1}`}
                  fill
                  draggable={false}
                  sizes="(min-width: 768px) 704px, calc(100vw - 72px)"
                  className="size-full select-none object-contain [-webkit-user-drag:none]"
                  priority
                />
              </button>
            </motion.div>
          </AnimatePresence>

          {hasMultipleImages && (
            <div className="pointer-events-none absolute inset-y-0 left-4 right-4 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous image"
                onClick={showPrevious}
                className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/85 text-black/58 backdrop-blur-sm transition hover:bg-white hover:text-black dark:border-white/[0.12] dark:bg-[#202020] dark:text-white/62 dark:hover:bg-[#262626] dark:hover:text-white/88"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={showNext}
                className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/85 text-black/58 backdrop-blur-sm transition hover:bg-white hover:text-black dark:border-white/[0.12] dark:bg-[#202020] dark:text-white/62 dark:hover:bg-[#262626] dark:hover:text-white/88"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          )}
        </div>

        {hasMultipleImages && (
          <div className="flex justify-center gap-1.5">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={() => showImage(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-5 bg-black/55 dark:bg-white/58"
                    : "w-1.5 bg-black/18 hover:bg-black/32 dark:bg-white/18 dark:hover:bg-white/34"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            aria-modal="true"
            aria-label={`${title} fullscreen project visual`}
            role="dialog"
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#FAFAFA]/90 p-4 backdrop-blur-md dark:bg-[#161616]/92"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleBackdropClick}
          >
            <motion.div
              layoutId={fullscreenLayoutId}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[1.6/1] w-[min(90vw,1100px,calc(160dvh-51px))] overflow-hidden rounded-[22px] border border-transparent bg-[#F5F6FA] shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:border-white/[0.09] dark:bg-[#1B1B1B] dark:shadow-[0_28px_90px_rgba(0,0,0,0.42)]"
              onPointerDown={stopViewerEvent}
              onClick={stopViewerEvent}
            >
              <AnimatePresence initial={false} custom={viewerDirection}>
                <motion.div
                  key={images[viewerIndex]}
                  custom={viewerDirection}
                  initial={{
                    opacity: 0,
                    x: viewerDirection >= 0 ? 14 : -14,
                    scale: 1.004,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: viewerDirection >= 0 ? -14 : 14,
                    scale: 0.998,
                  }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[viewerIndex]}
                    alt={`${title} project visual ${viewerIndex + 1}`}
                    fill
                    draggable={false}
                    sizes="(min-width: 1220px) 1100px, 90vw"
                    className="size-full select-none object-contain [-webkit-user-drag:none]"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                aria-label="Close fullscreen image"
                onPointerDown={stopViewerEvent}
                onClick={handleCloseViewer}
                className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full border border-black/[0.08] bg-white/85 text-black/48 backdrop-blur-sm transition hover:bg-white hover:text-black/76 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[0.12] dark:bg-[#202020]/88 dark:text-white/52 dark:hover:bg-[#262626] dark:hover:text-white/86"
              >
                <CloseIcon />
              </button>

              {hasMultipleImages && (
                <div className="pointer-events-none absolute inset-y-0 left-4 right-4 flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Previous fullscreen image"
                    onPointerDown={stopViewerEvent}
                    onClick={handleFullscreenPrevious}
                    className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/85 text-black/58 backdrop-blur-sm transition hover:bg-white hover:text-black dark:border-white/[0.12] dark:bg-[#202020]/88 dark:text-white/62 dark:hover:bg-[#262626] dark:hover:text-white/88"
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next fullscreen image"
                    onPointerDown={stopViewerEvent}
                    onClick={handleFullscreenNext}
                    className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/85 text-black/58 backdrop-blur-sm transition hover:bg-white hover:text-black dark:border-white/[0.12] dark:bg-[#202020]/88 dark:text-white/62 dark:hover:bg-[#262626] dark:hover:text-white/88"
                  >
                    <ArrowIcon direction="right" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M4.25 4.25 11.75 11.75M11.75 4.25 4.25 11.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function getImageLayoutId(title: string, index: number) {
  return `project-image-${title}-${index}`;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
      <path
        d={direction === "left" ? "M10 3.75 5.75 8 10 12.25" : "M6 3.75 10.25 8 6 12.25"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
