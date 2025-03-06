"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { User, Shield, Smartphone, Laptop, Car, BadgeHelp } from "lucide-react"

export default function Hero() {
  const [animatedIcons, setAnimatedIcons] = useState<boolean>(false)

  useEffect(() => {
    setAnimatedIcons(true)
  }, [])

  // Define icons with better positioning to avoid text overlap
  const icons = [
    {
      Icon: User,
      label: "Cidadão",
      position: "-top-12 -left-12",
      color: "text-blue-600",
      size: 28,
      animation: "animate-float",
    },
    {
      Icon: Shield,
      label: "Policial",
      position: "-top-12 -right-12",
      color: "text-green-600",
      size: 28,
      animation: "animate-float-reverse",
    },
    {
      Icon: Smartphone,
      label: "Celular",
      position: "-bottom-12 -right-12",
      color: "text-yellow-500",
      size: 28,
      animation: "animate-float",
    },
    {
      Icon: Laptop,
      label: "Notebook",
      position: "-bottom-12 -left-12",
      color: "text-blue-400",
      size: 28,
      animation: "animate-float-reverse",
    },
    {
      Icon: Car,
      label: "Carro",
      position: "-left-16 top-1/2 -translate-y-1/2",
      color: "text-green-500",
      size: 28,
      animation: "animate-float",
    },
    {
      Icon: BadgeHelp,
      label: "Suporte",
      position: "-right-16 top-1/2 -translate-y-1/2",
      color: "text-yellow-600",
      size: 28,
      animation: "animate-float-reverse",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center bg-white">
      {/* Diagonal stripes background */}
      <div
        className="absolute top-[-20%] right-[-30%] w-[150%] h-[250%] transform -rotate-[5deg] z-0"
        style={{
          background: `linear-gradient(
            -45deg,
            transparent 0%,
            transparent 47%,
            #FFD600 47%,
            #FFD600 51%,
            #4CAF50 51%,
            #4CAF50 55%,
            #2196F3 55%,
            #2196F3 59%,
            transparent 59%,
            transparent 100%
          )`,
        }}
      />

      {/* Content section */}
      <div className="relative z-1 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:pl-4 relative">
            {/* Floating icons around the text content but not overlapping */}
            <div
              className={`absolute inset-0 z-10 pointer-events-none ${
                animatedIcons ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
            >
              {icons.map(({ Icon, position, color, size, animation, label }, index) => (
                <div key={index} className={`absolute ${position}`}>
                  <div className="relative">
                    <Icon className={`${color} ${animation}`} size={size} />
                    <span className="sr-only">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Text content */}
            <div className="relative z-20">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                Segurança em <span className="text-green-600">Primeiro Lugar</span>
              </h1>
              <p className="mb-6 text-gray-800 text-base md:text-xl">
                Protegemos o que é mais importante para você. Nossa tecnologia de ponta garante a segurança dos seus
                dados e a tranquilidade que você merece.
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  size="lg"
                >
                  Saiba Mais
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-all duration-300"
                  size="lg"
                >
                  Contato
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="relative h-[500px] md:h-[900px] w-[200%] -ml-[80%] -mb-[20%] rounded-lg overflow-hidden z-2">
              <Image
                src="/image/example1.png"
                alt="Segurança Digital"
                width={1920}
                height={1080}
                className="object-cover"
                priority
              />
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
    </div>
  )
}

