"use strict"

const axios = require('axios');

class TaskController {

    getList(req, res) {
        axios.get(`http://localhost:${ process.env.TASKPORT || '3001' }/api/v1/tasks`)
            .then( (response) => {
                res.render('tasks/list', { tasks: response.data });
            })
            .catch( err => res.send(err));
    }

    getCreate(req, res) {
        axios.get(`http://localhost:${process.env.TAGPORT || '3002'}/api/v1/tags`)
            .then( (response) => {
                res.render('tasks/create', { tags: response.data });
            })
            .catch( err => res.send(err));
    }

    getEdit(req, res) {
        axios.get(`http://localhost:${process.env.TAGPORT || '3002'}/api/v1/tags`)
            .then( (response) => {
                res.render('tasks/edit', { tags: response.data });
            })
            .catch( err => res.send(err));
    }

}

module.exports = TaskController;