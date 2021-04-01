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
const db = low(new FileSync('dbUsers.json'));
db.defaults({
    users: [
        {
            id: nanoid(8),
            username: "Yoan",
        },
        {
            id: nanoid(8),
            username: "Maxime",
        },
        {
            id: nanoid(8),
            username: "Clément",
        },
        {
            id: nanoid(8),
            username: "Mathieu",
        }
    ]
}).write()

// Routers
const userAPIRouter = require('./userService/routers/UserAPIRouter');

// User Service
var userService = express();

// view engine setup
userService.set('views', path.join(__dirname, '/userService/views'));
userService.set('view engine', 'ejs');

userService.use(cors()); // Enable All CORS Requests
userService.use(logger('dev'));
userService.use(express.json());
userService.use(express.urlencoded({ extended: false }));
// userService.use(cookieParser());
userService.use(express.static(path.join(__dirname, '/userService/public')));

userService.use('/api/v1/users', userAPIRouter);

// catch 404 and forward to error handler
userService.use(function(req, res, next) {
    next(createError(404));
});

// error handler
userService.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = userService;
