// Definição dos tipos utilizados no sistema

export interface Caso {
  id: string
  nomeObjeto: string
  tipoObjeto: string // celular, notebook, bicicleta, acessorio, camera, relogio, tablet, eletronico, instrumento, outro
  dataRoubo: Date
  localRoubo: string
  vitima: string
  status: string // aberto, investigacao, resolvido, arquivado
  imagemObjeto: string | null
  descricao: string
  numeroSerie: string
  boletimOcorrencia: string
  dataRegistro: Date

  // Campos opcionais adicionais para o modal
  categoriaObjeto?: string
  situacao?: string
  marca?: string
  modelo?: string
  imei?: string
  chassi?: string
  descricaoObjeto?: string
  qrCode?: string
  imagensObjeto?: string[]
  outroContato?: string
  notaFiscal?: string
  horaRoubo?: string
  categoriaRoubo?: string
  descricaoRoubo?: string
  telefone?: string
  email?: string

  // Campos adicionais para a estrutura de detalhes do objeto
  name?: string
  category?: string
  description?: string
  serialNumber?: string
  identificationCode?: string
  brand?: string
  model?: string
  acquisitionDate?: string
  invoice?: string
  image?: string
  properties?: Array<{ key: string; value?: string }>

  // Campos adicionais para a estrutura de detalhes do incidente
  incidentStatus?: string
  crimeType?: string
  location?: string
  incidentDescription?: string
}

