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

import type { Caso } from "./types"

export const mockCasos: Caso[] = [
  {
    id: "CASO-001",
    objeto: "iPhone 13 Pro",
    tipoObjeto: "Smartphone",
    dataRoubo: "2024-03-06",
    horaRoubo: "14:30",
    localizacao: "Av. Paulista, 1000",
    vitima: "João Silva",
    telefone: "(11) 98765-4321",
    status: "Em investigação",
    prioridade: "Alta",
    valorEstimado: "8000",
    descricao: "Roubo de celular mediante ameaça na saída do metrô",
  },
  {
    id: "CASO-002",
    objeto: "MacBook Pro",
    tipoObjeto: "Laptop",
    dataRoubo: "2024-03-05",
    horaRoubo: "16:45",
    localizacao: "Rua Augusta, 500",
    vitima: "Maria Santos",
    telefone: "(11) 98888-7777",
    status: "Resolvido",
    prioridade: "Alta",
    valorEstimado: "12000",
    descricao: "Furto de notebook em estabelecimento comercial",
  },
  {
    id: "CASO-003",
    objeto: "Bicicleta Caloi Elite",
    tipoObjeto: "Bicicleta",
    dataRoubo: "2024-03-04",
    horaRoubo: "09:15",
    localizacao: "Parque Ibirapuera",
    vitima: "Pedro Oliveira",
    telefone: "(11) 97777-6666",
    status: "Pendente",
    prioridade: "Média",
    valorEstimado: "3500",
    descricao: "Bicicleta furtada durante passeio no parque",
  },
  {
    id: "CASO-004",
    objeto: "Apple Watch Series 7",
    tipoObjeto: "Relógio",
    dataRoubo: "2024-03-03",
    horaRoubo: "18:20",
    localizacao: "Shopping Morumbi",
    vitima: "Ana Costa",
    telefone: "(11) 96666-5555",
    status: "Em investigação",
    prioridade: "Baixa",
    valorEstimado: "3000",
    descricao: "Furto de relógio em loja do shopping",
  },
  {
    id: "CASO-005",
    objeto: "Canon EOS R5",
    tipoObjeto: "Câmera",
    dataRoubo: "2024-03-02",
    horaRoubo: "11:00",
    localizacao: "Praça da Sé",
    vitima: "Lucas Mendes",
    telefone: "(11) 95555-4444",
    status: "Recuperado",
    prioridade: "Alta",
    valorEstimado: "25000",
    descricao: "Câmera profissional roubada durante sessão fotográfica",
  },
]

