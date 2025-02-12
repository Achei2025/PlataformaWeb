import Image from "next/image"
import { Button } from "@/app/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Segurança em <span className="text-green">Primeiro Lugar</span>
          </h1>
          <p className="text-xl mb-8 text-gray">
            Protegemos o que é mais importante para você. Nossa tecnologia de ponta garante a segurança dos seus dados e
            a tranquilidade que você merece.
          </p>
          <Button className="bg-yellow text-black hover:bg-yellow/90 font-bold">Saiba Mais</Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Segurança Digital"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

