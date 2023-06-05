// Aguarda o carregamento completo do documento HTML antes de executar o código
$(document).ready(function () {
  // Evento acionado quando há entrada de texto no elemento com o ID "input-pesquisa"
  $('#input-pesquisa').on('input', function () {
    // Obtém o valor atual do campo de entrada de texto
    var inputValue = $(this).val();

    // Verifica se há algum texto digitado
    if (inputValue.length > 0) {
      // Atualiza estilos e posições para a pesquisa ativa
      $('#secao-input').css('top', '25%');
      $('.secao-pesquisa__titulo').css('font-size', '40px');
      $('.secao-pesquisa__div-pesquisa__input').css('width', '450px');
      $('.secao-tabelas__lista').css('display', 'block');
      $('.secao-pesquisa').css('position', 'initial');
      $('.secao-pesquisa').css('transform', 'none');
      $('.cabecalho__div-voltar__imagem').css('display', 'block');
      $('.cabecalho__div-voltar__imagem').css('margin-top', '1rem');
      $('.cabecalho__div-voltar__imagem').css('margin-left', '1.2rem');
    } else {
      // Atualiza estilos e posições para a pesquisa inativa
      $('#secao-input').css('top', '50%');
      $('.secao-pesquisa__titulo').css('font-size', '70px');
      $('.secao-pesquisa__div-pesquisa__input').css('width', '550px');
      $('.secao-tabelas__lista').css('display', 'none');
      $('.secao-pesquisa').css('position', 'absolute');
      $('.secao-pesquisa').css('transform', 'translate(-50%, -50%)');
      $('.cabecalho__div-voltar__imagem').css('display', 'none');
    }
  });

  // Evento acionado quando um item da lista é clicado
  $(document).on('click', '.secao-tabelas__lista__item__div-paragrafo', function (event) {
    // Obtém o ID da tabela associado ao item clicado
    var idTabela = $(this).find('[data-id-tabela]').val();
    console.log('ID da tabela clicada:', idTabela);
    var url = 'informacoes_tabela?id=' + idTabela;
    // Redireciona para a URL com base no ID da tabela
    window.location.href = url;
  });

  $(document).on('click', '.secao-tabelas__lista__item__div-informacoes__div-icones__botao-favorito', function (event) {
    var idTabelaFavorito = $(this).find('[data-id-tabela-favorito]').val();
    console.log('ID da tabela clicada:', idTabelaFavorito);
    var url = '/favoritos/inserirTabela?id_tabela=' + idTabelaFavorito;
    window.location.href = url;
  });

  // Evento acionado quando o elemento com o ID "visao-geral" é clicado
  $(document).on('click', '#visao-geral', function (event) {
    // Verifica se a caixa de seleção está marcada
    if ($(this).is(':checked')) {
      // Atualiza a altura da tag main quando o input 'visao-geral' for ativo
      $('.principal-detalhes-tabelas').css('min-height', '160vh');
    }
  });

  // Evento acionado quando o elemento com o ID "campos" é clicado
  $(document).on('click', '#campos', function (event) {
    // Verifica se a caixa de seleção está marcada
    if ($(this).is(':checked')) {
      // Atualiza a altura da tag main quando o input 'campos' for ativo
      $('.principal-detalhes-tabelas').css('min-height', '385vh');
    }
  });

  $(document).on('click', '#feedback', function (event) {
    // Verifica se a caixa de seleção está marcada
    if ($(this).is(':checked')) {
      // Atualiza a altura da tag main quando o input 'feedback' for ativo
      $('.principal-detalhes-tabelas').css('min-height', '130vh');
    }
  });
});
