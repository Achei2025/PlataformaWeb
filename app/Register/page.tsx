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

import { useState } from "react"
import { Formik, Form as FormikForm, Field, ErrorMessage as FormikError, type FormikHelpers } from "formik"
import * as Yup from "yup"
import DefaultLayout from "../layouts/layout"
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
  Landmark,
  ChromeIcon as Google,
  Loader2,
  Info,
  Check,
  ArrowLeft,
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

const StyledForm = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
`

const Section = styled.div<{ $isLast?: boolean }>`
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 20px;
  
  @media (min-width: 768px) {
    border-bottom: none;
    border-right: ${(props) => (props.$isLast ? "none" : "1px solid #e1e1e1")};
    padding-right: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: ${colors.blue};
  margin-bottom: 15px;
`

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 25px; /* Increased to accommodate error message */
`

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Input = styled(Field)`
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  z-index: 1;
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

const Button = styled.button<{ $isLoading?: boolean }>`
  background: ${colors.green};
  color: ${colors.white};
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $isLoading }) => ($isLoading ? "wait" : "pointer")};
  transition: all 0.3s ease;
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

const SocialButton = styled(Button)`
  background: ${colors.white};
  color: #1a1a1a;
  border: 2px solid #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 50px;

  &:hover {
    background: #f8f9fa;
  }
`

const SocialButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
  min-height: 50px;
  position: relative; /* Added position relative */

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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

const Checkbox = styled(Field)`
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

const StyledSelect = styled(Field)`
  width: 100%;
  padding: 15px 20px;
  padding-left: 45px;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;

  &:focus {
    border-color: ${colors.green};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 156, 59, 0.2);
  }
`

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const RadioInput = styled(Field)`
  cursor: pointer;
`

const RadioLabel = styled.label`
  cursor: pointer;
  color: #666;
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
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
`

const FormikErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 5px;
`

const SuccessMessage = styled.div`
  background: #d4edda;
  color: ${colors.green};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`

const WarningMessage = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
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

const ConfirmationContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
  margin-bottom: 30px;
`

const ConfirmationSection = styled.div`
  margin-bottom: 20px;
`

const ConfirmationTitle = styled.h3`
  font-size: 1rem;
  color: ${colors.blue};
  margin-bottom: 10px;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 5px;
`

const ConfirmationItem = styled.div`
  display: flex;
  margin-bottom: 8px;
`

const ConfirmationLabel = styled.span`
  font-weight: 500;
  width: 150px;
  color: #666;
`

const ConfirmationValue = styled.span`
  flex: 1;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const BackButton = styled(Button)`
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e1e1e1;
  
  &:hover {
    background: #e9ecef;
  }
`

const InputWithLabel = styled.div`
  position: relative;
`

interface FormValues {
  fullName: string
  email: string
  cpf: string
  phone: string
  birthDate: string
  gender: string
  occupation: string
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
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationValues, setConfirmationValues] = useState<FormValues | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const API_URL = "http://26.190.233.3:8080/api/citizens"

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    cpf: "",
    phone: "",
    birthDate: "",
    gender: "",
    occupation: "",
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
  }

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Nome completo é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    cpf: Yup.string().required("CPF é obrigatório").test("valid-cpf", "CPF inválido", validateCPF),
    phone: Yup.string().required("Telefone é obrigatório"),
    birthDate: Yup.string().required("Data de nascimento é obrigatória"),
    gender: Yup.string(),
    occupation: Yup.string()
      .required("Ocupação é obrigatória")
      .test("not-empty", "Selecione uma ocupação", (value) => value !== ""),
    cep: Yup.string().required("CEP é obrigatório"),
    state: Yup.string().required("Estado é obrigatório"),
    city: Yup.string().required("Cidade é obrigatória"),
    neighborhood: Yup.string().required("Bairro é obrigatório"),
    street: Yup.string().required("Rua é obrigatória"),
    number: Yup.string().required("Número é obrigatório"),
    complement: Yup.string(),
    password: Yup.string().min(8, "Senha deve ter no mínimo 8 caracteres").required("Senha é obrigatória"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas não coincidem")
      .required("Confirmação de senha é obrigatória"),
    terms: Yup.boolean()
      .oneOf([true], "Você deve aceitar os termos e condições")
      .required("Você deve aceitar os termos e condições"),
  })

  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  function validateCPF(cpf: string): boolean {
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

  const fetchAddressByCep = async (cep: string, setFieldValue: any) => {
    // Remove non-numeric characters
    const cleanCep = cep.replace(/\D/g, "")

    // Check if CEP has 8 digits
    if (cleanCep.length !== 8) {
      return
    }

    setIsFetchingCep(true)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data: ViaCepResponse = await response.json()

      if (data.erro) {
        return
      }

      setFieldValue("state", data.uf)
      setFieldValue("city", data.localidade)
      setFieldValue("neighborhood", data.bairro)
      setFieldValue("street", data.logradouro)
      if (data.complemento) {
        setFieldValue("complement", data.complemento)
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    } finally {
      setIsFetchingCep(false)
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3").substring(0, 15)
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

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const goBackToForm = () => {
    setShowConfirmation(false)
  }

  const submitToApi = async (values: FormValues) => {
    setIsLoading(true)
    setApiError(null)

    try {
      // Preparar os dados para envio
      const userData = {
        cpf: values.cpf.replace(/\D/g, ""), // Remove caracteres não numéricos
        fullName: values.fullName,
        email: values.email,
        phone: values.phone.replace(/\D/g, ""), // Remove caracteres não numéricos
        user: {
          password: values.password,
        },
        birthDate: values.birthDate,
        gender: values.gender,
        occupation: values.occupation,
        address: {
          zipCode: values.cep.replace(/\D/g, ""),
          stateName: values.state,
          stateCode: values.state.substring(0, 2).toUpperCase(), // Assuming state is in the format "XX - State Name" or just "XX"
          city: values.city,
          neighborhood: values.neighborhood,
          street: values.street,
          complement: values.complement,
          complementNumber: values.number,
        },
      }

      console.log("Enviando dados para API:", userData)

      // Make the API call
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Falha ao registrar usuário (Status: ${response.status})`)
      }

      const result = await response.json()

      console.log("Registro realizado com sucesso:", result)

      setSuccess(true)
      setShowConfirmation(false)

      // Redirecionar após registro bem-sucedido
      setTimeout(() => {
        window.location.href = "/Login"
      }, 2000)
    } catch (error) {
      console.error("Falha no registro:", error)
      setApiError(error instanceof Error ? error.message : "Erro ao registrar. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log("Valores do formulário:", values) // Adicione esta linha
    if (!showConfirmation) {
      setConfirmationValues(values)
      setShowConfirmation(true)
      window.scrollTo(0, 0)
      setSubmitting(false)
      return
    }

    await submitToApi(values)
    setSubmitting(false)
  }

  return (
    <DefaultLayout>
      <Container>
        <FormCard>
          <Title>Criar Conta</Title>
          <Subtitle>Preencha seus dados para começar</Subtitle>

          {success && (
            <SuccessMessage>Registro realizado com sucesso! Redirecionando para a página de login...</SuccessMessage>
          )}

          {showConfirmation && confirmationValues && (
            <ConfirmationContainer>
              <SectionTitle>Confirme seus dados</SectionTitle>

              <ConfirmationSection>
                <ConfirmationTitle>Informações Pessoais</ConfirmationTitle>
                <ConfirmationItem>
                  <ConfirmationLabel>Nome Completo:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.fullName}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Email:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.email}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>CPF:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.cpf}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Telefone:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.phone}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Data de Nascimento:</ConfirmationLabel>
                  <ConfirmationValue>{formatDate(confirmationValues.birthDate)}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Ocupação:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.occupation}</ConfirmationValue>
                </ConfirmationItem>
              </ConfirmationSection>

              <ConfirmationSection>
                <ConfirmationTitle>Endereço</ConfirmationTitle>
                <ConfirmationItem>
                  <ConfirmationLabel>CEP:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.cep}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Estado:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.state}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Cidade:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.city}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Bairro:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.neighborhood}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Rua:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.street}</ConfirmationValue>
                </ConfirmationItem>
                <ConfirmationItem>
                  <ConfirmationLabel>Número:</ConfirmationLabel>
                  <ConfirmationValue>{confirmationValues.number}</ConfirmationValue>
                </ConfirmationItem>
                {confirmationValues.complement && (
                  <ConfirmationItem>
                    <ConfirmationLabel>Complemento:</ConfirmationLabel>
                    <ConfirmationValue>{confirmationValues.complement}</ConfirmationValue>
                  </ConfirmationItem>
                )}
              </ConfirmationSection>

              <ButtonGroup>
                <BackButton type="button" onClick={goBackToForm}>
                  <ArrowLeft size={16} style={{ marginRight: "5px" }} /> Voltar e editar
                </BackButton>
                <Button
                  type="button"
                  onClick={() => submitToApi(confirmationValues)}
                  disabled={isLoading}
                  $isLoading={isLoading}
                >
                  {isLoading ? "Registrando..." : "Confirmar e criar conta"}{" "}
                  {!isLoading && <Check size={16} style={{ marginLeft: "5px" }} />}
                </Button>
              </ButtonGroup>

              {apiError && <div style={{ color: "#e74c3c", marginTop: "15px", textAlign: "center" }}>{apiError}</div>}
            </ConfirmationContainer>
          )}

          {!showConfirmation && (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                <StyledForm>
                  <Section>
                    <SectionTitle>Informações Pessoais</SectionTitle>
                    <InputGroup>
                      <Icon>
                        <User size={20} />
                      </Icon>
                      <Input type="text" name="fullName" placeholder="Nome Completo" />
                      {errors.fullName && touched.fullName && (
                        <FormikErrorMessage>
                          <FormikError name="fullName" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <Icon>
                        <Mail size={20} />
                      </Icon>
                      <Input type="email" name="email" placeholder="Email" />
                      {errors.email && touched.email && (
                        <FormikErrorMessage>
                          <FormikError name="email" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <Icon>
                        <User size={20} />
                      </Icon>
                      <Input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        maxLength={14}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const formatted = formatCPF(e.target.value)
                          setFieldValue("cpf", formatted)
                        }}
                      />
                      {errors.cpf && touched.cpf && (
                        <FormikErrorMessage>
                          <FormikError name="cpf" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputGroup style={{ gridColumn: "1 / -1" }}>
                      <Icon>
                        <Phone size={20} />
                      </Icon>
                      <Input
                        type="text"
                        name="phone"
                        placeholder="Telefone"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const formatted = formatPhone(e.target.value)
                          setFieldValue("phone", formatted)
                        }}
                      />
                      {errors.phone && touched.phone && (
                        <FormikErrorMessage>
                          <FormikError name="phone" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel>
                        <label htmlFor="birthDate">Data de Nascimento</label>
                        <InfoIcon title="Informe sua data de nascimento">
                          <Info size={16} />
                        </InfoIcon>
                      </FieldLabel>
                      <InputWithLabel>
                        <Icon>
                          <Calendar size={20} />
                        </Icon>
                        <Input id="birthDate" type="date" name="birthDate" placeholder="Data de Nascimento" />
                      </InputWithLabel>
                      {errors.birthDate && touched.birthDate && (
                        <FormikErrorMessage>
                          <FormikError name="birthDate" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <SectionTitle style={{ marginTop: "20px" }}>Senha</SectionTitle>
                    <InputGroup>
                      <Icon>
                        <Lock size={20} />
                      </Icon>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Senha"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("password", e.target.value)
                          setPasswordStrength(calculatePasswordStrength(e.target.value))
                        }}
                      />
                      <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </PasswordIcon>
                      <PasswordStrength strength={passwordStrength} />
                      {errors.password && touched.password && (
                        <FormikErrorMessage>
                          <FormikError name="password" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <Icon>
                        <Lock size={20} />
                      </Icon>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                      />
                      <PasswordIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </PasswordIcon>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <FormikErrorMessage>
                          <FormikError name="confirmPassword" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <div>
                      <CheckboxGroup>
                        <Checkbox type="checkbox" name="terms" id="terms" />
                        <CheckboxLabel htmlFor="terms">
                          Li e aceito os <Link href="/terms">Termos e Condições</Link> e a{" "}
                          <Link href="/privacy">Política de Privacidade</Link>
                        </CheckboxLabel>
                      </CheckboxGroup>
                      {errors.terms && touched.terms && (
                        <div style={{ color: "#e74c3c", fontSize: "0.875rem", marginTop: "5px", marginLeft: "25px" }}>
                          <FormikError name="terms" component="div" />
                        </div>
                      )}
                    </div>
                  </Section>

                  <Section $isLast>
                    <InputGroup>
                      <FieldLabel>
                        <label>Gênero</label>
                      </FieldLabel>
                      <RadioGroup role="group" aria-labelledby="gender-group">
                        <RadioOption>
                          <RadioInput type="radio" id="gender-male" name="gender" value="Masculino" />
                          <RadioLabel htmlFor="gender-male">Masculino</RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput type="radio" id="gender-female" name="gender" value="Feminino" />
                          <RadioLabel htmlFor="gender-female">Feminino</RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput type="radio" id="gender-other" name="gender" value="Outro" />
                          <RadioLabel htmlFor="gender-other">Outro</RadioLabel>
                        </RadioOption>
                      </RadioGroup>
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel>
                        <label htmlFor="occupation">Ocupação</label>
                      </FieldLabel>
                      <InputWithLabel>
                        <Icon>
                          <Landmark size={20} />
                        </Icon>
                        <StyledSelect
                          as="select"
                          id="occupation"
                          name="occupation"
                          value={values.occupation}
                          onChange={(e) => {
                            setFieldValue("occupation", e.target.value)
                          }}
                        >
                          <option value="">Selecione sua ocupação</option>
                          <option value="Estudante">Estudante</option>
                          <option value="Profissional">Profissional</option>
                          <option value="Autônomo">Autônomo</option>
                          <option value="Outro">Outro</option>
                        </StyledSelect>
                      </InputWithLabel>
                      {errors.occupation && touched.occupation && (
                        <FormikErrorMessage>
                          <FormikError name="occupation" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <SectionTitle style={{ marginTop: "20px" }}>Endereço</SectionTitle>

                    <InputGroup>
                      <Icon>
                        <MapPin size={20} />
                      </Icon>
                      <Input
                        type="text"
                        name="cep"
                        placeholder="CEP"
                        maxLength={9}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const formatted = formatCEP(e.target.value)
                          setFieldValue("cep", formatted)

                          // Buscar endereço quando CEP tiver 8 dígitos
                          const cleanCep = formatted.replace(/\D/g, "")
                          if (cleanCep.length === 8) {
                            fetchAddressByCep(cleanCep, setFieldValue)
                          }
                        }}
                      />
                      {isFetchingCep && (
                        <LoadingIcon>
                          <Loader2 size={20} />
                        </LoadingIcon>
                      )}
                      {errors.cep && touched.cep && (
                        <FormikErrorMessage>
                          <FormikError name="cep" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputRow>
                      <InputGroup>
                        <Icon>
                          <MapPin size={20} />
                        </Icon>
                        <Input type="text" name="state" placeholder="Estado" disabled={isFetchingCep} />
                        {errors.state && touched.state && (
                          <FormikErrorMessage>
                            <FormikError name="state" component="div" />
                          </FormikErrorMessage>
                        )}
                      </InputGroup>

                      <InputGroup>
                        <Icon>
                          <MapPin size={20} />
                        </Icon>
                        <Input type="text" name="city" placeholder="Cidade" disabled={isFetchingCep} />
                        {errors.city && touched.city && (
                          <FormikErrorMessage>
                            <FormikError name="city" component="div" />
                          </FormikErrorMessage>
                        )}
                      </InputGroup>
                    </InputRow>

                    <InputGroup>
                      <Icon>
                        <MapPin size={20} />
                      </Icon>
                      <Input type="text" name="neighborhood" placeholder="Bairro" disabled={isFetchingCep} />
                      {errors.neighborhood && touched.neighborhood && (
                        <FormikErrorMessage>
                          <FormikError name="neighborhood" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <Icon>
                        <MapPin size={20} />
                      </Icon>
                      <Input type="text" name="street" placeholder="Rua" disabled={isFetchingCep} />
                      {errors.street && touched.street && (
                        <FormikErrorMessage>
                          <FormikError name="street" component="div" />
                        </FormikErrorMessage>
                      )}
                    </InputGroup>

                    <InputRow>
                      <InputGroup>
                        <Icon>
                          <MapPin size={20} />
                        </Icon>
                        <Input type="text" name="number" placeholder="Número" />
                        {errors.number && touched.number && (
                          <FormikErrorMessage>
                            <FormikError name="number" component="div" />
                          </FormikErrorMessage>
                        )}
                      </InputGroup>

                      <InputGroup>
                        <Icon>
                          <MapPin size={20} />
                        </Icon>
                        <Input type="text" name="complement" placeholder="Complemento" />
                      </InputGroup>
                    </InputRow>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      $isLoading={isSubmitting}
                      style={{ marginTop: "auto" }}
                    >
                      {isSubmitting ? "Registrando..." : "Criar Conta"}
                    </Button>

                    <Divider>ou continue com</Divider>

                    <SocialButtonsContainer>
                      <SocialButton type="button" onClick={() => console.log("Google login")}>
                        <Google size={20} /> Google
                      </SocialButton>
                      <SocialButton type="button" onClick={() => console.log("GOV login")}>
                        <Landmark size={20} /> GOV
                      </SocialButton>
                    </SocialButtonsContainer>
                  </Section>
                </StyledForm>
              )}
            </Formik>
          )}

          <LinkText>
            Já tem uma conta? <Link href="/Login">Faça login</Link>
          </LinkText>
          {apiError && <div style={{ color: "#e74c3c", textAlign: "center", marginTop: "10px" }}>{apiError}</div>}
        </FormCard>
      </Container>
    </DefaultLayout>
  )
}

