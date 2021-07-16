const express = require('express');
const router = express.Router();
const sessionController = require('../Controllers/session.controller')
const validateUserInfo = require('../Middlewares/newUserInfoValidation.middleware')

router.post('/register', validateUserInfo, sessionController.register)
router.post('/login', sessionController.login)
router.get('/users', sessionController.getAllUsers)

module.exports = router;