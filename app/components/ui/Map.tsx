"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet.heat"
import MapSidebar from "@/app/components/ui/MapSidebar"
import VisitorLayout from "@/app/layouts/VisitorLayout"

// Update custom CSS for dark theme
const customMapStyle = `
  .leaflet-container {
    background: #121212;
  }
  .leaflet-tile-container img {
    border: none !important;
    filter: invert(1) hue-rotate(180deg) brightness(0.8) contrast(0.9) !important;
  }
  .leaflet-tile {
    border: none !important;
  }
  .leaflet-tile-pane {
    opacity: 1 !important;
  }
  .custom-theft-marker {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  }
  .custom-user-marker {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  }
  .leaflet-control-zoom {
    border: none !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  }
  .leaflet-control-zoom a {
    background-color: #2c2c2c !important;
    color: #ffffff !important;
    border: none !important;
  }
  .leaflet-control-zoom a:hover {
    background-color: #3c3c3c !important;
  }
  .leaflet-popup-content-wrapper {
    background-color: #2c2c2c !important;
    color: #ffffff !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  }
  .leaflet-popup-tip {
    background-color: #2c2c2c !important;
  }
  .leaflet-control-attribution {
    background-color: rgba(44, 44, 44, 0.8) !important;
    color: #999 !important;
    font-size: 10px !important;
  }
  .leaflet-control-attribution a {
    color: #999 !important;
  }
  
  /* Estilos para os ícones interativos */
  .custom-theft-marker {
    transition: transform 0.2s ease;
  }
  .custom-theft-marker:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  
  /* Estilos para os diferentes tipos de roubo */
  .marker-smartphone {
    background-color: #e74c3c !important;
  }
  .marker-veiculo {
    background-color: #3498db !important;
  }
  .marker-carteira {
    background-color: #f39c12 !important;
  }
  .marker-notebook {
    background-color: #9b59b6 !important;
  }
  .marker-bicicleta {
    background-color: #2ecc71 !important;
  }
  
  /* Estilo para o popup detalhado */
  .detailed-popup {
    padding: 10px;
  }
  .detailed-popup h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #fff;
  }
  .detailed-popup p {
    margin: 5px 0;
    color: #ddd;
  }
  .detailed-popup .status {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    margin-top: 8px;
  }
  .status-investigacao {
    background-color: #3498db;
  }
  .status-resolvido {
    background-color: #2ecc71;
  }
  .status-arquivado {
    background-color: #95a5a6;
  }

  /* Atualize o CSS para melhorar a aparência dos popups e ícones */
  /* Adicione estas regras ao customMapStyle */

  .leaflet-popup {
    margin-bottom: 20px;
  }

  .leaflet-popup-content-wrapper {
    border-radius: 8px !important;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4) !important;
  }

  .leaflet-popup-tip {
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4) !important;
  }

  .custom-theft-marker {
    transition: transform 0.2s ease, z-index 0.2s ease;
    z-index: 900;
  }

  .detailed-popup-container {
    font-family: 'Arial', sans-serif;
  }

  .detailed-popup h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
    color: #fff;
  }

  .detailed-popup p {
    margin: 8px 0;
    line-height: 1.4;
  }

  .detailed-popup .status {
    margin-top: 12px;
    padding: 4px 8px;
    font-weight: bold;
  }
`

// Definindo a interface HeatLayer que está faltando
declare module "leaflet" {
  interface HeatMapOptions {
    minOpacity?: number
    maxZoom?: number
    max?: number
    radius?: number
    blur?: number
    gradient?: Record<string, string>
  }

  class HeatLayer extends L.Layer {
    constructor(latlngs: Array<[number, number, number?]>, options?: HeatMapOptions)
    setLatLngs(latlngs: Array<[number, number, number?]>): this
    addLatLng(latlng: [number, number, number?]): this
    setOptions(options: HeatMapOptions): this
    redraw(): this
  }

  function heatLayer(latlngs: Array<[number, number, number?]>, options?: HeatMapOptions): HeatLayer
}

interface Caso {
  id: string
  objeto: string
  tipoObjeto: string
  dataRoubo: string
  horaRoubo: string
  localizacao: string
  latitude: number
  longitude: number
  status: string
  vitima: string
  descricao?: string
  valorEstimado?: number
}

interface MapProps {
  userType: "visitor" | "citizen" | "police"
  casos: Caso[]
  onBack: () => void
  selectedCaso: Caso | null
  showHeatmap: boolean
  showPatrulhas?: boolean
}

// Dados de exemplo para casos em Brasília
const casosBrasilia: Caso[] = [
  {
    id: "CASO-001",
    objeto: "iPhone 13 Pro",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-15",
    horaRoubo: "14:30",
    localizacao: "Esplanada dos Ministérios",
    latitude: -15.7992,
    longitude: -47.8651,
    status: "Em investigação",
    vitima: "Carlos Oliveira",
    descricao: "Vítima estava tirando fotos quando foi abordada por dois homens em uma motocicleta.",
    valorEstimado: 6500,
  },
  {
    id: "CASO-002",
    objeto: "Honda Civic 2022",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-10",
    horaRoubo: "21:15",
    localizacao: "Estacionamento do Shopping Conjunto Nacional",
    latitude: -15.7905,
    longitude: -47.883,
    status: "Em investigação",
    vitima: "Ana Paula Silva",
    descricao: "Veículo foi levado do estacionamento enquanto a vítima estava no cinema.",
    valorEstimado: 120000,
  },
  {
    id: "CASO-003",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-18",
    horaRoubo: "10:45",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.794,
    longitude: -47.8828,
    status: "Arquivado",
    vitima: "Roberto Mendes",
    descricao: "Vítima teve a carteira furtada enquanto aguardava o ônibus.",
    valorEstimado: 300,
  },
  {
    id: "CASO-004",
    objeto: "MacBook Pro",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-05",
    horaRoubo: "16:20",
    localizacao: "Café na Asa Norte (CLN 201)",
    latitude: -15.7662,
    longitude: -47.8789,
    status: "Resolvido",
    vitima: "Juliana Costa",
    descricao: "Notebook foi furtado enquanto a vítima foi ao banheiro. Câmeras de segurança identificaram o suspeito.",
    valorEstimado: 12000,
  },
  {
    id: "CASO-005",
    objeto: "Bicicleta Mountain Bike",
    tipoObjeto: "bicicleta",
    dataRoubo: "2023-11-12",
    horaRoubo: "17:30",
    localizacao: "Parque da Cidade",
    latitude: -15.8022,
    longitude: -47.9122,
    status: "Em investigação",
    vitima: "Pedro Almeida",
    descricao: "Bicicleta foi furtada enquanto a vítima fazia uma parada para descanso.",
    valorEstimado: 4500,
  },
  {
    id: "CASO-006",
    objeto: "Samsung Galaxy S22",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-17",
    horaRoubo: "19:45",
    localizacao: "Praça dos Três Poderes",
    latitude: -15.8002,
    longitude: -47.8611,
    status: "Em investigação",
    vitima: "Mariana Santos",
    descricao: "Celular foi roubado por um indivíduo em uma motocicleta.",
    valorEstimado: 4800,
  },
  {
    id: "CASO-007",
    objeto: "Toyota Corolla 2021",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-08",
    horaRoubo: "22:30",
    localizacao: "Estacionamento do Pontão do Lago Sul",
    latitude: -15.8264,
    longitude: -47.8739,
    status: "Resolvido",
    vitima: "Fernando Gomes",
    descricao: "Veículo foi recuperado pela polícia em uma operação no Entorno.",
    valorEstimado: 110000,
  },
  {
    id: "CASO-008",
    objeto: "Dell XPS 15",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-14",
    horaRoubo: "15:10",
    localizacao: "Biblioteca Nacional",
    latitude: -15.7972,
    longitude: -47.8774,
    status: "Em investigação",
    vitima: "Luciana Ferreira",
    descricao: "Notebook foi furtado enquanto a vítima consultava livros.",
    valorEstimado: 9800,
  },
]

// Casos adicionais para criar hotspots no mapa de calor
const casosHotspots: Caso[] = [
  // Hotspot na região central - Setor Comercial Sul
  {
    id: "CASO-009",
    objeto: "Samsung Galaxy S21",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-16",
    horaRoubo: "12:30",
    localizacao: "Setor Comercial Sul",
    latitude: -15.7977,
    longitude: -47.8919,
    status: "Em investigação",
    vitima: "Rodrigo Pereira",
    descricao: "Celular furtado durante o horário de almoço em restaurante.",
    valorEstimado: 3800,
  },
  {
    id: "CASO-010",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-16",
    horaRoubo: "13:15",
    localizacao: "Setor Comercial Sul",
    latitude: -15.798,
    longitude: -47.8925,
    status: "Em investigação",
    vitima: "Marcela Ribeiro",
    descricao: "Carteira furtada em estabelecimento comercial.",
    valorEstimado: 250,
  },
  {
    id: "CASO-011",
    objeto: "iPhone 12 Mini",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-17",
    horaRoubo: "18:45",
    localizacao: "Setor Comercial Sul",
    latitude: -15.7975,
    longitude: -47.8915,
    status: "Em investigação",
    vitima: "Gustavo Mendes",
    descricao: "Celular roubado por indivíduo em motocicleta.",
    valorEstimado: 4200,
  },

  // Hotspot na Rodoviária do Plano Piloto
  {
    id: "CASO-012",
    objeto: "Mochila com notebook",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-15",
    horaRoubo: "17:30",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.7942,
    longitude: -47.8825,
    status: "Em investigação",
    vitima: "Carla Sousa",
    descricao: "Mochila furtada enquanto aguardava ônibus.",
    valorEstimado: 5600,
  },
  {
    id: "CASO-013",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-16",
    horaRoubo: "08:20",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.7938,
    longitude: -47.883,
    status: "Arquivado",
    vitima: "José Carlos",
    descricao: "Carteira furtada em meio à multidão.",
    valorEstimado: 180,
  },
  {
    id: "CASO-014",
    objeto: "Xiaomi Redmi Note 10",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-17",
    horaRoubo: "19:10",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.7935,
    longitude: -47.8832,
    status: "Em investigação",
    vitima: "Amanda Silva",
    descricao: "Celular furtado durante embarque.",
    valorEstimado: 1800,
  },

  // Hotspot no Shopping Conjunto Nacional
  {
    id: "CASO-015",
    objeto: "MacBook Air",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-14",
    horaRoubo: "16:45",
    localizacao: "Shopping Conjunto Nacional",
    latitude: -15.7908,
    longitude: -47.8835,
    status: "Em investigação",
    vitima: "Bruno Costa",
    descricao: "Notebook furtado na praça de alimentação.",
    valorEstimado: 8500,
  },
  {
    id: "CASO-016",
    objeto: "iPhone 13",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-15",
    horaRoubo: "20:30",
    localizacao: "Shopping Conjunto Nacional",
    latitude: -15.791,
    longitude: -47.8832,
    status: "Em investigação",
    vitima: "Camila Ferreira",
    descricao: "Celular furtado enquanto vítima experimentava roupas.",
    valorEstimado: 5200,
  },
  {
    id: "CASO-017",
    objeto: "Fiat Argo 2022",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-16",
    horaRoubo: "21:15",
    localizacao: "Estacionamento do Shopping Conjunto Nacional",
    latitude: -15.7912,
    longitude: -47.8825,
    status: "Em investigação",
    vitima: "Ricardo Oliveira",
    descricao: "Veículo levado do estacionamento.",
    valorEstimado: 75000,
  },
]

// Adicione mais casos para criar um hotspot ainda mais intenso na Rodoviária
const casosHotspotRodoviaria: Caso[] = [
  {
    id: "CASO-018",
    objeto: "iPhone 11",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-18",
    horaRoubo: "08:15",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.7941,
    longitude: -47.8827,
    status: "Em investigação",
    vitima: "Paulo Mendes",
    descricao: "Celular furtado durante embarque.",
    valorEstimado: 3200,
  },
  {
    id: "CASO-019",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-18",
    horaRoubo: "09:30",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.7939,
    longitude: -47.8829,
    status: "Em investigação",
    vitima: "Fernanda Lima",
    descricao: "Carteira furtada em meio à multidão.",
    valorEstimado: 200,
  },
  {
    id: "CASO-020",
    objeto: "Samsung Galaxy A52",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-18",
    horaRoubo: "12:45",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.794,
    longitude: -47.8826,
    status: "Em investigação",
    vitima: "Marcos Oliveira",
    descricao: "Celular furtado enquanto aguardava ônibus.",
    valorEstimado: 2200,
  },
  {
    id: "CASO-021",
    objeto: "Mochila com notebook",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-18",
    horaRoubo: "17:15",
    localizacao: "Rodoviária do Plano Piloto",
    latitude: -15.7943,
    longitude: -47.8828,
    status: "Em investigação",
    vitima: "Luiza Cardoso",
    descricao: "Mochila furtada enquanto comprava passagem.",
    valorEstimado: 4800,
  },
]

// Adicione mais casos para criar um hotspot ainda mais intenso no Setor Comercial Sul
const casosHotspotSetorComercial: Caso[] = [
  {
    id: "CASO-022",
    objeto: "iPhone 12",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-18",
    horaRoubo: "13:20",
    localizacao: "Setor Comercial Sul",
    latitude: -15.7976,
    longitude: -47.8917,
    status: "Em investigação",
    vitima: "Renata Silva",
    descricao: "Celular furtado durante almoço em restaurante.",
    valorEstimado: 4500,
  },
  {
    id: "CASO-023",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-18",
    horaRoubo: "14:30",
    localizacao: "Setor Comercial Sul",
    latitude: -15.7978,
    longitude: -47.892,
    status: "Em investigação",
    vitima: "Eduardo Santos",
    descricao: "Carteira furtada em estabelecimento comercial.",
    valorEstimado: 280,
  },
  {
    id: "CASO-024",
    objeto: "Notebook Dell Inspiron",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-18",
    horaRoubo: "16:15",
    localizacao: "Setor Comercial Sul",
    latitude: -15.7979,
    longitude: -47.8918,
    status: "Em investigação",
    vitima: "Carolina Martins",
    descricao: "Notebook furtado em café.",
    valorEstimado: 5600,
  },
  {
    id: "CASO-025",
    objeto: "Samsung Galaxy S23",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-18",
    horaRoubo: "18:30",
    localizacao: "Setor Comercial Sul",
    latitude: -15.7974,
    longitude: -47.8916,
    status: "Em investigação",
    vitima: "Roberto Alves",
    descricao: "Celular roubado por indivíduo em motocicleta.",
    valorEstimado: 5800,
  },
]

// Adicione mais casos concentrados em um único ponto para demonstrar melhor o efeito
// Adicione este novo array de casos após o array casosHotspotSetorComercial

// Adicione um cluster muito concentrado na Rodoviária para demonstrar alta intensidade
const casosClusterRodoviaria: Caso[] = Array.from({ length: 15 }, (_, i) => ({
  id: `CASO-${100 + i}`,
  objeto: "Smartphone",
  tipoObjeto: "smartphone",
  dataRoubo: "2023-11-19",
  horaRoubo: `${8 + Math.floor(i / 2)}:${(i % 2) * 30}`,
  localizacao: "Rodoviária do Plano Piloto - Ponto de alta concentração",
  // Pequena variação para não ficarem exatamente no mesmo ponto
  latitude: -15.794 + (Math.random() - 0.5) * 0.0005,
  longitude: -47.8827 + (Math.random() - 0.5) * 0.0005,
  status: "Em investigação",
  vitima: `Vítima ${100 + i}`,
  descricao: "Furto em área de alta concentração de ocorrências.",
  valorEstimado: 2000 + Math.floor(Math.random() * 3000),
}))

const Map: React.FC<MapProps> = ({
  userType,
  selectedCaso,
  casos: propCasos,
  showHeatmap: propShowHeatmap,
  onBack,
}) => {
  // Combinando os casos fornecidos com os casos de exemplo de Brasília e hotspots
  const casos =
    userType === "visitor"
      ? [
          ...casosBrasilia,
          ...casosHotspots,
          ...casosHotspotRodoviaria,
          ...casosHotspotSetorComercial,
          ...casosClusterRodoviaria,
        ]
      : propCasos

  // Ativar o mapa de calor por padrão para visitantes
  const [internalShowHeatmap, setInternalShowHeatmap] = useState(userType === "visitor" ? true : propShowHeatmap)

  // Use o estado interno para controlar o mapa de calor
  const showHeatmap = userType === "visitor" ? internalShowHeatmap : propShowHeatmap

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const heatLayerRef = useRef<L.HeatLayer | null>(null)
  const userMarkerRef = useRef<L.Marker | null>(null)

  // Função para garantir que os ícones sejam renderizados corretamente
  const fixMarkerIcons = () => {
    if (!mapRef.current) return

    // Forçar uma atualização do tamanho do mapa para garantir que os ícones sejam posicionados corretamente
    mapRef.current.invalidateSize()

    // Se houver marcadores, ajuste a visualização para incluir todos eles
    if (markersLayerRef.current && markersLayerRef.current.getLayers().length > 0) {
      try {
        const group = L.featureGroup(markersLayerRef.current.getLayers())
        mapRef.current.fitBounds(group.getBounds(), {
          padding: [50, 50],
          maxZoom: 14,
        })
      } catch (error) {
        console.error("Erro ao ajustar a visualização:", error)
      }
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    const initMap = (center: [number, number], zoom: number) => {
      if (mapRef.current) return // Prevent re-initialization

      if (!mapContainerRef.current) return

      const mapInstance = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
        renderer: L.canvas(),
      })

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
        className: "dark-style-tiles",
      }).addTo(mapInstance)

      L.control.zoom({ position: "bottomright" }).addTo(mapInstance)

      markersLayerRef.current = L.layerGroup().addTo(mapInstance)
      mapRef.current = mapInstance

      setIsLoading(false)
    }

    const setupMap = () => {
      if (userType === "visitor") {
        initMap([-15.7801, -47.9292], 13) // Brasília com zoom mais próximo
      } else if (userType === "citizen" || userType === "police") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            initMap([latitude, longitude], 13)

            const userIcon = L.divIcon({
              className: "custom-user-marker",
              html: `<div style="
                width: 20px;
                height: 20px;
                background-color: #3498db;
                border-radius: 50%;
                box-shadow: 0 0 10px #3498db;
              "></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })

            if (mapRef.current) {
              userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
                .addTo(mapRef.current)
                .bindPopup("Sua localização")
            }
          },
          (err) => {
            console.error("Erro ao obter localização:", err)
            setError("Não foi possível obter sua localização. Usando localização padrão.")
            initMap([-15.7801, -47.9292], 13) // Fallback para o centro do Brasil
          },
          { timeout: 10000, enableHighAccuracy: true },
        )
      }
    }

    setupMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [userType])

  // Efeito para mostrar/esconder marcadores baseado no estado do mapa de calor
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return

    // Limpar todos os marcadores existentes
    markersLayerRef.current.clearLayers()

    // Se o mapa de calor estiver ativo, não mostrar os marcadores individuais
    if (showHeatmap) return

    // Função para criar ícones personalizados baseados no tipo de objeto
    casos.forEach((caso) => {
      if (caso.latitude !== undefined && caso.longitude !== undefined) {
        // Criar um ícone simples e confiável
        let backgroundColor = "#ff4444" // Cor padrão

        // Definir cores específicas para cada tipo de objeto
        switch (caso.tipoObjeto.toLowerCase()) {
          case "smartphone":
            backgroundColor = "#e74c3c"
            break
          case "veiculo":
            backgroundColor = "#3498db"
            break
          case "carteira":
            backgroundColor = "#f39c12"
            break
          case "notebook":
            backgroundColor = "#9b59b6"
            break
          case "bicicleta":
            backgroundColor = "#2ecc71"
            break
        }

        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: 30px;
            height: 30px;
            background-color: ${backgroundColor};
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.5);
          "></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15],
        })

        // Criar conteúdo HTML simples para o popup
        const popupContent = `
          <div style="padding: 10px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">${caso.objeto}</h3>
            <p><strong>Data:</strong> ${new Date(caso.dataRoubo).toLocaleDateString("pt-BR")}</p>
            <p><strong>Hora:</strong> ${caso.horaRoubo}</p>
            <p><strong>Local:</strong> ${caso.localizacao}</p>
            <p><strong>Vítima:</strong> ${caso.vitima}</p>
            ${caso.descricao ? `<p><strong>Descrição:</strong> ${caso.descricao}</p>` : ""}
            ${caso.valorEstimado ? `<p><strong>Valor estimado:</strong> ${caso.valorEstimado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>` : ""}
            <p><strong>Status:</strong> ${caso.status}</p>
          </div>
        `

        // Criar o marcador com popup simples
        L.marker([caso.latitude, caso.longitude], { icon }).addTo(markersLayerRef.current!).bindPopup(popupContent)
      }
    })
  }, [casos, showHeatmap])

  // Efeito para gerenciar o mapa de calor
  useEffect(() => {
    if (!mapRef.current) return

    if (showHeatmap) {
      if (!heatLayerRef.current) {
        const validCasos = casos.filter((caso) => caso.latitude !== undefined && caso.longitude !== undefined)

        // Agrupar casos por localização para criar um mapa de calor baseado em densidade
        const heatPoints: { [key: string]: { lat: number; lng: number; count: number } } = {}

        // Função para gerar uma chave baseada na localização aproximada
        const getLocationKey = (lat: number, lng: number) => {
          // Arredonda para 5 casas decimais (aproximadamente 1.1 metros)
          // Usando uma precisão maior para pontos mais precisos
          return `${lat.toFixed(5)},${lng.toFixed(5)}`
        }

        // Agrupar casos próximos
        validCasos.forEach((caso) => {
          const key = getLocationKey(caso.latitude, caso.longitude)

          if (!heatPoints[key]) {
            heatPoints[key] = {
              lat: caso.latitude,
              lng: caso.longitude,
              count: 1,
            }
          } else {
            heatPoints[key].count += 1
          }
        })

        // Converter para o formato esperado pelo heatLayer
        const heatData = Object.values(heatPoints).map((point) => {
          // A intensidade é baseada na contagem de casos naquele ponto
          // Usando uma função exponencial para aumentar o contraste entre áreas
          // com poucos casos e áreas com muitos casos
          const intensity = Math.pow(point.count, 1.5) * 3
          return [point.lat, point.lng, intensity] as [number, number, number]
        })

        heatLayerRef.current = L.heatLayer(heatData, {
          radius: 30, // Raio menor para pontos mais precisos
          blur: 20, // Menos blur para maior definição
          maxZoom: 17,
          max: 30, // Valor máximo de intensidade aumentado
          gradient: {
            0.1: "#74b9ff", // Azul claro para áreas de baixa intensidade
            0.3: "#0984e3", // Azul para intensidade média-baixa
            0.5: "#fdcb6e", // Amarelo para intensidade média
            0.7: "#e17055", // Laranja para intensidade média-alta
            0.9: "#d63031", // Vermelho para alta intensidade
          },
        }).addTo(mapRef.current)
      }
    } else if (heatLayerRef.current) {
      mapRef.current.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }
  }, [showHeatmap, casos])

  useEffect(() => {
    if (!mapRef.current || !selectedCaso) return

    if (selectedCaso.latitude !== undefined && selectedCaso.longitude !== undefined) {
      mapRef.current.setView([selectedCaso.latitude, selectedCaso.longitude], 15)
    }
  }, [selectedCaso])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [])

  // Chame a função após carregar os marcadores
  useEffect(() => {
    if (mapRef.current && !isLoading) {
      // Pequeno atraso para garantir que o mapa esteja totalmente carregado
      const timer = setTimeout(() => {
        fixMarkerIcons()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isLoading, casos])

  const mapContent = (
    <>
      <MapSidebar
        casos={casos}
        onCasoSelect={(caso) => {
          if (mapRef.current && caso.latitude !== undefined && caso.longitude !== undefined) {
            mapRef.current.setView([caso.latitude, caso.longitude], 15)
          }
        }}
        onToggleHeatmap={(enabled) => {
          // Usar o estado interno para visitantes
          if (userType === "visitor") {
            setInternalShowHeatmap(enabled)
          }
        }}
        onBack={onBack}
        userType={userType}
      />
      <div
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-gray-900 bg-opacity-70 text-white p-4 text-center">
          Carregando o mapa...
        </div>
      )}
      {error && <div className="absolute top-0 left-0 right-0 z-20 bg-red-500 text-white p-4 text-center">{error}</div>}
      {showHeatmap && (
        <div className="absolute bottom-4 left-4 z-20 bg-black bg-opacity-70 text-white p-3 rounded-lg shadow-lg">
          <h3 className="text-sm font-bold mb-2">Concentração de Roubos</h3>
          <div className="flex items-center space-x-1">
            <div
              className="w-full h-4 rounded-full"
              style={{
                background: "linear-gradient(to right, #74b9ff, #0984e3, #fdcb6e, #e17055, #d63031)",
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Baixa</span>
            <span>Média</span>
            <span>Alta</span>
          </div>
          <p className="text-xs mt-2 opacity-80">* Intensidade baseada na quantidade de casos</p>
        </div>
      )}
      {/* Botão para recarregar os ícones caso ainda haja problemas */}
      <button
        onClick={() => fixMarkerIcons()}
        className="absolute bottom-4 right-4 z-20 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
      >
        Recarregar Ícones
      </button>
    </>
  )

  return (
    <>
      <style jsx global>
        {customMapStyle}
      </style>
      {userType === "visitor" ? (
        <VisitorLayout>{mapContent}</VisitorLayout>
      ) : (
        <div className="relative h-screen w-full">{mapContent}</div>
      )}
    </>
  )
}

export default Map

