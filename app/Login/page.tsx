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
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styled, { keyframes } from "styled-components"
import { Eye, EyeOff, User, Lock, ChromeIcon as Google, FlagIcon as Gov, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import DefaultLayout from "../layouts/layout"

// Brazilian flag colors
const colors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  white: "#ffffff",
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 108vh;
  background: linear-gradient(135deg, ${colors.green} 0%, ${colors.blue} 100%);
  padding: 20px;
  overflow-y: auto;
`

const FormCard = styled.div`
  background: ${colors.white};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  animation: ${fadeIn} 0.6s ease-out;
`

const FormLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: 767px) {
    margin-top: 20px;
  }
`

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: ${colors.blue};
  font-size: 2rem;
  margin: 0 0 10px;
  text-align: center;
`

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 5px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  padding-left: 45px;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${colors.green};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 156, 59, 0.2);
  }
`

const Icon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`

const PasswordIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
`

const RememberForgotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const CheckboxLabel = styled.label`
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
`

const ForgotPassword = styled(Link)`
  color: ${colors.blue};
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const Button = styled.button<{ $isLoading?: boolean }>`
  background: ${colors.green};
  color: white;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $isLoading }) => ($isLoading ? "wait" : "pointer")};
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};

  &:hover {
    transform: ${({ $isLoading }) => ($isLoading ? "none" : "translateY(-2px)")};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: #00b347;
  }

  &:active {
    transform: translateY(0);
  }
`

const SectionTitle = styled.h3`
  color: ${colors.blue};
  font-size: 1.1rem;
  margin: 0 0 15px;
`

const SocialButton = styled(Button)`
  background: ${colors.white};
  color: #1a1a1a;
  border: 2px solid #e1e1e1;
  
  &:hover {
    background: #f8f9fa;
  }
`

const SocialButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`

const StyledLinkText = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 25px;

  a {
    color: ${colors.blue};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
`

const SuccessMessage = styled.div`
  background: #d4edda;
  color: ${colors.green};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-out;
`

const ErrorAlert = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-out;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = styled(Loader2)`
  animation: ${rotate} 1s linear infinite;
`

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 25px;
  background: linear-gradient(135deg, rgba(0, 156, 59, 0.05) 0%, rgba(0, 39, 118, 0.05) 100%);
  border-radius: 15px;
  margin-bottom: 20px;
  
  h2 {
    color: ${colors.blue};
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    text-align: left;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const UserTypeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`

const UserTypeButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ $active }) => ($active ? colors.green : "#e1e1e1")};
  color: ${({ $active }) => ($active ? "white" : "#666")};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${colors.green};
    color: white;
  }
`

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"citizen" | "police">("citizen")
  const [showPassword, setShowPassword] = useState(false)
  const [cpf, setCpf] = useState("")
  const [matricula, setMatricula] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ cpf: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Check if there are saved credentials on component mount
  useEffect(() => {
    const savedUserType = localStorage.getItem("userType") as "citizen" | "police" | null
    if (savedUserType) {
      setUserType(savedUserType)
      if (savedUserType === "citizen") {
        const savedCpf = localStorage.getItem("cpf")
        if (savedCpf) setCpf(savedCpf)
      } else {
        const savedMatricula = localStorage.getItem("matricula")
        if (savedMatricula) setMatricula(savedMatricula)
      }
      setRememberMe(true)
    }
  }, [])

  const validateForm = () => {
    const newErrors = { cpf: "", password: "" }
    let isValid = true

    if (userType === "citizen") {
      if (!cpf) {
        newErrors.cpf = "CPF é obrigatório"
        isValid = false
      } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        newErrors.cpf = "CPF inválido"
        isValid = false
      }
    } else {
      if (!matricula) {
        newErrors.cpf = "Matrícula é obrigatória"
        isValid = false
      } else if (matricula.length < 5) {
        // Assuming police registration numbers are at least 5 digits
        newErrors.cpf = "Matrícula inválida"
        isValid = false
      }
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Modify the handleSubmit function to use the correct JSON format
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setApiError(null)

      try {
        // Prepare data in the required format
        const loginData = {
          username: userType === "citizen" ? cpf.replace(/\D/g, "") : matricula,
          password: password
        }

        // Determine the API URL based on user type
        const apiUrl =
          userType === "citizen" ? "http://26.190.233.3:8080/auth/login" : "http://26.190.233.3:8080/api/police/login"

        // Make the API call
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(errorData?.message || `Falha ao realizar login: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        console.log("Login realizado com sucesso:", result)

        // Store the access token
        if (result.token) {
          localStorage.setItem("authToken", result.token)

          // Store user data for use on other pages
          if (result.user) {
            localStorage.setItem("userData", JSON.stringify(result.user))
          }

          // If "remember me" is checked, store credentials
          if (rememberMe) {
            localStorage.setItem("userType", userType)
            if (userType === "citizen") {
              localStorage.setItem("cpf", cpf)
            } else {
              localStorage.setItem("matricula", matricula)
            }
          }
        }

        setSuccess(true)

        // Redirect after a brief delay to show the success message
        setTimeout(() => {
          if (userType === "citizen") {
            router.push("/System-Citizen")
          } else {
            router.push("/System-Police")
          }
        }, 1000)
      } catch (error) {
        console.error("Login failed:", error)
        setApiError(error instanceof Error ? error.message : "Erro ao fazer login. Por favor, tente novamente.")
        setIsLoading(false)
      }
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Implementação futura para login social
    console.log(`Login with ${provider}`)
  }

  // Função para formatar o CPF
  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`
  }

  return (
    <DefaultLayout>
      <Container>
        <FormCard>
          {success && <SuccessMessage>Login realizado com sucesso! Redirecionando...</SuccessMessage>}
          {apiError && <ErrorAlert>{apiError}</ErrorAlert>}

          <FormLayout>
            <LeftColumn>
              <LogoContainer>
                <Image src="/placeholder.svg?height=60&width=60" alt="Logo" width={60} height={60} />
              </LogoContainer>
              <Title>Bem-vindo de volta</Title>
              <Subtitle>Faça login para continuar</Subtitle>
              <StyledLinkText>
                Não tem uma conta? <Link href="/Register">Registre-se</Link>
              </StyledLinkText>

              <UserTypeContainer>
                <UserTypeButton
                  type="button"
                  $active={userType === "citizen"}
                  onClick={() => {
                    setUserType("citizen")
                    setMatricula("") // Clear matrícula when switching to citizen
                  }}
                >
                  Cidadão
                </UserTypeButton>
                <UserTypeButton
                  type="button"
                  $active={userType === "police"}
                  onClick={() => {
                    setUserType("police")
                    setCpf("") // Clear CPF when switching to police
                  }}
                >
                  Policial
                </UserTypeButton>
              </UserTypeContainer>

              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Icon>
                    <User size={20} />
                  </Icon>
                  {userType === "citizen" ? (
                    <Input
                      type="text"
                      placeholder="CPF"
                      value={cpf}
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value)
                        if (formatted.length <= 14) setCpf(formatted)
                      }}
                    />
                  ) : (
                    <Input
                      type="text"
                      placeholder="Matrícula"
                      value={matricula}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "") // Remove non-digits
                        setMatricula(value)
                      }}
                    />
                  )}
                  {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Icon>
                    <Lock size={20} />
                  </Icon>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </PasswordIcon>
                  {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </InputGroup>

                <RememberForgotRow>
                  <CheckboxGroup>
                    <Checkbox
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <CheckboxLabel htmlFor="rememberMe">Lembrar-me</CheckboxLabel>
                  </CheckboxGroup>
                  <ForgotPassword href="/auth/forgot-password">Esqueceu a senha?</ForgotPassword>
                </RememberForgotRow>

                <Button type="submit" $isLoading={isLoading} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoadingSpinner size={20} />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </Form>
            </LeftColumn>

            <RightColumn>
              <WelcomeSection>
                <h2>Acesse sua conta</h2>
                <p>
                  Bem-vindo ao nosso sistema. Faça login para acessar todos os recursos disponíveis para você. Mantenha
                  seus dados atualizados e aproveite nossa plataforma.
                </p>
                <p>Caso tenha problemas para acessar sua conta, entre em contato com nosso suporte técnico.</p>
              </WelcomeSection>

              <SideSection>
                <SectionTitle>Você também pode entrar com:</SectionTitle>
                <SocialButtonsContainer>
                  <SocialButton type="button" onClick={() => handleSocialLogin("google")}>
                    <Google size={20} />
                    Google
                  </SocialButton>
                  <SocialButton type="button" onClick={() => handleSocialLogin("gov")}>
                    <Gov size={20} />
                    GOV
                  </SocialButton>
                </SocialButtonsContainer>
              </SideSection>
            </RightColumn>
          </FormLayout>
        </FormCard>
      </Container>
    </DefaultLayout>
  )
}

