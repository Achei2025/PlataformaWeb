"use client"

import React, { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Moon, Sun, User, Map, FileText, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Switch } from "@/app/components/ui/switch"

// Importação dinâmica do Leaflet para ser carregado apenas no cliente
const LeafletMap = dynamic(() => import("leaflet"), { ssr: false })

const UserPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cadastrar")
  const [stolenObject, setStolenObject] = useState({ name: "", description: "" })
  const [darkMode, setDarkMode] = useState(false)
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && activeTab === "mapa" && mapRef.current) {
      // Inicializa o Leaflet quando estiver no cliente
      const L = require("leaflet")
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup("Um marcador de exemplo no mapa.")
        .openPopup()
    }
  }, [activeTab])

  const handleStolenObjectSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Objeto roubado cadastrado:", stolenObject)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "cadastrar":
        return (
          <form onSubmit={handleStolenObjectSubmit} className="space-y-4">
            <div>
              <Label htmlFor="objectName">Nome do Objeto</Label>
              <Input
                type="text"
                id="objectName"
                value={stolenObject.name}
                onChange={(e) => setStolenObject({ ...stolenObject, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="objectDescription">Descrição</Label>
              <Input
                type="text"
                id="objectDescription"
                value={stolenObject.description}
                onChange={(e) => setStolenObject({ ...stolenObject, description: e.target.value })}
              />
            </div>
            <Button type="submit">Cadastrar Objeto</Button>
          </form>
        )
      case "mapa":
        return <div ref={mapRef} className="h-full w-full rounded-md"></div>
      case "casos":
        return <p>Lista de casos (a ser implementada)</p>
      case "configuracoes":
        return <p>Configurações do usuário (a ser implementada)</p>
      default:
        return null
    }
  }

  return (
    <div className={`flex w-screen h-screen ${darkMode ? "dark" : ""}`}>
      <aside className="w-64 h-full bg-gray-100 dark:bg-gray-800 p-6 flex flex-col">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold dark:text-white">John Doe</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Usuário</p>
          </div>
        </div>
        <nav className="space-y-2 flex-grow">
          <Button
            variant={activeTab === "cadastrar" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("cadastrar")}
          >
            <User className="mr-2 h-4 w-4" /> Cadastrar Objeto
          </Button>
          <Button
            variant={activeTab === "mapa" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("mapa")}
          >
            <Map className="mr-2 h-4 w-4" /> Mapa
          </Button>
          <Button
            variant={activeTab === "casos" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("casos")}
          >
            <FileText className="mr-2 h-4 w-4" /> Casos
          </Button>
          <Button
            variant={activeTab === "configuracoes" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("configuracoes")}
          >
            <Settings className="mr-2 h-4 w-4" /> Configurações
          </Button>
        </nav>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon className="h-4 w-4" />
        </div>
      </aside>
      <main className="flex-1 h-full p-6 bg-white dark:bg-gray-900 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>
        <div className="flex-grow">{renderContent()}</div>
      </main>
    </div>
  )
}

export default UserPanel
