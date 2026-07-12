import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-1.5 text-[10px] leading-none font-semibold uppercase tracking-[.09em] whitespace-nowrap [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        live: "border-[var(--border-success)] bg-[var(--surface-success)] text-[var(--success)]",
        replay: "border-[var(--border-info)] bg-[var(--surface-info)] text-[var(--info)]",
        offline: "border-[var(--border-warning)] bg-[var(--surface-warning)] text-[var(--warning)]",
        neutral: "border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-secondary)]",
        proof: "border-[var(--border-accent)] bg-[var(--surface-accent)] text-[var(--accent-soft)]",
        warning: "border-[var(--border-warning)] bg-[var(--surface-warning)] text-[var(--warning)]",
        success: "border-[var(--border-success)] bg-[var(--surface-success)] text-[var(--success)]",
        danger: "border-[var(--border-danger)] bg-[var(--surface-danger)] text-[var(--danger)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
