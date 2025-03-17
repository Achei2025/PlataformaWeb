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
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styled, { css, ThemeProvider } from "styled-components"
// Importe o QRCode de forma dinâmica para evitar erros de SSR
import dynamic from "next/dynamic"

const QRCode = dynamic(() => import("qrcode.react"), { ssr: false })
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import {
  Calendar,
  Camera,
  FileText,
  Package,
  Truck,
  QrCode,
  X,
  Download,
  Info,
  Image,
  FileImage,
  DollarSign,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  ImageIcon,
  AlertTriangle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { useToast } from "../../../components/ui/use-toast"

const categories = [
  { value: "eletronico", label: "Eletrônico" },
  { value: "veiculo", label: "Veículo" },
  { value: "imovel", label: "Imóvel" },
  { value: "outro", label: "Outro" },
]

interface FormValues {
  categoria: string
  nome: string
  descricao: string
  marca: string
  modelo: string
  dataAquisicao: string
  numeroSerie?: string
  imei?: string
  chassi?: string
  situacao: string
  notaFiscal: File | null
  imagens: FileList | null
  preco: string
}

interface ObjectItemProps {
  id: string
  categoria: string
  nome: string
  descricao: string
  marca: string
  modelo: string
  dataAquisicao: string
  numeroSerie?: string
  imei?: string
  chassi?: string
  situacao: string
  dataCadastro: string
  cpfDono: string
  emailDono: string
  notaFiscalUrl?: string
  imagensUrls?: string[]
  preco: string
}

const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
  categoria: Yup.string().required("Categoria é obrigatória"),
  nome: Yup.string().required("Nome é obrigatório"),
  descricao: Yup.string().required("Descrição é obrigatória"),
  marca: Yup.string().required("Marca é obrigatória"),
  modelo: Yup.string().required("Modelo é obrigatória"),
  dataAquisicao: Yup.string()
    .required("Data de aquisição é obrigatória")
    .test("is-date", "Data inválida", (value) => !value || !isNaN(Date.parse(value))),
  numeroSerie: Yup.string().when("categoria", {
    is: "eletronico",
    then: (schema) => schema.required("Número de série é obrigatório para eletrônicos"),
    otherwise: (schema) => schema.notRequired(),
  }),
  imei: Yup.string().when("categoria", {
    is: "eletronico",
    then: (schema) => schema.required("IMEI é obrigatório para telefones e notebooks"),
    otherwise: (schema) => schema.notRequired(),
  }),
  chassi: Yup.string().when("categoria", {
    is: "veiculo",
    then: (schema) => schema.required("Chassi é obrigatório para veículos"),
    otherwise: (schema) => schema.notRequired(),
  }),
  situacao: Yup.string().required("Situação é obrigatória"),
  notaFiscal: Yup.mixed<File>().nullable(),
  imagens: Yup.mixed<FileList>().nullable(),
  preco: Yup.string()
    .required("Preço é obrigatório")
    .matches(/^\d+(\.\d{1,2})?$/, "Formato inválido. Use ponto para decimais (ex: 1234.56)"),
})

// Update the dark theme colors for better contrast and readability
const theme = {
  light: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#10b981",
    secondaryHover: "#059669",
    background: "#f3f4f6",
    cardBackground: "#ffffff",
    cardBackgroundHover: "#f9fafb",
    text: "#1f2937",
    textLight: "#6b7280",
    border: "#d1d5db",
    borderHover: "#9ca3af",
    error: "#ef4444",
    success: "#10b981",
    warning: "#f59e0b",
    info: "#3b82f6",
    shadow: "rgba(0, 0, 0, 0.1)",
    shadowHover: "rgba(0, 0, 0, 0.15)",
  },
  dark: {
    primary: "#60a5fa", // Lighter blue for better visibility
    primaryHover: "#3b82f6",
    secondary: "#34d399", // Lighter green
    secondaryHover: "#10b981",
    background: "#0f172a", // Deeper dark background
    cardBackground: "#1e293b", // Softer dark card
    cardBackgroundHover: "#334155",
    text: "#f1f5f9", // Lighter text for better contrast
    textLight: "#cbd5e1", // Lighter secondary text
    border: "#334155", // More visible border
    borderHover: "#475569",
    error: "#f87171", // Lighter red
    success: "#34d399", // Lighter green
    warning: "#fbbf24", // Lighter yellow
    info: "#60a5fa", // Lighter blue
    shadow: "rgba(0, 0, 0, 0.3)",
    shadowHover: "rgba(0, 0, 0, 0.4)",
  },
}

// Ajustar os estilos dos componentes para usar as novas cores
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

// Update FormCard for better dark mode contrast
const FormCard = styled(Card)<{ isDark: boolean }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${(props) => (props.isDark ? theme.dark.cardBackground : theme.light.cardBackground)};
  box-shadow: 0 4px 6px -1px ${(props) => (props.isDark ? theme.dark.shadow : theme.light.shadow)}, 
              0 2px 4px -1px ${(props) => (props.isDark ? theme.dark.shadow : theme.light.shadow)};
  border-radius: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid ${(props) => (props.isDark ? theme.dark.border : theme.light.border)};
  
  &:hover {
    box-shadow: 0 10px 15px -3px ${(props) => (props.isDark ? theme.dark.shadowHover : theme.light.shadowHover)}, 
                0 4px 6px -2px ${(props) => (props.isDark ? theme.dark.shadowHover : theme.light.shadowHover)};
  }
`

// Update CardTitleStyled for better dark mode contrast
const CardTitleStyled = styled(CardTitle)<{ isDark: boolean }>`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${(props) => (props.isDark ? theme.dark.primary : theme.light.text)};
  text-align: center;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

// Update LabelStyled for better dark mode contrast
const LabelStyled = styled(Label)<{ isDark: boolean }>`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
`

// Update inputStyles for better dark mode contrast
const inputStyles = css<{ isDark: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.isDark ? theme.dark.border : theme.light.border)};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => (props.isDark ? "rgba(30, 41, 59, 0.8)" : theme.light.cardBackground)};
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.isDark ? theme.dark.primary : theme.light.primary)};
    box-shadow: 0 0 0 3px ${(props) => (props.isDark ? "rgba(96, 165, 250, 0.3)" : "rgba(59, 130, 246, 0.25)")};
  }
  
  &:hover {
    border-color: ${(props) => (props.isDark ? theme.dark.borderHover : theme.light.borderHover)};
  }
`

// Update InputStyled for better dark mode contrast
const InputStyled = styled(Input)<{ isDark: boolean }>`
  ${inputStyles}
`

// Update TextareaStyled for better dark mode contrast
const TextareaStyled = styled(Textarea)<{ isDark: boolean }>`
  ${inputStyles}
  height: 5rem;
  resize: vertical;
`

// Update SelectTriggerStyled for better dark mode contrast
const SelectTriggerStyled = styled(SelectTrigger)<{ isDark: boolean }>`
  ${inputStyles}
`

// Update SelectContentStyled for better dark mode contrast
const SelectContentStyled = styled(SelectContent)<{ isDark: boolean }>`
  z-index: 1000;
  background-color: ${(props) => (props.isDark ? theme.dark.cardBackground : theme.light.cardBackground)};
  border: 1px solid ${(props) => (props.isDark ? theme.dark.border : theme.light.border)};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px ${(props) => (props.isDark ? theme.dark.shadow : theme.light.shadow)}, 
              0 2px 4px -1px ${(props) => (props.isDark ? theme.dark.shadow : theme.light.shadow)};
  overflow: hidden;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  & > * {
    color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  }
`

// Update ErrorText for better dark mode contrast
const ErrorText = styled.div<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? theme.dark.error : theme.light.error)};
  font-size: 0.75rem;
  margin-top: 0.125rem;
`

// Update SubmitButton for better dark mode contrast
const SubmitButton = styled(Button)<{ isDark: boolean }>`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${(props) => (props.isDark ? theme.dark.primary : theme.light.primary)};
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${(props) => (props.isDark ? theme.dark.primaryHover : theme.light.primaryHover)};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

// Update FileInputLabel for better dark mode contrast
const FileInputLabel = styled.label<{ isDark: boolean }>`
  display: inline-block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  background-color: ${(props) => (props.isDark ? "rgba(30, 41, 59, 0.5)" : theme.light.background)};
  border: 1px solid ${(props) => (props.isDark ? theme.dark.border : theme.light.border)};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${(props) => (props.isDark ? theme.dark.borderHover : theme.light.borderHover)};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const FileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
`

// Update QRCodeContainer for better dark mode contrast
const QRCodeContainer = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: ${(props) => (props.isDark ? "rgba(15, 23, 42, 0.7)" : theme.light.background)};
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  transition: background-color 0.3s ease;
`

const ObjectListContainer = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

// Update ObjectCard for better dark mode contrast
const ObjectCard = styled(Card)<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid transparent;
  height: 100%;
  background-color: ${(props) => (props.isDark ? theme.dark.cardBackground : theme.light.cardBackground)};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 20px -5px ${(props) => (props.isDark ? theme.dark.shadowHover : theme.light.shadowHover)}, 
                0 10px 10px -5px ${(props) => (props.isDark ? theme.dark.shadowHover : theme.light.shadowHover)};
    border-color: ${(props) => (props.isDark ? theme.dark.primary : theme.light.primary)};
  }
  
  &:active {
    transform: translateY(-2px);
  }
`

// Update ObjectCardContent for better dark mode contrast
const ObjectCardContent = styled(CardContent)<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  padding: 1.25rem;
  background-color: ${(props) => (props.isDark ? theme.dark.cardBackground : theme.light.cardBackground)};
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  transition: background-color 0.3s ease, color 0.3s ease;
`

// Update ObjectCardHeader for better dark mode contrast
const ObjectCardHeader = styled(CardHeader)<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? theme.dark.primary : theme.light.primary)};
  padding: 1.25rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.4), ${(props) => (props.isDark ? "rgba(59, 130, 246, 0.9)" : "rgba(59, 130, 246, 0.9)")});
    z-index: 1;
  }
`

const ObjectCardTitle = styled(CardTitle)`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  z-index: 2;
`

const ObjectDetail = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
`

const ObjectProperty = styled.span<{ isDark: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  font-size: 0.875rem;
`

const ObjectValue = styled.span<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? theme.dark.textLight : theme.light.textLight)};
  font-size: 1rem;
`

const ObjectDetailSection = styled.div<{ isDark: boolean }>`
  margin-top: 0.75rem;
  background-color: ${(props) => (props.isDark ? theme.dark.cardBackground : theme.light.cardBackground)};
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 1px 2px ${(props) => (props.isDark ? theme.dark.shadow : theme.light.shadow)};
`

const ObjectDetailTitle = styled.h3<{ isDark: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// Update ObjectDetailContainer for better dark mode contrast
const ObjectDetailContainer = styled.div<{ isDark: boolean }>`
  border: 1px solid ${(props) => (props.isDark ? theme.dark.border : theme.light.border)};
  border-radius: 0.5rem;
  padding: 0.75rem;
  background-color: ${(props) => (props.isDark ? "rgba(15, 23, 42, 0.5)" : theme.light.background)};
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
`

// Update SensitiveInfoContainer for better dark mode contrast
const SensitiveInfoContainer = styled.div<{ isDark: boolean }>`
  margin-top: 0.75rem;
  background-color: ${(props) => (props.isDark ? "rgba(30, 41, 59, 0.7)" : theme.light.cardBackground)};
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 1px 2px ${(props) => (props.isDark ? theme.dark.shadow : theme.light.shadow)};
  border-left: 4px solid ${(props) => (props.isDark ? theme.dark.info : theme.light.info)};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const InfoLabel = styled.div<{ isDark: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`

const InfoValue = styled.span<{ isDark: boolean }>`
  font-weight: normal;
  color: ${(props) => (props.isDark ? theme.dark.textLight : theme.light.textLight)};
  font-size: 0.875rem;
`

// Update TabsListStyled for better dark mode contrast
const TabsListStyled = styled(TabsList)<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "rgba(15, 23, 42, 0.7)" : theme.light.background)};
  padding: 0.25rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;
`

// Update TabsTriggerStyled for better dark mode contrast
const TabsTriggerStyled = styled(TabsTrigger)<{ isDark: boolean }>`
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease;
  border-radius: 9999px;
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  
  &[data-state="active"] {
    background-color: ${(props) => (props.isDark ? theme.dark.primary : theme.light.primary)};
    color: white;
    box-shadow: 0 4px 6px -1px ${(props) => (props.isDark ? theme.dark.shadow : theme.light.shadow)};
  }
  
  &:hover:not([data-state="active"]) {
    background-color: ${(props) => (props.isDark ? "rgba(55, 65, 81, 0.7)" : theme.light.border)};
  }
`

// Update DialogContentStyled for better dark mode contrast
const DialogContentStyled = styled(DialogContent)<{ isDark: boolean }>`
  max-width: 900px;
  width: 95vw;
  border-radius: 0.75rem;
  padding: 0;
  overflow: hidden;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDark ? theme.dark.cardBackground : theme.light.cardBackground)};
  border: 1px solid ${(props) => (props.isDark ? theme.dark.border : theme.light.border)};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`

// Update DialogHeaderStyled for better dark mode contrast
const DialogHeaderStyled = styled(DialogHeader)<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? theme.dark.primary : theme.light.primary)};
  padding: 1rem;
  color: white;
  transition: background-color 0.3s ease;
`

const DialogTitleStyled = styled(DialogTitle)`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
`

const DialogDescriptionStyled = styled(DialogDescription)`
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.25rem;
  font-size: 0.875rem;
`

// Update DialogBodyStyled for better dark mode contrast
const DialogBodyStyled = styled.div<{ isDark: boolean }>`
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
  max-height: calc(90vh - 140px);
  background-color: ${(props) => (props.isDark ? theme.dark.cardBackground : theme.light.cardBackground)};
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  transition: background-color 0.3s ease, color 0.3s ease;
`

// Update DialogFooterStyled for better dark mode contrast
const DialogFooterStyled = styled(DialogFooter)<{ isDark: boolean }>`
  padding: 0.75rem;
  background-color: ${(props) => (props.isDark ? "rgba(15, 23, 42, 0.8)" : theme.light.background)};
  border-top: 1px solid ${(props) => (props.isDark ? theme.dark.border : theme.light.border)};
  gap: 0.5rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0 1rem;
  height: 2.5rem;
  transition: all 0.2s ease;
  border-radius: 9999px;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const HeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

// Update PriceExplanation for better dark mode contrast
const PriceExplanation = styled.div<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "rgba(15, 23, 42, 0.7)" : theme.light.background)};
  border-left: 3px solid ${(props) => (props.isDark ? theme.dark.info : theme.light.info)};
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: ${(props) => (props.isDark ? theme.dark.textLight : theme.light.textLight)};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: fit-content;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
`

const ExplanatoryNote = styled.p<{ isDark: boolean }>`
  font-size: 0.7rem;
  color: ${(props) => (props.isDark ? theme.dark.textLight : theme.light.textLight)};
  margin-top: 0.25rem;
  font-style: italic;
`

interface CadastrarTabProps {
  darkMode: boolean
}

// Modificar o CadastrarTab para usar o tema do ThemeProvider
const CadastrarTab: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  // ... (mantenha os estados existentes)
  const { toast } = useToast()
  const [showConfirmCadastroDialog, setShowConfirmCadastroDialog] = useState(false)
  const [showConfirmEditDialog, setShowConfirmEditDialog] = useState(false)
  const [objectToConfirmCadastro, setObjectToConfirmCadastro] = useState<FormValues | null>(null)
  const [objectToConfirmEdit, setObjectToConfirmEdit] = useState<FormValues | null>(null)
  const [objectsData, setObjectsData] = useState<ObjectItemProps[]>(mockObjects)
  const [filteredObjects, setFilteredObjects] = useState<ObjectItemProps[]>(mockObjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [showObjectList, setShowObjectList] = useState<boolean>(objectsData.length > 0)
  const [showQRDialog, setShowQRDialog] = useState<boolean>(false)
  const [showObjectDialog, setShowObjectDialog] = useState<boolean>(false)
  const [showImagesDialog, setShowImagesDialog] = useState<boolean>(false)
  const [showReceiptDialog, setShowReceiptDialog] = useState<boolean>(false)
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const [currentObject, setCurrentObject] = useState<ObjectItemProps | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(1)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [objectToConfirm, setObjectToConfirm] = useState<FormValues | null>(null)
  const [showDeleteImageConfirmDialog, setShowDeleteImageConfirmDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)

  const initialValues: FormValues = {
    categoria: "",
    nome: "",
    descricao: "",
    marca: "",
    modelo: "",
    dataAquisicao: "",
    numeroSerie: "",
    imei: "",
    chassi: "",
    situacao: "",
    notaFiscal: null,
    imagens: null,
    preco: "",
  }

  // Função para alternar o modo de tela cheia
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const imageContainer = document.getElementById("image-container")
      if (imageContainer) {
        imageContainer.requestFullscreen().catch((err) => {
          console.error(`Erro ao entrar em tela cheia: ${err.message}`)
        })
      }
    } else {
      document.exitFullscreen()
    }
  }

  // Monitorar mudanças no estado de tela cheia
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const filtered = objectsData.filter((object) => object.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredObjects(filtered)
  }, [searchTerm, objectsData])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleEditObject = (values: FormValues) => {
    setObjectToConfirmEdit(values)
    setShowConfirmEditDialog(true)
  }

  // Mock API call (replace with your actual API endpoint)
  const api = {
    post: async (url: string, formData: FormData, config: any) => {
      // Simulate an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Simulating API call to", url, "with data", formData)
          resolve({ status: 200, message: "Object created successfully" })
        }, 1000)
      })
    },
  }

  async function createObject(values: FormValues) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      await api.post("/objects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast({
        title: "Objeto cadastrado com sucesso!",
      })
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Erro ao cadastrar objeto!",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    setObjectToConfirmCadastro(values)
    setShowConfirmCadastroDialog(true)
    setSubmitting(false)
  }

  const confirmObjectCreation = () => {
    if (objectToConfirmCadastro) {
      console.log("Objeto cadastrado:", objectToConfirmCadastro)

      // Gerar URLs de placeholder para as imagens enviadas
      const imagensUrls: string[] = []
      if (objectToConfirmCadastro.imagens) {
        for (let i = 0; i < objectToConfirmCadastro.imagens.length; i++) {
          imagensUrls.push(`/placeholder.svg?height=600&width=800&text=Imagem+${i + 1}`)
        }
      }

      // Adicionar novo objeto à lista
      const newObject: ObjectItemProps = {
        id: `obj${objectsData.length + 1}`.padStart(6, "0"),
        ...objectToConfirmCadastro,
        dataCadastro: new Date().toISOString().split("T")[0],
        cpfDono: "123.456.789-00", // Simulando o CPF do usuário logado
        emailDono: "usuario@example.com", // Simulando o email do usuário logado
        notaFiscalUrl: objectToConfirmCadastro.notaFiscal
          ? "/placeholder.svg?height=800&width=600&text=Nota+Fiscal+Nova"
          : undefined,
        imagensUrls: imagensUrls.length > 0 ? imagensUrls : undefined,
      }

      setObjectsData([...objectsData, newObject])
      setFilteredObjects([...objectsData, newObject])
      setShowObjectList(true)
      setShowConfirmCadastroDialog(false)
      setObjectToConfirmCadastro(null)
    }
  }

  const confirmObjectEdit = () => {
    if (currentObject && objectToConfirmEdit) {
      const updatedObject = { ...currentObject, ...objectToConfirmEdit }
      const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))
      setObjectsData(updatedObjects)
      setFilteredObjects(updatedObjects)
      setCurrentObject(updatedObject)
      setShowEditDialog(false)
      setShowConfirmEditDialog(false)
      setObjectToConfirmEdit(null)
    }
  }

  const showEditForm = () => {
    setShowEditDialog(true)
  }

  const handleEdit = (values: FormValues) => {
    if (currentObject) {
      const updatedObject = { ...currentObject, ...values }
      const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))
      setObjectsData(updatedObjects)
      setCurrentObject(updatedObject)
      setShowEditDialog(false)
    }
  }

  const showQRCode = () => {
    if (!currentObject) return
    setShowQRDialog(true)
  }

  const showImages = () => {
    if (!currentObject || !currentObject.imagensUrls || currentObject.imagensUrls.length === 0) return
    setCurrentImageIndex(0)
    setZoom(1)
    setShowImagesDialog(true)
  }

  const showReceipt = () => {
    if (!currentObject || !currentObject.notaFiscalUrl) return
    setShowReceiptDialog(true)
  }

  const downloadQRCode = () => {
    if (!currentObject) return

    const canvas = document.getElementById("qr-code") as HTMLCanvasElement
    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = url
    link.download = `qrcode-${currentObject.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const viewObjectDetails = (object: ObjectItemProps) => {
    setCurrentObject(object)
    setShowObjectDialog(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const getSituationLabel = (situation: string) => {
    switch (situation) {
      case "novo":
        return "Novo"
      case "usado":
        return "Usado"
      case "danificado":
        return "Danificado"
      default:
        return situation
    }
  }

  const nextImage = () => {
    if (!currentObject || !currentObject.imagensUrls) return
    setCurrentImageIndex((prev) => (prev + 1) % currentObject.imagensUrls!.length)
  }

  const prevImage = () => {
    if (!currentObject || !currentObject.imagensUrls) return
    setCurrentImageIndex((prev) => (prev - 1 + currentObject.imagensUrls!.length) % currentObject.imagensUrls!.length)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  const handleDeleteObject = () => {
    if (currentObject) {
      const updatedObjects = objectsData.filter((obj) => obj.id !== currentObject.id)
      setObjectsData(updatedObjects)
      setFilteredObjects(updatedObjects)
      setShowObjectDialog(false)
      setShowDeleteConfirmDialog(false)
    }
  }

  const handleDeleteImage = () => {
    if (currentObject && currentObject.imagensUrls) {
      const updatedImageUrls = currentObject.imagensUrls.filter((_, index) => index !== currentImageIndex)
      const updatedObject = { ...currentObject, imagensUrls: updatedImageUrls }
      const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))
      setObjectsData(updatedObjects)
      setFilteredObjects(updatedObjects)
      setCurrentObject(updatedObject)
      setShowDeleteImageConfirmDialog(false)
      if (updatedImageUrls.length === 0) {
        setShowImagesDialog(false)
      } else {
        setCurrentImageIndex(Math.min(currentImageIndex, updatedImageUrls.length - 1))
      }
    }
  }

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && currentObject) {
      const newImageUrls = Array.from(files).map(() => `/placeholder.svg?height=600&width=800&text=Nova+Imagem`)
      const updatedImageUrls = [...(currentObject.imagensUrls || []), ...newImageUrls]
      const updatedObject = { ...currentObject, imagensUrls: updatedImageUrls }
      const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))
      setObjectsData(updatedObjects)
      setFilteredObjects(updatedObjects)
      setCurrentObject(updatedObject)
      setCurrentImageIndex(updatedImageUrls.length - 1)
    }
  }

  // Modifique o retorno para usar o tema diretamente
  return (
    <ThemeProvider theme={{ mode: darkMode ? "dark" : "light" }}>
      <Container>
        <Tabs
          defaultValue={objectsData.length > 0 ? "list" : "form"}
          onValueChange={(val) => setShowObjectList(val === "list")}
        >
          <TabsListStyled className="grid w-full max-w-md mx-auto grid-cols-2" isDark={darkMode}>
            <TabsTriggerStyled value="list" isDark={darkMode}>
              Objetos Cadastrados
            </TabsTriggerStyled>
            <TabsTriggerStyled value="form" isDark={darkMode}>
              Cadastrar Novo
            </TabsTriggerStyled>
          </TabsListStyled>

          <TabsContent value="list">
            <FormCard isDark={darkMode}>
              <CardHeader>
                <CardTitleStyled isDark={darkMode}>Objetos Cadastrados</CardTitleStyled>
              </CardHeader>
              <CardContent>
                <SearchContainer>
                  <SearchInput
                    type="text"
                    placeholder="Buscar por nome..."
                    value={searchTerm}
                    onChange={handleSearch}
                    isDark={darkMode}
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </SearchContainer>
                <ObjectListContainer>
                  {filteredObjects.map((object) => (
                    <ObjectCard key={object.id} onClick={() => viewObjectDetails(object)} isDark={darkMode}>
                      <ObjectCardHeader isDark={darkMode}>
                        <HeaderImage>
                          <img
                            src={object.imagensUrls?.[0] || "/placeholder.svg?height=200&width=300&text=No+Image"}
                            alt={object.nome}
                          />
                        </HeaderImage>
                        <ObjectCardTitle>{object.nome}</ObjectCardTitle>
                      </ObjectCardHeader>
                      <ObjectCardContent isDark={darkMode}>
                        <CategoryBadge isDark={darkMode}>
                          {categories.find((c) => c.value === object.categoria)?.label || object.categoria}
                        </CategoryBadge>

                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Marca / Modelo:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>
                            {object.marca} / {object.modelo}
                          </ObjectValue>
                        </ObjectDetail>

                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Data de Aquisição:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{formatDate(object.dataAquisicao)}</ObjectValue>
                        </ObjectDetail>

                        <SituationBadge situation={object.situacao} isDark={darkMode}>
                          {getSituationLabel(object.situacao)}
                        </SituationBadge>
                      </ObjectCardContent>
                    </ObjectCard>
                  ))}
                </ObjectListContainer>
              </CardContent>
            </FormCard>
          </TabsContent>

          <TabsContent value="form">
            <FormCard isDark={darkMode}>
              <CardHeader>
                <CardTitleStyled isDark={darkMode}>Cadastrar Novo Objeto</CardTitleStyled>
              </CardHeader>
              <CardContent>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ values, isSubmitting, setFieldValue }) => (
                    <FormContainer>
                      <FormGrid>
                        <FormSection>
                          <FormField>
                            <LabelStyled htmlFor="categoria" isDark={darkMode}>
                              <Package size={18} />
                              Categoria
                            </LabelStyled>
                            <Select name="categoria" onValueChange={(value) => setFieldValue("categoria", value)}>
                              <SelectTriggerStyled isDark={darkMode}>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTriggerStyled>
                              <SelectContentStyled isDark={darkMode}>
                                {categories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContentStyled>
                            </Select>
                            <ErrorMessage name="categoria" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="nome" isDark={darkMode}>
                              Nome do Objeto
                            </LabelStyled>
                            <Field as={InputStyled} type="text" id="nome" name="nome" isDark={darkMode} />
                            <ErrorMessage name="nome" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="descricao" isDark={darkMode}>
                              Descrição
                            </LabelStyled>
                            <Field as={TextareaStyled} id="descricao" name="descricao" isDark={darkMode} />
                            <ErrorMessage name="descricao" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <FormRow>
                            <FormField>
                              <LabelStyled htmlFor="marca" isDark={darkMode}>
                                Marca
                              </LabelStyled>
                              <Field as={InputStyled} type="text" id="marca" name="marca" isDark={darkMode} />
                              <ErrorMessage name="marca" component={ErrorText} isDark={darkMode} />
                            </FormField>
                            <FormField>
                              <LabelStyled htmlFor="modelo" isDark={darkMode}>
                                Modelo
                              </LabelStyled>
                              <Field as={InputStyled} type="text" id="modelo" name="modelo" isDark={darkMode} />
                              <ErrorMessage name="modelo" component={ErrorText} isDark={darkMode} />
                            </FormField>
                          </FormRow>
                          <FormField>
                            <LabelStyled htmlFor="preco" isDark={darkMode}>
                              <DollarSign size={18} />
                              Preço
                            </LabelStyled>
                            <Field
                              as={InputStyled}
                              type="text"
                              id="preco"
                              name="preco"
                              placeholder="0.00"
                              isDark={darkMode}
                            />
                            <ErrorMessage name="preco" component={ErrorText} isDark={darkMode} />
                          </FormField>
                        </FormSection>
                        <FormSection>
                          <FormField>
                            <LabelStyled htmlFor="dataAquisicao" isDark={darkMode}>
                              <Calendar size={18} />
                              Data de Aquisição
                            </LabelStyled>
                            <Field
                              as={InputStyled}
                              type="date"
                              id="dataAquisicao"
                              name="dataAquisicao"
                              isDark={darkMode}
                            />
                            <ErrorMessage name="dataAquisicao" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          {values.categoria === "eletronico" && (
                            <>
                              <FormField>
                                <LabelStyled htmlFor="numeroSerie" isDark={darkMode}>
                                  Número de Série
                                </LabelStyled>
                                <Field
                                  as={InputStyled}
                                  type="text"
                                  id="numeroSerie"
                                  name="numeroSerie"
                                  isDark={darkMode}
                                />
                                <ErrorMessage name="numeroSerie" component={ErrorText} isDark={darkMode} />
                              </FormField>
                              <FormField>
                                <LabelStyled htmlFor="imei" isDark={darkMode}>
                                  IMEI (para telefones e notebooks)
                                </LabelStyled>
                                <Field as={InputStyled} type="text" id="imei" name="imei" isDark={darkMode} />
                                <ErrorMessage name="imei" component={ErrorText} isDark={darkMode} />
                              </FormField>
                            </>
                          )}
                          {values.categoria === "veiculo" && (
                            <FormField>
                              <LabelStyled htmlFor="chassi" isDark={darkMode}>
                                <Truck size={18} />
                                Chassi
                              </LabelStyled>
                              <Field as={InputStyled} type="text" id="chassi" name="chassi" isDark={darkMode} />
                              <ErrorMessage name="chassi" component={ErrorText} isDark={darkMode} />
                            </FormField>
                          )}
                          <FormField>
                            <LabelStyled htmlFor="situacao" isDark={darkMode}>
                              Situação
                            </LabelStyled>
                            <Select name="situacao" onValueChange={(value) => setFieldValue("situacao", value)}>
                              <SelectTriggerStyled isDark={darkMode}>
                                <SelectValue placeholder="Selecione a situação" />
                              </SelectTriggerStyled>
                              <SelectContentStyled isDark={darkMode}>
                                <SelectItem value="novo">Novo</SelectItem>
                                <SelectItem value="usado">Usado</SelectItem>
                                <SelectItem value="danificado">Danificado</SelectItem>
                              </SelectContentStyled>
                            </Select>
                            <ErrorMessage name="situacao" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="notaFiscal" isDark={darkMode}>
                              <FileText size={18} />
                              Nota Fiscal (arquivo)
                            </LabelStyled>
                            <FileInputWrapper>
                              <FileInputLabel htmlFor="notaFiscal" isDark={darkMode}>
                                Escolher arquivo
                              </FileInputLabel>
                              <FileInput
                                type="file"
                                id="notaFiscal"
                                name="notaFiscal"
                                onChange={(event) => {
                                  setFieldValue("notaFiscal", event.currentTarget.files?.[0])
                                }}
                              />
                            </FileInputWrapper>
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="imagens" isDark={darkMode}>
                              <Camera size={18} />
                              Imagens
                            </LabelStyled>
                            <FileInputWrapper>
                              <FileInputLabel htmlFor="imagens" isDark={darkMode}>
                                Escolher imagens
                              </FileInputLabel>
                              <FileInput
                                type="file"
                                id="imagens"
                                name="imagens"
                                multiple
                                onChange={(event) => {
                                  setFieldValue("imagens", event.currentTarget.files)
                                }}
                              />
                            </FileInputWrapper>
                          </FormField>
                          <PriceExplanation isDark={darkMode}>
                            <div className="flex items-center gap-2">
                              <Info size={16} className="text-blue-500" />
                              <span className="font-semibold">Sobre o preço</span>
                            </div>
                            <p>
                              O valor informado será utilizado para análises preditivas de risco e estimativas de danos
                              potenciais, contribuindo para uma gestão mais eficaz e precisa do patrimônio.
                            </p>
                          </PriceExplanation>
                        </FormSection>
                      </FormGrid>
                      <SubmitButton type="submit" disabled={isSubmitting} isDark={darkMode}>
                        {isSubmitting ? "Cadastrando..." : "Cadastrar Objeto"}
                      </SubmitButton>
                    </FormContainer>
                  )}
                </Formik>
              </CardContent>
            </FormCard>
          </TabsContent>
        </Tabs>

        {/* Object Details Dialog */}
        <Dialog open={showObjectDialog} onOpenChange={setShowObjectDialog}>
          <DialogContentStyled isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>{currentObject?.nome}</DialogTitleStyled>
              <DialogDescriptionStyled>Detalhes do objeto cadastrado</DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogBodyStyled isDark={darkMode}>
              {currentObject && (
                <>
                  <ObjectDetailSection isDark={darkMode}>
                    <ObjectDetailTitle isDark={darkMode}>
                      <Info size={16} />
                      Informações Básicas
                    </ObjectDetailTitle>
                    <ObjectDetailContainer isDark={darkMode}>
                      <InfoGrid>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Categoria:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>
                            {categories.find((c) => c.value === currentObject.categoria)?.label ||
                              currentObject.categoria}
                          </ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Situação:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{getSituationLabel(currentObject.situacao)}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Marca:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{currentObject.marca}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Modelo:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{currentObject.modelo}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Data de Aquisição:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{formatDate(currentObject.dataAquisicao)}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Data de Cadastro:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{formatDate(currentObject.dataCadastro)}</ObjectValue>
                        </ObjectDetail>
                      </InfoGrid>
                    </ObjectDetailContainer>
                  </ObjectDetailSection>

                  <SensitiveInfoContainer isDark={darkMode}>
                    <ObjectDetailTitle isDark={darkMode}>Informações Sensíveis</ObjectDetailTitle>
                    <InfoGrid>
                      {currentObject.categoria === "eletronico" && (
                        <>
                          <InfoLabel isDark={darkMode}>
                            Número de Série: <InfoValue isDark={darkMode}>{currentObject.numeroSerie}</InfoValue>
                          </InfoLabel>
                          <InfoLabel isDark={darkMode}>
                            IMEI: <InfoValue isDark={darkMode}>{currentObject.imei}</InfoValue>
                          </InfoLabel>
                        </>
                      )}

                      {currentObject.categoria === "veiculo" && (
                        <InfoLabel isDark={darkMode}>
                          Chassi: <InfoValue isDark={darkMode}>{currentObject.chassi}</InfoValue>
                        </InfoLabel>
                      )}

                      <InfoLabel isDark={darkMode}>
                        CPF do Proprietário: <InfoValue isDark={darkMode}>{currentObject.cpfDono}</InfoValue>
                      </InfoLabel>
                      <InfoLabel isDark={darkMode}>
                        Email do Proprietário: <InfoValue isDark={darkMode}>{currentObject.emailDono}</InfoValue>
                      </InfoLabel>
                      <InfoLabel isDark={darkMode}>
                        Preço:{" "}
                        <InfoValue isDark={darkMode}>R$ {Number.parseFloat(currentObject.preco).toFixed(2)}</InfoValue>
                      </InfoLabel>
                      <InfoLabel isDark={darkMode}>
                        Informações Adicionais: <InfoValue isDark={darkMode}>{currentObject.descricao}</InfoValue>
                      </InfoLabel>
                    </InfoGrid>
                  </SensitiveInfoContainer>
                </>
              )}
            </DialogBodyStyled>

            <DialogFooterStyled isDark={darkMode}>
              {currentObject?.imagensUrls && currentObject.imagensUrls.length > 0 && (
                <ImagesButton type="button" onClick={showImages}>
                  <Image className="h-5 w-5" />
                  Ver Imagens
                </ImagesButton>
              )}
              {currentObject?.notaFiscalUrl && (
                <ReceiptButton type="button" onClick={showReceipt}>
                  <FileImage className="h-5 w-5" />
                  Ver Nota Fiscal
                </ReceiptButton>
              )}
              <QRCodeButton type="button" onClick={showQRCode}>
                <QrCode className="h-5 w-5" />
                Gerar QR Code
              </QRCodeButton>
              <EditButton type="button" onClick={showEditForm}>
                <Edit className="h-5 w-5" />
                Editar
              </EditButton>
              <DeleteButton type="button" onClick={() => setShowDeleteConfirmDialog(true)}>
                <Trash2 className="h-5 w-5" />
                Deletar
              </DeleteButton>
              <CloseButton type="button" variant="secondary" onClick={() => setShowObjectDialog(false)}>
                <X className="h-5 w-5" />
                Fechar
              </CloseButton>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* QR Code Dialog */}
        <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
          <DialogContentStyled className="sm:max-w-md" isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>QR Code para {currentObject?.nome}</DialogTitleStyled>
              <DialogDescriptionStyled>
                Escaneie este QR Code para visualizar as informações do objeto.
              </DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogBodyStyled isDark={darkMode}>
              {currentObject && (
                <QRCodeContainer isDark={darkMode}>
                  <QRCode
                    id="qr-code"
                    value={`https://seusite.com.br/objeto/${currentObject.id}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                  <p className="mt-3 text-xs text-center text-gray-500">
                    Este QR Code contém um link para informações detalhadas sobre o objeto.
                  </p>
                </QRCodeContainer>
              )}
            </DialogBodyStyled>

            <DialogFooterStyled className="sm:justify-center" isDark={darkMode}>
              <DownloadButton type="button" onClick={downloadQRCode}>
                <Download className="h-4 w-4" />
                Download QR Code
              </DownloadButton>
              <CloseButton type="button" variant="secondary" onClick={() => setShowQRDialog(false)}>
                <X className="h-4 w-4" />
                Fechar
              </CloseButton>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* Other dialogs remain the same structure but with isDark prop added */}
        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
          <DialogContentStyled className="sm:max-w-md" isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>Confirmar Exclusão</DialogTitleStyled>
              <DialogDescriptionStyled>
                Tem certeza de que deseja excluir este objeto? Esta ação não pode ser desfeita.
              </DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogFooterStyled className="sm:justify-end" isDark={darkMode}>
              <Button type="button" variant="secondary" onClick={() => setShowDeleteConfirmDialog(false)}>
                Cancelar
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeleteObject}>
                Excluir
              </Button>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* Delete Image Confirmation Dialog */}
        <Dialog open={showDeleteImageConfirmDialog} onOpenChange={setShowDeleteImageConfirmDialog}>
          <DialogContentStyled className="sm:max-w-md" isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>Confirmar Exclusão da Imagem</DialogTitleStyled>
              <DialogDescriptionStyled>
                Tem certeza de que deseja excluir esta imagem? Esta ação não pode ser desfeita.
              </DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogFooterStyled className="sm:justify-end" isDark={darkMode}>
              <Button type="button" variant="secondary" onClick={() => setShowDeleteImageConfirmDialog(false)}>
                Cancelar
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeleteImage}>
                Excluir Imagem
              </Button>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* Edit Object Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContentStyled isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>Editar Objeto</DialogTitleStyled>
              <DialogDescriptionStyled>Edite as informações do objeto.</DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogBodyStyled isDark={darkMode}>
              {currentObject && (
                <Formik initialValues={currentObject} validationSchema={validationSchema} onSubmit={handleEdit}>
                  {({ values, isSubmitting, setFieldValue }) => (
                    <FormContainer>
                      <FormGrid>
                        <FormSection>
                          <FormField>
                            <LabelStyled htmlFor="categoria" isDark={darkMode}>
                              <Package size={18} />
                              Categoria
                            </LabelStyled>
                            <Select
                              name="categoria"
                              onValueChange={(value) => setFieldValue("categoria", value)}
                              defaultValue={values.categoria}
                            >
                              <SelectTriggerStyled isDark={darkMode}>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTriggerStyled>
                              <SelectContentStyled isDark={darkMode}>
                                {categories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContentStyled>
                            </Select>
                            <ErrorMessage name="categoria" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="nome" isDark={darkMode}>
                              Nome do Objeto
                            </LabelStyled>
                            <Field as={InputStyled} type="text" id="nome" name="nome" isDark={darkMode} />
                            <ErrorMessage name="nome" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="descricao" isDark={darkMode}>
                              Descrição
                            </LabelStyled>
                            <Field as={TextareaStyled} id="descricao" name="descricao" isDark={darkMode} />
                            <ErrorMessage name="descricao" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <FormRow>
                            <FormField>
                              <LabelStyled htmlFor="marca" isDark={darkMode}>
                                Marca
                              </LabelStyled>
                              <Field as={InputStyled} type="text" id="marca" name="marca" isDark={darkMode} />
                              <ErrorMessage name="marca" component={ErrorText} isDark={darkMode} />
                            </FormField>
                            <FormField>
                              <LabelStyled htmlFor="modelo" isDark={darkMode}>
                                Modelo
                              </LabelStyled>
                              <Field as={InputStyled} type="text" id="modelo" name="modelo" isDark={darkMode} />
                              <ErrorMessage name="modelo" component={ErrorText} isDark={darkMode} />
                            </FormField>
                          </FormRow>
                          <FormField>
                            <LabelStyled htmlFor="preco" isDark={darkMode}>
                              <DollarSign size={18} />
                              Preço
                            </LabelStyled>
                            <Field
                              as={InputStyled}
                              type="text"
                              id="preco"
                              name="preco"
                              placeholder="0.00"
                              isDark={darkMode}
                            />
                            <ErrorMessage name="preco" component={ErrorText} isDark={darkMode} />
                          </FormField>
                        </FormSection>
                        <FormSection>
                          <FormField>
                            <LabelStyled htmlFor="dataAquisicao" isDark={darkMode}>
                              <Calendar size={18} />
                              Data de Aquisição
                            </LabelStyled>
                            <Field
                              as={InputStyled}
                              type="date"
                              id="dataAquisicao"
                              name="dataAquisicao"
                              isDark={darkMode}
                            />
                            <ErrorMessage name="dataAquisicao" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          {values.categoria === "eletronico" && (
                            <>
                              <FormField>
                                <LabelStyled htmlFor="numeroSerie" isDark={darkMode}>
                                  Número de Série
                                </LabelStyled>
                                <Field
                                  as={InputStyled}
                                  type="text"
                                  id="numeroSerie"
                                  name="numeroSerie"
                                  isDark={darkMode}
                                />
                                <ErrorMessage name="numeroSerie" component={ErrorText} isDark={darkMode} />
                              </FormField>
                              <FormField>
                                <LabelStyled htmlFor="imei" isDark={darkMode}>
                                  IMEI (para telefones e notebooks)
                                </LabelStyled>
                                <Field as={InputStyled} type="text" id="imei" name="imei" isDark={darkMode} />
                                <ErrorMessage name="imei" component={ErrorText} isDark={darkMode} />
                              </FormField>
                            </>
                          )}
                          {values.categoria === "veiculo" && (
                            <FormField>
                              <LabelStyled htmlFor="chassi" isDark={darkMode}>
                                <Truck size={18} />
                                Chassi
                              </LabelStyled>
                              <Field as={InputStyled} type="text" id="chassi" name="chassi" isDark={darkMode} />
                              <ErrorMessage name="chassi" component={ErrorText} isDark={darkMode} />
                            </FormField>
                          )}
                          <FormField>
                            <LabelStyled htmlFor="situacao" isDark={darkMode}>
                              Situação
                            </LabelStyled>
                            <Select
                              name="situacao"
                              onValueChange={(value) => setFieldValue("situacao", value)}
                              defaultValue={values.situacao}
                            >
                              <SelectTriggerStyled isDark={darkMode}>
                                <SelectValue placeholder="Selecione a situação" />
                              </SelectTriggerStyled>
                              <SelectContentStyled isDark={darkMode}>
                                <SelectItem value="novo">Novo</SelectItem>
                                <SelectItem value="usado">Usado</SelectItem>
                                <SelectItem value="danificado">Danificado</SelectItem>
                              </SelectContentStyled>
                            </Select>
                            <ErrorMessage name="situacao" component={ErrorText} isDark={darkMode} />
                          </FormField>
                          <PriceExplanation isDark={darkMode}>
                            <div className="flex items-center gap-2">
                              <Info size={16} className="text-blue-500" />
                              <span className="font-semibold">Sobre o preço</span>
                            </div>
                            <p>
                              O valor informado será utilizado para análises preditivas de risco e estimativas de danos
                              potenciais, contribuindo para uma gestão mais eficaz e precisa do patrimônio.
                            </p>
                          </PriceExplanation>
                        </FormSection>
                      </FormGrid>
                      <SubmitButton type="submit" disabled={isSubmitting} isDark={darkMode}>
                        {isSubmitting ? "Editando..." : "Salvar Edições"}
                      </SubmitButton>
                    </FormContainer>
                  )}
                </Formik>
              )}
            </DialogBodyStyled>

            <DialogFooterStyled isDark={darkMode}>
              <Button type="button" variant="secondary" onClick={() => setShowEditDialog(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={() => handleEditObject(initialValues)}>
                Salvar
              </Button>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* Confirm Cadastro Dialog */}
        <Dialog open={showConfirmCadastroDialog} onOpenChange={setShowConfirmCadastroDialog}>
          <DialogContentStyled className="sm:max-w-md" isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>Confirmar Cadastro</DialogTitleStyled>
              <DialogDescriptionStyled>Confirme os dados do objeto antes de cadastrar.</DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogBodyStyled isDark={darkMode}>
              {objectToConfirmCadastro && (
                <>
                  <ObjectDetailSection isDark={darkMode}>
                    <ObjectDetailTitle isDark={darkMode}>
                      <Info size={16} />
                      Informações Básicas
                    </ObjectDetailTitle>
                    <ObjectDetailContainer isDark={darkMode}>
                      <InfoGrid>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Categoria:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>
                            {categories.find((c) => c.value === objectToConfirmCadastro.categoria)?.label ||
                              objectToConfirmCadastro.categoria}
                          </ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Nome:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{objectToConfirmCadastro.nome}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Marca:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{objectToConfirmCadastro.marca}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Modelo:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{objectToConfirmCadastro.modelo}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Preço:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>
                            R$ {Number.parseFloat(objectToConfirmCadastro.preco).toFixed(2)}
                          </ObjectValue>
                        </ObjectDetail>
                      </InfoGrid>
                    </ObjectDetailContainer>
                  </ObjectDetailSection>

                  <SensitiveInfoContainer isDark={darkMode}>
                    <ObjectDetailTitle isDark={darkMode}>Informações Adicionais</ObjectDetailTitle>
                    <InfoGrid>
                      <InfoLabel isDark={darkMode}>
                        Data de Aquisição:{" "}
                        <InfoValue isDark={darkMode}>{objectToConfirmCadastro.dataAquisicao}</InfoValue>
                      </InfoLabel>
                      <InfoLabel isDark={darkMode}>
                        Situação: <InfoValue isDark={darkMode}>{objectToConfirmCadastro.situacao}</InfoValue>
                      </InfoLabel>
                      <InfoLabel isDark={darkMode}>
                        Descrição: <InfoValue isDark={darkMode}>{objectToConfirmCadastro.descricao}</InfoValue>
                      </InfoLabel>
                    </InfoGrid>
                  </SensitiveInfoContainer>
                </>
              )}
            </DialogBodyStyled>

            <DialogFooterStyled className="sm:justify-end" isDark={darkMode}>
              <Button type="button" variant="secondary" onClick={() => setShowConfirmCadastroDialog(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={confirmObjectCreation}>
                Confirmar Cadastro
              </Button>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* Confirm Edit Dialog */}
        <Dialog open={showConfirmEditDialog} onOpenChange={setShowConfirmEditDialog}>
          <DialogContentStyled className="sm:max-w-md" isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>Confirmar Edição</DialogTitleStyled>
              <DialogDescriptionStyled>Confirme as alterações do objeto antes de salvar.</DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogBodyStyled isDark={darkMode}>
              {objectToConfirmEdit && (
                <>
                  <ObjectDetailSection isDark={darkMode}>
                    <ObjectDetailTitle isDark={darkMode}>
                      <Info size={16} />
                      Informações Editadas
                    </ObjectDetailTitle>
                    <ObjectDetailContainer isDark={darkMode}>
                      <InfoGrid>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Categoria:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>
                            {categories.find((c) => c.value === objectToConfirmEdit.categoria)?.label ||
                              objectToConfirmEdit.categoria}
                          </ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Nome:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{objectToConfirmEdit.nome}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Marca:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{objectToConfirmEdit.marca}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Modelo:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>{objectToConfirmEdit.modelo}</ObjectValue>
                        </ObjectDetail>
                        <ObjectDetail isDark={darkMode}>
                          <ObjectProperty isDark={darkMode}>Preço:</ObjectProperty>
                          <ObjectValue isDark={darkMode}>
                            R$ {Number.parseFloat(objectToConfirmEdit.preco).toFixed(2)}
                          </ObjectValue>
                        </ObjectDetail>
                      </InfoGrid>
                    </ObjectDetailContainer>
                  </ObjectDetailSection>

                  <SensitiveInfoContainer isDark={darkMode}>
                    <ObjectDetailTitle isDark={darkMode}>Informações Adicionais</ObjectDetailTitle>
                    <InfoGrid>
                      <InfoLabel isDark={darkMode}>
                        Data de Aquisição: <InfoValue isDark={darkMode}>{objectToConfirmEdit.dataAquisicao}</InfoValue>
                      </InfoLabel>
                      <InfoLabel isDark={darkMode}>
                        Situação: <InfoValue isDark={darkMode}>{objectToConfirmEdit.situacao}</InfoValue>
                      </InfoLabel>
                      <InfoLabel isDark={darkMode}>
                        Descrição: <InfoValue isDark={darkMode}>{objectToConfirmEdit.descricao}</InfoValue>
                      </InfoLabel>
                    </InfoGrid>
                  </SensitiveInfoContainer>
                </>
              )}
            </DialogBodyStyled>

            <DialogFooterStyled className="sm:justify-end" isDark={darkMode}>
              <Button type="button" variant="secondary" onClick={() => setShowConfirmEditDialog(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={confirmObjectEdit}>
                Confirmar Edição
              </Button>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* Image Gallery Dialog */}
        <Dialog open={showImagesDialog} onOpenChange={setShowImagesDialog}>
          <DialogContentStyled className="sm:max-w-4xl" isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>Galeria de Imagens</DialogTitleStyled>
              <DialogDescriptionStyled>Visualize e gerencie as imagens do objeto.</DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogBodyStyled isDark={darkMode}>
              {currentObject && currentObject.imagensUrls && currentObject.imagensUrls.length > 0 ? (
                <ImageGalleryContainer>
                  <ImageContainer id="image-container">
                    <StyledImage
                      src={currentObject.imagensUrls[currentImageIndex] || "/placeholder.svg"}
                      alt={`Imagem ${currentImageIndex + 1}`}
                      zoom={zoom}
                    />
                    <ImageCounter>
                      {currentImageIndex + 1} / {currentObject.imagensUrls.length}
                    </ImageCounter>
                    <ImageActionButton type="button" onClick={() => setShowDeleteImageConfirmDialog(true)}>
                      <Trash2 className="h-4 w-4" />
                    </ImageActionButton>
                  </ImageContainer>

                  <ImageControls>
                    <NavigationControls>
                      <ControlButton onClick={prevImage} disabled={currentImageIndex === 0} isDark={darkMode}>
                        <ChevronLeft className="h-5 w-5" />
                      </ControlButton>
                      <ControlButton
                        onClick={nextImage}
                        disabled={currentImageIndex === currentObject.imagensUrls.length - 1}
                        isDark={darkMode}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </ControlButton>
                    </NavigationControls>

                    <ZoomControls>
                      <ControlButton onClick={zoomIn} isDark={darkMode}>
                        <ZoomIn className="h-5 w-5" />
                      </ControlButton>
                      <ControlButton onClick={zoomOut} isDark={darkMode}>
                        <ZoomOut className="h-5 w-5" />
                      </ControlButton>
                      <ControlButton onClick={resetZoom} isDark={darkMode}>
                        <RotateCw className="h-5 w-5" />
                      </ControlButton>
                      <ControlButton onClick={toggleFullscreen} isDark={darkMode}>
                        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                      </ControlButton>
                    </ZoomControls>
                  </ImageControls>

                  <ThumbnailsContainer>
                    {currentObject.imagensUrls.map((url, index) => (
                      <Thumbnail
                        key={index}
                        active={index === currentImageIndex}
                        onClick={() => setCurrentImageIndex(index)}
                        isDark={darkMode}
                      >
                        <img src={url || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
                      </Thumbnail>
                    ))}
                  </ThumbnailsContainer>
                </ImageGalleryContainer>
              ) : (
                <NoImagesMessage isDark={darkMode}>
                  <ImageIcon className="h-12 w-12 text-gray-500" />
                  <span>Nenhuma imagem cadastrada para este objeto.</span>
                </NoImagesMessage>
              )}
            </DialogBodyStyled>

            <DialogFooterStyled className="sm:justify-between" isDark={darkMode}>
              <FileInputWrapper>
                <FileInput
                  type="file"
                  id="addImage"
                  name="addImage"
                  multiple
                  onChange={handleAddImages}
                  style={{ display: "none" }}
                />
                <AddImageButtonLabel htmlFor="addImage">Adicionar Imagens</AddImageButtonLabel>
              </FileInputWrapper>
              <CloseButton type="button" variant="secondary" onClick={() => setShowImagesDialog(false)}>
                Fechar
              </CloseButton>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>

        {/* Receipt Dialog */}
        <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
          <DialogContentStyled className="sm:max-w-4xl" isDark={darkMode}>
            <DialogHeaderStyled isDark={darkMode}>
              <DialogTitleStyled>Nota Fiscal</DialogTitleStyled>
              <DialogDescriptionStyled>Visualize a nota fiscal do objeto.</DialogDescriptionStyled>
            </DialogHeaderStyled>

            <DialogBodyStyled isDark={darkMode}>
              {currentObject && currentObject.notaFiscalUrl ? (
                <img
                  src={currentObject.notaFiscalUrl || "/placeholder.svg"}
                  alt="Nota Fiscal"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <AlertBox isDark={darkMode}>
                  <AlertTriangle className="h-5 w-5" />
                  <span>Nenhuma nota fiscal cadastrada para este objeto.</span>
                </AlertBox>
              )}
            </DialogBodyStyled>

            <DialogFooterStyled className="sm:justify-end" isDark={darkMode}>
              <CloseButton type="button" variant="secondary" onClick={() => setShowReceiptDialog(false)}>
                Fechar
              </CloseButton>
            </DialogFooterStyled>
          </DialogContentStyled>
        </Dialog>
      </Container>
    </ThemeProvider>
  )
}

// Additional styled components with dark mode support
const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const SearchInput = styled(Input)<{ isDark: boolean }>`
  ${inputStyles}
`

const CategoryBadge = styled.span<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "rgba(59, 130, 246, 0.2)" : "#e0e7ff")};
  color: ${(props) => (props.isDark ? "#60a5fa" : "#3b82f6")};
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const SituationBadge = styled.span<{ situation: string; isDark: boolean }>`
  background-color: ${({ situation, isDark }) =>
    situation === "novo"
      ? isDark
        ? "rgba(16, 185, 129, 0.2)"
        : "#dcfce7"
      : situation === "usado"
        ? isDark
          ? "rgba(245, 158, 11, 0.2)"
          : "#ffedd5"
        : isDark
          ? "rgba(239, 68, 68, 0.2)"
          : "#fee2e2"};
  color: ${({ situation, isDark }) =>
    situation === "novo"
      ? isDark
        ? "#34d399"
        : "#16a34a"
      : situation === "usado"
        ? isDark
          ? "#fbbf24"
          : "#ea580c"
        : isDark
          ? "#f87171"
          : "#b91c1c"};
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const QRCodeButton = styled(ActionButton)`
  background-color: ${theme.light.secondary};
  color: white;
  &:hover {
    background-color: ${theme.light.secondaryHover};
  }
`

const ImagesButton = styled(ActionButton)`
  background-color: ${theme.light.info};
  color: white;
  &:hover {
    background-color: ${theme.light.primaryHover};
  }
`

const ReceiptButton = styled(ActionButton)`
  background-color: ${theme.light.warning};
  color: ${theme.light.text};
  &:hover {
    background-color: #fcd34d;
  }
`

const EditButton = styled(ActionButton)`
  background-color: #a78bfa;
  color: white;
  &:hover {
    background-color: #7c3aed;
  }
`

const DeleteButton = styled(ActionButton)`
  background-color: #f87171;
  color: white;
  &:hover {
    background-color: #dc2626;
  }
`

const CloseButton = styled(ActionButton)`
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.border : theme.light.border)};
  color: ${(props) => (props.theme.mode === "dark" ? theme.dark.text : theme.light.text)};
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.borderHover : theme.light.borderHover)};
  }
`

const DownloadButton = styled(ActionButton)`
  background-color: ${theme.light.success};
  color: white;
  &:hover {
    background-color: ${theme.light.secondaryHover};
  }
`

const AddImageButtonLabel = styled(Button)`
  background-color: ${theme.light.secondary};
  color: white;
  &:hover {
    background-color: ${theme.light.secondaryHover};
  }
`

const ImageGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  max-height: 600px;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.theme.mode === "dark" ? theme.dark.background : theme.light.background)};
`

const StyledImage = styled.img<{ zoom: number }>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  transform: scale(${({ zoom }) => zoom});
`

const ImageControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 0.5rem;
`

const NavigationControls = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ZoomControls = styled.div`
  display: flex;
  gap: 0.5rem;
`

// Update ControlButton for better dark mode contrast
const ControlButton = styled(Button)<{ isDark?: boolean }>`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${(props) => (props.isDark ? "rgba(30, 41, 59, 0.8)" : theme.light.background)};
  color: ${(props) => (props.isDark ? theme.dark.text : theme.light.text)};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isDark ? "rgba(55, 65, 81, 0.8)" : theme.light.border)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`

// Update Thumbnail for better dark mode contrast
const Thumbnail = styled.div<{ active: boolean; isDark?: boolean }>`
  width: 80px;
  height: 60px;
  border-radius: 0.375rem;
  overflow: hidden;
  cursor: pointer;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  transition: opacity 0.2s ease-in-out, border-color 0.3s ease;
  border: 2px solid ${({ active, isDark }) => (active ? (isDark ? theme.dark.primary : theme.light.primary) : "transparent")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
  }
`

// Update NoImagesMessage for better dark mode contrast
const NoImagesMessage = styled.div<{ isDark?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${(props) => (props.isDark ? "rgba(15, 23, 42, 0.5)" : theme.light.background)};
  border-radius: 0.5rem;
  color: ${(props) => (props.isDark ? theme.dark.textLight : theme.light.textLight)};
  gap: 1rem;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`

const ImageCounter = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
`

const ImageActionButton = styled(Button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(220, 38, 38, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;

  &:hover {
    background-color: rgba(220, 38, 38, 1);
  }
`

// Update AlertBox for better dark mode contrast
const AlertBox = styled.div<{ isDark?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${(props) => (props.isDark ? "rgba(245, 158, 11, 0.1)" : "#fff7ed")};
  border-radius: 0.5rem;
  color: ${(props) => (props.isDark ? "#fbbf24" : "#a16207")};
  border: 1px solid ${(props) => (props.isDark ? "rgba(245, 158, 11, 0.2)" : "#f9e6c9")};
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  span {
    font-size: 0.875rem;
  }
`

export default CadastrarTab

const mockObjects: ObjectItemProps[] = [
  {
    id: "obj001",
    categoria: "eletronico",
    nome: "Smartphone X",
    descricao: "Um smartphone moderno com câmera de alta resolução.",
    marca: "Marca A",
    modelo: "Modelo 1",
    dataAquisicao: "2023-01-15",
    numeroSerie: "SN12345",
    imei: "IMEI12345",
    situacao: "novo",
    dataCadastro: "2023-01-20",
    cpfDono: "123.456.789-00",
    emailDono: "usuario@example.com",
    notaFiscalUrl: "/placeholder.svg?height=600&width=800&text=Nota+Fiscal",
    imagensUrls: [
      "/placeholder.svg?height=600&width=800&text=Imagem+1",
      "/placeholder.svg?height=600&width=800&text=Imagem+2",
    ],
    preco: "1200.00",
  },
  {
    id: "obj002",
    categoria: "veiculo",
    nome: "Carro Y",
    descricao: "Um carro confortável para a família.",
    marca: "Marca B",
    modelo: "Modelo 2",
    dataAquisicao: "2022-11-01",
    chassi: "Chassi67890",
    situacao: "usado",
    dataCadastro: "2022-11-05",
    cpfDono: "123.456.789-00",
    emailDono: "usuario@example.com",
    notaFiscalUrl: "/placeholder.svg?height=600&width=800&text=Nota+Fiscal",
    imagensUrls: ["/placeholder.svg?height=600&width=800&text=Imagem+1"],
    preco: "25000.00",
  },
  {
    id: "obj003",
    categoria: "outro",
    nome: "Bicicleta Z",
    descricao: "Uma bicicleta para passeios ao ar livre.",
    marca: "Marca C",
    modelo: "Modelo 3",
    dataAquisicao: "2023-05-20",
    situacao: "novo",
    dataCadastro: "2023-05-25",
    cpfDono: "123.456.789-00",
    emailDono: "usuario@example.com",
    notaFiscalUrl: "/placeholder.svg?height=600&width=800&text=Nota+Fiscal",
    imagensUrls: ["/placeholder.svg?height=600&width=800&text=Imagem+1"],
    preco: "300.00",
  },
]

