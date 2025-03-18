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

import { useState } from "react"
import Sidebar from "@/app/System-Police/Components/police/sidebar"
import DashboardTab from "@/app/System-Police/Components/police/dashboard-tab"
import CasosTab from "@/app/System-Police/Components/police/casos-tab"
import MapaTab from "@/app/System-Police/Components/police/mapa-tab"
import RelatoriosTab from "@/app/System-Police/Components/police/relatorios-tab"
import ConfiguracoesTab from "@/app/System-Police/Components/police/configuracoes-tab"

export default function PoliceSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "casos" && <CasosTab />}
        {activeTab === "mapa" && <MapaTab />}
        {activeTab === "relatorios" && <RelatoriosTab />}
        {activeTab === "configuracoes" && <ConfiguracoesTab />}
      </main>
    </div>
  )
}

