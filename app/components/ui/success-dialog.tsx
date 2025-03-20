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
import { useEffect } from "react"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  message: string
  autoCloseTime?: number
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, message, autoCloseTime = 5000 }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, autoCloseTime])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-green-100 p-3 mb-4 animate-pulse">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-center">Sucesso!</h3>
          <p className="text-center text-gray-500 mt-2" dangerouslySetInnerHTML={{ __html: message }} />
          <Button onClick={onClose} className="mt-6 bg-green-600 hover:bg-green-700 text-white">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

