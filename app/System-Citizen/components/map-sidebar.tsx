/*
 * Achei: Stolen Object Tracking System.
 * Copyright (C) 2025  Team Achei
 * 
 * This file is part of Achei.
 * 
 * Achei is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Achei is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Achei.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * Contact information: teamachei.2024@gmail.com
*/

"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { Search, AlertTriangle, ChevronLeft, ChevronRight, Filter, Layers, MapPin, X } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import { Badge } from "@/app/components/ui/badge"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Collapsible, CollapsibleContent } from "@/app/components/ui/collapsible"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import CaseDetailModal from "./tabs/case-detail-modal"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/app/components/ui/Map"), { ssr: false })

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

interface MapSidebarProps {
  casos: Caso[]
  onCasoSelect: (caso: Caso) => void
  onToggleHeatmap: (enabled: boolean) => void
}

const MapSidebar: React.FC<MapSidebarProps> = ({ casos, onCasoSelect, onToggleHeatmap }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCasoForModal, setSelectedCasoForModal] = useState<Caso | null>(null)

  // Extract unique categories from casos
  const categorias = [...new Set(casos.map((caso) => caso.categoria))].sort()

  const filteredCasos = casos.filter((caso) => {
    const matchesSearch =
      searchTerm === "" ||
      caso.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.descricao?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(caso.categoria)

    return matchesSearch && matchesCategories
  })

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleHeatmapToggle = (checked: boolean) => {
    setShowHeatmap(checked)
    onToggleHeatmap(checked)
  }

  const handleCategoryToggle = (categoria: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoria) ? prev.filter((cat) => cat !== categoria) : [...prev, categoria],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchTerm("")
  }

  const handleCasoClick = (caso: Caso) => {
    onCasoSelect(caso)
    setSelectedCasoForModal(caso)
    setModalOpen(true)
  }

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
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-lg transition-all duration-300 z-50 ${
          isOpen ? "w-80" : "w-[2rem]"
        }`}
      >
        <Button
          variant="ghost"
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>

        {isOpen && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Mapa de Ocorrências
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ocorrências..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="heatmap" checked={showHeatmap} onCheckedChange={handleHeatmapToggle} />
                  <Label htmlFor="heatmap" className="flex items-center">
                    <Layers className="mr-2 h-4 w-4" />
                    Mapa de Calor
                  </Label>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </div>

              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleContent>
                  <div className="px-4 pb-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Categorias</h3>
                      {selectedCategories.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                          <X className="mr-1 h-3 w-3" />
                          Limpar filtros
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {categorias.map((categoria) => (
                        <div key={categoria} className="flex items-center space-x-2">
                          <Checkbox
                            id={`categoria-${categoria}`}
                            checked={selectedCategories.includes(categoria)}
                            onCheckedChange={() => handleCategoryToggle(categoria)}
                          />
                          <Label htmlFor={`categoria-${categoria}`} className="text-sm cursor-pointer">
                            {categoria}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-4 space-y-4">
                  {filteredCasos.length > 0 ? (
                    filteredCasos.map((caso) => (
                      <Card
                        key={caso.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleCasoClick(caso)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium flex items-center justify-between">
                            <div className="flex items-center">
                              <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                              {caso.objeto}
                            </div>
                            <Badge variant="outline" className={getStatusColor(caso.status)}>
                              {caso.status || "Pendente"}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={caso.imagem || "/placeholder.svg"}
                                alt={caso.objeto}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <Badge variant="outline" className="mb-2">
                                {caso.categoria}
                              </Badge>
                              <p className="text-xs text-muted-foreground">{formatDate(caso.dataRoubo)}</p>
                              <p className="text-xs flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                                {caso.localizacao}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Nenhuma ocorrência encontrada com os filtros atuais.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>

      <CaseDetailModal caso={selectedCasoForModal} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default MapSidebar