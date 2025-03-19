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

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id?: string
  name?: string
  cpf?: string
  email?: string
  [key: string]: any
}

type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for token and user data in localStorage
    const storedToken = localStorage.getItem("authToken")
    const storedUserData = localStorage.getItem("userData")

    if (storedToken) {
      setToken(storedToken)

      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData)
          setUser(userData)
        } catch (error) {
          console.error("Failed to parse user data:", error)
          // If user data is invalid, clear everything
          localStorage.removeItem("authToken")
          localStorage.removeItem("userData")
          setToken(null)
        }
      }
    }

    setIsLoading(false)
  }, [])

  const logout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setUser(null)
    setToken(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, token, isLoading, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

