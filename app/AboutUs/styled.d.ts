import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      background: string
      text: string
      muted: string
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}

