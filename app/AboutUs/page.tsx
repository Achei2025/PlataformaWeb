"use client"

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

// Styled Components
const Section = styled.section`
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
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
  background-color: rgba(0, 0, 0, 0.6);
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
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
`

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`

const HeroDescription = styled.p`
  font-size: 1.25rem;
  max-width: 48rem;
  margin: 0 auto 2rem;
  opacity: 0.8;
  
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
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background: linear-gradient(to top, #f9fafb, transparent);
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
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`

const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: var(--muted-foreground);
`

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  color: var(--primary);
  margin-bottom: 2rem;
`

const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
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
  padding: ${(props) => (props.$padded ? "0.5rem" : "0")};
  background-color: ${(props) => (props.$padded ? "#f9fafb" : "transparent")};
  border-radius: ${(props) => (props.$padded ? "9999px" : "0")};
  display: flex;
  justify-content: center;
`

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
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
`

const ProcessCard = styled(FeatureCard)`
  position: relative;
`

const StepNumber = styled.div`
  position: absolute;
  top: -1rem;
  left: -1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: ${(props) => props.$color || "#3b82f6"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
`

const TestimonialCard = styled(FeatureCard)`
  
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
`

const TestimonialRole = styled.p`
  font-size: 0.875rem;
  color: var(--muted-foreground);
`

const TestimonialContent = styled.p`
  font-style: italic;
  color: var(--muted-foreground);
`

const CTACard = styled(Card)`
  border: none;
  background-color: #f8f9fa;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const CTAContent = styled(CardContent)`
  padding: 2.5rem;
  text-align: center;
`

const CTATitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
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

const OrangeButton = styled(StyledButton)`
  background-color: #f97316;
  color: white;
  
  &:hover {
    background-color: #ea580c;
  }
`

const SectionContainer = styled.div`
  margin-bottom: 4rem;
`

export default function AboutUs() {
  const advantages = [
    {
      category: "Prevenç��o",
      items: [
        {
          icon: <Shield className="w-6 h-6" style={{ color: "#2563eb" }} />,
          title: "Registro Preventivo",
          description: "Catalogue seus itens antes que algo aconteça, com fotos, descrições e números de série",
        },
        {
          icon: <Smartphone className="w-6 h-6" style={{ color: "#16a34a" }} />,
          title: "Acesso Fácil",
          description: "Informações dos seus itens sempre à mão, em qualquer dispositivo, a qualquer momento",
        },
      ],
    },
    {
      category: "Ação Rápida",
      items: [
        {
          icon: <FileCheck className="w-6 h-6" style={{ color: "#ca8a04" }} />,
          title: "BO Simplificado",
          description: "Processo simplificado para registrar ocorrências com todos os detalhes já preenchidos",
        },
        {
          icon: <Clock className="w-6 h-6" style={{ color: "#dc2626" }} />,
          title: "Resposta Imediata",
          description: "Aja rapidamente em caso de roubo ou perda, compartilhando alertas com a comunidade",
        },
      ],
    },
    {
      category: "Segurança",
      items: [
        {
          icon: <Lock className="w-6 h-6" style={{ color: "#9333ea" }} />,
          title: "Dados Protegidos",
          description: "Suas informações seguras e criptografadas, com controle total sobre o que é compartilhado",
        },
        {
          icon: <Bell className="w-6 h-6" style={{ color: "#ea580c" }} />,
          title: "Alertas",
          description: "Notificações sobre itens similares recuperados na sua região ou comunidade",
        },
      ],
    },
  ]

  const socialFeatures = [
    {
      icon: <Users className="w-10 h-10" style={{ color: "#3b82f6" }} />,
      title: "Comunidade Vigilante",
      description:
        "Conecte-se com pessoas da sua região para criar uma rede de proteção mútua e compartilhar alertas locais.",
    },
    {
      icon: <Share2 className="w-10 h-10" style={{ color: "#16a34a" }} />,
      title: "Compartilhamento Seguro",
      description:
        "Compartilhe alertas de itens perdidos ou roubados anonimamente e também com as pessoas ou grupos que você escolher.",
    },
    {
      icon: <MessageSquare className="w-10 h-10" style={{ color: "#9333ea" }} />,
      title: "Comunicação Direta",
      description: "Troque mensagens com pessoas que encontraram seus itens ou que têm informações relevantes.",
    },
    {
      icon: <Map className="w-10 h-10" style={{ color: "#dc2626" }} />,
      title: "Mapa de Ocorrências",
      description: "Visualize áreas com maior incidência de roubos e perdas para aumentar sua vigilância.",
    },
  ]

  const statistics = [
    { value: "78%", label: "Aumento na chance de recuperação" },
    { value: "15min", label: "Tempo médio para criar alerta" },
    { value: "50k+", label: "Usuários ativos" },
    { value: "32%", label: "Itens recuperados" },
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
              <StyledButton size="lg" variant="secondary">
                Comece Agora
              </StyledButton>
              <OutlineButton size="lg" variant="outline">
                Saiba Mais
              </OutlineButton>
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
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="mission">Nossa Missão</TabsTrigger>
              <TabsTrigger value="vision">Nossa Visão</TabsTrigger>
            </TabsList>
            <TabsContent value="mission">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: "1.5rem", fontWeight: 600, color: "#16a34a" }}>Nossa Missão</CardTitle>
                </CardHeader>
                <CardContent>
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
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ca8a04" }}>Nossa Visão</CardTitle>
                </CardHeader>
                <CardContent>
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
                color: "var(--muted-foreground)",
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
              <StepNumber $color="#3b82f6">1</StepNumber>
              <FeatureContent $direction="column">
                <IconWrapper $direction="column">
                  <Shield className="w-12 h-12" style={{ color: "#3b82f6" }} />
                </IconWrapper>
                <FeatureTitle>Registre seus itens</FeatureTitle>
                <FeatureDescription style={{ textAlign: "center" }}>
                  Cadastre seus pertences com fotos, descrições, números de série e documentos relacionados.
                </FeatureDescription>
              </FeatureContent>
            </ProcessCard>

            <ProcessCard>
              <StepNumber $color="#ca8a04">2</StepNumber>
              <FeatureContent $direction="column">
                <IconWrapper $direction="column">
                  <AlertTriangle className="w-12 h-12" style={{ color: "#ca8a04" }} />
                </IconWrapper>
                <FeatureTitle>Reporte ocorrências</FeatureTitle>
                <FeatureDescription style={{ textAlign: "center" }}>
                  Em caso de perda ou roubo, crie um alerta com todas as informações já preenchidas.
                </FeatureDescription>
              </FeatureContent>
            </ProcessCard>

            <ProcessCard>
              <StepNumber $color="#16a34a">3</StepNumber>
              <FeatureContent $direction="column">
                <IconWrapper $direction="column">
                  <CheckCircle className="w-12 h-12" style={{ color: "#16a34a" }} />
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
                    <Avatar style={{ marginRight: "1rem" }}>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
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
            <OrangeButton size="lg">Cadastre-se Gratuitamente</OrangeButton>
          </CTAContent>
        </CTACard>
      </ContentContainer>
    </Section>
  )
}

