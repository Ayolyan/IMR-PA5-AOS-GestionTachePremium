"use strict"

const express = require('express');
const router = express.Router();

const TagController = require('../../controllers/api/TagAPIController');
const tagController = new TagController();

// Déclaration des routers
router.get('/', tagController.get);
router.get('/id/:id', tagController.getById);

router.post('/', tagController.post);

router.put('/id/:id', tagController.put);

router.delete('/id/:id', tagController.delete);

module.exports = router;