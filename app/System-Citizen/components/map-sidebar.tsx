"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import { ChevronLeft, ChevronRight, Search, AlertTriangle } from "lucide-react"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
}

interface MapSidebarProps {
  casos: Caso[]
  onCasoSelect: (caso: Caso) => void
  onToggleHeatmap: (enabled: boolean) => void
}

const MapSidebar: React.FC<MapSidebarProps> = ({ casos, onCasoSelect, onToggleHeatmap }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showHeatmap, setShowHeatmap] = useState(false)

  const filteredCasos = casos.filter(
    (caso) =>
      caso.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.localizacao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleHeatmapToggle = (checked: boolean) => {
    setShowHeatmap(checked)
    onToggleHeatmap(checked)
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-20 ${isOpen ? "w-80" : "w-12"}`}
    >
      <Button
        variant="ghost"
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {isOpen && (
        <div className="p-4 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Casos de Roubo</h2>

          <div className="mb-4">
            <Label htmlFor="search">Buscar casos</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                placeholder="Buscar por objeto ou localização"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Switch id="heatmap" checked={showHeatmap} onCheckedChange={handleHeatmapToggle} />
            <Label htmlFor="heatmap">Mostrar mapa de calor</Label>
          </div>

          <div className="space-y-4">
            {filteredCasos.map((caso) => (
              <Card
                key={caso.id}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onCasoSelect(caso)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                    {caso.objeto}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-xs text-gray-500">
                  <p>Data: {caso.dataRoubo}</p>
                  <p>Local: {caso.localizacao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MapSidebar

