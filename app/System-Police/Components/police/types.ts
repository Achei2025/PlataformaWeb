export interface Comentario {
  autor: string
  data: string
  texto: string
}

export interface Caso {
  id: string
  categoriaObjeto: string
  nomeObjeto: string
  situacao: string
  marca: string
  modelo: string
  imei?: string
  chassi?: string
  descricaoObjeto: string
  qrCode?: string
  imagensObjeto?: string[]
  outroContato?: string
  notaFiscal?: string
  dataRoubo: string
  horaRoubo: string
  categoriaRoubo: string
  localRoubo: string
  descricaoRoubo: string
  vitima: string
  telefone: string
  status: string
}



