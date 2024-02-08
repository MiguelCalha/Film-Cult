var express = require('express');
var router = express.Router();
var passport = require('passport');

const auth = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FilmCult' });
  console.log(req.user);
  console.log(req.isAuthenticated());
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Signup' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
  });

  router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
  });
  
  router.get('/faq', function(req, res, next) {
    res.render('faq', { title: 'FAQ' });
  });
  
  router.get('/privacypolicy', function(req, res, next) {
    res.render('privacypolicy', { title: 'Privacy Policy' });
  });

  router.get('/termsservice', function(req, res, next) {
    res.render('termsservice', { title: 'Terms of Service' });
  });

  
  router.get('/addMovie', function(req, res, next) {
    res.render('addMovie', { title: 'Add Movie' });
  });

  
  router.get('/addShow', function(req, res, next) {
    res.render('addShow', { title: 'Add Show' });
  });

  router.get('/addEpisode', function(req, res, next) {
    res.render('addEpisode', { title: 'Add Episode' });
  });

  router.get('/addSeason', function(req, res, next) {
    res.render('addSeason', { title: 'Add a Season' });
  });



module.exports = router;


