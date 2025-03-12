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
import { Button } from "@/app/components/ui/button"
import { FileText } from "lucide-react"

export const CasosHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-1">Incidentes</h1>
        <p className="text-muted-foreground">Gerenciamento e acompanhamento de casos de roubo</p>
      </div>
      <div className="flex items-center gap-2">
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Novo Incidente
        </Button>
      </div>
    </div>
  )
}

