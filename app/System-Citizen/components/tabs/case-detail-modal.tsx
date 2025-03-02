"use client"

import type React from "react"

import { MapPin, Calendar, Tag, AlertTriangle, Share2, Flag } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Separator } from "../../../components/ui/separator"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  latitude: number
  longitude: number
  categoria: string
  imagem: string
  descricao?: string
  status?: string
  boletimOcorrencia?: string
}

interface CaseDetailModalProps {
  caso: Caso | null
  isOpen: boolean
  onClose: () => void
}

const CaseDetailModal: React.FC<CaseDetailModalProps> = ({ caso, isOpen, onClose }) => {
  if (!caso) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  // Status color mapping
  const getStatusColor = (status = "Pendente") => {
    switch (status.toLowerCase()) {
      case "recuperado":
        return "bg-green-500"
      case "em investigação":
        return "bg-blue-500"
      case "arquivado":
        return "bg-gray-500"
      default:
        return "bg-yellow-500" // Pendente
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{caso.objeto}</DialogTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={getStatusColor(caso.status)}>
              {caso.status || "Pendente"}
            </Badge>
            <Badge variant="outline">{caso.categoria}</Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Imagem do objeto */}
          <div className="relative w-full h-64 rounded-md overflow-hidden">
            <Image src={caso.imagem || "/placeholder.svg"} alt={caso.objeto} fill className="object-cover" />
          </div>

          {/* Informações principais */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Data do Roubo</h4>
                <p>{formatDate(caso.dataRoubo)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Localização</h4>
                <p>{caso.localizacao}</p>
                <p className="text-sm text-muted-foreground">
                  Lat: {caso.latitude.toFixed(6)}, Long: {caso.longitude.toFixed(6)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Categoria</h4>
                <p>{caso.categoria}</p>
              </div>
            </div>

            {caso.boletimOcorrencia && (
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Boletim de Ocorrência</h4>
                  <p>{caso.boletimOcorrencia}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Descrição */}
          <div>
            <h4 className="font-medium mb-2">Descrição</h4>
            <p className="text-muted-foreground">{caso.descricao || "Nenhuma descrição disponível."}</p>
          </div>

          {/* Mini mapa estático (simulado) */}
          <div className="relative w-full h-40 bg-muted rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Mapa da localização do incidente</p>
            </div>
            <div className="absolute bottom-2 right-2">
              <Button variant="secondary" size="sm">
                Ver no mapa
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-destructive">
              <Flag className="h-4 w-4" />
              Reportar
            </Button>
          </div>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CaseDetailModal

