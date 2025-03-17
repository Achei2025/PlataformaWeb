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

import { motion } from "framer-motion"
import styled, { ThemeProvider } from "styled-components"
import theme from "@/app/theme"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

const LoadingWrapper = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

const Spinner = styled(motion.div)`
  width: 3rem;
  height: 3rem;
  border: 4px solid ${(props) => props.theme.colors.primary};
  border-top: 4px solid transparent;
  border-radius: 50%;
`

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  // Simulate loading time using setTimeout
  setTimeout(() => {
    onLoadingComplete()
  }, 2000) // Adjust loading time as needed

  return (
    <ThemeProvider theme={theme}>
      <LoadingWrapper>
        <Spinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </LoadingWrapper>
    </ThemeProvider>
  )
}

