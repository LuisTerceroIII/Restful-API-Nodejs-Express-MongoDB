const normalizeUser = require('../Services/nomalizeUser')
const UserDB = require('../Models/user')
const {isValidEmail, emailIsEmpty, isValidName, nameIsEmpty, isEmptyObject} = require('../Services/CommonValidation')

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

const validateUserInfo = async (req, res, next) => {
    const newUser = await normalizeUser(req.body)
    const errorObj = {}

    if (await nameIsEmpty(newUser.name))
        errorObj.name = "Name is require"
    else if (!await isValidName(newUser.name))
        errorObj.nameLength = "Invalid name, min. length is 2, max. length is 40"

    if (await nameIsEmpty(newUser.lastname))
        errorObj.lastname = "Lastname is require"
    else if (!await isValidName(newUser.lastname))
        errorObj.lastnameLength = "Invalid lastname, min. length is 2, max. length is 40"

    if (await emailIsEmpty(newUser.email))
        errorObj.email = "E-mail is required";
    else if (!await isValidEmail(newUser.email))
        errorObj.emailFormat = "Invalid format, format example: something@somethingElse.com"

    if (await nameIsEmpty(newUser.username))
        errorObj.username = "Username is required";
    else if (!await isValidName(newUser.username))
        errorObj.usernameLength = "Invalid username, min length is 2, max is 40"

    await validateEmailUse(newUser, errorObj);
    await validateUsernameUse(newUser, errorObj);

    if (!await isEmptyObject(errorObj)) res.status(400).json(errorObj); else next();

}

module.exports = validateUserInfo;