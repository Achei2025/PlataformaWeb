import * as React from "react"
import { cn } from "../../lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b border-gray-200", className)}
    {...props}
  />
))
Separator.displayName = "Separator"

export { Separator }