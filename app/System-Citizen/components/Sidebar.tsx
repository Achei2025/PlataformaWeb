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

import type React from "react"
import { Button } from "@/app/components/ui/button"
import { DarkModeSwitch } from "@/app/components/ui/dark-mode-switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Moon, Sun, User, Map, FileText, Settings } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
  return (
    <aside className="w-64 h-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6 flex flex-col shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-12 w-12 ring-2 ring-primary">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">John Doe</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Usuário</p>
        </div>
      </div>
      <nav className="space-y-3 flex-grow">
        {[
          { id: "cadastrar", icon: User, label: "Cadastrar Objeto" },
          { id: "mapa", icon: Map, label: "Mapa" },
          { id: "casos", icon: FileText, label: "Casos" },
          { id: "configuracoes", icon: Settings, label: "Configurações" },
        ].map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start text-left transition-all duration-200 ${
              activeTab === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </span>
        <div className="flex items-center space-x-2">
          <Sun className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-yellow-500"}`} />
          <DarkModeSwitch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon className={`h-4 w-4 ${darkMode ? "text-blue-500" : "text-gray-400"}`} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

