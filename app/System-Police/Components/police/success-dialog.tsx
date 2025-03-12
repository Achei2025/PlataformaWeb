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

import type React from "react"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center p-6">
        <img
          src="/image/verificado.gif"
          alt="Sucesso"
          className="w-24 h-24 mb-4"
        />
        <p className="text-lg font-semibold text-center text-green-600">{message}</p>
      </DialogContent>
    </Dialog>
  )
}

