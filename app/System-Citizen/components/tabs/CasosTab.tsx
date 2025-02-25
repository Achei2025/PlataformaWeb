"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Smile, Package, AlertTriangle } from "lucide-react"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  status: "Em análise" | "Localizado" | "Recuperado"
  localizacao?: string
}

const CasosTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>([])

  // Função para adicionar um caso de teste
  const adicionarCasoTeste = () => {
    const novoCaso: Caso = {
      id: Date.now().toString(),
      objeto: "Smartphone",
      dataRoubo: new Date().toLocaleDateString(),
      status: "Em análise",
    }
    setCasos([...casos, novoCaso])
  }

  if (casos.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card className="bg-green-50 dark:bg-green-900">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-green-700 dark:text-green-300">
              Nenhum caso de roubo registrado!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Smile className="mx-auto h-24 w-24 text-green-500 mb-4" />
            <p className="text-green-600 dark:text-green-400">Ótimas notícias! Todos os seus objetos estão seguros.</p>
            <p className="text-green-600 dark:text-green-400 mt-2">
              Continue utilizando nosso sistema para manter seus pertences protegidos.
            </p>
            <Button onClick={adicionarCasoTeste} className="mt-4">
              Adicionar Caso de Teste
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Casos de Roubo</h1>
      <div className="space-y-4">
        {casos.map((caso) => (
          <Card key={caso.id} className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Caso #{caso.id}</CardTitle>
              <Badge
                variant={caso.status === "Recuperado" ? "default" : "secondary"}
                className={
                  caso.status === "Em análise"
                    ? "bg-yellow-100 text-yellow-800"
                    : caso.status === "Localizado"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                }
              >
                {caso.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Package className="h-10 w-10 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{caso.objeto}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Roubado em: {caso.dataRoubo}</p>
                  {caso.localizacao && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">Localização: {caso.localizacao}</p>
                  )}
                </div>
              </div>
              {caso.status === "Em análise" && (
                <div className="mt-4 flex items-center text-yellow-600 dark:text-yellow-400">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span className="text-xs">Investigação em andamento</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={adicionarCasoTeste} className="mt-4">
        Adicionar Outro Caso de Teste
      </Button>
    </div>
  )
}

export default CasosTab

