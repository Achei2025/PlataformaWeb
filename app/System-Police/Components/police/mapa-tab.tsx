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
import Map from "@/app/components/ui/Map"

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  latitude: number
  longitude: number
  status: "Em andamento" | "Resolvido" | "Arquivado"
}

const mockCasos: Caso[] = [
  {
    id: "1",
    objeto: "Smartphone",
    dataRoubo: "2023-05-15",
    localizacao: "São Paulo, SP",
    latitude: -23.5505,
    longitude: -46.6333,
    status: "Em andamento",
  },
  // ... outros casos
]

const MapaTab: React.FC = () => {
  const [casos, setCasos] = useState<Caso[]>(mockCasos)

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Map userType="police" casos={casos} onBack={() => window.history.back()} />
    </div>
  )
}

export default MapaTab

