import { Smartphone, Laptop, Bike, Watch, Camera, Tablet, Music, Package, ShoppingBag, Zap } from "lucide-react"
import { Badge } from "@/app/components/ui/badge"

// Função para obter o ícone com base no tipo de objeto
export function getIconForObjectType(tipo: string) {
  switch (tipo.toLowerCase()) {
    case "celular":
      return <Smartphone className="h-4 w-4" />
    case "notebook":
      return <Laptop className="h-4 w-4" />
    case "bicicleta":
      return <Bike className="h-4 w-4" />
    case "relogio":
      return <Watch className="h-4 w-4" />
    case "camera":
      return <Camera className="h-4 w-4" />
    case "tablet":
      return <Tablet className="h-4 w-4" />
    case "instrumento":
      return <Music className="h-4 w-4" />
    case "eletronico":
      return <Zap className="h-4 w-4" />
    case "acessorio":
      return <ShoppingBag className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

// Função para obter o badge de status
export function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "aberto":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
          Aberto
        </Badge>
      )
    case "investigacao":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Em investigação
        </Badge>
      )
    case "resolvido":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          Resolvido
        </Badge>
      )
    case "arquivado":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Arquivado
        </Badge>
      )
    default:
      return <Badge variant="outline">Desconhecido</Badge>
  }
}

// Função para formatar data
export function formatarData(data: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data)
}

