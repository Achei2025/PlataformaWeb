"use client"

import { useState } from "react"
import Map from "@/app/components/ui/Map"
import { Button } from "@/app/components/ui/button"

const mockCasos = [
  // ... adicione alguns casos mockados aqui
]

export default function MapPage() {
  const [showMap, setShowMap] = useState(false)

  if (!showMap) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Button onClick={() => setShowMap(true)}>Ver Mapa</Button>
      </div>
    )
  }

  return <Map userType="visitor" casos={mockCasos} onBack={() => setShowMap(false)} />
}

