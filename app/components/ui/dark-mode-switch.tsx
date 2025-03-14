/*
 * Achei: Stolen Object Tracking System.
 * Copyright (C) 2025  Team Achei
 * 
 * This file is part of Achei.
 * 
 * Achei is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Achei is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Achei.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * Contact information: teamachei.2024@gmail.com
*/

"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/app/lib/utils"

const DarkModeSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[2em] w-[3.5em] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#522ba7] data-[state=unchecked]:bg-[#28096b]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none relative block h-[1.4em] w-[1.4em] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.5em] data-[state=unchecked]:translate-x-0",
        "after:absolute after:content-[''] after:top-0 after:left-0 after:h-full after:w-full after:rounded-full after:bg-background",
        "before:absolute before:content-[''] before:top-0 before:left-0 before:h-full before:w-full before:rounded-full before:shadow-[inset_8px_-4px_0px_0px_#fff000] data-[state=checked]:before:shadow-[inset_15px_-4px_0px_15px_#fff000]"
      )}
    />
  </SwitchPrimitives.Root>
))
DarkModeSwitch.displayName = SwitchPrimitives.Root.displayName

export { DarkModeSwitch }
