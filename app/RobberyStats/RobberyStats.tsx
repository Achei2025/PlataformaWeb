"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { useInView } from "react-intersection-observer"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import { useSpring, animated, config } from "@react-spring/web"

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

const AnimatedValue = ({ value, unit, inView }: { value: number; unit: string; inView: boolean }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: inView ? value : 0 },
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

const StatCard = ({ stat }: { stat: (typeof stats)[0] }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    } else if (!inView && hasAnimated) {
      setHasAnimated(false)
    }
  }, [inView, hasAnimated])

  return (
    <Parallax speed={-5}>
      <section
        ref={ref}
        className={`min-h-screen flex items-center justify-center transition-opacity duration-500 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{stat.title}</h3>
            <p className="text-5xl font-bold text-blue-600 mb-4">
              <AnimatedValue value={stat.value} unit={stat.unit} inView={inView && hasAnimated} />
            </p>
            <p className="text-xl text-gray-600 mb-4">{stat.description}</p>
            <p className="text-lg text-gray-700">{stat.text}</p>
          </CardContent>
        </Card>
      </section>
    </Parallax>
  )
}

export default function RobberyStatsScroll() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <ParallaxProvider>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100">
        <section className="min-h-screen flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800">A Realidade dos Roubos</h2>
        </section>
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </ParallaxProvider>
  )
}

