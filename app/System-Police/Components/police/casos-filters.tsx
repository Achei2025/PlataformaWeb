"use client"

import type React from "react"

import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { X } from "lucide-react"

interface CasosFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string | undefined
  setStatusFilter: (status: string | undefined) => void
  prioridadeFilter: string | undefined
  setPrioridadeFilter: (prioridade: string | undefined) => void
  tipoObjetoFilter: string | undefined
  setTipoObjetoFilter: (tipo: string | undefined) => void
  handleClearFilters: () => void
}

export const CasosFilters: React.FC<CasosFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  prioridadeFilter,
  setPrioridadeFilter,
  tipoObjetoFilter,
  setTipoObjetoFilter,
  handleClearFilters,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filtros</CardTitle>
        <CardDescription>Refine sua busca de incidentes</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Buscar por ID, objeto, vítima ou localização"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Em investigação">Em investigação</SelectItem>
            <SelectItem value="Resolvido">Resolvido</SelectItem>
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Recuperado">Recuperado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Média">Média</SelectItem>
            <SelectItem value="Baixa">Baixa</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tipoObjetoFilter} onValueChange={setTipoObjetoFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de objeto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Smartphone">Smartphone</SelectItem>
            <SelectItem value="Laptop">Laptop</SelectItem>
            <SelectItem value="Bicicleta">Bicicleta</SelectItem>
            <SelectItem value="Relógio">Relógio</SelectItem>
            <SelectItem value="Câmera">Câmera</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleClearFilters}>
          <X className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      </CardContent>
    </Card>
  )
}

