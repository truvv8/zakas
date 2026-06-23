import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Кнопки в «модный дом» эстетике: квадратные, с разрядкой капсом.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[13px] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        accent: "bg-accent text-ivory hover:bg-accent-deep",
        ink: "bg-ink text-ivory hover:bg-accent",
        outline: "border border-line-strong text-ink hover:bg-bone",
        ghost: "text-ink-soft hover:text-ink",
      },
      size: {
        default: "px-7 py-4",
        lg: "px-9 py-5",
        sm: "px-5 py-2.5",
      },
    },
    defaultVariants: { variant: "accent", size: "default" },
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
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
