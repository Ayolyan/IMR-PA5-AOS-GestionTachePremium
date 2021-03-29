const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/TaskController');
const taskController = new TaskController();

// Déclaration des routes
router.get('/', taskController.getList);
router.get('/create', taskController.getCreate);
router.get('/edit/:id', taskController.getEdit);

module.exports = router;