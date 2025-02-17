"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import styled, { ThemeProvider } from "styled-components"
import LoadingScreen from "./LoadingScreen"
import LoginModal from "@/app/components/ui/LoginModal"
import theme from "@/app/theme"

const StyledNav = styled(motion.nav)<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  transition: all 0.3s;
  background-color: ${(props) => (props.$isScrolled ? props.theme.colors.background.dark : props.theme.colors.background.light)};
  box-shadow: ${(props) => (props.$isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none")};
`

const Logo = styled(Link)<{ $isScrolled: boolean }>`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => (props.$isScrolled ? props.theme.colors.text.dark : props.theme.colors.text.light)};
`

const NavItemStyled = styled(Link)<{ $isActive: boolean; $isScrolled: boolean }>`
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  transition: color 0.3s;
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.secondary
      : props.$isScrolled
        ? props.theme.colors.text.dark
        : props.theme.colors.text.light};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`

const NavItemBorder = styled.span<{ $isHovered: boolean; $isActive: boolean }>`
  position: absolute;
  inset: 0;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  opacity: ${(props) => (props.$isHovered || props.$isActive ? 1 : 0)};
  transition: clip-path 0.3s ease-in-out, opacity 0.3s ease-in-out;
  clip-path: ${(props) => (props.$isHovered || props.$isActive ? "inset(0 0 0 0)" : "inset(100% 0 0 0)")};
`

const NavItem = ({
  href,
  text,
  isActive,
  isScrolled,
}: { href: string; text: string; isActive: boolean; isScrolled: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <NavItemStyled
      href={href}
      $isActive={isActive}
      $isScrolled={isScrolled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <NavItemBorder $isHovered={isHovered} $isActive={isActive} />
    </NavItemStyled>
  )
}

const LoginButton = styled.button<{ $isScrolled: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  transition: color 0.3s;
  color: ${(props) => (props.$isScrolled ? props.theme.colors.text.dark : props.theme.colors.text.light)};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLoadingComplete = () => {
    setLoadingComplete(true)
  }

  const navbarVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.2,
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  }

  return (
    <ThemeProvider theme={theme}>
      {!loadingComplete && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {loadingComplete && (
        <StyledNav $isScrolled={isScrolled} variants={navbarVariants} initial="hidden" animate="visible">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.div variants={logoVariants} initial="hidden" animate="visible">
                <Logo href="/" $isScrolled={isScrolled}>
                  Achei!
                </Logo>
              </motion.div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`${isScrolled ? "text-black" : "text-blue-600"} focus:outline-none`}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <ul
                className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} absolute md:relative top-full left-0 right-0 ${
                  isScrolled ? "bg-white" : "bg-transparent"
                } md:bg-transparent p-4 md:p-0`}
              >
                <li>
                  <NavItem href="/" text="Home" isActive={pathname === "/"} isScrolled={isScrolled} />
                </li>
                <li>
                  <NavItem href="/about" text="Sobre" isActive={pathname === "/about"} isScrolled={isScrolled} />
                </li>
                <li>
                  <NavItem
                    href="#services"
                    text="Serviços"
                    isActive={pathname === "#services"}
                    isScrolled={isScrolled}
                  />
                </li>
                <li>
                  <NavItem href="#contact" text="Contato" isActive={pathname === "#contact"} isScrolled={isScrolled} />
                </li>
                <li>
                  <NavItem
                    href="/download"
                    text="Download"
                    isActive={pathname === "/download"}
                    isScrolled={isScrolled}
                  />
                </li>
                <li>
                  <LoginButton onClick={() => setIsLoginModalOpen(true)} $isScrolled={isScrolled}>
                    <User size={18} className="mr-2" />
                    Login
                  </LoginButton>
                </li>
              </ul>
            </div>
          </div>
        </StyledNav>
      )}
      <AnimatePresence>{isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}</AnimatePresence>
    </ThemeProvider>
  )
}

