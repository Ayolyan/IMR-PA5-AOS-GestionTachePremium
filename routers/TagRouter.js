const express = require('express');
const router = express.Router();

const TagController = require('../controllers/TagController');
const tagController = new TagController();

// Déclaration des routes
router.get ('/', tagController.getList);

module.exports = router;