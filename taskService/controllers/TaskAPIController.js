"use strict"

const { nanoid } = require('nanoid');
const TaskService = require('../services/TaskService');
const Task = require('../models/Task');

class TaskAPIController {
    get(req, res) {
        const taskService = TaskService.getInstance();
        res.json(taskService.get());
    }

    getAchievable(req, res) {
        const taskService = TaskService.getInstance();
        res.json(taskService.getAchievable());
    }

    getByTagId(req, res) {
        const taskService = TaskService.getInstance();
        res.json(taskService.getByTagId(req.params.tagId));
    }

    getByTagsId(req, res) {
        const taskService = TaskService.getInstance();

        let tasks;
        switch (req.query.method) {
            case 'or':
                tasks = taskService.getByTagsIdOr(JSON.parse(req.params.tagsId));
                break;
            case 'and':
                tasks = taskService.getByTagsIdAnd(JSON.parse(req.params.tagsId));
                break;
            case undefined:
                tasks = taskService.getByTagsIdAnd(JSON.parse(req.params.tagsId));
                break;
            default:
                res.status(400).json({ errors: [{ message: 'Argument "method" invalide' }] });
                // res.render('error', { message: 'Argument "method" invalide', error: Error('Argument "method" invalide') });
        }

        res.json(tasks);
    }

    /* GET task by id */
    getById(req, res) {
        const taskService = TaskService.getInstance();
        res.json(taskService.getById(req.params.id));
    }

    /* CREATE task */
    post(req, res) {
        const taskService = TaskService.getInstance();

        const dateBegin = new Date(req.body.dateBegin);
        const dateEnd = new Date(req.body.dateEnd);
        const tags = req.body.tags;

        try {
            const task = new Task(
                nanoid(8),
                req.body.title,
                dateBegin,
                dateEnd,
                req.body.state,
                tags
            );

            taskService.create(task);

            res.json(task);
        } catch (err) {
            res.status(400).json({ errors: [{ message: err.message }] });
        }
    }

    /* UPDATE task */
    put(req, res) {
        const taskService = TaskService.getInstance();

        const taskEditedFields = req.body;

        if (taskEditedFields.id !== undefined) {
            if (taskEditedFields.id !== req.params.id) {
                res.status(400).json({ errors: [{ message: 'L\'id d\'une tâche ne peut être changé via cette API' }] });
            }
        }

        if (taskEditedFields.dateBegin) {
            try {
                taskEditedFields.dateBegin = new Date(taskEditedFields.dateBegin);
            } catch (e) {
                res.status(400).json({ errors: [{ message: 'Format de date de début non supporté' }] });
            }
        }

        if (taskEditedFields.dateEnd) {
            try {
                taskEditedFields.dateEnd = new Date(taskEditedFields.dateEnd);
            } catch (e) {
                res.status(400).json({ errors: [{ message: 'Format de date de fin non supporté' }] });
            }
        }

        if (taskEditedFields.dateBegin > taskEditedFields.dateEnd) {
            res.status(400).json({ errors: [{ message: 'La date de fin doit être supérieure à la date de début' }] });
        }

        taskService.update(req.params.id, taskEditedFields);

        res.json("Successful Updated");
    }

    /* DELETE task */
    delete(req, res) {
        const taskService = TaskService.getInstance();
        taskService.deleteById(req.params.id);

        res.json("Successful Deleted");
    }
}

module.exports = TaskAPIController;