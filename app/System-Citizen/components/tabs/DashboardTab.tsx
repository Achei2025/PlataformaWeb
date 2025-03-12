"use client"

import { useState, useEffect, useRef } from "react"
import styled, { ThemeProvider, createGlobalStyle, keyframes } from "styled-components"
import { AlertTriangle, Bell, Clock, Shield, X, Calendar, MapPin, AlertCircle } from "lucide-react"

// Tema da aplicação com cores do Brasil
const theme = {
  colors: {
    // Cores do Brasil
    primary: "#009c3b", // Verde da bandeira
    primaryHover: "#007c2b",
    primaryForeground: "#FFFFFF",
    secondary: "#ffdf00", // Amarelo da bandeira
    secondaryForeground: "#002776", // Azul da bandeira
    background: "#FFFFFF", // Branco da bandeira
    foreground: "#111827",
    muted: "#F3F4F6",
    mutedForeground: "#6B7280",
    border: "#E5E7EB",
    input: "#E5E7EB",
    card: "#FFFFFF",
    cardForeground: "#111827",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",
    success: "#009c3b", // Verde da bandeira
    successForeground: "#FFFFFF",
    warning: "#ffdf00", // Amarelo da bandeira
    warningForeground: "#002776", // Azul da bandeira
    accent: "#F3F4F6",
    accentForeground: "#1F2937",
  },
  dark: {
    primary: "#ffdf00", // Amarelo da bandeira
    primaryHover: "#e5c700",
    primaryForeground: "#002776", // Azul da bandeira
    secondary: "#009c3b", // Verde da bandeira
    secondaryForeground: "#FFFFFF",
    background: "#002776", // Azul da bandeira
    foreground: "#F9FAFB",
    muted: "#374151",
    mutedForeground: "#9CA3AF",
    border: "#374151",
    input: "#374151",
    card: "#002776", // Azul da bandeira
    cardForeground: "#F9FAFB",
    destructive: "#7F1D1D",
    destructiveForeground: "#F9FAFB",
    success: "#009c3b", // Verde da bandeira
    successForeground: "#F9FAFB",
    warning: "#ffdf00", // Amarelo da bandeira
    warningForeground: "#002776", // Azul da bandeira
    accent: "#374151",
    accentForeground: "#F9FAFB",
  },
  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
}

// Add these animation keyframes after the existing keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const growUp = keyframes`
  from {
    height: 0;
  }
  to {
    height: ${(props) => props.height || "0"};
  }
`

const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-90deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

// Estilos globais
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.background : theme.colors.background)};
    color: ${(props) => (props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground)};
    line-height: 1.5;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${(props) => (props.theme.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)")};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${(props) => (props.theme.mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)")};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => (props.theme.mode === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)")};
  }
`

// Layout Components
const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  min-height: 100vh;
  background-color: ${(props) => (props.theme.mode === "dark" ? "#001d5c" : "#f5f7fa")};
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing[4]};
  }
`

const Header = styled.header`
  margin-bottom: ${theme.spacing[8]};
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.card : theme.colors.card)};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing[4]};
    margin-bottom: ${theme.spacing[6]};
  }
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing[4]};
  }
`

const HeaderTitle = styled.div``

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing[1]};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
`

const PageDescription = styled.p`
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

// Card Components
const Card = styled.div`
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.card : theme.colors.card)};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`

const CardHeader = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  border-bottom: ${(props) => (props.noBorder ? "none" : `1px solid ${props.theme.mode === "dark" ? theme.dark.border : theme.colors.border}`)};
  background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.5)" : "rgba(0, 156, 59, 0.05)")};
`

const CardTitle = styled.h3`
  font-size: ${(props) => (props.$small ? theme.fontSizes.sm : theme.fontSizes.lg)};
  font-weight: ${theme.fontWeights.medium};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
`

const CardDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  margin-top: ${theme.spacing[1]};
`

const CardContent = styled.div`
  padding: ${theme.spacing[6]};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing[4]};
  }
`

const CardFooter = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  border-top: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.3)" : "rgba(0, 156, 59, 0.03)")};
`

// Grid Components
const Grid = styled.div`
  display: grid;
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};
  
  @media (min-width: 768px) {
    grid-template-columns: ${(props) => props.columns || "repeat(1, 1fr)"};
  }
  
  @media (max-width: 768px) {
    gap: ${theme.spacing[4]};
    margin-bottom: ${theme.spacing[6]};
  }
`

// Form Components
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  padding: ${(props) => (props.size === "sm" ? `${theme.spacing[1]} ${theme.spacing[2]}` : `${theme.spacing[2]} ${theme.spacing[4]}`)};
  transition: all 0.2s ease;
  cursor: pointer;
  
  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: ${props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary};
    color: ${props.theme.mode === "dark" ? theme.dark.primaryForeground : theme.colors.primaryForeground};
    border: none;
    
    &:hover {
      background-color: ${props.theme.mode === "dark" ? theme.dark.primaryHover : theme.colors.primaryHover};
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  ${(props) =>
    props.variant === "outline" &&
    `
    background-color: transparent;
    color: ${props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground};
    border: 1px solid ${props.theme.mode === "dark" ? theme.dark.border : theme.colors.border};
    
    &:hover {
      background-color: ${props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted};
      border-color: ${props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary};
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  ${(props) =>
    props.variant === "icon" &&
    `
    background-color: transparent;
    color: ${props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground};
    border: 1px solid ${props.theme.mode === "dark" ? theme.dark.border : theme.colors.border};
    padding: ${theme.spacing[2]};
    width: ${props.size === "sm" ? "2rem" : "2.5rem"};
    height: ${props.size === "sm" ? "2rem" : "2.5rem"};
    
    &:hover {
      background-color: ${props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted};
      border-color: ${props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary};
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const IconButton = styled(Button)`
  padding: ${theme.spacing[2]};
  width: 2.5rem;
  height: 2.5rem;
  
  &:hover {
    color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  }
`

// Badge Component
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  line-height: 1;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  
  ${(props) =>
    props.variant === "default" &&
    `
    background-color: ${props.theme.mode === "dark" ? theme.dark.secondary : theme.colors.secondary};
    color: ${props.theme.mode === "dark" ? theme.dark.secondaryForeground : theme.colors.secondaryForeground};
  `}
  
  ${(props) =>
    props.variant === "destructive" &&
    `
    background-color: ${props.theme.mode === "dark" ? theme.dark.destructive : theme.colors.destructive};
    color: ${props.theme.mode === "dark" ? theme.dark.destructiveForeground : theme.colors.destructiveForeground};
  `}
  
  ${(props) =>
    props.variant === "outline" &&
    `
    background-color: transparent;
    border: 1px solid ${props.theme.mode === "dark" ? theme.dark.border : theme.colors.border};
    color: ${props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground};
  `}
  
  ${(props) =>
    props.variant === "success" &&
    `
    background-color: ${props.theme.mode === "dark" ? "rgba(0, 156, 59, 0.2)" : "rgba(0, 156, 59, 0.1)"};
    color: ${props.theme.mode === "dark" ? "#34D399" : "#009c3b"};
    border: 1px solid ${props.theme.mode === "dark" ? "rgba(0, 156, 59, 0.3)" : "rgba(0, 156, 59, 0.2)"};
  `}
  
  ${(props) =>
    props.variant === "warning" &&
    `
    background-color: ${props.theme.mode === "dark" ? "rgba(255, 223, 0, 0.2)" : "rgba(255, 223, 0, 0.1)"};
    color: ${props.theme.mode === "dark" ? "#ffdf00" : "#B45309"};
    border: 1px solid ${props.theme.mode === "dark" ? "rgba(255, 223, 0, 0.3)" : "rgba(255, 223, 0, 0.2)"};
  `}
`

// Progress Component
const ProgressContainer = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted)};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${theme.spacing[2]};
`

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  width: ${(props) => props.value}%;
  transition: width 0.3s ease;
`

// Flex Components
const Flex = styled.div`
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  gap: ${(props) => theme.spacing[props.gap || 2]};
  flex-direction: ${(props) => props.direction || "row"};
  
  @media (max-width: 768px) {
    ${(props) =>
      props.responsiveFlex &&
      `
      flex-direction: column;
      align-items: flex-start;
    `}
  }
`

// Table Components
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeadStyled = styled.thead`
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted)};
`

const TableHeaderStyled = styled.th`
  padding: ${theme.spacing[3]};
  text-align: left;
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
`

const TableBodyStyled = styled.tbody``

const TableRowStyled = styled.tr`
  border-bottom: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  transition: background-color 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.3)" : "rgba(0, 156, 59, 0.05)")};
  }
`

const TableCellStyled = styled.td`
  padding: ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
  
  ${(props) =>
    props.fontWeight === "medium" &&
    `
    font-weight: ${theme.fontWeights.medium};
  `}
`

// Tab Components
const TabsContainer = styled.div`
  width: 100%;
`

const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count || 2}, 1fr);
  gap: ${theme.spacing[1]};
  margin-bottom: ${theme.spacing[4]};
`

const TabTrigger = styled.button`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${(props) =>
    props.$active ? (props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted) : "transparent"};
  color: ${(props) =>
    props.$active
      ? (props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground)
      : (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${(props) => (props.$active ? theme.fontWeights.medium : theme.fontWeights.normal)};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted)};
  }
  
  ${(props) =>
    props.$active &&
    `
    border-color: ${props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary};
    box-shadow: 0 0 0 1px ${props.theme.mode === "dark" ? "rgba(255, 223, 0, 0.2)" : "rgba(0, 156, 59, 0.2)"};
  `}
`

const TabContent = styled.div`
  display: ${(props) => (props.$active ? "block" : "none")};
  animation: ${fadeInUp} 0.3s ease-out;
`

// Chart Components
// Update the ChartContainer styled component to add max-width and ensure proper responsiveness
const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  padding: ${theme.spacing[2]} 0;
  max-width: 100%;
`

// Update the BarChart component to be more responsive
const BarChart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (min-width: 768px) {
    min-width: 450px; // Reduzido de 600px para 450px
    max-width: 100%;
  }
  
  @media (min-width: 1024px) {
    min-width: 600px; // Reduzido de 800px para 600px
    max-width: 100%;
  }
`

// Add a new interface for chart data to support backend integration
// Add this after the existing styled components and before the Dashboard function
// 4. Add animation to the PieChartContainer that doesn't have animation yet
const PieChartContainer = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  animation: ${fadeInUp} 0.8s ease-out;
`

// 5. Add animation to the StatCard component
const StatCard = styled.div`
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.card : theme.colors.card)};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[3]};
  text-align: center;
  animation: ${fadeInUp} 0.5s ease-out;
  animation-delay: ${(props) => props.index * 0.1}s;
  animation-fill-mode: both;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`

// 6. Add animation to the Table component
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  animation: ${fadeInUp} 0.6s ease-out;
`

const PieChartCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Security Tips Components
const TipCard = styled.div`
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  background-color: ${(props) => (props.theme.mode === "dark" ? `rgba(0, 39, 118, 0.5)` : `rgba(243, 244, 246, 0.5)`)};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`

const TipContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing[3]};
`

const TipIcon = styled.div`
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  margin-top: ${theme.spacing[1]};
`

const TipTextContent = styled.div``

const TipTitle = styled.h4`
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing[1]};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
`

const TipDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  line-height: 1.5;
`

// Space Component
const Space = styled.div`
  margin-bottom: ${(props) => theme.spacing[props.size || 4]};
`

// Componentes adicionais
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: ${fadeInUp} 0.3s ease-out;
`

const ModalContent = styled.div`
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.background : theme.colors.background)};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  
  @media (max-width: 768px) {
    max-width: 90%;
    padding: ${theme.spacing[4]};
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[4]};
  padding-bottom: ${theme.spacing[3]};
  border-bottom: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
`

const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.full};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted)};
    color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  }
`

const AlertItem = styled.div`
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  transition: background-color 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.3)" : "rgba(0, 156, 59, 0.05)")};
  }
`

const AlertTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing[2]};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
`

const AlertDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  line-height: 1.5;
  margin-bottom: ${theme.spacing[2]};
`

const AlertDate = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  display: block;
`

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.background : theme.colors.background)};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground)};
  font-size: ${theme.fontSizes.sm};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
    box-shadow: 0 0 0 2px ${(props) =>
      props.theme.mode === "dark" ? `rgba(255, 223, 0, 0.2)` : `rgba(0, 156, 59, 0.2)`};
  }
  
  &:hover {
    border-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  }
`

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.background : theme.colors.background)};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground)};
  font-size: ${theme.fontSizes.sm};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
    box-shadow: 0 0 0 2px ${(props) =>
      props.theme.mode === "dark" ? `rgba(255, 223, 0, 0.2)` : `rgba(0, 156, 59, 0.2)`};
  }
  
  &:hover {
    border-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  }
`

// Adicione esses novos componentes estilizados
const InfoCard = styled.div`
  background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.3)" : "rgba(0, 156, 59, 0.05)")};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[4]};
  margin-top: ${theme.spacing[4]};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`

const InfoTitle = styled.h4`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing[2]};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`

const InfoText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  line-height: 1.5;
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[4]};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const StatValue = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
`

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  margin-top: ${theme.spacing[1]};
`

// Adicione estes novos componentes estilizados
const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[6]};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[4]};
  }
`

const TableHead = styled.thead`
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted)};
`

const TableHeader = styled.th`
  padding: ${theme.spacing[3]};
  text-align: left;
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => (props.theme.mode === "dark" ? `rgba(0, 39, 118, 0.5)` : `rgba(0, 156, 59, 0.1)`)};
  }
  
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? `rgba(0, 39, 118, 0.7)` : `rgba(0, 156, 59, 0.15)`)};
  }
`

const TableCell = styled.td`
  padding: ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
`

const Carousel = styled.div`
  margin-top: ${theme.spacing[4]};
`

const CarouselItem = styled.div`
  padding: ${theme.spacing[4]};
  background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.3)" : "rgba(0, 156, 59, 0.05)")};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  animation: ${fadeInUp} 0.5s ease-out;
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
`

const CarouselTitle = styled.h4`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing[2]};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
`

const CarouselDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  line-height: 1.5;
`

// Adicione estes novos componentes estilizados
const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing[4]};
`

const ModalTipCard = styled(TipCard)`
  height: 100%;
`

// Add these styled components for carousel navigation
const CarouselNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing[2]};
`

const CarouselButton = styled.button`
  background: none;
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  cursor: pointer;
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground)};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.muted : theme.colors.muted)};
    border-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing[1]};
  margin-top: ${theme.spacing[2]};
`

const CarouselIndicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active
      ? (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)
      : (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`

// Enhanced Alert Card for the improved alerts section
const AlertCard = styled.div`
  padding: ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.colors.border)};
  background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.3)" : "rgba(0, 156, 59, 0.05)")};
  margin-bottom: ${theme.spacing[2]};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${slideIn} 0.3s ease-out;
  animation-delay: ${(props) => props.index * 0.1}s;
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
    background-color: ${(props) => (props.theme.mode === "dark" ? "rgba(0, 39, 118, 0.5)" : "rgba(0, 156, 59, 0.1)")};
  }
`

const AlertCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[2]};
`

const AlertCardTitle = styled.h4`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.semibold};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`

const AlertCardTime = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
`

const AlertCardContent = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.foreground : theme.colors.foreground)};
  margin-bottom: ${theme.spacing[2]};
`

const AlertCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSizes.xs};
`

const AlertCardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
`

const AlertCardAction = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  
  &:hover {
    text-decoration: underline;
  }
`

// Add this after the existing styled components and before the Dashboard function
interface OccurrenceData {
  hour: number
  count: number
}

interface ChartData {
  occurrencesByHour: OccurrenceData[]
  crimeTypes: {
    type: string
    percentage: number
    color: string
  }[]
  mostDangerousTime: string
  safestTime: string
}

export function Dashboard() {
  const [showSecurityTipsModal, setShowSecurityTipsModal] = useState(false)
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("jardins")
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedCrimeType, setSelectedCrimeType] = useState("todos")
  const [activeTab, setActiveTab] = useState("fisica")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [chartKey, setChartKey] = useState(0) // Adicionado para reiniciar a animação
  const modalRef = useRef(null)

  // Add this inside the Dashboard function, after the existing state declarations
  const [chartData, setChartData] = useState<ChartData>({
    occurrencesByHour: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: [5, 3, 2, 1, 2, 4, 8, 12, 10, 15, 18, 22, 25, 20, 18, 15, 20, 28, 32, 25, 18, 12, 8, 6][i],
    })),
    crimeTypes: [
      { type: "Celulares", percentage: 42, color: isDarkMode ? "#ffdf00" : "#009c3b" },
      { type: "Bicicletas", percentage: 28, color: isDarkMode ? "#009c3b" : "#EF4444" },
      { type: "Veículos", percentage: 18, color: isDarkMode ? "#002776" : "#F59E0B" },
      { type: "Outros", percentage: 12, color: isDarkMode ? "#002776" : "#002776" }, // Alterado de "#FFFFFF" para "#002776"
    ],
    mostDangerousTime: "19h - 21h",
    safestTime: "04h - 06h",
  })

  const bairrosData = [
    {
      name: "Jardins",
      safety: 85,
      crimeRate: 5,
      populationDensity: 12000,
      greenAreas: 15,
      publicTransportLines: 20,
    },
    {
      name: "Vila Mariana",
      safety: 78,
      crimeRate: 8,
      populationDensity: 10000,
      greenAreas: 12,
      publicTransportLines: 18,
    },
    {
      name: "Moema",
      safety: 90,
      crimeRate: 3,
      populationDensity: 11000,
      greenAreas: 18,
      publicTransportLines: 22,
    },
    {
      name: "Itaim Bibi",
      safety: 82,
      crimeRate: 6,
      populationDensity: 13000,
      greenAreas: 10,
      publicTransportLines: 25,
    },
  ]

  const appStats = {
    registrosHoje: 150,
    registrosMes: 4500,
    registrosAno: 54000,
    usuariosAtivos: 12000,
    alertasEmitidos: 300,
    objetosRecuperados: 60,
  }

  const carouselItems = [
    {
      title: "Aumento de Usuários",
      description: "O número de usuários ativos cresceu 15% no último mês.",
    },
    {
      title: "Alertas Eficazes",
      description: "80% dos alertas emitidos resultaram em ações preventivas.",
    },
    {
      title: "Recuperação de Objetos",
      description: "A taxa de recuperação de objetos aumentou 20% este ano.",
    },
  ]

  const alertsData = [
    {
      id: 1,
      title: "Movimentação Suspeita",
      description: "Detectada movimentação suspeita próxima à sua residência.",
      date: "15/05/2023 18:30",
      location: "Jardins, São Paulo",
      priority: "alta",
      type: "segurança",
      status: "novo",
    },
    {
      id: 2,
      title: "Alerta de Roubo",
      description: "Roubo de veículo reportado na rua ao lado.",
      date: "15/05/2023 19:00",
      location: "Rua Augusta, 500",
      priority: "alta",
      type: "crime",
      status: "em andamento",
    },
    {
      id: 3,
      title: "Aumento de Furtos",
      description: "Aumento significativo de furtos na região central.",
      date: "15/05/2023 20:00",
      location: "Centro, São Paulo",
      priority: "média",
      type: "informativo",
      status: "verificado",
    },
    {
      id: 4,
      title: "Objeto Recuperado",
      description: "Um objeto similar ao seu foi recuperado pela polícia.",
      date: "14/05/2023 14:30",
      location: "Delegacia Central",
      priority: "baixa",
      type: "recuperação",
      status: "resolvido",
    },
    {
      id: 5,
      title: "Horário de Risco",
      description: "Você está entrando em um horário com alto índice de ocorrências.",
      date: "14/05/2023 19:45",
      location: "Seu trajeto atual",
      priority: "média",
      type: "preventivo",
      status: "ativo",
    },
  ]

  const allSecurityTips = [
    {
      title: "Evite usar celular em locais públicos",
      description:
        "Mantenha seu celular guardado em locais públicos, especialmente em áreas com alto índice de furtos.",
      icon: "smartphone",
      category: "fisica",
    },
    {
      title: "Fique atento aos horários de maior risco",
      description: "Evite transitar sozinho entre 19h e 21h, horário com maior número de ocorrências no seu bairro.",
      icon: "clock",
      category: "fisica",
    },
    {
      title: "Utilize cadeados de qualidade para bicicletas",
      description: "Invista em cadeados em formato de U ou correntes grossas, que são mais difíceis de serem cortados.",
      icon: "lock",
      category: "fisica",
    },
    {
      title: "Mantenha objetos de valor fora da vista",
      description: "Não deixe objetos visíveis dentro de veículos estacionados, mesmo que por curtos períodos.",
      icon: "eye-off",
      category: "fisica",
    },
    {
      title: "Use senhas fortes e diferentes",
      description:
        "Crie senhas complexas com letras, números e símbolos. Nunca use a mesma senha para serviços diferentes.",
      icon: "key",
      category: "digital",
    },
    {
      title: "Ative a autenticação de dois fatores",
      description: "Adicione uma camada extra de segurança às suas contas ativando a verificação em duas etapas.",
      icon: "shield",
      category: "digital",
    },
    {
      title: "Cuidado com redes Wi-Fi públicas",
      description:
        "Evite acessar dados sensíveis ou fazer transações financeiras quando conectado a redes Wi-Fi públicas.",
      icon: "wifi",
      category: "digital",
    },
    {
      title: "Mantenha seus dispositivos atualizados",
      description:
        "Atualize regularmente o sistema operacional e aplicativos para corrigir vulnerabilidades de segurança.",
      icon: "refresh-cw",
      category: "digital",
    },
    {
      title: "Instale um aplicativo de rastreamento",
      description:
        "Use um app de rastreamento em seus dispositivos para ajudar a localizá-los em caso de perda ou roubo.",
      icon: "map-pin",
      category: "digital",
    },
    {
      title: "Seja cauteloso com e-mails suspeitos",
      description: "Não abra anexos ou clique em links de e-mails desconhecidos ou suspeitos.",
      icon: "mail",
      category: "digital",
    },
    {
      title: "Mantenha-se informado sobre golpes recentes",
      description: "Fique atento às notícias sobre novos golpes e fraudes para evitar cair em armadilhas.",
      icon: "alert-triangle",
      category: "fisica",
    },
    {
      title: "Use iluminação adequada",
      description: "Mantenha sua residência bem iluminada, especialmente nas entradas e áreas externas.",
      icon: "sun",
      category: "fisica",
    },
  ]

  // Inside the Dashboard component, add this useEffect for auto-advancing carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [carouselItems.length])

  // Adicionar efeito para reiniciar a animação quando a localização mudar
  useEffect(() => {
    setChartKey((prevKey) => prevKey + 1)
  }, [selectedLocation])

  // 8. Add a useEffect to fetch chart data from backend when location changes
  useEffect(() => {
    // This would be replaced with an actual API call in production
    const fetchChartData = async () => {
      try {
        // Simulate API call with a timeout
        setTimeout(() => {
          // This is mock data - in a real app, you would fetch from your API
          const newData: ChartData = {
            occurrencesByHour: Array.from({ length: 24 }, (_, i) => ({
              hour: i,
              // Generate slightly different data based on selected location
              count: Math.floor(Math.random() * 30) + 1,
            })),
            crimeTypes: [
              {
                type: "Celulares",
                percentage: 40 + Math.floor(Math.random() * 10),
                color: isDarkMode ? "#ffdf00" : "#009c3b",
              },
              {
                type: "Bicicletas",
                percentage: 25 + Math.floor(Math.random() * 10),
                color: isDarkMode ? "#009c3b" : "#EF4444",
              },
              {
                type: "Veículos",
                percentage: 15 + Math.floor(Math.random() * 10),
                color: isDarkMode ? "#002776" : "#F59E0B",
              },
              {
                type: "Outros",
                percentage: 10 + Math.floor(Math.random() * 5),
                color: isDarkMode ? "#002776" : "#002776",
              }, // Alterado de "#FFFFFF" para "#002776"
            ],
            mostDangerousTime: "19h - 21h",
            safestTime: "04h - 06h",
          }

          // Ensure percentages add up to 100%
          const total = newData.crimeTypes.reduce((sum, item) => sum + item.percentage, 0)
          if (total !== 100) {
            const diff = 100 - total
            newData.crimeTypes[newData.crimeTypes.length - 1].percentage += diff
          }

          setChartData(newData)
          setChartKey((prevKey) => prevKey + 1) // Trigger animation restart
        }, 500)
      } catch (error) {
        console.error("Error fetching chart data:", error)
      }
    }

    fetchChartData()
  }, [selectedLocation, isDarkMode])

  // Add this after the existing state declarations:
  const notificationsData = [
    { id: 1, title: "Alerta de Furto", message: "Aumento de furtos de celulares na Av. Paulista", time: "Hoje, 14:30" },
    { id: 2, title: "Roubo Reportado", message: "Roubo de veículo na Rua Augusta", time: "Hoje, 12:15" },
    {
      id: 3,
      title: "Alerta de Segurança",
      message: "Movimentação suspeita próximo à sua residência",
      time: "Hoje, 10:45",
    },
    {
      id: 4,
      title: "Ocorrência Próxima",
      message: "Assalto reportado a 500m da sua localização",
      time: "Ontem, 22:30",
    },
    {
      id: 5,
      title: "Horário de Risco",
      message: "Você está entrando em um horário com alto índice de ocorrências",
      time: "Ontem, 19:00",
    },
    {
      id: 6,
      title: "Alerta de Trânsito",
      message: "Acidente na Av. Rebouças causando congestionamento",
      time: "Ontem, 18:20",
    },
    {
      id: 7,
      title: "Novo Ponto Crítico",
      message: "Nova área de risco identificada no seu trajeto habitual",
      time: "15/05, 16:45",
    },
    {
      id: 8,
      title: "Atualização de Segurança",
      message: "Índice de segurança do seu bairro foi atualizado",
      time: "14/05, 09:30",
    },
    {
      id: 9,
      title: "Objeto Recuperado",
      message: "Um objeto similar ao seu foi recuperado pela polícia",
      time: "13/05, 14:10",
    },
    {
      id: 10,
      title: "Dica de Segurança",
      message: "Novas recomendações de segurança para sua região",
      time: "12/05, 11:25",
    },
  ]

  // Function to handle modal outside click
  const handleModalOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowSecurityTipsModal(false)
      setShowAlertsModal(false)
    }
  }

  return (
    <ThemeProvider theme={{ mode: isDarkMode ? "dark" : "light" }}>
      <GlobalStyle />
      <MainContent>
        <Container>
          <Header>
            <HeaderContent>
              <HeaderTitle>
                <PageTitle>Dashboard de Segurança</PageTitle>
                <PageDescription>Informações sobre segurança no seu bairro e região</PageDescription>
              </HeaderTitle>
              <HeaderActions>
                {/* Removed the select dropdown as requested */}
                <IconButton variant="icon">
                  <Bell size={16} />
                </IconButton>
              </HeaderActions>
            </HeaderContent>
          </Header>

          {/* Estatísticas e Gráficos */}
          <Grid columns="1fr 1fr">
            <Card>
              <CardHeader>
                <CardTitle>Informações ao Seu Redor</CardTitle>
                <CardDescription>Dados importantes sobre sua localização atual</CardDescription>
              </CardHeader>
              <CardContent>
                <Flex direction="column" gap={4}>
                  <div>
                    <InfoTitle>
                      <span
                        style={{
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "9999px",
                          backgroundColor: isDarkMode ? "#ffdf00" : "#009c3b",
                        }}
                      />
                      Sua Localização
                    </InfoTitle>
                    <Flex direction="column" gap={2} style={{ marginTop: theme.spacing[2] }}>
                      <Flex gap={2} alignItems="center">
                        <span
                          style={{
                            width: "0.75rem",
                            height: "0.75rem",
                            borderRadius: "9999px",
                            backgroundColor: isDarkMode ? "#ffdf00" : "#009c3b",
                          }}
                        />
                        <span>
                          <strong>Bairro atual:</strong> Jardins, São Paulo
                        </span>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <span
                          style={{
                            width: "0.75rem",
                            height: "0.75rem",
                            borderRadius: "9999px",
                            backgroundColor: isDarkMode ? "#009c3b" : "#F59E0B",
                          }}
                        />
                        <span>
                          <strong>Nível de segurança:</strong> Médio (65%)
                        </span>
                      </Flex>
                    </Flex>
                  </div>

                  <div>
                    <InfoTitle>
                      <Clock size={16} color={isDarkMode ? "#ffdf00" : "#EF4444"} />
                      Horários de Risco
                    </InfoTitle>
                    <Flex direction="column" gap={2} style={{ marginTop: theme.spacing[2] }}>
                      <Flex gap={2} alignItems="center">
                        <Clock size={16} color={isDarkMode ? "#ffdf00" : "#EF4444"} />
                        <span>
                          <strong>Jardins:</strong> {chartData.mostDangerousTime}
                        </span>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <Clock size={16} color={isDarkMode ? "#ffdf00" : "#EF4444"} />
                        <span>
                          <strong>Seu bairro:</strong> 20h - 22h
                        </span>
                      </Flex>
                    </Flex>
                  </div>

                  <div>
                    <InfoTitle>
                      <AlertTriangle size={16} color={isDarkMode ? "#ffdf00" : "#EF4444"} />
                      Alertas Recentes
                    </InfoTitle>
                    <Flex direction="column" gap={2} style={{ marginTop: theme.spacing[2] }}>
                      <Flex gap={2} alignItems="center">
                        <AlertTriangle size={16} color={isDarkMode ? "#ffdf00" : "#EF4444"} />
                        <span>Aumento de furtos de celulares na região</span>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <AlertTriangle size={16} color={isDarkMode ? "#ffdf00" : "#EF4444"} />
                        <span>Ocorrência reportada a 500m da sua localização</span>
                      </Flex>
                    </Flex>
                  </div>

                  <div>
                    <InfoTitle>
                      <Shield size={16} color={isDarkMode ? "#009c3b" : "#009c3b"} />
                      Dicas de Segurança
                    </InfoTitle>
                    <Flex direction="column" gap={2} style={{ marginTop: theme.spacing[2] }}>
                      <Flex gap={2} alignItems="center">
                        <Shield size={16} color={isDarkMode ? "#009c3b" : "#009c3b"} />
                        <span>Evite usar celular em locais públicos neste horário</span>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <Shield size={16} color={isDarkMode ? "#009c3b" : "#009c3b"} />
                        <span>Mantenha objetos de valor fora da vista</span>
                      </Flex>
                    </Flex>
                  </div>
                </Flex>
              </CardContent>
            </Card>

            {/* Improved Seus Alertas section */}
            <Card>
              <CardHeader>
                <CardTitle>Seus Alertas</CardTitle>
                <CardDescription>Notificações importantes de segurança</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {alertsData.slice(0, 3).map((alert, index) => (
                    <AlertCard key={alert.id} index={index}>
                      <AlertCardHeader>
                        <AlertCardTitle>
                          <AlertCircle size={16} color={isDarkMode ? "#ffdf00" : "#EF4444"} />
                          {alert.title}
                        </AlertCardTitle>
                        <Badge
                          variant={
                            alert.priority === "alta"
                              ? "destructive"
                              : alert.priority === "média"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {alert.priority}
                        </Badge>
                      </AlertCardHeader>
                      <AlertCardContent>{alert.description}</AlertCardContent>
                      <AlertCardFooter>
                        <AlertCardLocation>
                          <MapPin size={12} />
                          {alert.location}
                        </AlertCardLocation>
                        <AlertCardTime>
                          <Calendar size={12} style={{ marginRight: "4px", display: "inline" }} />
                          {alert.date.split(" ")[0]}
                        </AlertCardTime>
                      </AlertCardFooter>
                    </AlertCard>
                  ))}
                </div>
                <Space size={4} />
                <Flex justifyContent="space-between">
                  <Badge variant="outline">{alertsData.length} alertas no total</Badge>
                  <Badge variant="destructive">3 não lidos</Badge>
                </Flex>
                <Space size={2} />
                <Button variant="primary" size="sm" fullWidth onClick={() => setShowAlertsModal(true)}>
                  Ver todos os alertas
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Comparação de Bairros e Estatísticas do App */}
          <Space size={6}>
            <ComparisonGrid>
              <Card>
                <CardHeader>
                  <CardTitle>Log de Notificações</CardTitle>
                  <CardDescription>Últimas 10 notificações recebidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <Flex direction="column" gap={2}>
                      {notificationsData.map((notification) => (
                        <Card key={notification.id} style={{ marginBottom: theme.spacing[2] }}>
                          <CardContent style={{ padding: theme.spacing[3] }}>
                            <Flex direction="column" gap={1}>
                              <Flex justifyContent="space-between" alignItems="center">
                                <CardTitle $small>{notification.title}</CardTitle>
                                <span
                                  style={{
                                    fontSize: theme.fontSizes.xs,
                                    color: isDarkMode ? theme.dark.mutedForeground : theme.colors.mutedForeground,
                                  }}
                                >
                                  {notification.time}
                                </span>
                              </Flex>
                              <CardDescription style={{ marginTop: theme.spacing[1] }}>
                                {notification.message}
                              </CardDescription>
                            </Flex>
                          </CardContent>
                        </Card>
                      ))}
                    </Flex>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas do Aplicativo</CardTitle>
                  <CardDescription>Informações sobre o uso da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Registros hoje</TableCell>
                        <TableCell>{appStats.registrosHoje}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Registros este mês</TableCell>
                        <TableCell>{appStats.registrosMes}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Registros este ano</TableCell>
                        <TableCell>{appStats.registrosAno}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Usuários ativos</TableCell>
                        <TableCell>{appStats.usuariosAtivos}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Alertas emitidos</TableCell>
                        <TableCell>{appStats.alertasEmitidos}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Objetos recuperados</TableCell>
                        <TableCell>{appStats.objetosRecuperados}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Carousel>
                    <CarouselItem>
                      <CarouselTitle>{carouselItems[carouselIndex].title}</CarouselTitle>
                      <CarouselDescription>{carouselItems[carouselIndex].description}</CarouselDescription>
                    </CarouselItem>

                    <CarouselNavigation>
                      <CarouselButton
                        onClick={() => setCarouselIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))}
                      >
                        Anterior
                      </CarouselButton>
                      <CarouselButton
                        onClick={() => setCarouselIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))}
                      >
                        Próximo
                      </CarouselButton>
                    </CarouselNavigation>

                    <CarouselIndicators>
                      {carouselItems.map((_, index) => (
                        <CarouselIndicator
                          key={index}
                          $active={index === carouselIndex}
                          onClick={() => setCarouselIndex(index)}
                        />
                      ))}
                    </CarouselIndicators>
                  </Carousel>
                </CardContent>
              </Card>
            </ComparisonGrid>
          </Space>

          {/* Objetos Registrados */}
          <Space size={6}>
            <Card>
              <CardHeader>
                <CardTitle>Seus Objetos Registrados</CardTitle>
                <CardDescription>Itens cadastrados na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <TableContainer>
                  <StyledTable>
                    <TableHeadStyled>
                      <tr>
                        <TableHeaderStyled>Nome</TableHeaderStyled>
                        <TableHeaderStyled>Categoria</TableHeaderStyled>
                        <TableHeaderStyled>Data de Registro</TableHeaderStyled>
                        <TableHeaderStyled>Status</TableHeaderStyled>
                      </tr>
                    </TableHeadStyled>
                    <TableBodyStyled>
                      <TableRowStyled>
                        <TableCellStyled fontWeight="medium">iPhone 13 Pro</TableCellStyled>
                        <TableCellStyled>Celular</TableCellStyled>
                        <TableCellStyled>12/03/2023</TableCellStyled>
                        <TableCellStyled>
                          <Badge variant="success">Seguro</Badge>
                        </TableCellStyled>
                      </TableRowStyled>
                      <TableRowStyled>
                        <TableCellStyled fontWeight="medium">MacBook Pro</TableCellStyled>
                        <TableCellStyled>Notebook</TableCellStyled>
                        <TableCellStyled>05/01/2023</TableCellStyled>
                        <TableCellStyled>
                          <Badge variant="success">Seguro</Badge>
                        </TableCellStyled>
                      </TableRowStyled>
                      <TableRowStyled>
                        <TableCellStyled fontWeight="medium">Bicicleta Caloi Elite</TableCellStyled>
                        <TableCellStyled>Bicicleta</TableCellStyled>
                        <TableCellStyled>28/11/2022</TableCellStyled>
                        <TableCellStyled>
                          <Badge variant="destructive">Furtado</Badge>
                        </TableCellStyled>
                      </TableRowStyled>
                      <TableRowStyled>
                        <TableCellStyled fontWeight="medium">Relógio Apple Watch</TableCellStyled>
                        <TableCellStyled>Acessório</TableCellStyled>
                        <TableCellStyled>15/04/2023</TableCellStyled>
                        <TableCellStyled>
                          <Badge variant="success">Seguro</Badge>
                        </TableCellStyled>
                      </TableRowStyled>
                    </TableBodyStyled>
                  </StyledTable>
                </TableContainer>
                <Space size={4} />
                <Button variant="outline" size="sm">
                  Ver todos os objetos
                </Button>
              </CardContent>
            </Card>
          </Space>

          {/* Dicas de Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Dicas de Segurança</CardTitle>
              <CardDescription>Recomendações para sua proteção</CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContainer>
                <TabsList count={2}>
                  <TabTrigger $active={activeTab === "fisica"} onClick={() => setActiveTab("fisica")}>
                    Segurança Física
                  </TabTrigger>
                  <TabTrigger $active={activeTab === "digital"} onClick={() => setActiveTab("digital")}>
                    Segurança Digital
                  </TabTrigger>
                </TabsList>

                <TabContent $active={activeTab === "fisica"}>
                  <Flex direction="column" gap={4}>
                    {allSecurityTips
                      .filter((tip) => tip.category === "fisica")
                      .slice(0, 4)
                      .map((tip, index) => (
                        <TipCard key={index}>
                          <TipContent>
                            <TipIcon>
                              <Shield size={20} />
                            </TipIcon>
                            <TipTextContent>
                              <TipTitle>{tip.title}</TipTitle>
                              <TipDescription>{tip.description}</TipDescription>
                            </TipTextContent>
                          </TipContent>
                        </TipCard>
                      ))}
                  </Flex>
                </TabContent>

                <TabContent $active={activeTab === "digital"}>
                  <Flex direction="column" gap={4}>
                    {allSecurityTips
                      .filter((tip) => tip.category === "digital")
                      .slice(0, 4)
                      .map((tip, index) => (
                        <TipCard key={index}>
                          <TipContent>
                            <TipIcon>
                              <Shield size={20} />
                            </TipIcon>
                            <TipTextContent>
                              <TipTitle>{tip.title}</TipTitle>
                              <TipDescription>{tip.description}</TipDescription>
                            </TipTextContent>
                          </TipContent>
                        </TipCard>
                      ))}
                  </Flex>
                </TabContent>
              </TabsContainer>
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth onClick={() => setShowSecurityTipsModal(true)}>
                Ver todas as dicas de segurança
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </MainContent>

      {/* Modal de Alertas - Updated to close when clicking outside */}
      {showAlertsModal && (
        <Modal onClick={handleModalOutsideClick}>
          <ModalContent ref={modalRef}>
            <ModalHeader>
              <ModalTitle>Todos os Alertas</ModalTitle>
              <CloseButton onClick={() => setShowAlertsModal(false)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            {alertsData.map((alert) => (
              <AlertItem key={alert.id}>
                <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: theme.spacing[2] }}>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <Badge
                    variant={
                      alert.priority === "alta" ? "destructive" : alert.priority === "média" ? "warning" : "outline"
                    }
                  >
                    {alert.priority}
                  </Badge>
                </Flex>
                <AlertDescription>{alert.description}</AlertDescription>
                <Flex justifyContent="space-between" alignItems="center">
                  <AlertDate>{alert.date}</AlertDate>
                  <Flex gap={2}>
                    <Badge variant="outline">{alert.type}</Badge>
                    <Badge variant="success">{alert.status}</Badge>
                  </Flex>
                </Flex>
              </AlertItem>
            ))}
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Dicas de Segurança - Updated to close when clicking outside */}
      {showSecurityTipsModal && (
        <Modal onClick={handleModalOutsideClick}>
          <ModalContent ref={modalRef}>
            <ModalHeader>
              <ModalTitle>Todas as Dicas de Segurança</ModalTitle>
              <CloseButton onClick={() => setShowSecurityTipsModal(false)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            <TabsContainer>
              <TabsList count={2}>
                <TabTrigger $active={activeTab === "fisica"} onClick={() => setActiveTab("fisica")}>
                  Segurança Física
                </TabTrigger>
                <TabTrigger $active={activeTab === "digital"} onClick={() => setActiveTab("digital")}>
                  Segurança Digital
                </TabTrigger>
              </TabsList>

              <TabContent $active={activeTab === "fisica"}>
                <ModalGrid>
                  {allSecurityTips
                    .filter((tip) => tip.category === "fisica")
                    .map((tip, index) => (
                      <ModalTipCard key={index}>
                        <TipContent>
                          <TipIcon>
                            <Shield size={20} />
                          </TipIcon>
                          <TipTextContent>
                            <TipTitle>{tip.title}</TipTitle>
                            <TipDescription>{tip.description}</TipDescription>
                          </TipTextContent>
                        </TipContent>
                      </ModalTipCard>
                    ))}
                </ModalGrid>
              </TabContent>

              <TabContent $active={activeTab === "digital"}>
                <ModalGrid>
                  {allSecurityTips
                    .filter((tip) => tip.category === "digital")
                    .map((tip, index) => (
                      <ModalTipCard key={index}>
                        <TipContent>
                          <TipIcon>
                            <Shield size={20} />
                          </TipIcon>
                          <TipTextContent>
                            <TipTitle>{tip.title}</TipTitle>
                            <TipDescription>{tip.description}</TipDescription>
                          </TipTextContent>
                        </TipContent>
                      </ModalTipCard>
                    ))}
                </ModalGrid>
              </TabContent>
            </TabsContainer>
          </ModalContent>
        </Modal>
      )}
    </ThemeProvider>
  )
}

// Add these styled components for the chart
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  margin-bottom: ${theme.spacing[2]};
`

const ChartContent = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  gap: 2px;
`

const ChartBar = styled.div`
  width: 100%;
  max-width: 2rem;
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.primary : theme.colors.primary)};
  height: ${(props) => props.height};
  transition: height 0.4s ease-out;
  border-radius: ${theme.borderRadius.sm};
  position: relative;
  animation: ${growUp} 0.6s ease-out;
  animation-delay: ${(props) => props.index * 0.05}s;
  animation-fill-mode: both;
  
  &:hover::after {
    content: attr(title);
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.xs};
    white-space: nowrap;
    z-index: 10;
  }
`

const ChartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.xs};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.mutedForeground : theme.colors.mutedForeground)};
  margin-top: ${theme.spacing[2]};
`

const PieChartSegment = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 8px solid ${(props) => props.color};
  clip-path: ${(props) => props.clipPath};
  animation: ${rotateIn} 0.5s ease-out;
  animation-delay: ${(props) => props.index * 0.2}s;
  animation-fill-mode: both
`

export const DashboardTab = Dashboard
export default Dashboard

