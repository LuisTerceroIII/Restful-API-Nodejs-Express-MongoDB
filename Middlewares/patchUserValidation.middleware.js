const UserDB = require('../Models/user');

const normalizeUser = require("../Services/nomalizeUser");
const {
    isValidEmail,
    isValidName,
    isEmptyObject,
    isEmpty
} = require('../Services/CommonValidation')

const validateEmailUse = async (newUser, errorObj) => {
    const emails = await UserDB.find({email: newUser?.email}).exec()
    if (emails.length > 0)
        errorObj.emailNotAvailable = "The e-mail is already in use, try another one."
}
const validateUsernameUse = async (newUser, errorObj) => {
    const usernames = await UserDB.find({username: newUser?.username}).exec()
    if (usernames.length > 0)
        errorObj.usernameNotAvailable = "The username is already in use, try another one."
}

const validateUserInfoForPatch = async (req, res, next) => {

    const newUser = await normalizeUser(req.body)
    const errorObj = {}

    if (!await isEmpty(newUser.name) && !await isValidName(newUser.name))
        errorObj.nameLength = "Invalid name, min length is 2, max is 40"

    if (!await isEmpty(newUser.lastname) && !await isValidName(newUser.lastname))
        errorObj.lastnameLength = "Invalid lastname, min length is 2, max is 40"

    if (!await isEmpty(newUser.username) && !await isValidName(newUser.username))
        errorObj.lastnameLength = "Invalid username, min length is 2, max is 40"

    if (!await isEmpty(newUser.email) &&!await isValidEmail(newUser.email))
        errorObj.emailFormat = "Invalid format, format example: something@somethingElse.com"

    await validateEmailUse(newUser, errorObj);
    await validateUsernameUse(newUser, errorObj);

    if (!await isEmptyObject(errorObj))
        res.status(400).json(errorObj);
    else next();
}

module.exports = validateUserInfoForPatch