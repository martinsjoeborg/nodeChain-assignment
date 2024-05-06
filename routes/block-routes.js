const express = require('express');
const router = express.Router();
const { block } = require('../controllers/block-controller');

router.route('/').post(block);

module.exports = router;