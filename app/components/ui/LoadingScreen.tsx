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

