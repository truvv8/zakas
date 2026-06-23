import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-medium",
  {
    variants: {
      variant: {
        accent: "text-accent",
        soft: "bg-accent/10 px-3 py-1 text-accent",
        outline: "border border-line-strong px-3 py-1 text-ink-soft",
      },
    },
    defaultVariants: { variant: "accent" },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
