"use strict"

const { nanoid } = require('nanoid');
const TaskService = require('../services/TaskService');
const Task = require('../models/Task');

class TaskAPIController {
    get(req, res) {
        const taskService = TaskService.getInstance();
        res.json(taskService.get());
    }

    /* GET task by id */
    getById(req, res) {
        const taskService = TaskService.getInstance();
        res.json(taskService.getById(req.params.id));
    }

    /* CREATE task */
    post(req, res) {
        const taskService = TaskService.getInstance();

        const dateBegin = req.body.dateBegin;
        const dateEnd = req.body.dateEnd;
        const tags = req.body.tags;

        const task = new Task(
            nanoid(8),
            req.body.title,
            dateBegin,
            dateEnd,
            req.body.state,
            tags
        );

        taskService.create(task);

        res.json("Successful Added");
    }

    /* UPDATE task */
    put(req, res) {
        const taskService = TaskService.getInstance();
        taskService.update(req.params.id, req.body);

        res.json("Successful Updated");
    }

    /* DELETE task */
    delete(req, res) {
        const taskService = TaskService.getInstance();
        taskService.deleteById(req.params.id);

        res
        res.json("Successful Deleted");
    }
}

module.exports = TaskAPIController;