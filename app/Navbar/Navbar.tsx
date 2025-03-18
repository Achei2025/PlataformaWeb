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

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Info, Map, Download, Menu, X } from "lucide-react"
import AccountDropdown from "./AccountDropdown"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", text: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
    { href: "/AboutUs", text: "Sobre Nós", icon: <Info className="h-4 w-4 mr-2" /> },
    { href: "/map", text: "Mapa", icon: <Map className="h-4 w-4 mr-2" /> },
    { href: "/Download", text: "Download", icon: <Download className="h-4 w-4 mr-2" /> },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled ? "bg-white/90 shadow-md" : "bg-black/50"
        } backdrop-blur-md`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          {/* Logo - Updated size to 100x100 */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/image/Achei.png"
              alt="Achei Logo"
              width={70}
              height={70}
              className="h-[70px] w-[70px] object-contain"
            />
            <span className={`ml-2 text-xl font-bold ${isScrolled ? "text-[#333333]" : "text-[#4a90e2]"}`}>Achei!</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 md:hidden ${isScrolled ? "text-[#333333]" : "text-[#4a90e2]"}`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 mx-2 transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-[#f39c12]"
                      : isScrolled
                        ? "text-[#333333] hover:text-[#f39c12]"
                        : "text-white hover:text-[#f39c12]"
                  }`}
                >
                  <span className={pathname === item.href ? "text-[#f39c12]" : ""}>{item.icon}</span>
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <AccountDropdown isScrolled={isScrolled} />
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden ${isScrolled ? "bg-white/90" : "bg-black/80"}`}
            >
              <ul className="flex flex-col py-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-8 py-3 transition-colors duration-300 ${
                        pathname === item.href
                          ? "text-[#f39c12]"
                          : isScrolled
                            ? "text-[#333333] hover:text-[#f39c12]"
                            : "text-white hover:text-[#f39c12]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={pathname === item.href ? "text-[#f39c12]" : ""}>{item.icon}</span>
                      {item.text}
                    </Link>
                  </li>
                ))}
                <li className="px-8 py-3">
                  <AccountDropdown isScrolled={isScrolled} />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar
