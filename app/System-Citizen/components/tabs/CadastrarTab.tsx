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

import { SelectContent } from "../../../components/ui/select"

import { SelectTrigger } from "../../../components/ui/select"

import type React from "react"
import { useState, useEffect } from "react"
import { Form } from "formik"
import * as Yup from "yup"
import styled, { css } from "styled-components"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useToast } from "@/app/components/ui/use-toast"

const categories = [
  { value: "eletronico", label: "Eletrônico" },
  { value: "veiculo", label: "Veículo" },
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

// Theme colors for light mode
const theme = {
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
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${theme.background};
  color: ${theme.text};
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const FormCard = styled(Card)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${theme.cardBackground};
  box-shadow: 0 4px 6px -1px ${theme.shadow}, 
              0 2px 4px -1px ${theme.shadow};
  border-radius: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid ${theme.border};
  
  &:hover {
    box-shadow: 0 10px 15px -3px ${theme.shadowHover}, 
                0 4px 6px -2px ${theme.shadowHover};
  }
`

const CardTitleStyled = styled(CardTitle)`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${theme.text};
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

const LabelStyled = styled(Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
`

const inputStyles = css`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: ${theme.cardBackground};
  color: ${theme.text};
  
  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
  
  &:hover {
    border-color: ${theme.borderHover};
  }
`

const InputStyled = styled(Input)`
  ${inputStyles}
`

const TextareaStyled = styled(Textarea)`
  ${inputStyles}
  height: 5rem;
  resize: vertical;
`

const SelectTriggerStyled = styled(SelectTrigger)`
  ${inputStyles}
`

const SelectContentStyled = styled(SelectContent)`
  z-index: 1000;
  background-color: ${theme.cardBackground};
  border: 1px solid ${theme.border};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px ${theme.shadow}, 
              0 2px 4px -1px ${theme.shadow};
  overflow: hidden;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  & > * {
    color: ${theme.text};
  }
`

const ErrorText = styled.div`
  color: ${theme.error};
  font-size: 0.75rem;
  margin-top: 0.125rem;
`

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${theme.primary};
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${theme.primaryHover};
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

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.text};
  background-color: ${theme.background};
  border: 1px solid ${theme.border};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${theme.borderHover};
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

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: ${theme.background};
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

const ObjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid transparent;
  height: 100%;
  background-color: ${theme.cardBackground};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 20px -5px ${theme.shadowHover}, 
                0 10px 10px -5px ${theme.shadowHover};
    border-color: ${theme.primary};
  }
  
  &:active {
    transform: translateY(-2px);
  }
`

const ObjectCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  padding: 1.25rem;
  background-color: ${theme.cardBackground};
  color: ${theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`

const ObjectCardHeader = styled(CardHeader)`
  background-color: ${theme.primary};
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
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(59, 130, 246, 0.9));
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

const ObjectDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  color: ${theme.text};
`

const ObjectProperty = styled.span`
  font-weight: 600;
  color: ${theme.text};
  font-size: 0.875rem;
`

const ObjectValue = styled.span`
  color: ${theme.textLight};
  font-size: 1rem;
`

const ObjectDetailSection = styled.div`
  margin-top: 0.75rem;
  background-color: ${theme.cardBackground};
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 1px 2px ${theme.shadow};
`

const ObjectDetailTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ObjectDetailContainer = styled.div`
  border: 1px solid ${theme.border};
  border-radius: 0.5rem;
  padding: 0.75rem;
  background-color: ${theme.background};
  color: ${theme.text};
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
`

const SensitiveInfoContainer = styled.div`
  margin-top: 0.75rem;
  background-color: ${theme.cardBackground};
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 1px 2px ${theme.shadow};
  border-left: 4px solid ${theme.info};
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

const InfoLabel = styled.div`
  font-weight: 600;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`

const InfoValue = styled.span`
  font-weight: normal;
  color: ${theme.textLight};
  font-size: 0.875rem;
`

const TabsListStyled = styled(TabsList)`
  background-color: ${theme.background};
  padding: 0.25rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;
`

const TabsTriggerStyled = styled(TabsTrigger)`
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease;
  border-radius: 9999px;
  color: ${theme.text};
  
  &[data-state="active"] {
    background-color: ${theme.primary};
    color: white;
    box-shadow: 0 4px 6px -1px ${theme.shadow};
  }
  
  &:hover:not([data-state="active"]) {
    background-color: ${theme.border};
  }
`

const DialogContentStyled = styled(DialogContent)`
  max-width: 900px;
  width: 95vw;
  border-radius: 0.75rem;
  padding: 0;
  overflow: hidden;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.cardBackground};
  border: 1px solid ${theme.border};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`

const DialogHeaderStyled = styled(DialogHeader)`
  background-color: ${theme.primary};
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

const DialogBodyStyled = styled.div`
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
  max-height: calc(90vh - 140px);
  background-color: ${theme.cardBackground};
  color: ${theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`

const DialogFooterStyled = styled(DialogFooter)`
  padding: 0.75rem;
  background-color: ${theme.background};
  border-top: 1px solid ${theme.border};
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

const PriceExplanation = styled.div`
  background-color: ${theme.background};
  border-left: 3px solid ${theme.info};
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: ${theme.textLight};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: fit-content;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
`

const ExplanatoryNote = styled.p`
  font-size: 0.7rem;
  color: ${theme.textLight};
  margin-top: 0.25rem;
  font-style: italic;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  gap: 1rem;
  color: ${theme.textLight};
`

type ObjectsTabProps = {
  authFetch: (url: string, options?: RequestInit) => Promise<Response>
  token: string
}

// Add a mock mode flag at the top of the component
const ObjectsTab: React.FC<ObjectsTabProps> = ({ authFetch, token }) => {
  const { toast } = useToast()
  const [showConfirmCadastroDialog, setShowConfirmCadastroDialog] = useState(false)
  const [showConfirmEditDialog, setShowConfirmEditDialog] = useState(false)
  const [objectToConfirmCadastro, setObjectToConfirmCadastro] = useState<FormValues | null>(null)
  const [objectToConfirmEdit, setObjectToConfirmEdit] = useState<FormValues | null>(null)
  const [objectsData, setObjectsData] = useState<ObjectItemProps[]>([])
  const [filteredObjects, setFilteredObjects] = useState<ObjectItemProps[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showObjectList, setShowObjectList] = useState<boolean>(true)
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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Função para buscar os objetos do usuário
  const fetchObjects = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await authFetch("http://26.190.233.3:8080/api/objects/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar objetos: ${response.status}`)
      }

      const data = await response.json()
      console.log("Objetos recebidos:", data)

      // Mapear os dados recebidos para o formato esperado pelo componente
      const mappedObjects = data.map((obj: any) => ({
        id: obj.id || `obj${Math.random().toString(36).substr(2, 9)}`,
        categoria: obj.category || "outro",
        nome: obj.name || "",
        descricao: obj.description || "",
        marca: obj.brand || "",
        modelo: obj.model || "",
        dataAquisicao: obj.acquisitionDate || new Date().toISOString().split("T")[0],
        numeroSerie: obj.serialNumber,
        imei: obj.properties?.find((prop: any) => prop.key === "IMEI")?.value,
        chassi: obj.properties?.find((prop: any) => prop.key === "CHASSI")?.value,
        situacao: obj.status || "usado",
        dataCadastro: obj.createdAt || new Date().toISOString().split("T")[0],
        cpfDono: obj.ownerCpf || "",
        emailDono: obj.ownerEmail || "",
        notaFiscalUrl: obj.invoiceUrl,
        imagensUrls: obj.imageUrls || [],
        preco: obj.price || "0.00",
      }))

      setObjectsData(mappedObjects)
      setFilteredObjects(mappedObjects)
      setShowObjectList(mappedObjects.length > 0)
    } catch (error: any) {
      console.error("Erro ao buscar objetos:", error)

      // Get the error status code if available
      let errorCode = "Desconhecido"
      if (error.response && error.response.status) {
        errorCode = error.response.status.toString()
      } else if (error.message && error.message.includes("status")) {
        // Try to extract status code from error message
        const match = error.message.match(/status: (\d+)/i) || error.message.match(/(\d+)/)
        if (match && match[1]) {
          errorCode = match[1]
        }
      }

      setError(`Erro ${errorCode}: Não foi possível carregar os objetos.`)

      toast({
        title: `Erro ${errorCode} ao carregar objetos`,
        description: "Usando dados de exemplo devido a problemas com a API.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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

  // Buscar objetos ao carregar o componente
  useEffect(() => {
    fetchObjects()
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

  // Função para criar um novo objeto
  const createObject = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      // Map the frontend field names to the backend field names
      const objectData = {
        name: values.nome,
        category: values.categoria,
        description: values.descricao,
        brand: values.marca,
        model: values.modelo,
        acquisitionDate: values.dataAquisicao,
        serialNumber: values.numeroSerie || "",
        status: values.situacao,
        price: values.preco,
        properties: [],
      }

      // If IMEI exists, add it as a property
      if (values.imei) {
        objectData.properties.push({
          key: "IMEI",
          value: values.imei,
        })
      }

      // If chassi exists, add it as a property
      if (values.chassi) {
        objectData.properties.push({
          key: "CHASSI",
          value: values.chassi,
        })
      }

      console.log("Sending object data:", objectData) // Debug log

      const response = await authFetch("http://26.190.233.3:8080/api/objects/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectData),
      })

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar objeto: ${response.status}`)
      }

      toast({
        title: "Objeto cadastrado com sucesso!",
        description: "O objeto foi adicionado à sua lista.",
      })

      // Atualizar a lista de objetos
      fetchObjects()

      return true
    } catch (error: any) {
      console.error("Erro ao cadastrar objeto:", error)
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

  const confirmObjectCreation = async () => {
    if (objectToConfirmCadastro) {
      const success = await createObject(objectToConfirmCadastro)
      if (success) {
        setShowConfirmCadastroDialog(false)
        setObjectToConfirmCadastro(null)
      }
    }
  }

  // Função para atualizar um objeto existente
  const updateObject = async (objectId: string, values: FormValues) => {
    try {
      setIsSubmitting(true)

      // Map the frontend field names to the backend field names
      const objectData = {
        name: values.nome,
        category: values.categoria,
        description: values.descricao,
        brand: values.marca,
        model: values.modelo,
        acquisitionDate: values.dataAquisicao,
        serialNumber: values.numeroSerie || "",
        status: values.situacao,
        price: values.preco,
        properties: [],
      }

      // If IMEI exists, add it as a property
      if (values.imei) {
        objectData.properties.push({
          key: "IMEI",
          value: values.imei,
        })
      }

      // If chassi exists, add it as a property
      if (values.chassi) {
        objectData.properties.push({
          key: "CHASSI",
          value: values.chassi,
        })
      }

      console.log("Updating object data:", objectData) // Debug log

      const response = await authFetch(`http://26.190.233.3:8080/api/objects/me/${objectId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectData),
      })

      if (!response.ok) {
        throw new Error(`Erro ao atualizar objeto: ${response.status}`)
      }

      toast({
        title: "Objeto atualizado com sucesso!",
        description: "As alterações foram salvas.",
      })

      // Atualizar a lista de objetos
      fetchObjects()

      return true
    } catch (error: any) {
      console.error("Erro ao atualizar objeto:", error)
      toast({
        title: "Erro ao atualizar objeto!",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmObjectEdit = async () => {
    if (currentObject && objectToConfirmEdit) {
      console.log("Confirming edit for object:", currentObject.id)
      console.log("Edit data:", objectToConfirmEdit)

      const success = await updateObject(currentObject.id, objectToConfirmEdit)
      if (success) {
        setShowEditDialog(false)
        setShowConfirmEditDialog(false)
        setObjectToConfirmEdit(null)
        setShowObjectDialog(false)
      }
    } else {
      console.error("Missing currentObject or objectToConfirmEdit in confirmObjectEdit")
      toast({
        title: "Erro ao atualizar objeto!",
        description: "Dados incompletos para atualização.",
        variant: "destructive",
      })
    }
  }

  const showEditForm = () => {
    setShowEditDialog(true)
  }

  // Função para excluir um objeto
  const deleteObject = async (objectId: string) => {
    try {
      setIsSubmitting(true)

      const response = await authFetch(`http://26.190.233.3:8080/api/objects/me/${objectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao excluir objeto: ${response.status}`)
      }

      toast({
        title: "Objeto excluído com sucesso!",
        description: "O objeto foi removido da sua lista.",
      })

      // Atualizar a lista de objetos
      fetchObjects()

      return true
    } catch (error: any) {
      console.error("Erro ao excluir objeto:", error)
      toast({
        title: "Erro ao excluir objeto!",
        description: "Usando modo offline devido a problemas com a API.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const showImages = () => {
    setCurrentImageIndex(0)
    setZoom(1)
    setShowImagesDialog(true)
  }

  const showReceipt = () => {
    setShowReceiptDialog(true)
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

  const handleDeleteObject = async () => {
    if (currentObject) {
      const success = await deleteObject(currentObject.id)
      if (success) {
        setShowObjectDialog(false)
        setShowDeleteConfirmDialog(false)
      }
    }
  }

  const handleDeleteImage = async () => {
    if (currentObject && currentObject.imagensUrls) {
      try {
        setIsSubmitting(true)

        // Aqui você implementaria a chamada à API para excluir a imagem específica
        // Por exemplo:
        // const response = await authFetch(`http://26.190.233.3:8080/api/objects/me/${currentObject.id}/images/${currentImageIndex}`, {
        //   method: "DELETE",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // })

        // Se a API não tiver um endpoint específico para excluir imagens, você pode atualizar o objeto sem a imagem
        const updatedImageUrls = currentObject.imagensUrls.filter((_, index) => index !== currentImageIndex)
        const updatedObject = { ...currentObject, imagensUrls: updatedImageUrls }

        // Atualizar o objeto no servidor
        // Implementar quando a API estiver disponível

        // Atualizar o estado local
        const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))
        setObjectsData(updatedObjects)
        setFilteredObjects(updatedObjects)
        setCurrentObject(updatedObject)

        toast({
          title: "Imagem excluída com sucesso!",
          description: "A imagem foi removida do objeto.",
        })

        setShowDeleteImageConfirmDialog(false)

        if (updatedImageUrls.length === 0) {
          setShowImagesDialog(false)
        } else {
          setCurrentImageIndex(Math.min(currentImageIndex, updatedImageUrls.length - 1))
        }
      } catch (error: any) {
        console.error("Erro ao excluir imagem:", error)
        toast({
          title: "Erro ao excluir imagem!",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleAddImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && currentObject) {
      try {
        setIsSubmitting(true)

        // Aqui você implementaria a chamada à API para adicionar novas imagens
        // Por exemplo:
        // const formData = new FormData()
        // for (let i = 0; i < files.length; i++) {
        //   formData.append('images', files[i])
        // }
        // const response = await authFetch(`http://26.190.233.3:8080/api/objects/me/${currentObject.id}/images`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        //   body: formData,
        // })

        // Simulando a adição de novas imagens
        const newImageUrls = Array.from(files).map(() => `/placeholder.svg?height=600&width=800&text=Nova+Imagem`)
        const updatedImageUrls = [...(currentObject.imagensUrls || []), ...newImageUrls]
        const updatedObject = { ...currentObject, imagensUrls: updatedImageUrls }

        // Atualizar o objeto no servidor
        // Implementar quando a API estiver disponível

        // Atualizar o estado local
        const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))
        setObjectsData(updatedObjects)
        setFilteredObjects(updatedObjects)
        setCurrentObject(updatedObject)

        toast({
          title: "Imagens adicionadas com sucesso!",
          description: "As novas imagens foram adicionadas ao objeto.",
        })

        setCurrentImageIndex(updatedImageUrls.length - 1)
      } catch (error: any) {
        console.error("Erro ao adicionar imagens:", error)
        toast({
          title: "Erro ao adicionar imagens!",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Add a mock mode indicator in the UI
  return (
    <Container>
      <Tabs
        defaultValue={objectsData.length > 0 ? "list" : "form"}
        onValueChange={(val) => setShowObjectList(val === "list")}
      >
        <TabsListStyled>
          <TabsTriggerStyled value="list">Lista de Objetos</TabsTriggerStyled>
          <TabsTriggerStyled value="form">Cadastrar Objeto</TabsTriggerStyled>
        </TabsListStyled>
        {showObjectList ? (
          <>
            <InputStyled type="search" placeholder="Buscar objeto..." value={searchTerm} onChange={handleSearch} />
            {isLoading ? (
              <LoadingContainer>
                <svg
                  className="animate-spin h-10 w-10 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p>Carregando objetos...</p>
              </LoadingContainer>
            ) : error ? (
              <EmptyStateContainer>
                <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />
                <p className="text-lg font-semibold text-red-500">{error}</p>
                <p className="text-sm text-gray-600 mt-2">Verifique sua conexão ou tente novamente mais tarde.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    fetchObjects()
                  }}
                >
                  Tentar novamente
                </Button>
              </EmptyStateContainer>
            ) : filteredObjects.length > 0 ? (
              <ObjectListContainer>
                {filteredObjects.map((object) => (
                  <ObjectCard key={object.id} onClick={() => viewObjectDetails(object)}>
                    <ObjectCardHeader>
                      <ObjectCardTitle>{object.nome}</ObjectCardTitle>
                    </ObjectCardHeader>
                    <ObjectCardContent>
                      <ObjectDetail>
                        <ObjectProperty>Categoria:</ObjectProperty>
                        <ObjectValue>{object.categoria}</ObjectValue>
                      </ObjectDetail>
                      <ObjectDetail>
                        <ObjectProperty>Marca:</ObjectProperty>
                        <ObjectValue>{object.marca}</ObjectValue>
                      </ObjectDetail>
                      <ObjectDetail>
                        <ObjectProperty>Modelo:</ObjectProperty>
                        <ObjectValue>{object.modelo}</ObjectValue>
                      </ObjectDetail>
                      <ObjectDetail>
                        <ObjectProperty>Situação:</ObjectProperty>
                        <ObjectValue>{getSituationLabel(object.situacao)}</ObjectValue>
                      </ObjectDetail>
                    </ObjectCardContent>
                  </ObjectCard>
                ))}
              </ObjectListContainer>
            ) : (
              <EmptyStateContainer>
                <AlertTriangle className="h-6 w-6" />
                <p>Nenhum objeto encontrado.</p>
              </EmptyStateContainer>
            )}
          </>
        ) : (
          <FormCard>
            <CardHeader>
              <CardTitleStyled>Cadastrar Novo Objeto</CardTitleStyled>
            </CardHeader>
            <CardContent>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched, isSubmitting, values, setFieldValue }) => (
                  <FormContainer>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="categoria">Categoria</LabelStyled>
                          <FastField as="select" name="categoria" className={inputStyles}>
                            <option value="" label="Selecione a categoria" />
                            {categories.map((category) => (
                              <option key={category.value} value={category.value} label={category.label} />
                            ))}
                          </FastField>
                          {touched.categoria && errors.categoria && <ErrorText>{errors.categoria}</ErrorText>}
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="nome">Nome</LabelStyled>
                          <FastField type="text" name="nome" placeholder="Nome do objeto" className={inputStyles} />
                          {touched.nome && errors.nome && <ErrorText>{errors.nome}</ErrorText>}
                        </FormField>
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="marca">Marca</LabelStyled>
                          <FastField type="text" name="marca" placeholder="Marca do objeto" className={inputStyles} />
                          {touched.marca && errors.marca && <ErrorText>{errors.marca}</ErrorText>}
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="modelo">Modelo</LabelStyled>
                          <FastField type="text" name="modelo" placeholder="Modelo do objeto" className={inputStyles} />
                          {touched.modelo && errors.modelo && <ErrorText>{errors.modelo}</ErrorText>}
                        </FormField>
                      </FormSection>
                    </FormGrid>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="dataAquisicao">Data de Aquisição</LabelStyled>
                          <FastField type="date" name="dataAquisicao" className={inputStyles} />
                          {touched.dataAquisicao && errors.dataAquisicao && (
                            <ErrorText>{errors.dataAquisicao}</ErrorText>
                          )}
                        </FormField>
                        {values.categoria === "eletronico" && (
                          <FormField>
                            <LabelStyled htmlFor="numeroSerie">Número de Série</LabelStyled>
                            <FastField
                              type="text"
                              name="numeroSerie"
                              placeholder="Número de série"
                              className={inputStyles}
                            />
                            {touched.numeroSerie && errors.numeroSerie && <ErrorText>{errors.numeroSerie}</ErrorText>}
                          </FormField>
                        )}
                        {values.categoria === "eletronico" && (
                          <FormField>
                            <LabelStyled htmlFor="imei">IMEI</LabelStyled>
                            <FastField type="text" name="imei" placeholder="IMEI" className={inputStyles} />
                            {touched.imei && errors.imei && <ErrorText>{errors.imei}</ErrorText>}
                          </FormField>
                        )}
                        {values.categoria === "veiculo" && (
                          <FormField>
                            <LabelStyled htmlFor="chassi">Chassi</LabelStyled>
                            <FastField type="text" name="chassi" placeholder="Chassi" className={inputStyles} />
                            {touched.chassi && errors.chassi && <ErrorText>{errors.chassi}</ErrorText>}
                          </FormField>
                        )}
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="situacao">Situação</LabelStyled>
                          <FastField as="select" name="situacao" className={inputStyles}>
                            <option value="" label="Selecione a situação" />
                            <option value="novo" label="Novo" />
                            <option value="usado" label="Usado" />
                            <option value="danificado" label="Danificado" />
                          </FastField>
                          {touched.situacao && errors.situacao && <ErrorText>{errors.situacao}</ErrorText>}
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="preco">Preço</LabelStyled>
                          <FastField type="text" name="preco" placeholder="Preço do objeto" className={inputStyles} />
                          {touched.preco && errors.preco && <ErrorText>{errors.preco}</ErrorText>}
                        </FormField>
                      </FormSection>
                    </FormGrid>
                    <FormSection>
                      <FormField>
                        <LabelStyled htmlFor="descricao">Descrição</LabelStyled>
                        <FastField as={TextareaStyled} name="descricao" placeholder="Descrição do objeto" />
                        {touched.descricao && errors.descricao && <ErrorText>{errors.descricao}</ErrorText>}
                      </FormField>
                    </FormSection>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="notaFiscal">Nota Fiscal</LabelStyled>
                          <FileInputWrapper>
                            <FileInputLabel>
                              Selecionar Arquivo
                              <FileInput
                                type="file"
                                id="notaFiscal"
                                name="notaFiscal"
                                onChange={(event) => {
                                  const file = event.currentTarget.files && event.currentTarget.files[0]
                                  setFieldValue("notaFiscal", file || null)
                                }}
                              />
                            </FileInputLabel>
                          </FileInputWrapper>
                          {values.notaFiscal && <div>Arquivo selecionado: {values.notaFiscal.name}</div>}
                          <ExplanatoryNote className="text-amber-600 font-medium mt-2 flex items-center gap-1">
                            <AlertTriangle size={14} />
                            Importante: Guarde a nota fiscal original para comprovar a propriedade do objeto quando
                            necessário.
                          </ExplanatoryNote>
                        </FormField>
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="imagens">Imagens</LabelStyled>
                          <FileInputWrapper>
                            <FileInputLabel>
                              Selecionar Imagens
                              <FileInput
                                type="file"
                                id="imagens"
                                name="imagens"
                                multiple
                                onChange={(event) => {
                                  const files = event.currentTarget.files
                                  setFieldValue("imagens", files || null)
                                }}
                              />
                            </FileInputLabel>
                          </FileInputWrapper>
                          {values.imagens && values.imagens.length > 0 && (
                            <div>Imagens selecionadas: {values.imagens.length}</div>
                          )}
                        </FormField>
                      </FormSection>
                    </FormGrid>
                    <PriceExplanation>
                      <p>O preço do objeto é utilizado para fins de seguro e cálculo de depreciação.</p>
                      <ExplanatoryNote>
                        O valor deve ser preenchido utilizando ponto como separador decimal. Ex: 1234.56
                      </ExplanatoryNote>
                    </PriceExplanation>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </SubmitButton>
                  </FormContainer>
                )}
              </Formik>
            </CardContent>
          </FormCard>
        )}
      </Tabs>

      <Dialog open={showObjectDialog} onOpenChange={setShowObjectDialog}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>{currentObject?.nome}</DialogTitleStyled>
            <DialogDescriptionStyled>Detalhes do objeto</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            {currentObject && (
              <ObjectDetailContainer>
                <ObjectDetailSection>
                  <ObjectDetailTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-package"
                    >
                      <path d="M12 20l-8-8 8-8 8 8-8 8z" />
                      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                      <path d="M12 20v-8" />
                    </svg>
                    Informações Gerais
                  </ObjectDetailTitle>
                  <ObjectDetail>
                    <ObjectProperty>Categoria:</ObjectProperty>
                    <ObjectValue>{currentObject.categoria}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Nome:</ObjectProperty>
                    <ObjectValue>{currentObject.nome}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Descrição:</ObjectProperty>
                    <ObjectValue>{currentObject.descricao}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Marca:</ObjectProperty>
                    <ObjectValue>{currentObject.marca}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Modelo:</ObjectProperty>
                    <ObjectValue>{currentObject.modelo}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Data de Aquisição:</ObjectProperty>
                    <ObjectValue>{formatDate(currentObject.dataAquisicao)}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Situação:</ObjectProperty>
                    <ObjectValue>{getSituationLabel(currentObject.situacao)}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Preço:</ObjectProperty>
                    <ObjectValue>R$ {currentObject.preco}</ObjectValue>
                  </ObjectDetail>
                </ObjectDetailSection>

                <SensitiveInfoContainer>
                  <ObjectDetailTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-key-round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m16 8-4 4" />
                      <path d="m12 8-4 4" />
                      <path d="M8 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
                    </svg>
                    Informações Sensíveis
                  </ObjectDetailTitle>
                  <InfoGrid>
                    {currentObject.numeroSerie && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-hash"
                          >
                            <line x1="5" x2="19" y1="9" y2="9" />
                            <line x1="5" x2="19" y1="15" y2="15" />
                            <line x1="11" x2="7" y1="4" y2="20" />
                            <line x1="17" x2="13" y1="4" y2="20" />
                          </svg>
                          Número de Série:
                        </InfoLabel>
                        <InfoValue>{currentObject.numeroSerie}</InfoValue>
                      </div>
                    )}
                    {currentObject.imei && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sim-card"
                          >
                            <path d="M2 14.8V9.2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                            <path d="M8 15v-2" />
                            <path d="M12 15v-2" />
                            <path d="M16 15v-2" />
                            <path d="M2 20l20-2" />
                          </svg>
                          IMEI:
                        </InfoLabel>
                        <InfoValue>{currentObject.imei}</InfoValue>
                      </div>
                    )}
                    {currentObject.chassi && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-car"
                          >
                            <path d="M2 17h20" />
                            <path d="M6 17v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="18" cy="19" r="2" />
                          </svg>
                          Chassi:
                        </InfoLabel>
                        <InfoValue>{currentObject.chassi}</InfoValue>
                      </div>
                    )}
                  </InfoGrid>
                </SensitiveInfoContainer>
              </ObjectDetailContainer>
            )}
          </DialogBodyStyled>
          <DialogFooterStyled>
            <ActionButton variant="secondary" onClick={() => showEditForm()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-edit"
              >
                <path d="M11 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
                <path d="M15 3h6v6M10 14L21 3" />
              </svg>
              Editar
            </ActionButton>
            <ActionButton variant="secondary" onClick={showImages}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Ver Imagens
            </ActionButton>
            <ActionButton variant="secondary" onClick={showReceipt}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-receipt"
              >
                <path d="M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16" />
                <path d="M16 14H8a2 2 0 0 0-2 2v4" />
                <path d="M16 9H8a2 2 0 0 0-2-2V5" />
              </svg>
              Ver Nota Fiscal
            </ActionButton>
            <ActionButton
              variant="destructive"
              onClick={() => setShowDeleteConfirmDialog(true)}
              disabled={isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6H21" />
                <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" />
                <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" />
                <path d="M14 10V18" />
                <path d="M10 10V18" />
              </svg>
              Excluir
            </ActionButton>
            <Button variant="outline" onClick={() => setShowObjectDialog(false)}>
              Fechar
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Editar Objeto</DialogTitleStyled>
            <DialogDescriptionStyled>Edite as informações do objeto</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            {currentObject && (
              <Formik
                initialValues={{
                  categoria: currentObject.categoria,
                  nome: currentObject.nome,
                  descricao: currentObject.descricao,
                  marca: currentObject.marca,
                  modelo: currentObject.modelo,
                  dataAquisicao: currentObject.dataAquisicao,
                  numeroSerie: currentObject.numeroSerie || "",
                  imei: currentObject.imei || "",
                  chassi: currentObject.chassi || "",
                  situacao: currentObject.situacao,
                  notaFiscal: null,
                  imagens: null,
                  preco: currentObject.preco,
                }}
                validationSchema={validationSchema}
                onSubmit={handleEditObject}
                enableReinitialize
              >
                {({ errors, touched, isSubmitting, values, setFieldValue }) => (
                  <FormContainer>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="categoria">Categoria</LabelStyled>
                          <FastField as="select" name="categoria" className={inputStyles}>
                            <option value="" label="Selecione a categoria" />
                            {categories.map((category) => (
                              <option key={category.value} value={category.value} label={category.label} />
                            ))}
                          </FastField>
                          {touched.categoria && errors.categoria && <ErrorText>{errors.categoria}</ErrorText>}
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="nome">Nome</LabelStyled>
                          <FastField type="text" name="nome" placeholder="Nome do objeto" className={inputStyles} />
                          {touched.nome && errors.nome && <ErrorText>{errors.nome}</ErrorText>}
                        </FormField>
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="marca">Marca</LabelStyled>
                          <FastField type="text" name="marca" placeholder="Marca do objeto" className={inputStyles} />
                          {touched.marca && errors.marca && <ErrorText>{errors.marca}</ErrorText>}
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="modelo">Modelo</LabelStyled>
                          <FastField type="text" name="modelo" placeholder="Modelo do objeto" className={inputStyles} />
                          {touched.modelo && errors.modelo && <ErrorText>{errors.modelo}</ErrorText>}
                        </FormField>
                      </FormSection>
                    </FormGrid>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="dataAquisicao">Data de Aquisição</LabelStyled>
                          <FastField type="date" name="dataAquisicao" className={inputStyles} />
                          {touched.dataAquisicao && errors.dataAquisicao && (
                            <ErrorText>{errors.dataAquisicao}</ErrorText>
                          )}
                        </FormField>
                        {values.categoria === "eletronico" && (
                          <FormField>
                            <LabelStyled htmlFor="numeroSerie">Número de Série</LabelStyled>
                            <FastField
                              type="text"
                              name="numeroSerie"
                              placeholder="Número de série"
                              className={inputStyles}
                            />
                            {touched.numeroSerie && errors.numeroSerie && <ErrorText>{errors.numeroSerie}</ErrorText>}
                          </FormField>
                        )}
                        {values.categoria === "eletronico" && (
                          <FormField>
                            <LabelStyled htmlFor="imei">IMEI</LabelStyled>
                            <FastField type="text" name="imei" placeholder="IMEI" className={inputStyles} />
                            {touched.imei && errors.imei && <ErrorText>{errors.imei}</ErrorText>}
                          </FormField>
                        )}
                        {values.categoria === "veiculo" && (
                          <FormField>
                            <LabelStyled htmlFor="chassi">Chassi</LabelStyled>
                            <FastField type="text" name="chassi" placeholder="Chassi" className={inputStyles} />
                            {touched.chassi && errors.chassi && <ErrorText>{errors.chassi}</ErrorText>}
                          </FormField>
                        )}
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="situacao">Situação</LabelStyled>
                          <FastField as="select" name="situacao" className={inputStyles}>
                            <option value="" label="Selecione a situação" />
                            <option value="novo" label="Novo" />
                            <option value="usado" label="Usado" />
                            <option value="danificado" label="Danificado" />
                          </FastField>
                          {touched.situacao && errors.situacao && <ErrorText>{errors.situacao}</ErrorText>}
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="preco">Preço</LabelStyled>
                          <FastField type="text" name="preco" placeholder="Preço do objeto" className={inputStyles} />
                          {touched.preco && errors.preco && <ErrorText>{errors.preco}</ErrorText>}
                        </FormField>
                      </FormSection>
                    </FormGrid>
                    <FormSection>
                      <FormField>
                        <LabelStyled htmlFor="descricao">Descrição</LabelStyled>
                        <FastField as={TextareaStyled} name="descricao" placeholder="Descrição do objeto" />
                        {touched.descricao && errors.descricao && <ErrorText>{errors.descricao}</ErrorText>}
                      </FormField>
                    </FormSection>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="notaFiscal">Nota Fiscal</LabelStyled>
                          <FileInputWrapper>
                            <FileInputLabel>
                              Selecionar Arquivo
                              <FileInput
                                type="file"
                                id="notaFiscal"
                                name="notaFiscal"
                                onChange={(event) => {
                                  const file = event.currentTarget.files && event.currentTarget.files[0]
                                  setFieldValue("notaFiscal", file || null)
                                }}
                              />
                            </FileInputLabel>
                          </FileInputWrapper>
                          {values.notaFiscal && <div>Arquivo selecionado: {values.notaFiscal.name}</div>}
                          <ExplanatoryNote className="text-amber-600 font-medium mt-2 flex items-center gap-1">
                            <AlertTriangle size={14} />
                            Importante: Guarde a nota fiscal original para comprovar a propriedade do objeto quando
                            necessário.
                          </ExplanatoryNote>
                        </FormField>
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="imagens">Imagens</LabelStyled>
                          <FileInputWrapper>
                            <FileInputLabel>
                              Selecionar Imagens
                              <FileInput
                                type="file"
                                id="imagens"
                                name="imagens"
                                multiple
                                onChange={(event) => {
                                  const files = event.currentTarget.files
                                  setFieldValue("imagens", files || null)
                                }}
                              />
                            </FileInputLabel>
                          </FileInputWrapper>
                          {values.imagens && values.imagens.length > 0 && (
                            <div>Imagens selecionadas: {values.imagens.length}</div>
                          )}
                        </FormField>
                      </FormSection>
                    </FormGrid>
                    <PriceExplanation>
                      <p>O preço do objeto é utilizado para fins de seguro e cálculo de depreciação.</p>
                      <ExplanatoryNote>
                        O valor deve ser preenchido utilizando ponto como separador decimal. Ex: 1234.56
                      </ExplanatoryNote>
                    </PriceExplanation>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Atualizando..." : "Atualizar"}
                    </SubmitButton>
                  </FormContainer>
                )}
              </Formik>
            )}
          </DialogBodyStyled>
          <DialogFooterStyled>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" onClick={() => setShowConfirmEditDialog(true)} disabled={isSubmitting}>
                Atualizar
              </Button>
            </div>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      <Dialog open={showImagesDialog} onOpenChange={() => setShowImagesDialog(false)}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Imagens do Objeto</DialogTitleStyled>
            <DialogDescriptionStyled>Visualize as imagens do objeto</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            {currentObject && currentObject.imagensUrls && currentObject.imagensUrls.length > 0 ? (
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-3xl rounded-md overflow-hidden">
                  <HeaderImage>
                    <img
                      src={currentObject.imagensUrls[currentImageIndex] || "/placeholder.svg"}
                      alt={`Imagem ${currentImageIndex + 1} do objeto ${currentObject.nome}`}
                      style={{ transform: `scale(${zoom})`, transition: "transform 0.3s ease" }}
                    />
                  </HeaderImage>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <Button variant="secondary" onClick={prevImage} disabled={isSubmitting}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-left"
                    >
                      <line x1="19" x2="5" y1="12" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Anterior
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={zoomIn} disabled={isSubmitting}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-zoom-in"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" x2="16.65" y1="21" y2="16.65" />
                        <line x1="8" x2="14" y1="11" y2="11" />
                        <line x1="11" x2="11" y1="8" y2="14" />
                      </svg>
                    </Button>
                    <Button variant="secondary" onClick={zoomOut} disabled={isSubmitting}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-zoom-out"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" x2="16.65" y1="21" y2="16.65" />
                        <line x1="8" x2="14" y1="11" y2="11" />
                      </svg>
                    </Button>
                    <Button variant="secondary" onClick={resetZoom} disabled={isSubmitting}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-refresh-cw"
                      >
                        <path d="M21 12a9 9 0 0 0-9-9 9.755 9.755 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 12a9 9 0 0 0 9 9 9.755 9.755 0 0 0 6.74-2.74L21 16" />
                        <polyline points="21 8 16 8 21 13" />
                        <polyline points="3 16 8 16 3 11" />
                      </svg>
                    </Button>
                    <Button variant="secondary" onClick={toggleFullscreen} disabled={isSubmitting}>
                      {isFullscreen ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-minimize"
                        >
                          <path d="M5 16H3v-3" />
                          <path d="M3 8h2V5" />
                          <path d="M19 8h-2V5" />
                          <path d="M19 16h2v-3" />
                          <path d="M8 8L5 5" />
                          <path d="M16 16l3 3" />
                          <path d="M16 8l3-3" />
                          <path d="M8 16L5 19" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-maximize"
                        >
                          <path d="M5 5h4V3H5a2 2 0 0 0-2 2v4" />
                          <path d="M14 5h4V3h-4a2 2 0 0 0-2 2v4" />
                          <path d="M5 14v4H3v-4a2 2 0 0 0 2-2h4" />
                          <path d="M14 14v4h-2v-4a2 2 0 0 0-2-2h4" />
                        </svg>
                      )}
                    </Button>
                  </div>
                  <Button variant="secondary" onClick={nextImage} disabled={isSubmitting}>
                    Próxima
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right"
                    >
                      <line x1="5" x2="19" y1="12" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Button>
                </div>
              </div>
            ) : (
              <EmptyStateContainer>
                <AlertTriangle className="h-6 w-6" />
                <p>Nenhuma imagem encontrada.</p>
              </EmptyStateContainer>
            )}
          </DialogBodyStyled>
          <DialogFooterStyled>
            <Button variant="destructive" onClick={() => setShowDeleteImageConfirmDialog(true)} disabled={isSubmitting}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6H21" />
                <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" />
                <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" />
                <path d="M14 10V18" />
                <path d="M10 10V18" />
              </svg>
              Excluir Imagem
            </Button>
            <input type="file" id="add-images" multiple className="hidden" onChange={handleAddImages} />
            <Label
              htmlFor="add-images"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Adicionar Imagens
            </Label>
            <Button variant="outline" onClick={() => setShowImagesDialog(false)}>
              Fechar
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      <Dialog open={showReceiptDialog} onOpenChange={() => setShowReceiptDialog(false)}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Nota Fiscal</DialogTitleStyled>
            <DialogDescriptionStyled>Visualize a nota fiscal do objeto</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            {currentObject && currentObject.notaFiscalUrl ? (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 w-full">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                    <p className="text-sm text-amber-700">
                      <strong>Importante:</strong> Mantenha a nota fiscal original guardada em local seguro. Ela é
                      necessária para comprovar a propriedade do objeto em caso de perda ou roubo.
                    </p>
                  </div>
                </div>
                <img
                  src={currentObject.notaFiscalUrl || "/placeholder.svg"}
                  alt={`Nota fiscal do objeto ${currentObject.nome}`}
                  className="max-w-3xl rounded-md"
                />
              </div>
            ) : (
              <EmptyStateContainer>
                <AlertTriangle className="h-6 w-6" />
                <p>Nenhuma nota fiscal encontrada.</p>
              </EmptyStateContainer>
            )}
          </DialogBodyStyled>
          <DialogFooterStyled>
            <Button variant="outline" onClick={() => setShowReceiptDialog(false)}>
              Fechar
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      <Dialog open={showConfirmCadastroDialog} onOpenChange={setShowConfirmCadastroDialog}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Cadastro</DialogTitleStyled>
            <DialogDescriptionStyled>Deseja confirmar o cadastro do objeto?</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            {objectToConfirmCadastro && (
              <ObjectDetailContainer>
                <ObjectDetailSection>
                  <ObjectDetailTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-package"
                    >
                      <path d="M12 20l-8-8 8-8 8 8-8 8z" />
                      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                      <path d="M12 20v-8" />
                    </svg>
                    Informações Gerais
                  </ObjectDetailTitle>
                  <ObjectDetail>
                    <ObjectProperty>Categoria:</ObjectProperty>
                    <ObjectValue>{objectToConfirmCadastro.categoria}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Nome:</ObjectProperty>
                    <ObjectValue>{objectToConfirmCadastro.nome}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Descrição:</ObjectProperty>
                    <ObjectValue>{objectToConfirmCadastro.descricao}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Marca:</ObjectProperty>
                    <ObjectValue>{objectToConfirmCadastro.marca}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Modelo:</ObjectProperty>
                    <ObjectValue>{objectToConfirmCadastro.modelo}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Data de Aquisição:</ObjectProperty>
                    <ObjectValue>{formatDate(objectToConfirmCadastro.dataAquisicao)}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Situação:</ObjectProperty>
                    <ObjectValue>{getSituationLabel(objectToConfirmCadastro.situacao)}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Preço:</ObjectProperty>
                    <ObjectValue>R$ {objectToConfirmCadastro.preco}</ObjectValue>
                  </ObjectDetail>
                </ObjectDetailSection>

                <SensitiveInfoContainer>
                  <ObjectDetailTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-key-round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m16 8-4 4" />
                      <path d="m12 8-4 4" />
                      <path d="M8 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
                    </svg>
                    Informações Sensíveis
                  </ObjectDetailTitle>
                  <InfoGrid>
                    {objectToConfirmCadastro.numeroSerie && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-hash"
                          >
                            <line x1="5" x2="19" y1="9" y2="9" />
                            <line x1="5" x2="19" y1="15" y2="15" />
                            <line x1="11" x2="7" y1="4" y2="20" />
                            <line x1="17" x2="13" y1="4" y2="20" />
                          </svg>
                          Número de Série:
                        </InfoLabel>
                        <InfoValue>{objectToConfirmCadastro.numeroSerie}</InfoValue>
                      </div>
                    )}
                    {objectToConfirmCadastro.imei && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sim-card"
                          >
                            <path d="M2 14.8V9.2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                            <path d="M8 15v-2" />
                            <path d="M12 15v-2" />
                            <path d="M16 15v-2" />
                            <path d="M2 20l20-2" />
                          </svg>
                          IMEI:
                        </InfoLabel>
                        <InfoValue>{objectToConfirmCadastro.imei}</InfoValue>
                      </div>
                    )}
                    {objectToConfirmCadastro.chassi && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-car"
                          >
                            <path d="M2 17h20" />
                            <path d="M6 17v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="18" cy="19" r="2" />
                          </svg>
                          Chassi:
                        </InfoLabel>
                        <InfoValue>{objectToConfirmCadastro.chassi}</InfoValue>
                      </div>
                    )}
                  </InfoGrid>
                </SensitiveInfoContainer>
              </ObjectDetailContainer>
            )}
          </DialogBodyStyled>
          <DialogFooterStyled>
            <ActionButton onClick={() => confirmObjectCreation()} disabled={isSubmitting}>
              Confirmar
            </ActionButton>
            <Button variant="outline" onClick={() => setShowConfirmCadastroDialog(false)}>
              Cancelar
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      <Dialog open={showConfirmEditDialog} onOpenChange={setShowConfirmEditDialog}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Edição</DialogTitleStyled>
            <DialogDescriptionStyled>Deseja confirmar a edição do objeto?</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            {objectToConfirmEdit && (
              <ObjectDetailContainer>
                <ObjectDetailSection>
                  <ObjectDetailTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-package"
                    >
                      <path d="M12 20l-8-8 8-8 8 8-8 8z" />
                      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                      <path d="M12 20v-8" />
                    </svg>
                    Informações Gerais
                  </ObjectDetailTitle>
                  <ObjectDetail>
                    <ObjectProperty>Categoria:</ObjectProperty>
                    <ObjectValue>{objectToConfirmEdit.categoria}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Nome:</ObjectProperty>
                    <ObjectValue>{objectToConfirmEdit.nome}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Descrição:</ObjectProperty>
                    <ObjectValue>{objectToConfirmEdit.descricao}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Marca:</ObjectProperty>
                    <ObjectValue>{objectToConfirmEdit.marca}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Modelo:</ObjectProperty>
                    <ObjectValue>{objectToConfirmEdit.modelo}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Data de Aquisição:</ObjectProperty>
                    <ObjectValue>{formatDate(objectToConfirmEdit.dataAquisicao)}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Situação:</ObjectProperty>
                    <ObjectValue>{getSituationLabel(objectToConfirmEdit.situacao)}</ObjectValue>
                  </ObjectDetail>
                  <ObjectDetail>
                    <ObjectProperty>Preço:</ObjectProperty>
                    <ObjectValue>R$ {objectToConfirmEdit.preco}</ObjectValue>
                  </ObjectDetail>
                </ObjectDetailSection>

                <SensitiveInfoContainer>
                  <ObjectDetailTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-key-round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m16 8-4 4" />
                      <path d="m12 8-4 4" />
                      <path d="M8 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
                    </svg>
                    Informações Sensíveis
                  </ObjectDetailTitle>
                  <InfoGrid>
                    {objectToConfirmEdit.numeroSerie && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-hash"
                          >
                            <line x1="5" x2="19" y1="9" y2="9" />
                            <line x1="5" x2="19" y1="15" y2="15" />
                            <line x1="11" x2="7" y1="4" y2="20" />
                            <line x1="17" x2="13" y1="4" y2="20" />
                          </svg>
                          Número de Série:
                        </InfoLabel>
                        <InfoValue>{objectToConfirmEdit.numeroSerie}</InfoValue>
                      </div>
                    )}
                    {objectToConfirmEdit.imei && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sim-card"
                          >
                            <path d="M2 14.8V9.2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                            <path d="M8 15v-2" />
                            <path d="M12 15v-2" />
                            <path d="M16 15v-2" />
                            <path d="M2 20l20-2" />
                          </svg>
                          IMEI:
                        </InfoLabel>
                        <InfoValue>{objectToConfirmEdit.imei}</InfoValue>
                      </div>
                    )}
                    {objectToConfirmEdit.chassi && (
                      <div>
                        <InfoLabel>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-car"
                          >
                            <path d="M2 17h20" />
                            <path d="M6 17v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="18" cy="19" r="2" />
                          </svg>
                          Chassi:
                        </InfoLabel>
                        <InfoValue>{objectToConfirmEdit.chassi}</InfoValue>
                      </div>
                    )}
                  </InfoGrid>
                </SensitiveInfoContainer>
              </ObjectDetailContainer>
            )}
          </DialogBodyStyled>
          <DialogFooterStyled>
            <ActionButton onClick={confirmObjectEdit} disabled={isSubmitting || !objectToConfirmEdit || !currentObject}>
              {isSubmitting ? "Atualizando..." : "Confirmar"}
            </ActionButton>
            <Button variant="outline" onClick={() => setShowConfirmEditDialog(false)}>
              Cancelar
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      <Dialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Exclusão</DialogTitleStyled>
            <DialogDescriptionStyled>Deseja realmente excluir este objeto?</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            <p>Esta ação é irreversível. Tem certeza de que deseja excluir este objeto?</p>
          </DialogBodyStyled>
          <DialogFooterStyled>
            <ActionButton variant="destructive" onClick={() => handleDeleteObject()} disabled={isSubmitting}>
              Excluir
            </ActionButton>
            <Button variant="outline" onClick={() => setShowDeleteConfirmDialog(false)}>
              Cancelar
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      <Dialog open={showDeleteImageConfirmDialog} onOpenChange={setShowDeleteImageConfirmDialog}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Exclusão da Imagem</DialogTitleStyled>
            <DialogDescriptionStyled>Deseja realmente excluir esta imagem?</DialogDescriptionStyled>
          </DialogHeaderStyled>
          <DialogBodyStyled>
            <p>Esta ação é irreversível. Tem certeza de que deseja excluir esta imagem?</p>
          </DialogBodyStyled>
          <DialogFooterStyled>
            <ActionButton variant="destructive" onClick={() => handleDeleteImage()} disabled={isSubmitting}>
              Excluir
            </ActionButton>
            <Button variant="outline" onClick={() => setShowDeleteImageConfirmDialog(false)}>
              Cancelar
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>
    </Container>
  )
}

export default ObjectsTab

import { Formik, FastField } from "formik"
import { Dialog } from "@/app/components/ui/dialog"

