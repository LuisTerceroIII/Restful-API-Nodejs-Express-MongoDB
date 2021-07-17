/*No longer used, contacts are accessed from the users,
 as it should not be possible to view a contact if it does not belong to a user*/
const express = require('express');
const router = express.Router();
const contactsController = require('../Controllers/contacts.controller')
const validateContactInfo = require('../Middlewares/newContactInfoValidation.middleware')

router.get('/', contactsController.getAll)
router.get("/:id", contactsController.getById)
router.post('/', validateContactInfo, contactsController.createContact)
router.delete('/:id', contactsController.deleteById)
router.patch('/:id', contactsController.patchById)

module.exports = router;