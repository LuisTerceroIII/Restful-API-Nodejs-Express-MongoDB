const express = require('express');
const router = express.Router();
const contactsController = require('../Controllers/contacts.controller')
const validateContactInfo = require('../Middlewares/newContactInfoValidation.middleware')

router.get('/',contactsController.getAll)
router.get("/:id",contactsController.getById)
router.post('/',validateContactInfo,contactsController.createContact)
router.delete('/:id',contactsController.deleteById)
router.patch('/:id', contactsController.patchById)

module.exports = router;