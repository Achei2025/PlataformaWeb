"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import styled, { ThemeProvider } from "styled-components"
import theme from "@/app/theme"

interface LoginModalProps {
  onClose: () => void
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 28rem;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`

const CloseButton = styled.button`
  color: #6B7280;
  &:hover {
    color: #374151;
  }
`

const InputLabel = styled.label`
  display: block;
  color: #374151;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: ${(props) => props.theme.colors.primary};
  }
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`

export default function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted", { email, password })
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <ThemeProvider theme={theme}>
      <ModalOverlay variants={overlayVariants} initial="hidden" animate="visible" exit="exit">
        <ModalContent variants={modalVariants} initial="hidden" animate="visible" exit="exit">
          <ModalHeader>
            <ModalTitle>Login</ModalTitle>
            <CloseButton onClick={onClose}>
              <X size={24} />
            </CloseButton>
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-6">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <SubmitButton type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Login
            </SubmitButton>
          </form>
        </ModalContent>
      </ModalOverlay>
    </ThemeProvider>
  )
}

