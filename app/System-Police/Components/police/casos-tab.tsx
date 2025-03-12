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
import { CasosList } from "./casos-list"
import { CasosFilters } from "./casos-filters"
import { CasosHeader } from "./casos-header"
import { CasoModal } from "./caso-modal"
import { mockCasos } from "./mock-data"
import type { Caso } from "./types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"
import { useToast } from "@/app/components/ui/use-toast"

const CasosTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>(mockCasos)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | undefined>()
  const [tipoObjetoFilter, setTipoObjetoFilter] = useState<string | undefined>()
  const [selectedCasos, setSelectedCasos] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Caso
    direction: "ascending" | "descending"
  } | null>(null)
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [batchAction, setBatchAction] = useState<{ action: string; casoIds: string[] } | null>(null)

  const { toast } = useToast()

  const itemsPerPage = 10

  const filteredCasos = casos.filter((caso) => {
    const searchTermMatch =
      caso.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.vitima.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.id.toLowerCase().includes(searchTerm.toLowerCase())
    const statusMatch = statusFilter ? caso.status === statusFilter : true
    const tipoObjetoMatch = tipoObjetoFilter ? caso.tipoObjeto === tipoObjetoFilter : true

    return searchTermMatch && statusMatch && tipoObjetoMatch
  })

  const totalPages = Math.ceil(filteredCasos.length / itemsPerPage)

  const paginatedCasos = filteredCasos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCasos(paginatedCasos.map((caso) => caso.id))
    } else {
      setSelectedCasos([])
    }
  }

  const handleSelectCaso = (casoId: string) => {
    setSelectedCasos((prevSelectedCasos) => {
      if (prevSelectedCasos.includes(casoId)) {
        return prevSelectedCasos.filter((id) => id !== casoId)
      } else {
        return [...prevSelectedCasos, casoId]
      }
    })
  }

  const handleSort = (key: keyof Caso) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    setCasos((prevCasos) => {
      return [...prevCasos].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1
        }
        return 0
      })
    })
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter(undefined)
    setTipoObjetoFilter(undefined)
  }

  const handleOpenModal = (caso: Caso) => {
    setSelectedCaso(caso)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedCaso(null)
    setIsModalOpen(false)
  }

  const handleUpdateStatus = (casoId: string, newStatus: string) => {
    setCasos((prevCasos) => prevCasos.map((caso) => (caso.id === casoId ? { ...caso, status: newStatus } : caso)))
  }

  const handleSendMessage = (casoId: string, message: string) => {
    // Aqui você pode implementar a lógica para enviar a mensagem
    console.log(`Mensagem enviada para o caso ${casoId}: ${message}`)
    // Você pode atualizar o estado dos casos para incluir a nova mensagem, se necessário
  }

  const handleBatchAction = (action: string, casoIds: string[]) => {
    setBatchAction({ action, casoIds })
    setIsConfirmDialogOpen(true)
  }

  const confirmBatchAction = () => {
    if (batchAction) {
      const { action, casoIds } = batchAction
      switch (action) {
        case "resolver":
          setCasos(casos.map((caso) => (casoIds.includes(caso.id) ? { ...caso, status: "Resolvido" } : caso)))
          break
        case "arquivar":
          setCasos(casos.map((caso) => (casoIds.includes(caso.id) ? { ...caso, status: "Arquivado" } : caso)))
          break
        case "excluir":
          setCasos(casos.filter((caso) => !casoIds.includes(caso.id)))
          break
        default:
          console.log(`Ação não reconhecida: ${action}`)
      }
      setSelectedCasos([])
      setIsConfirmDialogOpen(false)
      toast({
        title: "Ação em lote concluída",
        description: `A ação "${action}" foi aplicada a ${casoIds.length} caso(s).`,
      })
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <CasosHeader />
      <CasosFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        tipoObjetoFilter={tipoObjetoFilter}
        setTipoObjetoFilter={setTipoObjetoFilter}
        handleClearFilters={handleClearFilters}
      />
      <CasosList
        casos={paginatedCasos}
        selectedCasos={selectedCasos}
        handleSelectAll={handleSelectAll}
        handleSelectCaso={handleSelectCaso}
        handleSort={handleSort}
        sortConfig={sortConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        filteredCasosLength={filteredCasos.length}
        onOpenModal={handleOpenModal}
        onBatchAction={handleBatchAction}
      />
      {selectedCaso && (
        <CasoModal
          caso={selectedCaso}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
          onSendMessage={handleSendMessage}
        />
      )}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar ação em lote</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja {batchAction?.action} {batchAction?.casoIds.length} caso(s)? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBatchAction}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CasosTab

