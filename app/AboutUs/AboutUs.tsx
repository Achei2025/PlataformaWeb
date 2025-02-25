import { Card, CardHeader, CardTitle, CardContent } from "/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs"
import { Shield, Smartphone, FileCheck, Clock, Lock, Bell } from "lucide-react"

export default function AboutUs() {
  const advantages = [
    {
      category: "Prevenção",
      items: [
        {
          icon: <Shield className="w-6 h-6 text-blue-600" />,
          title: "Registro Preventivo",
          description: "Catalogue seus itens antes que algo aconteça",
        },
        {
          icon: <Smartphone className="w-6 h-6 text-green-600" />,
          title: "Acesso Fácil",
          description: "Informações dos seus itens sempre à mão",
        },
      ],
    },
    {
      category: "Ação Rápida",
      items: [
        {
          icon: <FileCheck className="w-6 h-6 text-yellow-600" />,
          title: "BO Simplificado",
          description: "Processo simplificado para registrar ocorrências",
        },
        {
          icon: <Clock className="w-6 h-6 text-red-600" />,
          title: "Resposta Imediata",
          description: "Aja rapidamente em caso de roubo ou perda",
        },
      ],
    },
    {
      category: "Segurança",
      items: [
        {
          icon: <Lock className="w-6 h-6 text-purple-600" />,
          title: "Dados Protegidos",
          description: "Suas informações seguras e criptografadas",
        },
        {
          icon: <Bell className="w-6 h-6 text-orange-600" />,
          title: "Alertas",
          description: "Notificações sobre itens similares recuperados",
        },
      ],
    },
  ]

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-primary">Sobre Nós</h1>

        <Tabs defaultValue="mission" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mission">Nossa Missão</TabsTrigger>
            <TabsTrigger value="vision">Nossa Visão</TabsTrigger>
          </TabsList>
          <TabsContent value="mission">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-600">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Nossa missão é empoderar os cidadãos com uma ferramenta inovadora que simplifica o registro e a
                  proteção de bens pessoais, proporcionando tranquilidade e agilidade em momentos de adversidade.
                </p>
                <p className="text-gray-700">
                  Buscamos criar uma comunidade mais segura e preparada, onde cada indivíduo tem o controle e o suporte
                  necessários para proteger o que é seu, facilitando a recuperação em casos de perda ou roubo.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="vision">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-yellow-600">Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Visualizamos um futuro onde o registro preventivo de bens é uma prática comum e acessível a todos,
                  reduzindo significativamente o impacto de roubos e perdas na vida das pessoas.
                </p>
                <p className="text-gray-700">
                  Aspiramos ser a plataforma de referência que une cidadãos, autoridades e comunidades em um ecossistema
                  colaborativo, utilizando tecnologia de ponta para criar um ambiente mais seguro e resiliente para
                  todos.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Por Que Usar Nosso App?</h2>

        {advantages.map((category, index) => (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-primary">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item, itemIndex) => (
                <Card key={itemIndex}>
                  <CardContent className="flex items-start p-6">
                    <div className="mr-4">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Esteja Preparado</h3>
            <p className="text-gray-700">
              Ao registrar seus itens em nosso app, você está dando um passo importante para proteger seus bens e
              facilitar sua recuperação em caso de perda ou roubo. Não espere que algo aconteça para agir. Comece agora
              a catalogar seus pertences e tenha a tranquilidade de saber que está preparado para qualquer
              eventualidade.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

