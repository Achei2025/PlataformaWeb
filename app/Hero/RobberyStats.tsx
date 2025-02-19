"use client"

import type React from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import BrazilMap from "./BrazilMap"

const stats = [
  {
    title: "Roubos de Celular",
    value: "65%",
    description: "dos roubos envolvem smartphones",
    text: "A maioria dos roubos hoje em dia tem como alvo smartphones, tornando-os um dos itens mais visados por criminosos.",
  },
  {
    title: "Recuperação",
    value: "22%",
    description: "dos dispositivos roubados são recuperados",
    text: "Infelizmente, apenas uma pequena parcela dos dispositivos roubados é recuperada, deixando muitas vítimas sem seus pertences.",
  },
  {
    title: "Perda Financeira",
    value: "R$ 1.2B",
    description: "prejuízo anual devido a roubos",
    text: "O impacto financeiro dos roubos de celulares é significativo, causando bilhões em prejuízos anualmente para a sociedade.",
  },
  {
    title: "Risco de Dados",
    value: "78%",
    description: "das vítimas têm dados pessoais comprometidos",
    text: "Além da perda material, a maioria das vítimas enfrenta o risco de ter seus dados pessoais expostos ou utilizados indevidamente.",
  },
]

const BrazilRobberyStats: React.FC = () => {
  const handleStateClick = () => {
    // Aqui você poderia adicionar lógica para atualizar as estatísticas com base no estado selecionado
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
        {/* Coluna Esquerda - 2 Cards */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {stats.slice(0, 2).map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.description}</p>
                <p className="text-sm text-gray-700">{stat.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mapa Centralizado - Aumentado */}
        <div className="w-full md:w-1/3 flex justify-center my-6 md:my-0">
          <div className="w-[350px] h-[500px] md:w-[800px] md:h-[600px] flex items-center justify-center">
            <BrazilMap onStateClick={handleStateClick} />
          </div>
        </div>

        {/* Coluna Direita - 2 Cards */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {stats.slice(2, 4).map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.description}</p>
                <p className="text-sm text-gray-700">{stat.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrazilRobberyStats
