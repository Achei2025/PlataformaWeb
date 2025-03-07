"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Button } from "@/app/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  PhoneIncoming,
  Shield,
  MapPin,
  Smartphone,
  Clock,
  AlertTriangle,
  FileText,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { Progress } from "@/app/components/ui/progress"

// Colors from Brazilian flag
const colors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  accent: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
}

const monthlyData = [
  { name: "Jan", roubos: 400, recuperados: 240, tentativas: 120 },
  { name: "Fev", roubos: 300, recuperados: 190, tentativas: 90 },
  { name: "Mar", roubos: 200, recuperados: 110, tentativas: 60 },
  { name: "Abr", roubos: 278, recuperados: 167, tentativas: 83 },
  { name: "Mai", roubos: 189, recuperados: 134, tentativas: 56 },
  { name: "Jun", roubos: 239, recuperados: 168, tentativas: 72 },
]

const hourlyData = [
  { hour: "00:00", incidents: 12 },
  { hour: "03:00", incidents: 8 },
  { hour: "06:00", incidents: 15 },
  { hour: "09:00", incidents: 25 },
  { hour: "12:00", incidents: 32 },
  { hour: "15:00", incidents: 45 },
  { hour: "18:00", incidents: 58 },
  { hour: "21:00", incidents: 42 },
]

const locationData = [
  { name: "Centro", value: 35 },
  { name: "Zona Sul", value: 25 },
  { name: "Zona Norte", value: 20 },
  { name: "Zona Leste", value: 15 },
  { name: "Zona Oeste", value: 5 },
]

const COLORS = [colors.green, colors.yellow, colors.blue, colors.accent, "#8884d8"]

const deviceTypeData = [
  { name: "Smartphones", value: 70 },
  { name: "Notebooks", value: 15 },
  { name: "Tablets", value: 10 },
  { name: "Outros", value: 5 },
]

const recentIncidents = [
  {
    id: "INC-7834",
    type: "Roubo",
    local: "Av. Paulista, 1578",
    hora: "18:43",
    status: "Em Investigação",
    item: "iPhone 15",
  },
  { id: "INC-7833", type: "Roubo", local: "R. Augusta, 495", hora: "17:22", status: "Arquivado", item: "Samsung S23" },
  {
    id: "INC-7832",
    type: "Tentativa",
    local: "Pq. Ibirapuera",
    hora: "16:15",
    status: "Resolvido",
    item: "MacBook Pro",
  },
  {
    id: "INC-7831",
    type: "Roubo",
    local: "Shopping Eldorado",
    hora: "14:38",
    status: "Em Investigação",
    item: "iPad Pro",
  },
  { id: "INC-7830", type: "Roubo", local: "Estação Sé", hora: "12:05", status: "Recuperado", item: "Xiaomi Mi 11" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
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

const DashboardTab = () => {
  const [period, setPeriod] = useState("6m")
  const [dataType, setDataType] = useState("roubos")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em Investigação":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Em Investigação
          </Badge>
        )
      case "Arquivado":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Arquivado
          </Badge>
        )
      case "Resolvido":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolvido
          </Badge>
        )
      case "Recuperado":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Recuperado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard Policial</h1>
          <p className="text-muted-foreground">Monitoramento e análise de crimes em tempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="São Paulo">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione a região" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="São Paulo">São Paulo</SelectItem>
              <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
              <SelectItem value="Salvador">Salvador</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Pesquisar
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
                <p className="text-3xl font-bold mb-1">1,234</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12% de aumento</span>
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
                <p className="text-3xl font-bold mb-1">789</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8% de aumento</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-700" />
              </div>
            </div>
            <Progress value={63.9} className="h-1 mt-4" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-yellow-50 border-yellow-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dispositivos Recuperados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold mb-1">412</p>
                <div className="flex items-center text-xs text-yellow-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>5% de aumento</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Smartphone className="h-6 w-6 text-yellow-700" />
              </div>
            </div>
            <Progress value={33.3} className="h-1 mt-4" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-red-50 border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chamadas de Emergência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold mb-1">267</p>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>3% de redução</span>
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <PhoneIncoming className="h-6 w-6 text-red-700" />
              </div>
            </div>
            <Progress value={21.6} className="h-1 mt-4" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ocorrências por Mês</CardTitle>
                <CardDescription>Análise histórica de roubos, recuperações e tentativas</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">Último mês</SelectItem>
                    <SelectItem value="3m">3 meses</SelectItem>
                    <SelectItem value="6m">6 meses</SelectItem>
                    <SelectItem value="1y">1 ano</SelectItem>
                  </SelectContent>
                </Select>
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
                    <Line type="monotone" dataKey="recuperados" stroke={colors.green} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="tentativas" stroke={colors.yellow} strokeWidth={2} dot={{ r: 3 }} />
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
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                {locationData.map((area, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span className="text-xs">{area.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Horários Críticos</CardTitle>
            <CardDescription>Períodos com maior incidência de crimes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourlyData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" fill={colors.blue}>
                  {hourlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.incidents > 40 ? colors.danger : colors.blue} />
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
            <CardTitle>Dispositivos Roubados</CardTitle>
            <CardDescription>Categorização por tipo de dispositivo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {deviceTypeData.map((device, i) => (
                <div key={i} className="flex items-center p-2 bg-gray-50 rounded-md">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{device.name}</span>
                    <span className="text-xs text-muted-foreground">{device.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incidentes Recentes</CardTitle>
            <CardDescription>Últimas ocorrências registradas</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-0">
              {recentIncidents.map((incident, index) => (
                <React.Fragment key={incident.id}>
                  <div className={`flex flex-col px-6 py-3 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center">
                        <span className="font-medium text-sm mr-2">{incident.id}</span>
                        {getStatusBadge(incident.status)}
                      </div>
                      <span className="text-xs text-muted-foreground">{incident.hora}</span>
                    </div>
                    <div className="flex items-start">
                      <Smartphone className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm">{incident.item}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {incident.local}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < recentIncidents.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
            <div className="px-6 pt-4">
              <Button variant="outline" className="w-full">
                Ver todos os incidentes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Taxa de Resolução por Região</CardTitle>
          <CardDescription>Eficiência das operações policiais por localidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Centro</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Zona Sul</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Zona Norte</span>
                <span className="text-sm font-medium">57%</span>
              </div>
              <Progress value={57} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Zona Leste</span>
                <span className="text-sm font-medium">49%</span>
              </div>
              <Progress value={49} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Zona Oeste</span>
                <span className="text-sm font-medium">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardTab

