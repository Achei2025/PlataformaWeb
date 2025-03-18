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

import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { FaApple, FaAndroid, FaCheck, FaStar, FaShieldAlt, FaMapMarkerAlt, FaBell, FaUsers } from "react-icons/fa"
import { MdSecurity, MdSpeed } from "react-icons/md"
import DefaultLayout from "../layouts/layout"

// Cores da bandeira brasileira
const brColors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  white: "#ffffff",
}

export default function Download() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-16">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side content */}
            <div className="lg:w-1/2 max-w-xl pt-28">
            <div className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 font-medium mb-6 shadow-sm">
              App Vantagem 🔥
            </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                Segurança ao Seu <span style={{ color: brColors.green }}>Alcance</span>
              </h1>

              <p className="text-lg mb-8 text-gray-600">
                Conecte-se com a força policial e recupere seus itens perdidos ou roubados. Nosso aplicativo oferece uma
                interface intuitiva para você reportar incidentes e fazer parte de uma comunidade mais segura.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center">
                  <div style={{ backgroundColor: brColors.green }} className="rounded-full p-1.5 mr-3 shadow-sm">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-gray-700 font-medium">Comunicação Direta</span>
                </div>
                <div className="flex items-center">
                  <div style={{ backgroundColor: brColors.yellow }} className="rounded-full p-1.5 mr-3 shadow-sm">
                    <FaCheck className="text-gray-800 text-xs" />
                  </div>
                  <span className="text-gray-700 font-medium">Comunidade Vigilante</span>
                </div>
                <div className="flex items-center">
                  <div style={{ backgroundColor: brColors.blue }} className="rounded-full p-1.5 mr-3 shadow-sm">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-gray-700 font-medium">Rastreamento Eficiente</span>
                </div>
                <div className="flex items-center">
                  <div style={{ backgroundColor: brColors.green }} className="rounded-full p-1.5 mr-3 shadow-sm">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-gray-700 font-medium">Interface Intuitiva</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="text-white font-medium text-base py-6 px-6 flex items-center justify-center shadow-md transition-all hover:shadow-lg hover:opacity-90"
                  style={{ backgroundColor: brColors.green }}
                >
                  <FaApple className="mr-2" size={20} />
                  Download para iOS
                </Button>
                <Button
                  className="text-gray-900 font-medium text-base py-6 px-6 flex items-center justify-center shadow-md transition-all hover:shadow-lg hover:opacity-90"
                  style={{ backgroundColor: brColors.yellow }}
                >
                  <FaAndroid className="mr-2" size={20} />
                  Download para Android
                </Button>
              </div>

              {/* App Rating */}
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <div className="flex mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} style={{ color: brColors.yellow }} className="text-xl" />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-800">4.9/5.0</p>
                  <p className="text-sm text-gray-500">Baseado em mais de 1.000 avaliações</p>
                </div>
              </div>
            </div>

            {/* Right side phone mockup - Removido o quadrado */}
            <div className="lg:w-1/2 flex justify-center relative">
              <div className="absolute w-80 h-80 bg-green-100 rounded-full -z-10 opacity-70 blur-xl"></div>
              <div className="relative">
                <Image
                  src="/image/Downloadsmartphone1.png"
                  alt="App Preview"
                  width={300}
                  height={600}
                  className="w-auto h-auto"
                  priority
                />

                {/* Floating badges */}
                <div className="absolute -right-16 top-20 bg-white p-3 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <FaShieldAlt style={{ color: brColors.green }} className="mr-2" size={18} />
                    <span className="font-medium text-sm">Segurança Garantida</span>
                  </div>
                </div>

                <div className="absolute -left-16 top-1/3 bg-white p-3 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <FaMapMarkerAlt style={{ color: brColors.blue }} className="mr-2" size={18} />
                    <span className="font-medium text-sm">Localização Precisa</span>
                  </div>
                </div>

                <div className="absolute -right-16 bottom-1/3 bg-white p-3 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <FaBell style={{ color: brColors.yellow }} className="mr-2" size={18} />
                    <span className="font-medium text-sm">Alertas em Tempo Real</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nosso aplicativo foi desenvolvido com foco na segurança e facilidade de uso, oferecendo ferramentas
              essenciais para proteger seus pertences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-green-50 p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(0, 156, 59, 0.2)" }}
              >
                <MdSecurity style={{ color: brColors.green }} className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proteção Avançada</h3>
              <p className="text-gray-600">
                Registre seus objetos de valor com fotos, descrições e números de série para facilitar a recuperação em
                caso de perda ou roubo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-yellow-50 p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(255, 223, 0, 0.2)" }}
              >
                <MdSpeed style={{ color: brColors.yellow }} className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resposta Rápida</h3>
              <p className="text-gray-600">
                Comunique-se diretamente com as autoridades e receba atualizações em tempo real sobre o status do seu
                caso.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(0, 39, 118, 0.2)" }}
              >
                <FaUsers style={{ color: brColors.blue }} className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comunidade Segura</h3>
              <p className="text-gray-600">
                Participe de uma rede de usuários vigilantes que ajudam a identificar objetos roubados e aumentar as
                chances de recuperação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Corrigido o problema das setas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Em apenas três passos simples, você pode começar a proteger seus pertences e se conectar com a comunidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-20 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute left-0 top-1/2 w-full h-0.5 -translate-y-1/2 -z-10">
              <div className="relative w-full h-full">
                <div className="absolute w-1/3 h-full left-[16.66%]" style={{ backgroundColor: brColors.yellow }}></div>
                <div className="absolute w-1/3 h-full right-[16.66%]" style={{ backgroundColor: brColors.green }}></div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
                style={{ backgroundColor: brColors.green }}
              >
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Baixe o Aplicativo</h3>
              <p className="text-gray-600">
                Instale o aplicativo em seu dispositivo iOS ou Android e crie sua conta em poucos minutos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4"
                style={{ backgroundColor: brColors.yellow, color: "#333" }}
              >
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Registre Seus Objetos</h3>
              <p className="text-gray-600">
                Adicione informações detalhadas sobre seus pertences, incluindo fotos e números de identificação.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
                style={{ backgroundColor: brColors.blue }}
              >
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Fique Protegido</h3>
              <p className="text-gray-600">
                Em caso de perda ou roubo, reporte o incidente pelo app e acompanhe o processo de recuperação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{ background: `linear-gradient(to right, ${brColors.green}, ${brColors.blue})` }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Baixe agora o aplicativo e junte-se a milhares de usuários que já estão protegendo seus pertences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="font-medium text-base py-6 px-8 flex items-center justify-center shadow-md transition-all hover:shadow-lg"
              style={{ backgroundColor: brColors.white, color: brColors.green }}
            >
              <FaApple className="mr-2" size={20} />
              Download para iOS
            </Button>
            <Button
              className="font-medium text-base py-6 px-8 flex items-center justify-center shadow-md transition-all hover:shadow-lg"
              style={{ backgroundColor: brColors.yellow, color: brColors.blue }}
            >
              <FaAndroid className="mr-2" size={20} />
              Download para Android
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

