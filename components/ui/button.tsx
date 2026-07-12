import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,border-color,color,box-shadow,transform] outline-none disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        signal:
          "rounded-[var(--radius-control)] border border-transparent bg-[var(--signal)] text-[var(--signal-ink)] shadow-[var(--shadow-signal)] hover:bg-[var(--signal-hover)]",
        panel:
          "rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface-raised)] text-[var(--text-primary)] hover:border-[var(--border-signal)] hover:bg-[var(--surface-hover)]",
        ghost:
          "rounded-[var(--radius-control)] border border-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]",
        danger:
          "rounded-[var(--radius-control)] border border-[var(--border-danger)] bg-[var(--surface-danger)] text-[var(--danger)] hover:bg-[var(--surface-danger-strong)]",
      },
      size: {
        sm: "h-10 px-4 text-xs [&_svg]:size-3.5",
        md: "h-11 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-sm [&_svg]:size-4",
        icon: "size-11 rounded-[var(--radius-control)] p-0 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: { variant: "signal", size: "md" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
