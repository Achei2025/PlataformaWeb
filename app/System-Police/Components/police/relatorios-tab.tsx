"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { DatePickerWithRange } from "@/app/components/ui/date-range-picker"
import { Progress } from "@/app/components/ui/progress"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
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
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Download,
  FileText,
  Filter,
  Printer,
  RefreshCw,
  Share2,
  Smartphone,
  Wallet,
  Laptop,
  Watch,
  Bike,
  Camera,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileBarChart2,
  TrendingUp,
  TrendingDown,
  Map,
} from "lucide-react"
import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"

// Cores da bandeira brasileira
const colors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  accent: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
}

// Dados mockados para os gráficos
const monthlyData = [
  { name: "Jan", roubos: 65, recuperados: 28, tentativas: 15 },
  { name: "Fev", roubos: 59, recuperados: 25, tentativas: 12 },
  { name: "Mar", roubos: 80, recuperados: 35, tentativas: 20 },
  { name: "Abr", roubos: 81, recuperados: 40, tentativas: 25 },
  { name: "Mai", roubos: 56, recuperados: 30, tentativas: 18 },
  { name: "Jun", roubos: 55, recuperados: 32, tentativas: 15 },
  { name: "Jul", roubos: 40, recuperados: 22, tentativas: 10 },
]

const statusData = [
  { name: "Em investigação", value: 45, color: colors.blue },
  { name: "Resolvido", value: 30, color: colors.green },
  { name: "Arquivado", value: 15, color: "#9ca3af" },
  { name: "Recuperado", value: 10, color: colors.yellow },
]

const tiposObjetosData = [
  { name: "Smartphones", quantidade: 120, icon: <Smartphone className="h-4 w-4" /> },
  { name: "Carteiras", quantidade: 80, icon: <Wallet className="h-4 w-4" /> },
  { name: "Laptops", quantidade: 60, icon: <Laptop className="h-4 w-4" /> },
  { name: "Relógios", quantidade: 45, icon: <Watch className="h-4 w-4" /> },
  { name: "Bicicletas", quantidade: 30, icon: <Bike className="h-4 w-4" /> },
  { name: "Câmeras", quantidade: 25, icon: <Camera className="h-4 w-4" /> },
]

const horarioData = [
  { hora: "00:00", incidentes: 12 },
  { hora: "03:00", incidentes: 8 },
  { hora: "06:00", incidentes: 15 },
  { hora: "09:00", incidentes: 25 },
  { hora: "12:00", incidentes: 32 },
  { hora: "15:00", incidentes: 45 },
  { hora: "18:00", incidentes: 58 },
  { hora: "21:00", incidentes: 42 },
]

const locaisData = [
  { name: "Centro", value: 35, fill: colors.green },
  { name: "Zona Sul", value: 25, fill: colors.yellow },
  { name: "Zona Norte", value: 20, fill: colors.blue },
  { name: "Zona Leste", value: 15, fill: colors.accent },
  { name: "Zona Oeste", value: 5, fill: "#8884d8" },
]

const comparativoAnualData = [
  { name: "Jan", atual: 65, anterior: 55 },
  { name: "Fev", atual: 59, anterior: 62 },
  { name: "Mar", atual: 80, anterior: 75 },
  { name: "Abr", atual: 81, anterior: 85 },
  { name: "Mai", atual: 56, anterior: 60 },
  { name: "Jun", atual: 55, anterior: 58 },
  { name: "Jul", atual: 40, anterior: 45 },
]

const eficienciaData = [
  { subject: "Tempo de Resposta", A: 80, fullMark: 100 },
  { subject: "Taxa de Resolução", A: 65, fullMark: 100 },
  { subject: "Recuperação", A: 45, fullMark: 100 },
  { subject: "Prevenção", A: 70, fullMark: 100 },
  { subject: "Satisfação", A: 75, fullMark: 100 },
  { subject: "Colaboração", A: 60, fullMark: 100 },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md text-xs">
        <p className="font-bold">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

const formatarData = (data: Date) => {
  return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}

const RelatoriosTab: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("30d")
  const [regiao, setRegiao] = useState("todas")
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Relatórios</h1>
          <p className="text-muted-foreground">Análise estatística e visualização de dados de ocorrências</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />

          <Select value={regiao} onValueChange={setRegiao}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as regiões</SelectItem>
              <SelectItem value="centro">Centro</SelectItem>
              <SelectItem value="zonasul">Zona Sul</SelectItem>
              <SelectItem value="zonanorte">Zona Norte</SelectItem>
              <SelectItem value="zonaleste">Zona Leste</SelectItem>
              <SelectItem value="zonaoeste">Zona Oeste</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>

          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
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
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
            </div>
            <Progress value={66} className="h-1 mt-4" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50 border-green-100">
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
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-700" />
              </div>
            </div>
            <Progress value={42.9} className="h-1 mt-4" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-yellow-50 border-yellow-100">
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
              <div className="p-3 bg-yellow-100 rounded-full">
                <Smartphone className="h-6 w-6 text-yellow-700" />
              </div>
            </div>
            <Progress value={21.8} className="h-1 mt-4" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-red-50 border-red-100">
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
              <div className="p-3 bg-red-100 rounded-full">
                <FileBarChart2 className="h-6 w-6 text-red-700" />
              </div>
            </div>
            <Progress value={42.9} className="h-1 mt-4" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mensal" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="mensal">Análise Mensal</TabsTrigger>
          <TabsTrigger value="comparativo">Comparativo Anual</TabsTrigger>
          <TabsTrigger value="detalhado">Relatório Detalhado</TabsTrigger>
          <TabsTrigger value="eficiencia">Indicadores de Eficiência</TabsTrigger>
        </TabsList>

        <TabsContent value="mensal" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ocorrências por Mês</CardTitle>
                  <CardDescription>Análise histórica de roubos, recuperações e tentativas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bar" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="bar">Barras</TabsTrigger>
                    <TabsTrigger value="line">Linhas</TabsTrigger>
                    <TabsTrigger value="area">Área</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.danger }}></div>
                      <span className="text-xs">Roubos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.green }}></div>
                      <span className="text-xs">Recuperados</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.yellow }}></div>
                      <span className="text-xs">Tentativas</span>
                    </div>
                  </div>
                </div>

                <TabsContent value="bar">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="roubos" fill={colors.danger} />
                      <Bar dataKey="recuperados" fill={colors.green} />
                      <Bar dataKey="tentativas" fill={colors.yellow} />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="line">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="roubos" stroke={colors.danger} strokeWidth={2} dot={{ r: 3 }} />
                      <Line
                        type="monotone"
                        dataKey="recuperados"
                        stroke={colors.green}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="tentativas"
                        stroke={colors.yellow}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="area">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="roubos"
                        stackId="1"
                        stroke={colors.danger}
                        fill={`${colors.danger}33`}
                      />
                      <Area
                        type="monotone"
                        dataKey="recuperados"
                        stackId="2"
                        stroke={colors.green}
                        fill={`${colors.green}33`}
                      />
                      <Area
                        type="monotone"
                        dataKey="tentativas"
                        stackId="3"
                        stroke={colors.yellow}
                        fill={`${colors.yellow}33`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Status dos Casos</CardTitle>
                <CardDescription>Distribuição por situação atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col">
                  <ResponsiveContainer width="100%" height="70%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    {statusData.map((status, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                        <span className="text-xs">{status.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipos de Objetos Roubados</CardTitle>
                <CardDescription>Categorização por tipo de dispositivo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    layout="vertical"
                    data={tiposObjetosData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill={colors.blue} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Horários Críticos</CardTitle>
                <CardDescription>Períodos com maior incidência de crimes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={horarioData} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hora" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incidentes" fill={colors.blue}>
                      {horarioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.incidentes > 40 ? colors.danger : colors.blue} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm font-medium">Horário crítico</span>
                    </div>
                    <span className="text-sm font-semibold">18:00 - 21:00</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                      <span className="text-sm font-medium">Segundo pico</span>
                    </div>
                    <span className="text-sm font-semibold">12:00 - 15:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ocorrências por Região</CardTitle>
                <CardDescription>Distribuição geográfica dos casos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col">
                  <ResponsiveContainer width="100%" height="70%">
                    <PieChart>
                      <Pie
                        data={locaisData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {locaisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {locaisData.map((area, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: area.fill }}></div>
                        <span className="text-xs">{area.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparativo" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Comparativo Anual</CardTitle>
                  <CardDescription>Comparação entre o ano atual e o anterior</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={comparativoAnualData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="atual"
                    name="Ano Atual"
                    stroke={colors.blue}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="anterior"
                    name="Ano Anterior"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variação Anual</CardTitle>
                <CardDescription>Mudança percentual em relação ao ano anterior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Total de Ocorrências</span>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm font-medium text-red-600">+5.2%</span>
                      </div>
                    </div>
                    <Progress value={105.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Casos Resolvidos</span>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium text-green-600">+8.7%</span>
                      </div>
                    </div>
                    <Progress value={108.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Taxa de Resolução</span>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium text-green-600">+3.5%</span>
                      </div>
                    </div>
                    <Progress value={103.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Tempo Médio de Resolução</span>
                      <div className="flex items-center">
                        <TrendingDown className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium text-green-600">-12.3%</span>
                      </div>
                    </div>
                    <Progress value={87.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Objetos Recuperados</span>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium text-green-600">+15.8%</span>
                      </div>
                    </div>
                    <Progress value={115.8} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendências Sazonais</CardTitle>
                <CardDescription>Padrões de ocorrências ao longo do ano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Períodos de Alta</h4>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Dezembro - Janeiro</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Aumento de 35% nas ocorrências durante o período de festas e férias
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Períodos de Baixa</h4>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Abril - Maio</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Redução de 18% nas ocorrências durante meses de menor movimento
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Eventos Especiais</h4>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Carnaval e Grandes Eventos</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Picos de ocorrências durante feriados e eventos com grandes aglomerações
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projeção Anual</CardTitle>
                <CardDescription>Estimativa para o restante do ano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Projetado</span>
                      <span className="text-sm font-bold">752 ocorrências</span>
                    </div>
                    <Progress value={58} className="h-2" />
                    <p className="text-xs text-muted-foreground">58% do total anual projetado já registrado</p>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-sm mb-2">Tendência</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Em queda
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Projeção indica tendência de queda de 7% para o segundo semestre em comparação com o mesmo
                        período do ano anterior
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-sm mb-1">Recomendação</h4>
                    <p className="text-xs">
                      Manter o foco em áreas de alta incidência e reforçar o policiamento durante os períodos de pico
                      identificados
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detalhado" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Detalhamento por Tipo de Objeto</CardTitle>
                <CardDescription>Análise detalhada por categoria de item roubado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tiposObjetosData.map((tipo, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-50 rounded-md">{tipo.icon}</div>
                          <span className="font-medium">{tipo.name}</span>
                        </div>
                        <span className="font-bold">{tipo.quantidade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={(tipo.quantidade / 120) * 100} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {((tipo.quantidade / 120) * 100).toFixed(1)}%
                        </span>
                      </div>
                      {index < tiposObjetosData.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Perfil das Vítimas</CardTitle>
                <CardDescription>Análise demográfica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Faixa Etária</h4>
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart
                        data={[
                          { faixa: "18-24", valor: 30 },
                          { faixa: "25-34", valor: 45 },
                          { faixa: "35-44", valor: 25 },
                          { faixa: "45-54", valor: 15 },
                          { faixa: "55+", valor: 10 },
                        ]}
                        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                      >
                        <XAxis dataKey="faixa" tick={{ fontSize: 10 }} />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="valor" fill={colors.blue} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium mb-2">Gênero</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Masculino", value: 55 },
                                { name: "Feminino", value: 45 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={15}
                              outerRadius={35}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill={colors.blue} />
                              <Cell fill={colors.green} />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.blue }}></div>
                          <span className="text-xs">Masculino (55%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.green }}></div>
                          <span className="text-xs">Feminino (45%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium mb-2">Ocupação</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Estudantes</span>
                        <span className="text-xs font-medium">28%</span>
                      </div>
                      <Progress value={28} className="h-1.5" />

                      <div className="flex justify-between items-center">
                        <span className="text-xs">Profissionais</span>
                        <span className="text-xs font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-1.5" />

                      <div className="flex justify-between items-center">
                        <span className="text-xs">Autônomos</span>
                        <span className="text-xs font-medium">18%</span>
                      </div>
                      <Progress value={18} className="h-1.5" />

                      <div className="flex justify-between items-center">
                        <span className="text-xs">Outros</span>
                        <span className="text-xs font-medium">12%</span>
                      </div>
                      <Progress value={12} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mapa de Calor de Ocorrências</CardTitle>
              <CardDescription>Distribuição geográfica detalhada</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-gray-100 rounded-md">
              <div className="flex flex-col items-center text-center">
                <Map className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Visualização do mapa de calor disponível no módulo de mapas</p>
                <Button variant="outline" className="mt-4">
                  Abrir Mapa Completo
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Roubo</CardTitle>
                <CardDescription>Técnicas utilizadas pelos criminosos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Armado</Badge>
                      <span className="text-sm">Roubo à mão armada</span>
                    </div>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Moto</Badge>
                      <span className="text-sm">Abordagem em motocicleta</span>
                    </div>
                    <span className="font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Furto</Badge>
                      <span className="text-sm">Furto sem percepção da vítima</span>
                    </div>
                    <span className="font-medium">22%</span>
                  </div>
                  <Progress value={22} className="h-2" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Distração</Badge>
                      <span className="text-sm">Técnica de distração</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Outros</Badge>
                      <span className="text-sm">Outros métodos</span>
                    </div>
                    <span className="font-medium">5%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor Estimado dos Itens</CardTitle>
                <CardDescription>Prejuízo financeiro por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={[
                      { categoria: "Smartphones", valor: 850000 },
                      { categoria: "Laptops", valor: 720000 },
                      { categoria: "Relógios", valor: 450000 },
                      { categoria: "Tablets", valor: 320000 },
                      { categoria: "Câmeras", valor: 280000 },
                      { categoria: "Outros", valor: 180000 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="categoria" />
                    <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                    <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor"]} />
                    <Bar dataKey="valor" fill={colors.green} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium">Prejuízo Total Estimado</h4>
                    <span className="font-bold">R$ 2.800.000</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Valor total estimado dos itens roubados no período selecionado
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="eficiencia" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores de Eficiência</CardTitle>
                <CardDescription>Métricas de desempenho operacional</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={eficienciaData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Eficiência" dataKey="A" stroke={colors.blue} fill={colors.blue} fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Recuperação</CardTitle>
                <CardDescription>Objetos recuperados por tipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Smartphones</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Laptops</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Tablets</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Relógios</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Câmeras</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Taxa média</span>
                    <span className="text-sm font-bold">24.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Relatório gerado em {formatarData(new Date())}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RelatoriosTab

