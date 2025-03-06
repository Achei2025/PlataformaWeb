"use client"

import type React from "react"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Calendar,
  Github,
  ChromeIcon as Google,
  Loader2,
  Info,
} from "lucide-react"
import Link from "next/link"

// Brazilian flag colors
const colors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  white: "#ffffff",
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, ${colors.green} 0%, ${colors.blue} 100%);
  padding: 100px 20px 20px 20px;
`

const FormCard = styled.div`
  background: ${colors.white};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
`

const Title = styled.h1`
  color: ${colors.blue};
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
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
`

const Section = styled.div<{ isLast?: boolean }>`
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 20px;
  
  @media (min-width: 768px) {
    border-bottom: none;
    border-right: ${(props) => (props.isLast ? "none" : "1px solid #e1e1e1")};
    padding-right: 20px;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: ${colors.blue};
  margin-bottom: 15px;
`

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
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
    border-color: ${colors.green};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 156, 59, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
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

const LoadingIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.green};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from {
      transform: translateY(-50%) rotate(0deg);
    }
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`

const PasswordStrength = styled.div<{ strength: number }>`
  height: 4px;
  background: ${({ strength }) => {
    if (strength === 0) return "#e1e1e1"
    if (strength === 1) return "#e74c3c"
    if (strength === 2) return colors.yellow
    if (strength === 3) return colors.green
    return "#27ae60"
  }};
  transition: all 0.3s ease;
  margin-top: 5px;
  border-radius: 2px;
`

const Button = styled.button<{ isLoading?: boolean }>`
  background: ${colors.green};
  color: ${colors.white};
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
    background: #00b347;
  }

  &:active {
    transform: translateY(0);
  }
`

const SocialButton = styled(Button)`
  background: ${colors.white};
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
    color: ${colors.blue};
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
`

const AddressSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid #e1e1e1;
  padding-top: 20px;
`

const FieldLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  
  label {
    font-weight: 500;
    color: ${colors.blue};
    margin-right: 5px;
  }
  
  .info-text {
    font-size: 0.8rem;
    color: #666;
    font-style: italic;
  }
`

const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 5px;
  color: ${colors.blue};
  cursor: help;
`

interface FormData {
  firstName: string
  lastName: string
  email: string
  cpf: string
  phone: string
  birthDate: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
  password: string
  confirmPassword: string
  terms: boolean
}

interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingCep, setIsFetchingCep] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    cpf: "",
    phone: "",
    birthDate: "",
    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
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

  const validateCPF = (cpf: string): boolean => {
    // Remove non-numeric characters
    cpf = cpf.replace(/\D/g, "")

    // Check if it has 11 digits
    if (cpf.length !== 11) return false

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cpf)) return false

    // Validate check digits
    let sum = 0
    let remainder

    // First check digit
    for (let i = 1; i <= 9; i++) {
      sum += Number.parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cpf.substring(9, 10))) return false

    // Second check digit
    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += Number.parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cpf.substring(10, 11))) return false

    return true
  }

  const fetchAddressByCep = async (cep: string) => {
    // Remove non-numeric characters
    const cleanCep = cep.replace(/\D/g, "")

    // Check if CEP has 8 digits
    if (cleanCep.length !== 8) {
      setErrors((prev) => ({ ...prev, cep: "CEP deve ter 8 dígitos" }))
      return
    }

    setIsFetchingCep(true)
    setErrors((prev) => ({ ...prev, cep: undefined }))

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data: ViaCepResponse = await response.json()

      if (data.erro) {
        setErrors((prev) => ({ ...prev, cep: "CEP não encontrado" }))
        return
      }

      setFormData((prev) => ({
        ...prev,
        state: data.uf,
        city: data.localidade,
        neighborhood: data.bairro,
        street: data.logradouro,
        complement: data.complemento || prev.complement,
      }))
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
      setErrors((prev) => ({ ...prev, cep: "Erro ao buscar CEP" }))
    } finally {
      setIsFetchingCep(false)
    }
  }

  // Debounce function for CEP lookup
  useEffect(() => {
    const cep = formData.cep.replace(/\D/g, "")
    if (cep.length === 8) {
      const timer = setTimeout(() => {
        fetchAddressByCep(cep)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [formData.cep])

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

    if (!formData.cpf) {
      newErrors.cpf = "CPF é obrigatório"
      isValid = false
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido"
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

    if (!formData.cep) {
      newErrors.cep = "CEP é obrigatório"
      isValid = false
    }

    if (!formData.state) {
      newErrors.state = "Estado é obrigatório"
      isValid = false
    }

    if (!formData.city) {
      newErrors.city = "Cidade é obrigatória"
      isValid = false
    }

    if (!formData.street) {
      newErrors.street = "Rua é obrigatória"
      isValid = false
    }

    if (!formData.number) {
      newErrors.number = "Número é obrigatório"
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

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
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

            <InputGroup>
              <Icon>
                <User size={20} />
              </Icon>
              <Input
                type="text"
                name="cpf"
                placeholder="CPF"
                value={formData.cpf}
                onChange={(e) => {
                  const formatted = formatCPF(e.target.value)
                  setFormData((prev) => ({ ...prev, cpf: formatted }))
                }}
                maxLength={14}
              />
              {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
            </InputGroup>

            <InputGroup style={{ gridColumn: "1 / -1" }}>
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
              <FieldLabel>
                <label htmlFor="birthDate">Data de Nascimento</label>
                <InfoIcon title="Informe sua data de nascimento">
                  <Info size={16} />
                </InfoIcon>
              </FieldLabel>
              <Icon>
                <Calendar size={20} />
              </Icon>
              <Input
                id="birthDate"
                type="date"
                name="birthDate"
                placeholder="Data de Nascimento"
                value={formData.birthDate}
                onChange={handleChange}
              />
              <div className="info-text">Informe a data em que você nasceu</div>
              {errors.birthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
            </InputGroup>

            <AddressSection>
              <SectionTitle>Endereço</SectionTitle>
              <InputGroup>
                <Icon>
                  <MapPin size={20} />
                </Icon>
                <Input
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  value={formData.cep}
                  onChange={(e) => {
                    const formatted = formatCEP(e.target.value)
                    setFormData((prev) => ({ ...prev, cep: formatted }))
                  }}
                  maxLength={9}
                />
                {isFetchingCep && (
                  <LoadingIcon>
                    <Loader2 size={20} />
                  </LoadingIcon>
                )}
                {errors.cep && <ErrorMessage>{errors.cep}</ErrorMessage>}
              </InputGroup>

              <InputRow>
                <InputGroup>
                  <Icon>
                    <MapPin size={20} />
                  </Icon>
                  <Input
                    type="text"
                    name="state"
                    placeholder="Estado"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={isFetchingCep}
                  />
                  {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Icon>
                    <MapPin size={20} />
                  </Icon>
                  <Input
                    type="text"
                    name="city"
                    placeholder="Cidade"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isFetchingCep}
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </InputGroup>
              </InputRow>

              <InputGroup>
                <Icon>
                  <MapPin size={20} />
                </Icon>
                <Input
                  type="text"
                  name="neighborhood"
                  placeholder="Bairro"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  disabled={isFetchingCep}
                />
                {errors.neighborhood && <ErrorMessage>{errors.neighborhood}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Icon>
                  <MapPin size={20} />
                </Icon>
                <Input
                  type="text"
                  name="street"
                  placeholder="Rua"
                  value={formData.street}
                  onChange={handleChange}
                  disabled={isFetchingCep}
                />
                {errors.street && <ErrorMessage>{errors.street}</ErrorMessage>}
              </InputGroup>

              <InputRow>
                <InputGroup>
                  <Icon>
                    <MapPin size={20} />
                  </Icon>
                  <Input
                    type="text"
                    name="number"
                    placeholder="Número"
                    value={formData.number}
                    onChange={handleChange}
                  />
                  {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Icon>
                    <MapPin size={20} />
                  </Icon>
                  <Input
                    type="text"
                    name="complement"
                    placeholder="Complemento"
                    value={formData.complement}
                    onChange={handleChange}
                  />
                </InputGroup>
              </InputRow>
            </AddressSection>
          </Section>

          <Section isLast>
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

            <CheckboxGroup>
              <Checkbox type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
              <CheckboxLabel>
                Li e aceito os <Link href="/terms">Termos e Condições</Link> e a{" "}
                <Link href="/privacy">Política de Privacidade</Link>
              </CheckboxLabel>
            </CheckboxGroup>
            {errors.terms && <ErrorMessage>{errors.terms}</ErrorMessage>}

            <Button type="submit" isLoading={isLoading} style={{ marginTop: "20px" }}>
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
          </Section>
        </Form>

        <LinkText>
          Já tem uma conta? <Link href="/Login">Faça login</Link>
        </LinkText>
      </FormCard>
    </Container>
  )
}

