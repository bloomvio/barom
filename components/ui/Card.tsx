import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "panel";
  brackets?: boolean;
}

export function Card({
  className,
  variant = "default",
  brackets = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative",
        {
          "bg-surface border border-border rounded-none p-6": variant === "default",
          "bg-surface-2 border border-border-strong rounded-none p-6":
            variant === "elevated",
          "bg-surface border border-border-strong rounded-none p-8":
            variant === "panel",
        },
        brackets && "corner-bracket",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("font-fraunces text-xl font-medium text-text", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
