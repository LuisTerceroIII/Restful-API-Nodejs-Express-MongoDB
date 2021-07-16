const validator = require('validator')
const normalizeUser = require('../Services/nomalizeUser')
const UserDB = require('../Models/user')

const isEmpty = (object) => Object.keys(object).length === 0

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

const validateUserInfo = async  (req,res,next) => {
    const newUser = await normalizeUser(req.body)
    const errorObj = {}

    if (validator.isEmpty(newUser.name))
        errorObj.name = "Name is require"

    if (!validator.isLength(newUser.name, {min: 2, max: 40}))
        errorObj.nameLength = "Invalid name, min length is 2, max is 40"

    if (validator.isEmpty(newUser.lastName))
        errorObj.lastname = "Lastname is require"

    if (!validator.isLength(newUser.lastName, {min: 2, max: 40}))
        errorObj.lastnameLength = "Invalid lastname, min length is 2, max is 40"

    if (validator.isEmpty(newUser.email))
        errorObj.email = "Email is require";

    if (!validator.isEmail(newUser.email))
        errorObj.emailFormat = "Invalid format, format example : something@somethingElse.com"

    await validateEmailUse(newUser, errorObj);
    await validateUsernameUse(newUser, errorObj);

    if (!isEmpty(errorObj)) res.status(400).json(errorObj); else next();

}

module.exports = validateUserInfo;