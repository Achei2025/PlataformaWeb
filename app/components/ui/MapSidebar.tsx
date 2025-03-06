"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { ChevronLeft, ChevronRight, Search, Filter, ArrowLeft } from "lucide-react"

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
  onBack: () => void
  userType: "visitor" | "citizen" | "police"
}

const MapSidebar: React.FC<MapSidebarProps> = ({ casos, onCasoSelect, onToggleHeatmap, onBack, userType }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    objectType: "",
  })

  const filteredCasos = casos.filter(
    (caso) =>
      (caso.objeto && caso.objeto.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (caso.localizacao && caso.localizacao.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleHeatmapToggle = (checked: boolean) => {
    setShowHeatmap(checked)
    onToggleHeatmap(checked)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const getBackButtonText = () => {
    switch (userType) {
      case "visitor":
        return "Voltar para Home"
      case "citizen":
        return "Voltar para Área do Cidadão"
      case "police":
        return "Voltar para Área Policial"
      default:
        return "Voltar"
    }
  }

  return (
    <div
      className={`absolute top-4 left-4 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-50 rounded-lg ${
        isOpen ? "w-80" : "w-12"
      }`}
    >
      <Button
        variant="ghost"
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {isOpen && (
        <div className="p-4 h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-gray-700" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {getBackButtonText()}
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filtros
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filtros</h4>
                    <p className="text-sm text-muted-foreground">Ajuste os filtros para refinar sua busca.</p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        className="col-span-2 h-8"
                        value={filters.date}
                        onChange={(e) => handleFilterChange("date", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        type="text"
                        className="col-span-2 h-8"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="objectType">Tipo de Objeto</Label>
                      <Input
                        id="objectType"
                        type="text"
                        className="col-span-2 h-8"
                        value={filters.objectType}
                        onChange={(e) => handleFilterChange("objectType", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

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
                  <CardTitle className="text-sm font-medium">{caso.objeto}</CardTitle>
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

