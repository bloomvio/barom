import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 70"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      aria-label="Barom logo — The Dial"
      width={size}
      height={size * (70 / 120)}
      className={cn("text-amber", className)}
    >
      <path
        d="M 12 58 A 48 48 0 0 1 108 58"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line x1="12" y1="58" x2="16" y2="53" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="10" x2="60" y2="16" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="108" y1="58" x2="104" y2="53" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="58" x2="91" y2="27" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="58" r="5" fill="currentColor" stroke="none" />
    </svg>
  );
}
