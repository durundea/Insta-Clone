import type { ImgHTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize;
}

const sizeClassMap: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14"
};

export function Avatar({ size = "md", className, alt = "User avatar", ...props }: AvatarProps) {
  return (
    <img
      alt={alt}
      className={`rounded-full object-cover ${sizeClassMap[size]} ${className ?? ""}`}
      {...props}
    />
  );
}
