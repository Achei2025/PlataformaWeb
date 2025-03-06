"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Map from "@/app/components/ui/Map"

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

const MapaTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>([])

  useEffect(() => {
    // Simular carregamento de casos (substitua por uma chamada API real)
    const mockCasos: Caso[] = [
      {
        id: "1",
        objeto: "Smartphone iPhone 13",
        dataRoubo: "2023-05-15",
        localizacao: "Av. Paulista, São Paulo, SP",
        latitude: -23.5505,
        longitude: -46.6333,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao:
          "Smartphone roubado próximo à estação de metrô. O assaltante estava em uma motocicleta e abordou a vítima enquanto ela utilizava o celular.",
        status: "Em investigação",
        boletimOcorrencia: "BO-2023/05-12345",
      },
      // ... outros casos
    ]
    setCasos(mockCasos)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Map userType="citizen" casos={casos} onBack={() => window.history.back()} />
    </div>
  )
}

export default MapaTab