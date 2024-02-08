var express = require('express');
var router = express.Router();
var mysql = require('mysql2');


 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'film_cult',
    password: 'password',
    port: 3306 //defeito 3306
});



//Ir buscar todos os  favoritos

router.get('/', function (req, res, next) {
  
    var query = mysql.format(`SELECT * FROM favoritos`);
  
    connection.query(query, function (err, results, fields) {
      if (err) {
        console.log(`Erro: ${err}`);
        return res.send(500);
      }
  
      console.log(results);
      res.render('showFavourites', {filmes: results });
  
    });
  });


  router.post('/removeFav', (req, res, next) => {
    // Verificar se os campos estão preenchidos

    
  var nome = req.params.nome;
  if(!nome || isNaN(nome)){
    return res.send(404)
  }

    var body = req.body;
    var error = handleCreateFormErrors(body);
    if (error) {
        return res.status(error.code).send(error.message);
    }
  
    // Query de inserção
    var query = mysql.format(`DELETE from favoritos WHERE  nome=${nome}`);
    connection.query(query, function (err, results, fields) {
        if (err) {
            console.log(`Erro: ${err}`);
            return res.send(500);
        }
        if (results.affectedRows === 0) return res.send(500);
  
        // Redirecionamento para a página 
        res.redirect(`/showFavourites`);
    });
  });
  /**
   * 
   * @param {Certificar que n falta nenhum campo} body 
   */
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
  
  } 
  
  return null;
  }

  /**
   * Eliminar dos favoritos
   */

router.post("/:id_favoritos/delete", (req, res, next) => {
  var id = req.params.id_favoritos;
  if (!id || isNaN(id)) {
      return res.send(404);
  }

  var query = mysql.format(`delete from favoritos where id_favoritos=${id};`);
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