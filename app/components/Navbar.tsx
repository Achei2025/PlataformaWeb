"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled ? "bg-transparent" : "bg-blue py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className={`text-xl font-bold ${isScrolled ? "text-black" : "text-white"}`}>
            Achei!
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? "text-black" : "text-white"} focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <ul
            className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} absolute md:relative top-full left-0 right-0 ${isScrolled ? "bg-transparent" : "bg-blue"} md:bg-transparent p-4 md:p-0`}
          >
            <li>
              <Link
                href="/"
                className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-white hover:text-yellow"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-white hover:text-yellow"}`}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-white hover:text-yellow"}`}
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-white hover:text-yellow"}`}
              >
                Contato
              </Link>
            </li>
            <li>
              <Link
                href="#download"
                className={`block py-2 ${isScrolled ? "text-black hover:text-blue" : "text-white hover:text-yellow"}`}
              >
                Download
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

