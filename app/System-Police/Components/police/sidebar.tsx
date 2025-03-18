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
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { LogOut } from "lucide-react"
import { sidebarConfig } from "@/app/config/sidebar"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 h-full bg-white p-6 flex flex-col shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-12 w-12 ring-2 ring-primary">
          <AvatarImage src="/police-avatar.png" alt="Policial" />
          <AvatarFallback>PL</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Oficial Silva</h2>
          <p className="text-sm text-gray-500">Departamento de Polícia</p>
        </div>
      </div>
      <nav className="space-y-3 flex-grow">
        {sidebarConfig.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start text-left transition-all duration-200 ${
              activeTab === item.id ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-300">
        <Button variant="outline" className="w-full justify-start text-left" onClick={() => console.log("Logout")}>
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar

