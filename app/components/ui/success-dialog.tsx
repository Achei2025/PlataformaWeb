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

import type React from "react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { motion } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import confetti from "canvas-confetti"

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, message }) => {
  const [progress, setProgress] = useState(100)

  // Trigger confetti when dialog opens
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // Reset progress when dialog opens
      setProgress(100)
    }
  }, [isOpen])

  // Auto-close after 5 seconds with progress indicator
  useEffect(() => {
    if (!isOpen) return

    const duration = 5000 // 5 seconds
    const interval = 50 // Update progress every 50ms
    const steps = duration / interval
    const decrementPerStep = 100 / steps

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.max(prev - decrementPerStep, 0))
    }, interval)

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [isOpen, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-0 shadow-xl [&>button]:hidden">
        {/* Progress bar */}
        <div className="h-1 bg-green-200 transition-all duration-50 ease-linear" style={{ width: `${progress}%` }} />

        <div className="relative p-6 bg-gradient-to-br from-white to-green-50">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center">
            {/* Success animation */}
            <div className="relative mb-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="bg-green-100 rounded-full p-3"
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
              </motion.div>

              {/* Pulse effect */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeOut",
                }}
                className="absolute inset-0 bg-green-400 rounded-full -z-10"
              />
            </div>

            {/* Success message */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h3 className="text-xl font-bold text-green-700 mb-2 text-center">Sucesso!</h3>
              <p className="text-lg text-center text-gray-700">{message}</p>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

