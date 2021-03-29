var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config(); // Récupération des variables d'environnement dans le fichier .env

const { nanoid } = require('nanoid');

// Low DB
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('dbTags.json'));
db.defaults({
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
const tagAPIRouter = require('./tagService/routers/TagAPIRouter');

// Tag Service
var tagService = express();

// view engine setup
tagService.set('views', path.join(__dirname, '/tagService/views'));
tagService.set('view engine', 'ejs');

tagService.use(cors()); // Enable All CORS Requests
tagService.use(logger('dev'));
tagService.use(express.json());
tagService.use(express.urlencoded({ extended: false }));
// tagService.use(cookieParser());
tagService.use(express.static(path.join(__dirname, '/tagService/public')));

tagService.use('/api/v1/tags', tagAPIRouter);

// catch 404 and forward to error handler
tagService.use(function(req, res, next) {
    next(createError(404));
});

// error handler
tagService.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = tagService;
