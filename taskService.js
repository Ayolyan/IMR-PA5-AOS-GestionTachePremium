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
const db = low(new FileSync('dbTasks.json'));
db.defaults({
    tasks: [
        {
            id: nanoid(8),
            title: "Finir le projet JEE",
            dateBegin: new Date("2018-03-20"),
            dateEnd: new Date("2018-04-11"),
            state: "non precise",
            tags: [ "0" ],
            users: []
        },
        {
            id: nanoid(8),
            title: "Blabla",
            dateBegin: new Date("2018-03-20"),
            dateEnd: new Date("2018-04-11"),
            state: "en cours",
            tags: [ "1", "2" ],
            users: []
        },
        {
            id: nanoid(8),
            title: "truc",
            dateBegin: new Date("2019-03-15"),
            dateEnd: new Date("2019-04-28"),
            state: "annulee",
            tags: [ "2" ],
            users: []
        }
    ]
}).write()

// Routers
const taskAPIRouter = require('./taskService/routers/TaskAPIRouter');

// Task Service
var taskService = express();

// view engine setup
taskService.set('views', path.join(__dirname, '/taskService/views'));
taskService.set('view engine', 'ejs');

taskService.use(cors()); // Enable All CORS Requests
taskService.use(logger('dev'));
taskService.use(express.json());
taskService.use(express.urlencoded({ extended: false }));
// taskService.use(cookieParser());
taskService.use(express.static(path.join(__dirname, '/taskService/public')));

taskService.use('/api/v1/tasks', taskAPIRouter);

// catch 404 and forward to error handler
taskService.use(function(req, res, next) {
    next(createError(404));
});

// error handler
taskService.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = taskService;
