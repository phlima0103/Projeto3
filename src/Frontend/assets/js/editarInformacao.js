
function editar(){

// Obtém os parâmetros da URL atual
var urlParams = new URLSearchParams(window.location.search);
// Obtém o valor do parâmetro "id" que está na URL
var id = urlParams.get('id');

// Cria uma nova URL com base no "id" da tabela caputrado acima
var url = '/tabela?id=' + id;

// Obtém os elementos do DOM que serão preenchidos com as informações da tabela
const titulo = document.querySelector("#titulo")
const descricao = document.querySelector("#descricao")
const conjuntoDados = document.querySelector("#conjunto-dados")
const owner = document.querySelector("#owner")
const steward = document.querySelector("#steward")
const ativo = document.querySelector("#ativo")
const tipoAtivo = document.querySelector("#tipo-ativo")
const database = document.querySelector("#database")
const caminhoTabela = document.querySelector("#caminho-tabela")
const ultimaAtualizacao = document.querySelector("#ultima-atualizacao")
const dataCriacao = document.querySelector("#data-criacao")
const defasagem = document.querySelector("#defasagem")
const frequenciaAtualizacao = document.querySelector("#frequencia-atualizacao")
const engenheiroIngestao = document.querySelector("#engenheiro-ingestao")

// Realiza uma requisição fetch para obter os dados da tabela
fetch(url)
  .then(response => response.json())
  .then(data => {
    
    let tabela = data[0];
   
    console.log(tabela)

    titulo.value = tabela.nome
    descricao.value = tabela.descricao
    conjuntoDados.value = tabela.categoria
    owner.value = tabela.owner
    steward.value = tabela.steward
    // ativo.value = tabela.ativo
    // tipoAtivo.value = tabela.tipoAtivo
    database.value = tabela.database
    caminhoTabela.value = tabela.caminho
    // ultimaAtualizacao.value = tabela.ultimaAtualizacao
    // dataCriacao.value = tabela.dataCriacao
    defasagem.value = tabela.defasagem
    // frequenciaAtualizacao.value = tabela.frequenciaAtualizacao
    engenheiroIngestao.value = tabela.eng_ingestao
  })
  .catch(error => {
    console.log(error);
  });

};

