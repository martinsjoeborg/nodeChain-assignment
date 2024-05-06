const express = require('express');
const router = express.Router();

const { broadcastTxn, addTxn } = require('../controllers/createTxn-controller');

router.route('/').post(addTxn);
router.route('/broadcast').post(broadcastTxn);

module.exports = router;