"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "./LoadingScreen"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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
    setIsLoaded(true)
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
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />

      <AnimatePresence>
        {isLoaded && (
          <motion.nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
              isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <motion.div variants={logoVariants} initial="hidden" animate="visible">
                  <Link href="/" className={`text-xl font-bold ${isScrolled ? "text-black" : "text-blue"}`}>
                    Achei!
                  </Link>
                </motion.div>

                <div className="md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${isScrolled ? "text-black" : "text-blue"} focus:outline-none`}
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>

                <ul
                  className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} absolute md:relative top-full left-0 right-0 ${isScrolled ? "bg-white" : "bg-transparent"} md:bg-transparent p-4 md:p-0`}
                >
                  <li>
                    <Link
                      href="/"
                      className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-blue hover:text-yellow"}`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-blue hover:text-yellow"}`}
                    >
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-blue hover:text-yellow"}`}
                    >
                      Serviços
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-blue hover:text-yellow"}`}
                    >
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#download"
                      className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-blue hover:text-yellow"}`}
                    >
                      Download
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

