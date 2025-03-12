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

import Map from "@/app/components/ui/Map"

const mockCasos = [
  // Adicione seus casos mockados aqui
  { id: 1, latitude: -23.55052, longitude: -46.633309, tipo: "Roubo" },
  { id: 2, latitude: -23.55577, longitude: -46.63902, tipo: "Furto" },
  // Adicione mais casos conforme necessário
]

export default function MapPage() {
  return (
    <div className="h-screen w-full">
      <Map userType="visitor" casos={mockCasos} />
    </div>
  )
}

