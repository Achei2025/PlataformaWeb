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

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { User, ChevronDown, LogIn, UserPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AccountDropdownProps {
  isScrolled: boolean
}

const AccountDropdown = ({ isScrolled }: AccountDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
          isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
        }`}
      >
        <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="flex items-center">
          <User className="h-4 w-4" />
          <span className="ml-2">Conta</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="ml-2 h-4 w-4" />
          </motion.div>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="py-1">
              <Link
                href="/Login"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white transition-all duration-300"
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                href="/Register"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white transition-all duration-300"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Registrar-se</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccountDropdown



