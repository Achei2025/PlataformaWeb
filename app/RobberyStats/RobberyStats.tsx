"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { useSpring, animated, config } from "@react-spring/web"
import { ChevronDown, ChevronUp } from "lucide-react"

const stats = [
  {
    title: "Roubos de Celular",
    value: 65,
    unit: "%",
    description: "dos roubos envolvem smartphones",
    text: "A maioria dos roubos hoje em dia tem como alvo smartphones, tornando-os um dos itens mais visados por criminosos.",
  },
  {
    title: "Recuperação",
    value: 22,
    unit: "%",
    description: "dos dispositivos roubados são recuperados",
    text: "Infelizmente, apenas uma pequena parcela dos dispositivos roubados é recuperada, deixando muitas vítimas sem seus pertences.",
  },
  {
    title: "Perda Financeira",
    value: 1.2,
    unit: "B",
    description: "prejuízo anual devido a roubos",
    text: "O impacto financeiro dos roubos de celulares é significativo, causando bilhões em prejuízos anualmente para a sociedade.",
  },
  {
    title: "Risco de Dados",
    value: 78,
    unit: "%",
    description: "das vítimas têm dados pessoais comprometidos",
    text: "Além da perda material, a maioria das vítimas enfrenta o risco de ter seus dados pessoais expostos ou utilizados indevidamente.",
  },
]

const AnimatedValue = ({ value, unit, isVisible }: { value: number; unit: string; isVisible: boolean }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: isVisible ? value : 0 },
    config: { ...config.molasses, duration: 2000 },
    reset: true,
  })

  return (
    <animated.span>
      {number.to((n) => {
        if (unit === "B") {
          return `R$ ${n.toFixed(1)}${unit}`
        }
        return `${n.toFixed(0)}${unit}`
      })}
    </animated.span>
  )
}

const StatCard = ({ stat, isVisible }: { stat: (typeof stats)[0]; isVisible: boolean }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{stat.title}</h3>
        <p className="text-5xl font-bold text-blue-600 mb-4">
          <AnimatedValue value={stat.value} unit={stat.unit} isVisible={isVisible} />
        </p>
        <p className="text-xl text-gray-600 mb-4">{stat.description}</p>
        <p className="text-lg text-gray-700">{stat.text}</p>
      </CardContent>
    </Card>
  )
}

export default function RobberyStatsFixed() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (direction: "up" | "down") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "down" && prevIndex < stats.length - 1) {
        return prevIndex + 1
      } else if (direction === "up" && prevIndex > 0) {
        return prevIndex - 1
      }
      return prevIndex
    })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        handleScroll("down")
      } else if (event.key === "ArrowUp") {
        handleScroll("up")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, []) // Removed handleScroll from dependencies

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col justify-center items-center relative">
      {currentIndex === 0 && (
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">A Realidade dos Roubos</h2>
      )}
      <div className="flex-1 flex items-center justify-center">
        <StatCard stat={stats[currentIndex]} isVisible={true} />
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <button
          onClick={() => handleScroll("up")}
          className={`mb-4 ${currentIndex === 0 ? "invisible" : ""}`}
          aria-label="Scroll Up"
        >
          <ChevronUp className="w-8 h-8 text-gray-400 hover:text-gray-600" />
        </button>
        <div className="flex space-x-2 mb-4">
          {stats.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
        <button
          onClick={() => handleScroll("down")}
          className={`${currentIndex === stats.length - 1 ? "invisible" : ""}`}
          aria-label="Scroll Down"
        >
          <ChevronDown className="w-8 h-8 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  )
}

