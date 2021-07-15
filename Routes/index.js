const express = require('express');
const router = express.Router();
const mainRoute = process.env.DEV_API_URL

const contactsRoutes = require('./contacts.routes')
const sessionRoutes = require('./session.routes')

router.use(`${mainRoute}/contacts`, contactsRoutes);
router.use(`${mainRoute}/session`, sessionRoutes);

module.exports = router;