"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styled, { keyframes } from "styled-components"
import { Eye, EyeOff, Mail, Lock, ChromeIcon as Google, FlagIcon as Gov, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.6s ease-out;
`

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const Title = styled.h1`
  color: #1a1a1a;
  font-size: 2rem;
  margin: 20px 0 10px;
  text-align: center;
`

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`

const UserTypeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const UserTypeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  border: 2px solid ${(props) => (props.$active ? "#764ba2" : "#e1e1e1")};
  border-radius: 10px;
  background: ${(props) => (props.$active ? "#764ba2" : "white")};
  color: ${(props) => (props.$active ? "white" : "#666")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#764ba2" : "#f8f9fa")};
  }
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
    border-color: #764ba2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(118, 75, 162, 0.2);
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
  color: #764ba2;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const Button = styled.button<{ $isLoading?: boolean }>`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  }

  &:active {
    transform: translateY(0);
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #666;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e1e1e1;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`

const SocialButton = styled(Button)`
  background: white;
  color: #1a1a1a;
  border: 2px solid #e1e1e1;
  
  &:hover {
    background: #f8f9fa;
  }
`

const SocialButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

const LinkText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;

  a {
    color: #764ba2;
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
  color: #155724;
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

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"citizen" | "police">("citizen")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = { email: "", password: "" }
    let isValid = true

    if (!email) {
      newErrors.email = "Email é obrigatório"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
      isValid = false
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSuccess(true)
        if (userType === "citizen") {
          router.push("/System-Citizen")
        }
      } catch (error) {
        console.error("Login failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  return (
    <Container>
      <FormCard>
        <LogoContainer>
          <Image src="/placeholder.svg?height=60&width=60" alt="Logo" width={60} height={60} />
        </LogoContainer>
        <Title>Bem-vindo de volta</Title>
        <Subtitle>Faça login para continuar</Subtitle>

        <UserTypeContainer>
          <UserTypeButton type="button" $active={userType === "citizen"} onClick={() => setUserType("citizen")}>
            Cidadão
          </UserTypeButton>
          <UserTypeButton type="button" $active={userType === "police"} onClick={() => setUserType("police")}>
            Policial
          </UserTypeButton>
        </UserTypeContainer>

        {success && <SuccessMessage>Login realizado com sucesso! Redirecionando...</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Icon>
              <Mail size={20} />
            </Icon>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
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

          <Divider>ou continue com</Divider>

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
        </Form>

        <LinkText>
          Não tem uma conta? <Link href="/Register">Registre-se</Link>
        </LinkText>
      </FormCard>
    </Container>
  )
}

