"use client"

import Map from "@/app/components/ui/Map"

const mockCasos = [
  // Casos em Petrolina, Pernambuco
  {
    id: "1",
    objeto: "iPhone 14 Pro",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-15",
    horaRoubo: "15:30",
    localizacao: "Orla de Petrolina",
    latitude: -9.3896,
    longitude: -40.5027,
    status: "Em investigação",
    vitima: "Marcos Oliveira",
    descricao: "Celular roubado enquanto a vítima caminhava na orla.",
    valorEstimado: 7500,
  },
  {
    id: "2",
    objeto: "Honda Biz 125",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-12",
    horaRoubo: "19:45",
    localizacao: "Estacionamento do River Shopping",
    latitude: -9.3992,
    longitude: -40.5112,
    status: "Em investigação",
    vitima: "Ana Paula Costa",
    descricao: "Motocicleta foi levada do estacionamento enquanto a vítima fazia compras.",
    valorEstimado: 12000,
  },
  {
    id: "3",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-17",
    horaRoubo: "10:15",
    localizacao: "Mercado Municipal de Petrolina",
    latitude: -9.3935,
    longitude: -40.5075,
    status: "Arquivado",
    vitima: "José Carlos Silva",
    descricao: "Vítima teve a carteira furtada enquanto fazia compras no mercado.",
    valorEstimado: 250,
  },
  {
    id: "4",
    objeto: "MacBook Air",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-10",
    horaRoubo: "14:20",
    localizacao: "Café no Centro de Petrolina",
    latitude: -9.3967,
    longitude: -40.5021,
    status: "Em investigação",
    vitima: "Carla Mendes",
    descricao: "Notebook foi furtado enquanto a vítima foi ao banheiro.",
    valorEstimado: 9000,
  },
  {
    id: "5",
    objeto: "Bicicleta Mountain Bike",
    tipoObjeto: "bicicleta",
    dataRoubo: "2023-11-14",
    horaRoubo: "17:30",
    localizacao: "Parque Municipal de Petrolina",
    latitude: -9.3845,
    longitude: -40.5118,
    status: "Em investigação",
    vitima: "Ricardo Almeida",
    descricao: "Bicicleta foi furtada enquanto a vítima fazia uma parada para descanso.",
    valorEstimado: 3800,
  },

  // Casos em Juazeiro, Bahia
  {
    id: "6",
    objeto: "iPhone 13",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-16",
    horaRoubo: "16:45",
    localizacao: "Orla de Juazeiro",
    latitude: -9.4066,
    longitude: -40.5037,
    status: "Em investigação",
    vitima: "Juliana Pereira",
    descricao: "Celular roubado enquanto a vítima tirava fotos na orla.",
    valorEstimado: 5800,
  },
  {
    id: "7",
    objeto: "Honda CG 160",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-13",
    horaRoubo: "20:15",
    localizacao: "Estacionamento do Juá Garden Shopping",
    latitude: -9.4157,
    longitude: -40.5001,
    status: "Em investigação",
    vitima: "Roberto Souza",
    descricao: "Motocicleta foi levada do estacionamento enquanto a vítima estava no cinema.",
    valorEstimado: 14000,
  },
  {
    id: "8",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-18",
    horaRoubo: "09:30",
    localizacao: "Mercado do Produtor de Juazeiro",
    latitude: -9.4119,
    longitude: -40.4992,
    status: "Arquivado",
    vitima: "Maria Silva",
    descricao: "Vítima teve a carteira furtada enquanto fazia compras no mercado.",
    valorEstimado: 280,
  },
  {
    id: "9",
    objeto: "Lenovo ThinkPad",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-11",
    horaRoubo: "15:40",
    localizacao: "Café na Avenida Adolfo Viana",
    latitude: -9.4103,
    longitude: -40.5018,
    status: "Em investigação",
    vitima: "Pedro Mendes",
    descricao: "Notebook foi furtado enquanto a vítima foi ao balcão pegar seu pedido.",
    valorEstimado: 7500,
  },
  {
    id: "10",
    objeto: "Bicicleta Caloi Elite",
    tipoObjeto: "bicicleta",
    dataRoubo: "2023-11-15",
    horaRoubo: "18:20",
    localizacao: "Parque Fluvial de Juazeiro",
    latitude: -9.4052,
    longitude: -40.5042,
    status: "Em investigação",
    vitima: "Amanda Oliveira",
    descricao: "Bicicleta foi furtada enquanto a vítima caminhava à beira do rio.",
    valorEstimado: 4200,
  },
]

export default function MapPage() {
  return (
    <div className="h-screen w-full">
      <Map userType="visitor" casos={mockCasos} onBack={() => {}} selectedCaso={null} showHeatmap={true} />
    </div>
  )
}

