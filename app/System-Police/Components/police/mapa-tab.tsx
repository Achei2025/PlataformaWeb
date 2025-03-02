"use client"

import type React from "react"

import { useState } from "react"
import Map from "@/app/components/ui/Map"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  latitude: number
  longitude: number
  status: "Em andamento" | "Resolvido" | "Arquivado"
}

const mockCasos: Caso[] = [
  {
    id: "1",
    objeto: "Smartphone",
    dataRoubo: "2023-05-15",
    localizacao: "São Paulo, SP",
    latitude: -23.5505,
    longitude: -46.6333,
    status: "Em andamento",
  },
  // ... outros casos
]

const MapaTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>(mockCasos)

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Map userType="police" casos={casos} onBack={() => window.history.back()} />
    </div>
  )
}

export default MapaTab

