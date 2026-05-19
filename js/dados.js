// =============================================
// AÇAI DOBAHIANO - DADOS DO CARDÁPIO
// Arquivo: js/dados.js
//
// COMO ADICIONAR UM ITEM NOVO:
// 1. Copie um bloco { ... } existente
// 2. Cole depois da última vírgula
// 3. Mude nome, descricao, preco, imagem e categoria
// 4. Para categoria, use: "acai" ou "acompanhamentos"
// =============================================

// 'const' cria uma variável que não muda (constante)
// 'ITENS' é o nome que damos à nossa lista de lanches
// Os colchetes [ ] indicam que é uma lista (variedade) de objetos
const ITENS = [
  {
    nome: "Pães Fresquinhos",
    descricao: "Pães frescos, perfeito para seu café da manhã.",
    preco: "R$ 0,50 (und)",
    precoNum: 0.50,
    categoria: "paes",
    imagem: "../img/paes.png"
  }, {
    nome: "Pães de leite",
    descricao: "Pães frescos, perfeito para seu café da manhã.",
    preco: "R$ 1,00 (und)",
    precoNum: 1.00,
    categoria: "paes",
    imagem: "../img/pao-leite.png"
  },
  {
    nome: "Pão de Queijo",
    descricao: "Pão de queijo quentinho, perfeito para seu café da manhã.",
    preco: "R$ 3,00 (100g)",
    precoNum: 3.00,
    categoria: "paes",
    imagem: "../img/paes-queijo.png"
  },
  {
    nome: "BOLO DE FESTA",
    descricao: "Bolo de festa, perfeito para comemorar seus momentos especiais.",
    preco: "R$ 45,00",
    precoNum: 45.00,
    categoria: "outros",
    imagem: "../img/bolo.png"
  },
  {
    nome: "BOLO DE FUBÁ",
    descricao: "Bolo de fubá, perfeito para seu cafe da manhã.",
    preco: "R$ 20,00",
    precoNum: 20.00,
    categoria: "outros",
    imagem: "../img/bolo-fuba.png"
  },{
    nome: "BOLO DE CHOCOLATE",
    descricao: "bolo de chocolate, perfeito para seu cafe da manhã.",
    preco: "R$ 45,00",
    precoNum: 45.00,
    categoria: "outros",
    imagem: "../img/bolo-chocolate.png"
  },
  {
    nome: "QUEIJO",
    descricao: "Queijo mussarela.",
    preco: "5,00 (100g)",
    precoNum: 5.00,
    categoria: "frios",
    imagem: "../img/queijo.png"
  },
  {
    nome: "MORTADELA",
    descricao: "Mortadela defumada.",
    preco: "R$ 2,50 (100g)",
    precoNum: 2.50,
    categoria: "frios",
    imagem: "../img/mortadela.png"
  },
  {
    nome: "PRESUNTO",
    descricao: "Presunto defumado.",
    preco: "R$ 4,50 (100g)",
    precoNum: 4.50,
    categoria: "frios",
    imagem: "../img/presunto.png"
  },
];

// =============================================
// BEBIDAS
// Para adicionar: copie um bloco e cole abaixo
// =============================================

const BEBIDAS = [
  {
    nome: "Coca-Cola lata 350ml",
    descricao: "Lata bem gelada 350ml.",
    preco: "R$ 7,00",
    precoNum: 7.00,
    imagem: "../img/coca.jpeg"
  },{
    nome: "Coca-Cola Zero lata 350ml",
    descricao: "Lata bem gelada 350ml.",
    preco: "R$ 7,00",
    precoNum: 7.00,
    imagem: "../img/coca-0.jpeg"
  },
  {
    nome: "Água com Gás",
    descricao: "Garrafa 500ml gelada.",
    preco: "R$ 5,00",
    precoNum: 5.00,
    imagem: "../img/agua-gas.jpg"
  }
];
