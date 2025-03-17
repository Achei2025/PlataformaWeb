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


import type React from "react"
import CadastrarTab from "./tabs/CadastrarTab"
import MapaTab from "./tabs/MapaTab"
import CasosTab from "./tabs/CasosTab"
import ConfiguracoesTab from "./tabs/ConfiguracoesTab"
import DashboardTab from "./tabs/DashboardTab"

interface ContentProps {
  activeTab: string
}

const Content: React.FC<ContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />
      case "cadastrar":
        return <CadastrarTab />
      case "mapa":
        return <MapaTab />
      case "casos":
        return <CasosTab />
      case "configuracoes":
        return <ConfiguracoesTab />
      default:
        return null
    }
  }

  return (
    <main className="flex-1 h-full bg-white dark:bg-gray-900 flex flex-col z-10">
      {renderContent()}
    </main>
  )
}

export default Content

