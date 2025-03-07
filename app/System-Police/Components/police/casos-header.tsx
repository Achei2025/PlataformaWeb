import type React from "react"
import { Button } from "@/app/components/ui/button"
import { FileText } from "lucide-react"

export const CasosHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-1">Incidentes</h1>
        <p className="text-muted-foreground">Gerenciamento e acompanhamento de casos de roubo</p>
      </div>
      <div className="flex items-center gap-2">
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Novo Incidente
        </Button>
      </div>
    </div>
  )
}

