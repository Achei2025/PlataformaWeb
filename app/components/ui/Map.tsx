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

// Casos em Petrolina, Pernambuco
const casosPetrolina: Caso[] = [
  {
    id: "CASO-PE-001",
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
    id: "CASO-PE-002",
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
    id: "CASO-PE-003",
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
    id: "CASO-PE-004",
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
    id: "CASO-PE-005",
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
  {
    id: "CASO-PE-006",
    objeto: "Samsung Galaxy S22",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-16",
    horaRoubo: "20:15",
    localizacao: "Avenida Cardoso de Sá",
    latitude: -9.3912,
    longitude: -40.5042,
    status: "Em investigação",
    vitima: "Fernanda Santos",
    descricao: "Celular foi roubado por um indivíduo em uma motocicleta.",
    valorEstimado: 4500,
  },
  {
    id: "CASO-PE-007",
    objeto: "Toyota Corolla 2021",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-11",
    horaRoubo: "21:30",
    localizacao: "Estacionamento da UNIVASF",
    latitude: -9.3232,
    longitude: -40.5331,
    status: "Resolvido",
    vitima: "Paulo Gomes",
    descricao: "Veículo foi recuperado pela polícia em uma operação.",
    valorEstimado: 105000,
  },
  {
    id: "CASO-PE-008",
    objeto: "Dell Inspiron",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-13",
    horaRoubo: "16:10",
    localizacao: "Biblioteca da UNIVASF",
    latitude: -9.324,
    longitude: -40.5325,
    status: "Em investigação",
    vitima: "Luciana Ferreira",
    descricao: "Notebook foi furtado enquanto a vítima consultava livros.",
    valorEstimado: 6800,
  },
]

// Hotspot em Petrolina - Centro
const casosHotspotPetrolina: Caso[] = Array.from({ length: 8 }, (_, i) => ({
  id: `CASO-PE-${100 + i}`,
  objeto: "Smartphone",
  tipoObjeto: "smartphone",
  dataRoubo: "2023-11-19",
  horaRoubo: `${10 + Math.floor(i / 2)}:${(i % 2) * 30}`,
  localizacao: "Centro de Petrolina - Área comercial",
  latitude: -9.3967 + (Math.random() - 0.5) * 0.002,
  longitude: -40.5021 + (Math.random() - 0.5) * 0.002,
  status: "Em investigação",
  vitima: `Vítima PE-${100 + i}`,
  descricao: "Furto em área comercial de alta circulação.",
  valorEstimado: 2000 + Math.floor(Math.random() * 3000),
}))

// Casos em Juazeiro, Bahia
const casosJuazeiro: Caso[] = [
  {
    id: "CASO-BA-001",
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
    id: "CASO-BA-002",
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
    id: "CASO-BA-003",
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
    id: "CASO-BA-004",
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
    id: "CASO-BA-005",
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
  {
    id: "CASO-BA-006",
    objeto: "Xiaomi Redmi Note 11",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-17",
    horaRoubo: "19:30",
    localizacao: "Praça da Catedral",
    latitude: -9.4078,
    longitude: -40.5032,
    status: "Em investigação",
    vitima: "Lucas Santos",
    descricao: "Celular foi roubado por dois indivíduos a pé.",
    valorEstimado: 2200,
  },
  {
    id: "CASO-BA-007",
    objeto: "Fiat Argo 2022",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-12",
    horaRoubo: "22:10",
    localizacao: "Estacionamento da UNIVASF - Campus Juazeiro",
    latitude: -9.4045,
    longitude: -40.5125,
    status: "Em investigação",
    vitima: "Camila Rodrigues",
    descricao: "Veículo foi levado do estacionamento durante um evento.",
    valorEstimado: 72000,
  },
  {
    id: "CASO-BA-008",
    objeto: "Acer Aspire",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-14",
    horaRoubo: "17:15",
    localizacao: "Biblioteca Municipal de Juazeiro",
    latitude: -9.4092,
    longitude: -40.5028,
    status: "Em investigação",
    vitima: "Rafael Ferreira",
    descricao: "Notebook foi furtado enquanto a vítima consultava livros.",
    valorEstimado: 5200,
  },
]

// Hotspot em Juazeiro - Área comercial
const casosHotspotJuazeiro: Caso[] = Array.from({ length: 10 }, (_, i) => ({
  id: `CASO-BA-${100 + i}`,
  objeto: "Smartphone",
  tipoObjeto: "smartphone",
  dataRoubo: "2023-11-19",
  horaRoubo: `${9 + Math.floor(i / 2)}:${(i % 2) * 30}`,
  localizacao: "Centro de Juazeiro - Área comercial",
  latitude: -9.4103 + (Math.random() - 0.5) * 0.002,
  longitude: -40.5018 + (Math.random() - 0.5) * 0.002,
  status: "Em investigação",
  vitima: `Vítima BA-${100 + i}`,
  descricao: "Furto em área comercial de alta circulação.",
  valorEstimado: 1800 + Math.floor(Math.random() * 2500),
}))

// Casos adicionais em Petrolina, Pernambuco
const casosPetrolinaAdicionais: Caso[] = [
  {
    id: "CASO-PE-009",
    objeto: "Moto Honda Fan 160",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-20",
    horaRoubo: "18:45",
    localizacao: "Av. Monsenhor Ângelo Sampaio",
    latitude: -9.3923,
    longitude: -40.5089,
    status: "Em investigação",
    vitima: "Antônio Carlos Pereira",
    descricao: "Moto foi levada enquanto estacionada em frente a uma farmácia.",
    valorEstimado: 13500,
  },
  {
    id: "CASO-PE-010",
    objeto: "Bolsa com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-21",
    horaRoubo: "11:20",
    localizacao: "Feira Livre de Petrolina",
    latitude: -9.3952,
    longitude: -40.5062,
    status: "Em investigação",
    vitima: "Mariana Costa",
    descricao: "Bolsa furtada enquanto a vítima fazia compras na feira.",
    valorEstimado: 350,
  },
  {
    id: "CASO-PE-011",
    objeto: "Samsung Galaxy Tab S7",
    tipoObjeto: "tablet",
    dataRoubo: "2023-11-19",
    horaRoubo: "16:30",
    localizacao: "Praça Maria Auxiliadora",
    latitude: -9.3961,
    longitude: -40.5012,
    status: "Em investigação",
    vitima: "Felipe Rodrigues",
    descricao: "Tablet furtado enquanto a vítima estava sentada em um banco da praça.",
    valorEstimado: 3200,
  },
  {
    id: "CASO-PE-012",
    objeto: "Relógio Apple Watch",
    tipoObjeto: "acessorio",
    dataRoubo: "2023-11-22",
    horaRoubo: "07:15",
    localizacao: "Orla II - Área de exercícios",
    latitude: -9.3882,
    longitude: -40.5039,
    status: "Em investigação",
    vitima: "Camila Santana",
    descricao: "Relógio roubado durante caminhada matinal.",
    valorEstimado: 2800,
  },
  {
    id: "CASO-PE-013",
    objeto: "Notebook HP Pavilion",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-20",
    horaRoubo: "13:40",
    localizacao: "Restaurante no Centro",
    latitude: -9.3958,
    longitude: -40.5031,
    status: "Em investigação",
    vitima: "Rodrigo Alves",
    descricao: "Notebook furtado durante o almoço quando a vítima foi ao buffet.",
    valorEstimado: 4500,
  },
  {
    id: "CASO-PE-014",
    objeto: "Fiat Mobi 2022",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-21",
    horaRoubo: "22:10",
    localizacao: "Estacionamento do Aeroporto",
    latitude: -9.3621,
    longitude: -40.569,
    status: "Em investigação",
    vitima: "Eduardo Mendes",
    descricao: "Veículo levado do estacionamento do aeroporto durante viagem da vítima.",
    valorEstimado: 58000,
  },
  {
    id: "CASO-PE-015",
    objeto: "Câmera Canon EOS",
    tipoObjeto: "camera",
    dataRoubo: "2023-11-19",
    horaRoubo: "17:20",
    localizacao: "Parque Municipal",
    latitude: -9.3851,
    longitude: -40.5125,
    status: "Em investigação",
    vitima: "Juliana Ferreira",
    descricao: "Câmera roubada enquanto a vítima fotografava o pôr do sol.",
    valorEstimado: 4200,
  },
  {
    id: "CASO-PE-016",
    objeto: "iPhone 15",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-22",
    horaRoubo: "19:30",
    localizacao: "Shopping Center Petrolina",
    latitude: -9.3986,
    longitude: -40.5105,
    status: "Em investigação",
    vitima: "Marcelo Santos",
    descricao: "Celular furtado enquanto a vítima estava no cinema.",
    valorEstimado: 8500,
  },
  {
    id: "CASO-PE-017",
    objeto: "Bicicleta Specialized",
    tipoObjeto: "bicicleta",
    dataRoubo: "2023-11-20",
    horaRoubo: "16:45",
    localizacao: "Ciclovia da Orla",
    latitude: -9.3901,
    longitude: -40.5032,
    status: "Em investigação",
    vitima: "Rafael Costa",
    descricao: "Bicicleta roubada por dois indivíduos durante passeio na ciclovia.",
    valorEstimado: 7800,
  },
  {
    id: "CASO-PE-018",
    objeto: "Mochila com laptop",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-21",
    horaRoubo: "14:15",
    localizacao: "Faculdade de Medicina - UNIVASF",
    latitude: -9.3245,
    longitude: -40.5335,
    status: "Em investigação",
    vitima: "Carolina Lima",
    descricao: "Mochila furtada na biblioteca durante estudo.",
    valorEstimado: 5600,
  },
]

// Casos adicionais em Juazeiro, Bahia
const casosJuazeiroAdicionais: Caso[] = [
  {
    id: "CASO-BA-009",
    objeto: "Moto Yamaha Factor",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-20",
    horaRoubo: "19:30",
    localizacao: "Av. Adolfo Viana",
    latitude: -9.4098,
    longitude: -40.5025,
    status: "Em investigação",
    vitima: "João Paulo Silva",
    descricao: "Moto foi levada enquanto estacionada em frente a uma loja.",
    valorEstimado: 11800,
  },
  {
    id: "CASO-BA-010",
    objeto: "Carteira com documentos",
    tipoObjeto: "carteira",
    dataRoubo: "2023-11-21",
    horaRoubo: "10:45",
    localizacao: "Feira do Centro",
    latitude: -9.4112,
    longitude: -40.5002,
    status: "Em investigação",
    vitima: "Ana Beatriz Oliveira",
    descricao: "Carteira furtada enquanto a vítima fazia compras na feira.",
    valorEstimado: 280,
  },
  {
    id: "CASO-BA-011",
    objeto: "iPad Pro",
    tipoObjeto: "tablet",
    dataRoubo: "2023-11-19",
    horaRoubo: "15:20",
    localizacao: "Praça da Catedral",
    latitude: -9.4081,
    longitude: -40.5035,
    status: "Em investigação",
    vitima: "Lucas Mendes",
    descricao: "Tablet furtado enquanto a vítima estava sentada em um banco da praça.",
    valorEstimado: 5800,
  },
  {
    id: "CASO-BA-012",
    objeto: "Smartwatch Samsung",
    tipoObjeto: "acessorio",
    dataRoubo: "2023-11-22",
    horaRoubo: "08:30",
    localizacao: "Orla de Juazeiro - Área de exercícios",
    latitude: -9.4062,
    longitude: -40.5042,
    status: "Em investigação",
    vitima: "Fernanda Lima",
    descricao: "Relógio roubado durante caminhada matinal.",
    valorEstimado: 1800,
  },
  {
    id: "CASO-BA-013",
    objeto: "Notebook Dell XPS",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-20",
    horaRoubo: "12:50",
    localizacao: "Restaurante na Orla",
    latitude: -9.4069,
    longitude: -40.5039,
    status: "Em investigação",
    vitima: "Gustavo Pereira",
    descricao: "Notebook furtado durante o almoço quando a vítima foi ao buffet.",
    valorEstimado: 8900,
  },
  {
    id: "CASO-BA-014",
    objeto: "Chevrolet Onix 2021",
    tipoObjeto: "veiculo",
    dataRoubo: "2023-11-21",
    horaRoubo: "21:15",
    localizacao: "Estacionamento do Shopping Juazeiro",
    latitude: -9.4155,
    longitude: -40.5003,
    status: "Em investigação",
    vitima: "Roberto Alves",
    descricao: "Veículo levado do estacionamento enquanto a vítima estava no cinema.",
    valorEstimado: 65000,
  },
  {
    id: "CASO-BA-015",
    objeto: "Câmera Sony Alpha",
    tipoObjeto: "camera",
    dataRoubo: "2023-11-19",
    horaRoubo: "16:40",
    localizacao: "Ponte Presidente Dutra",
    latitude: -9.4033,
    longitude: -40.5022,
    status: "Em investigação",
    vitima: "Mariana Costa",
    descricao: "Câmera roubada enquanto a vítima fotografava o Rio São Francisco.",
    valorEstimado: 5600,
  },
  {
    id: "CASO-BA-016",
    objeto: "Samsung Galaxy S23",
    tipoObjeto: "smartphone",
    dataRoubo: "2023-11-22",
    horaRoubo: "18:45",
    localizacao: "Terminal Rodoviário",
    latitude: -9.4128,
    longitude: -40.5065,
    status: "Em investigação",
    vitima: "Paulo Henrique Santos",
    descricao: "Celular furtado enquanto a vítima aguardava o ônibus.",
    valorEstimado: 5200,
  },
  {
    id: "CASO-BA-017",
    objeto: "Bicicleta Caloi Elite Carbon",
    tipoObjeto: "bicicleta",
    dataRoubo: "2023-11-20",
    horaRoubo: "17:30",
    localizacao: "Ciclovia da Orla",
    latitude: -9.4058,
    longitude: -40.5045,
    status: "Em investigação",
    vitima: "Thiago Oliveira",
    descricao: "Bicicleta roubada por dois indivíduos durante passeio na ciclovia.",
    valorEstimado: 8500,
  },
  {
    id: "CASO-BA-018",
    objeto: "Mochila com laptop",
    tipoObjeto: "notebook",
    dataRoubo: "2023-11-21",
    horaRoubo: "15:20",
    localizacao: "Campus da UNIVASF Juazeiro",
    latitude: -9.4048,
    longitude: -40.5128,
    status: "Em investigação",
    vitima: "Amanda Rodrigues",
    descricao: "Mochila furtada na biblioteca durante estudo.",
    valorEstimado: 4800,
  },
]

// Mais casos adicionais em Petrolina para criar um cluster mais denso
const casosPetrolinaCluster: Caso[] = Array.from({ length: 12 }, (_, i) => ({
  id: `CASO-PE-${200 + i}`,
  objeto: i % 2 === 0 ? "Smartphone" : "Carteira",
  tipoObjeto: i % 2 === 0 ? "smartphone" : "carteira",
  dataRoubo: "2023-11-23",
  horaRoubo: `${8 + Math.floor(i / 2)}:${(i % 2) * 30}`,
  localizacao: "Centro Comercial de Petrolina",
  latitude: -9.396 + (Math.random() - 0.5) * 0.001, // Cluster mais concentrado
  longitude: -40.5025 + (Math.random() - 0.5) * 0.001,
  status: "Em investigação",
  vitima: `Vítima PE-Cluster-${i + 1}`,
  descricao: "Furto em área de alta concentração de pessoas.",
  valorEstimado: 1500 + Math.floor(Math.random() * 2000),
}))

// Mais casos adicionais em Juazeiro para criar um cluster mais denso
const casosJuazeiroCluster: Caso[] = Array.from({ length: 12 }, (_, i) => ({
  id: `CASO-BA-${200 + i}`,
  objeto: i % 2 === 0 ? "Smartphone" : "Carteira",
  tipoObjeto: i % 2 === 0 ? "smartphone" : "carteira",
  dataRoubo: "2023-11-23",
  horaRoubo: `${8 + Math.floor(i / 2)}:${(i % 2) * 30}`,
  localizacao: "Centro Comercial de Juazeiro",
  latitude: -9.41 + (Math.random() - 0.5) * 0.001, // Cluster mais concentrado
  longitude: -40.502 + (Math.random() - 0.5) * 0.001,
  status: "Em investigação",
  vitima: `Vítima BA-Cluster-${i + 1}`,
  descricao: "Furto em área de alta concentração de pessoas.",
  valorEstimado: 1500 + Math.floor(Math.random() * 2000),
}))

const Map: React.FC<MapProps> = ({
  userType,
  selectedCaso,
  casos: propCasos,
  showHeatmap: propShowHeatmap,
  onBack,
}) => {
  // Combinando os casos fornecidos com os casos de exemplo
  const casos =
    userType === "visitor"
      ? [
          ...casosPetrolina,
          ...casosHotspotPetrolina,
          ...casosJuazeiro,
          ...casosHotspotJuazeiro,
          ...casosPetrolinaAdicionais,
          ...casosJuazeiroAdicionais,
          ...casosPetrolinaCluster,
          ...casosJuazeiroCluster,
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
        // Inicializar o mapa centrado na região de Petrolina/Juazeiro
        initMap([-9.4, -40.5], 13)
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
            // Fallback para o centro de Petrolina/Juazeiro
            initMap([-9.4, -40.5], 13)
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
          case "tablet":
            backgroundColor = "#1abc9c"
            break
          case "camera":
            backgroundColor = "#d35400"
            break
          case "acessorio":
            backgroundColor = "#8e44ad"
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

