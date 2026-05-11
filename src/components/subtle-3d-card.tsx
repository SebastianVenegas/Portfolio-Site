"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface Subtle3DCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Subtle3DCard({
  children,
  className,
  ...props
}: Subtle3DCardProps) {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 3.5;
    const rotateX = ((0.5 - y / rect.height) * 3.5);

    setRotation({ x: rotateX, y: rotateY });
  }

  function handleMouseLeave() {
    setRotation({ x: 0, y: 0 });
  }

  return (
    <div
      className={cn("[perspective:1200px]", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className="h-full transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(${rotation.x || rotation.y ? "-2px" : "0"})`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
