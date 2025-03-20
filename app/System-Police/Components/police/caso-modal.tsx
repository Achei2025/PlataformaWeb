"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { Search, ShoppingBag, FileText, MapPin, Send, AlertTriangle, Shield, User } from "lucide-react"
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
import { Textarea } from "@/app/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

interface CasoModalProps {
  caso: Caso | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (casoId: string, newStatus: string) => void
  userType?: "visitor" | "citizen" | "police"
}

type ModalState = "details" | "confirm" | "success"

// Mensagens de exemplo entre o policial e o cidadão
const mockMessages = [
  {
    id: 1,
    sender: "police",
    senderName: "Investigador Silva",
    content:
      "Bom dia, estamos analisando seu caso. Você poderia fornecer mais detalhes sobre o local onde o objeto foi roubado?",
    timestamp: "2023-12-10T10:30:00",
    read: true,
  },
  {
    id: 2,
    sender: "citizen",
    senderName: "Maria Oliveira",
    content:
      "Bom dia, Investigador. O roubo aconteceu na Avenida Paulista, próximo ao número 1000, por volta das 18h. Eu estava saindo do trabalho quando fui abordada por dois homens em uma moto.",
    timestamp: "2023-12-10T11:15:00",
    read: true,
  },
  {
    id: 3,
    sender: "police",
    senderName: "Investigador Silva",
    content:
      "Obrigado pelas informações. Estamos verificando as câmeras de segurança da região. Você se lembra de alguma característica física dos assaltantes?",
    timestamp: "2023-12-10T14:22:00",
    read: true,
  },
  {
    id: 4,
    sender: "citizen",
    senderName: "Maria Oliveira",
    content:
      "Um deles estava usando capacete preto e o outro capacete branco. O da moto era mais alto, talvez 1,80m. Ambos usavam jaquetas escuras.",
    timestamp: "2023-12-10T15:05:00",
    read: true,
  },
  {
    id: 5,
    sender: "police",
    senderName: "Investigador Silva",
    content:
      "Perfeito. Encontramos algumas imagens que podem ser relevantes. Vamos analisar e entraremos em contato novamente em breve.",
    timestamp: "2023-12-11T09:10:00",
    read: false,
  },
]

// Comentários e denúncias anônimas
const mockComments = [
  {
    id: 1,
    type: "anonymous",
    content: "Vi um celular com essa descrição sendo vendido na feira do Brás, barraca 45, no último domingo.",
    timestamp: "2023-12-12T08:45:00",
  },
  {
    id: 2,
    type: "police",
    author: "Delegado Mendes",
    content: "Equipe designada para verificar a denúncia na feira do Brás no próximo domingo.",
    timestamp: "2023-12-12T10:30:00",
  },
  {
    id: 3,
    type: "anonymous",
    content:
      "Tenho informações que um grupo está receptando celulares roubados na região da Santa Ifigênia. Eles operam em uma loja de fachada que vende capinhas.",
    timestamp: "2023-12-13T14:20:00",
  },
  {
    id: 4,
    type: "police",
    author: "Investigador Silva",
    content: "Denúncia registrada. Vamos cruzar com outras informações que já temos sobre essa região.",
    timestamp: "2023-12-13T16:05:00",
  },
  {
    id: 5,
    type: "anonymous",
    content:
      "Vi alguém usando um celular igual a esse na estação Sé do metrô ontem à tarde. A pessoa parecia suspeita, estava tentando remover o chip.",
    timestamp: "2023-12-14T09:15:00",
  },
]

// Função para determinar quais campos devem ser exibidos com base na categoria do objeto
const shouldShowField = (fieldName: string, category?: string): boolean => {
  if (!category) return true

  const categoryLower = category.toLowerCase()

  // Campos específicos para eletrônicos
  if (fieldName === "imei" || fieldName === "macAddress") {
    return ["smartphone", "celular", "tablet", "notebook", "laptop", "computador"].some((item) =>
      categoryLower.includes(item),
    )
  }

  // Campos específicos para veículos
  if (fieldName === "placa" || fieldName === "chassi" || fieldName === "renavam") {
    return ["carro", "moto", "veículo", "automóvel", "motocicleta", "caminhão"].some((item) =>
      categoryLower.includes(item),
    )
  }

  // Campos específicos para instrumentos musicais
  if (fieldName === "numeroRegistro") {
    return ["instrumento", "violão", "violino", "piano", "guitarra"].some((item) => categoryLower.includes(item))
  }

  // Por padrão, mostrar o campo
  return true
}

export const CasoModal: React.FC<CasoModalProps> = ({ caso, isOpen, onClose, onUpdateStatus, userType = "police" }) => {
  const [newStatus, setNewStatus] = useState(caso?.status || "")
  const [modalState, setModalState] = useState<ModalState>("details")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showEcommerceDemo, setShowEcommerceDemo] = useState(false)
  const [newMessage, setNewMessage] = useState("")

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aqui você implementaria a lógica para enviar a mensagem
      alert("Mensagem enviada: " + newMessage)
      setNewMessage("")
    }
  }

  const category = caso.category || caso.categoriaObjeto || caso.tipoObjeto || ""

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
        categoria={category}
        marca={caso.brand || caso.marca || ""}
        modelo={caso.model || caso.modelo || caso.nomeObjeto}
      />

      {/* Main Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[1000px] md:max-w-[1200px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
          <DialogHeader className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <DialogTitle className="flex items-center gap-2 text-xl">
              Incidente {caso.id}
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border border-blue-200">
                {caso.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="detalhes-objeto" className="w-full flex-1 flex flex-col">
            <TabsList className="w-full bg-gray-50 p-0 rounded-none border-b">
              <TabsTrigger
                value="detalhes-objeto"
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Detalhes do Objeto
              </TabsTrigger>
              <TabsTrigger
                value="detalhes-incidente"
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Detalhes do Incidente
              </TabsTrigger>
              <TabsTrigger
                value="mensagens"
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Mensagens
              </TabsTrigger>
              <TabsTrigger
                value="comentarios"
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Comentários
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes-objeto" className="p-6 overflow-y-auto">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Nome do Objeto</label>
                  <p className="mt-1 text-gray-900">{caso.name || caso.nomeObjeto}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Categoria</label>
                  <p className="mt-1 text-gray-900">{category}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1 text-gray-900">{caso.status || caso.situacao}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Marca</label>
                  <p className="mt-1 text-gray-900">{caso.brand || caso.marca || "Não informado"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Modelo</label>
                  <p className="mt-1 text-gray-900">{caso.model || caso.modelo || "Não informado"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Data de Aquisição</label>
                  <p className="mt-1 text-gray-900">
                    {caso.acquisitionDate ? new Date(caso.acquisitionDate).toLocaleDateString() : "Não informado"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Número de Série</label>
                  <p className="mt-1 text-gray-900 font-mono">
                    {caso.serialNumber || caso.numeroSerie || "Não informado"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Código de Identificação</label>
                  <p className="mt-1 text-gray-900 font-mono">{caso.identificationCode || "Não informado"}</p>
                </div>

                {/* Propriedades dinâmicas (como IMEI) - agora condicionais */}
                {caso.properties &&
                  caso.properties
                    .filter((prop) => shouldShowField(prop.key.toLowerCase(), category))
                    .map((prop, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">{prop.key}</label>
                        <p className="mt-1 text-gray-900 font-mono">{prop.value || "Não informado"}</p>
                      </div>
                    ))}

                <div className="col-span-3 bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Descrição do Objeto</label>
                  <p className="mt-1 text-gray-900">
                    {caso.description || caso.descricaoObjeto || caso.descricao || "Sem descrição"}
                  </p>
                </div>

                <div className="col-span-3 grid grid-cols-4 gap-4">
                  <div className="col-span-1 bg-gray-50 p-3 rounded-lg">
                    {caso.qrCode ? (
                      <div>
                        <label className="text-sm font-medium text-gray-500">QR Code</label>
                        <div className="mt-2">
                          <Image
                            src={caso.qrCode || "/placeholder.svg"}
                            alt="QR Code"
                            width={100}
                            height={100}
                            className="w-24 h-24 border border-gray-200 rounded-md"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nota Fiscal</label>
                        {caso.invoice ? (
                          <div className="mt-2">
                            <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                              <FileText className="h-4 w-4 mr-2" />
                              Ver Nota Fiscal
                            </Button>
                          </div>
                        ) : (
                          <p className="mt-1 text-gray-500">Não disponível</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="col-span-3 bg-gray-50 p-3 rounded-lg">
                    <label className="text-sm font-medium text-gray-500">Imagens do Objeto</label>
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                      {caso.image ? (
                        <div className="relative min-w-[100px] h-[100px] border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <Image
                            src={caso.image || "/placeholder.svg"}
                            alt="Imagem do objeto"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : caso.imagensObjeto ? (
                        caso.imagensObjeto.map((img, index) => (
                          <div
                            key={index}
                            className="relative min-w-[100px] h-[100px] border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Image
                              src={img || "/placeholder.svg"}
                              alt={`Imagem ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))
                      ) : caso.imagemObjeto ? (
                        <div className="relative min-w-[100px] h-[100px] border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <Image
                            src={caso.imagemObjeto || "/placeholder.svg"}
                            alt="Imagem do objeto"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-[100px] h-[100px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-gray-200">
                          Sem imagem
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botão para verificar itens similares - apenas para policiais */}
                {userType === "police" && (
                  <div className="col-span-3 mt-2">
                    <Button
                      onClick={handleCheckSimilarItems}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Verificar Itens Similares em E-commerces Parceiros
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="detalhes-incidente" className="p-6 overflow-y-auto">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Status do Incidente</label>
                  <div className="mt-1">
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                      {caso.incidentStatus || caso.status}
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Tipo de Crime</label>
                  <p className="mt-1 text-gray-900">{caso.crimeType || caso.categoriaRoubo || "Não informado"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Data do Incidente</label>
                  <p className="mt-1 text-gray-900">{formatarData(caso.dataRoubo)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg col-span-3">
                  <label className="text-sm font-medium text-gray-500">Localização</label>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <p className="text-gray-900">{caso.location || caso.localRoubo}</p>
                  </div>
                </div>
                <div className="col-span-3 bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Descrição do Incidente</label>
                  <p className="mt-1 text-gray-900">
                    {caso.incidentDescription ||
                      caso.description ||
                      caso.descricaoRoubo ||
                      caso.descricao ||
                      "Sem descrição"}
                  </p>
                </div>

                {/* Informações da vítima */}
                <div className="col-span-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Informações da Vítima</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="text-sm font-medium text-gray-500">Nome da Vítima</label>
                      <p className="mt-1 text-gray-900">{caso.vitima || "Não informado"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="text-sm font-medium text-gray-500">Telefone</label>
                      <p className="mt-1 text-gray-900">{caso.telefone || "Não informado"}</p>
                    </div>
                    {caso.email && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="mt-1 text-gray-900">{caso.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Boletim de Ocorrência */}
                {caso.boletimOcorrencia && (
                  <div className="col-span-3 bg-gray-50 p-3 rounded-lg">
                    <label className="text-sm font-medium text-gray-500">Boletim de Ocorrência</label>
                    <p className="mt-1 text-gray-900 font-mono">{caso.boletimOcorrencia}</p>
                  </div>
                )}

                {/* Mapa */}
                <div className="col-span-3 bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Mapa do Local</label>
                  <div className="mt-2 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-inner">
                    <span className="text-gray-400">Mapa será exibido aqui</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mensagens" className="p-6 overflow-y-auto">
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "police" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.sender === "police" ? "bg-blue-100 text-blue-900" : "bg-green-100 text-green-900"
                        } rounded-lg p-3`}
                      >
                        {message.sender === "police" && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-blue-700 text-white">
                              <Shield className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">{message.senderName}</span>
                            <span className="text-xs ml-2 opacity-70">
                              {new Date(message.timestamp).toLocaleString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {message.sender === "citizen" && (
                          <Avatar className="h-8 w-8 ml-2">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-green-700 text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comentarios" className="p-6 overflow-y-auto">
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start">
                      {comment.type === "anonymous" ? (
                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        </div>
                      ) : (
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="font-medium">
                              {comment.type === "anonymous" ? (
                                <span className="text-yellow-700">Denúncia Anônima</span>
                              ) : (
                                <span className="text-blue-700">{comment.author}</span>
                              )}
                            </span>
                            {comment.type === "anonymous" && (
                              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                                Anônimo
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.timestamp).toLocaleString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {userType === "police" && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-700">Adicionar Comentário Policial</span>
                    </div>
                    <p className="text-sm text-blue-600 mb-3">
                      Use este espaço para adicionar comentários oficiais sobre o caso. Estes comentários serão visíveis
                      para outros policiais.
                    </p>
                    <div className="flex gap-2">
                      <Textarea placeholder="Digite seu comentário oficial..." className="flex-1" />
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
            <div className="flex items-center gap-2">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Selecionar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="investigacao">Em investigação</SelectItem>
                  <SelectItem value="resolvido">Resolvido</SelectItem>
                  <SelectItem value="arquivado">Arquivado</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">
                Atualizar Status
              </Button>

              {/* Botão adicional para verificar itens similares - versão compacta */}
              {userType === "police" && (
                <Button
                  onClick={handleCheckSimilarItems}
                  variant="outline"
                  className="ml-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Verificar E-commerces
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={onClose} className="border-gray-300">
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

