"use client"

import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { FaApple, FaAndroid, FaCheck } from "react-icons/fa"
import DefaultLayout from "../layouts/layout"

export default function Download() {
  return (
    <DefaultLayout>
      <section id="download" className="bg-white min-h-screen flex items-center font-montserrat">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left side content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
                App Vantagem 🔥
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Segurança ao Seu <span className="text-green-600">Alcance</span>
              </h1>

              <p className="text-lg mb-8 text-gray-600 max-w-xl">
                Conecte-se com a força policial e recupere seus itens perdidos ou roubados. Nosso aplicativo oferece uma
                interface intuitiva para você reportar incidentes e fazer parte de uma comunidade mais segura.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-1 mr-3">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700">Comunicação Direta</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-full p-1 mr-3">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700">Comunidade Vigilante</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-500 rounded-full p-1 mr-3">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700">Rastreamento Eficiente</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-1 mr-3">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700">Interface Intuitiva</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 font-medium text-base py-6 px-6 flex items-center justify-center">
                  <FaApple className="mr-2" size={20} />
                  Download para iOS
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700 font-medium text-base py-6 px-6 flex items-center justify-center">
                  <FaAndroid className="mr-2" size={20} />
                  Download para Android
                </Button>
              </div>
            </div>

            {/* Right side phone mockups */}
            <div className="lg:w-1/2 relative">
              <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-yellow-100 rounded-full -z-10 opacity-70"></div>

              <div className="relative h-[600px] w-full">
                {/* Back phone (Android) */}
                <div className="absolute left-20 top-32 transform -rotate-12 z-10">
                  <div className="relative w-[400px]">
                    <Image
                      src="/image/Downloadsmartphone1.png"
                      alt="Android App Preview"
                      width={300}
                      height={600}
                      className="w-full h-auto"
                      style={{
                        filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
                      }}
                    />
                  </div>
                </div>

                {/* Front phone (iPhone) */}
                <div className="absolute right-20 top-32 transform rotate-12 z-20">
                  <div className="relative w-[400px]">
                    <Image
                      src="/image/Downloadsmartphone2.png"
                      alt="iPhone App Preview"
                      width={300}
                      height={600}
                      className="w-full h-auto"
                      style={{
                        filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

