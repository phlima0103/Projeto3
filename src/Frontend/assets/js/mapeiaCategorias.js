// seleciona a div que contém os filtros
const divFiltro = document.querySelector('.secao-pesquisa__div-filtro')

// Faz um GET no endpoint "/tabelas"
fetch('/tabelas')
// retorna a resposta em json
.then(res => res.json())
// retorna de forma assincrona os dados 
.then(async data => {
    // armazana as categorias
    var categorias = []

    // mapeia o array data
    await data.map(tabelas => {
        if (!categorias.includes(tabelas.categoria)) {
            // adiciona a categoria ao array categorias caso ela não exista no array ainda
            categorias.push(tabelas.categoria)
        }
    })
    // armazena o id da categoria
    var id = 0
    // mapeia o array de categorias e cria um link no arquivo html para cada categoria
    categorias.map(categoria => {
        const link = document.createElement('a')
        link.setAttribute('href', '#')
        link.setAttribute('class', 'filtro-button')
        link.setAttribute('id', `filtro-button-${id++}`)
        const texto = document.createTextNode(categoria)

        
        link.appendChild(texto)
        divFiltro.appendChild(link)
    })
})