"use client"

import type React from "react"

import { useState } from "react"
import styled from "styled-components"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Calendar, Github, ChromeIcon as Google } from "lucide-react"
import Link from "next/link"

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
  max-width: 500px;
`

const Title = styled.h1`
  color: #1a1a1a;
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;
`

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Section = styled.div`
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 20px;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: #1a1a1a;
  margin-bottom: 15px;
`

const InputGroup = styled.div`
  position: relative;
`

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

const PasswordStrength = styled.div<{ strength: number }>`
  height: 4px;
  background: ${({ strength }) => {
    if (strength === 0) return "#e1e1e1"
    if (strength === 1) return "#e74c3c"
    if (strength === 2) return "#f1c40f"
    if (strength === 3) return "#2ecc71"
    return "#27ae60"
  }};
  transition: all 0.3s ease;
  margin-top: 5px;
  border-radius: 2px;
`

const Button = styled.button<{ isLoading?: boolean }>`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ isLoading }) => (isLoading ? "wait" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${({ isLoading }) => (isLoading ? 0.7 : 1)};

  &:hover {
    transform: ${({ isLoading }) => (isLoading ? "none" : "translateY(-2px)")};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`

const SocialButton = styled(Button)`
  background: white;
  color: #1a1a1a;
  border: 2px solid #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #f8f9fa;
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`

const Checkbox = styled.input`
  margin-top: 4px;
`

const CheckboxLabel = styled.label`
  color: #666;
  font-size: 0.9rem;

  a {
    color: #764ba2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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
`

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  address: string
  password: string
  confirmPassword: string
  terms: boolean
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    let isValid = true

    if (!formData.firstName) {
      newErrors.firstName = "Nome é obrigatório"
      isValid = false
    }

    if (!formData.lastName) {
      newErrors.lastName = "Sobrenome é obrigatório"
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
      isValid = false
    }

    if (!formData.phone) {
      newErrors.phone = "Telefone é obrigatório"
      isValid = false
    } else if (!/^$$\d{2}$$ \d{5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Formato inválido. Use (99) 99999-9999"
      isValid = false
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória"
      isValid = false
    }

    if (!formData.address) {
      newErrors.address = "Endereço é obrigatório"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres"
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
      isValid = false
    }

    if (!formData.terms) {
      newErrors.terms = "Você deve aceitar os termos e condições"
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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSuccess(true)
        // Reset form or redirect
      } catch (error) {
        console.error("Registration failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  return (
    <Container>
      <FormCard>
        <Title>Criar Conta</Title>
        <Subtitle>Preencha seus dados para começar</Subtitle>

        {success && (
          <SuccessMessage>Registro realizado com sucesso! Redirecionando para a página de login...</SuccessMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Informações Pessoais</SectionTitle>
            <InputRow>
              <InputGroup>
                <Icon>
                  <User size={20} />
                </Icon>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Nome"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Icon>
                  <User size={20} />
                </Icon>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Sobrenome"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </InputGroup>
            </InputRow>

            <InputGroup>
              <Icon>
                <Mail size={20} />
              </Icon>
              <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputGroup>

            <InputRow>
              <InputGroup>
                <Icon>
                  <Phone size={20} />
                </Icon>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    setFormData((prev) => ({ ...prev, phone: formatted }))
                  }}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Icon>
                  <Calendar size={20} />
                </Icon>
                <Input
                  type="date"
                  name="birthDate"
                  placeholder="Data de Nascimento"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
                {errors.birthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
              </InputGroup>
            </InputRow>

            <InputGroup>
              <Icon>
                <MapPin size={20} />
              </Icon>
              <Input
                type="text"
                name="address"
                placeholder="Endereço"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </InputGroup>
          </Section>

          <Section>
            <SectionTitle>Senha</SectionTitle>
            <InputGroup>
              <Icon>
                <Lock size={20} />
              </Icon>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordIcon>
              <PasswordStrength strength={calculatePasswordStrength(formData.password)} />
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Icon>
                <Lock size={20} />
              </Icon>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <PasswordIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordIcon>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            </InputGroup>
          </Section>

          <CheckboxGroup>
            <Checkbox type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
            <CheckboxLabel>
              Li e aceito os <Link href="/terms">Termos e Condições</Link> e a{" "}
              <Link href="/privacy">Política de Privacidade</Link>
            </CheckboxLabel>
          </CheckboxGroup>
          {errors.terms && <ErrorMessage>{errors.terms}</ErrorMessage>}

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? "Registrando..." : "Criar Conta"}
          </Button>

          <Divider>ou continue com</Divider>

          <InputRow>
            <SocialButton type="button" onClick={() => console.log("Google login")}>
              <Google size={20} /> Google
            </SocialButton>
            <SocialButton type="button" onClick={() => console.log("Github login")}>
              <Github size={20} /> GitHub
            </SocialButton>
          </InputRow>
        </Form>

        <LinkText>
          Já tem uma conta? <Link href="/Login">Faça login</Link>
        </LinkText>
      </FormCard>
    </Container>
  )
}

