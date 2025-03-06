import type { DefaultTheme } from "styled-components"

export const theme: DefaultTheme = {
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    background: "hsl(var(--background))",
    text: "hsl(var(--foreground))",
    muted: "hsl(var(--muted-foreground))",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
}

