import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2 py-1 text-[8px] font-semibold uppercase tracking-[.1em] whitespace-nowrap [&_svg]:size-3",
  {
    variants: {
      variant: {
        live: "border-[rgba(202,255,98,.18)] bg-[rgba(202,255,98,.07)] text-[var(--lime)]",
        neutral: "border-[var(--line)] bg-white/[.025] text-[var(--muted)]",
        proof: "border-[rgba(169,139,255,.18)] bg-[rgba(169,139,255,.08)] text-[var(--violet)]",
        warning: "border-[rgba(255,189,105,.2)] bg-[rgba(255,189,105,.08)] text-[var(--amber)]",
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
