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

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { ArrowLeft, ExternalLink, Flag, ShoppingBag, Star } from "lucide-react"

// Tipos para os itens de e-commerce
interface EcommerceItem {
  id: string
  nome: string
  marca: string
  modelo: string
  preco: number
  imagem: string
  loja: string
  logoLoja: string
  url: string
  dataListagem: string
  avaliacao: number
  suspeito: boolean
}

export default function EcommerceCheck() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<EcommerceItem[]>([])
  const [filteredItems, setFilteredItems] = useState<EcommerceItem[]>([])
  const [activeTab, setActiveTab] = useState("todos")

  // Obter parâmetros da URL
  const casoId = searchParams.get("id")
  const categoria = searchParams.get("categoria")
  const marca = searchParams.get("marca")
  const modelo = searchParams.get("modelo")

  useEffect(() => {
    // Simular carregamento de dados
    const fetchData = async () => {
      setIsLoading(true)

      try {
        // Em uma aplicação real, você faria uma chamada à API
        // Simulando uma chamada à API com timeout
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Dados de exemplo
        const mockItems: EcommerceItem[] = [
          {
            id: "item1",
            nome: `${marca} ${modelo}`,
            marca: marca || "Desconhecido",
            modelo: modelo || "Desconhecido",
            preco: 2499.99,
            imagem: "/placeholder.svg?height=200&width=200",
            loja: "TechShop",
            logoLoja: "/placeholder.svg?height=40&width=40",
            url: "https://example.com/item1",
            dataListagem: "2023-12-01",
            avaliacao: 4.5,
            suspeito: true,
          },
          {
            id: "item2",
            nome: `${marca} ${modelo} (Usado)`,
            marca: marca || "Desconhecido",
            modelo: modelo || "Desconhecido",
            preco: 1899.99,
            imagem: "/placeholder.svg?height=200&width=200",
            loja: "MercadoLivre",
            logoLoja: "/placeholder.svg?height=40&width=40",
            url: "https://example.com/item2",
            dataListagem: "2023-12-05",
            avaliacao: 4.2,
            suspeito: true,
          },
          {
            id: "item3",
            nome: `${marca} ${modelo} Premium`,
            marca: marca || "Desconhecido",
            modelo: modelo || "Desconhecido",
            preco: 2799.99,
            imagem: "/placeholder.svg?height=200&width=200",
            loja: "Amazon",
            logoLoja: "/placeholder.svg?height=40&width=40",
            url: "https://example.com/item3",
            dataListagem: "2023-11-28",
            avaliacao: 4.7,
            suspeito: false,
          },
          {
            id: "item4",
            nome: `${marca} ${modelo} (Novo)`,
            marca: marca || "Desconhecido",
            modelo: modelo || "Desconhecido",
            preco: 2599.99,
            imagem: "/placeholder.svg?height=200&width=200",
            loja: "Americanas",
            logoLoja: "/placeholder.svg?height=40&width=40",
            url: "https://example.com/item4",
            dataListagem: "2023-12-03",
            avaliacao: 4.4,
            suspeito: false,
          },
          {
            id: "item5",
            nome: `${marca} ${modelo} (Seminovo)`,
            marca: marca || "Desconhecido",
            modelo: modelo || "Desconhecido",
            preco: 1799.99,
            imagem: "/placeholder.svg?height=200&width=200",
            loja: "OLX",
            logoLoja: "/placeholder.svg?height=40&width=40",
            url: "https://example.com/item5",
            dataListagem: "2023-12-07",
            avaliacao: 3.9,
            suspeito: true,
          },
        ]

        setItems(mockItems)
        setFilteredItems(mockItems)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [marca, modelo])

  // Filtrar itens quando a tab mudar
  useEffect(() => {
    if (activeTab === "todos") {
      setFilteredItems(items)
    } else if (activeTab === "suspeitos") {
      setFilteredItems(items.filter((item) => item.suspeito))
    } else if (activeTab === "normais") {
      setFilteredItems(items.filter((item) => !item.suspeito))
    }
  }, [activeTab, items])

  const handleBack = () => {
    router.back()
  }

  const handleReportItem = (itemId: string) => {
    // Em uma aplicação real, você enviaria um relatório para a API
    alert(`Item ${itemId} reportado como suspeito!`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Verificação de E-commerces</h1>
          <p className="text-gray-500">
            Caso #{casoId} - {categoria} {marca} {modelo}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Ferramenta de Verificação de E-commerces</h3>
            <p className="text-blue-600 mt-1">
              Esta ferramenta busca itens similares em e-commerces parceiros para auxiliar na investigação. Itens
              marcados como suspeitos foram listados recentemente ou possuem características que podem indicar que são
              produtos roubados.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="todos" className="flex-1">
            Todos os Itens
          </TabsTrigger>
          <TabsTrigger value="suspeitos" className="flex-1">
            Itens Suspeitos
          </TabsTrigger>
          <TabsTrigger value="normais" className="flex-1">
            Itens Normais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="mt-0">
          {renderItems()}
        </TabsContent>

        <TabsContent value="suspeitos" className="mt-0">
          {renderItems()}
        </TabsContent>

        <TabsContent value="normais" className="mt-0">
          {renderItems()}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderItems() {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600">Nenhum item encontrado</h3>
          <p className="text-gray-500 mt-2">Não encontramos itens correspondentes aos critérios de busca.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`overflow-hidden ${item.suspeito ? "border-red-300" : ""}`}>
            <div className="relative">
              <Image
                src={item.imagem || "/placeholder.svg"}
                alt={item.nome}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              {item.suspeito && (
                <Badge className="absolute top-2 right-2 bg-red-500 text-white">Potencialmente Suspeito</Badge>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={item.logoLoja || "/placeholder.svg"}
                    alt={item.loja}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  <CardDescription>{item.loja}</CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="text-sm">{item.avaliacao}</span>
                </div>
              </div>
              <CardTitle className="text-lg mt-2">{item.nome}</CardTitle>
              <p className="text-xl font-bold text-green-700 mt-1">
                {item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-gray-500">
                Listado em: {new Date(item.dataListagem).toLocaleDateString("pt-BR")}
              </p>
              {item.suspeito && (
                <div className="mt-2 p-2 bg-red-50 rounded-md">
                  <p className="text-xs text-red-700">
                    Este item foi listado recentemente e possui características similares ao objeto roubado.
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between pt-2 border-t">
              <Button variant="outline" onClick={() => handleReportItem(item.id)}>
                <Flag className="h-4 w-4 mr-2" />
                Reportar
              </Button>
              <Button asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Anúncio
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }
}

