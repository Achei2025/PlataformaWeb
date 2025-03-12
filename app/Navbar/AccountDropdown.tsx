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
import { User, ChevronDown } from "lucide-react"
import styled from "styled-components"

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownButton = styled.button<{ $isScrolled: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$isScrolled ? props.theme.colors.text.dark : props.theme.colors.text.light)};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`

const DropdownContent = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  right: 0;
  background-color: ${(props) => props.theme.colors.background.light};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1001;
  border-radius: 4px;
  overflow: hidden;
`

const DropdownItem = styled(Link)`
  color: ${(props) => props.theme.colors.text.dark};
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.dark};
    color: ${(props) => props.theme.colors.text.light};
  }
`

const AccountDropdown = ({ isScrolled }: { isScrolled: boolean }) => {
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
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton $isScrolled={isScrolled} onClick={() => setIsOpen(!isOpen)}>
        <User className="mr-2 h-4 w-4" />
        <span>Conta</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownButton>
      <DropdownContent $isOpen={isOpen}>
        <DropdownItem href="/Login">Login</DropdownItem>
        <DropdownItem href="/Register">Registrar-se</DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  )
}

export default AccountDropdown

