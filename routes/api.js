const express = require("express");
const router = express.Router();
const ContactDBFull = require("../models/contactFull");
/* const _ = require("lodash");
const util = require("util"); */

//------------------------GET------------------------------

router.get("/", async (req, res) => {
  try {
    const result = await ContactDBFull.find().exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await ContactDBFull.findOne({ _id: id }).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//------------------------POST------------------------------

router.post("/", (req, res) => {
  const {
    name = null,
    lastName,
    phoneNumber,
    age,
    email,
    company,
    homepage,
    family: {
      sister,
      brother,
      dad,
      mom,
    },
    
    note
  } = req.body;

  if (!name) res.status(400).json({ error: "name is require" });
  if (name.length < 3)
    res.status(400).json({ error: "name minimun 3 character" });
  if (!lastName) res.status(400).json({ error: "Lastname is require" });
  if (lastName.length < 3)
    res.status(400).json({ error: "Lastname minimun 3 character" });
  if (!phoneNumber) res.status(400).json({ error: "phone number is require" });
  if (phoneNumber.length === 7)
    res.status(400).json({ error: "phone number must have 8 numbers" });
  if (!age) res.status(400).json({ error: "age is require" });
  if (age < 0 && age > 120)
    res.status(400).json({ error: "Your age is wrong" });
  if (!email) res.status(400).json({ error: "email is require" });
  if (email.length < 3)
    res.status(400).json({ error: "email minimum 3 character" });
  //Hasta aqui los necesarios/obligatorios
  if (company)
    if (company.length < 2)
      res.status(400).json({ error: "Company minimum 2 character" });
  if (homepage)
    if (homepage.length < 5)
      res.status(400).json({ error: "Homepage minimum 5 character" });
  if (sister)
    if (sister.length < 3)
      res.status(400).json({ error: "Sister name minimum 3 character" });
  if (brother)
    if (brother.length < 3)
      res.status(400).json({ error: "Brother name minimum 3 character" });
  if (dad)
    if (dad.length < 3)
      res.status(400).json({ error: "Dad name minimum 3 character" });
  if (mom)
    if (mom.length < 3)
      res.status(400).json({ error: "Mom name minimum 3 character" });

  let user = new ContactDBFull({
    name,
    lastName,
    phoneNumber,
    age,
    email,
    company,
    homepage,
    family: {
      sister,
      brother,
      dad,
      mom
    }
  });

  user.save((err, contact) => {
    if (err) res.status(500).json({ err: err.message });
    res.status(200).json(contact);
  });
});

//------------------------DELETE------------------------------

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await ContactDBFull.findOneAndDelete({ _id: id }).exec();
    if (result !== null) res.status(200).json(result);
    else res.status(200).json({ message: "No valid id" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});
//------------------------PATCH------------------------------

router.patch("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    var contacto = await ContactDBFull.findOne({ _id: id }).exec();
  } catch (err) {
    res.status(400).json(err.message);
  }
  let editContact = {
    family: {
      sister: contacto.family.sister,
      brother: contacto.family.brother,
      mom: contacto.family.mom,
      dad: contacto.family.dad
    }
  };
  const {
    name = null,
    lastName,
    phoneNumber,
    age,
    email,
    company,
    homepage,
    sister,
    brother,
    dad,
    mom,
    note
  } = req.body;

  try {
    var contact = await ContactDBFull.findOne({ _id: id }).exec();
    console.log(contact);

    if (
      name !== undefined &&
      name !== null &&
      name !== "" &&
      name !== contact.name
    ) {
      editContact.name = name;
    }
    if (
      lastName !== undefined &&
      lastName !== null &&
      lastName !== "" &&
      lastName !== contact.lastName
    ) {
      editContact.lastName = lastName;
    }
    if (
      phoneNumber !== undefined &&
      phoneNumber !== null &&
      phoneNumber !== "" &&
      phoneNumber !== contact.phoneNumber
    ) {
      editContact.phoneNumber = phoneNumber;
    }
    if (age !== undefined && age !== null && age !== contact.age) {
      editContact.age = age;
    }
    if (
      email !== undefined &&
      email !== null &&
      email !== "" &&
      email !== contact.email
    ) {
      editContact.email = email;
    }
    if (
      company !== undefined &&
      company !== null &&
      company !== "" &&
      company !== contact.company
    ) {
      editContact.company = company;
    }
    if (
      homepage !== undefined &&
      homepage !== null &&
      homepage !== "" &&
      homepage !== contact.homepage
    ) {
      editContact.homepage = homepage;
    }

    if (
      sister !== undefined &&
      sister !== null &&
      sister !== "" &&
      sister !== contact.family.sister
    ) {
      editContact.family.sister = sister;
    }
    if (
      brother !== undefined &&
      brother !== null &&
      brother !== "" &&
      brother !== contact.family.brother
    ) {
      editContact.family.brother = brother;
    }
    if (
      mom !== undefined &&
      mom !== null &&
      mom !== "" &&
      mom !== contact.family.mom
    ) {
      editContact.family.mom = mom;
    }
    if (
      dad !== undefined &&
      dad !== null &&
      dad !== "" &&
      dad !== contact.family.dad
    ) {
      editContact.family.dad = dad;
    }
    if (
      note !== undefined &&
      note !== null &&
      note !== "" &&
      note !== contact.note
    ) {
      editContact.note = note;
    }

    console.log(editContact);

  } catch (err) {
    res.status(500).json(err.message);
  }
  try {
    const result = await ContactDBFull.findByIdAndUpdate(
      { _id: id },
      editContact
    ).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
