import type { InputHTMLAttributes } from "react";

export type InputVariant = "outline" | "filled";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

const variantClassMap: Record<InputVariant, string> = {
  outline: "border border-ink/30 bg-white",
  filled: "border border-transparent bg-ink/10"
};

export function Input({ variant = "outline", className, ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md px-3 py-2 text-sm text-ink placeholder:text-ink/60 focus:outline-none focus:ring-2 focus:ring-accent/50 ${variantClassMap[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
