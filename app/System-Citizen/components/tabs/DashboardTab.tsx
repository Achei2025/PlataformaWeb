"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { AlertTriangle, Bell, Clock, Shield, X, Calendar, MapPin, AlertCircle } from "lucide-react"

// Modificar as cores do tema para o modo claro
const theme = {
  colors: {
    // Cores do Brasil (modo claro)
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

// Animation keyframes
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
    height: var(--target-height);
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
    background-color: ${theme.colors.background};
    color: ${theme.colors.foreground};
    line-height: 1.5;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

// Layout Components
const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.foreground};
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Header = styled.header`
  margin-bottom: ${theme.spacing[6]};
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.border};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing[4]};
    margin-bottom: ${theme.spacing[4]};
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
  color: ${theme.colors.primary};
`

const PageDescription = styled.p`
  color: ${theme.colors.mutedForeground};
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

// Card Components - Standardized padding and spacing
const Card = styled.div`
  background-color: ${(props) => props.theme.card};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.border};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`

const CardHeader = styled.div`
  padding: ${theme.spacing[4]};
  border-bottom: ${(props) => (props.noBorder ? "none" : `1px solid ${props.theme.border}`)};
  background-color: rgba(0, 156, 59, 0.05);
`

const CardTitle = styled.h3`
  font-size: ${(props) => (props.$small ? theme.fontSizes.sm : theme.fontSizes.lg)};
  font-weight: ${theme.fontWeights.medium};
  color: ${(props) => props.theme.primary};
`

const CardDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
  margin-top: ${theme.spacing[1]};
`

const CardContent = styled.div`
  padding: ${theme.spacing[4]};
  flex: 1; // Allow content to expand and fill the card
  display: flex;
  flex-direction: column;
`

const CardFooter = styled.div`
  padding: ${theme.spacing[4]};
  border-top: 1px solid ${(props) => props.theme.border};
  background-color: rgba(0, 156, 59, 0.03);
`

// Grid Components - Improved with consistent spacing
const Grid = styled.div`
  display: grid;
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[6]};
  
  @media (min-width: 768px) {
    grid-template-columns: ${(props) => props.columns || "repeat(1, 1fr)"};
  }
  
  @media (max-width: 768px) {
    gap: ${theme.spacing[4]};
    margin-bottom: ${theme.spacing[4]};
  }
`

// Flex Components - Standardized
const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) => !["alignItems", "justifyContent", "gap", "direction", "responsiveFlex"].includes(prop),
})`
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  gap: ${(props) => theme.spacing[props.gap || 2]};
  flex-direction: ${(props) => props.direction || "row"};
  width: 100%;
  
  @media (max-width: 768px) {
    ${(props) =>
      props.responsiveFlex &&
      `
      flex-direction: column;
      align-items: flex-start;
    `}
  }
`

// Form Components
const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["fullWidth", "variant", "size"].includes(prop),
})`
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
    background-color: ${theme.colors.primary};
    color: ${theme.colors.primaryForeground};
    border: none;
    
    &:hover {
      background-color: ${theme.colors.primaryHover};
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
    color: ${theme.colors.foreground};
    border: 1px solid ${theme.colors.border};
    
    &:hover {
      background-color: ${theme.colors.muted};
      border-color: ${theme.colors.primary};
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
    color: ${theme.colors.foreground};
    border: 1px solid ${theme.colors.border};
    padding: ${theme.spacing[2]};
    width: ${props.size === "sm" ? "2rem" : "2.5rem"};
    height: ${props.size === "sm" ? "2rem" : "2.5rem"};
    
    &:hover {
      background-color: ${theme.colors.muted};
      border-color: ${theme.colors.primary};
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
    color: ${theme.colors.primary};
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
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.secondaryForeground};
  `}
  
  ${(props) =>
    props.variant === "destructive" &&
    `
    background-color: ${theme.colors.destructive};
    color: ${theme.colors.destructiveForeground};
  `}
  
  ${(props) =>
    props.variant === "outline" &&
    `
    background-color: transparent;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.foreground};
  `}
  
  ${(props) =>
    props.variant === "success" &&
    `
    background-color: rgba(0, 156, 59, 0.1);
    color: #009c3b;
    border: 1px solid rgba(0, 156, 59, 0.2);
  `}
  
  ${(props) =>
    props.variant === "warning" &&
    `
    background-color: rgba(255, 223, 0, 0.1);
    color: #B45309;
    border: 1px solid rgba(255, 223, 0, 0.2);
  `}
`

// Progress Component
const ProgressContainer = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${theme.colors.muted};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${theme.spacing[2]};
`

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${theme.colors.primary};
  width: ${(props) => props.value}%;
  transition: width 0.3s ease;
`

// Table Components - Standardized
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.card};
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${(props) => props.theme.card};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`

const TableHeadStyled = styled.thead`
  background-color: ${theme.colors.muted};
`

const TableHeaderStyled = styled.th`
  padding: ${theme.spacing[3]};
  text-align: left;
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
`

const TableBodyStyled = styled.tbody``

const TableRowStyled = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.card};
  transition: background-color 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(0, 156, 59, 0.05);
  }
`

const TableCellStyled = styled.td`
  padding: ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => props.theme.foreground};
  
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
  background-color: ${(props) => (props.$active ? theme.colors.muted : "transparent")};
  color: ${(props) => (props.$active ? theme.colors.foreground : theme.colors.mutedForeground)};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${(props) => (props.$active ? theme.fontWeights.medium : theme.fontWeights.normal)};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${theme.colors.muted};
  }
  
  ${(props) =>
    props.$active &&
    `
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 1px rgba(0, 156, 59, 0.2);
  `}
`

const TabContent = styled.div`
  display: ${(props) => (props.$active ? "block" : "none")};
  animation: ${fadeInUp} 0.3s ease-out;
`

// Chart Components - Standardized
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

const BarChart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (min-width: 768px) {
    min-width: 450px;
    max-width: 100%;
  }
  
  @media (min-width: 1024px) {
    min-width: 600px;
    max-width: 100%;
  }
`

const PieChartContainer = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  animation: ${fadeInUp} 0.8s ease-out;
`

const StatCard = styled.div`
  background-color: ${(props) => props.theme.card};
  border: 1px solid ${(props) => props.theme.border};
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

// Ajustar a tabela para usar as cores do tema corretamente
const StyledTable2 = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  animation: ${fadeInUp} 0.6s ease-out;
  background-color: ${(props) => props.theme.card};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`

const StyledTableHead = styled.thead`
  background-color: ${theme.colors.muted};
`

const StyledTableHeader = styled.th`
  padding: ${theme.spacing[3]};
  text-align: left;
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
`

const StyledTableBody = styled.tbody``

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0, 156, 59, 0.1);
  }
  
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.card};
  }
  
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 156, 59, 0.15);
  }
`

const StyledTableCell = styled.td`
  padding: ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => props.theme.foreground};
`

const PieChartCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Security Tips Components - Standardized
const TipCard = styled.div`
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.border};
  background-color: rgba(243, 244, 246, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%; // Ensure consistent height
  
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
  color: ${theme.colors.primary};
  margin-top: ${theme.spacing[1]};
`

const TipTextContent = styled.div``

const TipTitle = styled.h4`
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing[1]};
  color: ${theme.colors.primary};
`

const TipDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
  line-height: 1.5;
`

// Space Component
const Space = styled.div`
  margin-bottom: ${(props) => theme.spacing[props.size || 4]};
`

// Modal Components - Standardized
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
  background-color: ${(props) => props.theme.background};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${(props) => props.theme.border};
  
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
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.mutedForeground};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.full};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${theme.colors.muted};
    color: ${theme.colors.primary};
  }
`

// Alert Components - Standardized
const AlertItem = styled.div`
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${(props) => props.theme.border};
  transition: background-color 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(0, 156, 59, 0.05);
  }
`

const AlertTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.colors.primary};
`

const AlertDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
  line-height: 1.5;
  margin-bottom: ${theme.spacing[2]};
`

const AlertDate = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.mutedForeground};
  display: block;
`

// Form Components - Standardized
const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  font-size: ${theme.fontSizes.sm};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 156, 59, 0.2);
  }
  
  &:hover {
    border-color: ${theme.colors.primary};
  }
`

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  font-size: ${theme.fontSizes.sm};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 156, 59, 0.2);
  }
  
  &:hover {
    border-color: ${theme.colors.primary};
  }
`

// Info Card Components - Standardized
const InfoCard = styled.div`
  background-color: rgba(0, 156, 59, 0.05);
  border: 1px solid ${(props) => props.theme.border};
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
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`

const InfoText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
  line-height: 1.5;
`

// Stat Components - Standardized
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
  color: ${theme.colors.primary};
`

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
  margin-top: ${theme.spacing[1]};
`

// Comparison Grid - Standardized
const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[6]};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[4]};
  }
`

// Table Components - Standardized
const TableHead = styled.thead`
  background-color: ${theme.colors.muted};
`

const TableHeader = styled.th`
  padding: ${theme.spacing[3]};
  text-align: left;
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0, 156, 59, 0.1);
  }
  
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 156, 59, 0.15);
  }
`

const TableCell = styled.td`
  padding: ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
`

// Carousel Components - Standardized
const Carousel = styled.div`
  margin-top: ${theme.spacing[4]};
`

const CarouselItem = styled.div`
  padding: ${theme.spacing[4]};
  background-color: rgba(0, 156, 59, 0.05);
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  animation: ${fadeInUp} 0.5s ease-out;
  border: 1px solid ${(props) => props.theme.border};
`

const CarouselTitle = styled.h4`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.colors.primary};
`

const CarouselDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
  line-height: 1.5;
`

// Modal Grid - Standardized
const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing[4]};
`

const ModalTipCard = styled(TipCard)`
  height: 100%;
`

// Carousel Navigation - Standardized
const CarouselNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing[2]};
`

const CarouselButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  cursor: pointer;
  color: ${theme.colors.foreground};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${theme.colors.muted};
    border-color: ${theme.colors.primary};
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
  background-color: ${(props) => (props.$active ? theme.colors.primary : theme.colors.border)};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`

// Alert Card - Standardized
const AlertCard = styled.div`
  padding: ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.border};
  background-color: rgba(0, 156, 59, 0.05);
  margin-bottom: ${theme.spacing[2]};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${slideIn} 0.3s ease-out;
  animation-delay: ${(props) => props.index * 0.1}s;
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
    background-color: rgba(0, 156, 59, 0.1);
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
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`

const AlertCardTime = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.mutedForeground};
`

const AlertCardContent = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.foreground};
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
  color: ${theme.colors.mutedForeground};
`

const AlertCardAction = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  
  &:hover {
    text-decoration: underline;
  }
`

// Chart Components
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
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
  background-color: ${theme.colors.primary};
  height: ${(props) => props.height || "0%"};
  transition: height 0.4s ease-out;
  border-radius: ${theme.borderRadius.sm};
  position: relative;
  animation: ${growUp} 0.6s ease-out;
  animation-delay: ${(props) => (props.index || 0) * 0.05}s;
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
  color: ${theme.colors.mutedForeground};
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
  animation-fill-mode: both;
`

// Data interface
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

interface SecurityTip {
  title: string
  description: string
  icon: string
  category: string
}

type DashboardProps = {}

// Modificar o Dashboard para usar o tema do ThemeProvider
export function Dashboard({}: DashboardProps) {
  const [showSecurityTipsModal, setShowSecurityTipsModal] = useState(false)
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("jardins")
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedCrimeType, setSelectedCrimeType] = useState("todos")
  const [activeTab, setActiveTab] = useState("fisica")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [chartKey, setChartKey] = useState(0)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const [displayedTips, setDisplayedTips] = useState<SecurityTip[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const tipsContainerRef = useRef<HTMLDivElement | null>(null)

  // Chart data state
  const [chartData, setChartData] = useState<ChartData>({
    occurrencesByHour: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: [5, 3, 2, 1, 2, 4, 8, 12, 10, 15, 18, 22, 25, 20, 18, 15, 20, 28, 32, 25, 18, 12, 8, 6][i],
    })),
    crimeTypes: [
      { type: "Celulares", percentage: 42, color: "#009c3b" },
      { type: "Bicicletas", percentage: 28, color: "#EF4444" },
      { type: "Veículos", percentage: 18, color: "#F59E0B" },
      { type: "Outros", percentage: 12, color: "#002776" },
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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [carouselItems.length])

  // Reset chart animation when location changes
  useEffect(() => {
    setChartKey((prevKey) => prevKey + 1)
  }, [selectedLocation])

  // Fetch chart data when location changes
  useEffect(() => {
    // This would be replaced with an actual API call in production
    const fetchChartData = async () => {
      try {
        // Simulate API call with a timeout
        setTimeout(() => {
          // Mock data - in a real app, you would fetch from your API
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
                color: "#009c3b",
              },
              {
                type: "Bicicletas",
                percentage: 25 + Math.floor(Math.random() * 10),
                color: "#EF4444",
              },
              {
                type: "Veículos",
                percentage: 15 + Math.floor(Math.random() * 10),
                color: "#F59E0B",
              },
              {
                type: "Outros",
                percentage: 10 + Math.floor(Math.random() * 5),
                color: "#002776",
              },
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
  }, [selectedLocation])

  // Handle modal outside click
  const handleModalOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowSecurityTipsModal(false)
      setShowAlertsModal(false)
    }
  }

  // Adicione este useEffect para inicializar as dicas exibidas
  useEffect(() => {
    if (activeTab === "fisica") {
      const physicalTips = allSecurityTips.filter((tip) => tip.category === "fisica")
      setDisplayedTips(shuffleTips(physicalTips))
    } else {
      const digitalTips = allSecurityTips.filter((tip) => tip.category === "digital")
      setDisplayedTips(shuffleTips(digitalTips))
    }
  }, [activeTab])

  // Adicione este useEffect para o scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (!tipsContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = tipsContainerRef.current

      // Verifica se o usuário chegou perto do final do scroll
      if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
        setIsLoading(true)

        // Simula um carregamento de mais dicas
        setTimeout(() => {
          const currentCategory = activeTab
          const tipsForCategory = allSecurityTips.filter((tip) => tip.category === currentCategory)
          const newTips = shuffleTips(tipsForCategory)

          setDisplayedTips((prev) => [...prev, ...newTips])
          setIsLoading(false)
        }, 500)
      }
    }

    const container = tipsContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isLoading, activeTab])

  // Adicione esta função para embaralhar as dicas
  const shuffleTips = (tips: any[]) => {
    const shuffled = [...tips]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Modifique o retorno para usar o tema diretamente
  return (
    <MainContent>
      <Container>
        {/* Header */}
        <Header>
          <HeaderContent>
            <HeaderTitle>
              <PageTitle>Dashboard de Segurança</PageTitle>
              <PageDescription>Informações sobre segurança no seu bairro e região</PageDescription>
            </HeaderTitle>
            <HeaderActions>
              <IconButton variant="icon">
                <Bell size={16} />
              </IconButton>
            </HeaderActions>
          </HeaderContent>
        </Header>

        {/* Main Content Grid - First Row */}
        <Grid columns="1fr 1fr">
          {/* Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Informações ao Seu Redor</CardTitle>
              <CardDescription>Dados importantes sobre sua localização atual</CardDescription>
            </CardHeader>
            <CardContent>
              <Flex direction="column" gap={4} alignItems="flex-start" style={{ width: "100%" }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                  <InfoTitle style={{ justifyContent: "flex-start" }}>
                    <span
                      style={{
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "9999px",
                        backgroundColor: "#009c3b",
                      }}
                    />
                    Sua Localização
                  </InfoTitle>
                  <Flex
                    direction="column"
                    gap={2}
                    style={{ marginTop: theme.spacing[2], width: "100%" }}
                    alignItems="flex-start"
                  >
                    <Flex gap={2} alignItems="center" justifyContent="flex-start" style={{ width: "100%" }}>
                      <span
                        style={{
                          width: "0.75rem",
                          height: "0.75rem",
                          borderRadius: "9999px",
                          backgroundColor: "#009c3b",
                        }}
                      />
                      <span>
                        <strong>Bairro atual:</strong> Jardins, São Paulo
                      </span>
                    </Flex>
                    <Flex gap={2} alignItems="center" justifyContent="flex-start" style={{ width: "100%" }}>
                      <span
                        style={{
                          width: "0.75rem",
                          height: "0.75rem",
                          borderRadius: "9999px",
                          backgroundColor: "#F59E0B",
                        }}
                      />
                      <span>
                        <strong>Nível de segurança:</strong> Médio (65%)
                      </span>
                    </Flex>
                  </Flex>
                </div>

                {/* Risk Hours */}
                <div>
                  <InfoTitle>
                    <Clock size={16} color="#EF4444" />
                    Horários de Risco
                  </InfoTitle>
                  <Flex direction="column" gap={2} style={{ marginTop: theme.spacing[2] }}>
                    <Flex gap={2} alignItems="center">
                      <Clock size={16} color="#EF4444" />
                      <span>
                        <strong>Jardins:</strong> {chartData.mostDangerousTime}
                      </span>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Clock size={16} color="#EF4444" />
                      <span>
                        <strong>Seu bairro:</strong> 20h - 22h
                      </span>
                    </Flex>
                  </Flex>
                </div>

                {/* Recent Alerts */}
                <div>
                  <InfoTitle>
                    <AlertTriangle size={16} color="#EF4444" />
                    Alertas Recentes
                  </InfoTitle>
                  <Flex direction="column" gap={2} style={{ marginTop: theme.spacing[2] }}>
                    <Flex gap={2} alignItems="center">
                      <AlertTriangle size={16} color="#EF4444" />
                      <span>Aumento de furtos de celulares na região</span>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <AlertTriangle size={16} color="#EF4444" />
                      <span>Ocorrência reportada a 500m da sua localização</span>
                    </Flex>
                  </Flex>
                </div>

                {/* Security Tips */}
                <div>
                  <InfoTitle>
                    <Shield size={16} color="#009c3b" />
                    Dicas de Segurança
                  </InfoTitle>
                  <Flex direction="column" gap={2} style={{ marginTop: theme.spacing[2] }}>
                    <Flex gap={2} alignItems="center">
                      <Shield size={16} color="#009c3b" />
                      <span>Evite usar celular em locais públicos neste horário</span>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Shield size={16} color="#009c3b" />
                      <span>Mantenha objetos de valor fora da vista</span>
                    </Flex>
                  </Flex>
                </div>
              </Flex>
            </CardContent>
          </Card>

          {/* Alerts Card */}
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
                        <AlertCircle size={16} color="#EF4444" />
                        {alert.title}
                      </AlertCardTitle>
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
              <Flex justifyContent="center">
                <Badge variant="outline">{alertsData.length} alertas no total</Badge>
              </Flex>
              <Space size={2} />
              <Button variant="primary" size="sm" fullWidth onClick={() => setShowAlertsModal(true)}>
                Ver todos os alertas
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Row */}
        <Space size={6}>
          <ComparisonGrid>
            {/* Notifications Log */}
            <Card>
              <CardHeader>
                <CardTitle>Log de Notificações</CardTitle>
                <CardDescription>Últimas 10 notificações recebidas</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ maxHeight: "400px", overflowY: "auto", width: "100%" }}>
                  <Flex direction="column" gap={2} style={{ width: "100%" }}>
                    {notificationsData.map((notification) => (
                      <div
                        key={notification.id}
                        style={{
                          width: "100%",
                          padding: theme.spacing[3],
                          marginBottom: theme.spacing[2],
                          borderRadius: theme.borderRadius.md,
                          backgroundColor: theme.colors.card,
                          border: `1px solid ${theme.colors.border}`,
                          boxShadow: theme.shadows.sm,
                        }}
                      >
                        <Flex direction="column" gap={1} style={{ width: "100%" }}>
                          <Flex justifyContent="space-between" alignItems="center" style={{ width: "100%" }}>
                            <CardTitle $small>{notification.title}</CardTitle>
                            <span
                              style={{
                                fontSize: theme.fontSizes.xs,
                                color: theme.colors.mutedForeground,
                              }}
                            >
                              {notification.time}
                            </span>
                          </Flex>
                          <CardDescription style={{ marginTop: theme.spacing[1] }}>
                            {notification.message}
                          </CardDescription>
                        </Flex>
                      </div>
                    ))}
                  </Flex>
                </div>
              </CardContent>
            </Card>

            {/* App Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas do Aplicativo</CardTitle>
                <CardDescription>Informações sobre o uso da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <StyledTable2>
                  <StyledTableBody>
                    <StyledTableRow>
                      <StyledTableCell>Registros hoje</StyledTableCell>
                      <StyledTableCell>{appStats.registrosHoje}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Registros este mês</StyledTableCell>
                      <StyledTableCell>{appStats.registrosMes}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Registros este ano</StyledTableCell>
                      <StyledTableCell>{appStats.registrosAno}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Usuários ativos</StyledTableCell>
                      <StyledTableCell>{appStats.usuariosAtivos}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Alertas emitidos</StyledTableCell>
                      <StyledTableCell>{appStats.alertasEmitidos}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Objetos recuperados</StyledTableCell>
                      <StyledTableCell>{appStats.objetosRecuperados}</StyledTableCell>
                    </StyledTableRow>
                  </StyledTableBody>
                </StyledTable2>

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

        {/* Registered Objects */}
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

        {/* Security Tips */}
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
                <div
                  ref={tipsContainerRef}
                  style={{
                    height: "400px",
                    overflowY: "auto",
                    paddingRight: theme.spacing[2],
                  }}
                >
                  <Grid columns="repeat(2, 1fr)">
                    {displayedTips.map((tip, index) => (
                      <TipCard key={`${tip.title}-${index}`}>
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
                    {isLoading && (
                      <div
                        style={{
                          gridColumn: "1 / -1",
                          textAlign: "center",
                          padding: theme.spacing[4],
                          color: theme.colors.mutedForeground,
                        }}
                      >
                        Carregando mais dicas...
                      </div>
                    )}
                  </Grid>
                </div>
              </TabContent>

              <TabContent $active={activeTab === "digital"}>
                <div
                  ref={tipsContainerRef}
                  style={{
                    height: "400px",
                    overflowY: "auto",
                    paddingRight: theme.spacing[2],
                  }}
                >
                  <Grid columns="repeat(2, 1fr)">
                    {displayedTips.map((tip, index) => (
                      <TipCard key={`${tip.title}-${index}`}>
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
                    {isLoading && (
                      <div
                        style={{
                          gridColumn: "1 / -1",
                          textAlign: "center",
                          padding: theme.spacing[4],
                          color: theme.colors.mutedForeground,
                        }}
                      >
                        Carregando mais dicas...
                      </div>
                    )}
                  </Grid>
                </div>
              </TabContent>
            </TabsContainer>
          </CardContent>
        </Card>
      </Container>
      {/* Alerts Modal */}
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
    </MainContent>
  )
}

export default Dashboard

