var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FilmCult' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

router.get('/torrentsearcher', function(req, res, next) {
  res.render('torrentsearcher', { title: 'Torrent Searcher' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
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
  
module.exports = router;


