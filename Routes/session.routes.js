const express = require('express');
const router = express.Router();
const sessionController = require('../Controllers/session.controller')

router.post('/register',sessionController.register)
router.post('/login',sessionController.login)
router.get('/users',sessionController.getAllUsers)

module.exports = router;