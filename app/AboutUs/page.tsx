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
} from "lucide-react"
import styled, { css } from "styled-components"

// Cores do Brasil
const brazilGreen = "#009c3b"
const brazilYellow = "#ffdf00"
const brazilBlue = "#002776"
const brazilWhite = "#ffffff"

// Styled Components
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

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${brazilYellow};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`

const HeroDescription = styled.p`
  font-size: 1.25rem;
  max-width: 48rem;
  margin: 0 auto 2rem;
  opacity: 0.9;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const ButtonGroup = styled.div`
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

const StatCard = styled(Card)`
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

const SectionTitle = styled.h2`
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

const FeatureGrid = styled.div`
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

const FeatureCard = styled(Card)`
  border: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  background-color: ${brazilWhite};
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    ${(props) =>
      props.$hoverable &&
      css`
      transform: translateY(-0.25rem);
    `}
  }
`

const FeatureContent = styled(CardContent)`
  padding: 1.5rem;
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => (props.$direction === "column" ? "center" : "flex-start")};
  text-align: ${(props) => (props.$direction === "column" ? "center" : "left")};
`

const IconWrapper = styled.div`
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

const StepNumber = styled.div`
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

const CTACard = styled(Card)`
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

const BlueButton = styled(StyledButton)`
  background-color: ${brazilBlue};
  color: ${brazilWhite};
  font-weight: bold;
  
  &:hover {
    background-color: #001f5c;
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
  ]

  return (
    <Section>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroBadge variant="outline">Sua segurança em primeiro lugar</HeroBadge>
            <HeroTitle>Proteja o que é seu</HeroTitle>
            <HeroDescription>
              Uma plataforma social que revoluciona a forma como você protege, registra e recupera seus bens
            </HeroDescription>
            <ButtonGroup>
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
        <StatsGrid>
          {statistics.map((stat, index) => (
            <StatCard key={index}>
              <CardContent style={{ paddingTop: "1.5rem" }}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </CardContent>
            </StatCard>
          ))}
        </StatsGrid>

        {/* Mission and Vision Tabs */}
        <SectionContainer>
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
                    suporte necessários para proteger o que é seu, facilitando a recuperação em casos de perda ou roubo
                    através do poder da colaboração social.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vision">
              <Card style={{ borderLeft: `4px solid ${brazilYellow}` }}>
                <CardHeader style={{ borderBottom: `2px solid rgba(255, 223, 0, 0.2)` }}>
                  <CardTitle style={{ fontSize: "1.5rem", fontWeight: 600, color: brazilBlue }}>Nossa Visão</CardTitle>
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
        </SectionContainer>

        {/* Social Network Features */}
        <SectionContainer>
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

          <FeatureGrid $columns="repeat(4, 1fr)">
            {socialFeatures.map((feature, index) => (
              <FeatureCard key={index} $hoverable={true}>
                <FeatureContent $direction="column">
                  <IconWrapper $direction="column">{feature.icon}</IconWrapper>
                  <FeatureTitle style={{ textAlign: "center" }}>{feature.title}</FeatureTitle>
                  <FeatureDescription style={{ textAlign: "center" }}>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </SectionContainer>

        {/* App Advantages */}
        <SectionContainer>
          <SectionTitle>Por Que Usar Nosso App?</SectionTitle>

          {advantages.map((category, index) => (
            <div key={index} style={{ marginBottom: "2.5rem" }}>
              <SectionSubtitle>{category.category}</SectionSubtitle>
              <FeatureGrid>
                {category.items.map((item, itemIndex) => (
                  <FeatureCard key={itemIndex}>
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
            </div>
          ))}
        </SectionContainer>

        {/* How It Works */}
        <SectionContainer>
          <SectionHeader>
            <SectionBadge variant="outline">Processo Simplificado</SectionBadge>
            <SectionTitle>Como Funciona</SectionTitle>
          </SectionHeader>

          <FeatureGrid $columns="repeat(3, 1fr)">
            <ProcessCard>
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

            <ProcessCard>
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

            <ProcessCard>
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
        </SectionContainer>

        {/* Testimonials */}
        <SectionContainer>
          <SectionHeader>
            <SectionBadge variant="outline">Histórias Reais</SectionBadge>
            <SectionTitle>O Que Dizem Nossos Usuários</SectionTitle>
          </SectionHeader>

          <FeatureGrid $columns="repeat(2, 1fr)">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
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
                  <TestimonialContent>"{testimonial.content}"</TestimonialContent>
                </CardContent>
              </TestimonialCard>
            ))}
          </FeatureGrid>
        </SectionContainer>

        {/* Call to Action */}
        <CTACard>
          <CTAContent>
            <CTATitle>Esteja Preparado</CTATitle>
            <CTADescription>
              Ao registrar seus itens em nosso app, você está dando um passo importante para proteger seus bens e
              facilitar sua recuperação em caso de perda ou roubo. Não espere que algo aconteça para agir. Comece agora
              a catalogar seus pertences e tenha a tranquilidade de saber que está preparado para qualquer
              eventualidade, com o apoio de uma comunidade inteira.
            </CTADescription>
            <BrazilButton size="lg">Cadastre-se Gratuitamente</BrazilButton>
          </CTAContent>
        </CTACard>
      </ContentContainer>
    </Section>
  )
}

