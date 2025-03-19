"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styled, { css } from "styled-components"
// Importe o QRCode de forma dinâmica para evitar erros de SSR
import dynamic from "next/dynamic"
import { useAuthApi } from "../../../hooks/use-auth-api"

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
  { value: "bicicleta", label: "Bicicleta" },
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

// Additional styled components
const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const SearchInput = styled(Input)`
  ${inputStyles}
`

const CategoryBadge = styled.span`
  background-color: #e0e7ff;
  color: #3b82f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const SituationBadge = styled.span<{ situation: string }>`
  background-color: ${({ situation }) =>
    situation === "novo" ? "#dcfce7" : situation === "usado" ? "#ffedd5" : "#fee2e2"};
  color: ${({ situation }) => (situation === "novo" ? "#16a34a" : situation === "usado" ? "#ea580c" : "#b91c1c")};
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const QRCodeButton = styled(ActionButton)`
  background-color: ${theme.secondary};
  color: white;
  &:hover {
    background-color: ${theme.secondaryHover};
  }
`

const ImagesButton = styled(ActionButton)`
  background-color: ${theme.info};
  color: white;
  &:hover {
    background-color: ${theme.primaryHover};
  }
`

const ReceiptButton = styled(ActionButton)`
  background-color: ${theme.warning};
  color: ${theme.text};
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
  background-color: ${theme.border};
  color: ${theme.text};
  &:hover {
    background-color: ${theme.borderHover};
  }
`

const DownloadButton = styled(ActionButton)`
  background-color: ${theme.success};
  color: white;
  &:hover {
    background-color: ${theme.secondaryHover};
  }
`

const AddImageButtonLabel = styled(Button)`
  background-color: ${theme.secondary};
  color: white;
  &:hover {
    background-color: ${theme.secondaryHover};
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
  background-color: ${theme.background};
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

const ControlButton = styled(Button)`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${theme.background};
  color: ${theme.text};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.border};
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

const Thumbnail = styled.div<{ active: boolean }>`
  width: 80px;
  height: 60px;
  border-radius: 0.375rem;
  overflow: hidden;
  cursor: pointer;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  transition: opacity 0.2s ease-in-out, border-color 0.3s ease;
  border: 2px solid ${({ active }) => (active ? theme.primary : "transparent")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
  }
`

const NoImagesMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${theme.background};
  border-radius: 0.5rem;
  color: ${theme.textLight};
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

const AlertBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #fff7ed;
  border-radius: 0.5rem;
  color: #a16207;
  border: 1px solid #f9e6c9;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  span {
    font-size: 0.875rem;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  flex-direction: column;
  gap: 1rem;
`

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0.25rem solid #e5e7eb;
  border-top-color: #2563eb;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const LoadingText = styled.p`
  color: #6b7280;
`

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  max-width: 32rem;
  margin: 0 auto;
  background-color: #fee2e2;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
`

const ErrorTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #b91c1c;
  margin-bottom: 0.5rem;
`

const ErrorMessageStyled = styled.p`
  color: #b91c1c;
  margin-bottom: 1.5rem;
`

interface CadastrarTabProps {
  authFetch: (url: string, options?: RequestInit) => Promise<Response>
}

const CadastrarTab: React.FC<CadastrarTabProps> = ({ authFetch }) => {
  const { toast } = useToast()
  const { storedToken } = useAuthApi()
  const [showConfirmCadastroDialog, setShowConfirmCadastroDialog] = useState(false)
  const [showConfirmEditDialog, setShowConfirmEditDialog] = useState(false)
  const [objectToConfirmCadastro, setObjectToConfirmCadastro] = useState<FormValues | null>(null)
  const [objectToConfirmEdit, setObjectToConfirmEdit] = useState<FormValues | null>(null)
  const [objectsData, setObjectsData] = useState<ObjectItemProps[]>([])
  const [filteredObjects, setFilteredObjects] = useState<ObjectItemProps[]>([])
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
  const [isLoading, setIsLoading] = useState(false)
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

  // Carregar objetos do usuário
  useEffect(() => {
    const fetchObjects = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await authFetch("http://26.190.233.3:8080/api/objects/me", {
          method: "GET",
        })

        if (!response.ok) {
          throw new Error("Falha ao carregar objetos. Por favor, tente novamente.")
        }

        const data = await response.json()
        setObjectsData(data)
        setFilteredObjects(data)
        setShowObjectList(data.length > 0)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao buscar objetos:", error)
        setError(error instanceof Error ? error.message : "Erro desconhecido ao carregar objetos")
        setIsLoading(false)
      }
    }

    fetchObjects()
  }, [authFetch])

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

  async function createObject(values: FormValues) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append("categoria", values.categoria)
      formData.append("nome", values.nome)
      formData.append("descricao", values.descricao)
      formData.append("marca", values.marca)
      formData.append("modelo", values.modelo)
      formData.append("dataAquisicao", values.dataAquisicao)
      formData.append("situacao", values.situacao)
      formData.append("preco", values.preco)
      if (values.numeroSerie) formData.append("numeroSerie", values.numeroSerie)
      if (values.imei) formData.append("imei", values.imei)
      if (values.chassi) formData.append("chassi", values.chassi)
      if (values.notaFiscal) formData.append("notaFiscal", values.notaFiscal)
      if (values.imagens) {
        Array.from(values.imagens).forEach((file) => {
          formData.append("imagens", file)
        })
      }

      const response = await authFetch("http://26.190.233.3:8080/api/objects", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Falha ao cadastrar objeto. Por favor, tente novamente.")
      }

      const newObject = await response.json()
      setObjectsData((prev) => [...prev, newObject])
      setFilteredObjects((prev) => [...prev, newObject])
      setShowObjectList(true)

      toast({
        title: "Objeto cadastrado com sucesso!",
      })

      return newObject
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao cadastrar objeto!",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      })
      throw error
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
      try {
        await createObject(objectToConfirmCadastro)
        setShowConfirmCadastroDialog(false)
        setObjectToConfirmCadastro(null)
      } catch (error) {
        console.error("Erro ao confirmar criação do objeto:", error)
      }
    }
  }

  const confirmObjectEdit = async () => {
    if (currentObject && objectToConfirmEdit) {
      try {
        setIsSubmitting(true)

        const formData = new FormData()
        formData.append("categoria", objectToConfirmEdit.categoria)
        formData.append("nome", objectToConfirmEdit.nome)
        formData.append("descricao", objectToConfirmEdit.descricao)
        formData.append("marca", objectToConfirmEdit.marca)
        formData.append("modelo", objectToConfirmEdit.modelo)
        formData.append("dataAquisicao", objectToConfirmEdit.dataAquisicao)
        formData.append("situacao", objectToConfirmEdit.situacao)
        formData.append("preco", objectToConfirmEdit.preco)
        if (objectToConfirmEdit.numeroSerie) formData.append("numeroSerie", objectToConfirmEdit.numeroSerie)
        if (objectToConfirmEdit.imei) formData.append("imei", objectToConfirmEdit.imei)
        if (objectToConfirmEdit.chassi) formData.append("chassi", objectToConfirmEdit.chassi)

        const response = await authFetch(`http://26.190.233.3:8080/api/objects/${currentObject.id}`, {
          method: "PUT",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Falha ao atualizar objeto. Por favor, tente novamente.")
        }

        const updatedObject = await response.json()
        const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))

        setObjectsData(updatedObjects)
        setFilteredObjects(updatedObjects)
        setCurrentObject(updatedObject)
        setShowEditDialog(false)
        setShowConfirmEditDialog(false)
        setObjectToConfirmEdit(null)

        toast({
          title: "Objeto atualizado com sucesso!",
        })
      } catch (error) {
        console.error("Erro ao atualizar objeto:", error)
        toast({
          title: "Erro ao atualizar objeto!",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const showEditForm = () => {
    setShowEditDialog(true)
  }

  const handleEdit = async (values: FormValues) => {
    setObjectToConfirmEdit(values)
    setShowConfirmEditDialog(true)
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

  const handleDeleteObject = async () => {
    if (currentObject) {
      try {
        const response = await authFetch(`http://26.190.233.3:8080/api/objects/${currentObject.id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Falha ao excluir objeto. Por favor, tente novamente.")
        }

        const updatedObjects = objectsData.filter((obj) => obj.id !== currentObject.id)
        setObjectsData(updatedObjects)
        setFilteredObjects(updatedObjects)
        setShowObjectDialog(false)
        setShowDeleteConfirmDialog(false)

        toast({
          title: "Objeto excluído com sucesso!",
        })
      } catch (error) {
        console.error("Erro ao excluir objeto:", error)
        toast({
          title: "Erro ao excluir objeto!",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteImage = async () => {
    if (currentObject && currentObject.imagensUrls) {
      try {
        const imageUrl = currentObject.imagensUrls[currentImageIndex]
        const imageId = imageUrl.split("/").pop()?.split(".")[0] || ""

        const response = await authFetch(`http://26.190.233.3:8080/api/objects/${currentObject.id}/images/${imageId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Falha ao excluir imagem. Por favor, tente novamente.")
        }

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

        toast({
          title: "Imagem excluída com sucesso!",
        })
      } catch (error) {
        console.error("Erro ao excluir imagem:", error)
        toast({
          title: "Erro ao excluir imagem!",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        })
      }
    }
  }

  const handleAddImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && currentObject) {
      try {
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
          formData.append("imagens", files[i])
        }

        const response = await authFetch(`http://26.190.233.3:8080/api/objects/${currentObject.id}/images`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Falha ao adicionar imagens. Por favor, tente novamente.")
        }

        const updatedObject = await response.json()
        const updatedObjects = objectsData.map((obj) => (obj.id === currentObject.id ? updatedObject : obj))

        setObjectsData(updatedObjects)
        setFilteredObjects(updatedObjects)
        setCurrentObject(updatedObject)

        if (updatedObject.imagensUrls && updatedObject.imagensUrls.length > 0) {
          setCurrentImageIndex(updatedObject.imagensUrls.length - 1)
        }

        toast({
          title: "Imagens adicionadas com sucesso!",
        })
      } catch (error) {
        console.error("Erro ao adicionar imagens:", error)
        toast({
          title: "Erro ao adicionar imagens!",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Carregando objetos...</LoadingText>
      </LoadingContainer>
    )
  }

  if (error) {
    return (
      <ErrorContainer>
        <AlertTriangle size={48} color="#b91c1c" />
        <ErrorTitle>Erro ao carregar objetos</ErrorTitle>
        <ErrorMessageStyled>{error}</ErrorMessageStyled>
        <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
      </ErrorContainer>
    )
  }

  return (
    <Container>
      <Tabs
        defaultValue={objectsData.length > 0 ? "list" : "form"}
        onValueChange={(val) => setShowObjectList(val === "list")}
      >
        <TabsListStyled className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTriggerStyled value="list">Objetos Cadastrados</TabsTriggerStyled>
          <TabsTriggerStyled value="form">Cadastrar Novo</TabsTriggerStyled>
        </TabsListStyled>

        <TabsContent value="list">
          <FormCard>
            <CardHeader>
              <CardTitleStyled>Objetos Cadastrados</CardTitleStyled>
            </CardHeader>
            <CardContent>
              <SearchContainer>
                <SearchInput type="text" placeholder="Buscar por nome..." value={searchTerm} onChange={handleSearch} />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </SearchContainer>
              {filteredObjects.length === 0 ? (
                <NoImagesMessage>
                  <Package size={48} color="#6b7280" />
                  <span>Nenhum objeto encontrado. Cadastre seu primeiro objeto na aba "Cadastrar Novo".</span>
                </NoImagesMessage>
              ) : (
                <ObjectListContainer>
                  {filteredObjects.map((object) => (
                    <ObjectCard key={object.id} onClick={() => viewObjectDetails(object)}>
                      <ObjectCardHeader>
                        <HeaderImage>
                          <img
                            src={object.imagensUrls?.[0] || "/placeholder.svg?height=200&width=300&text=No+Image"}
                            alt={object.nome}
                          />
                        </HeaderImage>
                        <ObjectCardTitle>{object.nome}</ObjectCardTitle>
                      </ObjectCardHeader>
                      <ObjectCardContent>
                        <CategoryBadge>
                          {categories.find((c) => c.value === object.categoria)?.label || object.categoria}
                        </CategoryBadge>

                        <ObjectDetail>
                          <ObjectProperty>Marca / Modelo:</ObjectProperty>
                          <ObjectValue>
                            {object.marca} / {object.modelo}
                          </ObjectValue>
                        </ObjectDetail>

                        <ObjectDetail>
                          <ObjectProperty>Data de Aquisição:</ObjectProperty>
                          <ObjectValue>{formatDate(object.dataAquisicao)}</ObjectValue>
                        </ObjectDetail>

                        <SituationBadge situation={object.situacao}>
                          {getSituationLabel(object.situacao)}
                        </SituationBadge>
                      </ObjectCardContent>
                    </ObjectCard>
                  ))}
                </ObjectListContainer>
              )}
            </CardContent>
          </FormCard>
        </TabsContent>

        <TabsContent value="form">
          <FormCard>
            <CardHeader>
              <CardTitleStyled>Cadastrar Novo Objeto</CardTitleStyled>
            </CardHeader>
            <CardContent>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, isSubmitting, setFieldValue }) => (
                  <FormContainer>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="categoria">
                            <Package size={18} />
                            Categoria
                          </LabelStyled>
                          <Select name="categoria" onValueChange={(value) => setFieldValue("categoria", value)}>
                            <SelectTriggerStyled>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTriggerStyled>
                            <SelectContentStyled>
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContentStyled>
                          </Select>
                          <ErrorMessage name="categoria" component={ErrorText} />
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="nome">Nome do Objeto</LabelStyled>
                          <Field as={InputStyled} type="text" id="nome" name="nome" />
                          <ErrorMessage name="nome" component={ErrorText} />
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="descricao">Descrição</LabelStyled>
                          <Field as={TextareaStyled} id="descricao" name="descricao" />
                          <ErrorMessage name="descricao" component={ErrorText} />
                        </FormField>
                        <FormRow>
                          <FormField>
                            <LabelStyled htmlFor="marca">Marca</LabelStyled>
                            <Field as={InputStyled} type="text" id="marca" name="marca" />
                            <ErrorMessage name="marca" component={ErrorText} />
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="modelo">Modelo</LabelStyled>
                            <Field as={InputStyled} type="text" id="modelo" name="modelo" />
                            <ErrorMessage name="modelo" component={ErrorText} />
                          </FormField>
                        </FormRow>
                        <FormField>
                          <LabelStyled htmlFor="preco">
                            <DollarSign size={18} />
                            Preço
                          </LabelStyled>
                          <Field as={InputStyled} type="text" id="preco" name="preco" placeholder="0.00" />
                          <ErrorMessage name="preco" component={ErrorText} />
                        </FormField>
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="dataAquisicao">
                            <Calendar size={18} />
                            Data de Aquisição
                          </LabelStyled>
                          <Field as={InputStyled} type="date" id="dataAquisicao" name="dataAquisicao" />
                          <ErrorMessage name="dataAquisicao" component={ErrorText} />
                        </FormField>
                        {values.categoria === "eletronico" && (
                          <>
                            <FormField>
                              <LabelStyled htmlFor="numeroSerie">Número de Série</LabelStyled>
                              <Field as={InputStyled} type="text" id="numeroSerie" name="numeroSerie" />
                              <ErrorMessage name="numeroSerie" component={ErrorText} />
                            </FormField>
                            <FormField>
                              <LabelStyled htmlFor="imei">IMEI (para telefones e notebooks)</LabelStyled>
                              <Field as={InputStyled} type="text" id="imei" name="imei" />
                              <ErrorMessage name="imei" component={ErrorText} />
                            </FormField>
                          </>
                        )}
                        {values.categoria === "veiculo" && (
                          <FormField>
                            <LabelStyled htmlFor="chassi">
                              <Truck size={18} />
                              Chassi
                            </LabelStyled>
                            <Field as={InputStyled} type="text" id="chassi" name="chassi" />
                            <ErrorMessage name="chassi" component={ErrorText} />
                          </FormField>
                        )}
                        <FormField>
                          <LabelStyled htmlFor="situacao">Situação</LabelStyled>
                          <Select name="situacao" onValueChange={(value) => setFieldValue("situacao", value)}>
                            <SelectTriggerStyled>
                              <SelectValue placeholder="Selecione a situação" />
                            </SelectTriggerStyled>
                            <SelectContentStyled>
                              <SelectItem value="novo">Novo</SelectItem>
                              <SelectItem value="usado">Usado</SelectItem>
                              <SelectItem value="danificado">Danificado</SelectItem>
                            </SelectContentStyled>
                          </Select>
                          <ErrorMessage name="situacao" component={ErrorText} />
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="notaFiscal">
                            <FileText size={18} />
                            Nota Fiscal (arquivo)
                          </LabelStyled>
                          <FileInputWrapper>
                            <FileInputLabel htmlFor="notaFiscal">Escolher arquivo</FileInputLabel>
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
                          <LabelStyled htmlFor="imagens">
                            <Camera size={18} />
                            Imagens
                          </LabelStyled>
                          <FileInputWrapper>
                            <FileInputLabel htmlFor="imagens">Escolher imagens</FileInputLabel>
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
                        <PriceExplanation>
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
                    <SubmitButton type="submit" disabled={isSubmitting}>
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
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>{currentObject?.nome}</DialogTitleStyled>
            <DialogDescriptionStyled>Detalhes do objeto cadastrado</DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogBodyStyled>
            {currentObject && (
              <>
                <ObjectDetailSection>
                  <ObjectDetailTitle>
                    <Info size={16} />
                    Informações Básicas
                  </ObjectDetailTitle>
                  <ObjectDetailContainer>
                    <InfoGrid>
                      <ObjectDetail>
                        <ObjectProperty>Categoria:</ObjectProperty>
                        <ObjectValue>
                          {categories.find((c) => c.value === currentObject.categoria)?.label ||
                            currentObject.categoria}
                        </ObjectValue>
                      </ObjectDetail>
                      <ObjectDetail>
                        <ObjectProperty>Situação:</ObjectProperty>
                        <ObjectValue>{getSituationLabel(currentObject.situacao)}</ObjectValue>
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
                        <ObjectProperty>Data de Cadastro:</ObjectProperty>
                        <ObjectValue>{formatDate(currentObject.dataCadastro)}</ObjectValue>
                      </ObjectDetail>
                    </InfoGrid>
                  </ObjectDetailContainer>
                </ObjectDetailSection>

                <SensitiveInfoContainer>
                  <ObjectDetailTitle>Informações Sensíveis</ObjectDetailTitle>
                  <InfoGrid>
                    {currentObject.categoria === "eletronico" && (
                      <>
                        <InfoLabel>
                          Número de Série: <InfoValue>{currentObject.numeroSerie}</InfoValue>
                        </InfoLabel>
                        <InfoLabel>
                          IMEI: <InfoValue>{currentObject.imei}</InfoValue>
                        </InfoLabel>
                      </>
                    )}

                    {currentObject.categoria === "veiculo" && (
                      <InfoLabel>
                        Chassi: <InfoValue>{currentObject.chassi}</InfoValue>
                      </InfoLabel>
                    )}

                    <InfoLabel>
                      CPF do Proprietário: <InfoValue>{currentObject.cpfDono}</InfoValue>
                    </InfoLabel>
                    <InfoLabel>
                      Email do Proprietário: <InfoValue>{currentObject.emailDono}</InfoValue>
                    </InfoLabel>
                    <InfoLabel>
                      Preço: <InfoValue>R$ {Number.parseFloat(currentObject.preco).toFixed(2)}</InfoValue>
                    </InfoLabel>
                    <InfoLabel>
                      Informações Adicionais: <InfoValue>{currentObject.descricao}</InfoValue>
                    </InfoLabel>
                  </InfoGrid>
                </SensitiveInfoContainer>
              </>
            )}
          </DialogBodyStyled>

          <DialogFooterStyled>
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
        <DialogContentStyled className="sm:max-w-md">
          <DialogHeaderStyled>
            <DialogTitleStyled>QR Code para {currentObject?.nome}</DialogTitleStyled>
            <DialogDescriptionStyled>
              Escaneie este QR Code para visualizar as informações do objeto.
            </DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogBodyStyled>
            {currentObject && (
              <QRCodeContainer>
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

          <DialogFooterStyled className="sm:justify-center">
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <DialogContentStyled className="sm:max-w-md">
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Exclusão</DialogTitleStyled>
            <DialogDescriptionStyled>
              Tem certeza de que deseja excluir este objeto? Esta ação não pode ser desfeita.
            </DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogFooterStyled className="sm:justify-end">
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
        <DialogContentStyled className="sm:max-w-md">
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Exclusão da Imagem</DialogTitleStyled>
            <DialogDescriptionStyled>
              Tem certeza de que deseja excluir esta imagem? Esta ação não pode ser desfeita.
            </DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogFooterStyled className="sm:justify-end">
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
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Editar Objeto</DialogTitleStyled>
            <DialogDescriptionStyled>Edite as informações do objeto.</DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogBodyStyled>
            {currentObject && (
              <Formik initialValues={currentObject} validationSchema={validationSchema} onSubmit={handleEdit}>
                {({ values, isSubmitting, setFieldValue }) => (
                  <FormContainer>
                    <FormGrid>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="categoria">
                            <Package size={18} />
                            Categoria
                          </LabelStyled>
                          <Select
                            name="categoria"
                            onValueChange={(value) => setFieldValue("categoria", value)}
                            defaultValue={values.categoria}
                          >
                            <SelectTriggerStyled>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTriggerStyled>
                            <SelectContentStyled>
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContentStyled>
                          </Select>
                          <ErrorMessage name="categoria" component={ErrorText} />
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="nome">Nome do Objeto</LabelStyled>
                          <Field as={InputStyled} type="text" id="nome" name="nome" />
                          <ErrorMessage name="nome" component={ErrorText} />
                        </FormField>
                        <FormField>
                          <LabelStyled htmlFor="descricao">Descrição</LabelStyled>
                          <Field as={TextareaStyled} id="descricao" name="descricao" />
                          <ErrorMessage name="descricao" component={ErrorText} />
                        </FormField>
                        <FormRow>
                          <FormField>
                            <LabelStyled htmlFor="marca">Marca</LabelStyled>
                            <Field as={InputStyled} type="text" id="marca" name="marca" />
                            <ErrorMessage name="marca" component={ErrorText} />
                          </FormField>
                          <FormField>
                            <LabelStyled htmlFor="modelo">Modelo</LabelStyled>
                            <Field as={InputStyled} type="text" id="modelo" name="modelo" />
                            <ErrorMessage name="modelo" component={ErrorText} />
                          </FormField>
                        </FormRow>
                        <FormField>
                          <LabelStyled htmlFor="preco">
                            <DollarSign size={18} />
                            Preço
                          </LabelStyled>
                          <Field as={InputStyled} type="text" id="preco" name="preco" placeholder="0.00" />
                          <ErrorMessage name="preco" component={ErrorText} />
                        </FormField>
                      </FormSection>
                      <FormSection>
                        <FormField>
                          <LabelStyled htmlFor="dataAquisicao">
                            <Calendar size={18} />
                            Data de Aquisição
                          </LabelStyled>
                          <Field as={InputStyled} type="date" id="dataAquisicao" name="dataAquisicao" />
                          <ErrorMessage name="dataAquisicao" component={ErrorText} />
                        </FormField>
                        {values.categoria === "eletronico" && (
                          <>
                            <FormField>
                              <LabelStyled htmlFor="numeroSerie">Número de Série</LabelStyled>
                              <Field as={InputStyled} type="text" id="numeroSerie" name="numeroSerie" />
                              <ErrorMessage name="numeroSerie" component={ErrorText} />
                            </FormField>
                            <FormField>
                              <LabelStyled htmlFor="imei">IMEI (para telefones e notebooks)</LabelStyled>
                              <Field as={InputStyled} type="text" id="imei" name="imei" />
                              <ErrorMessage name="imei" component={ErrorText} />
                            </FormField>
                          </>
                        )}
                        {values.categoria === "veiculo" && (
                          <FormField>
                            <LabelStyled htmlFor="chassi">
                              <Truck size={18} />
                              Chassi
                            </LabelStyled>
                            <Field as={InputStyled} type="text" id="chassi" name="chassi" />
                            <ErrorMessage name="chassi" component={ErrorText} />
                          </FormField>
                        )}
                        <FormField>
                          <LabelStyled htmlFor="situacao">Situação</LabelStyled>
                          <Select
                            name="situacao"
                            onValueChange={(value) => setFieldValue("situacao", value)}
                            defaultValue={values.situacao}
                          >
                            <SelectTriggerStyled>
                              <SelectValue placeholder="Selecione a situação" />
                            </SelectTriggerStyled>
                            <SelectContentStyled>
                              <SelectItem value="novo">Novo</SelectItem>
                              <SelectItem value="usado">Usado</SelectItem>
                              <SelectItem value="danificado">Danificado</SelectItem>
                            </SelectContentStyled>
                          </Select>
                          <ErrorMessage name="situacao" component={ErrorText} />
                        </FormField>
                        <PriceExplanation>
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
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </SubmitButton>
                  </FormContainer>
                )}
              </Formik>
            )}
          </DialogBodyStyled>
        </DialogContentStyled>
      </Dialog>

      {/* Confirm Cadastro Dialog */}
      <Dialog open={showConfirmCadastroDialog} onOpenChange={setShowConfirmCadastroDialog}>
        <DialogContentStyled className="sm:max-w-md">
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Cadastro</DialogTitleStyled>
            <DialogDescriptionStyled>Confirme os dados do objeto antes de cadastrar.</DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogBodyStyled>
            {objectToConfirmCadastro && (
              <>
                <ObjectDetailSection>
                  <ObjectDetailTitle>
                    <Info size={16} />
                    Informações Básicas
                  </ObjectDetailTitle>
                  <ObjectDetailContainer>
                    <InfoGrid>
                      <ObjectDetail>
                        <ObjectProperty>Categoria:</ObjectProperty>
                        <ObjectValue>
                          {categories.find((c) => c.value === objectToConfirmCadastro.categoria)?.label ||
                            objectToConfirmCadastro.categoria}
                        </ObjectValue>
                      </ObjectDetail>
                      <ObjectDetail>
                        <ObjectProperty>Nome:</ObjectProperty>
                        <ObjectValue>{objectToConfirmCadastro.nome}</ObjectValue>
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
                        <ObjectProperty>Preço:</ObjectProperty>
                        <ObjectValue>R$ {Number.parseFloat(objectToConfirmCadastro.preco).toFixed(2)}</ObjectValue>
                      </ObjectDetail>
                    </InfoGrid>
                  </ObjectDetailContainer>
                </ObjectDetailSection>

                <SensitiveInfoContainer>
                  <ObjectDetailTitle>Informações Adicionais</ObjectDetailTitle>
                  <InfoGrid>
                    <InfoLabel>
                      Data de Aquisição: <InfoValue>{objectToConfirmCadastro.dataAquisicao}</InfoValue>
                    </InfoLabel>
                    <InfoLabel>
                      Situação: <InfoValue>{objectToConfirmCadastro.situacao}</InfoValue>
                    </InfoLabel>
                    <InfoLabel>
                      Descrição: <InfoValue>{objectToConfirmCadastro.descricao}</InfoValue>
                    </InfoLabel>
                  </InfoGrid>
                </SensitiveInfoContainer>
              </>
            )}
          </DialogBodyStyled>

          <DialogFooterStyled className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setShowConfirmCadastroDialog(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={confirmObjectCreation} disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Confirmar Cadastro"}
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      {/* Confirm Edit Dialog */}
      <Dialog open={showConfirmEditDialog} onOpenChange={setShowConfirmEditDialog}>
        <DialogContentStyled className="sm:max-w-md">
          <DialogHeaderStyled>
            <DialogTitleStyled>Confirmar Edição</DialogTitleStyled>
            <DialogDescriptionStyled>Confirme as alterações do objeto antes de salvar.</DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogBodyStyled>
            {objectToConfirmEdit && (
              <>
                <ObjectDetailSection>
                  <ObjectDetailTitle>
                    <Info size={16} />
                    Informações Editadas
                  </ObjectDetailTitle>
                  <ObjectDetailContainer>
                    <InfoGrid>
                      <ObjectDetail>
                        <ObjectProperty>Categoria:</ObjectProperty>
                        <ObjectValue>
                          {categories.find((c) => c.value === objectToConfirmEdit.categoria)?.label ||
                            objectToConfirmEdit.categoria}
                        </ObjectValue>
                      </ObjectDetail>
                      <ObjectDetail>
                        <ObjectProperty>Nome:</ObjectProperty>
                        <ObjectValue>{objectToConfirmEdit.nome}</ObjectValue>
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
                        <ObjectProperty>Preço:</ObjectProperty>
                        <ObjectValue>R$ {Number.parseFloat(objectToConfirmEdit.preco).toFixed(2)}</ObjectValue>
                      </ObjectDetail>
                    </InfoGrid>
                  </ObjectDetailContainer>
                </ObjectDetailSection>

                <SensitiveInfoContainer>
                  <ObjectDetailTitle>Informações Adicionais</ObjectDetailTitle>
                  <InfoGrid>
                    <InfoLabel>
                      Data de Aquisição: <InfoValue>{objectToConfirmEdit.dataAquisicao}</InfoValue>
                    </InfoLabel>
                    <InfoLabel>
                      Situação: <InfoValue>{objectToConfirmEdit.situacao}</InfoValue>
                    </InfoLabel>
                    <InfoLabel>
                      Descrição: <InfoValue>{objectToConfirmEdit.descricao}</InfoValue>
                    </InfoLabel>
                  </InfoGrid>
                </SensitiveInfoContainer>
              </>
            )}
          </DialogBodyStyled>

          <DialogFooterStyled className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setShowConfirmEditDialog(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={confirmObjectEdit} disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Confirmar Edição"}
            </Button>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>

      {/* Image Gallery Dialog */}
      <Dialog open={showImagesDialog} onOpenChange={setShowImagesDialog}>
        <DialogContentStyled className="sm:max-w-4xl">
          <DialogHeaderStyled>
            <DialogTitleStyled>Galeria de Imagens</DialogTitleStyled>
            <DialogDescriptionStyled>Visualize e gerencie as imagens do objeto.</DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogBodyStyled>
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
                    <ControlButton onClick={prevImage} disabled={currentImageIndex === 0}>
                      <ChevronLeft className="h-5 w-5" />
                    </ControlButton>
                    <ControlButton
                      onClick={nextImage}
                      disabled={currentImageIndex === currentObject.imagensUrls.length - 1}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </ControlButton>
                  </NavigationControls>

                  <ZoomControls>
                    <ControlButton onClick={zoomIn}>
                      <ZoomIn className="h-5 w-5" />
                    </ControlButton>
                    <ControlButton onClick={zoomOut}>
                      <ZoomOut className="h-5 w-5" />
                    </ControlButton>
                    <ControlButton onClick={resetZoom}>
                      <RotateCw className="h-5 w-5" />
                    </ControlButton>
                    <ControlButton onClick={toggleFullscreen}>
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
                    >
                      <img src={url || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
                    </Thumbnail>
                  ))}
                </ThumbnailsContainer>
              </ImageGalleryContainer>
            ) : (
              <NoImagesMessage>
                <ImageIcon className="h-12 w-12 text-gray-500" />
                <span>Nenhuma imagem cadastrada para este objeto.</span>
              </NoImagesMessage>
            )}
          </DialogBodyStyled>

          <DialogFooterStyled className="sm:justify-between">
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
        <DialogContentStyled className="sm:max-w-4xl">
          <DialogHeaderStyled>
            <DialogTitleStyled>Nota Fiscal</DialogTitleStyled>
            <DialogDescriptionStyled>Visualize a nota fiscal do objeto.</DialogDescriptionStyled>
          </DialogHeaderStyled>

          <DialogBodyStyled>
            {currentObject && currentObject.notaFiscalUrl ? (
              <img
                src={currentObject.notaFiscalUrl || "/placeholder.svg"}
                alt="Nota Fiscal"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <AlertBox>
                <AlertTriangle className="h-5 w-5" />
                <span>Nenhuma nota fiscal cadastrada para este objeto.</span>
              </AlertBox>
            )}
          </DialogBodyStyled>

          <DialogFooterStyled className="sm:justify-end">
            <CloseButton type="button" variant="secondary" onClick={() => setShowReceiptDialog(false)}>
              Fechar
            </CloseButton>
          </DialogFooterStyled>
        </DialogContentStyled>
      </Dialog>
    </Container>
  )
}

export default CadastrarTab

