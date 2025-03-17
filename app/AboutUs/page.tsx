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

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import DefaultLayout from "../layouts/layout"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  Shield,
  Smartphone,
  FileCheck,
  Clock,
  Lock,
  Bell,
  Users,
  Share2,
  MessageSquare,
  Map,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

// Cores do Brasil
const brazilGreen = "#009c3b"
const brazilYellow = "#ffdf00"
const brazilBlue = "#002776"
const brazilWhite = "#ffffff"

export default function AboutUs() {
  const advantages = [
    {
      category: "Prevenção",
      items: [
        {
          icon: <Shield className="w-6 h-6 text-[#009c3b]" />,
          title: "Registro Preventivo",
          description: "Catalogue seus itens antes que algo aconteça, com fotos, descrições e números de série",
        },
        {
          icon: <Smartphone className="w-6 h-6 text-[#009c3b]" />,
          title: "Acesso Fácil",
          description: "Informações dos seus itens sempre à mão, em qualquer dispositivo, a qualquer momento",
        },
      ],
    },
    {
      category: "Ação Rápida",
      items: [
        {
          icon: <FileCheck className="w-6 h-6 text-[#ffdf00]" />,
          title: "BO Simplificado",
          description: "Processo simplificado para registrar ocorrências com todos os detalhes já preenchidos",
        },
        {
          icon: <Clock className="w-6 h-6 text-[#ffdf00]" />,
          title: "Resposta Imediata",
          description: "Aja rapidamente em caso de roubo ou perda, compartilhando alertas com a comunidade",
        },
      ],
    },
    {
      category: "Segurança",
      items: [
        {
          icon: <Lock className="w-6 h-6 text-[#002776]" />,
          title: "Dados Protegidos",
          description: "Suas informações seguras e criptografadas, com controle total sobre o que é compartilhado",
        },
        {
          icon: <Bell className="w-6 h-6 text-[#002776]" />,
          title: "Alertas",
          description: "Notificações sobre itens similares recuperados na sua região ou comunidade",
        },
      ],
    },
  ]

  const socialFeatures = [
    {
      icon: <Users className="w-10 h-10 text-[#009c3b]" />,
      title: "Comunidade Vigilante",
      description:
        "Conecte-se com pessoas da sua região para criar uma rede de proteção mútua e compartilhar alertas locais.",
    },
    {
      icon: <Share2 className="w-10 h-10 text-[#ffdf00]" />,
      title: "Compartilhamento Seguro",
      description:
        "Compartilhe alertas de itens perdidos ou roubados anonimamente e também com as pessoas ou grupos que você escolher.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-[#002776]" />,
      title: "Comunicação Direta",
      description: "Troque mensagens com pessoas que encontraram seus itens ou que têm informações relevantes.",
    },
    {
      icon: <Map className="w-10 h-10 text-[#009c3b]" />,
      title: "Mapa de Ocorrências",
      description: "Visualize áreas com maior incidência de roubos e perdas para aumentar sua vigilância.",
    },
  ]

  const statistics = [
    { value: "78%", label: "Aumento na chance de recuperação" },
    { value: "9min", label: "Tempo médio para criar alerta" },
    { value: "50k+", label: "Usuários ativos" },
    { value: "10000+", label: "Avisos criados todos os dias" },
  ]

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Usuário desde 2025",
      content:
        "Recuperei meu notebook graças à comunidade. Alguém viu meu alerta e reconheceu o item sendo vendido online.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Ana Martins",
      role: "Usuária desde 2025",
      content:
        "O registro preventivo me salvou quando perdi minha carteira. Tinha todos os documentos catalogados e foi muito mais fácil resolver tudo.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Roberto Almeida",
      role: "Usuário desde 2024",
      content:
        "O mapa de ocorrências me ajudou a evitar áreas de risco. Mudei minha rota diária e me sinto muito mais seguro agora.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    
  <DefaultLayout>
    <section className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative text-white py-20 bg-[#002776]/80 bg-blend-overlay border-b-[5px] border-[#ffdf00]"
        style={{
          backgroundImage: "url('/image/mapmarked.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 bg-[#009c3b] text-white border-white/20">
              Sua segurança em primeiro lugar
            </Badge>
            <h1 className="text-2xl md:text-5xl font-bold mb-6 text-[#ffdf00] drop-shadow-md">Proteja o que é seu</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
              Uma plataforma social que revoluciona a forma como você protege, registra e recupera seus bens
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/Download" passHref>
                <Button size="lg" className="bg-[#ffdf00] text-[#002776] font-bold hover:bg-[#e6c800]">
                  Baixe Agora
                </Button>
              </Link>
              <Link href="/Register" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-[#ffdf00] text-[#ffdf কিন্ত0] hover:bg-[#ffdf00]/20 hover:text-white"
                >
                  Cadastre-se
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-none shadow hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{
                borderTop: `4px solid ${index % 2 === 0 ? brazilGreen : index === 1 ? brazilYellow : brazilBlue}`,
              }}
            >
              <CardContent className="pt-6">
                <p className="text-3xl md:text-4xl font-bold text-[#002776] mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Mission and Vision Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="mission">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#002776]/10 p-1 rounded-lg">
              <TabsTrigger value="mission" className="data-[state=active]:bg-[#009c3b] data-[state=active]:text-white">
                Nossa Missão
              </TabsTrigger>
              <TabsTrigger value="vision" className="data-[state=active]:bg-[#009c3b] data-[state=active]:text-white">
                Nossa Visão
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mission">
              <Card className="border-l-4 border-l-[#009c3b]">
                <CardHeader className="border-b-2 border-[#009c3b]/20">
                  <CardTitle className="text-2xl font-semibold text-[#009c3b]">Nossa Missão</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">
                    Nossa missão é empoderar os cidadãos com uma ferramenta inovadora que simplifica o registro e a
                    proteção de bens pessoais, proporcionando tranquilidade e agilidade em momentos de adversidade.
                  </p>
                  <p className="text-gray-700">
                    Buscamos criar uma comunidade mais segura e preparada, onde cada indivíduo tem o controle e o
                    suporte necessários para proteger o que é seu, facilitando a recuperação em casos de perda ou roubo
                    através do poder da colaboração social.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vision">
              <Card className="border-l-4 border-l-[#ffdf00]">
                <CardHeader className="border-b-2 border-[#ffdf00]/20">
                  <CardTitle className="text-2xl font-semibold text-[#002776]">Nossa Visão</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">
                    Visualizamos um futuro onde o registro preventivo de bens é uma prática comum e acessível a todos,
                    reduzindo significativamente o impacto de roubos e perdas na vida das pessoas.
                  </p>
                  <p className="text-gray-700">
                    Aspiramos ser a plataforma de referência que une cidadãos, autoridades e comunidades em um
                    ecossistema colaborativo, utilizando tecnologia de ponta para criar um ambiente mais seguro e
                    resiliente para todos, onde a força da comunidade multiplica a proteção individual.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* Social Network Features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-2 bg-[#ffdf00] text-[#002776] font-bold">
              Rede Social de Proteção
            </Badge>
            <h2 className="text-3xl font-bold text-[#009c3b] mb-8 relative">
              O Poder da Comunidade
              <span className="block w-20 h-1 bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776] mx-auto mt-2 rounded"></span>
            </h2>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              Mais que um app de registro, somos uma rede social focada em segurança e proteção mútua
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialFeatures.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold mb-2 text-[#002776] text-center">{feature.title}</h4>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* App Advantages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#009c3b] mb-8 text-center relative">
            Por Que Usar Nosso App?
            <span className="block w-20 h-1 bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776] mx-auto mt-2 rounded"></span>
          </h2>

          {advantages.map((category, index) => (
            <div key={index} className="mb-10">
              <h3 className="text-2xl font-semibold text-[#002776] mb-4 border-l-4 border-[#ffdf00] pl-3">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="border-none shadow-sm hover:shadow transition-all duration-300 bg-white"
                  >
                    <CardContent className="p-6 flex">
                      <div className="mr-4 p-3 bg-[#009c3b]/10 rounded-full flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2 text-[#002776]">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-2 bg-[#ffdf00] text-[#002776] font-bold">
              Processo Simplificado
            </Badge>
            <h2 className="text-3xl font-bold text-[#009c3b] mb-8 relative">
              Como Funciona
              <span className="block w-20 h-1 bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776] mx-auto mt-2 rounded"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md rounded-xl overflow-hidden relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#009c3b] after:via-[#ffdf00] after:to-[#002776]">
              <div className="absolute -top-2.5 -left-2.5 w-12 h-12 rounded-full bg-[#009c3b] text-white flex items-center justify-center font-bold text-xl border-3 border-white shadow-md">
                1
              </div>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <Shield className="w-12 h-12 text-[#009c3b]" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-[#002776]">Registre seus itens</h4>
                <p className="text-gray-600 text-center">
                  Cadastre seus pertences com fotos, descrições, números de série e documentos relacionados.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md rounded-xl overflow-hidden relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#009c3b] after:via-[#ffdf00] after:to-[#002776]">
              <div className="absolute -top-2.5 -left-2.5 w-12 h-12 rounded-full bg-[#ffdf00] text-[#002776] flex items-center justify-center font-bold text-xl border-3 border-white shadow-md">
                2
              </div>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <AlertTriangle className="w-12 h-12 text-[#ffdf00]" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-[#002776]">Reporte ocorrências</h4>
                <p className="text-gray-600 text-center">
                  Em caso de perda ou roubo, crie um alerta com todas as informações já preenchidas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md rounded-xl overflow-hidden relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#009c3b] after:via-[#ffdf00] after:to-[#002776]">
              <div className="absolute -top-2.5 -left-2.5 w-12 h-12 rounded-full bg-[#002776] text-white flex items-center justify-center font-bold text-xl border-3 border-white shadow-md">
                3
              </div>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <CheckCircle className="w-12 h-12 text-[#002776]" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-[#002776]">Recupere com a comunidade</h4>
                <p className="text-gray-600 text-center">
                  A comunidade ajuda a localizar seus itens através de alertas e notificações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-2 bg-[#ffdf00] text-[#002776] font-bold">
              Histórias Reais
            </Badge>
            <h2 className="text-3xl font-bold text-[#009c3b] mb-8 relative">
              O Que Dizem Nossos Usuários
              <span className="block w-20 h-1 bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776] mx-auto mt-2 rounded"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none bg-gradient-to-br from-white to-[#009c3b]/5 border-l-4 border-l-[#009c3b]"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-4 border-2 border-[#009c3b]">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-[#002776] text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#002776]">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600 relative pl-4 before:content-[open-quote] before:absolute before:left-0 before:top-[-0.5rem] before:text-4xl before:text-[#009c3b] before:font-serif">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Call to Action */}
        <Card className="border-none bg-gradient-to-br from-white to-[#002776]/5 shadow-xl relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-gradient-to-r before:from-[#009c3b] before:from-[33%] before:via-[#ffdf00] before:via-[33%] before:via-[66%] before:to-[#002776] before:to-[66%]">
          <CardContent className="p-10 text-center">
            <h3 className="text-4xl font-bold mb-6 text-[#002776]">Esteja Preparado</h3>
            <p className="text-lg leading-7 text-gray-600 mb-8 max-w-3xl mx-auto">
              Ao registrar seus itens em nosso app, você está dando um passo importante para proteger seus bens e
              facilitar sua recuperação em caso de perda ou roubo. Não espere que algo aconteça para agir. Comece agora
              a catalogar seus pertences e tenha a tranquilidade de saber que está preparado para qualquer
              eventualidade, com o apoio de uma comunidade inteira.
            </p>
            <Button size="lg" className="bg-[#009c3b] text-white font-bold hover:bg-[#007c2f]">
              Cadastre-se Gratuitamente
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
    </DefaultLayout>
  )
}

