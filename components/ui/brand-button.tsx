import * as React from "react"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const brandButtonVariants = cva(
  "",
  {
    variants: {
      variant: {
        brand: "bg-[hsl(var(--color-brand))] text-white hover:bg-[hsl(196,60%,50%)]",
        "brand-alt": "bg-[hsl(var(--color-brand-alt))] text-white hover:bg-[hsl(197,60%,50%)]",
        "brand-outline": "border border-[hsl(var(--color-brand))] text-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand))]/10",
        "brand-ghost": "text-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand))]/10",
      },
    },
  }
)

export interface BrandButtonProps extends ButtonProps {
  variant?: "brand" | "brand-alt" | "brand-outline" | "brand-ghost" | ButtonProps["variant"]
}

/**
 * BrandButton extends shadcn Button with RNPL brand color variants
 * 
 * @example
 * <BrandButton variant="brand">Create New File</BrandButton>
 * <BrandButton variant="brand-outline">Cancel</BrandButton>
 */
const BrandButton = React.forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ className, variant, ...props }, ref) => {
    // If it's a brand variant, apply brand styles
    if (variant && ["brand", "brand-alt", "brand-outline", "brand-ghost"].includes(variant)) {
      return (
        <Button
          ref={ref}
          className={cn(brandButtonVariants({ variant }), className)}
          {...props}
        />
      )
    }
    
    // Otherwise, pass through to shadcn Button with original variant
    return (
      <Button
        ref={ref}
        variant={variant as ButtonProps["variant"]}
        className={className}
        {...props}
      />
    )
  }
)
BrandButton.displayName = "BrandButton"

export { BrandButton, brandButtonVariants }

