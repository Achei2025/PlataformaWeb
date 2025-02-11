import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card"

export default function AboutUs() {
  return (
    <section id="about" className="bg-gray min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Sobre Nós</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="border-l-4 border-l-green">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green">Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black">
                Nossa missão é proporcionar soluções de segurança inovadoras e confiáveis,
                protegendo nossos clientes contra as ameaças digitais em constante evolução.
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-yellow">Nossa Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black">
                Aspiramos ser líderes globais em segurança digital, criando um mundo onde
                as pessoas e as organizações possam prosperar sem medo de ameaças cibernéticas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}