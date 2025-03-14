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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
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
import { useToast } from "@/app/components/ui/use-toast"

interface PerfilData {
  nomeCompleto: string
  nomeTratamento: string
  email: string
  telefone: string
}

interface NotificacoesData {
  site: boolean
  email: boolean
  sms: boolean
}

const ConfiguracoesTab: React.FC = () => {
  // Dados do perfil
  const [perfil, setPerfil] = useState<PerfilData>({
    nomeCompleto: "Carlos Eduardo Silva",
    nomeTratamento: "Oficial Silva",
    email: "oficial.silva@policia.gov.br",
    telefone: "(11) 98765-4321",
  })

  // Dados de notificações
  const [notificacoes, setNotificacoes] = useState<NotificacoesData>({
    site: true,
    email: true,
    sms: false,
  })

  // Estados para senhas
  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  // Estados para modais
  const [isPerfilModalOpen, setIsPerfilModalOpen] = useState(false)
  const [isNotificacoesModalOpen, setIsNotificacoesModalOpen] = useState(false)
  const [isSenhaModalOpen, setIsSenhaModalOpen] = useState(false)

  // Estados para confirmação
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{
    type: "perfil" | "notificacoes" | "senha"
    data: any
  } | null>(null)

  // Estado para diálogo de sucesso
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Dados temporários para edição
  const [tempPerfil, setTempPerfil] = useState<PerfilData>({ ...perfil })
  const [tempNotificacoes, setTempNotificacoes] = useState<NotificacoesData>({ ...notificacoes })

  const { toast } = useToast()

  // Funções para abrir modais
  const openPerfilModal = () => {
    setTempPerfil({ ...perfil })
    setIsPerfilModalOpen(true)
  }

  const openNotificacoesModal = () => {
    setTempNotificacoes({ ...notificacoes })
    setIsNotificacoesModalOpen(true)
  }

  const openSenhaModal = () => {
    setSenhaAtual("")
    setNovaSenha("")
    setConfirmarSenha("")
    setIsSenhaModalOpen(true)
  }

  // Funções para salvar alterações
  const handleSavePerfil = () => {
    setConfirmAction({
      type: "perfil",
      data: tempPerfil,
    })
    setIsPerfilModalOpen(false)
    setIsConfirmDialogOpen(true)
  }

  const handleSaveNotificacoes = () => {
    setConfirmAction({
      type: "notificacoes",
      data: tempNotificacoes,
    })
    setIsNotificacoesModalOpen(false)
    setIsConfirmDialogOpen(true)
  }

  const handleSaveSenha = () => {
    if (novaSenha !== confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      return
    }

    setConfirmAction({
      type: "senha",
      data: { senhaAtual, novaSenha },
    })
    setIsSenhaModalOpen(false)
    setIsConfirmDialogOpen(true)
  }

  // Função para confirmar alterações
  const confirmChanges = () => {
    if (!confirmAction) return

    switch (confirmAction.type) {
      case "perfil":
        setPerfil(confirmAction.data)
        setSuccessMessage("Informações do perfil atualizadas com sucesso!")
        break
      case "notificacoes":
        setNotificacoes(confirmAction.data)
        setSuccessMessage("Preferências de notificação atualizadas com sucesso!")
        break
      case "senha":
        // Aqui seria implementada a lógica para alterar a senha
        setSuccessMessage("Senha alterada com sucesso!")
        break
    }

    setIsConfirmDialogOpen(false)
    setIsSuccessDialogOpen(true)

    // Não precisamos mais do setTimeout aqui, pois o SuccessDialog
    // já tem seu próprio timer de 5 segundos para fechar automaticamente
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <Tabs defaultValue="perfil">
        <TabsList>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Visualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Nome Completo</Label>
                  <span className="text-gray-700">{perfil.nomeCompleto}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Como deseja ser chamado</Label>
                  <span className="text-gray-700">{perfil.nomeTratamento}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>E-mail</Label>
                  <span className="text-gray-700">{perfil.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Telefone</Label>
                  <span className="text-gray-700">{perfil.telefone}</span>
                </div>
              </div>
              <Button onClick={openPerfilModal}>Editar Informações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Gerencie como você recebe notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Notificações no Site</Label>
                  <span className={`text-sm font-medium ${notificacoes.site ? "text-green-600" : "text-gray-500"}`}>
                    {notificacoes.site ? "Ativado" : "Desativado"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Notificações por E-mail</Label>
                  <span className={`text-sm font-medium ${notificacoes.email ? "text-green-600" : "text-gray-500"}`}>
                    {notificacoes.email ? "Ativado" : "Desativado"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Notificações por SMS</Label>
                  <span className={`text-sm font-medium ${notificacoes.sms ? "text-green-600" : "text-gray-500"}`}>
                    {notificacoes.sms ? "Ativado" : "Desativado"}
                  </span>
                </div>
              </div>
              <Button onClick={openNotificacoesModal}>Editar Preferências</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>Gerencie a segurança da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Senha</Label>
                <p className="text-sm text-gray-500">
                  Sua senha foi alterada pela última vez há 30 dias. Recomendamos alterar sua senha regularmente.
                </p>
              </div>
              <Button onClick={openSenhaModal}>Alterar Senha</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Edição de Perfil */}
      <Dialog open={isPerfilModalOpen} onOpenChange={setIsPerfilModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Informações do Perfil</DialogTitle>
            <DialogDescription>Atualize suas informações pessoais abaixo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nomeCompleto">Nome Completo</Label>
              <Input
                id="nomeCompleto"
                value={tempPerfil.nomeCompleto}
                onChange={(e) => setTempPerfil({ ...tempPerfil, nomeCompleto: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeTratamento">Como deseja ser chamado</Label>
              <Input
                id="nomeTratamento"
                value={tempPerfil.nomeTratamento}
                onChange={(e) => setTempPerfil({ ...tempPerfil, nomeTratamento: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={tempPerfil.email}
                onChange={(e) => setTempPerfil({ ...tempPerfil, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={tempPerfil.telefone}
                onChange={(e) => setTempPerfil({ ...tempPerfil, telefone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPerfilModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSavePerfil}>Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Notificações */}
      <Dialog open={isNotificacoesModalOpen} onOpenChange={setIsNotificacoesModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Preferências de Notificação</DialogTitle>
            <DialogDescription>Escolha como deseja receber notificações.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="site-notif">Notificações no Site</Label>
              <Switch
                id="site-notif"
                checked={tempNotificacoes.site}
                onCheckedChange={(checked) => setTempNotificacoes({ ...tempNotificacoes, site: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Notificações por E-mail</Label>
              <Switch
                id="email-notif"
                checked={tempNotificacoes.email}
                onCheckedChange={(checked) => setTempNotificacoes({ ...tempNotificacoes, email: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notif">Notificações por SMS</Label>
              <Switch
                id="sms-notif"
                checked={tempNotificacoes.sms}
                onCheckedChange={(checked) => setTempNotificacoes({ ...tempNotificacoes, sms: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotificacoesModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNotificacoes}>Salvar preferências</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Alteração de Senha */}
      <Dialog open={isSenhaModalOpen} onOpenChange={setIsSenhaModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>Preencha os campos abaixo para alterar sua senha.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input
                id="current-password"
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSenhaModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveSenha}>Alterar senha</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmação */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar alterações</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.type === "perfil" && "Tem certeza que deseja salvar as alterações no seu perfil?"}
              {confirmAction?.type === "notificacoes" &&
                "Tem certeza que deseja alterar suas preferências de notificação?"}
              {confirmAction?.type === "senha" && "Tem certeza que deseja alterar sua senha?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmChanges}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de Sucesso - Usando nosso componente aprimorado */}
      <SuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        message={successMessage}
      />
    </div>
  )
}

export default ConfiguracoesTab

