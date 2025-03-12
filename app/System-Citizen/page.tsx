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
import Sidebar from "./components/Sidebar"
import Content from "./components/Content"

const UserPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cadastrar")
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`flex w-full h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-1 overflow-auto">
        <Content activeTab={activeTab} />
      </div>
    </div>
  )
}

export default UserPanel

