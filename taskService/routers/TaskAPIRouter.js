"use strict"

const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/TaskAPIController');
const taskController = new TaskController();

// Déclaration des routers
router.get('/', taskController.get);
router.get('/achievable', taskController.getAchievable);
router.get('/id/:id', taskController.getById);
router.get('/tag/id/:tagId', taskController.getByTagId);
router.get('/tags/id/:tagsId', taskController.getByTagsId);

router.post('/', taskController.post);

router.put('/id/:id', taskController.put);

router.delete('/id/:id', taskController.delete);

module.exports = router;
