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

