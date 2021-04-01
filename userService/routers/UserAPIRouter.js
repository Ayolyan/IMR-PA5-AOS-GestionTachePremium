"use strict"

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserAPIController');
const userController = new UserController();

// Déclaration des routers
router.get('/', userController.get);
router.get('/id/:id', userController.getById);

router.post('/', userController.post);

router.put('/id/:id', userController.put);

router.delete('/id/:id', userController.delete);

module.exports = router;
