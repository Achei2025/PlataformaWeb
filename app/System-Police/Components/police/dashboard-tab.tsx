import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", roubos: 400 },
  { name: "Fev", roubos: 300 },
  { name: "Mar", roubos: 200 },
  { name: "Abr", roubos: 278 },
  { name: "Mai", roubos: 189 },
  { name: "Jun", roubos: 239 },
]

const DashboardTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Casos Resolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">789</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">63.9%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roubos por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="roubos" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardTab

