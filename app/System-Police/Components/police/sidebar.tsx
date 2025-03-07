"use client"

import type React from "react"

import { Button } from "@/app/components/ui/button"
import { DarkModeSwitch } from "@/app/components/ui/dark-mode-switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { LogOut } from "lucide-react"
import { sidebarConfig } from "@/app/config/sidebar"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-800 p-6 flex flex-col shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-12 w-12 ring-2 ring-primary">
          <AvatarImage src="/police-avatar.png" alt="Policial" />
          <AvatarFallback>PL</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Oficial Silva</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Departamento de Polícia</p>
        </div>
      </div>
      <nav className="space-y-3 flex-grow">
        {sidebarConfig.map((item) => (
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
      <div className="mt-auto pt-6 border-t border-gray-300 dark:border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {darkMode ? "Modo Claro" : "Modo Escuro"}
          </span>
          <DarkModeSwitch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
        <Button variant="outline" className="w-full justify-start text-left" onClick={() => console.log("Logout")}>
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar

