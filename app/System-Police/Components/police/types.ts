export interface Comentario {
  autor: string
  data: string
  texto: string
}

export interface Caso {
  id: string
  objeto: string
  tipoObjeto: string
  dataRoubo: string
  horaRoubo: string
  localizacao: string
  vitima: string
  telefone: string
  status: string
  prioridade: string
  valorEstimado: string
  descricao: string
  comentarios?: Comentario[]
}

