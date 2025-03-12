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
import { Card, CardContent } from "@/app/components/ui/card"
import { motion } from "framer-motion"

const timelineStats = [
  {
    value: "386.000",
    label: "1º Semestre",
    description: "Roubos de celulares registrados",
    color: "green",
  },
  {
    value: "R$ 2.7B",
    label: "Prejuízo anual",
    description: "Valor estimado em perdas materiais",
    color: "yellow",
  },
  {
    value: "42%",
    label: "São Paulo",
    description: "Concentração dos casos no país",
    color: "blue",
  },
  {
    value: "25%",
    label: "Meta de redução",
    description: "Objetivo das forças de segurança",
    color: "green",
  },
  {
    value: "R$ 1.8B",
    label: "Investimento",
    description: "Em tecnologia de segurança pública",
    color: "yellow",
  },
  {
    value: "60%",
    label: "Recuperação",
    description: "Meta de recuperação de dispositivos",
    color: "blue",
  },
]

const getColorClasses = (color: string) => {
  switch (color) {
    case "green":
      return {
        card: "bg-green-50/50 border-green-100 hover:bg-green-50/80",
        text: "text-green-900",
        heading: "text-green-700",
        description: "text-green-600/90",
        timeline: "bg-green-600",
        shadow: "rgba(0, 128, 0, 0.4)",
      }
    case "yellow":
      return {
        card: "bg-yellow-50/50 border-yellow-100 hover:bg-yellow-50/80",
        text: "text-yellow-900",
        heading: "text-yellow-700",
        description: "text-yellow-600/90",
        timeline: "bg-yellow-500",
        shadow: "rgba(255, 204, 0, 0.4)",
      }
    case "blue":
      return {
        card: "bg-blue-50/50 border-blue-100 hover:bg-blue-50/80",
        text: "text-blue-900",
        heading: "text-blue-700",
        description: "text-blue-600/90",
        timeline: "bg-blue-600",
        shadow: "rgba(0, 0, 255, 0.4)",
      }
    default:
      return {
        card: "bg-green-50/50 border-green-100 hover:bg-green-50/80",
        text: "text-green-900",
        heading: "text-green-700",
        description: "text-green-600/90",
        timeline: "bg-green-600",
        shadow: "rgba(0, 128, 0, 0.4)",
      }
  }
}

const BrazilRobberyStats: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-center mb-12"
          >
            <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
              Estatísticas de Roubos no Brasil
            </span>
          </motion.h1>

          {/* Timeline Container */}
          <div className="relative px-4 md:px-24">
            {/* Anos */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 md:px-8">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-green-700 text-xl md:text-3xl font-bold -translate-x-4 md:-translate-x-24"
              >
                2024
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-blue-700 text-xl md:text-3xl font-bold translate-x-4 md:translate-x-24"
              >
                2025
              </motion.span>
            </div>

            {/* Cards e Timeline */}
            <div className="relative">
              {/* Cards Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
                {timelineStats.map((stat, index) => {
                  const colors = getColorClasses(stat.color)

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Card
                        className={`backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300 ${colors.card}`}
                      >
                        <CardContent className="p-4 md:p-6 text-center">
                          <p className={`text-2xl md:text-3xl font-bold mb-1 md:mb-2 ${colors.text}`}>{stat.value}</p>
                          <h3 className={`text-sm md:text-base font-medium mb-1 ${colors.heading}`}>{stat.label}</h3>
                          <p className={`text-xs leading-snug ${colors.description}`}>{stat.description}</p>
                        </CardContent>
                      </Card>

                      {/* Linha vertical de conexão */}
                      <div className="absolute bottom-0 left-1/2 w-px h-12 bg-gradient-to-b from-green-200 via-yellow-200 to-blue-200 translate-y-full -translate-x-px" />

                      {/* Ponto na timeline */}
                      <div
                        className={`absolute bottom-0 left-1/2 w-3 h-3 ${colors.timeline} rounded-full shadow-glow -translate-x-1.5 translate-y-[2.75rem]`}
                        style={{ boxShadow: `0 0 10px ${colors.shadow}` }}
                      />
                    </motion.div>
                  )
                })}
              </div>

              {/* Linha horizontal da timeline */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 translate-y-12" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center text-gray-600 text-sm mt-20 flex items-center justify-center"
          >
            <span className="mr-2">Fonte: Dados baseados em estatísticas do Fórum Brasileiro de Segurança Pública</span>
            <span className="text-lg">🇧🇷</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BrazilRobberyStats

