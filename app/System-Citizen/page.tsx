"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "./components/Sidebar"
import Content from "./components/Content"
import { useAuthApi } from "../hooks/use-auth-api"
import { useAuth } from "../contexts/auth-context"

const UserPanel: React.FC = () => {
  const router = useRouter()
  const { token, userType } = useAuth()
  const { authFetch } = useAuthApi()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticação
  useEffect(() => {
    // Verificar se há token no localStorage (independente do contexto)
    const storedToken = localStorage.getItem("authToken")
    const storedUserType = localStorage.getItem("userType")

    console.log("System-Citizen - Verificando localStorage:", {
      storedToken: storedToken ? "Token existe" : "Token não existe",
      storedUserType,
      contextToken: token ? "Token existe" : "Token não existe",
      contextUserType: userType,
    })

    // Se não houver token no localStorage ou não for cidadão, redirecionar
    if (!storedToken || storedUserType !== "citizen") {
      console.log("System-Citizen - Redirecionando para login (dados não encontrados no localStorage)")
      router.push("/Login")
      return
    }

    // Se chegou aqui, está autenticado
    console.log("System-Citizen - Autenticação confirmada via localStorage, carregando página")
    setIsLoading(false)
  }, [router])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>
  }

  return (
    <div className="flex w-full h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Content activeTab={activeTab} authFetch={authFetch} />
      </div>
    </div>
  )
}

export default UserPanel

