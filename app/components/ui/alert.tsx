import type React from "react"
import styled from "styled-components"

// Cores do Brasil
const colors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  white: "#ffffff",
  lightGreen: "#e6f7ef",
  lightYellow: "#fff9e0",
  lightBlue: "#e6eeff",
  lightRed: "#ffebee",
  red: "#e53935",
}

const AlertBoxContainer = styled.div<{ variant: "success" | "warning" | "info" | "danger" }>`
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease, border-color 0.3s ease;

<<<<<<< HEAD
  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `
          background-color: ${colors.lightYellow};
          border: 1px solid ${colors.yellow};
        `
      case "info":
        return `
          background-color: ${colors.lightBlue};
          border: 1px solid ${colors.blue};
        `
      case "danger":
        return `
          background-color: ${colors.lightRed};
          border: 1px solid ${colors.red};
        `
      default:
        return `
          background-color: ${colors.lightGreen};
          border: 1px solid ${colors.green};
        `
    }
  }}
`
=======
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import styled from "styled-components"
>>>>>>> 781dada54d96921395cd7551e49774e7fa09e040

const AlertTitleContainer = styled.h4<{ variant: "success" | "warning" | "info" | "danger" }>`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;

  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `color: #856404;`
      case "info":
        return `color: ${colors.blue};`
      case "danger":
        return `color: ${colors.red};`
      default:
        return `color: ${colors.green};`
    }
  }}
`

const AlertTextContainer = styled.p<{ variant: "success" | "warning" | "info" | "danger" }>`
  margin: 0;
  font-size: 14px;
  transition: color 0.3s ease;
  
  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `color: #856404;`
      case "info":
        return `color: ${colors.blue};`
      case "danger":
        return `color: ${colors.red};`
      default:
        return `color: ${colors.green};`
    }
  }}
`

interface AlertBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "success" | "warning" | "info" | "danger"
  children: React.ReactNode
}

export const AlertBox: React.FC<AlertBoxProps> = ({ variant, children, ...props }) => {
  return (
    <AlertBoxContainer variant={variant} {...props}>
      {children}
    </AlertBoxContainer>
  )
}

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: "success" | "warning" | "info" | "danger"
  children: React.ReactNode
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ variant, children, ...props }) => {
  return (
    <AlertTitleContainer variant={variant} {...props}>
      {children}
    </AlertTitleContainer>
  )
}

interface AlertTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: "success" | "warning" | "info" | "danger"
  children: React.ReactNode
}

export const AlertText: React.FC<AlertTextProps> = ({ variant, children, ...props }) => {
  return (
    <AlertTextContainer variant={variant} {...props}>
      {children}
    </AlertTextContainer>
  )
}

export const AlertBox = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors[props.variant]};
  color: ${(props) => props.theme.colors[`${props.variant}Foreground`]};
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const AlertTitleStyled = styled.h4`
  margin: 0;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const AlertTextStyled = styled.p`
  margin: 0;
  font-size: 1rem;
` 