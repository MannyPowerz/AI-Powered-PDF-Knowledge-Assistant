
const {queryController} = require('../controllers/queryController')

const express = require('express');
const router = express.Router();

router.post('/prompt', queryController)

module.exports = router;