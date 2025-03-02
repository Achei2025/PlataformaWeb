"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

// Dados mockados para os gráficos
const monthlyData = [
  { name: "Jan", roubos: 65 },
  { name: "Fev", roubos: 59 },
  { name: "Mar", roubos: 80 },
  { name: "Abr", roubos: 81 },
  { name: "Mai", roubos: 56 },
  { name: "Jun", roubos: 55 },
  { name: "Jul", roubos: 40 },
]

const statusData = [
  { name: "Em andamento", value: 45 },
  { name: "Resolvido", value: 30 },
  { name: "Arquivado", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const RelatoriosTab: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("7d")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <div className="flex items-center space-x-4">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Exportar Relatório</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">436</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Casos Resolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">187</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">42.9%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roubos por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="roubos" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status dos Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipos de Objetos Roubados</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={[
                  { name: "Smartphones", quantidade: 120 },
                  { name: "Carteiras", quantidade: 80 },
                  { name: "Laptops", quantidade: 60 },
                  { name: "Joias", quantidade: 40 },
                  { name: "Bicicletas", quantidade: 30 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RelatoriosTab
