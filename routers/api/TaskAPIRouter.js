"use strict"

const express = require('express');
const router = express.Router();

const TaskController = require('../../controllers/api/TaskAPIController');
const taskController = new TaskController();

// Déclaration des routers
router.get('/', taskController.get);
router.get('/id/:id', taskController.getById);

router.post('/', taskController.post);

router.put('/id/:id', taskController.put);

router.delete('/id/:id', taskController.delete);

module.exports = router;
