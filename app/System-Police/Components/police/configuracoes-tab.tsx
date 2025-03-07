"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

const ConfiguracoesTab: React.FC = () => {
  const [nome, setNome] = useState("Oficial Silva")
  const [email, setEmail] = useState("oficial.silva@policia.gov.br")
  const [telefone, setTelefone] = useState("(11) 98765-4321")
  const [notificacoesEmail, setNotificacoesEmail] = useState(true)
  const [notificacoesSMS, setNotificacoesSMS] = useState(false)

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
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/police-avatar.png" alt="Oficial Silva" />
                  <AvatarFallback>OS</AvatarFallback>
                </Avatar>
                <Button>Alterar foto</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>
              <Button>Salvar alterações</Button>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notif">Notificações por E-mail</Label>
                <Switch id="email-notif" checked={notificacoesEmail} onCheckedChange={setNotificacoesEmail} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notif">Notificações por SMS</Label>
                <Switch id="sms-notif" checked={notificacoesSMS} onCheckedChange={setNotificacoesSMS} />
              </div>
              <Button>Salvar preferências</Button>
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
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Alterar senha</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ConfiguracoesTab

