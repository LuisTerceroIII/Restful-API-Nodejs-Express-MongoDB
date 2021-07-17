const UserDB = require("../Models/user");
const {Contact} = require("../Models/contact");
const normalizeContact = require("../Services/normalizeContact");
/*
The createUser method is declared in session.controller.js,
in the "/register" endpoint, so it is not here.
*/
const getById = async (req,res,next) => {
    const id = req.params.id;
    try {
        const result = await UserDB.find({_id: id}).populate('contacts').exec();
        if (result !== null) res.status(200).json(result);
        else res.status(200).json({message: "No valid ID"});
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteById = async (req,res,next) => {
    const id = req.params.id;
    try {
        const result = await UserDB.findOneAndDelete({_id: id}).exec();
        if (result !== null) res.status(200).json(result);
        else res.status(200).json({message: "No valid ID"});
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const patchById = async (req,res,next) => {
    const id = req.params.id;
    try {
        const contact = await UserDB.findOne({_id: id}).exec();
        if (contact._id !== null) {
            const result = await UserDB.findByIdAndUpdate({_id: id}, req.body).exec();
            res.status(200).json(result);
        } else {
            res.status(500).json({message: "Error in patch"})
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const getAllContacts = async (req,res,next) => {
    try {
        const reqUserId = req.params.userId;
        const contacts = await Contact.find({userId: reqUserId}).exec();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getContactById = async (req,res,next) => {
    try {
        const reqUserId = req.params.userId;
        const contactId = req.params.contactId;
        const result = await Contact.find({_id : contactId, userId: reqUserId }).exec();
        const contact = result[0] || null
        res.status(200).json(contact);
    } catch (e) {
        res.status(500).json(e);
    }
}

const createContact = async (req,res,next) => {
    try {
        const userId = req.params.userId;
        const newContact = await normalizeContact(req.body)
        newContact.userId = userId;
        const contactToSave = new Contact(newContact);
        const user = await UserDB.findById(userId).exec();
        if(user) {
            await UserDB.addContact(contactToSave,user)
            contactToSave.save((err, contact) => {
                if (err) res.status(500).json({err: err});
                else res.status(200).json(contact);
            })
        }
    } catch (err) {
        res.status(500).json({err: err})
    }
}

const deleteContactById = async (req,res,next) => {
    try {
        const reqUserId = req.params.userId;
        const contactId = req.params.contactId;
        const result = await Contact.findOneAndDelete({_id : contactId, userId: reqUserId }).exec();
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json(e)
    }
}

const patchContactById = async (req,res,next) => {
    const reqUserId = req.params.userId;
    const contactId = req.params.contactId;
    try {
        const contact = await Contact.findOne({_id : contactId, userId: reqUserId }).exec();
        const updatesForContact = req.body
        if (contact) {
            const result = await Contact.findByIdAndUpdate({_id: contactId}, updatesForContact).exec();
            res.status(200).json(result);
        } else {
            res.status(500).json({message: "Error in patch"})
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    getById,
    deleteById,
    patchById,
    getAllContacts,
    getContactById,
    createContact,
    deleteContactById,
    patchContactById
}