"use client"

import type React from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import BrazilMap from "./BrazilMap"

const stats = [
  {
    value: "65%",
    label: "Roubos de Celular",
    description: "dos roubos envolvem smartphones",
  },
  {
    value: "R$ 1.2B",
    label: "Perda Financeira",
    description: "prejuízo anual devido a roubos",
  },
  {
    value: "78%",
    label: "Risco de Dados",
    description: "das vítimas têm dados comprometidos",
  },
]

const BrazilRobberyStats: React.FC = () => {
  const handleStateClick = () => {
    // Lógica para atualizar as estatísticas com base no estado selecionado
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-indigo-950/90 z-10" /> {/* Dark overlay */}
        <div className="w-full h-full">
          <BrazilMap onStateClick={handleStateClick} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{stat.value}</p>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrazilRobberyStats

