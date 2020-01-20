const express = require("express");
const router = express.Router();
const idValidation = require("./../public/JS/idValidation");
const mongoose = require("mongoose");
const ContactDB = require("./../models/contact");
const ContactDBFull = require("./../models/contactFull");
const _ = require("lodash");
const util = require("util");

//------------------------GET------------------------------

router.get("/", (req, res) => {

  ContactDBFull.find((err, contact) => {
    if (err)
      res.status(500).json({
        error: err
      });

    contacts_json = []

    
    contact.forEach( contact => {
    
      let user = {

        id: contact.id,
        name: contact.name,
        lastName : contact.lastName,
        phoneNumber : contact.phoneNumber,
        age : contact.age,
        email : contact.email

      }

      contacts_json.push(user)
  });

  res.status(200).json(contacts_json);

 
});

router.get("/details", (req, res) => {

  let contacts_json = []

  ContactDBFull.find({}, (err, contact) => {
    if (err)
      throw res.status(500).json({
        error: err.message
      });

    contact.forEach(user => {

      let userFull = {        
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          phoneNumber : user.phoneNumber,
          age: user.age,
          email: user.email,
          company: user.company,
          homepage: user.homepage,
          family = {
            sister: user.family.sister,
            mom: user.family.mom,
            dad: user.family.dad
          },
          notes = {
            note: user.note
          }
      }
      contacts_json.push(userFull)
    })

    if (contacts_json.length > 1) {
      res.status(200).json(contacts_json);
    } else {
      res.status(204).json({
        message: "Your collection is empty - No content"
      });
    }
  });
});

router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id, 10);
  ContactDBFull.find({ "id": id }, async (err, contact) => {
    if (err)
      throw res.status(500).json({error: err.message});
    let contacts_json = [];
    contact.forEach(contact => {
      let userBasic = {
        id: contact.id,
        name: contact.name,
        lastName: contact.lastName,
        age: contact.age,
        email: contact.email
      };

      contacts_json.push(userBasic);
    });

    if (contacts_json.length > 0) {
      res.status(200).json(contacts_json);
    } else {
      contacts_json.push({ result: "Not found any contact whit that id" });

      res.status(404).json(contacts_json);
    }
  });
});

//------------------------POST------------------------------

router.post("/create", (req, res) => {
  let len = () => {

    return ContactDBFull.countDocuments({})
      .then(result => {
        return result;
      })
      .catch(err => err);
  };

  len().then(result => {
    let user = new ContactDBFull({
        id: result + 1,
        name: req.body.user_name,
        lastName: req.body.user_lastName,
        age: req.body.user_age,
        email: req.body.user_email
      }
    );
    if (
      idValidation.isValid(
        user.name,
        user.lastName,
        user.age,
        user.email
      )
    ) {
      user.save(err => {
        if (err) throw err;
      });
      ContactDBFull.find(async (err, contact) => {
        if (err)
          throw res.status(500).json({error: err});

        let contacts_json = [];

        contact.forEach(contact => {
          let userFull = {
            id: contact.id,
            name: contact.name,
            lastName: contact.lastName,
            phoneNumber : contact.phoneNumber,
            age: contact.age,
            email: contact.email
          };
          contacts_json.push(userFull);
        });
        //console.log(util.inspect(contacts_json[2], false, null));
        if (contacts_json.length > 0 ) {
          res.status(200).json(contacts_json);
        } else {
          contacts_json.push({ result: "No content" });

          res.status(204).json(contacts_json);
        }
      });
    } else {
      res.status(200).json({
        message: "Not create - Verify personal information"
      });
    }
  });
});

router.post("/", (req, res) => {
  let len = () => {
    return ContactDB.countDocuments({})
      .then(result => {
        return result;
      })
      .catch(err => err);
  };

  const { name = null, lastName, phoneNumber, age, email } = req.body;

  if (!name) res.status(400).json({ error: "name is require" });
  if (name.length < 3)
    res.status(400).json({ error: "name minimun 3 character" });
  if (!lastName) res.status(400).json({ error: "Lastname is require" });
  if (lastName.length < 3)
    res.status(400).json({ error: "Lastname minimun 3 character" });
  if (!phoneNumber) res.status(400).json({ error: "phone number is require" });
  if (phoneNumber.length === 7)
    res.status(400).json({ error: "phone number must have 8 numbers" });
  if (!age) res.status(400).json({ error: "name is require" });
  if (age < 0 && age > 120)
    res.status(400).json({ error: "Your age is wrong" });
  if (!email) res.status(400).json({ error: "email is require" });
  if (email.length < 3)
    res.status(400).json({ error: "email minimum 3 character" });

  let user = new ContactDBFull({ name, lastName, phoneNumber, age, email });

  user.save((err, contact) => {
    if (err) res.status(500).json({ err: err.message });
    res.status(200).json(contact);
  });
  return null;
 
});

//------------------------DELETE------------------------------

router.delete("/:id", (req, res) => {

  let id = parseInt(req.params.id, 10);

  ContactDB.findOneAndDelete({ id: id }, (err, result) => {
    if (err)
      throw res.status(500).json({error: err.message});

    let response_json = []

    let deleteContact = {
      id: result.id,
      name: result.name,
      lastName: result.lastName,
      age: result.age,
      email: result.email
    };

    response_json.push(deleteContact);

    if (response_json.length > 0) {
      res.status(200).json(response_json);
    } else {
      response_json.push({ result: "Not found any contact whit that id" });

      res.status(204).json(response_json);
    }
  });
});

router.delete("/deleteAll", (req, res) => {
  ContactDB.deleteMany({}, (err, result) => {
    res
      .status(200)
      .json({ message: "jaujauajaua i delete all motherfuckers!" });
  });
});

//------------------------PUT------------------------------

router.put("/:id", (req, res) => {
  let id = parseInt(req.params.id, 10);
  console.log(req.body.user_name);

  let res_json = [];

  ContactDBFull.findOne({ "id": id }, (err, contact) => {
    var editContact = {};
    console.log(contact);

    if (err)
      throw res.status(500).json({error: err.message});

    if (
      req.body.user_name !== "" &&
      req.body.user_name !== contact.name
    ) {
      editContact.name = req.body.user_name;
    }
    if (
      req.body.user_lastName !== "" &&
      req.body.user_lastName !== contact.lastName
    ) {
      editContact.lastName = req.body.user_lastName;
    }
    if (
      req.body.user_age !== null &&
      req.body.user_age !== contact.age
    ) {
      editContact.age = parseInt(req.body.user_age);
    }
    if (
      req.body.user_email !== "" &&
      req.body.user_email !== contact.email
    ) {
      editContact.email = req.body.user_email;
    }
    if (
      req.body.user_company !== "" &&
      req.body.user_company !== contact.company
    ) {
      editContact.company = req.body.user_company;
    }
    if (
      req.body.user_homepage !== "" &&
      req.body.user_homepage !== contact.homepage
    ) {
      editContact.homepage = req.body.user_homepage;
    }
    if (
      req.body.user_sister !== "" &&
      req.body.user_sister !== contact.family.sister
    ) {
      editContact.family.sister = req.body.user_sister;
    }
    if (
      req.body.user_mom !== "" &&
      req.body.user_mom !== contact.family.mom
    ) {
      editContact.family.mom = req.body.user_mom;
    }
    if (
      req.body_user_dad !== "" &&
      req.body.user_dad !== contact.family.dad
    ) {
      editContact.family.dad = req.body.user_dad;
    }
    if (req.body.user_note != "" && req.body.user_note !== contact.note) {
      editContact.note = req.body.user_note;
    }

    

    ContactDBFull.findOneAndUpdate(
      { "id": id },
      { $set: editContact },
      (err, result) => {
        if (err)
          throw res.status(500).json({error: err.message});

        res_json.push(editContact);

        res.status(200).json(res_json);
      }
    );
  });
});



module.exports = router;