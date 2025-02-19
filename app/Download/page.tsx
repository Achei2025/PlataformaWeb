"use client"

import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { FaApple, FaAndroid, FaShieldAlt, FaUsers, FaSearch } from "react-icons/fa"

export default function Download() {
  return (
    <section
      id="download"
      className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex items-center font-montserrat"
    >
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900">Segurança ao Seu Alcance</h1>
        <p className="text-xl mb-12 text-gray-700 max-w-2xl mx-auto">
          Conecte-se com a força policial e recupere seus itens perdidos ou roubados. Baixe agora nosso aplicativo e
          faça parte de uma comunidade mais segura.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
          <Button className="bg-black text-white hover:bg-black/90 font-bold text-lg py-6 px-8 flex items-center justify-center w-full md:w-auto">
            <FaApple className="mr-2" size={24} />
            Download para iOS
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700 font-bold text-lg py-6 px-8 flex items-center justify-center w-full md:w-auto">
            <FaAndroid className="mr-2" size={24} />
            Download para Android
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaShieldAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Comunicação Direta</h3>
            <p className="text-gray-600">
              Conecte-se instantaneamente com as autoridades locais para relatar incidentes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUsers className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Comunidade Vigilante</h3>
            <p className="text-gray-600">Junte-se a uma rede de cidadãos ativos na prevenção e solução de crimes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaSearch className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Rastreamento Eficiente</h3>
            <p className="text-gray-600">
              Utilize tecnologia avançada para aumentar as chances de recuperar seus itens.
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Preview do Aplicativo"
            width={800}
            height={400}
            className="rounded-xl shadow-2xl mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-20 rounded-xl"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white text-left">
            <h3 className="text-2xl font-bold mb-2">Interface Intuitiva</h3>
            <p className="text-sm">Navegue facilmente e acesse todas as funcionalidades com poucos toques.</p>
          </div>
        </div>

        <p className="mt-8 text-gray-600">
          Junte-se a milhares de usuários que já estão fazendo a diferença em suas comunidades. Baixe agora e contribua
          para uma sociedade mais segura!
        </p>
      </div>
    </section>
  )
}

