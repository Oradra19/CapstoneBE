const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getFavorites } = require('../controllers/favoriteController');

router.get('/', auth, getFavorites);

module.exports = router;
