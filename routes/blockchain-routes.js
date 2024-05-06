const express = require('express');
const router = express.Router();
const { getBlockchain, mineBlock } = require('../controllers/blockchain-controller');

router.route('/').get(getBlockchain);
router.route('/mine-block').get(mineBlock);

module.exports = router;