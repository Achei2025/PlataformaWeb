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
import { HomeIcon, Moon, Sun, User, Map, FileText, Settings, LogOut } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
  const navItems = [
    { id: "dashboard", icon: HomeIcon, label: "Dashboard" },
    { id: "cadastrar", icon: User, label: "Meus Objetos" },
    { id: "mapa", icon: Map, label: "Mapa" },
    { id: "casos", icon: FileText, label: "Casos" },
    { id: "configuracoes", icon: Settings, label: "Configurações" },
  ]

  return (
    <aside
      className={cn(
        "w-64 h-full flex flex-col overflow-hidden transition-all duration-300",
        "bg-white dark:bg-[#002776]", // Azul da bandeira do Brasil para modo escuro
        "border-r border-gray-200 dark:border-[#009c3b]", // Verde da bandeira do Brasil para borda no modo escuro
      )}
    >
      {/* Header/Profile Section */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-4 mb-2">
          <Avatar className="h-14 w-14 border-4 border-[#009c3b]/10 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="bg-[#009c3b]/10 text-[#009c3b] font-medium">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">John Doe</h2>
            <p className="text-sm text-gray-500 dark:text-[#ffdf00]">Usuário</p>
          </div>
        </div>
        <div className="mt-4 h-1 w-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 py-2">
        <div className="space-y-1.5">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-base font-medium transition-all duration-200 h-12",
                "hover:bg-[#009c3b]/10 dark:hover:bg-[#ffdf00]/20",
                activeTab === item.id && [
                  "bg-[#009c3b]/10 dark:bg-[#ffdf00]/20 text-[#009c3b] dark:text-[#ffdf00]",
                  "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                  "before:h-8 before:w-1 before:rounded-r-full before:bg-[#009c3b] dark:before:bg-[#ffdf00]",
                ],
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  activeTab === item.id ? "text-[#009c3b] dark:text-[#ffdf00]" : "text-gray-500 dark:text-gray-400",
                )}
              />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <div className="px-4 py-4 bg-gray-50 dark:bg-[#002776]/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-[#ffdf00]">
              {darkMode ? "Modo Claro" : "Modo Escuro"}
            </span>
            <div className="flex items-center space-x-2">
              <Sun className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-[#ffdf00]"}`} />
              <DarkModeSwitch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className={`h-4 w-4 ${darkMode ? "text-[#ffdf00]" : "text-gray-400"}`} />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start text-gray-700 dark:text-[#ffdf00] border-gray-200 dark:border-[#009c3b]/50 hover:bg-[#009c3b]/10 dark:hover:bg-[#ffdf00]/10"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

