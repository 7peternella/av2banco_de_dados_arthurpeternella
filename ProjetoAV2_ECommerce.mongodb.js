// ATIVIDADE AV2 - BANCO DE DADOS
// Cenário C: E-Commerce de Tecnologia e Hardware
// Aluno ou dupla: __________________________________

// Seleciona o banco dedicado ao projeto.
use("ProjetoAV2_TecnologiaDB");

// Limpa o banco antes de carregar os dados novamente.
db.dropDatabase();

// ETAPA 1.1 - Arquitetura e criação das coleções principais
db.createCollection("Produtos");
db.createCollection("Pedidos");

// ETAPA 1.2 - Povoamento com documentos incorporados e arrays
// insertOne usado para cadastrar os dois primeiros produtos.
db.Produtos.insertOne({
  nome: "Notebook Gamer Pro",
  categoria: "Notebooks",
  preco: 6999.90,
  estoque: 12,
  ativo: true,
  especificacoes: {
    processador: "Ryzen 9",
    memoriaRAMGB: 32,
    armazenamento: "1 TB NVMe",
    placaVideo: "RTX 4070"
  },
  tags: ["gamer", "alta-performance", "novo"]
});

db.Produtos.insertOne({
  nome: "Mouse Sem Fio Ultraleve",
  categoria: "Perifericos",
  preco: 249.90,
  estoque: 40,
  ativo: true,
  especificacoes: {
    conexao: "Bluetooth 5.2",
    sensor: "26000 DPI",
    pesoGramas: 58
  },
  coresDisponiveis: ["preto", "branco"],
  tags: ["sem-fio", "esports"]
});

// O restante do catálogo é cadastrado com insertMany().
db.Produtos.insertMany([
  {
    nome: "Teclado Mecânico RGB",
    categoria: "Perifericos",
    preco: 449.50,
    estoque: 25,
    ativo: true,
    especificacoes: {
      layout: "ABNT2",
      switch: "Red",
      iluminacao: "RGB"
    },
    tags: ["mecanico", "rgb", "jogos"]
  },
  {
    nome: "Monitor 27 2K",
    categoria: "Monitores",
    preco: 1899.00,
    estoque: 8,
    ativo: true,
    especificacoes: {
      resolucao: "2560x1440",
      taxaAtualizacaoHz: 165,
      painel: "IPS"
    },
    garantiaMeses: 24,
    tags: ["monitor", "gaming"]
  },
  {
    nome: "SSD NVMe 1 TB",
    categoria: "Armazenamento",
    preco: 529.90,
    estoque: 55,
    ativo: true,
    especificacoes: {
      interface: "PCIe 4.0",
      velocidadeLeituraMBs: 7300
    },
    tags: ["ssd", "nvme"]
  },
  {
    nome: "Placa-mãe B760",
    categoria: "Componentes",
    preco: 1299.00,
    estoque: 0,
    ativo: false,
    especificacoes: {
      socket: "LGA1700",
      chipset: "B760",
      formato: "ATX"
    },
    motivoInatividade: "Produto descontinuado",
    tags: ["placa-mae", "descontinuado"]
  }
]);

// Os pedidos guardam os dados do cliente e os itens dentro do próprio documento.
db.Pedidos.insertMany([
  {
    numeroPedido: "PED-1001",
    status: "Concluido",
    data: "2026-11-20",
    cliente: {
      nome: "Ana Silva",
      cidade: "Recife",
      fidelidade: "Gold"
    },
    itens: [
      { produto: "Notebook Gamer Pro", categoria: "Notebooks", quantidade: 1, subtotal: 6999.90 },
      { produto: "Mouse Sem Fio Ultraleve", categoria: "Perifericos", quantidade: 1, subtotal: 249.90 }
    ],
    formaPagamento: "Cartao",
    total: 7249.80
  },
  {
    numeroPedido: "PED-1002",
    status: "Concluido",
    data: "2026-11-21",
    cliente: {
      nome: "Bruno Costa",
      cidade: "Olinda",
      fidelidade: "Silver"
    },
    itens: [
      { produto: "SSD NVMe 1 TB", categoria: "Armazenamento", quantidade: 2, subtotal: 1059.80 }
    ],
    formaPagamento: "PIX",
    total: 1059.80
  },
  {
    numeroPedido: "PED-1003",
    status: "Cancelado",
    data: "2026-11-22",
    cliente: {
      nome: "Carla Souza",
      cidade: "Jaboatao"
    },
    itens: [
      { produto: "Monitor 27 2K", categoria: "Monitores", quantidade: 1, subtotal: 1899.00 }
    ],
    formaPagamento: "Cartao",
    total: 1899.00,
    motivoCancelamento: "Estoque indisponivel"
  },
  {
    numeroPedido: "PED-1004",
    status: "Concluido",
    data: "2026-11-23",
    cliente: {
      nome: "Daniel Lima",
      cidade: "Recife",
      fidelidade: "Bronze",
      cupom: "TECNO10"
    },
    itens: [
      { produto: "Teclado Mecânico RGB", categoria: "Perifericos", quantidade: 1, subtotal: 449.50 },
      { produto: "Mouse Sem Fio Ultraleve", categoria: "Perifericos", quantidade: 2, subtotal: 499.80 }
    ],
    formaPagamento: "Boleto",
    total: 949.30
  }
]);

// ETAPA 2.1 - Comparação numérica: produtos com preço maior que R$ 500
db.Produtos.find(
  { preco: { $gt: 500 } },
  { nome: 1, categoria: 1, preco: 1, _id: 0 }
);

// ETAPA 2.2 - Operador de lista: produtos das categorias desejadas
db.Produtos.find({
  categoria: { $in: ["Perifericos", "Monitores", "Armazenamento"] }
});

// ETAPA 2.3 - Projeção: pedidos concluídos exibindo apenas nome da cidade,
// status e total, sem o campo _id
db.Pedidos.find(
  { status: "Concluido" },
  { _id: 0, "cliente.nome": 1, "cliente.cidade": 1, status: 1, total: 1 }
);

// ETAPA 3.1 - updateOne com $set: altera somente o preço do mouse
db.Produtos.updateOne(
  { nome: "Mouse Sem Fio Ultraleve" },
  { $set: { preco: 229.90 } }
);

// ETAPA 3.2 - updateMany com $set: marca os periféricos como promoção ativa
db.Produtos.updateMany(
  { categoria: "Perifericos" },
  { $set: { emPromocao: true } }
);

// ETAPA 3.3 - updateOne com $push: adiciona uma nova tag sem apagar as anteriores
db.Produtos.updateOne(
  { nome: "Notebook Gamer Pro" },
  { $push: { tags: "oferta-limitada" } }
);

// ETAPA 3.4 - deleteOne com filtro seguro: remove somente o pedido cancelado informado
db.Pedidos.deleteOne({
  numeroPedido: "PED-1003",
  status: "Cancelado"
});

// ETAPA 4.1 - Funil gerencial: faturamento e ticket médio por forma de pagamento
db.Pedidos.aggregate([
  {
    $match: { status: "Concluido" }
  },
  {
    $group: {
      _id: "$formaPagamento",
      faturamento: { $sum: "$total" },
      ticketMedio: { $avg: "$total" },
      quantidadePedidos: { $sum: 1 }
    }
  },
  {
    $sort: { faturamento: -1 }
  }
]);

// ETAPA 4.2 - Relatório formatado por categoria de produto
db.Produtos.aggregate([
  {
    $match: { ativo: true }
  },
  {
    $group: {
      _id: "$categoria",
      unidadesEmEstoque: { $sum: "$estoque" },
      precoMedio: { $avg: "$preco" }
    }
  },
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      unidadesEmEstoque: 1,
      precoMedio: { $round: ["$precoMedio", 2] }
    }
  }
]);
