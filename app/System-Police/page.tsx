"use client"

import { useState } from "react"
import Sidebar from "@/app/System-Police/Components/police/sidebar"
import DashboardTab from "@/app/System-Police/Components/police/dashboard-tab"
import CasosTab from "@/app/System-Police/Components/police/casos-tab"
import MapaTab from "@/app/System-Police/Components/police/mapa-tab"
import RelatoriosTab from "@/app/System-Police/Components/police/relatorios-tab"

export default function PoliceSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "casos" && <CasosTab />}
        {activeTab === "mapa" && <MapaTab />}
        {activeTab === "relatorios" && <RelatoriosTab />}
      </main>
    </div>
  )
}

