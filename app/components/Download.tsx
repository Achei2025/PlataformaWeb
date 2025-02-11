import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { FaApple, FaAndroid } from "react-icons/fa"

export default function Download() {
  return (
    <section id="download" className="bg-white min-h-screen flex items-center font-montserrat">
    <div className="min-h-screen bg-white flex items-center justify-center font-montserrat">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">Baixe Nosso Aplicativo</h1>
        <p className="text-xl mb-8 text-gray">Tenha segurança na palma da sua mão. Baixe agora para Android ou iOS.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button className="bg-black text-white hover:bg-black/90 font-bold text-lg py-6 px-8 flex items-center">
            <FaApple className="mr-2" size={24} />
            Download para iOS
          </Button>
          <Button className="bg-green text-white hover:bg-green/90 font-bold text-lg py-6 px-8 flex items-center">
            <FaAndroid className="mr-2" size={24} />
            Download para Android
          </Button>
        </div>
        <div className="mt-12">
          <Image
            src="/placeholder.svg?height=300&width=600"
            alt="App Preview"
            width={600}
            height={300}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </div>
    </section>
  )
}

