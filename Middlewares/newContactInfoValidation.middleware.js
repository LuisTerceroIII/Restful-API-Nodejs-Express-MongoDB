const normalizeContact = require('../Services/normalizeContact')
const {
    isValidEmail,
    emailIsEmpty,
    isValidName,
    nameIsEmpty,
    isEmptyObject,
    isEmpty,
    validAge,
    validPhoneNumber,
    validWebURL
} = require('../Services/CommonValidation')

/*
* Se envia un objeto con todos los errores encontrados, si llega hasta el final y el objeto "errorObj" no tiene propiedades, el contacto es valido!
*   si es valido retornar true, sino false.
* */


const validateContactInfo = async (req, res, next) => {

    const newContact = await normalizeContact(req.body);
    const errorObj = {}

    if (await nameIsEmpty(newContact.name))
        errorObj.name = "Name is require"
    else if (!await isValidName(newContact.name))
        errorObj.nameLength = "Invalid name, min length is 2, max is 40"

    if (await nameIsEmpty(newContact.lastname))
        errorObj.lastname = "Lastname is require"
    else if (!await isValidName(newContact.lastname))
        errorObj.lastnameLength = "Invalid lastname, min length is 2, max is 40"

    if (await isEmpty(newContact.phoneNumber))
        errorObj.phone = "Phone number is require"
    else if (!await validPhoneNumber(newContact.phoneNumber))
        errorObj.phoneLength = "The phone number must have a minimum of 7 numbers and a maximum of 10. Do not enter spaces or - between numbers."

    if (!await isEmpty(newContact.age) && !await validAge(newContact.age))
        errorObj.age = "Invalid age, minimum 1, maximum 180"

    if (await emailIsEmpty(newContact.email))
        errorObj.email = "E-mail is required";
    else if (!await isValidEmail(newContact.email))
        errorObj.emailFormat = "Invalid format, format example: something@somethingElse.com"

    //Hasta aqui los necesarios/obligatorios

    if (!await isEmpty(newContact.company) && !await isValidName(newContact.company))
        errorObj.company = "Company name is too short, min 2 chars."

    if (!await isEmpty(newContact.homepage) && !await validWebURL(newContact.homepage))
        errorObj.homepage = "Invalid web site patter"

    if (!await isEmptyObject(errorObj))
        res.status(400).json(errorObj);
    else next();
}

module.exports = validateContactInfo;