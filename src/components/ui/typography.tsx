import * as React from "react";
import { cn } from "@/lib/utils";

export function H1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-display text-[29px] font-medium leading-[1.26] tracking-[-0.036em] text-balance sm:text-[34px]",
        className,
      )}
      {...props}
    />
  );
}

export function H2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 font-display text-[21px] font-medium leading-[1.2] tracking-[-0.03em] text-balance",
        className,
      )}
      {...props}
    />
  );
}

export function H3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-display text-[18px] font-medium leading-tight tracking-[-0.028em]",
        className,
      )}
      {...props}
    />
  );
}

export function P({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[16px] leading-7 tracking-[-0.01em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[16px] font-normal leading-[1.66] tracking-[-0.008em] text-muted-foreground sm:text-[17px]",
        className,
      )}
      {...props}
    />
  );
}

export function Large({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-[14px] font-medium leading-none tracking-[-0.015em]",
        className,
      )}
      {...props}
    />
  );
}

export function Small({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-normal leading-none", className)}
      {...props}
    />
  );
}

export function Muted({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[13px] font-medium leading-5 tracking-[-0.005em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
