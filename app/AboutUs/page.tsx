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
import styled from "styled-components"
import { motion } from "framer-motion"

// Cores do Brasil
const brazilGreen = "#009c3b"
const brazilYellow = "#ffdf00"
const brazilBlue = "#002776"
const brazilWhite = "#ffffff"

// Properly typed styled components
interface FeatureGridProps {
  $columns?: string
}

interface FeatureCardProps {
  $hoverable?: boolean
}

interface IconWrapperProps {
  $direction?: string
  $padded?: boolean
}

interface FeatureContentProps {
  $direction?: string
}

interface StepNumberProps {
  $color?: string
}

// Styled Components with proper TypeScript interfaces
const Section = styled.section`
  background: linear-gradient(to bottom, ${brazilWhite}, #f3f4f6);
  min-height: 100vh;
`

const HeroSection = styled.div`
  position: relative;
  color: white;
  padding: 5rem 0;
  background-image: url('/image/mapmarked.jpg');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 38, 118, 0.8); /* Azul do Brasil com transparência */
  border-bottom: 5px solid ${brazilYellow};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const HeroContent = styled.div`
  text-align: center;
`

const HeroBadge = styled(Badge)`
  margin-bottom: 1rem;
  background-color: ${brazilGreen};
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
`

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${brazilYellow};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`

const HeroDescription = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 48rem;
  margin: 0 auto 2rem;
  opacity: 0.9;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`

const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
`

const OutlineButton = styled(StyledButton)`
  background-color: transparent;
  border: 2px solid ${brazilYellow};
  color: ${brazilYellow};
  
  &:hover {
    background-color: rgba(255, 223, 0, 0.2);
    color: ${brazilWhite};
  }
`

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background: linear-gradient(to top, ${brazilWhite}, transparent);
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatCard = styled(motion(Card))`
  text-align: center;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-5px);
  }
  
  &:nth-child(1) {
    border-top: 4px solid ${brazilGreen};
  }
  &:nth-child(2) {
    border-top: 4px solid ${brazilYellow};
  }
  &:nth-child(3) {
    border-top: 4px solid ${brazilBlue};
  }
  &:nth-child(4) {
    border-top: 4px solid ${brazilGreen};
  }
`

const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${brazilBlue};
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`

const SectionTitle = styled(motion.h2)`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  color: ${brazilGreen};
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, ${brazilGreen}, ${brazilYellow}, ${brazilBlue});
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`

const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${brazilBlue};
  margin-bottom: 1rem;
  border-left: 4px solid ${brazilYellow};
  padding-left: 0.75rem;
`

const FeatureGrid = styled.div<FeatureGridProps>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: ${(props) => props.$columns || "repeat(2, 1fr)"};
  }
`

const FeatureCard = styled(motion(Card))<FeatureCardProps>`
  border: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  background-color: ${brazilWhite};
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    ${(props) => props.$hoverable && `transform: translateY(-0.25rem);`}
  }
`

const FeatureContent = styled(CardContent)<FeatureContentProps>`
  padding: 1.5rem;
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => (props.$direction === "column" ? "center" : "flex-start")};
  text-align: ${(props) => (props.$direction === "column" ? "center" : "left")};
`

const IconWrapper = styled.div<IconWrapperProps>`
  margin-right: ${(props) => (props.$direction === "column" ? "0" : "1rem")};
  margin-bottom: ${(props) => (props.$direction === "column" ? "1rem" : "0")};
  padding: ${(props) => (props.$padded ? "0.75rem" : "0")};
  background-color: ${(props) => (props.$padded ? "rgba(0, 156, 59, 0.1)" : "transparent")};
  border-radius: ${(props) => (props.$padded ? "9999px" : "0")};
  display: flex;
  justify-content: center;
`

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${brazilBlue};
`

const FeatureDescription = styled.p`
  color: #4b5563;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

const SectionBadge = styled(Badge)`
  margin-bottom: 0.5rem;
  background-color: ${brazilYellow};
  color: ${brazilBlue};
  font-weight: bold;
`

const ProcessCard = styled(FeatureCard)`
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${brazilGreen}, ${brazilYellow}, ${brazilBlue});
  }
`

const StepNumber = styled.div<StepNumberProps>`
  position: absolute;
  top: -0.65rem;
  left: -0.65rem;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: ${(props) => props.$color || brazilBlue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  border: 3px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`

const TestimonialCard = styled(FeatureCard)`
  background: linear-gradient(135deg, ${brazilWhite} 0%, rgba(0, 156, 59, 0.05) 100%);
  border-left: 4px solid ${brazilGreen};
`

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const TestimonialInfo = styled.div`
  
`

const TestimonialName = styled.p`
  font-weight: 600;
  color: ${brazilBlue};
`

const TestimonialRole = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`

const TestimonialContent = styled.p`
  font-style: italic;
  color: #4b5563;
  position: relative;
  padding-left: 1rem;
  
  &:before {
    content: """;
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 2rem;
    color: ${brazilGreen};
    font-family: serif;
  }
`

const CTACard = styled(motion(Card))`
  border: none;
  background: linear-gradient(135deg, ${brazilWhite} 0%, rgba(0, 39, 118, 0.05) 100%);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, ${brazilGreen} 33%, ${brazilYellow} 33%, ${brazilYellow} 66%, ${brazilBlue} 66%);
  }
`

const CTAContent = styled(CardContent)`
  padding: 2.5rem;
  text-align: center;
`

const CTATitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${brazilBlue};
`

const CTADescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 2rem;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`

const BrazilButton = styled(StyledButton)`
  background-color: ${brazilGreen};
  color: ${brazilWhite};
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #007c2f;
  }
`

const YellowButton = styled(StyledButton)`
  background-color: ${brazilYellow};
  color: ${brazilBlue};
  font-weight: bold;
  
  &:hover {
    background-color: #e6c800;
  }
`

const SectionContainer = styled.div`
  margin-bottom: 4rem;
`

// Estilização personalizada para as abas
const StyledTabsList = styled(TabsList)`
  background-color: rgba(0, 39, 118, 0.1);
  padding: 4px;
  border-radius: 0.5rem;
`

const StyledTabsTrigger = styled(TabsTrigger)`
  &[data-state="active"] {
    background-color: ${brazilGreen};
    color: white;
  }
`

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function AboutUs() {
  const advantages = [
    {
      category: "Prevenção",
      items: [
        {
          icon: <Shield className="w-6 h-6" style={{ color: brazilGreen }} />,
          title: "Registro Preventivo",
          description: "Catalogue seus itens antes que algo aconteça, com fotos, descrições e números de série",
        },
        {
          icon: <Smartphone className="w-6 h-6" style={{ color: brazilGreen }} />,
          title: "Acesso Fácil",
          description: "Informações dos seus itens sempre à mão, em qualquer dispositivo, a qualquer momento",
        },
      ],
    },
    {
      category: "Ação Rápida",
      items: [
        {
          icon: <FileCheck className="w-6 h-6" style={{ color: brazilYellow }} />,
          title: "BO Simplificado",
          description: "Processo simplificado para registrar ocorrências com todos os detalhes já preenchidos",
        },
        {
          icon: <Clock className="w-6 h-6" style={{ color: brazilYellow }} />,
          title: "Resposta Imediata",
          description: "Aja rapidamente em caso de roubo ou perda, compartilhando alertas com a comunidade",
        },
      ],
    },
    {
      category: "Segurança",
      items: [
        {
          icon: <Lock className="w-6 h-6" style={{ color: brazilBlue }} />,
          title: "Dados Protegidos",
          description: "Suas informações seguras e criptografadas, com controle total sobre o que é compartilhado",
        },
        {
          icon: <Bell className="w-6 h-6" style={{ color: brazilBlue }} />,
          title: "Alertas",
          description: "Notificações sobre itens similares recuperados na sua região ou comunidade",
        },
      ],
    },
  ]

  const socialFeatures = [
    {
      icon: <Users className="w-10 h-10" style={{ color: brazilGreen }} />,
      title: "Comunidade Vigilante",
      description:
        "Conecte-se com pessoas da sua região para criar uma rede de proteção mútua e compartilhar alertas locais.",
    },
    {
      icon: <Share2 className="w-10 h-10" style={{ color: brazilYellow }} />,
      title: "Compartilhamento Seguro",
      description:
        "Compartilhe alertas de itens perdidos ou roubados anonimamente e também com as pessoas ou grupos que você escolher.",
    },
    {
      icon: <MessageSquare className="w-10 h-10" style={{ color: brazilBlue }} />,
      title: "Comunicação Direta",
      description: "Troque mensagens com pessoas que encontraram seus itens ou que têm informações relevantes.",
    },
    {
      icon: <Map className="w-10 h-10" style={{ color: brazilGreen }} />,
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
    <Section>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroBadge variant="outline">Sua segurança em primeiro lugar</HeroBadge>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Proteja o que é seu
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Uma plataforma social que revoluciona a forma como você protege, registra e recupera seus bens
            </HeroDescription>
            <ButtonGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/Download" passHref>
                <YellowButton size="lg">Baixe Agora</YellowButton>
              </Link>
              <Link href="/Register" passHref>
                <OutlineButton size="lg" variant="outline">
                  Cadastre-se
                </OutlineButton>
              </Link>
            </ButtonGroup>
          </HeroContent>
        </Container>
        <GradientOverlay />
      </HeroSection>

      <ContentContainer>
        {/* Statistics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <StatsGrid>
            {statistics.map((stat, index) => (
              <StatCard key={index} variants={fadeIn} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <CardContent style={{ paddingTop: "1.5rem" }}>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </CardContent>
              </StatCard>
            ))}
          </StatsGrid>
        </motion.div>

        {/* Mission and Vision Tabs */}
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Tabs defaultValue="mission" className="mb-16">
              <StyledTabsList className="grid w-full grid-cols-2 mb-8">
                <StyledTabsTrigger value="mission">Nossa Missão</StyledTabsTrigger>
                <StyledTabsTrigger value="vision">Nossa Visão</StyledTabsTrigger>
              </StyledTabsList>
              <TabsContent value="mission">
                <Card style={{ borderLeft: `4px solid ${brazilGreen}` }}>
                  <CardHeader style={{ borderBottom: `2px solid rgba(0, 156, 59, 0.2)` }}>
                    <CardTitle style={{ fontSize: "1.5rem", fontWeight: 600, color: brazilGreen }}>
                      Nossa Missão
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ padding: "1.5rem" }}>
                    <p style={{ color: "#374151", marginBottom: "1rem" }}>
                      Nossa missão é empoderar os cidadãos com uma ferramenta inovadora que simplifica o registro e a
                      proteção de bens pessoais, proporcionando tranquilidade e agilidade em momentos de adversidade.
                    </p>
                    <p style={{ color: "#374151" }}>
                      Buscamos criar uma comunidade mais segura e preparada, onde cada indivíduo tem o controle e o
                      suporte necessários para proteger o que é seu, facilitando a recuperação em casos de perda ou
                      roubo através do poder da colaboração social.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="vision">
                <Card style={{ borderLeft: `4px solid ${brazilYellow}` }}>
                  <CardHeader style={{ borderBottom: `2px solid rgba(255, 223, 0, 0.2)` }}>
                    <CardTitle style={{ fontSize: "1.5rem", fontWeight: 600, color: brazilBlue }}>
                      Nossa Visão
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ padding: "1.5rem" }}>
                    <p style={{ color: "#374151", marginBottom: "1rem" }}>
                      Visualizamos um futuro onde o registro preventivo de bens é uma prática comum e acessível a todos,
                      reduzindo significativamente o impacto de roubos e perdas na vida das pessoas.
                    </p>
                    <p style={{ color: "#374151" }}>
                      Aspiramos ser a plataforma de referência que une cidadãos, autoridades e comunidades em um
                      ecossistema colaborativo, utilizando tecnologia de ponta para criar um ambiente mais seguro e
                      resiliente para todos, onde a força da comunidade multiplica a proteção individual.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </SectionContainer>

        {/* Social Network Features */}
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader>
              <SectionBadge variant="outline">Rede Social de Proteção</SectionBadge>
              <SectionTitle>O Poder da Comunidade</SectionTitle>
              <p
                style={{
                  color: "#4b5563",
                  marginTop: "0.5rem",
                  maxWidth: "32rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Mais que um app de registro, somos uma rede social focada em segurança e proteção mútua
              </p>
            </SectionHeader>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureGrid $columns="repeat(auto-fit, minmax(250px, 1fr))">
              {socialFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  $hoverable={true}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureContent $direction="column">
                    <IconWrapper $direction="column">{feature.icon}</IconWrapper>
                    <FeatureTitle style={{ textAlign: "center" }}>{feature.title}</FeatureTitle>
                    <FeatureDescription style={{ textAlign: "center" }}>{feature.description}</FeatureDescription>
                  </FeatureContent>
                </FeatureCard>
              ))}
            </FeatureGrid>
          </motion.div>
        </SectionContainer>

        {/* App Advantages */}
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionTitle>Por Que Usar Nosso App?</SectionTitle>
          </motion.div>

          {advantages.map((category, index) => (
            <motion.div
              key={index}
              style={{ marginBottom: "2.5rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionSubtitle>{category.category}</SectionSubtitle>
              <FeatureGrid>
                {category.items.map((item, itemIndex) => (
                  <FeatureCard
                    key={itemIndex}
                    initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <FeatureContent>
                      <IconWrapper $padded={true}>{item.icon}</IconWrapper>
                      <div>
                        <FeatureTitle>{item.title}</FeatureTitle>
                        <FeatureDescription>{item.description}</FeatureDescription>
                      </div>
                    </FeatureContent>
                  </FeatureCard>
                ))}
              </FeatureGrid>
            </motion.div>
          ))}
        </SectionContainer>

        {/* How It Works */}
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader>
              <SectionBadge variant="outline">Processo Simplificado</SectionBadge>
              <SectionTitle>Como Funciona</SectionTitle>
            </SectionHeader>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureGrid $columns="repeat(3, 1fr)">
              <ProcessCard variants={fadeIn} transition={{ duration: 0.5 }}>
                <StepNumber $color={brazilGreen}>1</StepNumber>
                <FeatureContent $direction="column">
                  <IconWrapper $direction="column">
                    <Shield className="w-12 h-12" style={{ color: brazilGreen }} />
                  </IconWrapper>
                  <FeatureTitle>Registre seus itens</FeatureTitle>
                  <FeatureDescription style={{ textAlign: "center" }}>
                    Cadastre seus pertences com fotos, descrições, números de série e documentos relacionados.
                  </FeatureDescription>
                </FeatureContent>
              </ProcessCard>

              <ProcessCard variants={fadeIn} transition={{ duration: 0.5, delay: 0.2 }}>
                <StepNumber $color={brazilYellow}>2</StepNumber>
                <FeatureContent $direction="column">
                  <IconWrapper $direction="column">
                    <AlertTriangle className="w-12 h-12" style={{ color: brazilYellow }} />
                  </IconWrapper>
                  <FeatureTitle>Reporte ocorrências</FeatureTitle>
                  <FeatureDescription style={{ textAlign: "center" }}>
                    Em caso de perda ou roubo, crie um alerta com todas as informações já preenchidas.
                  </FeatureDescription>
                </FeatureContent>
              </ProcessCard>

              <ProcessCard variants={fadeIn} transition={{ duration: 0.5, delay: 0.4 }}>
                <StepNumber $color={brazilBlue}>3</StepNumber>
                <FeatureContent $direction="column">
                  <IconWrapper $direction="column">
                    <CheckCircle className="w-12 h-12" style={{ color: brazilBlue }} />
                  </IconWrapper>
                  <FeatureTitle>Recupere com a comunidade</FeatureTitle>
                  <FeatureDescription style={{ textAlign: "center" }}>
                    A comunidade ajuda a localizar seus itens através de alertas e notificações.
                  </FeatureDescription>
                </FeatureContent>
              </ProcessCard>
            </FeatureGrid>
          </motion.div>
        </SectionContainer>

        {/* Testimonials */}
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader>
              <SectionBadge variant="outline">Histórias Reais</SectionBadge>
              <SectionTitle>O Que Dizem Nossos Usuários</SectionTitle>
            </SectionHeader>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureGrid $columns="repeat(auto-fit, minmax(300px, 1fr))">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} variants={fadeIn} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <CardContent style={{ paddingTop: "1.5rem" }}>
                    <TestimonialHeader>
                      <Avatar style={{ marginRight: "1rem", border: `2px solid ${brazilGreen}` }}>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback style={{ backgroundColor: brazilBlue, color: brazilWhite }}>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <TestimonialInfo>
                        <TestimonialName>{testimonial.name}</TestimonialName>
                        <TestimonialRole>{testimonial.role}</TestimonialRole>
                      </TestimonialInfo>
                    </TestimonialHeader>
                    <TestimonialContent>&quot;{testimonial.content}&quot;</TestimonialContent>
                  </CardContent>
                </TestimonialCard>
              ))}
            </FeatureGrid>
          </motion.div>
        </SectionContainer>

        {/* Call to Action */}
        <CTACard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <CTAContent>
            <CTATitle>Esteja Preparado</CTATitle>
            <CTADescription>
              Ao registrar seus itens em nosso app, você está dando um passo importante para proteger seus bens e
              facilitar sua recuperação em caso de perda ou roubo. Não espere que algo aconteça para agir. Comece agora
              a catalogar seus pertences e tenha a tranquilidade de saber que está preparado para qualquer
              eventualidade, com o apoio de uma comunidade inteira.
            </CTADescription>
            <Link href="/Register" passHref>
              <BrazilButton size="lg">
                Cadastre-se Gratuitamente
                <ArrowRight size={16} />
              </BrazilButton>
            </Link>
          </CTAContent>
        </CTACard>
      </ContentContainer>
    </Section>
  )
}

