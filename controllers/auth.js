const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
;
/**
 * Ligar à BD
 */
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });

/**
 * 
 * @param {Fazer Login} req 
 * @param {*} res 
 */
exports.login = async (req, res) => {
try {
    
const { email, password} = req.body;

if(!email || !password ){
    return res.status(400).render('login', {
        message:'Please provide a email and/or password'
    })
}
/**
 * Qeury de Login
 */
db.query('SELECT * FROM login WHERE email = ?', [email], async (error, results) => {
    console.log(results);
    if( !results || !(await bcrypt.compare(password, results[0].password ))){
        res.status(401).render('login', {
            message: 'The Email or password provided are incorrect'
        })
    } else {
        const id = results[0].id;
        //Criar uma cookie de user
        const token = jwt.sign({ email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);
        //Fazer com que a cookie n expire
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/filmes");
    }
})

} catch (error) {
    console.log(error);
}
}

//Format Toekn
//Authorization: Bearer <access_toekn>

function verifiyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    //Verficicar se bearer está undifined

    if(typeof bearerHeader !== 'undefined'){

    } else {
        //Forbidden

        res.sendStatus(403);
    }

}
/**
 * Registar um utilizador
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {
    console.log(req.body);


    const { name, email, password, passwordConfirm } = req.body;


    db.query('SELECT email FROM login WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register', {
                message: 'The email is already in use'
            })
        } else if (password !== passwordConfirm ){
            return res.render('register', {
                message: 'The Passwords do not match'
        });
    }

/**
 * Encriptar a password
 */
    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
/**
 * Criar utilizador - QUERY
 */

    db.query('INSERT INTO login SET ?', {username: name, email: email, password: hashedPassword }, (error, results) => {

        if(error) {
            console.log(error);
            
        } else {
            console.log(results);
            return res.render('register', {
                message: 'User Registered'
            });
        }
    })

    });

}
/**
 * Pega na nossa cookie criada no login e muda o seu tempo de duração para 1 milisegundo para a eliminar e o user fazer logout
 * @param {*} req 
 * @param {*} res 
 */
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}


