"use client"

import { useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import {
  Smile,
  Package,
  AlertTriangle,
  MapPin,
  Search,
  Plus,
  Filter,
  Calendar,
  Send,
  Shield,
  AlertCircle,
  Tag,
} from "lucide-react"

// Interfaces
interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  status: "Em análise" | "Localizado" | "Recuperado"
  categoria: "Armado" | "Moto" | "Furto" | "Distração" | "Outros"
  localizacao?: string
  descricao?: string
}

interface Comentario {
  id: string
  autor: string
  avatar?: string
  conteudo: string
  data: string
  isPolicialOuAdmin: boolean
}

interface Mensagem {
  id: string
  remetente: "usuario" | "policia"
  conteudo: string
  data: string
}

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  
  .dark & {
    color: #f5f5f5;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
  
  @media (min-width: 768px) {
    width: auto;
  }
`

const Button = styled.button<{ variant?: "primary" | "secondary" | "outline" | "icon" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  padding: ${(props) => (props.variant === "icon" ? "0.5rem" : "0.5rem 1rem")};
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          background-color: #f3f4f6;
          color: #374151;
          border: 1px solid #e5e7eb;
          
          &:hover {
            background-color: #e5e7eb;
          }
          
          .dark & {
            background-color: #374151;
            color: #f3f4f6;
            border-color: #4b5563;
            
            &:hover {
              background-color: #4b5563;
            }
          }
        `
      case "outline":
        return `
          background-color: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
          
          &:hover {
            background-color: #f9fafb;
          }
          
          .dark & {
            color: #f3f4f6;
            border-color: #4b5563;
            
            &:hover {
              background-color: rgba(255, 255, 255, 0.05);
            }
          }
        `
      case "icon":
        return `
          background-color: #f9fafb;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          
          &:hover {
            background-color: #f3f4f6;
          }
          
          .dark & {
            background-color: #374151;
            color: #f3f4f6;
            border-color: #4b5563;
            
            &:hover {
              background-color: #4b5563;
            }
          }
        `
      default:
        return `
          background-color: #2563eb;
          color: white;
          border: 1px solid #2563eb;
          
          &:hover {
            background-color: #1d4ed8;
          }
          
          .dark & {
            background-color: #3b82f6;
            border-color: #3b82f6;
            
            &:hover {
              background-color: #2563eb;
            }
          }
        `
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SearchFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
  
  .dark & {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #f3f4f6;
    
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  
  .dark & {
    color: #9ca3af;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Select = styled.select`
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
  
  .dark & {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #f3f4f6;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .dark & {
    background-color: #1f2937;
    border-color: #374151;
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  .dark & {
    border-color: #374151;
  }
`

const CardTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  
  .dark & {
    color: #f3f4f6;
  }
`

const Badge = styled.span<{
  variant: "warning" | "info" | "success" | "default" | "danger" | "purple" | "orange" | "gray"
}>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `
          background-color: #fef3c7;
          color: #92400e;
          
          .dark & {
            background-color: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
          }
        `
      case "info":
        return `
          background-color: #dbeafe;
          color: #1e40af;
          
          .dark & {
            background-color: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
          }
        `
      case "success":
        return `
          background-color: #d1fae5;
          color: #065f46;
          
          .dark & {
            background-color: rgba(16, 185, 129, 0.2);
            color: #34d399;
          }
        `
      case "danger":
        return `
          background-color: #fee2e2;
          color: #b91c1c;
          
          .dark & {
            background-color: rgba(220, 38, 38, 0.2);
            color: #f87171;
          }
        `
      case "purple":
        return `
          background-color: #ede9fe;
          color: #5b21b6;
          
          .dark & {
            background-color: rgba(124, 58, 237, 0.2);
            color: #a78bfa;
          }
        `
      case "orange":
        return `
          background-color: #ffedd5;
          color: #c2410c;
          
          .dark & {
            background-color: rgba(234, 88, 12, 0.2);
            color: #fb923c;
          }
        `
      case "gray":
        return `
          background-color: #f3f4f6;
          color: #4b5563;
          
          .dark & {
            background-color: rgba(75, 85, 99, 0.2);
            color: #9ca3af;
          }
        `
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
          
          .dark & {
            background-color: #374151;
            color: #f3f4f6;
          }
        `
    }
  }}
`

const CardContent = styled.div`
  padding: 1rem;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem 1rem 1rem;
`

const ObjectInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
  flex-shrink: 0;
  
  .dark & {
    background-color: #374151;
  }
`

const ObjectDetails = styled.div`
  flex: 1;
`

const ObjectName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  
  .dark & {
    color: #f3f4f6;
  }
`

const ObjectMeta = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  .dark & {
    color: #9ca3af;
  }
`

const AlertBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: #b45309;
  
  .dark & {
    color: #fbbf24;
  }
`

const EmptyState = styled.div`
  max-width: 32rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #f0fdf4;
  border-radius: 0.5rem;
  border: 1px solid #dcfce7;
  text-align: center;
  
  .dark & {
    background-color: rgba(6, 78, 59, 0.2);
    border-color: rgba(6, 78, 59, 0.3);
  }
`

const EmptyStateTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 1rem;
  
  .dark & {
    color: #86efac;
  }
`

const EmptyStateIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

const EmptyStateText = styled.p`
  color: #16a34a;
  margin-bottom: 0.5rem;
  
  .dark & {
    color: #4ade80;
  }
`

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  padding: 1rem;
`

const DialogContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 28rem;
  max-height: 90vh;
  overflow-y: auto;
  
  .dark & {
    background-color: #1f2937;
    color: #f3f4f6;
  }
`

const DialogHeader = styled.div`
  padding: 1.5rem 1.5rem 0.5rem;
`

const DialogTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  
  .dark & {
    color: #f3f4f6;
  }
`

const DialogBody = styled.div`
  padding: 1rem 1.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  
  .dark & {
    color: #d1d5db;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
  
  .dark & {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #f3f4f6;
    
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }
`

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  
  .dark & {
    border-color: #374151;
  }
`

const Alert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
  color: #374151;
  margin-bottom: 1.5rem;
  
  .dark & {
    background-color: #374151;
    color: #f3f4f6;
  }
`

// Detalhes do caso
const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
`

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  @media (min-width: 640px) {
    align-items: center;
  }
`

const DetailHeaderLeft = styled.div``

const DetailTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.5rem;
  color: #1a1a1a;
  
  .dark & {
    color: #f5f5f5;
  }
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 3fr;
  }
`

const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ObjectCard = styled(Card)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const ObjectCardContent = styled(CardContent)`
  flex-grow: 1;
`

const ObjectBox = styled.div`
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  .dark & {
    background-color: #374151;
  }
`

const ObjectIconLarge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: white;
  flex-shrink: 0;
  
  .dark & {
    background-color: #1f2937;
  }
`

const ObjectTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #1f2937;
  
  .dark & {
    color: #f3f4f6;
  }
`

const ObjectDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
  
  .dark & {
    color: #9ca3af;
  }
`

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  
  .dark & {
    color: #d1d5db;
  }
`

const WarningBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: #fef3c7;
  color: #92400e;
  margin-top: 1rem;
  
  .dark & {
    background-color: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
  }
`

const CommentsCard = styled(Card)`
  flex-shrink: 0;
`

const CommentsContent = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 0 1rem;
  margin: 0 -1rem;
`

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CommentItem = styled.div`
  display: flex;
  gap: 0.75rem;
`

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #6b7280;
  flex-shrink: 0;
  
  .dark & {
    background-color: #374151;
    color: #d1d5db;
  }
`

const CommentContent = styled.div`
  flex: 1;
`

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const CommentAuthor = styled.span`
  font-weight: 500;
  color: #1f2937;
  
  .dark & {
    color: #f3f4f6;
  }
`

const CommentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #374151;
  
  .dark & {
    border-color: #4b5563;
    color: #d1d5db;
  }
`

const CommentDate = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  
  .dark & {
    color: #9ca3af;
  }
`

const CommentText = styled.p`
  font-size: 0.875rem;
  color: #374151;
  margin-top: 0.25rem;
  
  .dark & {
    color: #d1d5db;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  background-color: white;
  resize: vertical;
  min-height: 5rem;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
  
  .dark & {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #f3f4f6;
    
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }
`

const ChatCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  padding: 0;
`

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const MessageRow = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.isUser ? "#2563eb" : "#f3f4f6")};
  color: ${(props) => (props.isUser ? "white" : "#374151")};
  
  .dark & {
    background-color: ${(props) => (props.isUser ? "#3b82f6" : "#374151")};
    color: ${(props) => (props.isUser ? "white" : "#f3f4f6")};
  }
`

const MessageText = styled.p`
  font-size: 0.875rem;
`

const MessageTime = styled.span<{ isUser: boolean }>`
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${(props) => (props.isUser ? "rgba(255, 255, 255, 0.7)" : "#6b7280")};
  
  .dark & {
    color: ${(props) => (props.isUser ? "rgba(255, 255, 255, 0.7)" : "#9ca3af")};
  }
`

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 0;
  
  .dark & {
    border-color: #374151;
  }
`

const ChatInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  
  .dark & {
    border-color: #374151;
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
  
  .dark & {
    border-color: #374151;
    border-top-color: #3b82f6;
  }
`

const LoadingText = styled.p`
  color: #6b7280;
  
  .dark & {
    color: #9ca3af;
  }
`

const ErrorCard = styled(Card)`
  text-align: center;
  padding: 2rem;
`

const ErrorIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

const ErrorTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  
  .dark & {
    color: #f3f4f6;
  }
`

const ErrorText = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  
  .dark & {
    color: #9ca3af;
  }
`

export default function CasosPage() {
  const router = useRouter()
  const [showDialog, setShowDialog] = useState(false)

  // Estado para controlar a visualização (lista ou detalhes)
  const [view, setView] = useState<"lista" | "detalhes">("lista")
  const [casoSelecionadoId, setCasoSelecionadoId] = useState<string | null>(null)

  // Estados para a lista de casos
  const [casos, setCasos] = useState<Caso[]>([])
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [termoBusca, setTermoBusca] = useState<string>("")
  const [novoObjeto, setNovoObjeto] = useState<string>("")
  const [novaDescricao, setNovaDescricao] = useState<string>("")
  const [novaLocalizacao, setNovaLocalizacao] = useState<string>("")
  const [novaCategoria, setNovaCategoria] = useState<"Armado" | "Moto" | "Furto" | "Distração" | "Outros">("Outros")

  // Estados para a página de detalhes
  const [casoAtual, setCasoAtual] = useState<Caso | null>(null)
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [novoComentario, setNovoComentario] = useState("")
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [novaMensagem, setNovaMensagem] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [casoIdToUpdate, setCasoIdToUpdate] = useState<string | null>(null)
  const [showRecoveredConfirmationDialog, setShowRecoveredConfirmationDialog] = useState(false)

  // Navegar para a página de detalhes do caso
  const navegarParaDetalhes = (id: string) => {
    setCasoSelecionadoId(id)
    setView("detalhes")
    setCarregando(true)

    // Simular carregamento de dados
    setTimeout(() => {
      const caso = casos.find((c) => c.id === id) || null
      setCasoAtual(caso)

      // Gerar comentários de exemplo para o caso
      setComentarios([
        {
          id: "1",
          autor: "Maria Silva",
          avatar: "/placeholder.svg?height=40&width=40",
          conteudo: "Vi um objeto parecido sendo vendido na feira da Liberdade no domingo.",
          data: "Há 2 dias",
          isPolicialOuAdmin: false,
        },
        {
          id: "2",
          autor: "Delegado Carlos",
          avatar: "/placeholder.svg?height=40&width=40",
          conteudo: "Obrigado pela informação. Vamos verificar as câmeras de segurança da região.",
          data: "Há 1 dia",
          isPolicialOuAdmin: true,
        },
      ])

      // Gerar mensagens de exemplo para o chat
      setMensagens([
        {
          id: "1",
          remetente: "usuario",
          conteudo: "Bom dia, gostaria de saber se há alguma atualização sobre meu caso.",
          data: "10:30",
        },
        {
          id: "2",
          remetente: "policia",
          conteudo:
            "Bom dia. Estamos analisando as imagens de câmeras de segurança da região. Assim que tivermos novidades, entraremos em contato.",
          data: "10:45",
        },
      ])

      setCarregando(false)
    }, 1000)
  }

  // Voltar para a lista de casos
  const voltarParaLista = () => {
    setView("lista")
    setCasoSelecionadoId(null)
    setCasoAtual(null)
  }

  // Adicionar um caso com dados reais
  const adicionarCaso = () => {
    if (!novoObjeto.trim()) return

    const novoCaso: Caso = {
      id: Math.floor(Math.random() * 10000).toString(),
      objeto: novoObjeto,
      dataRoubo: new Date().toLocaleDateString("pt-BR"),
      status: "Em análise",
      categoria: novaCategoria,
      descricao: novaDescricao || undefined,
      localizacao: novaLocalizacao || undefined,
    }

    setCasos([...casos, novoCaso])
    setNovoObjeto("")
    setNovaDescricao("")
    setNovaLocalizacao("")
    setNovaCategoria("Outros")
    setShowDialog(false)
  }

  // Adicionar um caso de teste com dados predefinidos
  const adicionarCasoTeste = () => {
    const objetos = ["Smartphone", "Notebook", "Relógio", "Mochila", "Carteira"]
    const locais = ["Av. Paulista", "Estação Sé", "Shopping Morumbi", "Parque Ibirapuera", ""]
    const status: Array<"Em análise" | "Localizado" | "Recuperado"> = ["Em análise", "Localizado", "Recuperado"]
    const categorias: Array<"Armado" | "Moto" | "Furto" | "Distração" | "Outros"> = [
      "Armado",
      "Moto",
      "Furto",
      "Distração",
      "Outros",
    ]

    const novoCaso: Caso = {
      id: Math.floor(Math.random() * 10000).toString(),
      objeto: objetos[Math.floor(Math.random() * objetos.length)],
      dataRoubo: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toLocaleDateString("pt-BR"),
      status: status[Math.floor(Math.random() * status.length)],
      categoria: categorias[Math.floor(Math.random() * categorias.length)],
    }

    const temLocalizacao = Math.random() > 0.3
    if (temLocalizacao) {
      novoCaso.localizacao = locais[Math.floor(Math.random() * locais.length)]
    }

    setCasos([...casos, novoCaso])
  }

  // Atualizar o status de um caso
  const atualizarStatus = (id: string, novoStatus: "Em análise" | "Localizado" | "Recuperado") => {
    const casosAtualizados = casos.map((caso) => (caso.id === id ? { ...caso, status: novoStatus } : caso))
    setCasos(casosAtualizados)

    // Se estiver na página de detalhes, atualizar o caso atual também
    if (view === "detalhes" && casoAtual && casoAtual.id === id) {
      setCasoAtual({ ...casoAtual, status: novoStatus })
    }
  }

  // Enviar um comentário
  const enviarComentario = () => {
    if (!novoComentario.trim()) return

    const comentario: Comentario = {
      id: Date.now().toString(),
      autor: "Você",
      conteudo: novoComentario,
      data: "Agora",
      isPolicialOuAdmin: false,
    }

    setComentarios([...comentarios, comentario])
    setNovoComentario("")
  }

  // Enviar uma mensagem no chat
  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return

    const mensagem: Mensagem = {
      id: Date.now().toString(),
      remetente: "usuario",
      conteudo: novaMensagem,
      data: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMensagens([...mensagens, mensagem])
    setNovaMensagem("")

    // Simular resposta da polícia após 2 segundos
    setTimeout(() => {
      const respostaPoliciaAutomatica: Mensagem = {
        id: (Date.now() + 1).toString(),
        remetente: "policia",
        conteudo: "Recebemos sua mensagem. Um agente irá analisá-la em breve.",
        data: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMensagens((prev) => [...prev, respostaPoliciaAutomatica])
    }, 2000)
  }

  // Obter a cor do badge para a categoria
  const getCategoriaBadgeVariant = (categoria: string): "danger" | "purple" | "warning" | "orange" | "gray" => {
    switch (categoria) {
      case "Armado":
        return "danger"
      case "Moto":
        return "purple"
      case "Furto":
        return "warning"
      case "Distração":
        return "orange"
      default:
        return "gray"
    }
  }

  // Filtrar casos por status, categoria e termo de busca
  const casosFiltrados = casos.filter((caso) => {
    const matchStatus = filtroStatus === "todos" || caso.status === filtroStatus
    const matchCategoria = filtroCategoria === "todos" || caso.categoria === filtroCategoria
    const matchBusca =
      termoBusca === "" ||
      caso.objeto.toLowerCase().includes(termoBusca.toLowerCase()) ||
      (caso.localizacao && caso.localizacao.toLowerCase().includes(termoBusca.toLowerCase()))

    return matchStatus && matchCategoria && matchBusca
  })

  // Função para obter a cor do badge baseado no status
  const getStatusBadgeVariant = (status: string): "warning" | "info" | "success" | "default" => {
    switch (status) {
      case "Em análise":
        return "warning"
      case "Localizado":
        return "info"
      case "Recuperado":
        return "success"
      default:
        return "default"
    }
  }

  // Renderizar a página de detalhes do caso
  if (view === "detalhes") {
    if (carregando) {
      return (
        <LoadingContainer>
          <Spinner />
          <LoadingText>Carregando informações do caso...</LoadingText>
        </LoadingContainer>
      )
    }

    if (!casoAtual) {
      return (
        <DetailContainer>
          <ErrorCard>
            <ErrorIcon>
              <AlertTriangle size={48} color="#f59e0b" />
            </ErrorIcon>
            <ErrorTitle>Caso não encontrado</ErrorTitle>
            <ErrorText>O caso que você está procurando não existe ou foi removido.</ErrorText>
            <Button onClick={voltarParaLista}>Voltar para Casos</Button>
          </ErrorCard>
        </DetailContainer>
      )
    }

    return (
      <DetailContainer>
        <DetailHeader>
          <DetailHeaderLeft>
            <Button variant="outline" onClick={voltarParaLista}>
              ← Voltar para Casos
            </Button>
            <DetailTitle>Detalhes do Caso #{casoAtual.id}</DetailTitle>
          </DetailHeaderLeft>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge variant={getCategoriaBadgeVariant(casoAtual.categoria)}>{casoAtual.categoria}</Badge>
            <Badge variant={getStatusBadgeVariant(casoAtual.status)}>{casoAtual.status}</Badge>
          </div>
        </DetailHeader>

        <DetailGrid>
          {/* Coluna da esquerda: Informações do objeto e comentários */}
          <DetailColumn>
            <ObjectCard>
              <CardHeader>
                <CardTitle>
                  <Package size={18} style={{ display: "inline", marginRight: "8px" }} />
                  Informações do Objeto
                </CardTitle>
              </CardHeader>
              <ObjectCardContent>
                <ObjectBox>
                  <ObjectIconLarge>
                    <Package size={24} color="#6b7280" />
                  </ObjectIconLarge>
                  <div>
                    <ObjectTitle>{casoAtual.objeto}</ObjectTitle>
                    {casoAtual.descricao && <ObjectDescription>{casoAtual.descricao}</ObjectDescription>}
                  </div>
                </ObjectBox>

                <MetaGrid>
                  <MetaItem>
                    <Calendar size={16} />
                    <span>Data do roubo: {casoAtual.dataRoubo}</span>
                  </MetaItem>

                  {casoAtual.localizacao && (
                    <MetaItem>
                      <MapPin size={16} />
                      <span>Local: {casoAtual.localizacao}</span>
                    </MetaItem>
                  )}

                  <MetaItem>
                    <Tag size={16} />
                    <span>Categoria: {casoAtual.categoria}</span>
                  </MetaItem>
                </MetaGrid>

                {casoAtual.status === "Em análise" && (
                  <WarningBox>
                    <AlertTriangle size={20} />
                    <span>Investigação em andamento. A polícia está analisando seu caso.</span>
                  </WarningBox>
                )}

                <div style={{ marginTop: "1rem" }}>
                  <Button
                    onClick={() => {
                      // Aqui você pode implementar a navegação para o mapa
                      alert("Navegando para o mapa...")
                    }}
                  >
                    <MapPin size={16} style={{ marginRight: "0.5rem" }} />
                    Ver no Mapa
                  </Button>
                </div>
              </ObjectCardContent>
            </ObjectCard>

            <CommentsCard>
              <CardHeader>
                <CardTitle>Comentários da Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CommentsContent>
                  {comentarios.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                      <p style={{ color: "#6b7280" }}>Ainda não há comentários para este caso.</p>
                    </div>
                  ) : (
                    <CommentsList>
                      {comentarios.map((comentario) => (
                        <CommentItem key={comentario.id}>
                          <Avatar>A</Avatar>
                          <CommentContent>
                            <CommentHeader>
                              <CommentAuthor>Anônimo</CommentAuthor>
                              {comentario.isPolicialOuAdmin && (
                                <CommentBadge>
                                  <Shield size={12} />
                                  Oficial
                                </CommentBadge>
                              )}
                              <CommentDate>{comentario.data}</CommentDate>
                            </CommentHeader>
                            <CommentText>{comentario.conteudo}</CommentText>
                          </CommentContent>
                        </CommentItem>
                      ))}
                    </CommentsList>
                  )}
                </CommentsContent>
              </CardContent>
              <CardFooter>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    Comentários são anônimos e não podem ser adicionados aqui.
                  </span>
                </div>
              </CardFooter>
            </CommentsCard>
          </DetailColumn>

          {/* Coluna da direita: Chat com a polícia */}
          <ChatCard>
            <CardHeader>
              <CardTitle>
                <Shield size={18} style={{ display: "inline", marginRight: "8px" }} />
                Chat com a Polícia
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: 0, flexGrow: 1 }}>
              <ChatContent>
                <ChatMessages>
                  {mensagens.map((mensagem) => (
                    <MessageRow key={mensagem.id} isUser={mensagem.remetente === "usuario"}>
                      <MessageBubble isUser={mensagem.remetente === "usuario"}>
                        <MessageText>{mensagem.conteudo}</MessageText>
                        <MessageTime isUser={mensagem.remetente === "usuario"}>{mensagem.data}</MessageTime>
                      </MessageBubble>
                    </MessageRow>
                  ))}
                </ChatMessages>
                <ChatInputContainer>
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        enviarMensagem()
                      }
                    }}
                    style={{ flexGrow: 1 }}
                  />
                  <Button variant="icon" onClick={enviarMensagem} disabled={!novaMensagem.trim()}>
                    <Send size={16} />
                  </Button>
                </ChatInputContainer>
              </ChatContent>
            </CardContent>
          </ChatCard>
        </DetailGrid>
      </DetailContainer>
    )
  }

  // Renderizar a lista de casos
  if (casos.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyStateTitle>Nenhum caso de roubo registrado!</EmptyStateTitle>
          <EmptyStateIcon>
            <Smile size={96} color="#22c55e" />
          </EmptyStateIcon>
          <EmptyStateText>Ótimas notícias! Todos os seus objetos estão seguros.</EmptyStateText>
          <EmptyStateText>Continue utilizando nosso sistema para manter seus pertences protegidos.</EmptyStateText>

          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Button onClick={() => setShowDialog(true)}>
              <Plus size={16} style={{ marginRight: "0.5rem" }} />
              Registrar Novo Caso
            </Button>
            <Button variant="secondary" onClick={adicionarCasoTeste}>
              <Plus size={16} style={{ marginRight: "0.5rem" }} />
              Adicionar Caso de Teste
            </Button>
          </div>
        </EmptyState>

        {showDialog && (
          <Dialog>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Novo Caso</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <FormGroup>
                  <Label htmlFor="objeto">Objeto Roubado</Label>
                  <Input
                    id="objeto"
                    placeholder="Ex: Smartphone, Carteira, Notebook..."
                    value={novoObjeto}
                    onChange={(e) => setNovoObjeto(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select
                    id="categoria"
                    value={novaCategoria}
                    onChange={(e) =>
                      setNovaCategoria(e.target.value as "Armado" | "Moto" | "Furto" | "Distração" | "Outros")
                    }
                  >
                    <option value="Armado">Armado</option>
                    <option value="Moto">Moto</option>
                    <option value="Furto">Furto</option>
                    <option value="Distração">Distração</option>
                    <option value="Outros">Outros</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="descricao">Descrição (opcional)</Label>
                  <Input
                    id="descricao"
                    placeholder="Descreva o objeto..."
                    value={novaDescricao}
                    onChange={(e) => setNovaDescricao(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="localizacao">Local do Roubo (opcional)</Label>
                  <Input
                    id="localizacao"
                    placeholder="Ex: Av. Paulista, Estação Sé..."
                    value={novaLocalizacao}
                    onChange={(e) => setNovaLocalizacao(e.target.value)}
                  />
                </FormGroup>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={adicionarCaso} disabled={!novoObjeto.trim()}>
                  Registrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Title>Casos de Roubo</Title>
        <ButtonGroup>
          <Button onClick={() => setShowDialog(true)}>
            <Plus size={16} />
            Registrar Novo Caso
          </Button>
          <Button variant="secondary" onClick={adicionarCasoTeste}>
            <Plus size={16} />
            Adicionar Caso Teste
          </Button>
        </ButtonGroup>
      </Header>

      <SearchFilterContainer>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput
            placeholder="Buscar por objeto ou localização..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </SearchContainer>

        <FilterContainer>
          <Filter size={16} color="#6b7280" />
          <Select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            style={{ marginRight: "0.5rem" }}
          >
            <option value="todos">Todos os status</option>
            <option value="Em análise">Em análise</option>
            <option value="Localizado">Localizado</option>
            <option value="Recuperado">Recuperado</option>
          </Select>
          <Select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="todos">Todas as categorias</option>
            <option value="Armado">Armado</option>
            <option value="Moto">Moto</option>
            <option value="Furto">Furto</option>
            <option value="Distração">Distração</option>
            <option value="Outros">Outros</option>
          </Select>
        </FilterContainer>
      </SearchFilterContainer>

      {casosFiltrados.length === 0 ? (
        <Alert>
          <AlertCircle size={16} />
          <span>Nenhum caso encontrado com os filtros atuais.</span>
        </Alert>
      ) : (
        <CardList>
          {casosFiltrados.map((caso) => (
            <Card key={caso.id} onClick={() => navegarParaDetalhes(caso.id)} style={{ cursor: "pointer" }}>
              <CardHeader>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CardTitle>Caso #{caso.id}</CardTitle>
                  <Badge variant={getCategoriaBadgeVariant(caso.categoria)}>{caso.categoria}</Badge>
                </div>
                <Badge variant={getStatusBadgeVariant(caso.status)}>{caso.status}</Badge>
              </CardHeader>
              <CardContent>
                <ObjectInfo>
                  <IconContainer>
                    <Package size={24} color="#6b7280" />
                  </IconContainer>
                  <ObjectDetails>
                    <ObjectName>{caso.objeto}</ObjectName>
                    <ObjectMeta>Roubado em: {caso.dataRoubo}</ObjectMeta>
                    {caso.localizacao && (
                      <ObjectMeta>
                        <MapPin size={12} />
                        {caso.localizacao}
                      </ObjectMeta>
                    )}
                    {caso.descricao && <ObjectMeta>{caso.descricao}</ObjectMeta>}
                  </ObjectDetails>
                </ObjectInfo>

                {caso.status === "Em análise" && (
                  <AlertBox>
                    <AlertTriangle size={16} />
                    <span style={{ fontSize: "0.75rem" }}>Investigação em andamento</span>
                  </AlertBox>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    navegarParaDetalhes(caso.id)
                  }}
                >
                  Ver Detalhes
                </Button>

                {caso.status === "Em análise" && (
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowConfirmationDialog(true)
                      setCasoIdToUpdate(caso.id)
                    }}
                  >
                    Marcar como Recuperado
                  </Button>
                )}

                {caso.status === "Localizado" && (
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowRecoveredConfirmationDialog(true)
                      setCasoIdToUpdate(caso.id)
                    }}
                  >
                    Marcar como Recuperado
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </CardList>
      )}

      {showDialog && (
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Novo Caso</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <FormGroup>
                <Label htmlFor="objeto">Objeto Roubado</Label>
                <Input
                  id="objeto"
                  placeholder="Ex: Smartphone, Carteira, Notebook..."
                  value={novoObjeto}
                  onChange={(e) => setNovoObjeto(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="categoria">Categoria</Label>
                <Select
                  id="categoria"
                  value={novaCategoria}
                  onChange={(e) =>
                    setNovaCategoria(e.target.value as "Armado" | "Moto" | "Furto" | "Distração" | "Outros")
                  }
                >
                  <option value="Armado">Armado</option>
                  <option value="Moto">Moto</option>
                  <option value="Furto">Furto</option>
                  <option value="Distração">Distração</option>
                  <option value="Outros">Outros</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Input
                  id="descricao"
                  placeholder="Descreva o objeto..."
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="localizacao">Local do Roubo (opcional)</Label>
                <Input
                  id="localizacao"
                  placeholder="Ex: Av. Paulista, Estação Sé..."
                  value={novaLocalizacao}
                  onChange={(e) => setNovaLocalizacao(e.target.value)}
                />
              </FormGroup>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarCaso} disabled={!novoObjeto.trim()}>
                Registrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showConfirmationDialog && (
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Recuperação</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p>
                Ao marcar o objeto como recuperado, você estará dizendo que você recuperou o objeto e não é necessário o
                B.O. estar aberto.
              </p>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmationDialog(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (casoIdToUpdate) {
                    atualizarStatus(casoIdToUpdate, "Recuperado")
                    setShowConfirmationDialog(false)
                    setCasoIdToUpdate(null)
                  }
                }}
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showRecoveredConfirmationDialog && (
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Recuperação</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p>Você já recuperou mesmo o objeto? Ao confirmar, o status será alterado para "Recuperado".</p>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRecoveredConfirmationDialog(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (casoIdToUpdate) {
                    atualizarStatus(casoIdToUpdate, "Recuperado")
                    setShowRecoveredConfirmationDialog(false)
                    setCasoIdToUpdate(null)
                  }
                }}
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  )
}

