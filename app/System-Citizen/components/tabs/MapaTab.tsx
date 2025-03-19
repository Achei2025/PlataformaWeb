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
import Map from "@/app/components/ui/Map"
import { useAuth } from "@/app/contexts/auth-context"

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
  const { user } = useAuth()

  useEffect(() => {
    // Simular carregamento de casos (substitua por uma chamada API real)
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
      // ... outros casos
    ]
    setCasos(mockCasos)

    // Em uma implementação real, você faria uma chamada à API
    // const fetchCasos = async () => {
    //   try {
    //     const response = await fetch('/api/casos', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //     const data = await response.json();
    //     setCasos(data);
    //   } catch (error) {
    //     console.error('Erro ao carregar casos:', error);
    //   }
    // };
    //
    // fetchCasos();
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Map userType={user?.role || "citizen"} casos={casos} onBack={() => window.history.back()} />
    </div>
  )
}

export default MapaTab

