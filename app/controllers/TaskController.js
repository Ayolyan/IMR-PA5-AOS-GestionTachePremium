"use strict"

const axios = require('axios');

class TaskController {

    getList(req, res) {
        axios.get(`${ process.env.TASKURL || 'http://localhost' }:${ process.env.TASKPORT || '3001' }/api/v1/tasks`)
            .then( (response) => {
                res.render('tasks/list', { tasks: response.data });
            })
            .catch( err => res.send(err));
    }

    getCreate(req, res) {
        axios.get(`${ process.env.TAGURL || 'http://localhost' }:${process.env.TAGPORT || '3002'}/api/v1/tags`)
            .then( (response) => {
                res.render('tasks/create', { tags: response.data });
            })
            .catch( err => res.send(err));
    }

    async getEdit(req, res) {
        const taskId = req.params.id;

        let task;
        let tags;

        await axios.get(`${ process.env.TASKURL || 'http://localhost' }:${process.env.TASKPORT || '3001'}/api/v1/tasks/id/${ taskId }`)
            .then( (response) => {
                task = response.data;
            })
            .catch( err => res.send(err));

        await axios.get(`${ process.env.TAGURL || 'http://localhost' }:${process.env.TAGPORT || '3002'}/api/v1/tags`)
            .then( (response) => {
                tags = response.data;
            })
            .catch( err => res.send(err));

        res.render('tasks/edit', { task: task, tags: tags });
    }

}

module.exports = TaskController;