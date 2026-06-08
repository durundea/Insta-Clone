import type { HTMLAttributes } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
}

const sizeClassMap: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]"
};

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-accent border-r-transparent ${sizeClassMap[size]} ${className ?? ""}`}
      {...props}
    />
  );
}
