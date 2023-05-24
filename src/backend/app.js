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
const port = 3000; 

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

app.get('/informacoes_tabela', (req, res) => {
  const idTabela = req.query.id; // Obtém o ID da tabela da query string

  // Execute a lógica necessária para obter as informações específicas da tabela
  // com base no ID fornecido.

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


app.post('/solicitar', (req, res) => {
  const sql = "INSERT INTO solicitacoes (id_usuario, data, sql_code) VALUES (?, ?, ?)"
  const {id_usuario, data, sql_code} = req.body
  const valores = [id_usuario, data, sql_code]

  db.run(sql, valores, (err) => {
    if (err) {
      throw err
    } else {
      console.log(sql)
      res.status(200).send("Tabela inserida")
    }
  })
})


//Endpoint para a realização da atualização dos metadados, de acordo com o formulário
app.put('/atualizar', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = req.body.sql_code
  
  console.log(sql);
  var db = new sqlite3.Database(DBPATH);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
    res.end();
  });
  res.write('<p>Campo Atualizado com sucesso!</p>');
  db.close();
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
  db.close();
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
  var db = new sqlite3.Database(DBPATH);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
    res.end();
  });
  res.write('<p>Campo Atualizado com sucesso!</p>');
  db.close();
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
  db.close();
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
  db.close();
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
  db.close();
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
  db.close();
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
  db.close();
});

//Endpoint de exclusão de uma pasta
app.get('/pasta/delete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = `DELETE FROM pasta WHERE id_pasta='${req.query.id_pasta}'`;
  var db = new sqlite3.Database(DBPATH);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
    res.write('<p>Pasta Removida com sucesso!</p>');
    res.end();
  });
  db.close();
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
  var db = new sqlite3.Database(DBPATH);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close();
});


/*********** ENDPOINTS DE FAVORITOS ***********/
//Endpoint de listagem das informacoes de cada tabela
app.get('/favoritos', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = `SELECT * FROM favorito`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar tabelas.');
    } else {
      res.json(rows);
    }
  });
  db.close();
});

//Endpoint para inserir tabela aos favoritos
app.post('/favoritos/inserirtabela', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql =
    `INSERT INTO favorito (data, id_usuario, id_tabela) VALUES ('${req.body.data}', '${req.body.id_usuario}', '${req.body.id_tabela}' )`;
  console.log(sql);
  db.run(sql, [], err => {
    if (err) {
      throw err;
    }
  });
  res.write('<p>Tabela inserida com sucesso!</p>');
  res.end();
  db.close();
});


//Endpoint para deletar tabela dos favoritos
app.delete('/favoritos/delete', urlencodedParser, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = 'DELETE FROM favorito WHERE data = ? AND id_usuario = ? AND id_tabela = ?';
  const {data, id_usuario, id_tabela} = req.body
  const params = [data, id_usuario, id_tabela]
  
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir o item' });
    }
    
    if (this.changes === 0) {
      console.log(params)
      return res
        .status(500)
        .json({ error: 'Item não encontrado ou já excluído', params });
    }
  
    res.status(200).json({ message: 'Item excluído com sucesso' });
  });
});

// Inicia o servidor
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});