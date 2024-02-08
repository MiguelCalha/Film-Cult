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
 * Ir buscar todos os vistos
 */

router.get('/', function (req, res, next) {
  
    var query = mysql.format(`SELECT * FROM vistos`);
  
    connection.query(query, function (err, results, fields) {
      if (err) {
        console.log(`Erro: ${err}`);
        return res.send(500);
      }
  
      console.log(results);
      res.render('showSeen', {filmes: results });
  
    });
  });

  /**
   * Eliminar dos vistos
   */

  router.post("/:id_vistos/delete", (req, res, next) => {
    var id = req.params.id_vistos;
    if (!id || isNaN(id)) {
        return res.send(404);
    }
  
    var query = mysql.format(`delete from vistos where id_vistos=${id};`);
    connection.query(query, function (err, results, fields) {
        if (err) {
            console.log(`Erro: ${err}`);
            return res.send(500);
        }
        if (results.affectedRows === 0) return res.send(500);
  
        // Redirecionamento para a página com todos os livros
        res.redirect(`/showSeen`);
    });
  });



module.exports = router;