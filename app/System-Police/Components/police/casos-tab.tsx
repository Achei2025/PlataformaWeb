"use client"

import { useState, useEffect } from "react"
import { CasosList } from "@/app/System-Police/Components/police/casos-list"
import { CasoModal } from "@/app/System-Police/Components/police/caso-modal"
import { casosMock } from "@/app/System-Police/Components/police/mock-data"
import type { Caso } from "@/app/System-Police/Components/police/types"

export default function CasosPage() {
  const [casos, setCasos] = useState<Caso[]>([])
  const [selectedCasos, setSelectedCasos] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const itemsPerPage = 5

  // Carregar dados de exemplo
  useEffect(() => {
    setCasos(casosMock)
  }, [])

  // Filtrar casos
  const filteredCasos = casos.filter((caso) => {
    const matchesSearch =
      searchTerm === "" ||
      caso.nomeObjeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.vitima.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caso.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === null || caso.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginação
  const totalPages = Math.ceil(filteredCasos.length / itemsPerPage)
  const paginatedCasos = filteredCasos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Manipuladores de eventos
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCasos(paginatedCasos.map((caso) => caso.id))
    } else {
      setSelectedCasos([])
    }
  }

  const handleSelectCaso = (id: string) => {
    if (selectedCasos.includes(id)) {
      setSelectedCasos(selectedCasos.filter((casoId) => casoId !== id))
    } else {
      setSelectedCasos([...selectedCasos, id])
    }
  }

  const handleSort = (key: keyof Caso) => {
    // Implementação simples de ordenação
    const sortedCasos = [...casos].sort((a, b) => {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    })
    setCasos(sortedCasos)
  }

  const handleOpenModal = (caso: Caso) => {
    setSelectedCaso(caso)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleUpdateStatus = (casoId: string, newStatus: string) => {
    setCasos(casos.map((caso) => (caso.id === casoId ? { ...caso, status: newStatus } : caso)))
  }

  const handleBatchAction = (action: string, casoIds: string[]) => {
    // Aqui você implementaria a lógica para ações em lote
    console.log(`Executando ação ${action} para os casos:`, casoIds)

    // Exemplo de atualização de status
    if (action === "resolver") {
      setCasos(casos.map((caso) => (casoIds.includes(caso.id) ? { ...caso, status: "resolvido" } : caso)))
    } else if (action === "arquivar") {
      setCasos(casos.map((caso) => (casoIds.includes(caso.id) ? { ...caso, status: "arquivado" } : caso)))
    } else if (action === "excluir") {
      setCasos(casos.filter((caso) => !casoIds.includes(caso.id)))
    }

    // Limpar seleção após ação
    setSelectedCasos([])
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Sistema de Registro de Objetos Roubados</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Buscar por ID, objeto ou vítima..."
            className="px-4 py-2 border rounded-md w-full sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="px-4 py-2 border rounded-md"
            value={statusFilter || ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
          >
            <option value="">Todos os status</option>
            <option value="aberto">Aberto</option>
            <option value="investigacao">Em investigação</option>
            <option value="resolvido">Resolvido</option>
            <option value="arquivado">Arquivado</option>
          </select>
        </div>
      </div>

      <CasosList
        casos={paginatedCasos}
        selectedCasos={selectedCasos}
        handleSelectAll={handleSelectAll}
        handleSelectCaso={handleSelectCaso}
        handleSort={handleSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        filteredCasosLength={filteredCasos.length}
        onOpenModal={handleOpenModal}
        onBatchAction={handleBatchAction}
      />

      {/* Modal de detalhes do caso */}
      <CasoModal
        caso={selectedCaso}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateStatus}
        userType="police"
      />
    </div>
  )
}

