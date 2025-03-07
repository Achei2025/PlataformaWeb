import type React from "react"
import { getIconForObjectType, getStatusConfig, getPriorityConfig, formatarData, formatarValor } from "./utils"
import { Badge } from "@/app/components/ui/badge"

const ExemploCaso: React.FC = () => {
  const casoExemplo = {
    id: "CASO-001",
    objeto: "iPhone 12",
    tipoObjeto: "Smartphone",
    dataRoubo: "2023-06-15",
    horaRoubo: "14:30",
    localizacao: "Avenida Paulista, 1000",
    status: "Em investigação",
    vitima: "João Silva",
    prioridade: "Alta",
    valorEstimado: 5000,
  }

  const IconComponent = getIconForObjectType(casoExemplo.tipoObjeto)
  const statusConfig = getStatusConfig(casoExemplo.status)
  const prioridadeConfig = getPriorityConfig(casoExemplo.prioridade)

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Exemplo de Caso: {casoExemplo.id}</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Objeto:</p>
          <div className="flex items-center gap-2">
            <IconComponent className="h-5 w-5" />
            <span>{casoExemplo.objeto}</span>
          </div>
        </div>

        <div>
          <p className="font-semibold">Data e Hora:</p>
          <p>
            {formatarData(casoExemplo.dataRoubo)} às {casoExemplo.horaRoubo}
          </p>
        </div>

        <div>
          <p className="font-semibold">Localização:</p>
          <p>{casoExemplo.localizacao}</p>
        </div>

        <div>
          <p className="font-semibold">Vítima:</p>
          <p>{casoExemplo.vitima}</p>
        </div>

        <div>
          <p className="font-semibold">Status:</p>
          <Badge variant="outline" className={`flex items-center gap-1 ${statusConfig.className}`}>
            <statusConfig.icon className="h-3 w-3" />
            {statusConfig.text}
          </Badge>
        </div>

        <div>
          <p className="font-semibold">Prioridade:</p>
          <Badge className={prioridadeConfig.className}>{prioridadeConfig.text}</Badge>
        </div>

        <div>
          <p className="font-semibold">Valor Estimado:</p>
          <p>{formatarValor(casoExemplo.valorEstimado)}</p>
        </div>
      </div>
    </div>
  )
}

export default ExemploCaso

