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
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { HomeIcon, Map, FileText, Settings, LogOut, BoxIcon } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { useAuthApi } from "../../hooks/use-auth-api"
import { useAuth } from "../../contexts/auth-context"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter()
  const { user } = useAuth()
  const { logout } = useAuthApi()
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)

  const handleLogout = () => {
    setShowConfirmLogout(true)
  }

  const confirmLogout = async () => {
    setShowConfirmLogout(false)
    await logout()
    router.push("/Login")
  }

  const navItems = [
    { id: "dashboard", icon: HomeIcon, label: "Dashboard" },
    { id: "cadastrar", icon: BoxIcon, label: "Meus Objetos" },
    { id: "mapa", icon: Map, label: "Mapa" },
    { id: "casos", icon: FileText, label: "Casos" },
    { id: "configuracoes", icon: Settings, label: "Configurações" },
  ]

  return (
    <>
      <aside
        className={cn(
          "w-64 h-full flex flex-col overflow-hidden transition-all duration-300",
          "bg-white",
          "border-r border-gray-200",
        )}
      >
        {/* Header/Profile Section */}
        <div className="px-6 py-8">
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="h-14 w-14 border-4 border-gray-100 shadow-sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-gray-100 text-gray-700 font-medium">
                {user?.name ? user.name.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-gray-800">{user?.name || "Usuário"}</h2>
              <p className="text-sm text-gray-500">Cidadão</p>
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-gradient-to-r from-green-500 via-green-400 to-green-600 rounded-full" />
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
                  "text-gray-700",
                  "hover:bg-gray-100",
                  activeTab === item.id && [
                    "bg-green-50 text-green-600",
                    "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                  ],
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className={cn("mr-3 h-5 w-5", activeTab === item.id ? "text-green-600" : "text-gray-500")} />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <div className="px-4 py-4 bg-gray-50">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Dialog de Confirmação de Logout */}
      <Dialog open={showConfirmLogout} onOpenChange={setShowConfirmLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Logout</DialogTitle>
          </DialogHeader>
          <p>Tem certeza de que deseja sair?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmLogout(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              Sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Sidebar

