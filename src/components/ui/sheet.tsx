"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <div>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => onOpenChange?.(false)}
        />
      )}
    </div>
  )
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(className)}
    {...props}
  >
    {children}
  </button>
))
SheetTrigger.displayName = "SheetTrigger"

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
        {
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm": side === "right",
          "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm": side === "left",
          "inset-x-0 top-0 border-b": side === "top",
          "inset-x-0 bottom-0 border-t": side === "bottom",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }
