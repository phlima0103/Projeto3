// Importa o módulo 'express' para criar um servidor web
const express = require('express'); 

 // Importa o módulo 'path' para manipular caminhos de arquivos
const path = require('path');

// Importa e armazena o módulo 'body-parser'
const bodyParser = require('body-parser'); 

// Armazena a conversão dos dados do formato URL para um objeto JavaScript// Armazena a conversão dos dados do formato URL para um objeto JavaScript
const urlencodedParser = bodyParser.urlencoded({ extended: false }); 

// Armazena as funcionalidades do express
const app = express(); 

// Importa o módulo 'sqlite3' para se conectar e interagir com bancos de dados
const sqlite3 = require('sqlite3').verbose(); 

// Armazena o endereço IP do localhost
const hostname = '127.0.0.1'; 

// Armazena a porta que será utilizada para rodar o servidor web
const port = 1234; 

// Armazena o caminho do arquivo que contém o banco de dados do projeto
const DBPATH = './backend/data/db_projeto.db'; 

 // Cria e armazena uma conexão com o banco de dados SQLite no caminho especificado
var caminho = new sqlite3.Database(DBPATH); 

 // Define o EJS como o motor de renderização de páginas HTML
app.set('view engine', 'ejs');

// Define o diretório 'views' como o diretório raiz das páginas HTML​
app.set('views', './frontend/'); 

// Define o diretório 'frontend' como o diretório raiz do servidor web
app.use(express.static('./frontend/')); 

 // Define o express para receber dados em formato JSON
app.use(express.json());

// Abre conexão com o banco de dados SQLite
const db = new sqlite3.Database(DBPATH, sqlite3.OPEN_READWRITE, err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conexão com o banco de dados SQLite estabelecida.');
});


/********************* ENDPOINTS DO INDEX ********************/
//endpoint de home page ligado com o index.html
app.get('/', (req, res) => {
  res.render('html/index');
});

// Endpoint para renderizar a página de detalhes das tabelas
app.get('/informacoes_tabela', (req, res) => {
   // Obtém o ID da tabela da query string
  const idTabela = req.query.id;

  // Renderize o arquivo EJS e envie a resposta com os dados da tabela
  res.render('html/informacoes_tabela', { idTabela });
});


/********************* ENDPOINTS DA TABELA ********************/
//Endpoint para listar todas as tabelas
app.get('/tabelas', (req, res) => {
  db.all('SELECT * FROM tabela', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

//Endpoint para listar todas as tabelas a partir do id
app.get('/tabela', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.all('SELECT * FROM tabela WHERE id= ?', [req.query.id], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.post('/solicitar', urlencodedParser, (req, res) => {
  const sql = "INSERT INTO solicitacoes (id_usuario, data, sql_code) VALUES (?, ?, ?)"
  const {id_usuario, sql_code} = req.body
  var data = new Date();
  var data = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(data);
  const valores = [id_usuario, data, sql_code]

  db.run(sql, valores, (err) => {
    if (err) {
      throw err
    } else {
      res.status(200).send("Tabela inserida")
    }
  })
});

app.post('/solicitar', urlencodedParser, (req, res) => {
  const sql = "INSERT INTO solicitacoes (id_usuario, data, sql_code) VALUES (?, ?, ?)"
  const {id_usuario, sql_code} = req.body
  var data = new Date(); 
  var data = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(data);
  const valores = [id_usuario, data, sql_code]

  db.run(sql, valores, (err) => {
    if (err) {
      throw err
    } else {
      res.status(200).send("Tabela inserida")
    }
  })
});

app.get('/solicitacoes', (req, res) => {
  const sql = "SELECT * FROM solicitacoes"
  db.all(sql, (err, rows) => {
    if (err) {
      throw err
    } else{ 
      res.json(rows)
    }
  })
});

app.delete('/recusar', urlencodedParser, (req, res) => {
  var sql = `DELETE FROM solicitacoes WHERE id_solicitacao=${req.body.id_solicitacao}`
  db.run(sql, (err) => {
    if (err) {
      throw err
    } else{ 
      res.json('Solicitação recusada com sucesso')
    }
  });
});

//Endpoint para a realização da atualização dos metadados, de acordo com o formulário
app.post('/atualizar', urlencodedParser, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  var sql = `SELECT sql_code FROM solicitacoes WHERE id_solicitacao = ${req.body.id_solicitacao}`
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }else {      
      const {sql_code} = rows[0]
      console.log(sql_code)
      db.run(sql_code, (err) => {
        if (err) {
          throw err
        } else {

          db.run(`DELETE FROM solicitacoes WHERE id_solicitacao=${req.body.id_solicitacao}`, (err) => {
            if (err) {
              throw err
            } else {
              res.send('Pedido executado')
            }
          })
        }
      })
    }
  });
});



// Endpoint para filtrar as tabelas de acordo com a sua categoria
// app.get('/tabelas/filtro', (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   const sql = `SELECT * FROM tabela WHERE categoria =` + req.query.categoria;
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Erro ao buscar tabelas.');
//     } else {
//       res.json(rows);
//     }
//   });
// });

/*********** ENDPOINTS DE CAMPOS ***********/
// Endpoint que lista todos os campos que estao em uma tabela
app.get('/campos', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = `SELECT nome, descricao, tipo FROM campo`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar tabelas.');
    } else {
      res.json(rows);
    }
  });
});

// Endpoint para filtrar os campos de acordo com seu tipo
// app.get('/campos/filtro', (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   sql = 'SELECT * FROM campo WHERE id_tabela=' + req.query.id_tabela;
//   var db = new sqlite3.Database(DBPATH);
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json(rows);
//   });
//   db.close();
// });

//Endpoint para a realização da atualização dos metadados do formulário, de acordo com o formulário
app.post('/campo/atualizar', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = `UPDATE campo SET nome='${req.body.nome}', tipo='${req.body.tipo}', descricao='${req.body.descricao}' 
  WHERE id_tabela='${req.body.id_tabela}'`;
  console.log(sql);
  db = new sqlite3.Database(DBPATH);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
    res.end();
  });
  res.write('<p>Campo Atualizado com sucesso!</p>');
});

// Endpoint para filtrar os campos de acordo com a sua categoria
app.get('/campo/tipo', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = `SELECT * FROM campo WHERE tipo = '${req.query.tipo}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar tabelas.');
    } else {
      res.json(rows);
    }
  });
});

/*********** ENDPOINTS DE PASTAS ***********/
// Endpoint para criar uma nova pasta
app.post('/criarpasta', urlencodedParser, (req, res) => {
  const nome = req.body.nome;
  const id_usuario = req.body.id_usuario;

  // Verifica se o campo nome foi preenchido
  if (!nome) {
    return res
      .status(400)
      .json({ error: 'Campos obrigatórios não fornecidos' });
  }

  const sql = 'INSERT INTO pasta (nome, id_usuario) VALUES (?, ?);';
  const values = [nome, id_usuario];

  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar a pasta' });
    }

    // Retorna o id da pasta criada
    const pastaId = this.lastID;
    res.status(201).json({ nome, id_usuario });
  });
});

// Endpoint para inserir tabela na pasta
app.post('/pasta/inserirtabela', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql =
  `INSERT INTO pasta (id_usuario, id_tabela) VALUES ('${req.body.id_usuario}', '${req.body.id_tabela}' )`;

  console.log(sql);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
  });
  res.write('<p>Tabela inserida com sucesso!</p>');
  res.end();
});

// Endpoint que lista todas as pastas criadas pelo usuário
app.get('/pastas', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = `SELECT * FROM pasta`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar tabelas.');
    } else {
      res.json(rows);
    }
  });
});

// Endpoint que lista todas as tabelas dentro das pastas criadas pelo usuário
app.get('/pastas/tabelas', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = `SELECT * FROM tabela_pasta`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar tabelas.');
    } else {
      res.json(rows);
    }
  });
});

//Endpoint de exclusão de uma pasta
app.get('/pasta/delete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = `DELETE FROM pasta WHERE id_pasta='${req.query.id_pasta}'`;
  db = new sqlite3.Database(DBPATH);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
    res.write('<p>Pasta Removida com sucesso!</p>');
    res.end();
  });
});

//Endpoint de exclusão de uma tabela dentro de uma pasta
app.post('/pasta/tabela/delete', urlencodedParser, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = 'DELETE FROM tabela_pasta WHERE id_tabela = ? AND id_pasta = ?';
  const params = [req.body.id_tabela, req.body.id_pasta];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir o item' });
    }

    if (this.changes === 0) {
      return res
        .status(500)
        .json({ error: 'Item não encontrado ou já excluído' });
    }

    res.status(200).json({ message: 'Item excluído com sucesso' });
  });
});


/*********** ENDPOINTS DE VISAO GERAL ***********/
//Endpoint de listagem das informacoes de cada tabela
app.get('/visaogeral', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = `SELECT * FROM tabela WHERE id='${req.query.id}'`;
  console.log(sql);
  db = new sqlite3.Database(DBPATH);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});


/*********** ENDPOINTS DE FAVORITOS ***********/
// Endpoint join para tabela e favorito
app.get('/tabelasFavoritadas', (req,res) => {
  res.statusCode = 200;
  res.setHeader(`Acess-Control-Allow-Origin`,'*');
  const sql = `SELECT favorito.id_tabela, tabela.id, tabela.nome, tabela.descricao, tabela.categoria, tabela.database, tabela.dado_sensivel
  FROM tabela
  INNER JOIN favorito ON tabela.id = favorito.id_tabela`;
  
  db.all(sql, [], (err,rows) =>{
    if (err){
      console.error(err.message);
      res.status(500).send('Erro ao conectar tabelas');
    } else {
      res.render('html/favoritos', {tabelas: rows});
    }
  });
});

app.get('/tabelasFavoritadasSensivel', (req,res) => {
  res.statusCode = 200;
  res.setHeader(`Acess-Control-Allow-Origin`,'*');
  const sql = `SELECT tabela.id, tabela.dado_sensivel, favorito.id_tabela
  FROM tabela 
  INNER JOIN favorito ON tabela.id = favorito.id_tabela`;
  
  db.all(sql, [], (err,rows) =>{
    if (err){
      console.error(err.message);
      res.status(500).send('Erro ao conectar tabelas');
    } else {
      res.json(rows);
    }
  });
});

//Endpoint para inserir tabela aos favoritos
app.get('/favoritos/inserirTabela', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = new Date().toLocaleDateString('pt-BR'); // data atual
  const sql =
    `INSERT INTO favorito (data, id_usuario, id_tabela) VALUES ('${data}', '1', '${req.query.id_tabela}' )`;
  console.log(sql);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
  });
  res.redirect('/tabelasFavoritadas');
});


//Endpoint para deletar tabela dos favoritos
app.get('/favoritos/delete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = `DELETE FROM favorito WHERE id_tabela='${req.query.id_tabela}'`;
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
    res.redirect('/tabelasFavoritadas');
  });
});

// Inicia o servidor
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
