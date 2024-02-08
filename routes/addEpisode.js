var express = require('express');
var router = express.Router();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
/**
 * Criar ligação à base de dados
 */

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

/**
 * Adicionar episodio
 */
router.post('/addEpisode', (req, res, next) => {
    // Verificar se os campos estão preenchidos
    var body = req.body;
    var error = handleCreateFormErrors(body);
    if (error) {
        return res.status(error.code).send(error.message);
    }

    // Query de inserção
    var query = mysql.format(`INSERT INTO episodios (id_serie, id_temporada, nome, genero, realizador, elenco, descricao) VALUES ('${body.id_serie}','${body.id_temporada}','${body.nome}', '${body.genero}', '${body.realizador}', '${body.elenco}', '${body.descricao}');`);
    db.query(query, function (err, results, fields) {
        if (err) {
            console.log(`Erro: ${err}`);
            return res.send(500);
        }
        if (results.affectedRows === 0) return res.send(500);

        // Redirecionamento para a página 
        res.redirect(`/addEpisode`);
    });
});

function handleCreateFormErrors(body) {
    if (!body.id_serie) {
        return {
            code: 400,
            message: "Missing id serie"
        }
    } else if (!body.id_temporada) {
        return {
            code: 400,
            message: "Missing id temporada"
        }
    } else if (!body.nome) {
        return {
            code: 400,
            message: "Missing nome"
        }

    } else if (!body.genero) {
        return {
            code: 400,
            message: "Missing the genre"
        }

    } else if (!body.elenco) {
        return {
            code: 400,
            message: "Missing the cast"
        }
    } else if (!body.descricao) {
        return {
            code: 400,
            message: "Missing the description"
        }


    }

    return null;
}

module.exports = router;


