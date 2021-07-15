const express = require('express');
const router = express.Router();
const contactsController = require('../Controllers/contacts.controller')

router.get('/',contactsController.getAll)
router.get("/:id",contactsController.getById)
router.post('/',contactsController.createContact)
router.delete('/:id',contactsController.deleteById)
router.patch('/:id', contactsController.patchById)

module.exports = router;