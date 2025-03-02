"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Map from "@/app/components/ui/Map"
import MapSidebar from "@/app/System-Citizen/components/map-sidebar"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  latitude: number
  longitude: number
  categoria: string
  imagem: string
  descricao?: string
  status?: string
  boletimOcorrencia?: string
}

const MapaTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>([])
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null)
  const [showHeatmap, setShowHeatmap] = useState(false)

  // Simular carregamento de casos
  useEffect(() => {
    // Aqui você normalmente faria uma chamada API para obter os casos reais
    const mockCasos: Caso[] = [
      {
        id: "1",
        objeto: "Smartphone iPhone 13",
        dataRoubo: "2023-05-15",
        localizacao: "Av. Paulista, São Paulo, SP",
        latitude: -23.5505,
        longitude: -46.6333,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao:
          "Smartphone roubado próximo à estação de metrô. O assaltante estava em uma motocicleta e abordou a vítima enquanto ela utilizava o celular.",
        status: "Em investigação",
        boletimOcorrencia: "BO-2023/05-12345",
      },
      {
        id: "2",
        objeto: "Laptop Dell XPS",
        dataRoubo: "2023-05-16",
        localizacao: "Copacabana, Rio de Janeiro, RJ",
        latitude: -22.9068,
        longitude: -43.1729,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao:
          "Laptop roubado em um café na praia. A vítima deixou o equipamento na mesa enquanto foi ao banheiro.",
        status: "Pendente",
        boletimOcorrencia: "BO-2023/05-23456",
      },
      {
        id: "3",
        objeto: "Bicicleta Mountain Bike",
        dataRoubo: "2023-05-17",
        localizacao: "Praça da Liberdade, Belo Horizonte, MG",
        latitude: -19.9167,
        longitude: -43.9345,
        categoria: "Veículos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Bicicleta roubada enquanto estava estacionada. O cadeado foi cortado com um alicate.",
        status: "Recuperado",
        boletimOcorrencia: "BO-2023/05-34567",
      },
      {
        id: "4",
        objeto: "Relógio Apple Watch",
        dataRoubo: "2023-06-10",
        localizacao: "Shopping Iguatemi, Porto Alegre, RS",
        latitude: -30.0277,
        longitude: -51.2287,
        categoria: "Acessórios",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Relógio roubado durante assalto no estacionamento. Dois homens em uma moto abordaram a vítima.",
        status: "Em investigação",
        boletimOcorrencia: "BO-2023/06-45678",
      },
      {
        id: "5",
        objeto: "Câmera Canon EOS",
        dataRoubo: "2023-06-22",
        localizacao: "Marco Zero, Recife, PE",
        latitude: -8.0631,
        longitude: -34.8711,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Câmera roubada durante passeio turístico. O assaltante estava a pé e fugiu correndo após o roubo.",
        status: "Pendente",
        boletimOcorrencia: "BO-2023/06-56789",
      },
      {
        id: "6",
        objeto: "Carteira com documentos",
        dataRoubo: "2023-07-05",
        localizacao: "Mercado Central, Fortaleza, CE",
        latitude: -3.7319,
        longitude: -38.5267,
        categoria: "Documentos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Carteira furtada em meio à multidão. A vítima só percebeu o furto quando foi pagar as compras.",
        status: "Arquivado",
        boletimOcorrencia: "BO-2023/07-67890",
      },
      {
        id: "7",
        objeto: "Moto Honda CG 160",
        dataRoubo: "2023-07-18",
        localizacao: "Av. Afonso Pena, Campo Grande, MS",
        latitude: -20.4697,
        longitude: -54.6201,
        categoria: "Veículos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Moto roubada durante a noite. Estava estacionada em frente à residência da vítima.",
        status: "Recuperado",
        boletimOcorrencia: "BO-2023/07-78901",
      },
      {
        id: "8",
        objeto: "Tablet iPad Pro",
        dataRoubo: "2023-08-03",
        localizacao: "Parque Ibirapuera, São Paulo, SP",
        latitude: -23.5874,
        longitude: -46.6576,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Tablet roubado durante caminhada no parque. Dois assaltantes em bicicletas abordaram a vítima.",
        status: "Em investigação",
        boletimOcorrencia: "BO-2023/08-89012",
      },
      {
        id: "9",
        objeto: "Bolsa Louis Vuitton",
        dataRoubo: "2023-08-15",
        localizacao: "Shopping Leblon, Rio de Janeiro, RJ",
        latitude: -22.9847,
        longitude: -43.2221,
        categoria: "Acessórios",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao:
          "Bolsa de luxo roubada na saída do shopping. O assaltante estava em um carro e apontou uma arma para a vítima.",
        status: "Pendente",
        boletimOcorrencia: "BO-2023/08-90123",
      },
      {
        id: "10",
        objeto: "Notebook Lenovo ThinkPad",
        dataRoubo: "2023-09-01",
        localizacao: "Aeroporto de Confins, Belo Horizonte, MG",
        latitude: -19.6244,
        longitude: -43.9719,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Notebook roubado na área de embarque. A vítima deixou a mochila sozinha por alguns minutos.",
        status: "Arquivado",
        boletimOcorrencia: "BO-2023/09-01234",
      },
      {
        id: "11",
        objeto: "Carro Hyundai HB20",
        dataRoubo: "2023-09-12",
        localizacao: "Estacionamento Shopping Morumbi, São Paulo, SP",
        latitude: -23.6125,
        longitude: -46.6983,
        categoria: "Veículos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao:
          "Carro roubado no estacionamento do shopping. As câmeras de segurança registraram o momento do roubo.",
        status: "Em investigação",
        boletimOcorrencia: "BO-2023/09-12345",
      },
      {
        id: "12",
        objeto: "Fones de ouvido AirPods",
        dataRoubo: "2023-10-05",
        localizacao: "Estação Sé do Metrô, São Paulo, SP",
        latitude: -23.5503,
        longitude: -46.6339,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Fones furtados durante o trajeto de metrô. A vítima estava em um vagão lotado.",
        status: "Pendente",
        boletimOcorrencia: "BO-2023/10-23456",
      },
      {
        id: "13",
        objeto: "Passaporte e documentos",
        dataRoubo: "2023-10-20",
        localizacao: "Praia de Boa Viagem, Recife, PE",
        latitude: -8.1211,
        longitude: -34.8961,
        categoria: "Documentos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Documentos roubados durante passeio na praia. A bolsa da vítima foi levada enquanto ela nadava.",
        status: "Arquivado",
        boletimOcorrencia: "BO-2023/10-34567",
      },
      {
        id: "14",
        objeto: "Drone DJI Mavic",
        dataRoubo: "2023-11-08",
        localizacao: "Parque do Flamengo, Rio de Janeiro, RJ",
        latitude: -22.9375,
        longitude: -43.1731,
        categoria: "Eletrônicos",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao: "Drone roubado durante sessão de fotos. Três homens abordaram o fotógrafo e levaram o equipamento.",
        status: "Em investigação",
        boletimOcorrencia: "BO-2023/11-45678",
      },
      {
        id: "15",
        objeto: "Jóias diversas",
        dataRoubo: "2023-11-25",
        localizacao: "Residência em Alphaville, São Paulo, SP",
        latitude: -23.4835,
        longitude: -46.8461,
        categoria: "Acessórios",
        imagem: "/placeholder.svg?height=200&width=200",
        descricao:
          "Jóias roubadas durante invasão domiciliar. Os assaltantes renderam a família e levaram diversos itens de valor.",
        status: "Recuperado",
        boletimOcorrencia: "BO-2023/11-56789",
      },
    ]
    setCasos(mockCasos)
  }, [])

  const handleCasoSelect = (caso: Caso) => {
    setSelectedCaso(caso)
    // Aqui você pode adicionar lógica para atualizar o mapa, como centralizar na localização do caso
  }

  const handleToggleHeatmap = (enabled: boolean) => {
    setShowHeatmap(enabled)
    // Aqui você pode adicionar lógica para mostrar/esconder o mapa de calor
  }

  return (
    <div className="h-full w-full relative flex z-50">
      <MapSidebar casos={casos} onCasoSelect={handleCasoSelect} onToggleHeatmap={handleToggleHeatmap} />
      <div className="flex-1">
        <Map selectedCaso={selectedCaso} casos={casos} showHeatmap={showHeatmap} />
      </div>
    </div>
  )
}

export default MapaTab