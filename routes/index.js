
const express = require('express');
const router = express.Router();

router.use('/api/contacts', require('./get.js'));
/* router.use('/post', require('./post.js'));
router.use('/put', require('./put.js'));
router.use('/delete', require('./delete.js')); */



module.exports = router;
