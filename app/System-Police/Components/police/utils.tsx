import { Smartphone, Laptop, Bike, Watch, Camera, HelpCircle } from "lucide-react"

export const getIconForObjectType = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case "smartphone":
      return <Smartphone className="h-4 w-4 text-blue-500" />
    case "laptop":
      return <Laptop className="h-4 w-4 text-purple-500" />
    case "bicicleta":
      return <Bike className="h-4 w-4 text-green-500" />
    case "relógio":
      return <Watch className="h-4 w-4 text-yellow-500" />
    case "câmera":
      return <Camera className="h-4 w-4 text-red-500" />
    default:
      return <HelpCircle className="h-4 w-4 text-gray-500" />
  }
}

export const getStatusBadge = (status: string) => {
  const baseClasses = "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"

  switch (status.toLowerCase()) {
    case "em investigação":
      return <span className={`${baseClasses} bg-blue-50 text-blue-700 ring-blue-600/20`}>{status}</span>
    case "resolvido":
      return <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>{status}</span>
    case "pendente":
      return <span className={`${baseClasses} bg-yellow-50 text-yellow-700 ring-yellow-600/20`}>{status}</span>
    case "recuperado":
      return <span className={`${baseClasses} bg-purple-50 text-purple-700 ring-purple-600/20`}>{status}</span>
    default:
      return <span className={`${baseClasses} bg-gray-50 text-gray-700 ring-gray-600/20`}>{status}</span>
  }
}

export const getPriorityBadge = (prioridade: string) => {
  const baseClasses = "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"

  switch (prioridade.toLowerCase()) {
    case "alta":
      return <span className={`${baseClasses} bg-red-50 text-red-700 ring-red-600/20`}>{prioridade}</span>
    case "média":
      return <span className={`${baseClasses} bg-yellow-50 text-yellow-700 ring-yellow-600/20`}>{prioridade}</span>
    case "baixa":
      return <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>{prioridade}</span>
    default:
      return <span className={`${baseClasses} bg-gray-50 text-gray-700 ring-gray-600/20`}>{prioridade}</span>
  }
}

export const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString("pt-BR")
}

