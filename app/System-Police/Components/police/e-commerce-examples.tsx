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

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { ArrowLeft, ExternalLink, Flag, ShoppingBag, Star, AlertTriangle, MapPin, X } from "lucide-react"

// Tipo simplificado para os itens de e-commerce
interface EcommerceItem {
  nome: string
  preco: number
  imagem: string
  loja: string
  logoLoja: string
  dataListagem: string
  suspeito: boolean
  condicao: string
  localizacao: string
}

// Dados de exemplo
const mockItems: EcommerceItem[] = [
  {
    nome: "iPhone 13 Pro 256GB Azul Sierra",
    preco: 4299.99,
    imagem: "/placeholder.svg?height=300&width=300&text=iPhone+13+Pro",
    loja: "Mercado Livre",
    logoLoja: "/placeholder.svg?height=40&width=40&text=ML",
    dataListagem: "2023-12-11",
    suspeito: true,
    condicao: "Usado - Como novo",
    localizacao: "São Paulo, SP",
  },
  {
    nome: "iPhone 13 Pro Max Azul 256GB Desbloqueado",
    preco: 4899.99,
    imagem: "/placeholder.svg?height=300&width=300&text=iPhone+13+Pro+Max",
    loja: "OLX",
    logoLoja: "/placeholder.svg?height=40&width=40&text=OLX",
    dataListagem: "2023-12-12",
    suspeito: true,
    condicao: "Usado - Bom estado",
    localizacao: "São Paulo, SP",
  },
  {
    nome: "Apple iPhone 13 Pro 256GB Azul - Novo Lacrado",
    preco: 5499.99,
    imagem: "/placeholder.svg?height=300&width=300&text=iPhone+13+Pro+Novo",
    loja: "Amazon",
    logoLoja: "/placeholder.svg?height=40&width=40&text=AMZ",
    dataListagem: "2023-11-28",
    suspeito: false,
    condicao: "Novo",
    localizacao: "São Paulo, SP",
  },
  {
    nome: "iPhone 13 Pro 256GB Azul - Seminovo",
    preco: 3999.99,
    imagem: "/placeholder.svg?height=300&width=300&text=iPhone+13+Pro+Seminovo",
    loja: "Facebook Marketplace",
    logoLoja: "/placeholder.svg?height=40&width=40&text=FB",
    dataListagem: "2023-12-13",
    suspeito: true,
    condicao: "Usado - Algumas marcas de uso",
    localizacao: "Guarulhos, SP",
  },
]

interface EcommerceDemoProps {
  isOpen: boolean
  onClose: () => void
  casoId?: string
  categoria?: string
  marca?: string
  modelo?: string
}

export default function EcommerceDemo({
  isOpen,
  onClose,
  casoId = "CASO-2023-1234",
  categoria = "Smartphone",
  marca = "iPhone",
  modelo = "13 Pro",
}: EcommerceDemoProps) {
  const [activeTab, setActiveTab] = useState("todos")

  const handleReportItem = () => {
    alert("Item reportado como suspeito!")
  }

  // Filtrar itens com base na tab ativa
  const filteredItems =
    activeTab === "todos"
      ? mockItems
      : activeTab === "suspeitos"
        ? mockItems.filter((item) => item.suspeito)
        : mockItems.filter((item) => !item.suspeito)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Verificação de E-commerces</DialogTitle>
        </DialogHeader>

        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onClose} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <p className="text-gray-500">
                  Caso #{casoId} - {categoria} {marca} {modelo}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} size="icon">
              <X className="h-4 w-4" />
            </Button>
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
                  marcados como suspeitos foram listados recentemente ou possuem características que podem indicar que
                  são produtos roubados.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-6">
              <TabsTrigger value="todos" className="flex-1">
                Todos os Itens
                <Badge variant="outline" className="ml-2 bg-white">
                  {mockItems.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="suspeitos" className="flex-1">
                Itens Suspeitos
                <Badge variant="outline" className="ml-2 bg-white">
                  {mockItems.filter((i) => i.suspeito).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="normais" className="flex-1">
                Itens Normais
                <Badge variant="outline" className="ml-2 bg-white">
                  {mockItems.filter((i) => !i.suspeito).length}
                </Badge>
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
      </DialogContent>
    </Dialog>
  )

  function renderItems() {
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
        {filteredItems.map((item, index) => (
          <Card key={index} className={`overflow-hidden ${item.suspeito ? "border-red-300" : ""}`}>
            <div className="relative">
              <Image
                src={item.imagem || "/placeholder.svg"}
                alt={item.nome}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              {item.suspeito && (
                <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Potencialmente Suspeito
                </Badge>
              )}
              <Badge className="absolute top-2 left-2 bg-white text-gray-800 border">
                {new Date(item.dataListagem).toLocaleDateString("pt-BR")}
              </Badge>
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
                  <span className="text-sm text-gray-600">{item.loja}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>
              <CardTitle className="text-lg mt-2 line-clamp-2">{item.nome}</CardTitle>
              <p className="text-xl font-bold text-green-700 mt-1">
                {item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge variant="outline" className="text-xs">
                  {item.condicao}
                </Badge>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{item.localizacao}</span>
              </div>

              {item.suspeito && (
                <div className="mt-2 p-2 bg-red-50 rounded-md">
                  <p className="text-xs text-red-700">
                    Este item foi listado recentemente e possui características similares ao objeto roubado.
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between pt-2 border-t">
              <Button variant="outline" onClick={handleReportItem}>
                <Flag className="h-4 w-4 mr-2" />
                Reportar
              </Button>
              <Button asChild>
                <a href="#" onClick={(e) => e.preventDefault()}>
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

