"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/contexts/auth-context"
import styled from "styled-components"
import { User, Mail, Save, Bell, Shield, Lock, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Switch } from "../../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { toast } from "sonner"
import axios from "axios"

const GlobalStyle = styled.div`
  /* Estilos globais aqui */
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TabContent = styled.div<{ $active: boolean }>`
  display: ${(props) => (props.$active ? "block" : "none")};
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 10px;
`

const FormGrid = styled.div`
  display: grid;
  gap: 16px;
`

const FormRow = styled.div`
  display: flex;
  gap: 24px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const AvatarContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SwitchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`

const SwitchLabel = styled.div`
  display: flex;
  flex-direction: column;
`

const SwitchTitle = styled.span`
  font-weight: 500;
  margin-bottom: 4px;
`

const SwitchDescription = styled.span`
  font-size: 14px;
  color: #666;
`

const ErrorState = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`

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

const ConfiguracoesTab: React.FC = () => {
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
      const response = await axios.get("/api/user/preferences", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })

      // Atualizar estado com as preferências do usuário
      setPreferences(response.data)

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

      // Enviar para a API
      await axios.put("/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Perfil atualizado com sucesso!")
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err)
      setError(err.response?.data?.message || "Erro ao atualizar perfil. Por favor, tente novamente.")
      toast.error("Erro ao atualizar perfil. Por favor, tente novamente.")
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
        "/api/user/preferences",
        {
          section,
          preferences: preferences[section],
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        },
      )

      toast.success("Preferências atualizadas com sucesso!")
    } catch (err: any) {
      console.error("Erro ao atualizar preferências:", err)
      setError(err.response?.data?.message || "Erro ao atualizar preferências. Por favor, tente novamente.")
      toast.error("Erro ao atualizar preferências. Por favor, tente novamente.")
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
      toast.error("Erro ao fazer logout. Por favor, tente novamente.")
    }
  }

  // Renderizar estado de carregamento
  if (authLoading) {
    return <LoadingState>Carregando configurações...</LoadingState>
  }

  // Renderizar o conteúdo das configurações
  return (
    <>
      <GlobalStyle />
      <Container>
        {error && (
          <ErrorState>
            <Shield size={20} />
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchUserPreferences}>
              Tentar novamente
            </Button>
          </ErrorState>
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
            <FormGrid style={{ gap: "24px" }}>
              <TwoColumnGrid>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User size={18} />
                      Foto de Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <AvatarContainer>
                      <AvatarImage src={profileImagePreview || "https://github.com/shadcn.png"} alt="Foto de perfil" />
                    </AvatarContainer>
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
                    <FormGrid>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user?.email || ""} disabled />
                        <p className="text-xs text-gray-500">Para alterar seu email, entre em contato com o suporte.</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="flex gap-2">
                          <Input id="password" type="password" value="••••••••" disabled />
                          <Button variant="outline">Alterar</Button>
                        </div>
                      </div>
                    </FormGrid>
                  </CardContent>
                </Card>
              </TwoColumnGrid>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail size={18} />
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>Atualize suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormGrid>
                    <FormRow>
                      <FormGroup>
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </FormRow>
                    <TwoColumnGrid>
                      <FormGroup>
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
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </FormGroup>
                    </TwoColumnGrid>
                    <FormGroup>
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        placeholder="Rua, número, bairro, cidade, estado, CEP"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormGroup>
                  </FormGrid>
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
            </FormGrid>
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
                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Notificações por Email</SwitchTitle>
                      <SwitchDescription>Receba atualizações sobre seus casos por email</SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </SwitchItem>

                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Notificações Push</SwitchTitle>
                      <SwitchDescription>Receba notificações no navegador</SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </SwitchItem>

                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Notificações por SMS</SwitchTitle>
                      <SwitchDescription>Receba alertas importantes por SMS</SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </SwitchItem>
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
                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Mostrar Perfil</SwitchTitle>
                      <SwitchDescription>Permitir que outros usuários vejam seu perfil</SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.privacy.showProfile}
                      onCheckedChange={(checked) => handlePrivacyChange("showProfile", checked)}
                    />
                  </SwitchItem>

                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Compartilhar Localização</SwitchTitle>
                      <SwitchDescription>
                        Permitir que o sistema use sua localização para melhorar os serviços
                      </SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.privacy.shareLocation}
                      onCheckedChange={(checked) => handlePrivacyChange("shareLocation", checked)}
                    />
                  </SwitchItem>

                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Coleta de Dados</SwitchTitle>
                      <SwitchDescription>
                        Permitir a coleta de dados para melhorar a experiência do usuário
                      </SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.privacy.allowDataCollection}
                      onCheckedChange={(checked) => handlePrivacyChange("allowDataCollection", checked)}
                    />
                  </SwitchItem>
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
                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Autenticação de Dois Fatores</SwitchTitle>
                      <SwitchDescription>Adicione uma camada extra de segurança à sua conta</SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.security.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                    />
                  </SwitchItem>

                  <SwitchItem>
                    <SwitchLabel>
                      <SwitchTitle>Notificações de Login</SwitchTitle>
                      <SwitchDescription>Receba notificações quando sua conta for acessada</SwitchDescription>
                    </SwitchLabel>
                    <Switch
                      checked={preferences.security.loginNotifications}
                      onCheckedChange={(checked) => handleSecurityChange("loginNotifications", checked)}
                    />
                  </SwitchItem>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tempo Limite da Sessão (minutos)</Label>
                    <select
                      id="sessionTimeout"
                      value={preferences.security.sessionTimeout}
                      onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="15">15 minutos</option>
                      <option value="30">30 minutos</option>
                      <option value="60">1 hora</option>
                      <option value="120">2 horas</option>
                      <option value="240">4 horas</option>
                    </select>
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
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <LogOut size={18} />
                  Sair da Conta
                </CardTitle>
                <CardDescription>Encerre sua sessão atual</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
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
      </Container>
    </>
  )
}

export default ConfiguracoesTab

