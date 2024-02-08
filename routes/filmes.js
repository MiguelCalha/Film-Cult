var express = require('express');
var router = express.Router();
var mysql = require('mysql2');


 /**
  * Criar ligação 
  */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'film_cult',
    password: 'password',
    port: 3306 //defeito 3306
});

//Ir buscar todos os filmes

router.get('/', function (req, res, next) {
  
  var query = mysql.format(`SELECT * FROM filmes`);

  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log(`Erro: ${err}`);
      return res.send(500);
    }

    console.log(results);
    res.render('filmes', {filmes: results });

  });
});

// Filme pelo ID

router.get('/:id', function ( req, res, next){

  var id = req.params.id;
  if(!id || isNaN(id)){
    return res.send(404)
  }

  var query = mysql.format(`SELECT * FROM FILMES WHERE id_filme=${id}`);

  connection.query(query, function ( err, results, fields){
    if(err){
      console.log(`Error: ${err}`);
      return res.send(500);

    }

    if(results.length === 0) return res.send(404);

    res.render('filme', {filme: results[0]});
    //res.redirect(`/filmes/${results.id}`);
  });

});

//Adicionar FIlme aos favoritos

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
      res.redirect(`/filmes`);
  });
});
/**
 * 
 * @param {Em caso de falta de algum campo} body 
 */
function handleCreateFormErrors(body) {
if (!body.email) {
    return {
        code: 400,
        message: "Missing email"
    }
} else if (!body.filmeid) {
    return {
        code: 400,
        message: "Missing Movie Id"
    }
} else if (!body.nome) {
    return {
        code: 400,
        message: "Missing movie Name"
    } 

} else if (!body.id_reference) {
  return {
      code: 400,
      message: "Missing id"
  }



} 

return null;
}

router.post('/addSeen', (req, res, next) => {
  // Verificar se os campos estão preenchidos
  var body = req.body;
  var error = handleCreateFormErrors(body);
  if (error) {
      return res.status(error.code).send(error.message);
  }

  // Query de inserção
  var query = mysql.format(`INSERT INTO vistos (nome, imagem, id_reference) VALUES ('${body.nome}','${body.imagem}','${body.reference}');`);
  connection.query(query, function (err, results, fields) {
      if (err) {
          console.log(`Erro: ${err}`);
          return res.send(500);
      }
      if (results.affectedRows === 0) return res.send(500);

      // Redirecionamento para a página 
      res.redirect(`/showSeen`);
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
        message: "Missing image"
    }

} else if (!body.id_reference) {
  return {
      code: 400,
      message: "Missing id"
  }

} 

return null;
}



router.post("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  if (!id || isNaN(id)) {
      return res.send(404);
  }

  var query = mysql.format(`delete from favoritos where id_reference=${id};`);
  connection.query(query, function (err, results, fields) {
      if (err) {
          console.log(`Erro: ${err}`);
          return res.send(500);
      }
      if (results.affectedRows === 0) return res.send(500);

      // Redirecionamento para a página com todos os livros
      res.redirect(`/showFavourites`);
  });
});


module.exports = router;


