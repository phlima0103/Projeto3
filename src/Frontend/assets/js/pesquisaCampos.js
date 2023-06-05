// Seleciona os elementos do DOM
const template = document.querySelector("[data-template]");
const container = document.querySelector("[data-container]");
const inputPesquisaCampos = document.querySelector("[data-input-pesquisa]");

// Armazena os dados dos campos
let campos = [];

// Armazena o objeto Fuse.js
let fuse;

// Inicializa o Fuse.js com os dados
function inicializaFuze(dados) {
  // Define as configurações para o Fuse.js
  const opcoes = {
    keys: ["tipo", "nome", "descricao"],
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2
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
  for (const campo of campos) {
    // Verifica se o elemento não está no conjunto de elementos visíveis
    if (!visibilidadeItem.has(campo.element)) {
      // Adiciona a classe "hide" ao elemento
      campo.element.classList.add("hide");
    }
  }
}

// Evento acionado quando houver alterações no campo de entrada
inputPesquisaCampos.addEventListener("input", (e) => {
  // Obtém o valor do campo de entrada
  const valor = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_.-]/g, "");

  // Executa a pesquisa difusa  
  pesquisaDifusa(valor);
});

// Realiza uma requisição fetch e inicializa o Fuse.js
fetch("/campos")
  .then((res) => res.json())
  .then((data) => {
    // Mapeia os dados do campo para criar elementos de cartão e armazenar informações 
    campos = data.map((campo) => {
      // Preenche os elementos do DOM com as informações da tabela
      const card = template.content.cloneNode(true).children[0];
      const tipo = card.querySelector("[data-tipo]");
      const nome = card.querySelector("[data-nome]");
      const desc = card.querySelector("[data-desc]");
      tipo.textContent = campo.tipo;
      nome.textContent = campo.nome;
      desc.textContent = campo.descricao;
      container.append(card);

      // Retorna um objeto com as informações do campo
      return {
        tipo: campo.tipo,
        nome: campo.nome,
        descricao: campo.descricao,
        element: card,
      };
    });
    // Inicializa o Fuse.js com os dados do campo
    inicializaFuze(campos);
  });