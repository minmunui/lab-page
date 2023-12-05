const express = require('express');
const { renderMain, renderJoin } = require('../controllers/page');
const router = express.Router();

router.get('/', renderMain);
router.get('/join', renderJoin);

module.exports = router;