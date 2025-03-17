"use client"

import type React from "react"
import { Button } from "@/app/components/ui/button"
import { DarkModeSwitch } from "@/app/components/ui/dark-mode-switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { HomeIcon, Moon, Sun, User, Map, FileText, Settings, LogOut } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { useEffect } from "react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
  useEffect(() => {
    // Apply dark mode to the document
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

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
        "bg-white dark:bg-gray-800", // Lighter dark background for better contrast
        "border-r border-gray-200 dark:border-gray-700", // More visible border
      )}
    >
      {/* Header/Profile Section */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-4 mb-2">
          <Avatar className="h-14 w-14 border-4 border-gray-100 dark:border-gray-700 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">John Doe</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">Usuário</p>
          </div>
        </div>
        <div className="mt-4 h-1 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-full" />
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
                "text-gray-700 dark:text-gray-200",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                activeTab === item.id && [
                  "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
                  "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                  "before:h-8 before:w-1 before:rounded-r-full before:bg-blue-600 dark:before:bg-blue-400",
                ],
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  activeTab === item.id ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-400",
                )}
              />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <div className="px-4 py-4 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between mb-4">
          </div>

          <Button
            variant="outline"
            className="w-full justify-start text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
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

