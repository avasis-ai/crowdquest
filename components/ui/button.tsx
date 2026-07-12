import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all outline-none disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-[var(--lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        signal:
          "rounded-[11px] border border-transparent bg-[var(--lime)] text-[var(--ink)] shadow-[0_8px_28px_rgba(202,255,98,.12)] hover:bg-[#dcff95]",
        panel:
          "rounded-[11px] border border-[var(--line-strong)] bg-white/[.025] text-[var(--text)] hover:border-[rgba(202,255,98,.32)] hover:bg-white/[.045]",
        ghost:
          "rounded-[9px] border border-transparent text-[var(--muted)] hover:bg-white/[.04] hover:text-[var(--text)]",
        danger:
          "rounded-[11px] border border-[rgba(255,125,120,.22)] bg-[rgba(255,125,120,.08)] text-[var(--red)] hover:bg-[rgba(255,125,120,.14)]",
      },
      size: {
        sm: "h-8 px-3 text-[9px] [&_svg]:size-3",
        md: "h-10 px-4 text-[10px] [&_svg]:size-[13px]",
        lg: "h-11 px-5 text-[11px] [&_svg]:size-4",
        icon: "size-9 rounded-xl p-0 [&_svg]:size-4",
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
