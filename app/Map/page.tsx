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

