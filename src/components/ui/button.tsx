import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        bronze:
          "bg-bronze text-white border border-bronze hover:bg-transparent hover:text-bone",
        ghost:
          "border border-line-strong text-bone hover:border-bone hover:bg-bone hover:text-white",
        glass:
          "glass text-bone hover:border-bone/40",
      },
      size: {
        default: "px-7 py-3.5",
        lg: "px-9 py-4",
        sm: "px-5 py-2.5",
      },
    },
    defaultVariants: { variant: "bronze", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
