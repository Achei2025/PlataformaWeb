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

import { useState } from "react"

interface ToastMessage {
  title: string
  description: string
}

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null)

  const toast = ({ title, description }: ToastMessage) => {
    setToastMessage({ title, description })
    setTimeout(() => setToastMessage(null), 3000)
  }

  return {
    toast,
    ToastComponent: toastMessage ? (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <strong>{toastMessage.title}</strong>
        <p>{toastMessage.description}</p>
      </div>
    ) : null,
  }
}
