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

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  AlertTriangle,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  MapPin,
  Shield,
  ShieldAlert,
  Siren,
  Users,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Lightbulb,
  Radio,
  Megaphone,
  Bookmark,
  RefreshCw,
  Smartphone,
  FileBarChart2,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Cores para os gráficos
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Dados para os gráficos
const ocorrenciasMensais = [
  { name: "Jan", ocorrencias: 65, resolvidos: 45 },
  { name: "Fev", ocorrencias: 59, resolvidos: 40 },
  { name: "Mar", ocorrencias: 80, resolvidos: 55 },
  { name: "Abr", ocorrencias: 81, resolvidos: 60 },
  { name: "Mai", ocorrencias: 56, resolvidos: 40 },
  { name: "Jun", ocorrencias: 55, resolvidos: 42 },
  { name: "Jul", ocorrencias: 40, resolvidos: 30 },
]

const tiposCrime = [
  { name: "Roubo", value: 35 },
  { name: "Furto", value: 25 },
  { name: "Agressão", value: 20 },
  { name: "Tráfico", value: 15 },
  { name: "Outros", value: 5 },
]

const areasRisco = [
  { area: "Centro", nivel: 85, incidentes: 42 },
  { area: "Zona Sul", nivel: 65, incidentes: 28 },
  { area: "Zona Norte", nivel: 75, incidentes: 35 },
  { area: "Zona Leste", nivel: 60, incidentes: 25 },
  { area: "Zona Oeste", nivel: 50, incidentes: 20 },
]

const dicasSeguranca = [
  {
    id: 1,
    titulo: "Verificação de Equipamento",
    descricao: "Sempre verifique seu colete, rádio e arma antes de iniciar o turno.",
    icone: Shield,
  },
  {
    id: 2,
    titulo: "Comunicação Constante",
    descricao: "Mantenha comunicação regular com a central e sua equipe durante patrulhas.",
    icone: Radio,
  },
  {
    id: 3,
    titulo: "Abordagem Segura",
    descricao: "Mantenha distância segura e posição vantajosa durante abordagens de suspeitos.",
    icone: AlertCircle,
  },
  {
    id: 4,
    titulo: "Atenção ao Entorno",
    descricao: "Sempre observe o ambiente ao redor durante ocorrências para evitar emboscadas.",
    icone: ShieldAlert,
  },
  {
    id: 5,
    titulo: "Documentação Precisa",
    descricao: "Registre detalhadamente todas as ocorrências para garantir processos judiciais eficazes.",
    icone: FileText,
  },
]

const alertasRecentes = [
  {
    id: 1,
    titulo: "Alerta de Alto Risco",
    descricao: "Aumento de ocorrências armadas na região central nas últimas 24h",
    nivel: "alto",
    tempo: "10 minutos atrás",
  },
  {
    id: 2,
    titulo: "Suspeito Procurado",
    descricao: "Indivíduo procurado por assalto a mão armada visto na Zona Norte",
    nivel: "medio",
    tempo: "2 horas atrás",
  },
  {
    id: 3,
    titulo: "Atualização de Procedimento",
    descricao: "Novo protocolo para abordagem de veículos suspeitos em vigor",
    nivel: "informativo",
    tempo: "5 horas atrás",
  },
]

const DashboardTab: React.FC = () => {
  const [dicaAtual, setDicaAtual] = useState(0)
  const [abaAtiva, setAbaAtiva] = useState("visao-geral")

  // Função para alternar entre as dicas de segurança
  const proximaDica = () => {
    setDicaAtual((prev) => (prev + 1) % dicasSeguranca.length)
  }

  // Formatar data atual
  const dataAtual = format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  const horaAtual = format(new Date(), "HH:mm")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard Policial</h1>
          <p className="text-muted-foreground">Visão geral do sistema e recursos para oficiais</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm font-medium">{dataAtual}</p>
          <p className="text-2xl font-bold">{horaAtual}</p>
        </div>
      </div>

      {/* Alerta de Alto Risco */}
      <Alert className="bg-red-50 border-red-200">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-600">Alerta de Alto Risco</AlertTitle>
        <AlertDescription>
          Aumento de ocorrências armadas na região central nas últimas 24h. Reforço solicitado para patrulhas.
        </AlertDescription>
      </Alert>

      {/* Tabs para diferentes seções do dashboard */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="seguranca">Dicas de Segurança</TabsTrigger>
          <TabsTrigger value="areas-risco">Áreas de Risco</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
        </TabsList>

        {/* Conteúdo da aba Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-6">
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Ocorrências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold mb-1">436</p>
                    <div className="flex items-center text-xs text-red-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>12% em relação ao período anterior</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <FileText className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Casos Resolvidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold mb-1">187</p>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>8% em relação ao período anterior</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Objetos Recuperados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold mb-1">95</p>
                    <div className="flex items-center text-xs text-yellow-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>5% em relação ao período anterior</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-full">
                    <Smartphone className="h-6 w-6 text-yellow-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Resolução</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold mb-1">42.9%</p>
                    <div className="flex items-center text-xs text-red-600">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      <span>3% em relação ao período anterior</span>
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-full">
                    <FileBarChart2 className="h-6 w-6 text-red-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ocorrências por Mês</CardTitle>
                <CardDescription>Comparativo entre ocorrências e casos resolvidos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ocorrenciasMensais}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ocorrencias" name="Ocorrências" fill="#0088FE" />
                    <Bar dataKey="resolvidos" name="Resolvidos" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipos de Ocorrências</CardTitle>
                <CardDescription>Distribuição por categoria de crime</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tiposCrime}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {tiposCrime.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Alertas Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alertas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertasRecentes.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={`p-4 rounded-lg border ${
                      alerta.nivel === "alto"
                        ? "bg-red-50 border-red-200"
                        : alerta.nivel === "medio"
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        {alerta.nivel === "alto" ? (
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        ) : alerta.nivel === "medio" ? (
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        ) : (
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-medium">{alerta.titulo}</h4>
                          <p className="text-sm text-muted-foreground">{alerta.descricao}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{alerta.tempo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver Todos os Alertas
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Dicas de Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
          {/* Dica do Dia */}
          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Dica de Segurança do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  {React.createElement(dicasSeguranca[dicaAtual].icone, { className: "h-8 w-8 text-blue-700" })}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{dicasSeguranca[dicaAtual].titulo}</h3>
                  <p className="text-muted-foreground">{dicasSeguranca[dicaAtual].descricao}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                Salvar
                <Bookmark className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={proximaDica}>
                Próxima Dica
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Lista de Dicas de Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Todas as Dicas de Segurança</CardTitle>
              <CardDescription>Recomendações para aumentar sua segurança em campo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dicasSeguranca.map((dica) => (
                  <div key={dica.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {React.createElement(dica.icone, { className: "h-5 w-5 text-primary" })}
                      </div>
                      <div>
                        <h4 className="font-medium">{dica.titulo}</h4>
                        <p className="text-sm text-muted-foreground">{dica.descricao}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Procedimentos de Emergência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Siren className="h-5 w-5 text-red-500" />
                Procedimentos de Emergência
              </CardTitle>
              <CardDescription>Protocolos para situações críticas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-red-50">
                  <h4 className="font-medium mb-2">Oficial Ferido</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>Comunique imediatamente à central via rádio (código 10-99)</li>
                    <li>Informe localização exata e condição do oficial</li>
                    <li>Solicite apoio médico e tático</li>
                    <li>Aplique primeiros socorros se possível e seguro</li>
                    <li>Estabeleça perímetro de segurança</li>
                  </ol>
                </div>

                <div className="p-4 rounded-lg border bg-yellow-50">
                  <h4 className="font-medium mb-2">Confronto Armado</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>Busque cobertura imediatamente</li>
                    <li>Comunique à central (código 10-71)</li>
                    <li>Solicite reforços e informe localização precisa</li>
                    <li>Identifique-se como policial e dê ordens claras</li>
                    <li>Use força proporcional conforme protocolo</li>
                  </ol>
                </div>

                <div className="p-4 rounded-lg border bg-blue-50">
                  <h4 className="font-medium mb-2">Perseguição Veicular</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>Informe central imediatamente (código 10-80)</li>
                    <li>Forneça descrição do veículo, placa e direção</li>
                    <li>Mantenha narração contínua da rota</li>
                    <li>Avalie constantemente riscos à população civil</li>
                    <li>Siga orientações do supervisor para continuar ou abortar</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver Manual Completo de Procedimentos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Áreas de Risco */}
        <TabsContent value="areas-risco" className="space-y-6">
          {/* Mapa de Calor (Simulado) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                Mapa de Calor de Ocorrências
              </CardTitle>
              <CardDescription>Concentração de ocorrências nas últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-muted-foreground">Mapa interativo de ocorrências</p>
                  <Button variant="outline" className="mt-4">
                    Abrir Mapa Completo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Áreas de Alto Risco */}
          <Card>
            <CardHeader>
              <CardTitle>Áreas de Alto Risco</CardTitle>
              <CardDescription>Regiões com maior índice de criminalidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {areasRisco.map((area) => (
                  <div key={area.area} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            area.nivel > 75
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : area.nivel > 60
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          }
                        >
                          Nível {area.nivel}%
                        </Badge>
                        <span className="font-medium">{area.area}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{area.incidentes} incidentes recentes</span>
                    </div>
                    <Progress value={area.nivel} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {area.nivel > 75
                        ? "Reforço policial recomendado. Abordagens devem ser realizadas com apoio."
                        : area.nivel > 60
                          ? "Atenção elevada recomendada. Patrulhamento em duplas."
                          : "Patrulhamento normal. Mantenha vigilância padrão."}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recomendações de Segurança por Área */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendações por Área</CardTitle>
              <CardDescription>Orientações específicas para cada região</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-red-50">
                  <h4 className="font-medium mb-2">Centro (Alto Risco)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Patrulhamento em grupos de no mínimo 3 oficiais</li>
                    <li>Comunicação constante com a central</li>
                    <li>Atenção especial a pontos de tráfico identificados</li>
                    <li>Verificação de becos e áreas com pouca iluminação</li>
                    <li>Uso de colete balístico nível III obrigatório</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border bg-yellow-50">
                  <h4 className="font-medium mb-2">Zona Norte (Risco Moderado)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Patrulhamento em duplas</li>
                    <li>Atenção a horários de pico de ocorrências (18h-22h)</li>
                    <li>Monitoramento de áreas próximas a terminais de transporte</li>
                    <li>Verificação de denúncias de moradores com cautela</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border bg-blue-50">
                  <h4 className="font-medium mb-2">Zona Oeste (Risco Baixo)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Patrulhamento preventivo</li>
                    <li>Interação comunitária e presença visível</li>
                    <li>Atenção a ocorrências de furtos em residências</li>
                    <li>Verificação de veículos suspeitos estacionados</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Recursos e Treinamentos */}
        <TabsContent value="recursos" className="space-y-6">
          {/* Recursos Disponíveis */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos Disponíveis</CardTitle>
              <CardDescription>Materiais e ferramentas para apoio operacional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-blue-50 flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileText className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Manuais Operacionais</h4>
                    <p className="text-sm text-muted-foreground">Procedimentos padrão e protocolos atualizados</p>
                    <Button variant="link" className="px-0 h-8">
                      Acessar Manuais
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-green-50 flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <BookOpen className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Biblioteca Digital</h4>
                    <p className="text-sm text-muted-foreground">Acervo de estudos e referências técnicas</p>
                    <Button variant="link" className="px-0 h-8">
                      Acessar Biblioteca
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-yellow-50 flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Megaphone className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Comunicados Oficiais</h4>
                    <p className="text-sm text-muted-foreground">Informes e diretrizes da corporação</p>
                    <Button variant="link" className="px-0 h-8">
                      Ver Comunicados
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-purple-50 flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Users className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Suporte Psicológico</h4>
                    <p className="text-sm text-muted-foreground">Atendimento e apoio para oficiais</p>
                    <Button variant="link" className="px-0 h-8">
                      Agendar Atendimento
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legislação Atualizada */}
          <Card>
            <CardHeader>
              <CardTitle>Legislação Atualizada</CardTitle>
              <CardDescription>Mudanças recentes em leis e regulamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Lei 14.599/2023 - Alterações no Código Penal</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Novas disposições sobre crimes cibernéticos e fraudes eletrônicas
                      </p>
                    </div>
                    <Badge>Novo</Badge>
                  </div>
                  <Button variant="link" className="px-0 h-8">
                    Ler na íntegra
                  </Button>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Decreto 10.822 - Procedimentos de Abordagem</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Atualização dos protocolos de abordagem e revista pessoal
                      </p>
                    </div>
                    <Badge variant="outline">Atualizado</Badge>
                  </div>
                  <Button variant="link" className="px-0 h-8">
                    Ler na íntegra
                  </Button>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Portaria 789 - Uso de Equipamentos</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Regulamentação do uso de câmeras corporais e equipamentos de monitoramento
                      </p>
                    </div>
                    <Badge variant="outline">Atualizado</Badge>
                  </div>
                  <Button variant="link" className="px-0 h-8">
                    Ler na íntegra
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver Toda a Legislação
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rodapé com atualização */}
      <div className="flex justify-between items-center text-sm text-muted-foreground pt-4 border-t">
        <div className="flex items-center gap-1">
          <RefreshCw className="h-3 w-3" />
          <span>Última atualização: hoje às {format(new Date(), "HH:mm")}</span>
        </div>
        <Button variant="ghost" size="sm">
          Atualizar Dados
        </Button>
      </div>
    </div>
  )
}

export default DashboardTab

