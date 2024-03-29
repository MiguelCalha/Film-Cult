var passport = require('passport');
var createError = require('http-errors');
var express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });
/**
 * Ligação á BD de maneira a n se ver os dados de Login da BD. estes estão guardados no ficnehiro .env
 */
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});


db.connect((error) => {

  if (error) {
    console.log(error)
  } else {
    console.log("My SQL Connected...")
  }
})


varbodyParser = require('body-parser');

var path = require('path');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var addMovieRouter = require("./routes/addMovie");
var addShowRouter = require("./routes/addShow");
var filmesRouter = require("./routes/filmes");
var showsRouter = require("./routes/shows");
var showSeenRouter = require("./routes/showSeen");
var showFavouritesRouter = require("./routes/showFavourites");
var addEpisodeRouter = require("./routes/addEpisode");
var addSeasonRouter = require("./routes/addSeason");

var app = express();



app.listen(900, () => {
  console.log("Server is running on port 9000");
})

app.use(express.static('images'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



/**
 * Use the routes
 */
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/addMovie", addMovieRouter);
app.use('/auth', require('./routes/auth'));
app.use("/addShow", addShowRouter);
app.use("/filmes", filmesRouter);
app.use("/shows", showsRouter);
app.use("/showSeen", showSeenRouter);
app.use("/showFavourites", showFavouritesRouter);
app.use("/addEpisode", addEpisodeRouter);
app.use("/addSeason", addSeasonRouter);

app.use(express.json());
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
