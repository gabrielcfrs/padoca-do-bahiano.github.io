// =============================================
// AÇAI DO BAHIANO - JAVASCRIPT PRINCIPAL
// Arquivo: app.js
//
// Este arquivo controla tudo que "funciona" no site:
// - Renderiza os cards do cardápio e bebidas
// - Filtro por categoria
// - SISTEMA DE CARRINHO com total automático
// - Pedido pelo WhatsApp com lista dos itens
// - Validação do formulário de contato
// - Menu mobile
// - Ano automático no footer
// =============================================


// 'document.addEventListener("DOMContentLoaded", ...)' garante que o código
// só roda depois que o HTML terminou de carregar completamente.
// Sem isso, o JavaScript tentaria achar elementos que ainda não existem!
document.addEventListener("DOMContentLoaded", function () {


  // ================================================
  // PARTE 1 — SISTEMA DE CARRINHO
  // ================================================

  // 'carrinho' é uma variavel (lista) que vai guardar os itens adicionados.
  // Cada item é um objeto com: { nome, preco, precoNum, imagem, quantidade }
  var carrinho = [];

  // Pegando elementos do HTML que o carrinho vai usar
  var btnCarrinho    = document.getElementById("btn-carrinho");     // Botão flutuante 🛒
  var painelCarrinho = document.getElementById("carrinho-painel");  // Painel lateral
  var overlayCarrinho = document.getElementById("carrinho-overlay"); // Fundo escuro
  var btnFechar      = document.getElementById("carrinho-fechar");   // Botão X
  var listaCarrinho  = document.getElementById("carrinho-lista");    // <ul> com os itens
  var textoVazio     = document.getElementById("carrinho-vazio");    // "Carrinho vazio"
  var rodapeCarrinho = document.getElementById("carrinho-footer");   // Total + botões
  var totalValor     = document.getElementById("carrinho-total-valor"); // "R$ 0,00"
  var badge          = document.getElementById("carrinho-badge");    // Número no botão
  var btnPedido      = document.getElementById("btn-pedido");        // "Fazer pedido"
  var btnLimpar      = document.getElementById("btn-limpar");        // "Limpar carrinho"


  // --- Função: Abrir o carrinho ---
  function abrirCarrinho() {
    painelCarrinho.classList.add("aberto");   // Desliza o painel para dentro
    overlayCarrinho.classList.add("ativo");   // Mostra o fundo escuro
  }

  // --- Função: Fechar o carrinho ---
  function fecharCarrinho() {
    painelCarrinho.classList.remove("aberto"); // Desliza o painel para fora
    overlayCarrinho.classList.remove("ativo"); // Esconde o fundo escuro
  }

  // Clique no botão 🛒 → abre o carrinho
  btnCarrinho.addEventListener("click", abrirCarrinho);

  // Clique no X → fecha o carrinho
  btnFechar.addEventListener("click", fecharCarrinho);

  // Clique no fundo escuro → fecha o carrinho
  overlayCarrinho.addEventListener("click", fecharCarrinho);

  // Clique em "Limpar Carrinho" → esvazia tudo
  btnLimpar.addEventListener("click", function () {
    carrinho = [];          // Reseta o array para vazio
    renderizarCarrinho();   // Atualiza a interface
  });


  // --- Função: Adicionar item ao carrinho ---
  // Recebe um objeto 'item' com nome, preco, precoNum, imagem
  function adicionarAoCarrinho(item) {

    // Procura se o item já existe no carrinho (pelo nome)
    // 'findIndex' retorna o índice (posição) ou -1 se não achar
    var indice = carrinho.findIndex(function (c) {
      return c.nome === item.nome; // Compara o nome do item
    });

    if (indice === -1) {
      // Item NÃO está no carrinho ainda → adiciona com quantidade 1
      carrinho.push({
        nome: item.nome,
        preco: item.preco,
        precoNum: item.precoNum,
        imagem: item.imagem,
        quantidade: 1          // Começa com quantidade 1
      });
    } else {
      // Item JÁ está no carrinho → só aumenta a quantidade
      carrinho[indice].quantidade++;
    }

    // Atualiza a exibição do carrinho
    renderizarCarrinho();

    // Animação de "pulo" no badge quando adiciona
    badge.classList.remove("badge-pulando"); // Remove a classe primeiro
    // 'requestAnimationFrame' garante que o navegador "vê" a remoção antes de adicionar de novo
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        badge.classList.add("badge-pulando");
      });
    });

    // Abre o carrinho automaticamente
    abrirCarrinho();
  }


  // --- Função: Calcular o total do carrinho ---
  function calcularTotal() {
    // 'reduce=reduzir' percorre a variável 'carrinho' e vai somando
    // 'acumulador' começa em 0 e vai acumulando a soma
    var total = carrinho.reduce(function (acumulador, item) {
      return acumulador + (item.precoNum * item.quantidade);
    }, 0); // O '0' é o valor inicial do acumulador

    return total;
  }


  // --- Função: Renderizar (desenhar) o carrinho na tela ---
  // Essa função é chamada sempre que o carrinho muda
  function renderizarCarrinho() {

    // Conta quantos itens únicos tem no carrinho
    var totalItens = carrinho.length;

    // Atualiza o número no badge (botão flutuante)
    badge.textContent = totalItens;

    if (totalItens === 0) {
      // Carrinho vazio: mostra mensagem e esconde o rodapé
      listaCarrinho.innerHTML = "";      // Limpa a lista HTML
      textoVazio.style.display = "block"; // Mostra "Carrinho vazio 😢"
      rodapeCarrinho.style.display = "none"; // Esconde total e botões
      return; // Para aqui, não precisa continuar
    }

    // Carrinho TEM itens: esconde a mensagem vazia e mostra o rodapé
    textoVazio.style.display = "none";
    rodapeCarrinho.style.display = "block";

    // Monta o HTML de cada item do carrinho
    // 'map' transforma cada item do array em HTML
    listaCarrinho.innerHTML = carrinho.map(function (item, indice) {
      // Subtotal do item = preço × quantidade
      var subtotal = (item.precoNum * item.quantidade).toFixed(2);

      // Template literal: monta o HTML do item
      return `
        <li class="carrinho-item">
          <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img">
          <div class="carrinho-item-info">
            <div class="carrinho-item-nome">${item.nome}</div>
            <div class="carrinho-item-preco">R$ ${subtotal.replace(".", ",")}</div>
          </div>
          <div class="carrinho-item-qtd">
            <!-- Botão de diminuir quantidade. 'data-indice' guarda a posição do item -->
            <button class="btn-qtd btn-diminuir" data-indice="${indice}">−</button>
            <span class="qtd-num">${item.quantidade}</span>
            <!-- Botão de aumentar quantidade -->
            <button class="btn-qtd btn-aumentar" data-indice="${indice}">+</button>
          </div>
        </li>
      `;
    }).join(""); // 'join' junta todos os HTMLs num texto só

    // Calcula o total e formata para o padrão brasileiro (vírgula)
    var total = calcularTotal();
    totalValor.textContent = "R$ " + total.toFixed(2).replace(".", ",");

    // Monta o link do WhatsApp com a lista de itens
    var mensagem = "Olá! Quero fazer o seguinte pedido:\n\n";

    // Percorre cada item e adiciona à mensagem
    carrinho.forEach(function (item) {
      mensagem += "• " + item.quantidade + "x " + item.nome + " (" + item.preco + ")\n";
    });

    // Adiciona o total no final da mensagem
    mensagem += "\n*Total: R$ " + total.toFixed(2).replace(".", ",") + "*";

    // 'encodeURIComponent' converte o texto para um formato válido de URL
    var linkWhatsApp = "https://wa.me/5511975383680?text=" + encodeURIComponent(mensagem);
    btnPedido.href = linkWhatsApp; // Atualiza o link do botão

    // Adiciona eventos de clique nos botões + e -
    // 'querySelectorAll' pega todos os botões de diminuir
    document.querySelectorAll(".btn-diminuir").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-indice")); // Pega o índice do item
        if (carrinho[idx].quantidade > 1) {
          carrinho[idx].quantidade--; // Diminui 1
        } else {
          carrinho.splice(idx, 1); // Remove o item se quantidade for 0
        }
        renderizarCarrinho(); // Atualiza a tela
      });
    });

    // Mesma coisa para os botões de aumentar
    document.querySelectorAll(".btn-aumentar").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-indice")); // Pega o índice
        carrinho[idx].quantidade++; // Aumenta 1
        renderizarCarrinho(); // Atualiza a tela
      });
    });
  }

  // Renderiza o carrinho vazio ao iniciar a página
  renderizarCarrinho();


  // ================================================
  // PARTE 2 — CRIAR OS CARDS DO CARDÁPIO
  // ================================================

  // Pega o elemento <ul> onde os cards serão inseridos
  var listaItens = document.getElementById("lista-itens");


  // Função que cria o HTML de um card de lanche
  function criarCardItem(item) {
    // 'template literal' (crases ` `) permite escrever HTML com variáveis ${...}
    return `
      <li class="card" data-categoria="${item.categoria}">
        <div class="card-img-wrap">
          <img src="${item.imagem}" alt="${item.nome}" loading="lazy">
        </div>
        <div class="card-content">
          <!-- Tag de categoria: paes, frios ou outros -->
          <span class="card-tag">${item.categoria === "paes" ? "🥖 Pães" : item.categoria === "frios" ? "🍖 Frios" : "🍰 Outros" }</span>
          <h3>${item.nome}</h3>
          <p>${item.descricao}</p>
          <p class="preco">${item.preco}</p>
          <!-- Botão que chama a função adicionarAoCarrinho quando clicado -->
          <button class="btn-adicionar" onclick='adicionarAoCarrinho(${JSON.stringify(item)})'>
            🛒 Adicionar ao Carrinho
          </button>
        </div>
      </li>
    `;
  }

  // Insere todos os itens na lista
  // 'map' transforma cada item em HTML, 'join' une tudo numa string
  listaItens.innerHTML = ITENS.map(criarCardItem).join("");


  // ================================================
  // PARTE 3 — CRIAR OS CARDS DE BEBIDAS
  // ================================================

  var listaBebidas = document.getElementById("lista-bebidas");

  function criarCardBebida(bebida) {
    return `
      <li class="card">
        <div class="card-img-wrap">
          <img src="${bebida.imagem}" alt="${bebida.nome}" loading="lazy">
        </div>
        <div class="card-content">
          <span class="card-tag">🥤 Bebida</span>
          <h3>${bebida.nome}</h3>
          <p>${bebida.descricao}</p>
          <p class="preco">${bebida.preco}</p>
          <button class="btn-adicionar" onclick='adicionarAoCarrinho(${JSON.stringify(bebida)})'>
            🛒 Adicionar ao Carrinho
          </button>
        </div>
      </li>
    `;
  }

  // 'BEBIDAS' vem do arquivo dados.js (carregado antes no HTML)
  listaBebidas.innerHTML = BEBIDAS.map(criarCardBebida).join("");


  // ================================================
  // PARTE 4 — FILTROS DO CARDÁPIO
  // ================================================

  // 'querySelectorAll' pega TODOS os elementos com a classe filtro-btn
  var botoesFiltro = document.querySelectorAll(".filtro-btn");

  // Adiciona evento de clique em cada botão de filtro
  botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {

      // Remove a classe "ativo" de TODOS os botões
      botoesFiltro.forEach(function (b) { b.classList.remove("ativo"); });

      // Adiciona "ativo" só no botão que foi clicado
      this.classList.add("ativo");

      // 'getAttribute' pega o valor do atributo data-filtro do botão
      var filtroEscolhido = this.getAttribute("data-filtro");

      // Pega todos os cards do cardápio
      var todosOsCards = document.querySelectorAll("#lista-itens .card");

      // Para cada card, mostra ou esconde dependendo da categoria
      todosOsCards.forEach(function (card) {
        var categoriaDoCard = card.getAttribute("data-categoria");

        // Se o filtro for "todos" OU a categoria bate com o filtro → mostra
        if (filtroEscolhido === "todos" || categoriaDoCard === filtroEscolhido) {
          card.style.display = "block"; // Mostra o card
        } else {
          card.style.display = "none";  // Esconde o card
        }
      });
    });
  });


  // ================================================
  // PARTE 5 — FORMULÁRIO DE CONTATO
  // ================================================

  var form   = document.getElementById("form-contato"); // O formulário
  var status = document.getElementById("form-status");  // Onde aparece a mensagem

  // 'submit' é o evento disparado quando o usuário clica em "Enviar"
  form.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Impede o formulário de recarregar a página

    // 'trim()' remove espaços em branco do começo e fim do texto
    var nome  = document.getElementById("nome").value.trim();
    var email = document.getElementById("email").value.trim();

    // Validação simples: verifica se nome e email foram preenchidos
    if (nome === "" || email === "") {
      status.textContent  = "⚠️ Por favor, preencha nome e e-mail!";
      status.style.color  = "#f77f00"; // Laranja para erro
      return; // Para aqui sem enviar
    }

    // Simula o envio com mensagem de sucesso
    // (Em um projeto real, aqui você enviaria os dados para um servidor)
    status.textContent = "✅ Mensagem enviada! Retornaremos em breve.";
    status.style.color = "#25d366"; // Verde para sucesso

    form.reset(); // Limpa todos os campos do formulário

    // Remove a mensagem de status depois de 5 segundos
    // 'setTimeout' executa uma função após um tempo (em milissegundos)
    setTimeout(function () {
      status.textContent = "";
    }, 5000); // 5000ms = 5 segundos
  });


  // ================================================
  // PARTE 6 — MENU MOBILE (HAMBÚRGUER ☰)
  // ================================================

  var botaoMenu = document.getElementById("menu-toggle"); // Botão ☰
  var listaNav  = document.getElementById("nav-list");    // <ul> do menu

  // Clique no ☰ → abre ou fecha o menu
  botaoMenu.addEventListener("click", function () {
    listaNav.classList.toggle("aberto"); // 'toggle' adiciona se não tem, remove se tem

    // Muda o ícone do botão dependendo do estado do menu
    if (listaNav.classList.contains("aberto")) {
      botaoMenu.textContent = "✕"; // ✕ quando aberto
    } else {
      botaoMenu.textContent = "☰"; // ☰ quando fechado
    }
  });

  // Fecha o menu ao clicar em qualquer link da navegação
  var linksNav = document.querySelectorAll(".nav-list a");
  linksNav.forEach(function (link) {
    link.addEventListener("click", function () {
      listaNav.classList.remove("aberto"); // Fecha o menu
      botaoMenu.textContent = "☰";         // Volta o ícone de hambúrguer
    });
  });


  // ================================================
  // PARTE 7 — ANO AUTOMÁTICO NO FOOTER
  // ================================================

  // 'new Date()' cria um objeto com a data atual
  // '.getFullYear()' pega só o ano (ex: 2025)
  document.getElementById("ano").textContent = new Date().getFullYear();


  // ================================================
  // PARTE 8 — SCROLL SUAVE PARA AS SEÇÕES
  // ================================================

  // Seleciona todos os links que começam com "#" (links internos da página)
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {

      // 'querySelector' busca o elemento com o id do href
      var alvo = document.querySelector(this.getAttribute("href"));

      if (alvo) {
        e.preventDefault(); // Impede o comportamento padrão (pulo instantâneo)
        alvo.scrollIntoView({ behavior: "smooth" }); // Rola suavemente até o elemento
      }
    });
  });


  // ================================================
  // EXPOSIÇÃO DA FUNÇÃO adicionarAoCarrinho
  // (precisa ser global para funcionar nos botões do HTML)
  // ================================================

  // 'window.adicionarAoCarrinho' torna a função acessível fora deste bloco
  // Os botões nos cards usam onclick='adicionarAoCarrinho(...)' no HTML,
  // então a função precisa estar disponível globalmente
  window.adicionarAoCarrinho = adicionarAoCarrinho;


}); // Fim do DOMContentLoaded — todas as funções estão dentro deste bloco
