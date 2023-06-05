const idTabela = document.querySelector("[data-id-tabela]");
const idTabelaFavoritada = document.querySelector('[data-id-tabela-favoritada]');
const divDado = document.querySelector('[data-icone-sensivel]');
const dadoSensivel = document.querySelector('[data-sensivel]');
const favorito = document.querySelector('[data-imagem-favorito]');
const divLixeira = document.querySelector('[data-icone-lixeira]');


$(document).on('click', '.secao-tabelas__lista__item__div-informacoes__div-icones__lixeira', function (event) {
  var idTabela = $(this).closest('.secao-tabelas__lista__item').find('[data-id-tabela-favoritada]').val();
  var url = 'favoritos/delete?id_tabela=' + idTabela;
  // Redireciona para a URL com base no ID da tabela
  window.location.href = url;
});

// Evento acionado quando um item da lista é clicado
$(document).on('click', '.secao-tabelas__lista__item__paragrafo-div', function (event) {
  // Obtém o ID da tabela associado ao item clicado
  var idTabela = $(this).find('[data-id-tabela]').val();
  console.log('ID da tabela clicada:', idTabela);
  var url = 'informacoes_tabela?id=' + idTabela;
  // Redireciona para a URL com base no ID da tabela
  window.location.href = url;
});