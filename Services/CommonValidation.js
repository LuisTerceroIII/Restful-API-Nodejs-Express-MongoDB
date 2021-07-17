const validator = require('validator')

const isValidEmail = async (email) => validator.isEmail(email);
const emailIsEmpty = async (email) => validator.isEmpty(email);
const isValidName = async (name) => validator.isLength(name, {min: 2, max: 40});
const nameIsEmpty = async (name) => validator.isEmpty(name);
const validAge = async (age) => age > 0 && age < 181;
const validPhoneNumber = async (phoneNumber) => validator.isLength(phoneNumber, {min: 7, max: 10});
const validWebURL = async (url) => {
    return url.match(new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'))
};
const isEmpty = async (any) => validator.isEmpty(any);
const isEmptyObject = async (object) => Object.keys(object).length === 0;
const isEmptyArray = async (array)  => array.length === 0;
const validNames = async (arrayOfNames) => await arrayOfNames.every((name) => isValidName(name));

module.exports = {
    isValidEmail,
    emailIsEmpty,
    isValidName,
    nameIsEmpty,
    isEmptyObject,
    isEmpty,
    validAge,
    validPhoneNumber,
    validWebURL,
    validNames,
    isEmptyArray
}