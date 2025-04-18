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
  Save,
  BellRing,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Search,
} from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Switch } from "@/app/components/ui/switch"
import { Alert, AlertTitle, AlertDescription } from "@/app/components/ui/alert"
import { List, ListItem } from "@/app/components/ui/list"
import { LocationModal, ConfirmationModal } from "@/app/components/ui/modal"
import { useToast } from "@/app/components/ui/use-toast"
import { Toaster } from "@/app/components/ui/toaster"
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

// Custom Switch component that handles the ismaster prop correctly
const MasterSwitch = ({
  checked,
  onChange,
  label,
  description,
  ismaster,
  badge,
  disabled,
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
  ismaster?: boolean
  badge?: { text: string; variant: string }
  disabled?: boolean
}) => {
  return (
    <div className={`flex items-center justify-between ${ismaster ? "mb-4 pb-4 border-b" : "mb-2"}`}>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium">{label}</span>
          {badge && (
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full bg-${badge.variant}-100 text-${badge.variant}-800`}>
              {badge.text}
            </span>
          )}
        </div>
        {description && <span className="text-sm text-gray-500">{description}</span>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
    </div>
  )
}

// Modifique a definição do componente ConfiguracoesTab para aceitar o authFetch prop
const ConfiguracoesTab: React.FC<{
  authFetch: (url: string, options?: RequestInit) => Promise<Response>
  token: string
}> = ({ authFetch, token }) => {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const { toast } = useToast()
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [pendingLocationState, setPendingLocationState] = useState(false)
  const [anonymousName, setAnonymousName] = useState("")
  const [loadingCep, setLoadingCep] = useState(false)

  // Adicione estados para os campos do formulário
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    occupation: "",
    birthDate: "",
  })

  // Estado para os dados de endereço
  const [addressData, setAddressData] = useState({
    zipCode: "",
    stateCode: "",
    city: "",
    neighborhood: "",
    street: "",
    complement: "",
    complementNumber: "",
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

      // Normalizar o valor da ocupação para corresponder aos valores do Select
      let normalizedOccupation = data.occupation?.toLowerCase() || ""

      // Verificar se a ocupação corresponde a uma das opções disponíveis
      const validOccupations = ["estudante", "profissional", "autonomo", "aposentado", "outro"]
      if (!validOccupations.includes(normalizedOccupation)) {
        // Se a primeira letra for maiúscula, converter para minúscula
        if (data.occupation && data.occupation.charAt(0) === data.occupation.charAt(0).toUpperCase()) {
          normalizedOccupation = data.occupation.toLowerCase()
        }

        // Se ainda não corresponder, definir como "outro"
        if (!validOccupations.includes(normalizedOccupation)) {
          console.log(`Ocupação não reconhecida: ${data.occupation}, usando "outro" como padrão`)
          normalizedOccupation = "outro"
        }
      }

      // Preencher os campos do formulário com os dados recebidos
      setUserData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender?.toLowerCase() || "",
        occupation: normalizedOccupation,
        birthDate: data.birthDate || "",
      })

      // Preencher os dados de endereço se disponíveis
      if (data.address) {
        setAddressData({
          zipCode: data.address.zipCode || "",
          stateCode: data.address.stateCode || "",
          city: data.address.city || "",
          neighborhood: data.address.neighborhood || "",
          street: data.address.street || "",
          complement: data.address.complement || "",
          complementNumber: data.address.complementNumber || "",
        })
      }

      // Obter o nome anônimo do backend
      if (data.anonymousName) {
        setAnonymousName(data.anonymousName)
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error)
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar seus dados. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Função para buscar dados do CEP usando a API ViaCEP
  const fetchAddressByCep = async (cep: string) => {
    if (!cep || cep.length !== 8) {
      return
    }

    try {
      setLoadingCep(true)
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

      if (!response.ok) {
        throw new Error(`Erro ao buscar CEP: ${response.status}`)
      }

      const data = await response.json()

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado.",
          variant: "destructive",
        })
        return
      }

      // Atualizar os campos de endereço com os dados retornados
      setAddressData((prev) => ({
        ...prev,
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        stateCode: data.uf || "",
        complement: data.complemento || "",
        // Formatar o CEP com hífen (12345-678)
        zipCode: data.cep ? data.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") : prev.zipCode,
      }))

      toast({
        title: "Endereço encontrado",
        description: "Os dados de endereço foram preenchidos automaticamente.",
      })
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
      toast({
        title: "Erro ao buscar CEP",
        description: "Não foi possível buscar os dados do CEP. Verifique se o CEP está correto.",
        variant: "destructive",
      })
    } finally {
      setLoadingCep(false)
    }
  }

  // Função para lidar com a mudança no campo de CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    // Remover caracteres não numéricos
    const cepValue = value.replace(/\D/g, "")

    // Formatar o CEP para exibição (opcional)
    const formattedCep = cepValue.length <= 5 ? cepValue : `${cepValue.slice(0, 5)}-${cepValue.slice(5, 8)}`

    setAddressData((prev) => ({
      ...prev,
      zipCode: formattedCep,
    }))
  }

  // Função para buscar o CEP quando o usuário clicar no botão
  const handleSearchCep = () => {
    // Remover o hífen para a busca
    const cepForSearch = addressData.zipCode.replace(/\D/g, "")

    if (cepForSearch.length === 8) {
      fetchAddressByCep(cepForSearch)
    } else {
      toast({
        title: "CEP inválido",
        description: "O CEP deve conter 8 dígitos numéricos.",
        variant: "destructive",
      })
    }
  }

  // Função para atualizar os campos do formulário quando o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Função para atualizar os campos de endereço quando o usuário digita
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setAddressData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Buscar dados do usuário ao carregar o componente
  useEffect(() => {
    fetchUserData()
  }, [])

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
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        occupation: userData.occupation,
        birthDate: userData.birthDate,
        address: {
          zipCode: addressData.zipCode,
          stateCode: addressData.stateCode,
          city: addressData.city,
          neighborhood: addressData.neighborhood,
          street: addressData.street,
          complement: addressData.complement,
          complementNumber: addressData.complementNumber,
        },
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

      // Mostrar toast de sucesso
      toast({
        title: "Alterações salvas com sucesso!",
        description: "Seus dados foram atualizados.",
      })
    } catch (error) {
      console.error("Erro ao salvar dados:", error)

      // Mostrar toast de erro
      toast({
        title: "Erro ao salvar dados",
        description: "Não foi possível salvar suas alterações. Tente novamente mais tarde.",
        variant: "destructive",
      })
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
      toast({
        title: "Upload concluído",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      })
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
                    <Button variant="destructive" style={{ width: "100%" }}>
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
                      <Label htmlFor="anonymousName">Seu Nome de Usuário Anônimo</Label>
                      <Input id="anonymousName" value={anonymousName} disabled />
                      <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                        Este é o nome que outros usuários verão. Ele é gerado automaticamente pelo sistema para proteger
                        sua identidade.
                      </p>
                    </FormGroup>
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
                    <FormGroup>
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        placeholder="João da Silva"
                        value={userData.fullName}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="email">
                          <Mail size={14} />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="joao.silva@example.com"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="phone">
                          <Phone size={14} />
                          Telefone
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
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input id="birthDate" type="date" value={userData.birthDate} onChange={handleInputChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="gender">Gênero</Label>
                        <Select
                          value={userData.gender}
                          onValueChange={(value) => setUserData((prev) => ({ ...prev, gender: value }))}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Selecione seu gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="prefiro-nao-informar">Prefiro não informar</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormGroup>
                    </TwoColumnGrid>

                    <FormGroup>
                      <Label htmlFor="occupation">Ocupação</Label>
                      <Select
                        value={userData.occupation}
                        onValueChange={(value) => setUserData((prev) => ({ ...prev, occupation: value }))}
                      >
                        <SelectTrigger id="occupation">
                          <SelectValue placeholder="Selecione sua ocupação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="estudante">Estudante</SelectItem>
                          <SelectItem value="profissional">Profissional</SelectItem>
                          <SelectItem value="autonomo">Autônomo</SelectItem>
                          <SelectItem value="aposentado">Aposentado</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      {userData.occupation &&
                        !["estudante", "profissional", "autonomo", "aposentado", "outro"].includes(
                          userData.occupation,
                        ) && (
                          <p className="text-sm text-amber-600 mt-1">
                            Ocupação original: {userData.occupation} (será salva como "{userData.occupation}")
                          </p>
                        )}
                    </FormGroup>
                  </FormGrid>
                </CardContent>
              </Card>

              {/* Nova seção de Endereço */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <MapPin size={18} />
                    Endereço
                  </CardTitle>
                  <CardDescription>Atualize suas informações de endereço</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormGrid>
                    <FormRow>
                      <FormGroup style={{ width: "40%" }}>
                        <Label htmlFor="zipCode">CEP</Label>
                        <div className="flex gap-2">
                          <Input
                            id="zipCode"
                            placeholder="12345-678"
                            value={addressData.zipCode}
                            onChange={handleCepChange}
                            maxLength={9}
                          />
                          <Button
                            onClick={handleSearchCep}
                            disabled={loadingCep || addressData.zipCode.replace(/\D/g, "").length !== 8}
                            type="button"
                          >
                            {loadingCep ? (
                              <span>Buscando...</span>
                            ) : (
                              <>
                                <Search size={16} className="mr-2" />
                                <span>Buscar</span>
                              </>
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Formato: 12345-678</p>
                      </FormGroup>
                    </FormRow>

                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="street">Logradouro</Label>
                        <Input
                          id="street"
                          placeholder="Rua, Avenida, etc."
                          value={addressData.street}
                          onChange={handleAddressChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="complementNumber">Número</Label>
                        <Input
                          id="complementNumber"
                          placeholder="123"
                          value={addressData.complementNumber}
                          onChange={handleAddressChange}
                        />
                      </FormGroup>
                    </TwoColumnGrid>

                    <FormGroup>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        placeholder="Apto, Bloco, etc."
                        value={addressData.complement}
                        onChange={handleAddressChange}
                      />
                    </FormGroup>

                    <TwoColumnGrid>
                      <FormGroup>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          placeholder="Seu bairro"
                          value={addressData.neighborhood}
                          onChange={handleAddressChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          placeholder="Sua cidade"
                          value={addressData.city}
                          onChange={handleAddressChange}
                        />
                      </FormGroup>
                    </TwoColumnGrid>

                    <FormGroup>
                      <Label htmlFor="stateCode">Estado</Label>
                      <Input
                        id="stateCode"
                        placeholder="UF"
                        value={addressData.stateCode}
                        onChange={handleAddressChange}
                        maxLength={2}
                      />
                    </FormGroup>
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
                    <MasterSwitch
                      checked={notificationSwitches.emailNotifications}
                      onChange={() => toggleSwitch("emailNotifications")}
                      label="Ativar notificações por email"
                      description="Controla todas as notificações por email"
                      ismaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <MasterSwitch
                        checked={notificationSwitches.casesEmail}
                        onChange={() => toggleSwitch("casesEmail")}
                        label="Atualizações de casos"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.interactionsEmail}
                        onChange={() => toggleSwitch("interactionsEmail")}
                        label="Interações"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.systemEmail}
                        onChange={() => toggleSwitch("systemEmail")}
                        label="Sistema"
                        disabled={!notificationSwitches.emailNotifications}
                      />

                      <MasterSwitch
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
                    <MasterSwitch
                      checked={notificationSwitches.pushNotifications}
                      onChange={() => toggleSwitch("pushNotifications")}
                      label="Ativar notificações push"
                      description="Controla todas as notificações push"
                      ismaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <MasterSwitch
                        checked={notificationSwitches.nearbyCases}
                        onChange={() => toggleSwitch("nearbyCases")}
                        label="Casos próximos"
                        badge={{ text: "Popular", variant: "warning" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.myCases}
                        onChange={() => toggleSwitch("myCases")}
                        label="Meus casos"
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.riskAreas}
                        onChange={() => toggleSwitch("riskAreas")}
                        label="Áreas de risco"
                        badge={{ text: "Importante", variant: "danger" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.emergencyAlerts}
                        onChange={() => toggleSwitch("emergencyAlerts")}
                        label="Alertas de emergência"
                        badge={{ text: "Crítico", variant: "danger" }}
                        disabled={!notificationSwitches.pushNotifications}
                      />

                      <MasterSwitch
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
                    <MasterSwitch
                      checked={notificationSwitches.smsNotifications}
                      onChange={() => toggleSwitch("smsNotifications")}
                      label="Ativar notificações por SMS"
                      description="Controla todas as notificações por SMS"
                      ismaster={true}
                    />

                    {/* Replace the grid layout here */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      <MasterSwitch
                        checked={notificationSwitches.casesSms}
                        onChange={() => toggleSwitch("casesSms")}
                        label="Atualizações de casos"
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.emergencySms}
                        onChange={() => toggleSwitch("emergencySms")}
                        label="Alertas de emergência"
                        badge={{ text: "Crítico", variant: "danger" }}
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.riskAreasSms}
                        onChange={() => toggleSwitch("riskAreasSms")}
                        label="Áreas de risco"
                        badge={{ text: "Importante", variant: "danger" }}
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.systemSms}
                        onChange={() => toggleSwitch("systemSms")}
                        label="Sistema"
                        disabled={!notificationSwitches.smsNotifications}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.communitySms}
                        onChange={() => toggleSwitch("communitySms")}
                        label="Atualizações da comunidade"
                        disabled={!notificationSwitches.smsNotifications}
                      />
                    </div>
                  </NotificationCategory>
                </ThreeColumnGrid>

                <Alert className="mt-6">
                  <AlertCircle size={16} />
                  <AlertTitle>Dica de notificações</AlertTitle>
                  <AlertDescription>
                    Recomendamos manter os alertas de emergência e áreas de risco sempre ativos para sua segurança. Você
                    pode personalizar todas as outras notificações conforme sua preferência.
                  </AlertDescription>
                </Alert>
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

                    <Alert variant="success">
                      <CheckCircle2 size={14} />
                      <AlertTitle>Dicas para uma senha forte:</AlertTitle>
                      <List>
                        <ListItem>Use pelo menos 8 caracteres</ListItem>
                        <ListItem>Combine letras maiúsculas e minúsculas</ListItem>
                        <ListItem>Inclua números e símbolos</ListItem>
                        <ListItem>Evite informações pessoais óbvias</ListItem>
                      </List>
                    </Alert>
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
                  <Alert variant="warning">
                    <AlertTriangle size={16} />
                    <AlertTitle>Autenticação em Duas Etapas (2FA)</AlertTitle>
                    <AlertDescription>
                      Adicione uma camada extra de segurança exigindo um código além da senha ao fazer login.
                    </AlertDescription>
                    <div className="mt-3">
                      <MasterSwitch
                        checked={notificationSwitches.twoFactorAuth}
                        onChange={() => toggleSwitch("twoFactorAuth")}
                        label="Ativar 2FA"
                        description="Recomendado para maior segurança"
                        badge={{ text: "Recomendado", variant: "warning" }}
                      />
                    </div>
                  </Alert>

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
                      <Button variant="destructive" size="sm">
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
                      <Button variant="destructive" size="sm">
                        Desconectar
                      </Button>
                    </DeviceItem>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive">Desconectar todos</Button>
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
                      <MasterSwitch
                        checked={notificationSwitches.shareLocation}
                        onChange={() => toggleSwitch("shareLocation")}
                        label="Compartilhar Localização"
                        description="Permitir que o aplicativo acesse sua localização"
                        badge={{ text: "Importante", variant: "warning" }}
                      />

                      <MasterSwitch
                        checked={notificationSwitches.anonymousData}
                        onChange={() => toggleSwitch("anonymousData")}
                        label="Dados para Melhorias"
                        description="Compartilhar dados anônimos para melhorar o serviço"
                      />

                      <MasterSwitch
                        checked={notificationSwitches.showOnlineStatus}
                        onChange={() => toggleSwitch("showOnlineStatus")}
                        label="Mostrar Status Online"
                        description="Permitir que outros usuários vejam quando você está online"
                      />
                    </div>

                    <Alert variant="success">
                      <CheckCircle2 size={14} />
                      <AlertTitle>Seus dados estão seguros</AlertTitle>
                      <AlertDescription>
                        Respeitamos sua privacidade e nunca compartilhamos seus dados pessoais com terceiros sem sua
                        permissão explícita.
                      </AlertDescription>
                    </Alert>
                  </TwoColumnGrid>

                  <Alert>
                    <FileText size={14} />
                    <AlertTitle>Política de Privacidade</AlertTitle>
                    <AlertDescription>
                      Nossa política de privacidade foi atualizada recentemente. Recomendamos que você revise as
                      mudanças.
                    </AlertDescription>
                    <Button variant="outline" className="mt-3">
                      Ver política de privacidade
                    </Button>
                  </Alert>
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

      <Toaster />
    </>
  )
}

export default ConfiguracoesTab

