"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Map from "@/app/components/ui/Map"
import MapSidebar from "@/app/System-Citizen/components/map-sidebar"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  latitude: number
  longitude: number
}

const MapaTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>([])
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null)
  const [showHeatmap, setShowHeatmap] = useState(false)

  // Simular carregamento de casos
  useEffect(() => {
    // Aqui você normalmente faria uma chamada API para obter os casos reais
    const mockCasos: Caso[] = [
      {
        id: "1",
        objeto: "Smartphone",
        dataRoubo: "2023-05-15",
        localizacao: "São Paulo, SP",
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        id: "2",
        objeto: "Laptop",
        dataRoubo: "2023-05-16",
        localizacao: "Rio de Janeiro, RJ",
        latitude: -22.9068,
        longitude: -43.1729,
      },
      {
        id: "3",
        objeto: "Bicicleta",
        dataRoubo: "2023-05-17",
        localizacao: "Belo Horizonte, MG",
        latitude: -19.9167,
        longitude: -43.9345,
      },
    ]
    setCasos(mockCasos)
  }, [])

  const handleCasoSelect = (caso: Caso) => {
    setSelectedCaso(caso)
    // Aqui você pode adicionar lógica para atualizar o mapa, como centralizar na localização do caso
  }

  const handleToggleHeatmap = (enabled: boolean) => {
    setShowHeatmap(enabled)
    // Aqui você pode adicionar lógica para mostrar/esconder o mapa de calor
  }

  return (
    <div className="h-full w-full relative">
      <MapSidebar casos={casos} onCasoSelect={handleCasoSelect} onToggleHeatmap={handleToggleHeatmap} />
      <Map selectedCaso={selectedCaso} casos={casos} showHeatmap={showHeatmap} />
    </div>
  )
}

export default MapaTab

