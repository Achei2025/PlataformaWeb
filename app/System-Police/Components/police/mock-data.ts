import type { Caso } from "./types"

// Dados de exemplo para a lista de casos
export const casosMock: Caso[] = [
  {
    id: "C001",
    nomeObjeto: "iPhone 14 Pro",
    tipoObjeto: "celular",
    dataRoubo: new Date("2023-11-15T14:30:00"),
    localRoubo: "Av. Paulista, 1000, São Paulo",
    vitima: "Carlos Silva",
    status: "aberto",
    imagemObjeto: "/image/Iphone14.jpg",
    descricao: "Celular roubado durante assalto na saída do metrô. Cor: Preto, com capa transparente.",
    numeroSerie: "IMEI: 352789104563217",
    boletimOcorrencia: "BO-12345/2023",
    dataRegistro: new Date("2023-11-15T16:45:00"),

    // Novos campos para detalhes do objeto
    name: "iPhone 14 Pro",
    category: "Eletrônicos",
    description: "Smartphone Apple iPhone 14 Pro, 256GB, cor Preto Espacial, com capa transparente.",
    serialNumber: "352789104563217",
    identificationCode: "APPL-IP14-001",
    brand: "Apple",
    model: "iPhone 14 Pro",
    acquisitionDate: "2023-05-20T00:00:00",
    image: "/image/Iphone14.jpg",
    properties: [
      { key: "IMEI", value: "352789104563217" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Em análise",
    crimeType: "Roubo à mão armada",
    location: "Av. Paulista, 1000, São Paulo",
    incidentDescription:
      "Vítima foi abordada por dois indivíduos em uma motocicleta na saída do metrô. Um dos assaltantes estava armado com revólver e exigiu a entrega do celular e carteira.",
  },
  {
    id: "C002",
    nomeObjeto: "MacBook Pro 16",
    tipoObjeto: "notebook",
    dataRoubo: new Date("2023-10-28T09:15:00"),
    localRoubo: "Shopping Morumbi, São Paulo",
    vitima: "Ana Oliveira",
    status: "investigacao",
    imagemObjeto: "/image/Notebook.jpg",
    descricao: "Notebook roubado na praça de alimentação. Modelo 2022, cor prata, com adesivos na tampa.",
    numeroSerie: "SN: C02ZX1YPMD6N",
    boletimOcorrencia: "BO-11987/2023",
    dataRegistro: new Date("2023-10-28T11:20:00"),

    // Novos campos para detalhes do objeto
    name: "MacBook Pro 16",
    category: "Eletrônicos",
    description: 'Notebook Apple MacBook Pro 16", M2 Pro, 32GB RAM, 1TB SSD, cor prata, com adesivos na tampa.',
    serialNumber: "C02ZX1YPMD6N",
    identificationCode: "APPL-MBP16-002",
    brand: "Apple",
    model: 'MacBook Pro 16" M2 Pro',
    acquisitionDate: "2022-12-10T00:00:00",
    image: "/image/Notebook.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Em investigação",
    crimeType: "Furto",
    location: "Shopping Morumbi, Praça de Alimentação, São Paulo",
    incidentDescription:
      "Vítima deixou o notebook na mesa enquanto foi ao balcão pegar seu pedido. Ao retornar, notou que o equipamento havia sido furtado. Câmeras de segurança do shopping estão sendo analisadas.",
  },
  {
    id: "C003",
    nomeObjeto: "Bicicleta Caloi Elite",
    tipoObjeto: "bicicleta",
    dataRoubo: new Date("2023-11-05T17:40:00"),
    localRoubo: "Parque Ibirapuera, São Paulo",
    vitima: "Pedro Mendes",
    status: "resolvido",
    imagemObjeto: "/image/caloielite.jpg",
    descricao:
      "Bicicleta roubada enquanto o proprietário estava no banheiro. Cor verde, aro 29, com suporte para garrafa.",
    numeroSerie: "CAL2023456789",
    boletimOcorrencia: "BO-12005/2023",
    dataRegistro: new Date("2023-11-05T19:10:00"),

    // Novos campos para detalhes do objeto
    name: "Bicicleta Caloi Elite Carbon",
    category: "Esportes",
    description:
      "Bicicleta Caloi Elite Carbon, aro 29, quadro tamanho M, cor verde, com suporte para garrafa e ciclocomputador.",
    serialNumber: "CAL2023456789",
    identificationCode: "CALOI-ELITE-003",
    brand: "Caloi",
    model: "Elite Carbon",
    acquisitionDate: "2023-01-15T00:00:00",
    image: "/image/caloielite.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Resolvido",
    crimeType: "Furto",
    location: "Parque Ibirapuera, próximo aos banheiros, São Paulo",
    incidentDescription:
      "Bicicleta foi furtada enquanto o proprietário utilizava o banheiro do parque. O objeto foi recuperado pela polícia uma semana depois durante uma operação de rotina.",
  },
  {
    id: "C004",
    nomeObjeto: "Carteira Louis Vuitton",
    tipoObjeto: "acessorio",
    dataRoubo: new Date("2023-11-10T12:20:00"),
    localRoubo: "Restaurante Fogo de Chão, São Paulo",
    vitima: "Mariana Costa",
    status: "arquivado",
    imagemObjeto: "/image/carteiralouis.jpg",
    descricao:
      "Carteira furtada durante almoço. Continha documentos pessoais, cartões de crédito e R$ 350 em dinheiro.",
    numeroSerie: "N/A",
    boletimOcorrencia: "BO-12200/2023",
    dataRegistro: new Date("2023-11-10T14:30:00"),

    // Novos campos para detalhes do objeto
    name: "Carteira Louis Vuitton Monogram",
    category: "Acessórios",
    description:
      "Carteira Louis Vuitton modelo Monogram, couro legítimo, contendo documentos pessoais, cartões de crédito e R$ 350 em dinheiro.",
    brand: "Louis Vuitton",
    model: "Monogram",
    acquisitionDate: "2022-06-30T00:00:00",
    image: "/image/carteiralouis.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Arquivado",
    crimeType: "Furto",
    location: "Restaurante Fogo de Chão, Av. Moreira Guimarães, São Paulo",
    incidentDescription:
      "Carteira foi furtada durante almoço no restaurante. A vítima só percebeu o furto ao tentar pagar a conta. Não há câmeras de segurança no local que possam identificar o autor.",
  },
  {
    id: "C005",
    nomeObjeto: "Câmera Sony Alpha A7 III",
    tipoObjeto: "camera",
    dataRoubo: new Date("2023-11-12T16:15:00"),
    localRoubo: "Mirante do Pão de Açúcar, Rio de Janeiro",
    vitima: "Lucas Ferreira",
    status: "aberto",
    imagemObjeto: "/image/camera.jpg",
    descricao:
      "Câmera roubada por dois homens em uma moto. Incluía lente 24-70mm e cartão de memória com fotos importantes.",
    numeroSerie: "SN: 3850294",
    boletimOcorrencia: "BO-5678/2023",
    dataRegistro: new Date("2023-11-12T18:45:00"),

    // Novos campos para detalhes do objeto
    name: "Câmera Sony Alpha A7 III",
    category: "Eletrônicos",
    description:
      "Câmera Sony Alpha A7 III com lente 24-70mm f/2.8 GM, cartão de memória 128GB com fotos importantes de trabalho.",
    serialNumber: "3850294",
    identificationCode: "SONY-A7III-005",
    brand: "Sony",
    model: "Alpha A7 III",
    acquisitionDate: "2022-08-15T00:00:00",
    image: "/image/camera.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Aberto",
    crimeType: "Roubo à mão armada",
    location: "Mirante do Pão de Açúcar, Rio de Janeiro",
    incidentDescription:
      "Vítima foi abordada por dois homens em uma motocicleta enquanto fotografava no mirante. Os assaltantes estavam armados e levaram a câmera e outros pertences. Há testemunhas e possíveis imagens de câmeras de segurança do local.",
  },
  {
    id: "C006",
    nomeObjeto: "Relógio Rolex Submariner",
    tipoObjeto: "relogio",
    dataRoubo: new Date("2023-10-20T21:30:00"),
    localRoubo: "Saída de restaurante, Leblon, Rio de Janeiro",
    vitima: "Roberto Almeida",
    status: "investigacao",
    imagemObjeto: "/image/relogio.jpg",
    descricao: "Relógio arrancado do pulso por assaltante armado. Modelo em ouro e aço, mostrador preto.",
    numeroSerie: "RLX78901234",
    boletimOcorrencia: "BO-5432/2023",
    dataRegistro: new Date("2023-10-21T09:15:00"),

    // Novos campos para detalhes do objeto
    name: "Relógio Rolex Submariner Date",
    category: "Acessórios",
    description:
      "Relógio Rolex Submariner Date, modelo em ouro e aço (Rolesor), mostrador preto, bezel giratório, certificado de autenticidade.",
    serialNumber: "RLX78901234",
    identificationCode: "ROLEX-SUB-006",
    brand: "Rolex",
    model: "Submariner Date",
    acquisitionDate: "2020-12-25T00:00:00",
    image: "/image/relogio.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Em investigação",
    crimeType: "Roubo à mão armada",
    location: "Saída do restaurante Celeiro, Rua Dias Ferreira, Leblon, Rio de Janeiro",
    incidentDescription:
      "Vítima foi abordada por assaltante armado ao sair do restaurante. O criminoso arrancou o relógio do pulso da vítima e fugiu a pé. Há imagens de câmeras de segurança sendo analisadas pela polícia.",
  },
  {
    id: "C007",
    nomeObjeto: "Tablet iPad Pro 12.9",
    tipoObjeto: "tablet",
    dataRoubo: new Date("2023-11-08T10:45:00"),
    localRoubo: "Ônibus linha 174, Rio de Janeiro",
    vitima: "Juliana Santos",
    status: "aberto",
    imagemObjeto: "/image/tablet.jpg",
    descricao: "Tablet furtado da mochila durante trajeto. Modelo 2023, cor cinza espacial, com capa teclado.",
    numeroSerie: "IMEI: 358673102984561",
    boletimOcorrencia: "BO-5890/2023",
    dataRegistro: new Date("2023-11-08T13:20:00"),

    // Novos campos para detalhes do objeto
    name: "Tablet iPad Pro 12.9",
    category: "Eletrônicos",
    description:
      'Tablet Apple iPad Pro 12.9", modelo 2023, M2, 512GB, Wi-Fi + Cellular, cor cinza espacial, com capa teclado Magic Keyboard.',
    serialNumber: "358673102984561",
    identificationCode: "APPL-IPAD-007",
    brand: "Apple",
    model: 'iPad Pro 12.9" M2',
    acquisitionDate: "2023-03-10T00:00:00",
    image: "/image/tablet.jpg",
    properties: [
      { key: "IMEI", value: "358673102984561" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Aberto",
    crimeType: "Furto",
    location: "Ônibus linha 174, trajeto Copacabana-Centro, Rio de Janeiro",
    incidentDescription:
      "Tablet foi furtado da mochila da vítima durante o trajeto de ônibus. A vítima só percebeu o furto ao descer do ônibus. O dispositivo estava com rastreamento ativado e a última localização foi registrada.",
  },
  {
    id: "C008",
    nomeObjeto: "Drone DJI Mavic 3",
    tipoObjeto: "eletronico",
    dataRoubo: new Date("2023-10-15T15:50:00"),
    localRoubo: "Praia de Copacabana, Rio de Janeiro",
    vitima: "Fernando Gomes",
    status: "resolvido",
    imagemObjeto: "/image/drone.jpg",
    descricao: "Drone roubado durante sessão de filmagem na praia. Incluía 3 baterias extras e cartão SD de 128GB.",
    numeroSerie: "DJI2023789456",
    boletimOcorrencia: "BO-5123/2023",
    dataRegistro: new Date("2023-10-15T17:30:00"),

    // Novos campos para detalhes do objeto
    name: "Drone DJI Mavic 3 Pro",
    category: "Eletrônicos",
    description:
      "Drone DJI Mavic 3 Pro com câmera Hasselblad, 3 baterias extras, cartão SD de 128GB e controle remoto com tela integrada.",
    serialNumber: "DJI2023789456",
    identificationCode: "DJI-MAV3-008",
    brand: "DJI",
    model: "Mavic 3 Pro",
    acquisitionDate: "2023-01-05T00:00:00",
    image: "/image/drone.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Resolvido",
    crimeType: "Roubo",
    location: "Praia de Copacabana, altura do Posto 4, Rio de Janeiro",
    incidentDescription:
      "Drone foi roubado durante sessão de filmagem na praia. Dois indivíduos abordaram a vítima, levaram o equipamento e fugiram a pé. O equipamento foi recuperado pela polícia uma semana depois em operação no Morro do Cantagalo.",
  },
  {
    id: "C009",
    nomeObjeto: "Violão Takamine GD30",
    tipoObjeto: "instrumento",
    dataRoubo: new Date("2023-11-01T19:20:00"),
    localRoubo: "Estação de metrô Consolação, São Paulo",
    vitima: "Thiago Martins",
    status: "arquivado",
    imagemObjeto: "/image/violao.jpg",
    descricao: "Violão roubado na plataforma do metrô. Estava em case rígido preto com adesivos de bandas.",
    numeroSerie: "TK20225678",
    boletimOcorrencia: "BO-11765/2023",
    dataRegistro: new Date("2023-11-01T21:10:00"),

    // Novos campos para detalhes do objeto
    name: "Violão Takamine GD30CE",
    category: "Instrumentos Musicais",
    description:
      "Violão Takamine GD30CE, acústico com captador, cordas de aço, acabamento natural, em case rígido preto com adesivos de bandas.",
    serialNumber: "TK20225678",
    identificationCode: "TAKA-GD30-009",
    brand: "Takamine",
    model: "GD30CE",
    acquisitionDate: "2022-07-20T00:00:00",
    image: "/image/violao.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Arquivado",
    crimeType: "Furto",
    location: "Estação de metrô Consolação, plataforma sentido Paulista, São Paulo",
    incidentDescription:
      "Violão foi furtado na plataforma do metrô enquanto a vítima aguardava o trem. A vítima se distraiu por alguns minutos e ao voltar a atenção, notou que o instrumento havia sido levado. Não há imagens de câmeras que possam identificar o autor.",
  },
  {
    id: "C010",
    nomeObjeto: "Mala de viagem Samsonite",
    tipoObjeto: "outro",
    dataRoubo: new Date("2023-11-18T07:30:00"),
    localRoubo: "Aeroporto de Guarulhos, São Paulo",
    vitima: "Camila Rodrigues",
    status: "aberto",
    imagemObjeto: "/image/mala.jpg",
    descricao: "Mala furtada na área de desembarque. Cor preta, tamanho grande, contendo roupas e presentes.",
    numeroSerie: "N/A",
    boletimOcorrencia: "BO-12500/2023",
    dataRegistro: new Date("2023-11-18T10:45:00"),

    // Novos campos para detalhes do objeto
    name: "Mala de viagem Samsonite Cosmolite",
    category: "Bagagem",
    description:
      "Mala de viagem Samsonite modelo Cosmolite, cor preta, tamanho grande (75cm), contendo roupas, presentes e itens pessoais.",
    brand: "Samsonite",
    model: "Cosmolite",
    acquisitionDate: "2022-05-15T00:00:00",
    image: "/image/mala.jpg",
    properties: [
      { key: "IMEI", value: "N/A" },
      { key: "CHIP", value: "chip" },
    ],

    // Novos campos para detalhes do incidente
    incidentStatus: "Aberto",
    crimeType: "Furto",
    location: "Aeroporto Internacional de Guarulhos, Terminal 3, área de desembarque, São Paulo",
    incidentDescription:
      "Mala foi furtada na área de desembarque do aeroporto enquanto a vítima aguardava por transporte. A vítima se afastou brevemente da bagagem e ao retornar, notou que a mala havia sido levada. Câmeras de segurança do aeroporto estão sendo analisadas.",
  },
]

