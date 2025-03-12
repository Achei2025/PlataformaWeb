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
import { Card, CardHeader, CardContent } from "@/app/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { ArrowUpDown, Eye, CheckCircle, Archive, Trash2 } from "lucide-react"
import { getIconForObjectType, getStatusBadge, formatarData } from "./utils"
import type { Caso } from "./types"

interface CasosListProps {
  casos: Caso[]
  selectedCasos: string[]
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectCaso: (id: string) => void
  handleSort: (key: keyof Caso) => void
  sortConfig: { key: keyof Caso; direction: "ascending" | "descending" } | null
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  itemsPerPage: number
  filteredCasosLength: number
  onOpenModal: (caso: Caso) => void
  onBatchAction: (action: string, casoIds: string[]) => void
}

export const CasosList: React.FC<CasosListProps> = ({
  casos,
  selectedCasos,
  handleSelectAll,
  handleSelectCaso,
  handleSort,
  sortConfig,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
  filteredCasosLength,
  onOpenModal,
  onBatchAction,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Lista de Incidentes</h3>
          <div className="flex items-center gap-2">
            {selectedCasos.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Ações em lote ({selectedCasos.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onBatchAction("resolver", selectedCasos)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Marcar como resolvido</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onBatchAction("arquivar", selectedCasos)}>
                    <Archive className="mr-2 h-4 w-4" />
                    <span>Arquivar casos</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onBatchAction("excluir", selectedCasos)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Excluir casos</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={casos.length > 0 && selectedCasos.length === casos.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("id")}>
                  <div className="flex items-center">
                    ID
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("objeto")}>
                  <div className="flex items-center">
                    Objeto
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("dataRoubo")}>
                  <div className="flex items-center">
                    Data
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Vítima</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {casos.map((caso) => (
                <TableRow key={caso.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCasos.includes(caso.id)}
                      onCheckedChange={() => handleSelectCaso(caso.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{caso.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getIconForObjectType(caso.tipoObjeto)}
                      <span>{caso.objeto}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatarData(caso.dataRoubo)}</TableCell>
                  <TableCell>{caso.localizacao}</TableCell>
                  <TableCell>{caso.vitima}</TableCell>
                  <TableCell>{getStatusBadge(caso.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onOpenModal(caso)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCasosLength)}</span> de{" "}
            <span className="font-medium">{filteredCasosLength}</span> incidentes
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

