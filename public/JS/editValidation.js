
const _ = require('lodash')

let editContact = []

if(req.body.user_name !== '' && req.body.user_name !== contact.basicInfo.name){
    editContact.push({name: req.body.user_name})
}
if(req.body.user_lastName !== '' && req.body.lastName !== contact.basicInfo.lastName){
    editContact.push({lastName: req.body.lastName})
}
if(req.body.user_age !== null && req.body.user_age !== contact.basicInfo.age){
    editContact.push({age : req.body.user_age})
}
if(req.body.user_email !== '' && req.body.user_email !== contact.basicInfo.email){
    editContact.push({email: req.body.user_email})
}
if(req.body.user_company !== '' && req.infoExtra.company !== contact.infoExtra.company){
    editContact.push({company : req.body.user_company})
}
if(req.body.user_homepage !== '' && req.body.user_homepage !==  contact.infoExtra.homepage){
    editContact.push({homepage : req.body.user_homepage})
}
if(req.body.user_sister !== '' && req.body.user_sister !== contact.infoExtra.family.sister){
    editContact.push({sister : req.body.user_sister})
}
if(req.body.user_mom !== '' && req.body.user_mom !== contact.infoExtra.family.mom){
    editContact.push({mom : req.body.user_mom})
}
if(req.body_user_dad !== '' && req.body.user_dad !== contact.infoExtra.family.dad){
    editContact.push({dad: req.body.user_dad})
}
if(req.body.user_note != '' && req.body.user_note !== contact.notes.note){
    editContact.push({note : req.body.user_note})
}

/* let object = _.toPlainObject(editContact)
console.log(editContact)
console.log('-----------------------------------------------------------------------------')
console.log(object) */

module.exports = editContact
