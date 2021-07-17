
/*No longer used, contacts are accessed from the user controller,
 as it should not be possible to view a contact if it does not belong to a user*/
const Contact = require("../Models/contact");
const normalizeContact = require('../Services/normalizeContact')

const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find().exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getById = async (req, res, next) => {
    let id = req.params.id;
    try {
        const result = await Contact.findOne({_id: id}).exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const createContact = async (req, res, next) => {
    try {
        const newContact = await normalizeContact(req.body)
        const contactToSave = new Contact(newContact);
        contactToSave.save((err, contact) => {
            if (err) res.status(500).json({err: err.message});
            else res.status(200).json(contact);
        })
    } catch (err) {
        res.status(500).json({err: err})
    }
}

const deleteById = async (req, res, next) => {
    let id = req.params.id;
    try {
        const result = await Contact.findOneAndDelete({_id: id}).exec();
        if (result !== null) res.status(200).json(result);
        else res.status(200).json({message: "No valid id"});
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const patchById = async (req, res, next) => {
    let id = req.params.id;
    try {
        const contact = await Contact.findOne({_id: id}).exec();
        if (contact._id !== null) {
            const result = await Contact.findByIdAndUpdate({_id: id}, req.body).exec();
            res.status(200).json(result);
        } else {
            res.status(500).json({message: "Error in patch"})
        }
    } catch (err) {
        res.status(400).json(err.message);
    }

}

module.exports = {
    getAll,
    getById,
    createContact,
    deleteById,
    patchById
};
