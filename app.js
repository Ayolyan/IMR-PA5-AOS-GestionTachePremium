var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config(); // Récupération des variables d'environnement dans le fichier .env

const { nanoid } = require('nanoid');

// Low DB
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('db.json'));
db.defaults({ tasks: [
      {
        id: nanoid(8),
        title: "Finir le projet JEE",
        dateBegin: "20/03/2018",
        dateEnd: "11/04/2018",
        state: "non précisé",
        tags: [ "0" ]
      },
      {
        id: nanoid(8),
        title: "Blabla",
        dateBegin: "20/03/2018",
        dateEnd: "11/04/2018",
        state: "en cours",
        tags: [ "1", "2" ]
      },
      {
        id: nanoid(8),
        title: "truc",
        dateBegin: "20/03/2018",
        dateEnd: "11/04/2018",
        state: "annulé",
        tags: [ "2" ]
      }
    ],
    tags: [
        {
            id: nanoid(8),
            name: "travail"
        },
        {
            id: nanoid(8),
            name: "youpi"
        },
        {
            id: nanoid(8),
            name: "web"
        }
    ]
}).write()

// Routers
const indexRouter = require('./routers/index');
const taskRouter  = require('./routers/TaskRouter')
const tagRouter   = require('./routers/TagRouter')

// API Routers
const taskAPIRouter = require('./routers/api/TaskAPIRouter');
const tagAPIRouter  = require('./routers/api/TagAPIRouter');

// App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/taches', taskRouter);
app.use('/tags', tagRouter);

app.use('/api/v1/tasks', taskAPIRouter);
app.use('/api/v1/tags', tagAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
