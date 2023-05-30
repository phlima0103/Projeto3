// Seleciona os elementos do DOM
const template = document.querySelector("[data-template]");
const container = document.querySelector("[data-container]");
const inputPesquisa = document.querySelector("[data-input-pesquisa]");
const quantidade = document.querySelector("[data-quantidade]");

// Armazena os dados das tabelas
let tabelas = [];

// Armazena o objeto Fuse.js
let fuse;

// Inicializa o Fuse.js com os dados
function inicializaFuze(dados) {
  // Define as configurações para o Fuse.js
  const opcoes = {
    keys: ["id", "nome", "categoria", "descricao", "owner", "defasagem", "database", "caminho", "verificacao_governanca", "dado_sensivel"],
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2,
  };
  // Inicializa o Fuse.js com os dados e configurações
  fuse = new Fuse(dados, opcoes);
}

// Função que executa a pesquisa difusa
function pesquisaDifusa(valor) {
  // Executa a pesquisa difusa
  const resultados = fuse.search(valor);
  // Armazena os elementos visíveis
  const visibilidadeItem = new Set();
  // Exibe os itens correspondentes nos resultados da pesquisa
  for (const { item, score } of resultados) {
    // Remove a classe "hide" do elemento
    item.element.classList.remove("hide");
    // Adiciona o elemento ao conjunto de elementos visíveis
    visibilidadeItem.add(item.element);
  }
  // Oculta os itens que não estão nos resultados da pesquisa
  for (const tabela of tabelas) {
    // Verifica se o elemento não está no conjunto de elementos visíveis
    if (!visibilidadeItem.has(tabela.element)) {
      // Adiciona a classe "hide" ao elemento
      tabela.element.classList.add("hide");
    }
  }
  // Atualiza a quantidade de resultados da pesquisa
  quantidade.textContent = resultados.length;
}
// Evento acionado quando houver alterações no campo de entrada
inputPesquisa.addEventListener("input", (e) => {
  // Obtém o valor do campo de entrada
  const valor = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_.-/]/g, "");
  // Executa a pesquisa difusa
  pesquisaDifusa(valor);
});

// Realiza uma requisição fetch e inicializa o Fuse.js
fetch("/tabelas")
  .then((res) => res.json())
  .then((data) => {
    // Mapeia os dados da tabela para criar elementos de cartão e armazenar informações
    tabelas = data.map((tabela) => {
      // Preenche os elementos do DOM com as informações da tabela
      const card = template.content.cloneNode(true).children[0];
      const nome = card.querySelector("[data-nome]");
      const assunto = card.querySelector("[data-assunto]");
      const desc = card.querySelector("[data-desc]");
      const origem = card.querySelector("[data-origem]");
      const id = card.querySelector("[data-id-tabela]");
      nome.textContent = tabela.nome;
      assunto.textContent = tabela.categoria;
      desc.textContent = tabela.descricao;
      origem.textContent = tabela.database;
      id.value = tabela.id;
      container.append(card);
      // Retorna um objeto com as informações da tabela
      return {
        nome: tabela.nome,
        categoria: tabela.categoria,
        descricao: tabela.descricao,
        owner: tabela.owner,
        defasagem: tabela.defasagem,
        database: tabela.database,
        caminho: tabela.caminho,
        id: tabela.id,
        verificacao_governanca: tabela.verificacao_governanca,
        element: card,
      };
    });
    // Inicializa o Fuse.js com os dados da tabela
    inicializaFuze(tabelas);
});