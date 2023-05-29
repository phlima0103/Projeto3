fetch('http://localhost:3000/tabelas')
  .then(response => response.json())
  .then(data => {
    data.map(tabela => {
      console.log(tabela.nome.toLowerCase(), " ", tabela.categoria.toLowerCase(), " ", tabela.database.toLowerCase()," ", tabela.owner.toLowerCase(), " ", tabela.steward.toLowerCase)
    })
  })
  .catch(error => {
    console.error('Erro:', error);
  });