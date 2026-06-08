import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:opacity-90",
  secondary: "bg-ink text-paper hover:opacity-90",
  ghost: "bg-transparent text-ink hover:bg-black/5"
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-md px-4 py-2 font-semibold transition ${variantClassMap[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
