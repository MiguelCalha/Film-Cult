var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');

//Registar user
router.post('/register', authController.register )

//Fazer login

router.post('/login', authController.login );

//Fazer logout
router.get('/logout', authController.logout_get);


module.exports = router;


