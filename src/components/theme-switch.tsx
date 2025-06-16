import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Moon, Sun } from "lucide-react"
import { useContext } from "react"

import { cn } from "@/lib/utils"
import { ThemeContext, type ThemeContextType } from "@/contexts/theme-context"

type ThemeSwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  "checked" | "onCheckedChange" | "defaultChecked"
>

function ThemeSwitch({
  className,
  ...props
}: ThemeSwitchProps) {
  const { theme, setTheme } = useContext<ThemeContextType>(ThemeContext)
  const isDarkMode = theme === "dark"

  const handleCheckedChange = (isChecked: boolean) => {
    setTheme(isChecked ? "dark" : "light")
  }

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-[#1e1e1f] data-[state=unchecked]:bg-input",
        "focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80",
        "inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full",
        "relative border border-transparent transition-colors outline-none",
        "focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      checked={isDarkMode}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none relative",
          "block size-4 rounded-full shadow-lg ring-0 transition-transform",
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
          "data-[state=unchecked]:translate-x-0"
        )}
      >
        {isDarkMode ? (
          <Moon className={cn(
            "absolute left-1/2 top-1/2 block size-2.5 -translate-x-1/2 -translate-y-1/2"
          )} />
        ) : (
          <Sun className={cn(
            "absolute left-1/2 top-1/2 block size-2.5 -translate-x-1/2 -translate-y-1/2"
          )} />)}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { ThemeSwitch }
