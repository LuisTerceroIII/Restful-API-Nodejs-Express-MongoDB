const express = require('express')
const router = express.Router()
const userController = require('../Controllers/user.controller')
const validateContactInfo = require('../Middlewares/newContactInfoValidation.middleware')
const validateContactInfoForPatch = require("../Middlewares/patchContactValidation.middleware");
const validateUserInfoForPatch = require("../Middlewares/patchUserValidation.middleware");

//path exclusive user
router.get('/:id', userController.getById)
router.delete('/:id', userController.deleteById)
router.patch('/:id',validateUserInfoForPatch, userController.patchById)

//paths resorce : Contact from user.
router.get('/:userId/contact', userController.getAllContacts)
router.get('/:userId/contact/:contactId', userController.getContactById)
router.post('/:userId/contact',validateContactInfo, userController.createContact)
router.delete('/:userId/contact/:contactId', userController.deleteContactById)
router.patch('/:userId/contact/:contactId', validateContactInfoForPatch, userController.patchContactById)




module.exports = router;