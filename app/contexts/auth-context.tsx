"use client"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define the User type
type User = {
  id?: string
  name?: string
  cpf?: string
  email?: string
  [key: string]: any
}

// Define the AuthContextType
type AuthContextType = {
  user: User | null
  token: string | null
  userType: "citizen" | "police" | null
  isLoading: boolean
  logout: () => void
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  setUserType: (type: "citizen" | "police" | null) => void
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  userType: null,
  isLoading: true,
  logout: () => {},
  setToken: () => {},
  setUser: () => {},
  setUserType: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [userType, setUserType] = useState<"citizen" | "police" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load auth state from localStorage on component mount
  useEffect(() => {
    // Check for token and user data in localStorage
    const storedToken = localStorage.getItem("authToken")
    const storedUserData = localStorage.getItem("userData")
    const storedUserType = localStorage.getItem("userType") as "citizen" | "police" | null

    console.log("AuthContext - Dados carregados do localStorage:", {
      token: storedToken ? "Token existe" : "Token não existe",
      userType: storedUserType,
      userData: storedUserData ? "Dados do usuário existem" : "Dados do usuário não existem",
    })

    if (storedToken) {
      setToken(storedToken)
      setUserType(storedUserType)

      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData)
          setUser(userData)
          console.log("AuthContext - Dados do usuário carregados:", userData)
        } catch (error) {
          console.error("Failed to parse user data:", error)
          // If user data is invalid, clear everything
          localStorage.removeItem("authToken")
          localStorage.removeItem("userData")
          localStorage.removeItem("userType")
          setToken(null)
          setUserType(null)
        }
      }
    }

    setIsLoading(false)
  }, [])

  // Logout function
  const logout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    localStorage.removeItem("userType")
    localStorage.removeItem("cpf")
    localStorage.removeItem("matricula")

    // Reset state
    setUser(null)
    setToken(null)
    setUserType(null)

    // Redirect to login page
    router.push("/Login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userType,
        isLoading,
        logout,
        setToken,
        setUser,
        setUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

