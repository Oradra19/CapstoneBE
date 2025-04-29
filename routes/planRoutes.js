const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getPlans } = require('../controllers/planController');

router.get('/', auth, getPlans);

module.exports = router;
