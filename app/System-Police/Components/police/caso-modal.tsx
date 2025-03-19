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
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { FileText, Search, ShoppingBag } from "lucide-react"
import { formatarData } from "./utils"
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
import { SuccessDialog } from "@/app/components/ui/success-dialog"
import EcommerceDemo from "./e-commerce-examples"

interface CasoModalProps {
  caso: Caso | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (casoId: string, newStatus: string) => void
  userType?: "visitor" | "citizen" | "police"
}

type ModalState = "details" | "confirm" | "success"

export const CasoModal: React.FC<CasoModalProps> = ({ caso, isOpen, onClose, onUpdateStatus, userType = "police" }) => {
  const [newStatus, setNewStatus] = useState(caso?.status || "")
  const [modalState, setModalState] = useState<ModalState>("details")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showEcommerceDemo, setShowEcommerceDemo] = useState(false)

  if (!caso) return null

  const handleStatusUpdate = () => {
    setModalState("confirm")
  }

  const confirmStatusUpdate = () => {
    onUpdateStatus(caso.id, newStatus)
    setModalState("details")
    setShowSuccessDialog(true)

    // The SuccessDialog will auto-close after 5 seconds
    // When it closes, we'll close the main modal
    setTimeout(() => {
      onClose()
    }, 5000)
  }

  const handleCheckSimilarItems = () => {
    // Abrir o modal de demonstração de e-commerce
    setShowEcommerceDemo(true)
  }

  return (
    <>
      {/* Confirmation Dialog */}
      <AlertDialog open={modalState === "confirm"} onOpenChange={(open) => !open && setModalState("details")}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar alteração de status</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja alterar o status do incidente para &ldquo;{newStatus}&rdquo;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setModalState("details")}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusUpdate}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        message={`Status do incidente atualizado para &ldquo;${newStatus}&rdquo; com sucesso!`}
      />

      {/* E-commerce Demo */}
      <EcommerceDemo
        isOpen={showEcommerceDemo}
        onClose={() => setShowEcommerceDemo(false)}
        casoId={caso.id}
        categoria={caso.categoriaObjeto}
        marca={caso.marca}
        modelo={caso.modelo}
      />

      {/* Main Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              Incidente {caso.id}
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {caso.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="detalhes-objeto" className="w-full mt-6">
            <TabsList className="w-full bg-gray-50 p-0">
              <TabsTrigger value="detalhes-objeto" className="flex-1">
                Detalhes do Objeto
              </TabsTrigger>
              <TabsTrigger value="detalhes-incidente" className="flex-1">
                Detalhes do Incidente
              </TabsTrigger>
              <TabsTrigger value="mensagens" className="flex-1">
                Mensagens
              </TabsTrigger>
              <TabsTrigger value="comentarios" className="flex-1">
                Comentários
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes-objeto" className="mt-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="text-sm text-gray-500">Categoria do Objeto</label>
                  <p className="mt-1">{caso.categoriaObjeto}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Nome do Objeto</label>
                  <p className="mt-1">{caso.nomeObjeto}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Situação</label>
                  <p className="mt-1">{caso.situacao}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Marca</label>
                  <p className="mt-1">{caso.marca}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Modelo</label>
                  <p className="mt-1">{caso.modelo}</p>
                </div>
                {caso.categoriaObjeto === "Celular" && (
                  <div>
                    <label className="text-sm text-gray-500">IMEI</label>
                    <p className="mt-1">{caso.imei}</p>
                  </div>
                )}
                {caso.categoriaObjeto === "Veículo" && (
                  <div>
                    <label className="text-sm text-gray-500">Chassi</label>
                    <p className="mt-1">{caso.chassi}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <label className="text-sm text-gray-500">Descrição do Objeto</label>
                  <p className="mt-1">{caso.descricaoObjeto}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-500">QR Code do Objeto</label>
                  <div className="mt-2">
                    <Image
                      src={caso.qrCode || "/placeholder.svg"}
                      alt="QR Code"
                      width={128}
                      height={128}
                      className="w-32 h-32"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-500">Imagens do Objeto</label>
                  <div className="mt-2 flex gap-2">
                    {caso.imagensObjeto?.map((img, index) => (
                      <Image
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`Imagem ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Outro Meio de Contato</label>
                  <p className="mt-1">{caso.outroContato}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Nota Fiscal</label>
                  <div className="mt-1">
                    <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Nota Fiscal
                    </Button>
                  </div>
                </div>

                {/* Botão para verificar itens similares - apenas para policiais */}
                {userType === "police" && (
                  <div className="col-span-2 mt-4">
                    <Button
                      onClick={handleCheckSimilarItems}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Verificar Itens Similares em E-commerces Parceiros
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Esta ferramenta permite verificar itens similares em e-commerces parceiros para auxiliar na
                      investigação.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="detalhes-incidente" className="mt-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="text-sm text-gray-500">Data do Roubo</label>
                  <p className="mt-1">{formatarData(caso.dataRoubo)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Hora do Roubo</label>
                  <p className="mt-1">{caso.horaRoubo}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Categoria do Roubo</label>
                  <p className="mt-1">{caso.categoriaRoubo}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Local do Roubo</label>
                  <p className="mt-1">{caso.localRoubo}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-500">Mapa do Local do Roubo</label>
                  <div className="mt-2 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Mapa será exibido aqui</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-500">Descrição do Roubo</label>
                  <p className="mt-1">{caso.descricaoRoubo}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Vítima</label>
                  <p className="mt-1">{caso.vitima}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Telefone</label>
                  <p className="mt-1">{caso.telefone}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mensagens" className="mt-6">
              <div className="h-96 flex items-center justify-center text-gray-500">Mensagens serão exibidas aqui</div>
            </TabsContent>

            <TabsContent value="comentarios" className="mt-6">
              <div className="h-96 flex items-center justify-center text-gray-500">Comentários serão exibidos aqui</div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Em investigação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Em investigação">Em investigação</SelectItem>
                  <SelectItem value="Resolvido">Resolvido</SelectItem>
                  <SelectItem value="Arquivado">Arquivado</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate}>Atualizar Status</Button>

              {/* Botão adicional para verificar itens similares - versão compacta */}
              {userType === "police" && (
                <Button onClick={handleCheckSimilarItems} variant="outline" className="ml-2">
                  <Search className="h-4 w-4 mr-2" />
                  Verificar E-commerces
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

