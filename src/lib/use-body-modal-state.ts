"use client";

import * as React from "react";

export const MODAL_STATE_CHANGE_EVENT = "modal-state-change";

let openModalCount = 0;
let previousBodyOverflow: string | null = null;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

function emitModalStateChange() {
  window.dispatchEvent(
    new CustomEvent(MODAL_STATE_CHANGE_EVENT, {
      detail: { isOpen: openModalCount > 0 },
    }),
  );
}

function applyModalState() {
  if (openModalCount > 0) {
    document.body.dataset.modalOpen = "true";
    document.body.style.overflow = "hidden";
    emitModalStateChange();
    return;
  }

  delete document.body.dataset.modalOpen;
  document.body.style.overflow = previousBodyOverflow ?? "";
  previousBodyOverflow = null;
  emitModalStateChange();
}

export function isBodyModalOpen() {
  if (typeof document === "undefined") {
    return false;
  }

  return document.body.dataset.modalOpen === "true";
}

export function useBodyModalState(isOpen: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    if (openModalCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
    }

    openModalCount += 1;
    applyModalState();

    return () => {
      openModalCount = Math.max(0, openModalCount - 1);
      applyModalState();
    };
  }, [isOpen]);
}
