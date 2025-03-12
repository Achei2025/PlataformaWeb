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
import { Shield, Bell, MapPin, Smartphone, Lock, Users } from "lucide-react"

const platformFeatures = [
  {
    icon: <Shield className="h-6 w-6 text-green-600" />,
    title: "Proteção Inteligente",
    description: "Sistema de alerta que identifica padrões suspeitos e previne roubos.",
  },
  {
    icon: <Bell className="h-6 w-6 text-yellow-600" />,
    title: "Alertas em Tempo Real",
    description: "Notificações instantâneas sobre atividades suspeitas na sua região.",
  },
  {
    icon: <MapPin className="h-6 w-6 text-blue-600" />,
    title: "Mapeamento de Zonas",
    description: "Identificação de áreas com maior incidência de ocorrências.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-green-600" />,
    title: "Rastreamento",
    description: "Localização e bloqueio remoto de aparelhos em caso de roubo.",
  },
  {
    icon: <Lock className="h-6 w-6 text-yellow-600" />,
    title: "Proteção de Dados",
    description: "Criptografia avançada que protege suas informações pessoais.",
  },
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: "Rede Colaborativa",
    description: "Comunidade que compartilha informações para aumentar a segurança.",
  },
]

const PlatformSolution: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center bg-white">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-3"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Por que usar nosso app 🇧🇷
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
              Nossa Plataforma é Perfeita para
              <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Indivíduos, Startups e Empresas
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left Features */}
            <div className="space-y-4 md:space-y-6">
              {platformFeatures.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white hover:bg-gray-50 transition-all duration-300 border-none shadow-sm hover:shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center"
            >
              <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200 rounded-full blur-3xl opacity-20" />
              <img
                src="/image/centersmart.png"
                alt="App Preview"
                className="relative z-10 w-full max-w-[280px] mx-auto"
              />
            </motion.div>

            {/* Right Features */}
            <div className="space-y-4 md:space-y-6">
              {platformFeatures.slice(3).map((feature, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white hover:bg-gray-50 transition-all duration-300 border-none shadow-sm hover:shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default PlatformSolution

