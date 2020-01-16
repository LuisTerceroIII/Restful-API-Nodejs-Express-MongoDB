const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', (req,res) => res.render('put'))


module.exports = router;