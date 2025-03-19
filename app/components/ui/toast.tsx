import type React from "react"
import styled from "styled-components"

// Cores do Brasil
const colors = {
  green: "#009c3b",
  lightGreen: "#e6f7ef",
}

const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: ${colors.lightGreen};
  border: 1px solid ${colors.green};
  color: ${colors.green};
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

interface ToastProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Toast: React.FC<ToastProps> = ({ children, className, style }) => {
  return (
    <ToastContainer className={className} style={style}>
      {children}
    </ToastContainer>
  )
}

