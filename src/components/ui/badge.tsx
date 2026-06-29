import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-medium",
  {
    variants: {
      variant: {
        bronze: "text-bronze",
        soft: "glass px-3 py-1 text-bronze",
        outline: "border-[0.5px] border-line-strong px-3 py-1 text-muted",
        emerald: "text-emerald-400",
      },
    },
    defaultVariants: { variant: "bronze" },
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
