"use client";

import { TOCMinimap, type TOCItemType } from "@/components/toc-minimap";

export type SectionProgressItem = {
  id: string;
  label: string;
};

type SectionProgressNavProps = {
  sections: SectionProgressItem[];
};

export function SectionProgressNav({ sections }: SectionProgressNavProps) {
  const items: TOCItemType[] = sections.map((section) => ({
    title: section.label,
    url: `#${section.id}`,
    depth: 2,
  }));

  if (sections.length === 0) {
    return null;
  }

  return (
    <TOCMinimap
      items={items}
      ariaLabel="Case study sections"
      className="fixed right-7 top-[46%] z-40 hidden -translate-y-1/2 lg:block xl:right-10"
    />
  );
}
