import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-bold uppercase tracking-wide transition-[transform,background-color,box-shadow,color,border-color] duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        yellow:
          "bg-accent text-accent-fg shadow-glow-yellow hover:brightness-110",
        green:
          "bg-green text-green-fg shadow-[0_0_22px_color-mix(in_oklab,var(--color-green)_50%,transparent)] hover:brightness-110",
        outline:
          "border border-fg/80 bg-transparent text-fg hover:bg-fg/10 hover:border-fg",
        ghost: "bg-transparent text-fg hover:text-accent",
        dark: "bg-accent-fg text-accent hover:brightness-125",
      },
      size: {
        sm: "h-10 px-4 text-xs rounded-pill",
        md: "h-12 px-6 text-sm rounded-pill",
        lg: "h-14 px-8 text-sm rounded-pill",
        icon: "size-11 rounded-pill",
      },
    },
    defaultVariants: {
      variant: "yellow",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
