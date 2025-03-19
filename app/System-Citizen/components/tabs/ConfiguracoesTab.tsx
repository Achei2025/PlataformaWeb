"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Mail, Save, Bell, Shield, Lock, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { useToast } from "@/app/components/ui/use-toast"
import { useAuth } from "@/app/contexts/auth-context"
import axios from "axios"

interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    showProfile: boolean
    shareLocation: boolean
    allowDataCollection: boolean
  }
  security: {
    twoFactorAuth: boolean
    loginNotifications: boolean
    sessionTimeout: string
  }
}

export default function ConfiguracoesTab() {
  const { user, isLoading: authLoading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [preferences, setPreferences] = useState<UserPreferences>({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      showProfile: true,
      shareLocation: false,
      allowDataCollection: true,
    },
    security: {
      twoFactorAuth: false,
      loginNotifications: true,
      sessionTimeout: "30",
    },
  })
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  // Função para obter o token de autenticação
  const getAuthToken = () => {
    return localStorage.getItem("auth-token") || ""
  }

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      // Preencher campos com dados do usuário
      setUsername(user.name)

      const nameParts = user.name.split(" ")
      setFirstName(nameParts[0] || "")
      setLastName(nameParts.slice(1).join(" ") || "")

      // Carregar preferências do usuário
      fetchUserPreferences()
    }
  }, [user])

  // Função para carregar preferências do usuário
  const fetchUserPreferences = async () => {
    setLoading(true)
    setError(null)

    try {
      // Usando o endpoint fornecido para obter dados do usuário
      const response = await axios.get("http://26.190.233.3:8080/api/citizens/me", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })

      // Atualizar estado com as preferências do usuário
      if (response.data.preferences) {
        setPreferences(response.data.preferences)
      }

      // Carregar outros dados do perfil
      setPhone(response.data.phone || "")
      setAddress(response.data.address || "")

      // Carregar imagem de perfil
      if (response.data.profileImageUrl) {
        setProfileImagePreview(response.data.profileImageUrl)
      }
    } catch (err: any) {
      console.error("Erro ao carregar preferências:", err)
      setError(err.response?.data?.message || "Erro ao carregar preferências. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Função para salvar configurações
  const handleSaveProfile = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // Criar FormData para enviar arquivos
      const formData = new FormData()

      // Adicionar campos de texto
      formData.append("firstName", firstName)
      formData.append("lastName", lastName)
      formData.append("phone", phone)
      formData.append("address", address)

      // Adicionar imagem de perfil se existir
      if (profileImage) {
        formData.append("profileImage", profileImage)
      }

      // Enviar para a API usando o endpoint fornecido
      await axios.put("http://26.190.233.3:8080/api/citizens/id", formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      // Toast is already initialized at the top level
      const { toast } = useToast()
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
        variant: "default",
      })
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err)
      setError(err.response?.data?.message || "Erro ao atualizar perfil. Por favor, tente novamente.")
      toast({
        title: "Erro",
        description: "Erro ao atualizar perfil. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Função para salvar preferências
  const handleSavePreferences = async (section: keyof UserPreferences) => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // Enviar para a API
      await axios.put(
        "http://26.190.233.3:8080/api/citizens/id",
        {
          preferences: {
            [section]: preferences[section],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        },
      )

      toast({
        title: "Sucesso",
        description: "Preferências atualizadas com sucesso!",
        variant: "default",
      })
    } catch (err: any) {
      console.error("Erro ao atualizar preferências:", err)
      setError(err.response?.data?.message || "Erro ao atualizar preferências. Por favor, tente novamente.")
      toast({
        title: "Erro",
        description: "Erro ao atualizar preferências. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Função para lidar com o upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)

      // Criar preview da imagem
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Função para lidar com alterações nas preferências de notificação
  const handleNotificationChange = (key: keyof typeof preferences.notifications, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  // Função para lidar com alterações nas preferências de privacidade
  const handlePrivacyChange = (key: keyof typeof preferences.privacy, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  // Função para lidar com alterações nas preferências de segurança
  const handleSecurityChange = (key: keyof typeof preferences.security, value: boolean | string) => {
    setPreferences((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }))
  }

  // Função para lidar com o logout
  const handleLogout = async () => {
    try {
      await logout()
      // Redirecionamento é tratado no contexto de autenticação
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
      toast({
        title: "Erro",
        description: "Erro ao fazer logout. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Renderizar estado de carregamento
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-[200px] text-lg text-muted-foreground">
        Carregando configurações...
      </div>
    )
  }

  // Renderizar o conteúdo das configurações
  return (
    <div className="w-full max-w-[1200px] mx-auto p-5">
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-5 flex items-center gap-3">
          <Shield size={20} />
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchUserPreferences}>
            Tentar novamente
          </Button>
        </div>
      )}

      <Tabs defaultValue="profile" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        {/* Aba de Perfil */}
        <TabsContent value="profile">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User size={18} />
                    Foto de Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4">
                    <img
                      src={profileImagePreview || "/placeholder.svg?height=100&width=100"}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="profileImage">Alterar foto</Label>
                    <Input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock size={18} />
                    Segurança da Conta
                  </CardTitle>
                  <CardDescription>Gerencie suas credenciais de acesso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user?.email || ""} disabled />
                      <p className="text-xs text-muted-foreground">
                        Para alterar seu email, entre em contato com o suporte.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="flex gap-2">
                        <Input id="password" type="password" value="••••••••" disabled />
                        <Button variant="outline">Alterar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail size={18} />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-1">
                        <Mail size={14} />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={user?.email || ""}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, cidade, estado, CEP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  Cancelar
                </Button>
                <Button onClick={handleSaveProfile} disabled={loading} className="flex items-center gap-2">
                  {loading ? "Salvando..." : "Salvar alterações"}
                  {!loading && <Save size={16} />}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Aba de Notificações */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={18} />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Controle como você recebe notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notificações por Email</div>
                    <div className="text-sm text-muted-foreground">Receba atualizações sobre seus casos por email</div>
                  </div>
                  <Switch
                    checked={preferences.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notificações Push</div>
                    <div className="text-sm text-muted-foreground">Receba notificações no navegador</div>
                  </div>
                  <Switch
                    checked={preferences.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notificações por SMS</div>
                    <div className="text-sm text-muted-foreground">Receba alertas importantes por SMS</div>
                  </div>
                  <Switch
                    checked={preferences.notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSavePreferences("notifications")}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? "Salvando..." : "Salvar preferências"}
                {!loading && <Save size={16} />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Privacidade */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={18} />
                Configurações de Privacidade
              </CardTitle>
              <CardDescription>Controle quem pode ver suas informações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="font-medium">Mostrar Perfil</div>
                    <div className="text-sm text-muted-foreground">Permitir que outros usuários vejam seu perfil</div>
                  </div>
                  <Switch
                    checked={preferences.privacy.showProfile}
                    onCheckedChange={(checked) => handlePrivacyChange("showProfile", checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="font-medium">Compartilhar Localização</div>
                    <div className="text-sm text-muted-foreground">
                      Permitir que o sistema use sua localização para melhorar os serviços
                    </div>
                  </div>
                  <Switch
                    checked={preferences.privacy.shareLocation}
                    onCheckedChange={(checked) => handlePrivacyChange("shareLocation", checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="space-y-0.5">
                    <div className="font-medium">Coleta de Dados</div>
                    <div className="text-sm text-muted-foreground">
                      Permitir a coleta de dados para melhorar a experiência do usuário
                    </div>
                  </div>
                  <Switch
                    checked={preferences.privacy.allowDataCollection}
                    onCheckedChange={(checked) => handlePrivacyChange("allowDataCollection", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSavePreferences("privacy")}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? "Salvando..." : "Salvar preferências"}
                {!loading && <Save size={16} />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Segurança */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={18} />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Proteja sua conta com medidas de segurança adicionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="font-medium">Autenticação de Dois Fatores</div>
                    <div className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança à sua conta
                    </div>
                  </div>
                  <Switch
                    checked={preferences.security.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notificações de Login</div>
                    <div className="text-sm text-muted-foreground">
                      Receba notificações quando sua conta for acessada
                    </div>
                  </div>
                  <Switch
                    checked={preferences.security.loginNotifications}
                    onCheckedChange={(checked) => handleSecurityChange("loginNotifications", checked)}
                  />
                </div>

                <div className="space-y-2 py-3">
                  <Label htmlFor="sessionTimeout">Tempo Limite da Sessão (minutos)</Label>
                  <Select
                    value={preferences.security.sessionTimeout}
                    onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tempo limite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                      <SelectItem value="240">4 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSavePreferences("security")}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? "Salvando..." : "Salvar preferências"}
                {!loading && <Save size={16} />}
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <LogOut size={18} />
                Sair da Conta
              </CardTitle>
              <CardDescription>Encerre sua sessão atual</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ao sair, você será redirecionado para a página de login. Você precisará inserir suas credenciais
                novamente para acessar sua conta.
              </p>
              <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut size={16} />
                Sair da Conta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

