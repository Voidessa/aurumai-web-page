import * as React from "react"
import { cn } from "../../lib/utils"

const buttonVariants = (variant: string = "default", className?: string) => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants: Record<string, string> = {
    default: "bg-fg text-bg hover:bg-accent",
    outline: "border border-glass-border bg-transparent hover:bg-fg/10 hover:text-fg",
    secondary: "bg-fg/10 text-fg hover:bg-fg/20",
    ghost: "hover:bg-fg/10 hover:text-fg",
    link: "text-fg underline-offset-4 hover:underline",
  }
  
  return cn(base, variants[variant] || variants.default, className)
}

export { buttonVariants }

