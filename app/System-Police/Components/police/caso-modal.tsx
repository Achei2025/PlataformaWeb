"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { formatarData, getStatusBadge, getPriorityBadge } from "./utils"
import type { Caso, Comentario } from "./types"
import { Send } from "lucide-react"

interface CasoModalProps {
  caso: Caso | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (casoId: string, newStatus: string) => void
  onSendMessage: (casoId: string, message: string) => void
}

export const CasoModal: React.FC<CasoModalProps> = ({ caso, isOpen, onClose, onUpdateStatus, onSendMessage }) => {
  const [newStatus, setNewStatus] = useState(caso?.status || "")
  const [newMessage, setNewMessage] = useState("")

  if (!caso) return null

  const handleStatusUpdate = () => {
    onUpdateStatus(caso.id, newStatus)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(caso.id, newMessage)
      setNewMessage("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            Incidente {caso.id}
            {getStatusBadge(caso.status)}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="details" className="flex-grow overflow-hidden flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="flex-grow overflow-hidden">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Objeto</h4>
                  <p className="text-lg">{caso.objeto}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Tipo de Objeto</h4>
                  <p className="text-lg">{caso.tipoObjeto}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Data do Roubo</h4>
                  <p className="text-lg">{formatarData(caso.dataRoubo)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Hora do Roubo</h4>
                  <p className="text-lg">{caso.horaRoubo}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Localização</h4>
                  <p className="text-lg">{caso.localizacao}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Vítima</h4>
                  <p className="text-lg">{caso.vitima}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Telefone</h4>
                  <p className="text-lg">{caso.telefone}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Prioridade</h4>
                  <p className="text-lg">{getPriorityBadge(caso.prioridade)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">Valor Estimado</h4>
                  <p className="text-lg">R$ {Number.parseFloat(caso.valorEstimado).toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="font-semibold text-sm text-gray-500">Descrição</h4>
                  <p className="text-lg">{caso.descricao}</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="messages" className="flex-grow overflow-hidden flex flex-col">
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-4">
                {/* Exemplo de mensagem */}
                <div className="flex items-start space-x-4 bg-gray-50 p-3 rounded-lg">
                  <Avatar>
                    <AvatarImage src="/police-avatar.png" alt="Policial" />
                    <AvatarFallback>PL</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Policial Silva</p>
                    <p className="text-sm">Estamos investigando seu caso. Manteremos você informado.</p>
                    <p className="text-xs text-gray-400">Há 2 horas</p>
                  </div>
                </div>
                {/* Adicione mais mensagens conforme necessário */}
              </div>
            </ScrollArea>
            <div className="mt-4 flex items-center space-x-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="comments" className="flex-grow overflow-hidden flex flex-col">
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-4">
                {caso.comentarios &&
                  caso.comentarios.map((comentario: Comentario, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar>
                          <AvatarFallback>{comentario.autor[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{comentario.autor}</p>
                          <p className="text-xs text-gray-400">{formatarData(comentario.data)}</p>
                        </div>
                      </div>
                      <p className="text-sm">{comentario.texto}</p>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Atualizar Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Em investigação">Em investigação</SelectItem>
                <SelectItem value="Resolvido">Resolvido</SelectItem>
                <SelectItem value="Arquivado">Arquivado</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleStatusUpdate}>Atualizar Status</Button>
          </div>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

