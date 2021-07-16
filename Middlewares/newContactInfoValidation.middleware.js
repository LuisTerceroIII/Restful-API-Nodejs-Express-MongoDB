const validator = require('validator')
const normalizeContact = require('../Services/normalizeContact')


/*
* Se envia un objeto con todos los errores encontrados, si llega hasta el final y el objeto "errorObj" no tiene propiedades, el contacto es valido!
*   si es valido retornar true, sino false.
* */

const isEmpty = (object) =>{
    return Object.keys(object).length === 0
}
const validateContactInfo = async (req,res,next) => {

    const newContact = await normalizeContact(req.body);

    const errorObj = {}

    const webSiteRegex = new RegExp('​^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$')

    if (validator.isEmpty(newContact.name)) {
        errorObj.name = "name is require"
    }

    if (!validator.isLength(newContact.name, {min: 2 , max: 40})) {
        errorObj.nameLength = "Invalid name, min length is 2, max is 40"
    }

    if (validator.isEmpty(newContact.lastName)) {
        errorObj.lastname =   "Lastname is require"
    }
    if (!validator.isLength(newContact.lastName,{min:2,max:40})) {
        errorObj.lastnameLength = "Invalid lastname, min length is 2, max is 40"
    }

    if (validator.isEmpty(newContact.phoneNumber)) {
        errorObj.phone = "phone number is require"
    }

    if (!validator.isLength(newContact.phoneNumber, {min: 8 , max: 14})) {
        errorObj.phoneLength = "phone number must min 8 numbers, 14 max"
    }

    if (newContact.age < 0 || newContact.age > 181) {
        errorObj.age = "Your age is wrong, min 1, max 180"
    }

    if (validator.isEmpty(newContact.email)) {
        errorObj.email = "email is require";
    }

    if (!validator.isEmail(newContact.email)) {
        errorObj.emailFormat = "invalid format, format example : something@somethingElse.com"
    }
    //Hasta aqui los necesarios/obligatorios

    if(!validator.isEmpty(newContact.company)) {
        if (!validator.isLength(newContact.company, {min: 2 , max: 50 })) {
            errorObj.company = "Company name is too short, min 2 chars."
        }
    }

    if(!validator.isEmpty(newContact.homepage)) {
        if (!newContact.homepage.match(webSiteRegex)) {
            errorObj.homepage = "Invalid web site patter"
        }
    }

    if(!validator.isEmpty(newContact.family.sister)) {
        if (!validator.isLength(newContact.family.sister, {min: 2 , max: 50 })) {
            errorObj.sister = "Name minimum 2 character"
        }
    }

    if(!validator.isEmpty(newContact.family.brother)) {
        if (!validator.isLength(newContact.family.brother, {min: 2 , max: 50 })) {
            errorObj.brother = "Name minimum 2 character"
        }
    }

    if(!validator.isEmpty(newContact.family.mom)) {
        if (!validator.isLength(newContact.family.mom, {min: 2 , max: 50 })) {
            errorObj.mom = "Name minimum 2 character"
        }
    }

    if(!validator.isEmpty(newContact.family.dad)) {
        if (!validator.isLength(newContact.family.dad, {min: 2 , max: 50 })) {
            errorObj.dad = "Name minimum 2 character"
        }
    }

    if(!isEmpty(errorObj)) {
        res.status(400).json(errorObj);
    } else {
        next();
    }
}

module.exports = validateContactInfo;