<<<<<<< HEAD
"use client"

import type React from "react"
import styled from "styled-components"
import { X, MapPin, AlertTriangle, AlertCircle, Info, Save } from "lucide-react"

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
  orange: "#ff9800",
}

// Modal base components
=======
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

import React from "react"
import styled from "styled-components"

>>>>>>> 781dada54d96921395cd7551e49774e7fa09e040
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
<<<<<<< HEAD
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

const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.3s ease;
`

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

const ModalContent = styled.div`
  padding: 20px;
  color: inherit;
  transition: color 0.3s ease;
`

const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${colors.lightGray};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  transition: border-color 0.3s ease;
`

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

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 8px 0;
  color: ${colors.green};
`

const ListItem = styled.li`
  margin-bottom: 4px;
`

// LocationModal component
interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isEnabling: boolean
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onConfirm, isEnabling }) => {
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
=======
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: white; // Adicione esta linha para definir o background branco
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

export const LocationModal = ({ isOpen, onClose, onConfirm, isEnabling }) => {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Confirmar Ação</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <p>
          {isEnabling
            ? "Você está prestes a ativar o compartilhamento de localização. Deseja continuar?"
            : "Você está prestes a desativar o compartilhamento de localização. Deseja continuar?"}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </ModalContent>
>>>>>>> 781dada54d96921395cd7551e49774e7fa09e040
    </ModalOverlay>
  )
}

<<<<<<< HEAD
// ConfirmationModal component
interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
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

=======
export const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Confirmar Salvamento</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <p>Você está prestes a salvar as alterações. Deseja continuar?</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  )
}
>>>>>>> 781dada54d96921395cd7551e49774e7fa09e040
