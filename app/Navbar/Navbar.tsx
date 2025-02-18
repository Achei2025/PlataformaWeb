"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import styled, { ThemeProvider } from "styled-components"
import AccountDropdown from "@/app/Navbar/AccountDropdown"
import { Button } from "@/app/components/ui/button"

const theme = {
  colors: {
    primary: "#4a90e2",
    secondary: "#f39c12",
    background: {
      light: "rgba(255, 255, 255, 0.9)",
      dark: "rgba(0, 0, 0, 0.8)",
    },
    text: {
      light: "#4a90e2", // Azul
      dark: "#333333", // Preto
    },
  },
}

const StyledNav = styled(motion.nav)<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => (props.$isScrolled ? props.theme.colors.background.light : "transparent")};
  backdrop-filter: ${(props) => (props.$isScrolled ? "blur(10px)" : "none")};
  box-shadow: ${(props) => (props.$isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none")};
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`

const Logo = styled(Link)<{ $isScrolled: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.$isScrolled ? props.theme.colors.text.dark : props.theme.colors.text.light)};
  transition: color 0.3s ease-in-out;
`

const NavItems = styled.ul<{ $isOpen: boolean; $isScrolled: boolean }>`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${(props) => (props.$isScrolled ? props.theme.colors.background.light : props.theme.colors.background.dark)};
    padding: 1rem;
    clip-path: ${(props) => (props.$isOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)")};
    transition: clip-path 0.3s ease-in-out;
  }
`

const NavItem = styled(Link)<{ $isActive: boolean; $isScrolled: boolean }>`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.secondary
      : props.$isScrolled
        ? props.theme.colors.text.dark
        : props.theme.colors.text.light};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    color: ${(props) => (props.$isScrolled ? props.theme.colors.text.dark : props.theme.colors.text.light)};
  }
`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", text: "Home" },
    { href: "/about", text: "Sobre" },
    { href: "#services", text: "Serviços" },
    { href: "#contact", text: "Contato" },
    { href: "/download", text: "Download" },
  ]

  return (
    <ThemeProvider theme={theme}>
      <StyledNav
        $isScrolled={isScrolled}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <NavContainer>
          <Logo href="/" $isScrolled={isScrolled}>
            Achei!
          </Logo>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${isScrolled ? "text-black" : "text-blue-500"}`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <NavItems $isOpen={isOpen} $isScrolled={isScrolled}>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  $isActive={pathname === item.href}
                  $isScrolled={isScrolled}
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </NavItem>
              </li>
            ))}
            <li>
              <AccountDropdown isScrolled={isScrolled} />
            </li>
          </NavItems>
        </NavContainer>
      </StyledNav>
    </ThemeProvider>
  )
}

