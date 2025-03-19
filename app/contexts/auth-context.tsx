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

