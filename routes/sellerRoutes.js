const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

const authRoutes = require('./authRoutes');



// sellerRoutes.js

router.post('/signup', sellerController.signup);


// Mount the authentication routes
router.use('/auth', authRoutes);

module.exports = router;