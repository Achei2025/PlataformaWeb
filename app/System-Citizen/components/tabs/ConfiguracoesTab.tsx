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

import type React from "react"
import { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import {
  Bell,
  Shield,
  User,
  Globe,
  Mail,
  Phone,
  Lock,
  Camera,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle2,
  BellRing,
  AlertCircle,
  FileText,
  Info,
  MapPin,
  X,
} from "lucide-react"

// Cores do Brasil
const colors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  white: "#ffffff",
  lightGreen: "#e6f7ef",
  lightYellow: "#fff9e0",
  lightBlue: "#e6eeff",
  gray: "#f8f9fa",
  lightGray: "#f0f0f0",
  darkGray: "#333333",
  red: "#e53935",
  lightRed: "#ffebee",
  purple: "#7c4dff",
  lightPurple: "#f3e5f5",
  orange: "#ff9800",
  lightOrange: "#fff3e0",
}

// Estilos globais
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background-color: ${colors.gray};
    color: ${colors.darkGray};
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`

// Container principal
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

// Cabeçalho
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`

const HeaderBar = styled.div`
  height: 40px;
  width: 8px;
  background-color: ${colors.green};
  border-radius: 999px;
  transition: background-color 0.3s ease;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.blue};
  margin: 0;
  transition: color 0.3s ease;
`

// Tabs
const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const TabsList = styled.div`
  display: flex;
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 8px;
  border: 1px solid ${colors.lightGray};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
`

// Modifique a definição do TabButton para usar o atributo de forma segura
const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => (props.$active ? colors.green : "transparent")};
  color: ${(props) => (props.$active ? colors.white : colors.darkGray)};
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? colors.green : colors.lightGray)};
  }

  @media (min-width: 640px) {
    span {
      display: inline;
    }
  }

  @media (max-width: 639px) {
    span {
      display: none;
    }
  }
`

// Cards
const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  border: 1px solid ${colors.lightGray};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
`

const CardHeader = styled.div`
  background-color: ${colors.blue};
  color: ${colors.white};
  padding: 16px 20px;
  transition: background-color 0.3s ease;
`

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const CardDescription = styled.p`
  font-size: 14px;
  color: ${colors.lightGray};
  margin: 4px 0 0 0;
  transition: color 0.3s ease;
`

const CardContent = styled.div`
  padding: 24px 20px;
  background-color: ${colors.white};
  transition: background-color 0.3s ease;
`

const CardFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${colors.lightGray};
  background-color: ${colors.gray};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`

// Grid layouts
const Grid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

// Replace TwoColumnGrid with a new style definition
const ThreeColumnGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const TwoColumnGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const FormGrid = styled.div`
  display: grid;
  gap: 16px;
`

const FormRow = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

// Form elements
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.blue};
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${colors.lightGray};
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: ${colors.white};
  color: ${colors.darkGray};

  &:focus {
    outline: none;
    border-color: ${colors.green};
    box-shadow: 0 0 0 2px rgba(0, 156, 59, 0.2);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${colors.lightGray};
  font-size: 14px;
  background-color: ${colors.white};
  color: ${colors.darkGray};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.green};
    box-shadow: 0 0 0 2px rgba(0, 156, 59, 0.2);
  }
`

// Buttons
const Button = styled.button<{ variant?: "primary" | "outline" | "ghost" | "danger" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return `
          background-color: transparent;
          border: 1px solid ${colors.lightGray};
          color: ${colors.darkGray};
          &:hover {
            background-color: ${colors.lightGray};
          }
        `
      case "ghost":
        return `
          background-color: transparent;
          border: none;
          color: ${colors.darkGray};
          &:hover {
            background-color: ${colors.lightGray};
          }
        `
      case "danger":
        return `
          background-color: transparent;
          border: 1px solid ${colors.lightRed};
          color: ${colors.red};
          &:hover {
            background-color: ${colors.lightRed};
          }
        `
      default:
        return `
          background-color: ${colors.green};
          border: none;
          color: ${colors.white};
          &:hover {
            background-color: #007c2f;
          }
          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        `
    }
  }}
`

// Avatar
const AvatarContainer = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 4px solid ${colors.yellow};
  overflow: hidden;
  margin-bottom: 16px;
  transition: border-color 0.3s ease;
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.green};
  color: ${colors.white};
  font-size: 24px;
  font-weight: 600;
  transition: background-color 0.3s ease;
`

// Switch
const SwitchContainer = styled.label<{ disabled?: boolean }>`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

// Modifique a definição do SwitchSlider para usar o atributo de forma segura
const SwitchSlider = styled.span<{ checked: boolean; disabled?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.checked ? (props.disabled ? "#aaa" : colors.green) : colors.lightGray)};
  border-radius: 34px;
  transition: .4s;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
    transform: ${(props) => (props.checked ? "translateX(20px)" : "translateX(0)")};
  }
`

// Badge
const Badge = styled.span<{ variant?: "primary" | "warning" | "danger" | "info" | "new" }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `
          background-color: ${colors.lightYellow};
          color: ${colors.darkGray};
        `
      case "danger":
        return `
          background-color: ${colors.lightRed};
          color: ${colors.red};
        `
      case "info":
        return `
          background-color: ${colors.lightBlue};
          color: ${colors.blue};
        `
      case "new":
        return `
          background-color: ${colors.lightPurple};
          color: ${colors.purple};
        `
      default:
        return `
          background-color: ${colors.green};
          color: ${colors.white};
        `
    }
  }}
`

// Alert boxes
const AlertBox = styled.div<{ variant: "success" | "warning" | "info" | "danger" }>`
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 16px;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `
          background-color: ${colors.lightYellow};
          border: 1px solid ${colors.yellow};
          color: ${colors.darkGray};
        `
      case "info":
        return `
          background-color: ${colors.lightBlue};
          border: 1px solid ${colors.blue};
          color: ${colors.blue};
        `
      case "danger":
        return `
          background-color: ${colors.lightRed};
          border: 1px solid ${colors.red};
          color: ${colors.red};
        `
      default:
        return `
          background-color: ${colors.lightGreen};
          border: 1px solid ${colors.green};
          color: ${colors.green};
        `
    }
  }}
`

const AlertTitle = styled.h4<{ variant: "success" | "warning" | "info" | "danger" }>`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;

  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `color: ${colors.darkGray};`
      case "info":
        return `color: ${colors.blue};`
      case "danger":
        return `color: ${colors.red};`
      default:
        return `color: ${colors.green};`
    }
  }}
`

const AlertText = styled.p<{ variant: "success" | "warning" | "info" | "danger" }>`
  margin: 0;
  transition: color 0.3s ease;
  
  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `color: ${colors.darkGray};`
      case "info":
        return `color: ${colors.blue};`
      case "danger":
        return `color: ${colors.red};`
      default:
        return `color: ${colors.green};`
    }
  }}
`

// List
const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 8px 0;
  color: ${colors.green};
`

const ListItem = styled.li`
  margin-bottom: 4px;
`

// Section heading
const SectionHeading = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.blue};
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.lightGray};
  margin: 0 0 16px 0;
`

// Change the SwitchItem styled component definition
const SwitchItem = styled.div<{ $isMaster?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.$isMaster ? "16px" : "8px")};
  padding: ${(props) => (props.$isMaster ? "12px" : "6px 8px")};
  border-radius: 6px;
  transition: background-color 0.2s;
  ${(props) =>
    props.$isMaster &&
    `
    background-color: ${colors.lightGreen};
    border: 1px solid ${colors.green};
    margin-bottom: 20px;
  `}

  &:hover {
    background-color: ${(props) => (props.$isMaster ? colors.lightGreen : colors.gray)};
  }
`

// Update the Switch component to use $isMaster
const Switch = ({
  checked,
  onChange,
  label,
  description,
  badge,
  disabled,
  isMaster,
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
  badge?: {
    text: string
    variant: "primary" | "warning" | "danger" | "info" | "new"
  }
  disabled?: boolean
  isMaster?: boolean
}) => {
  return (
    <SwitchItem $isMaster={isMaster}>
      <SwitchInfo>
        <SwitchLabel disabled={disabled}>{label}</SwitchLabel>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
          {description && <SwitchDescription disabled={disabled}>{description}</SwitchDescription>}
          {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
        </div>
      </SwitchInfo>
      <SwitchContainer disabled={disabled}>
        <SwitchInput type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
        <SwitchSlider checked={checked} disabled={disabled} />
      </SwitchContainer>
    </SwitchItem>
  )
}

const SwitchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const SwitchLabel = styled.span<{ disabled?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.disabled ? "#999" : "inherit")};
  transition: color 0.3s ease;
`

const SwitchDescription = styled.span<{ disabled?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.disabled ? "#aaa" : "#666")};
  transition: color 0.3s ease;
`

// Notification category
const NotificationCategory = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const CategoryTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.blue};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
`

const CategoryDescription = styled.p`
  margin: 4px 0 16px 0;
  font-size: 13px;
  color: #666;
  transition: color 0.3s ease;
`

// Device item
const DeviceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.gray};
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${colors.lightGray};
  margin-bottom: 12px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`

const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const DeviceIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.blue};
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background-color 0.3s ease;
`

const DeviceDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const DeviceName = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: inherit;
  transition: color 0.3s ease;
`

const DeviceLastSeen = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
  transition: color 0.3s ease;
`

// Update Toast for better dark mode support
const Toast = styled.div`
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

// Update TabContent for better dark mode support
const TabContent = styled.div<{ $active: boolean }>`
  display: ${(props) => (props.$active ? "block" : "none")};
`

// Update ModalOverlay for better dark mode support
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  transition: background-color 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

// Update ModalContainer for better dark mode support
const ModalContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  animation: scaleIn 0.2s ease;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
`

// Update ModalHeader for better dark mode support
const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.3s ease;
`

// Update ModalTitle for better dark mode support
const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.blue};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
`

// Update ModalCloseButton for better dark mode support
const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.darkGray};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.3s ease;

  &:hover {
    background-color: ${colors.lightGray};
  }
`

// Update ModalContent for better dark mode support
const ModalContent = styled.div`
  padding: 20px;
  color: inherit;
  transition: color 0.3s ease;
`

// Update ModalFooter for better dark mode support
const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${colors.lightGray};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  transition: border-color 0.3s ease;
`

// Update ModalIconContainer for better dark mode support
const ModalIconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${colors.lightYellow};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  transition: background-color 0.3s ease;
`

// Add the LocationModal component definition after the ModalIconContainer styled component and before the ConfiguracoesTab component

const LocationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isEnabling,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isEnabling: boolean
}) => {
  if (!isOpen) return null

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            <MapPin size={18} />
            {isEnabling ? "Ativar Localização" : "Desativar Localização"}
          </ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <ModalIconContainer>
            {isEnabling ? (
              <MapPin size={32} color={colors.orange} />
            ) : (
              <AlertTriangle size={32} color={colors.orange} />
            )}
          </ModalIconContainer>

          {isEnabling ? (
            <>
              <AlertTitle variant="warning" style={{ textAlign: "center", marginBottom: "16px" }}>
                Compartilhar sua localização é importante!
              </AlertTitle>
              <AlertText variant="warning" style={{ marginBottom: "16px", textAlign: "center" }}>
                Ao ativar o compartilhamento de localização, você permite que o sistema:
              </AlertText>
              <List>
                <ListItem>Identifique áreas de risco próximas a você</ListItem>
                <ListItem>Envie alertas de emergência relevantes para sua região</ListItem>
                <ListItem>Forneça informações sobre casos próximos</ListItem>
                <ListItem>Ajude a mapear ocorrências em sua comunidade</ListItem>
              </List>
              <AlertBox variant="info" style={{ marginTop: "20px" }}>
                <AlertTitle variant="info">
                  <Info size={16} />
                  Sua privacidade é importante
                </AlertTitle>
                <AlertText variant="info">
                  Seus dados de localização são usados apenas para melhorar sua experiência e segurança. Não
                  compartilhamos essas informações com terceiros.
                </AlertText>
              </AlertBox>
            </>
          ) : (
            <>
              <AlertTitle variant="warning" style={{ textAlign: "center", marginBottom: "16px" }}>
                Tem certeza que deseja desativar a localização?
              </AlertTitle>
              <AlertText variant="warning" style={{ marginBottom: "16px", textAlign: "center" }}>
                Ao desativar o compartilhamento de localização, você perderá:
              </AlertText>
              <List>
                <ListItem>Alertas de emergência específicos para sua região</ListItem>
                <ListItem>Notificações sobre áreas de risco próximas</ListItem>
                <ListItem>Informações sobre casos em sua comunidade</ListItem>
                <ListItem>Recursos de mapeamento e análise local</ListItem>
              </List>
              <AlertBox variant="danger" style={{ marginTop: "20px" }}>
                <AlertTitle variant="danger">
                  <AlertTriangle size={16} />
                  Impacto na sua segurança
                </AlertTitle>
                <AlertText variant="danger">
                  Sem acesso à sua localização, não poderemos enviar alertas importantes que podem afetar sua segurança
                  em situações de emergência.
                </AlertText>
              </AlertBox>
            </>
          )}
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>{isEnabling ? "Ativar Localização" : "Desativar Mesmo Assim"}</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  )
}

// Also add the ConfirmationModal component definition
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  if (!isOpen) return null

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            <Save size={18} />
            Confirmar Alterações
          </ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <ModalIconContainer>
            <AlertCircle size={32} color={colors.blue} />
          </ModalIconContainer>

          <AlertTitle variant="info" style={{ textAlign: "center", marginBottom: "16px" }}>
            Deseja salvar as alterações?
          </AlertTitle>
          <AlertText variant="info" style={{ marginBottom: "16px", textAlign: "center" }}>
            Você está prestes a salvar as alterações nas suas configurações. Esta ação não pode ser desfeita.
          </AlertText>

          <AlertBox variant="info" style={{ marginTop: "20px" }}>
            <AlertTitle variant="info">
              <Info size={16} />
              Lembrete de Privacidade
            </AlertTitle>
            <AlertText variant="info">
              Suas informações são mantidas anônimas para outros usuários. Apenas você e os administradores do sistema
              podem ver seus dados reais.
            </AlertText>
          </AlertBox>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar e Salvar</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  )
}

// Modifique a parte do estado no componente ConfiguracoesTab para adicionar o estado do tipo de nome anônimo
const ConfiguracoesTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [pendingLocationState, setPendingLocationState] = useState(false)
  const [username, setUsername] = useState("Anônimo_" + Math.floor(Math.random() * 10000))
  const [useFixedAnonymous, setUseFixedAnonymous] = useState(false)

  // Adicione esta função dentro do componente ConfiguracoesTab, antes do return
  const handleFileUpload = (file: File) => {
    // Aqui você implementaria a lógica para fazer o upload do arquivo para o servidor
    // Por exemplo, usando FormData e fetch

    // Exemplo de como seria o código:
    // const formData = new FormData();
    // formData.append('avatar', file);
    //
    // fetch('/api/upload-avatar', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Upload bem-sucedido:', data);
    //   // Atualizar a imagem do avatar
    // })
    // .catch(error => {
    //   console.error('Erro no upload:', error);
    // });

    // Por enquanto, apenas simularemos o upload
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1500)
  }

  // Função para gerar um novo nome de usuário
  const generateNewUsername = () => {
    if (useFixedAnonymous) {
      setUsername("Anônimo")
    } else {
      setUsername("Anônimo_" + Math.floor(Math.random() * 10000))
    }
  }

  // Efeito para atualizar o nome quando o tipo de anonimato muda
  useEffect(() => {
    generateNewUsername()
  }, [useFixedAnonymous])

  // Switches state - Notificações
  const [notificationSwitches, setNotificationSwitches] = useState({
    // Email
    emailNotifications: false,
    casesEmail: false,
    interactionsEmail: false,
    systemEmail: false,
    newsEmail: true,

    // Push
    pushNotifications: true,
    nearbyCases: true,
    myCases: false,
    riskAreas: false,
    emergencyAlerts: true,
    communityUpdates: false,

    // SMS
    smsNotifications: false,
    casesSms: false,
    emergencySms: true,
    riskAreasSms: false,
    systemSms: false,
    communitySms: false,

    // Segurança
    twoFactorAuth: false,

    // Privacidade
    showOnlineStatus: true,
    shareLocation: false, // Alterado para false por padrão
    anonymousData: true,
  })

  // Função para atualizar os switches filhos quando o master switch muda
  useEffect(() => {
    // Se o master switch de email estiver desligado, desliga todos os switches de email
    if (!notificationSwitches.emailNotifications) {
      setNotificationSwitches((prev) => ({
        ...prev,
        casesEmail: false,
        interactionsEmail: false,
        systemEmail: false,
        newsEmail: false,
        eventsEmail: false,
      }))
    }

    // Se o master switch de push estiver desligado, desliga todos os switches de push
    if (!notificationSwitches.pushNotifications) {
      setNotificationSwitches((prev) => ({
        ...prev,
        nearbyCases: false,
        myCases: false,
        riskAreas: false,
        emergencyAlerts: false,
        communityUpdates: false,
      }))
    }

    // Se o master switch de SMS estiver desligado, desliga todos os switches de SMS
    if (!notificationSwitches.smsNotifications) {
      setNotificationSwitches((prev) => ({
        ...prev,
        casesSms: false,
        emergencySms: false,
        riskAreasSms: false,
        systemSms: false,
        communitySms: false,
      }))
    }
  }, [
    notificationSwitches.emailNotifications,
    notificationSwitches.pushNotifications,
    notificationSwitches.smsNotifications,
  ])

  const toggleSwitch = (key: keyof typeof notificationSwitches) => {
    // Caso especial para o switch de localização
    if (key === "shareLocation") {
      // Armazena o estado que o usuário está tentando definir
      setPendingLocationState(!notificationSwitches.shareLocation)
      // Abre o modal
      setShowLocationModal(true)
      return
    }

    // Para outros switches, comportamento normal
    setNotificationSwitches((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleLocationConfirm = () => {
    // Atualiza o estado com o valor pendente
    setNotificationSwitches((prev) => ({
      ...prev,
      shareLocation: pendingLocationState,
    }))
    // Fecha o modal
    setShowLocationModal(false)
  }

  const handleLocationCancel = () => {
    // Fecha o modal sem alterar o estado
    setShowLocationModal(false)
  }

  const handleSave = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmSave = () => {
    setShowConfirmationModal(false)
    setLoading(true)
    // Simulando uma requisição
    setTimeout(() => {
      setLoading(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1500)
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <TabsContainer>
          {/* Modifique a parte onde os TabButtons são renderizados */}
          {/* Substitua o código atual por: */}
          <TabsList>
            <TabButton $active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
              <User size={16} />
              <span>Perfil</span>
            </TabButton>
            <TabButton $active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")}>
              <Bell size={16} />
              <span>Notificações</span>
            </TabButton>
            <TabButton $active={activeTab === "security"} onClick={() => setActiveTab("security")}>
              <Shield size={16} />
              <span>Segurança</span>
            </TabButton>
            <TabButton $active={activeTab === "privacy"} onClick={() => setActiveTab("privacy")}>
              <Lock size={16} />
              <span>Privacidade</span>
            </TabButton>
          </TabsList>

          {/* Aba de Perfil */}
          {/* Modifique a parte onde os TabContents são renderizados */}
          {/* Substitua cada TabContent por: */}
          <TabContent $active={activeTab === "profile"}>
            <FormGrid style={{ gap: "24px" }}>
              <TwoColumnGrid>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <User size={18} />
                      Foto de Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <AvatarContainer>
                      <AvatarImage src="https://github.com/shadcn.png" alt="Foto de perfil" />
                    </AvatarContainer>
                    <FormGroup style={{ width: "100%", marginBottom: "8px" }}>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            // Verificar o tamanho do arquivo (16MB = 16 * 1024 * 1024 bytes)
                            if (file.size > 16 * 1024 * 1024) {
                              alert("O arquivo é muito grande. O tamanho máximo permitido é 16MB.")
                              e.target.value = ""
                              return
                            }

                            // Verificar o tipo do arquivo
                            if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
                              alert("Apenas arquivos JPG e PNG são permitidos.")
                              e.target.value = ""
                              return
                            }

                            // Processar o upload
                            handleFileUpload(file)
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        style={{ width: "100%" }}
                        onClick={() => document.getElementById("avatar-upload")?.click()}
                      >
                        <Camera size={16} />
                        Alterar foto (PNG/JPG até 16MB)
                      </Button>
                    </FormGroup>
                    <Button variant="danger" style={{ width: "100%" }}>
                      <Trash2 size={16} />
                      Remover foto
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Globe size={18} />
                      Configurações de Anonimato
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup style={{ marginBottom: "16px" }}>
                      <Label htmlFor="username">Seu Nome de Usuário Anônimo</Label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled />
                      <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                        Este é o nome que outros usuários verão. Ele foi gerado automaticamente para proteger sua
                        identidade.
                      </p>
                    </FormGroup>

                    <Button
                      variant="outline"
                      style={{ marginBottom: "16px", width: "100%" }}
                      onClick={() => setUsername("Anônimo_" + Math.floor(Math.random() * 10000))}
                    >
                      Gerar Novo Nome Aleatório
                    </Button>

                    <Switch
                      checked={useFixedAnonymous}
                      onChange={() => setUseFixedAnonymous(!useFixedAnonymous)}
                      label="Usar nome fixo 'Anônimo'"
                      description="Sem números aleatórios"
                    />
                  </CardContent>
                </Card>
              </TwoColumnGrid>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Mail size={18} />
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>Atualize suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormGrid>
                    <FormRow>
                      <FormGroup>
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" placeholder="John" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </FormGroup>
                    </FormRow>
                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="email">
                          <Mail size={14} />
                          Email
                        </Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="phone">
                          <Phone size={14} />
                          Telefone Principal
                        </Label>
                        <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                      </FormGroup>
                    </TwoColumnGrid>
                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="secondaryPhone">
                          <Phone size={14} />
                          Telefone Secundário
                        </Label>
                        <Input id="secondaryPhone" type="tel" placeholder="(00) 00000-0000" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="alternative-contact-type">Contato Alternativo</Label>
                        <Select id="alternative-contact-type" defaultValue="email">
                          <option value="email">Email</option>
                          <option value="phone">Telefone</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="telegram">Telegram</option>
                          <option value="outro">Outro</option>
                        </Select>
                      </FormGroup>
                    </TwoColumnGrid>
                    <FormGroup>
                      <Label htmlFor="alternative-contact">Informação de Contato Alternativo</Label>
                      <Input id="alternative-contact" placeholder="Informe seu contato alternativo" />
                      <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                        Este contato será usado apenas para recuperação de conta em caso de emergência.
                      </p>
                    </FormGroup>

                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="gender">Gênero</Label>
                        <Select id="gender" defaultValue="">
                          <option value="" disabled>
                            Selecione seu gênero
                          </option>
                          <option value="masculino">Masculino</option>
                          <option value="feminino">Feminino</option>
                          <option value="nao-binario">Não-binário</option>
                          <option value="outro">Outro</option>
                          <option value="prefiro-nao-informar">Prefiro não informar</option>
                        </Select>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="occupation">Ocupação</Label>
                        <Select id="occupation" defaultValue="">
                          <option value="" disabled>
                            Selecione sua ocupação
                          </option>
                          <option value="estudante">Estudante</option>
                          <option value="profissional">Profissional</option>
                          <option value="autonomo">Autônomo</option>
                          <option value="outro">Outro</option>
                        </Select>
                      </FormGroup>
                    </TwoColumnGrid>

                    <FormGroup>
                      <Label htmlFor="occupation-details">Detalhes da Ocupação</Label>
                      <Input
                        id="occupation-details"
                        placeholder="Ex: Estudante de Medicina, Engenheiro de Software, etc."
                      />
                    </FormGroup>

                    <AlertBox variant="info" style={{ marginTop: "16px" }}>
                      <AlertTitle variant="info">
                        <Info size={16} />
                        Contato Alternativo
                      </AlertTitle>
                      <AlertText variant="info">
                        Recomendamos adicionar um contato alternativo para casos de emergência ou caso seu telefone seja
                        perdido ou roubado. Este contato será usado apenas para recuperação de conta.
                      </AlertText>
                    </AlertBox>
                  </FormGrid>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar alterações"}
                    {!loading && <Save size={16} />}
                  </Button>
                </CardFooter>
              </Card>
            </FormGrid>
          </TabContent>

          {/* Aba de Notificações */}
          <TabContent $active={activeTab === "notifications"}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Bell size={18} />
                  Preferências de Notificação
                </CardTitle>
                <CardDescription>Configure como e quando você deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent>
                <ThreeColumnGrid>
                  {/* Coluna 1: Email */}
                  <NotificationCategory>
                    <CategoryHeader>
                      <CategoryTitle>
                        <Mail size={18} />
                        Notificações por Email
                      </CategoryTitle>
                    </CategoryHeader>
                    <CategoryDescription>
                      Configure quais notificações você deseja receber por email
                    </CategoryDescription>

                    {/* Master Switch */}
                    <Switch
                      checked={notificationSwitches.emailNotifications}
                      onChange={() => toggleSwitch("emailNotifications")}
                      label="Ativar notificações por email"
                      description="Controla todas as notificações por email"
                      isMaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <Switch
                        checked={notificationSwitches.casesEmail}
                        onChange={() => toggleSwitch("casesEmail")}
                        label="Atualizações de casos"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.interactionsEmail}
                        onChange={() => toggleSwitch("interactionsEmail")}
                        label="Interações"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.systemEmail}
                        onChange={() => toggleSwitch("systemEmail")}
                        label="Sistema"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.newsEmail}
                        onChange={() => toggleSwitch("newsEmail")}
                        label="Notícias"
                        badge={{ text: "Recomendado", variant: "primary" }}
                        disabled={!notificationSwitches.emailNotifications}
                      />
                    </div>
                  </NotificationCategory>

                  {/* Coluna 2: Push */}
                  <NotificationCategory>
                    <CategoryHeader>
                      <CategoryTitle>
                        <BellRing size={18} />
                        Notificações Push
                      </CategoryTitle>
                    </CategoryHeader>
                    <CategoryDescription>
                      Configure quais notificações você deseja receber em tempo real
                    </CategoryDescription>

                    {/* Master Switch */}
                    <Switch
                      checked={notificationSwitches.pushNotifications}
                      onChange={() => toggleSwitch("pushNotifications")}
                      label="Ativar notificações push"
                      description="Controla todas as notificações push"
                      isMaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <Switch
                        checked={notificationSwitches.nearbyCases}
                        onChange={() => toggleSwitch("nearbyCases")}
                        label="Casos próximos"
                        badge={{ text: "Popular", variant: "warning" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.myCases}
                        onChange={() => toggleSwitch("myCases")}
                        label="Meus casos"
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.riskAreas}
                        onChange={() => toggleSwitch("riskAreas")}
                        label="Áreas de risco"
                        badge={{ text: "Importante", variant: "danger" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.emergencyAlerts}
                        onChange={() => toggleSwitch("emergencyAlerts")}
                        label="Alertas de emergência"
                        badge={{ text: "Crítico", variant: "danger" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.communityUpdates}
                        onChange={() => toggleSwitch("communityUpdates")}
                        label="Atualizações da comunidade"
                        disabled={!notificationSwitches.pushNotifications}
                      />
                    </div>
                  </NotificationCategory>

                  {/* Coluna 3: SMS */}
                  <NotificationCategory>
                    <CategoryHeader>
                      <CategoryTitle>
                        <Phone size={18} />
                        Notificações por SMS
                      </CategoryTitle>
                    </CategoryHeader>
                    <CategoryDescription>Configure quais notificações você deseja receber por SMS</CategoryDescription>

                    {/* Master Switch */}
                    <Switch
                      checked={notificationSwitches.smsNotifications}
                      onChange={() => toggleSwitch("smsNotifications")}
                      label="Ativar notificações por SMS"
                      description="Controla todas as notificações por SMS"
                      isMaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <Switch
                        checked={notificationSwitches.casesSms}
                        onChange={() => toggleSwitch("casesSms")}
                        label="Atualizações de casos"
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.emergencySms}
                        onChange={() => toggleSwitch("emergencySms")}
                        label="Alertas de emergência"
                        badge={{ text: "Crítico", variant: "danger" }}
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.riskAreasSms}
                        onChange={() => toggleSwitch("riskAreasSms")}
                        label="Áreas de risco"
                        badge={{ text: "Importante", variant: "danger" }}
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.systemSms}
                        onChange={() => toggleSwitch("systemSms")}
                        label="Sistema"
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.communitySms}
                        onChange={() => toggleSwitch("communitySms")}
                        label="Atualizações da comunidade"
                        disabled={!notificationSwitches.smsNotifications}
                      />
                    </div>
                  </NotificationCategory>
                </ThreeColumnGrid>

                <AlertBox variant="info" style={{ marginTop: "24px" }}>
                  <AlertTitle variant="info">
                    <AlertCircle size={16} />
                    Dica de notificações
                  </AlertTitle>
                  <AlertText variant="info">
                    Recomendamos manter os alertas de emergência e áreas de risco sempre ativos para sua segurança. Você
                    pode personalizar todas as outras notificações conforme sua preferência.
                  </AlertText>
                </AlertBox>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar preferências"}
                  {!loading && <Save size={16} />}
                </Button>
              </CardFooter>
            </Card>
          </TabContent>

          {/* Aba de Segurança */}
          <TabContent $active={activeTab === "security"}>
            <TwoColumnGrid>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Lock size={18} />
                    Alterar Senha
                  </CardTitle>
                  <CardDescription>Atualize sua senha regularmente para maior segurança</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </FormGroup>

                    <AlertBox variant="success">
                      <AlertTitle variant="success">
                        <CheckCircle2 size={14} />
                        Dicas para uma senha forte:
                      </AlertTitle>
                      <List>
                        <ListItem>Use pelo menos 8 caracteres</ListItem>
                        <ListItem>Combine letras maiúsculas e minúsculas</ListItem>
                        <ListItem>Inclua números e símbolos</ListItem>
                        <ListItem>Evite informações pessoais óbvias</ListItem>
                      </List>
                    </AlertBox>
                  </FormGrid>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Atualizando..." : "Atualizar Senha"}
                    {!loading && <Save size={16} />}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Shield size={18} />
                    Segurança Adicional
                  </CardTitle>
                  <CardDescription>Configure camadas extras de proteção para sua conta</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertBox variant="warning">
                    <AlertTitle variant="warning">
                      <AlertTriangle size={16} />
                      Autenticação em Duas Etapas (2FA)
                    </AlertTitle>
                    <AlertText variant="warning">
                      Adicione uma camada extra de segurança exigindo um código além da senha ao fazer login.
                    </AlertText>
                    <div style={{ marginTop: "12px" }}>
                      <Switch
                        checked={notificationSwitches.twoFactorAuth}
                        onChange={() => toggleSwitch("twoFactorAuth")}
                        label="Ativar 2FA"
                        description="Recomendado para maior segurança"
                        badge={{ text: "Recomendado", variant: "warning" }}
                      />
                    </div>
                  </AlertBox>

                  <div style={{ marginTop: "24px" }}>
                    <SectionHeading>Dispositivos Conectados</SectionHeading>
                    <DeviceItem>
                      <DeviceInfo>
                        <DeviceIcon>PC</DeviceIcon>
                        <DeviceDetails>
                          <DeviceName>Windows PC</DeviceName>
                          <DeviceLastSeen>Último acesso: Hoje, 10:45</DeviceLastSeen>
                        </DeviceDetails>
                      </DeviceInfo>
                      <Badge>Atual</Badge>
                    </DeviceItem>

                    <DeviceItem>
                      <DeviceInfo>
                        <DeviceIcon>MB</DeviceIcon>
                        <DeviceDetails>
                          <DeviceName>iPhone 13</DeviceName>
                          <DeviceLastSeen>Último acesso: Ontem, 18:30</DeviceLastSeen>
                        </DeviceDetails>
                      </DeviceInfo>
                      <Button variant="danger" style={{ padding: "4px 8px", fontSize: "12px" }}>
                        Desconectar
                      </Button>
                    </DeviceItem>

                    <DeviceItem>
                      <DeviceInfo>
                        <DeviceIcon>TB</DeviceIcon>
                        <DeviceDetails>
                          <DeviceName>iPad Pro</DeviceName>
                          <DeviceLastSeen>Último acesso: 15/06/2023</DeviceLastSeen>
                        </DeviceDetails>
                      </DeviceInfo>
                      <Button variant="danger" style={{ padding: "4px 8px", fontSize: "12px" }}>
                        Desconectar
                      </Button>
                    </DeviceItem>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="danger">Desconectar todos</Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar configurações"}
                    {!loading && <Save size={16} />}
                  </Button>
                </CardFooter>
              </Card>
            </TwoColumnGrid>
          </TabContent>

          {/* Aba de Privacidade */}
          <TabContent $active={activeTab === "privacy"}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Globe size={18} />
                  Configurações de Privacidade
                </CardTitle>
                <CardDescription>
                  Gerencie quem pode ver suas informações e como seus dados são utilizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormGrid style={{ gap: "24px" }}>
                  <SectionHeading>
                    <Globe size={16} />
                    Compartilhamento de Dados
                  </SectionHeading>

                  <TwoColumnGrid>
                    <div>
                      <Switch
                        checked={notificationSwitches.shareLocation}
                        onChange={() => toggleSwitch("shareLocation")}
                        label="Compartilhar Localização"
                        description="Permitir que o aplicativo acesse sua localização"
                        badge={{ text: "Importante", variant: "warning" }}
                      />

                      <Switch
                        checked={notificationSwitches.anonymousData}
                        onChange={() => toggleSwitch("anonymousData")}
                        label="Dados para Melhorias"
                        description="Compartilhar dados anônimos para melhorar o serviço"
                      />

                      <Switch
                        checked={notificationSwitches.showOnlineStatus}
                        onChange={() => toggleSwitch("showOnlineStatus")}
                        label="Mostrar Status Online"
                        description="Permitir que outros usuários vejam quando você está online"
                      />
                    </div>

                    <AlertBox variant="success">
                      <AlertTitle variant="success">
                        <CheckCircle2 size={14} />
                        Seus dados estão seguros
                      </AlertTitle>
                      <AlertText variant="success">
                        Respeitamos sua privacidade e nunca compartilhamos seus dados pessoais com terceiros sem sua
                        permissão explícita.
                      </AlertText>
                    </AlertBox>
                  </TwoColumnGrid>

                  <AlertBox variant="info">
                    <AlertTitle variant="info">
                      <FileText size={14} />
                      Política de Privacidade
                    </AlertTitle>
                    <AlertText variant="info">
                      Nossa política de privacidade foi atualizada recentemente. Recomendamos que você revise as
                      mudanças.
                    </AlertText>
                    <Button variant="outline" style={{ marginTop: "12px", padding: "6px 12px" }}>
                      Ver política de privacidade
                    </Button>
                  </AlertBox>
                </FormGrid>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar configurações de privacidade"}
                  {!loading && <Save size={16} />}
                </Button>
              </CardFooter>
            </Card>
          </TabContent>
        </TabsContainer>
      </Container>

      {/* Modal de Localização */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={handleLocationCancel}
        onConfirm={handleLocationConfirm}
        isEnabling={pendingLocationState}
      />

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmSave}
      />

      {showToast && (
        <Toast>
          <CheckCircle2 size={18} />
          <div>
            <strong>Alterações salvas com sucesso!</strong>
            <p style={{ margin: "0", fontSize: "12px" }}>Suas configurações foram atualizadas.</p>
          </div>
        </Toast>
      )}
    </>
  )
}

export default ConfiguracoesTab

