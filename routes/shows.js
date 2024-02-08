var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

 /**
  * Criar ligação à BD
  */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'film_cult',
    password: 'password',
    port: 3306 //defeito 3306
});


 


/**
 * Ir buscar todas as séries
 */

router.get('/', function (req, res, next) {
  
  var query = mysql.format(`SELECT * FROM series`);

  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log(`Erro: ${err}`);
      return res.send(500);
    }

    console.log(results);
    res.render('shows', {series: results });

  });
});

/**
 * Ir buscar a série pelo ID
 */

router.get('/:id', function ( req, res, next){

    var id = req.params.id;
    if(!id || isNaN(id)){
      return res.send(404)
    }
  
    var query = mysql.format(`SELECT * FROM series WHERE id_serie=${id}`);
  
    connection.query(query, function ( err, results, fields){
      if(err){
        console.log(`Error: ${err}`);
        return res.send(500);
  
      }
  
      if(results.length === 0) return res.send(404);
  
      res.render('show', {show: results[0]});

    });
  
  });


  
//Adicionar Série aos favoritos

router.post('/addFav', (req, res, next) => {
  // Verificar se os campos estão preenchidos
  var body = req.body;
  var error = handleCreateFormErrors(body);
  if (error) {
      return res.status(error.code).send(error.message);
  }

  // Query de inserção
  var query = mysql.format(`INSERT INTO favoritos (nome, imagem, id_reference) VALUES ('${body.nome}','${body.imagem}','${body.id_reference}');`);
  connection.query(query, function (err, results, fields) {
      if (err) {
          console.log(`Erro: ${err}`);
          return res.send(500);
      }
      if (results.affectedRows === 0) return res.send(500);

      // Redirecionamento para a página 
      res.redirect(`/shows`);
  });
});

function handleCreateFormErrors(body) {
if (!body.nome) {
    return {
        code: 400,
        message: "Missing nome"
    }
} else if (!body.imagem) {
    return {
        code: 400,
        message: "Missing imagem"
    }
} else if (!body.id_reference) {
  return {
      code: 400,
      message: "Missing id"
  }
} 


return null;
}


//Adicionar Série aos vistos
router.post('/addSeen', (req, res, next) => {
  // Verificar se os campos estão preenchidos
  var body = req.body;
  var error = handleCreateFormErrors(body);
  if (error) {
      return res.status(error.code).send(error.message);
  }

  // Query de inserção
  var query = mysql.format(`INSERT INTO vistos (nome, imagem, id_reference) VALUES ('${body.nome}','${body.imagem}','${body.id_reference}');`);
  connection.query(query, function (err, results, fields) {
      if (err) {
          console.log(`Erro: ${err}`);
          return res.send(500);
      }
      if (results.affectedRows === 0) return res.send(500);

      // Redirecionamento para a página 
      res.redirect(`/shows`);
  });
});

function handleCreateFormErrors(body) {
if (!body.nome) {
    return {
        code: 400,
        message: "Missing name"
    }
} else if (!body.imagem) {
    return {
        code: 400,
        message: "Missing show image"
    }
} else if (!body.id_reference) {
  return {
      code: 400,
      message: "Missing id"
  }
} 

return null;
}
  
module.exports = router;


