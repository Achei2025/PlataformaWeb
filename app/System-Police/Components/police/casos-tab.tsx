"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Search } from "lucide-react"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  status: "Em andamento" | "Resolvido" | "Arquivado"
  vitima: string
}

const mockCasos: Caso[] = [
  {
    id: "1",
    objeto: "Smartphone",
    dataRoubo: "2023-05-15",
    localizacao: "São Paulo, SP",
    status: "Em andamento",
    vitima: "João Silva",
  },
  {
    id: "2",
    objeto: "Laptop",
    dataRoubo: "2023-05-16",
    localizacao: "Rio de Janeiro, RJ",
    status: "Resolvido",
    vitima: "Maria Santos",
  },
  {
    id: "3",
    objeto: "Bicicleta",
    dataRoubo: "2023-05-17",
    localizacao: "Belo Horizonte, MG",
    status: "Arquivado",
    vitima: "Pedro Oliveira",
  },
  // Adicione mais casos conforme necessário
]

const CasosTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>(mockCasos)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | undefined>()

  const filteredCasos = casos.filter(
    (caso) =>
      (caso.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caso.vitima.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caso.localizacao.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!statusFilter || caso.status === statusFilter),
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Casos</h1>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Buscar por objeto, vítima ou localização"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4 text-gray-500" />}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={undefined}>Todos</SelectItem>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Resolvido">Resolvido</SelectItem>
              <SelectItem value="Arquivado">Arquivado</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setStatusFilter(undefined)
            }}
          >
            Limpar Filtros
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Casos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Objeto</TableHead>
                <TableHead>Data do Roubo</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Vítima</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCasos.map((caso) => (
                <TableRow key={caso.id}>
                  <TableCell>{caso.id}</TableCell>
                  <TableCell>{caso.objeto}</TableCell>
                  <TableCell>{caso.dataRoubo}</TableCell>
                  <TableCell>{caso.localizacao}</TableCell>
                  <TableCell>{caso.vitima}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        caso.status === "Em andamento"
                          ? "default"
                          : caso.status === "Resolvido"
                            ? "success"
                            : "secondary"
                      }
                    >
                      {caso.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default CasosTab

