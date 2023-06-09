const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Add inventory route
router.post('/add', inventoryController.addInventory);

// Search inventory route
router.get('/search', inventoryController.searchInventory);

module.exports = router;
