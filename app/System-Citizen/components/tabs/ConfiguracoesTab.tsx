"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import {
  Bell,
  Shield,
  Lock,
  User,
  Mail,
  Phone,
  Globe,
  Camera,
  Trash2,
  Info,
  Save,
  BellRing,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Select } from "@/app/components/ui/select"
import { Switch } from "@/app/components/ui/switch"
import { AlertBox, AlertTitle, AlertText } from "@/app/components/ui/alert"
import { List, ListItem } from "@/app/components/ui/list"
import { LocationModal, ConfirmationModal } from "@/app/components/ui/modal"
import { Toast } from "@/app/components/ui/toast"
import { Badge } from "@/app/components/ui/badge"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
  }
`

const Container = styled.div`
  padding: 20px;
`

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`

const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.$active ? "#007bff" : "#555")};
  border-bottom: ${(props) => (props.$active ? "2px solid #007bff" : "none")};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #007bff;
  }
`

const TabContent = styled.div<{ $active: boolean }>`
  display: ${(props) => (props.$active ? "block" : "none")};
  padding: 20px;
`

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormRow = styled.div`
  display: flex;
  gap: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const NotificationCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CategoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`

const CategoryTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const CategoryDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`

const SectionHeading = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const DeviceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
`

const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const DeviceIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`

const DeviceDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const DeviceName = styled.div`
  font-weight: 600;
`

const DeviceLastSeen = styled.div`
  font-size: 12px;
  color: #666;
`

// Modifique a definição do componente ConfiguracoesTab para aceitar o authFetch prop
const ConfiguracoesTab: React.FC<{ authFetch: (url: string, options?: RequestInit) => Promise<Response>; token: string }> = ({
  authFetch,
  token,
}) => {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [pendingLocationState, setPendingLocationState] = useState(false)
  const [username, setUsername] = useState("Anônimo_" + Math.floor(Math.random() * 10000))
  const [useFixedAnonymous, setUseFixedAnonymous] = useState(false)

  // Adicione estados para os campos do formulário
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    alternativeContactType: "email",
    alternativeContact: "",
    gender: "",
    occupation: "",
    occupationDetails: "",
  })

  const [toastMessage, setToastMessage] = useState({
    title: "Alterações salvas com sucesso!",
    message: "Suas configurações foram atualizadas.",
  })

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await authFetch("http://26.190.233.3:8080/api/citizens/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`)
      }

      const data = await response.json()
      console.log("Dados do usuário recebidos:", data)

      // Preencher os campos do formulário com os dados recebidos
      setUserData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        secondaryPhone: data.secondaryPhone || "",
        alternativeContactType: data.alternativeContactType || "email",
        alternativeContact: data.alternativeContact || "",
        gender: data.gender || "",
        occupation: data.occupation || "",
        occupationDetails: data.occupationDetails || "",
      })

      // Se o usuário tiver um nome de usuário anônimo definido, use-o
      if (data.anonymousUsername) {
        setUsername(data.anonymousUsername)
        setUseFixedAnonymous(data.anonymousUsername === "Anônimo")
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error)
      setToastMessage({
        title: "Erro ao carregar dados",
        message: "Não foi possível carregar seus dados. Tente novamente mais tarde.",
      })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  // Função para atualizar os campos do formulário quando o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Buscar dados do usuário ao carregar o componente
  useEffect(() => {
    fetchUserData()
  }, [])

  // Função para gerar um novo nome de usuário
  const generateNewUsername = () => {
    if (useFixedAnonymous) {
      setUsername("Anônimo")
    } else {
      setUsername("Anônimo_" + Math.floor(Math.random() * 10000))
    }
  }

  // Efeito para atualizar o nome quando o tipo de anonimato muda
  useEffect(() => {
    generateNewUsername()
  }, [useFixedAnonymous])

  // Switches state - Notificações
  const [notificationSwitches, setNotificationSwitches] = useState({
    // Email
    emailNotifications: false,
    casesEmail: false,
    interactionsEmail: false,
    systemEmail: false,
    newsEmail: true,

    // Push
    pushNotifications: true,
    nearbyCases: true,
    myCases: false,
    riskAreas: false,
    emergencyAlerts: true,
    communityUpdates: false,

    // SMS
    smsNotifications: false,
    casesSms: false,
    emergencySms: true,
    riskAreasSms: false,
    systemSms: false,
    communitySms: false,

    // Segurança
    twoFactorAuth: false,

    // Privacidade
    showOnlineStatus: true,
    shareLocation: false, // Alterado para false por padrão
    anonymousData: true,
  })

  // Função para atualizar os switches filhos quando o master switch muda
  useEffect(() => {
    // Se o master switch de email estiver desligado, desliga todos os switches de email
    if (!notificationSwitches.emailNotifications) {
      setNotificationSwitches((prev) => ({
        ...prev,
        casesEmail: false,
        interactionsEmail: false,
        systemEmail: false,
        newsEmail: false,
        eventsEmail: false,
      }))
    }

    // Se o master switch de push estiver desligado, desliga todos os switches de push
    if (!notificationSwitches.pushNotifications) {
      setNotificationSwitches((prev) => ({
        ...prev,
        nearbyCases: false,
        myCases: false,
        riskAreas: false,
        emergencyAlerts: false,
        communityUpdates: false,
      }))
    }

    // Se o master switch de SMS estiver desligado, desliga todos os switches de SMS
    if (!notificationSwitches.smsNotifications) {
      setNotificationSwitches((prev) => ({
        ...prev,
        casesSms: false,
        emergencySms: false,
        riskAreasSms: false,
        systemSms: false,
        communitySms: false,
      }))
    }
  }, [
    notificationSwitches.emailNotifications,
    notificationSwitches.pushNotifications,
    notificationSwitches.smsNotifications,
  ])

  const toggleSwitch = (key: keyof typeof notificationSwitches) => {
    // Caso especial para o switch de localização
    if (key === "shareLocation") {
      // Armazena o estado que o usuário está tentando definir
      setPendingLocationState(!notificationSwitches.shareLocation)
      // Abre o modal
      setShowLocationModal(true)
      return
    }

    // Para outros switches, comportamento normal
    setNotificationSwitches((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleLocationConfirm = () => {
    // Atualiza o estado com o valor pendente
    setNotificationSwitches((prev) => ({
      ...prev,
      shareLocation: pendingLocationState,
    }))
    // Fecha o modal
    setShowLocationModal(false)
  }

  const handleLocationCancel = () => {
    // Fecha o modal sem alterar o estado
    setShowLocationModal(false)
  }

  const handleSave = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmSave = async () => {
    setShowConfirmationModal(false)
    setLoading(true)

    try {
      // Preparar os dados para enviar à API
      const dataToSend = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`.trim(), // Adicionar fullName combinando firstName e lastName
        email: userData.email,
        phone: userData.phone,
        secondaryPhone: userData.secondaryPhone,
        alternativeContactType: userData.alternativeContactType,
        alternativeContact: userData.alternativeContact,
        gender: userData.gender,
        occupation: userData.occupation,
        occupationDetails: userData.occupationDetails,
        anonymousUsername: username,
        // Adicione outros campos conforme necessário
      }

      // Enviar os dados para a API
      const response = await authFetch("http://26.190.233.3:8080/api/citizens/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error(`Erro ao atualizar dados: ${response.status}`)
      }

      // Atualizar mensagem de sucesso
      setToastMessage({
        title: "Alterações salvas com sucesso!",
        message: "Seus dados foram atualizados.",
      })

      // Mostrar toast de sucesso
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error("Erro ao salvar dados:", error)

      // Atualizar mensagem de erro
      setToastMessage({
        title: "Erro ao salvar dados",
        message: "Não foi possível salvar suas alterações. Tente novamente mais tarde.",
      })

      // Mostrar toast de erro
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  // Adicione esta função dentro do componente ConfiguracoesTab, antes do return
  const handleFileUpload = (file: File) => {
    // Aqui você implementaria a lógica para fazer o upload do arquivo para o servidor
    // Por exemplo, usando FormData e fetch

    // Exemplo de como seria o código:
    // const formData = new FormData();
    // formData.append('avatar', file);
    //
    // fetch('/api/upload-avatar', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Upload bem-sucedido:', data);
    //   // Atualizar a imagem do avatar
    // })
    // .catch(error => {
    //   console.error('Erro no upload:', error);
    // });

    // Por enquanto, apenas simularemos o upload
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1500)
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <TabsContainer>
          <TabsList>
            <TabButton $active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
              <User size={16} />
              <span>Perfil</span>
            </TabButton>
            <TabButton $active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")}>
              <Bell size={16} />
              <span>Notificações</span>
            </TabButton>
            <TabButton $active={activeTab === "security"} onClick={() => setActiveTab("security")}>
              <Shield size={16} />
              <span>Segurança</span>
            </TabButton>
            <TabButton $active={activeTab === "privacy"} onClick={() => setActiveTab("privacy")}>
              <Lock size={16} />
              <span>Privacidade</span>
            </TabButton>
          </TabsList>

          {/* Aba de Perfil */}
          <TabContent $active={activeTab === "profile"}>
            <FormGrid style={{ gap: "24px" }}>
              <TwoColumnGrid>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <User size={18} />
                      Foto de Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <AvatarContainer>
                      <AvatarImage src="https://github.com/shadcn.png" alt="Foto de perfil" />
                    </AvatarContainer>
                    <FormGroup style={{ width: "100%", marginBottom: "8px" }}>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            // Verificar o tamanho do arquivo (16MB = 16 * 1024 * 1024 bytes)
                            if (file.size > 16 * 1024 * 1024) {
                              alert("O arquivo é muito grande. O tamanho máximo permitido é 16MB.")
                              e.target.value = ""
                              return
                            }

                            // Verificar o tipo do arquivo
                            if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
                              alert("Apenas arquivos JPG e PNG são permitidos.")
                              e.target.value = ""
                              return
                            }

                            // Processar o upload
                            handleFileUpload(file)
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        style={{ width: "100%" }}
                        onClick={() => document.getElementById("avatar-upload")?.click()}
                      >
                        <Camera size={16} />
                        Alterar foto (PNG/JPG até 16MB)
                      </Button>
                    </FormGroup>
                    <Button variant="danger" style={{ width: "100%" }}>
                      <Trash2 size={16} />
                      Remover foto
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Globe size={18} />
                      Configurações de Anonimato
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup style={{ marginBottom: "16px" }}>
                      <Label htmlFor="username">Seu Nome de Usuário Anônimo</Label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled />
                      <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                        Este é o nome que outros usuários verão. Ele foi gerado automaticamente para proteger sua
                        identidade.
                      </p>
                    </FormGroup>

                    <Button
                      variant="outline"
                      style={{ marginBottom: "16px", width: "100%" }}
                      onClick={() => setUsername("Anônimo_" + Math.floor(Math.random() * 10000))}
                    >
                      Gerar Novo Nome Aleatório
                    </Button>

                    <Switch
                      checked={useFixedAnonymous}
                      onChange={() => setUseFixedAnonymous(!useFixedAnonymous)}
                      label="Usar nome fixo 'Anônimo'"
                      description="Sem números aleatórios"
                    />
                  </CardContent>
                </Card>
              </TwoColumnGrid>

              <Card>
                <CardHeader>
                  <CardTitle>
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
                          value={userData.firstName}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" placeholder="Doe" value={userData.lastName} onChange={handleInputChange} />
                      </FormGroup>
                    </FormRow>
                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="email">
                          <Mail size={14} />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="phone">
                          <Phone size={14} />
                          Telefone Principal
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          value={userData.phone}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </TwoColumnGrid>
                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="secondaryPhone">
                          <Phone size={14} />
                          Telefone Secundário
                        </Label>
                        <Input
                          id="secondaryPhone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          value={userData.secondaryPhone}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="alternativeContactType">Contato Alternativo</Label>
                        <Select
                          id="alternativeContactType"
                          value={userData.alternativeContactType}
                          onChange={handleInputChange}
                        >
                          <option value="email">Email</option>
                          <option value="phone">Telefone</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="telegram">Telegram</option>
                          <option value="outro">Outro</option>
                        </Select>
                      </FormGroup>
                    </TwoColumnGrid>
                    <FormGroup>
                      <Label htmlFor="alternativeContact">Informação de Contato Alternativo</Label>
                      <Input
                        id="alternativeContact"
                        placeholder="Informe seu contato alternativo"
                        value={userData.alternativeContact}
                        onChange={handleInputChange}
                      />
                      <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                        Este contato será usado apenas para recuperação de conta em caso de emergência.
                      </p>
                    </FormGroup>

                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="gender">Gênero</Label>
                        <Select id="gender" value={userData.gender} onChange={handleInputChange}>
                          <option value="" disabled>
                            Selecione seu gênero
                          </option>
                          <option value="masculino">Masculino</option>
                          <option value="feminino">Feminino</option>
                          <option value="nao-binario">Não-binário</option>
                          <option value="outro">Outro</option>
                          <option value="prefiro-nao-informar">Prefiro não informar</option>
                        </Select>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="occupation">Ocupação</Label>
                        <Select id="occupation" value={userData.occupation} onChange={handleInputChange}>
                          <option value="" disabled>
                            Selecione sua ocupação
                          </option>
                          <option value="estudante">Estudante</option>
                          <option value="profissional">Profissional</option>
                          <option value="autonomo">Autônomo</option>
                          <option value="aposentado">Aposentado</option>
                          <option value="outro">Outro</option>
                        </Select>
                      </FormGroup>
                    </TwoColumnGrid>

                    <FormGroup>
                      <Label htmlFor="occupationDetails">Detalhes da Ocupação</Label>
                      <Input
                        id="occupationDetails"
                        placeholder="Ex: Estudante de Medicina, Engenheiro de Software, etc."
                        value={userData.occupationDetails}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <AlertBox variant="info" style={{ marginTop: "16px" }}>
                      <AlertTitle variant="info">
                        <Info size={16} />
                        Contato Alternativo
                      </AlertTitle>
                      <AlertText variant="info">
                        Recomendamos adicionar um contato alternativo para casos de emergência ou caso seu telefone seja
                        perdido ou roubado. Este contato será usado apenas para recuperação de conta.
                      </AlertText>
                    </AlertBox>
                  </FormGrid>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={fetchUserData} disabled={loading}>
                    {loading ? "Carregando..." : "Cancelar"}
                  </Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar alterações"}
                    {!loading && <Save size={16} />}
                  </Button>
                </CardFooter>
              </Card>
            </FormGrid>
          </TabContent>

          {/* Aba de Notificações */}
          <TabContent $active={activeTab === "notifications"}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Bell size={18} />
                  Preferências de Notificação
                </CardTitle>
                <CardDescription>Configure como e quando você deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent>
                <ThreeColumnGrid>
                  {/* Coluna 1: Email */}
                  <NotificationCategory>
                    <CategoryHeader>
                      <CategoryTitle>
                        <Mail size={18} />
                        Notificações por Email
                      </CategoryTitle>
                    </CategoryHeader>
                    <CategoryDescription>
                      Configure quais notificações você deseja receber por email
                    </CategoryDescription>

                    {/* Master Switch */}
                    <Switch
                      checked={notificationSwitches.emailNotifications}
                      onChange={() => toggleSwitch("emailNotifications")}
                      label="Ativar notificações por email"
                      description="Controla todas as notificações por email"
                      isMaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <Switch
                        checked={notificationSwitches.casesEmail}
                        onChange={() => toggleSwitch("casesEmail")}
                        label="Atualizações de casos"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.interactionsEmail}
                        onChange={() => toggleSwitch("interactionsEmail")}
                        label="Interações"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.systemEmail}
                        onChange={() => toggleSwitch("systemEmail")}
                        label="Sistema"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.newsEmail}
                        onChange={() => toggleSwitch("newsEmail")}
                        label="Notícias"
                        badge={{ text: "Recomendado", variant: "primary" }}
                        disabled={!notificationSwitches.emailNotifications}
                      />
                    </div>
                  </NotificationCategory>

                  {/* Coluna 2: Push */}
                  <NotificationCategory>
                    <CategoryHeader>
                      <CategoryTitle>
                        <BellRing size={18} />
                        Notificações Push
                      </CategoryTitle>
                    </CategoryHeader>
                    <CategoryDescription>
                      Configure quais notificações você deseja receber em tempo real
                    </CategoryDescription>

                    {/* Master Switch */}
                    <Switch
                      checked={notificationSwitches.pushNotifications}
                      onChange={() => toggleSwitch("pushNotifications")}
                      label="Ativar notificações push"
                      description="Controla todas as notificações push"
                      isMaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <Switch
                        checked={notificationSwitches.nearbyCases}
                        onChange={() => toggleSwitch("nearbyCases")}
                        label="Casos próximos"
                        badge={{ text: "Popular", variant: "warning" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.myCases}
                        onChange={() => toggleSwitch("myCases")}
                        label="Meus casos"
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.riskAreas}
                        onChange={() => toggleSwitch("riskAreas")}
                        label="Áreas de risco"
                        badge={{ text: "Importante", variant: "danger" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.emergencyAlerts}
                        onChange={() => toggleSwitch("emergencyAlerts")}
                        label="Alertas de emergência"
                        badge={{ text: "Crítico", variant: "danger" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.communityUpdates}
                        onChange={() => toggleSwitch("communityUpdates")}
                        label="Atualizações da comunidade"
                        disabled={!notificationSwitches.pushNotifications}
                      />
                    </div>
                  </NotificationCategory>

                  {/* Coluna 3: SMS */}
                  <NotificationCategory>
                    <CategoryHeader>
                      <CategoryTitle>
                        <Phone size={18} />
                        Notificações por SMS
                      </CategoryTitle>
                    </CategoryHeader>
                    <CategoryDescription>Configure quais notificações você deseja receber por SMS</CategoryDescription>

                    {/* Master Switch */}
                    <Switch
                      checked={notificationSwitches.smsNotifications}
                      onChange={() => toggleSwitch("smsNotifications")}
                      label="Ativar notificações por SMS"
                      description="Controla todas as notificações por SMS"
                      isMaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <Switch
                        checked={notificationSwitches.casesSms}
                        onChange={() => toggleSwitch("casesSms")}
                        label="Atualizações de casos"
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.emergencySms}
                        onChange={() => toggleSwitch("emergencySms")}
                        label="Alertas de emergência"
                        badge={{ text: "Crítico", variant: "danger" }}
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.riskAreasSms}
                        onChange={() => toggleSwitch("riskAreasSms")}
                        label="Áreas de risco"
                        badge={{ text: "Importante", variant: "danger" }}
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.systemSms}
                        onChange={() => toggleSwitch("systemSms")}
                        label="Sistema"
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <Switch
                        checked={notificationSwitches.communitySms}
                        onChange={() => toggleSwitch("communitySms")}
                        label="Atualizações da comunidade"
                        disabled={!notificationSwitches.smsNotifications}
                      />
                    </div>
                  </NotificationCategory>
                </ThreeColumnGrid>

                <AlertBox variant="info" style={{ marginTop: "24px" }}>
                  <AlertTitle variant="info">
                    <AlertCircle size={16} />
                    Dica de notificações
                  </AlertTitle>
                  <AlertText variant="info">
                    Recomendamos manter os alertas de emergência e áreas de risco sempre ativos para sua segurança. Você
                    pode personalizar todas as outras notificações conforme sua preferência.
                  </AlertText>
                </AlertBox>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar preferências"}
                  {!loading && <Save size={16} />}
                </Button>
              </CardFooter>
            </Card>
          </TabContent>

          {/* Aba de Segurança */}
          <TabContent $active={activeTab === "security"}>
            <TwoColumnGrid>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Lock size={18} />
                    Alterar Senha
                  </CardTitle>
                  <CardDescription>Atualize sua senha regularmente para maior segurança</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </FormGroup>

                    <AlertBox variant="success">
                      <AlertTitle variant="success">
                        <CheckCircle2 size={14} />
                        Dicas para uma senha forte:
                      </AlertTitle>
                      <List>
                        <ListItem>Use pelo menos 8 caracteres</ListItem>
                        <ListItem>Combine letras maiúsculas e minúsculas</ListItem>
                        <ListItem>Inclua números e símbolos</ListItem>
                        <ListItem>Evite informações pessoais óbvias</ListItem>
                      </List>
                    </AlertBox>
                  </FormGrid>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Atualizando..." : "Atualizar Senha"}
                    {!loading && <Save size={16} />}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Shield size={18} />
                    Segurança Adicional
                  </CardTitle>
                  <CardDescription>Configure camadas extras de proteção para sua conta</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertBox variant="warning">
                    <AlertTitle variant="warning">
                      <AlertTriangle size={16} />
                      Autenticação em Duas Etapas (2FA)
                    </AlertTitle>
                    <AlertText variant="warning">
                      Adicione uma camada extra de segurança exigindo um código além da senha ao fazer login.
                    </AlertText>
                    <div style={{ marginTop: "12px" }}>
                      <Switch
                        checked={notificationSwitches.twoFactorAuth}
                        onChange={() => toggleSwitch("twoFactorAuth")}
                        label="Ativar 2FA"
                        description="Recomendado para maior segurança"
                        badge={{ text: "Recomendado", variant: "warning" }}
                      />
                    </div>
                  </AlertBox>

                  <div style={{ marginTop: "24px" }}>
                    <SectionHeading>Dispositivos Conectados</SectionHeading>
                    <DeviceItem>
                      <DeviceInfo>
                        <DeviceIcon>PC</DeviceIcon>
                        <DeviceDetails>
                          <DeviceName>Windows PC</DeviceName>
                          <DeviceLastSeen>Último acesso: Hoje, 10:45</DeviceLastSeen>
                        </DeviceDetails>
                      </DeviceInfo>
                      <Badge>Atual</Badge>
                    </DeviceItem>

                    <DeviceItem>
                      <DeviceInfo>
                        <DeviceIcon>MB</DeviceIcon>
                        <DeviceDetails>
                          <DeviceName>iPhone 13</DeviceName>
                          <DeviceLastSeen>Último acesso: Ontem, 18:30</DeviceLastSeen>
                        </DeviceDetails>
                      </DeviceInfo>
                      <Button variant="danger" style={{ padding: "4px 8px", fontSize: "12px" }}>
                        Desconectar
                      </Button>
                    </DeviceItem>

                    <DeviceItem>
                      <DeviceInfo>
                        <DeviceIcon>TB</DeviceIcon>
                        <DeviceDetails>
                          <DeviceName>iPad Pro</DeviceName>
                          <DeviceLastSeen>Último acesso: 15/06/2023</DeviceLastSeen>
                        </DeviceDetails>
                      </DeviceInfo>
                      <Button variant="danger" style={{ padding: "4px 8px", fontSize: "12px" }}>
                        Desconectar
                      </Button>
                    </DeviceItem>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="danger">Desconectar todos</Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar configurações"}
                    {!loading && <Save size={16} />}
                  </Button>
                </CardFooter>
              </Card>
            </TwoColumnGrid>
          </TabContent>

          {/* Aba de Privacidade */}
          <TabContent $active={activeTab === "privacy"}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Globe size={18} />
                  Configurações de Privacidade
                </CardTitle>
                <CardDescription>
                  Gerencie quem pode ver suas informações e como seus dados são utilizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormGrid style={{ gap: "24px" }}>
                  <SectionHeading>
                    <Globe size={16} />
                    Compartilhamento de Dados
                  </SectionHeading>

                  <TwoColumnGrid>
                    <div>
                      <Switch
                        checked={notificationSwitches.shareLocation}
                        onChange={() => toggleSwitch("shareLocation")}
                        label="Compartilhar Localização"
                        description="Permitir que o aplicativo acesse sua localização"
                        badge={{ text: "Importante", variant: "warning" }}
                      />

                      <Switch
                        checked={notificationSwitches.anonymousData}
                        onChange={() => toggleSwitch("anonymousData")}
                        label="Dados para Melhorias"
                        description="Compartilhar dados anônimos para melhorar o serviço"
                      />

                      <Switch
                        checked={notificationSwitches.showOnlineStatus}
                        onChange={() => toggleSwitch("showOnlineStatus")}
                        label="Mostrar Status Online"
                        description="Permitir que outros usuários vejam quando você está online"
                      />
                    </div>

                    <AlertBox variant="success">
                      <AlertTitle variant="success">
                        <CheckCircle2 size={14} />
                        Seus dados estão seguros
                      </AlertTitle>
                      <AlertText variant="success">
                        Respeitamos sua privacidade e nunca compartilhamos seus dados pessoais com terceiros sem sua
                        permissão explícita.
                      </AlertText>
                    </AlertBox>
                  </TwoColumnGrid>

                  <AlertBox variant="info">
                    <AlertTitle variant="info">
                      <FileText size={14} />
                      Política de Privacidade
                    </AlertTitle>
                    <AlertText variant="info">
                      Nossa política de privacidade foi atualizada recentemente. Recomendamos que você revise as
                      mudanças.
                    </AlertText>
                    <Button variant="outline" style={{ marginTop: "12px", padding: "6px 12px" }}>
                      Ver política de privacidade
                    </Button>
                  </AlertBox>
                </FormGrid>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar configurações de privacidade"}
                  {!loading && <Save size={16} />}
                </Button>
              </CardFooter>
            </Card>
          </TabContent>
        </TabsContainer>
      </Container>

      {/* Modal de Localização */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={handleLocationCancel}
        onConfirm={handleLocationConfirm}
        isEnabling={pendingLocationState}
      />

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmSave}
      />

      {showToast && (
        <Toast>
          <CheckCircle2 size={18} />
          <div>
            <strong>{toastMessage.title}</strong>
            <p style={{ margin: "0", fontSize: "12px" }}>{toastMessage.message}</p>
          </div>
        </Toast>
      )}
    </>
  )
}

export default ConfiguracoesTab

