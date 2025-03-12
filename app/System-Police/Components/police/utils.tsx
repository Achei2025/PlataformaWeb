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

import { Smartphone, Laptop, Bike, Watch, Camera, HelpCircle } from "lucide-react"

export const getIconForObjectType = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case "smartphone":
      return <Smartphone className="h-4 w-4 text-blue-500" />
    case "laptop":
      return <Laptop className="h-4 w-4 text-purple-500" />
    case "bicicleta":
      return <Bike className="h-4 w-4 text-green-500" />
    case "relógio":
      return <Watch className="h-4 w-4 text-yellow-500" />
    case "câmera":
      return <Camera className="h-4 w-4 text-red-500" />
    default:
      return <HelpCircle className="h-4 w-4 text-gray-500" />
  }
}

export const getStatusBadge = (status: string) => {
  const baseClasses = "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"

  switch (status.toLowerCase()) {
    case "em investigação":
      return <span className={`${baseClasses} bg-blue-50 text-blue-700 ring-blue-600/20`}>{status}</span>
    case "resolvido":
      return <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>{status}</span>
    case "pendente":
      return <span className={`${baseClasses} bg-yellow-50 text-yellow-700 ring-yellow-600/20`}>{status}</span>
    case "recuperado":
      return <span className={`${baseClasses} bg-purple-50 text-purple-700 ring-purple-600/20`}>{status}</span>
    default:
      return <span className={`${baseClasses} bg-gray-50 text-gray-700 ring-gray-600/20`}>{status}</span>
  }
}

export const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString("pt-BR")
}

