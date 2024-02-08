var express = require('express');
var router = express.Router();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



    /**
     * Criar ligação à BD
     */
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
      });

      /**
       * Adicionar um programa
       */
router.post('/addShow', (req, res, next) => {
    // Verificar se os campos estão preenchidos
    var body = req.body;
    var error = handleCreateFormErrors(body);
    if (error) {
        return res.status(error.code).send(error.message);
    }


  
    // Query de inserção
    var query = mysql.format(`INSERT INTO series (nome, genero, realizador, elenco, descricao, temporadas, episodios, imagem, trailer) VALUES ('${body.title}','${body.genre}','${body.director}', '${body.cast}', '${body.description}', '${body.seasons}', '${body.episodes}', '${body.image}' , '${body.trailer}');`);
    db.query(query, function (err, results, fields) {
        if (err) {
            console.log(`Erro: ${err}`);
            return res.send(500);
        }
        if (results.affectedRows === 0) return res.send(500);
  
        // Redirecionamento para a página 
        res.redirect(`/addShow`);
    });
  });

  
  
function handleCreateFormErrors(body) {
    if (!body) {
        return {
            code: 400,
            message: "Missing body"
        }
    } else if (!body.title) {
        return {
            code: 400,
            message: "Missing title"
        }
    } else if (!body.description) {
        return {
            code: 400,
            message: "Missing description"
        } 
    
    } else if (!body.genre) {
      return {
          code: 400,
          message: "Missing the genre"
      } 
  
    } else if (!body.cast) {
      return {
          code: 400,
          message: "Missing the cast"
      } 
    } else if (!body.description) {
      return {
          code: 400,
          message: "Missing the description"
      } 
    } else if (!body.seasons) {
      return {
          code: 400,
          message: "Missing the seasons"
      } 
    } else if (!body.episodes) {
        return {
            code: 400,
            message: "Missing the episodes"
        } 
      } else if (!body.image) {
        return {
            code: 400,
            message: "Missing the image"
        } 
      } else if (!body.trailer) {
        return {
            code: 400,
            message: "Missing the trailer"
        } 
      }
  
    return null;
  }


    
module.exports = router;