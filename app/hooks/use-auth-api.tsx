"use client"

import { useAuth } from "@/app/contexts/auth-context"

export const useAuthApi = () => {
  const { token, setToken, setUser, setUserType, logout } = useAuth()

  // Função para fazer requisições autenticadas
  const authFetch = async (url: string, options: RequestInit = {}) => {
    // Obter o token armazenado
    const storedToken = localStorage.getItem("authToken") || token

    // Configurar headers com autenticação
    const headers = new Headers(options.headers || {})

    if (storedToken) {
      headers.set("Authorization", `Bearer ${storedToken}`)
    }

    // Verificar se a URL é relativa e adicionar o host da API se necessário
    let fullUrl = url
    if (url.startsWith("/api/") && !url.includes("localhost")) {
      fullUrl = `http://26.190.233.3:8080${url}`
      console.log(`API Request: Convertendo URL relativa para absoluta: ${fullUrl}`)
    }

    try {
      // Fazer a requisição
      const response = await fetch(fullUrl, {
        ...options,
        headers,
      })

      // Tratar respostas 401 Unauthorized
      if (response.status === 401) {
        console.error("API Request: Token inválido ou expirado, fazendo logout")
        // Token expirado ou inválido, fazer logout
        logout()
        return response
      }

      if (!response.ok) {
        console.error(`API Request: Erro ${response.status} ao acessar ${fullUrl}`)
      } else {
        console.log(`API Request: Sucesso ao acessar ${fullUrl}`)
      }

      return response
    } catch (error) {
      console.error(`API Request: Erro ao acessar ${fullUrl}`, error)
      throw error
    }
  }

  // Login function
  const login = async (username: string, password: string, userType: "citizen" | "police") => {
    try {
      console.log("Login - Tentando login com:", { username, userType })

      // Determine the API URL based on user type
      const apiUrl =
        userType === "citizen" ? "http://26.190.233.3:8080/auth/login" : "http://26.190.233.3:8080/api/police/login"

      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.error("Login - Falha na resposta:", { status: response.status, errorData })
        throw new Error(errorData?.message || `Login failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Login - Resposta da API:", {
        success: true,
        hasToken: !!result.token,
        hasUser: !!result.user,
      })

      // Store the access token
      if (result.token) {
        // Update context
        setToken(result.token)
        setUserType(userType)

        // Store in localStorage
        localStorage.setItem("authToken", result.token)
        localStorage.setItem("userType", userType)
        console.log("Login - Token e userType salvos no localStorage")

        // Store user data
        if (result.user) {
          setUser(result.user)
          localStorage.setItem("userData", JSON.stringify(result.user))
          console.log("Login - Dados do usuário salvos no localStorage:", result.user)
        } else {
          // Criar dados mínimos do usuário com base no username
          const minimalUser = {
            id: username,
            username: username,
          }
          setUser(minimalUser)
          localStorage.setItem("userData", JSON.stringify(minimalUser))
          console.log("Login - Dados mínimos do usuário criados e salvos:", minimalUser)
        }

        return { success: true, data: result }
      }

      console.warn("Login - Nenhum token recebido na resposta")
      return { success: false, error: "No token received" }
    } catch (error) {
      console.error("Login failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  return {
    login,
    logout,
    authFetch,
    storedToken: localStorage.getItem("authToken") || token,
  }
}

