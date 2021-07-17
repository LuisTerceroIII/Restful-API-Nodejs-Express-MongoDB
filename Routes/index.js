const express = require('express');
const router = express.Router();
const mainRoute = process.env.DEV_API_URL

//const contactsRoutes = require('./contacts.routes')
const sessionRoutes = require('./session.routes')
const userRoutes = require('./user.routes')

//router.use(`${mainRoute}/contacts`, contactsRoutes);
router.use(`${mainRoute}/session`, sessionRoutes);
router.use(`${mainRoute}/user`, userRoutes);

module.exports = router;