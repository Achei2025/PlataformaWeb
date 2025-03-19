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
import { Smartphone, Laptop, Car, CreditCard, Package, AlertCircle, CheckCircle, Clock, FileQuestion } from 'lucide-react'

// Função existente para obter ícone por tipo de objeto
export function getIconForObjectType(tipo: string): React.ReactNode {
  switch (tipo.toLowerCase()) {
    case "smartphone":
      return <Smartphone className="h-5 w-5" />;
    case "notebook":
    case "laptop":
      return <Laptop className="h-5 w-5" />;
    case "veículo":
    case "veiculo":
    case "carro":
      return <Car className="h-5 w-5" />;
    case "cartão":
    case "cartao":
    case "cartão de crédito":
    case "cartao de credito":
      return <CreditCard className="h-5 w-5" />;
    default:
      return <Package className="h-5 w-5" />;
  }
}

// Função para formatar data (já existente)
export function formatarData(data: string): string {
  if (!data) return "";
  
  const partes = data.split("-");
  if (partes.length !== 3) return data;
  
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Adicionando as funções que estão faltando
export interface StatusConfig {
  text: string;
  className: string;
  icon: React.ElementType;
}

export function getStatusConfig(status: string): StatusConfig {
  switch (status.toLowerCase()) {
    case "resolvido":
      return {
        text: "Resolvido",
        className: "text-green-700 bg-green-100 border-green-200",
        icon: CheckCircle
      };
    case "em investigação":
    case "em investigacao":
      return {
        text: "Em investigação",
        className: "text-blue-700 bg-blue-100 border-blue-200",
        icon: Clock
      };
    case "arquivado":
      return {
        text: "Arquivado",
        className: "text-gray-700 bg-gray-100 border-gray-200",
        icon: FileQuestion
      };
    default:
      return {
        text: status,
        className: "text-gray-700 bg-gray-100 border-gray-200",
        icon: AlertCircle
      };
  }
}

export interface PriorityConfig {
  text: string;
  className: string;
}

export function getPriorityConfig(prioridade: string): PriorityConfig {
  switch (prioridade.toLowerCase()) {
    case "alta":
      return {
        text: "Alta",
        className: "bg-red-500 hover:bg-red-600"
      };
    case "média":
    case "media":
      return {
        text: "Média",
        className: "bg-yellow-500 hover:bg-yellow-600"
      };
    case "baixa":
      return {
        text: "Baixa",
        className: "bg-green-500 hover:bg-green-600"
      };
    default:
      return {
        text: prioridade,
        className: "bg-gray-500 hover:bg-gray-600"
      };
  }
}

export function formatarValor(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Retorna a variante de badge apropriada para cada status de caso
 */
export const getStatusBadge = (status: string): "default" | "outline" | "secondary" | "destructive" => {
  switch (status.toLowerCase()) {
    case "em investigação":
    case "em investigacao":
      return "default"
    case "resolvido":
      return "secondary"
    case "arquivado":
      return "outline"
    case "pendente":
      return "destructive"
    default:
      return "default"
  }
}

/**
 * Retorna a cor de texto apropriada para cada status de caso
 */
export const getStatusTextColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "em investigação":
    case "em investigacao":
      return "text-blue-700"
    case "resolvido":
      return "text-green-700"
    case "arquivado":
      return "text-gray-700"
    case "pendente":
      return "text-red-700"
    default:
      return "text-gray-700"
  }
}

/**
 * Retorna a cor de fundo apropriada para cada status de caso
 */
export const getStatusBgColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "em investigação":
    case "em investigacao":
      return "bg-blue-50"
    case "resolvido":
      return "bg-green-50"
    case "arquivado":
      return "bg-gray-50"
    case "pendente":
      return "bg-red-50"
    default:
      return "bg-gray-50"
  }
}


