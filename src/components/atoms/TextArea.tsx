import type { TextareaHTMLAttributes } from "react";

export type TextAreaVariant = "outline" | "filled";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextAreaVariant;
}

const variantClassMap: Record<TextAreaVariant, string> = {
  outline: "border border-ink/30 bg-white",
  filled: "border border-transparent bg-ink/10"
};

export function TextArea({ variant = "outline", className, rows = 3, ...props }: TextAreaProps) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-md px-3 py-2 text-sm text-ink placeholder:text-ink/60 focus:outline-none focus:ring-2 focus:ring-accent/50 ${variantClassMap[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
