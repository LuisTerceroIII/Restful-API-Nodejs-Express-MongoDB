const express = require("express");
const router = express.Router();
const db = require("../db/db");
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
      throw res.status(500).send({
        status: "500",
        success: false,
        message: "We can´t connect right now, try later",
        error: err
      });

    let contacts_json = [
      { status: "200", success: true, message: "We are connect right now!" }
    ];

    res.status(200).send(contact);
    /* contact.forEach((contact)=>{
            
            let userFull = {
                id: contact.id,
                name: contact.name,
                lastName : contact.lastName,
                age : contact.age,
                email : contact.email
            }
              
          
            /* if(user.name)
            co */
  });

  /* res.status(200).send(contacts_json) */
});

/* }) */

router.get("/details", (req, res) => {
  let contacts_json = [
    { status: "200", success: true, message: "We are connect right now!" }
  ];

  ContactDBFull.find({}, (err, contact) => {
    if (err)
      throw res.status(500).send({
        status: "500",
        success: false,
        message: "We can´t connect right now, try later",
        error: err
      });

    contact.forEach(user => {
      let userFull = [
        (basicInfo = {
          id: user.basicInfo.id,
          name: user.basicInfo.name,
          lastName: user.basicInfo.lastName,
          age: user.basicInfo.age,
          email: user.basicInfo.email
        }),
        (infoExtra = {
          company: user.infoExtra.company,
          homepage: user.infoExtra.homepage,

          /* birthday : req.body.user_birthday, */
          family: {
            sister: user.infoExtra.family.sister,
            mom: user.infoExtra.family.mom,
            dad: user.infoExtra.family.dad
          }
        }),
        (notes = {
          note: user.notes.note
        })
      ];

      contacts_json.push(userFull);
    });

    if (contacts_json.length > 1) {
      res.status(200).send(contacts_json);
    } else {
      res.status(200).send({
        status: 200,
        success: true,
        message: "Your collection is empty"
      });
    }
  });
});

router.get("/searchById/:id", (req, res) => {
  let id = parseInt(req.params.id, 10);
  ContactDBFull.find({ "basicInfo.id": id }, async (err, contact) => {
    if (err)
      throw res.status(500).send({
        status: 500,
        success: false,
        message: "We can´t connect right now, try later",
        error: err
      });
    let contacts_json = [
      { status: "200", success: true, message: "We connect perfectly" }
    ];

    contact.forEach(contact => {
      let userBasic = {
        id: contact.basicInfo.id,
        name: contact.basicInfo.name,
        lastName: contact.basicInfo.lastName,
        age: contact.basicInfo.age,
        email: contact.basicInfo.email
      };

      contacts_json.push(userBasic);
    });

    if (contacts_json.length !== 1) {
      res.status(200).send(contacts_json);
    } else {
      contacts_json.push({ result: "Not found any contact whit that id" });

      res.status(200).send(contacts_json);
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
      basicInfo: {
        id: result + 1,
        name: req.body.user_name,
        lastName: req.body.user_lastName,
        age: req.body.user_age,
        email: req.body.user_email
      }
    });
    console.log(user.name);

    if (
      idValidation.isValid(
        user.basicInfo.name,
        user.basicInfo.lastName,
        user.basicInfo.age,
        user.basicInfo.email
      )
    ) {
      user.save(err => {
        if (err) throw err;
      });
      ContactDBFull.find(async (err, contact) => {
        if (err)
          throw res.status(500).send({
            status: 500,
            success: false,
            message: "We can´t connect right now, try later",
            error: err
          });
        let contacts_json = [
          {
            status: "200",
            success: true,
            message: "We create a new contact successfuly"
          }
        ];

        contact.forEach(contact => {
          let userFull = {
            id: contact.basicInfo.id,
            name: contact.basicInfo.name,
            lastName: contact.basicInfo.lastName,
            age: contact.basicInfo.age,
            email: contact.basicInfo.email
          };
          contacts_json.push(userFull);
        });
        //console.log(util.inspect(contacts_json[2], false, null));
        if (contacts_json.length !== 1) {
          res.status(200).send(contacts_json);
        } else {
          contacts_json.push({ result: "Not found any contact whit that id" });

          res.status(200).send(contacts_json);
        }
      });
    } else {
      res.status(200).send({
        success: false,
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

  console.log('AGE : ' + age)
  console.log(typeof age)

  if (!name) res.status(400).json({ error: "name is require" });
  if (name.length < 3)
    res.status(400).json({ error: "name minimun 3 character" });
  if (!lastName) res.status(400).json({ error: "Lastname is require" });
  if (lastName.length < 3)
    res.status(400).json({ error: "Lastname minimun 3 character" });
  if (!phoneNumber) res.status(400).json({ error: "phone number is require" });
  if (phoneNumber.length === 7 )
    res.status(400).json({ error: "phone number must have 8 numbers" });
  if (!age) res.status(400).json({ error: "name is require" });
  if (age < 0 && age > 120)
    res.status(400).json({ error: "Your age is wrong" });
  if (!email) res.status(400).json({ error: "email is require" });
  if (email.length < 3)
    res.status(400).json({ error: "email minimum 3 character" });

    let user = new ContactDBFull({name,lastName,phoneNumber,age,email})

  user.save((err,contact) => {
      if(err) res.status(500).json({err: err.message})
      res.status(200).json(contact)
  } )
  return null;
  len().then(result => {
    let user = new ContactDBFull({
      basicInfo: {
        id: result + 1,
        name: req.body.user_name,
        lastName: req.body.user_lastName,
        age: req.body.user_age,
        email: req.body.user_email
      },

      infoExtra: {
        company: req.body.user_company,
        homepage: req.body.user_homepage,

        /* birthday : req.body.user_birthday, */
        family: {
          sister: req.body.user_sister,
          mom: req.body.user_mom,
          dad: req.body.user_dad
        }
      },

      notes: {
        note: req.body.user_note
      }
    });

    if (
      idValidation.isValid(
        user.basicInfo.name,
        user.basicInfo.lastName,
        user.basicInfo.age,
        user.basicInfo.email
      )
    ) {
      user.save((err, userx) => {
        if (err) throw err;
      });

      let contacts_json = [
        {
          status: "200",
          success: true,
          message: "We create a new contact successfuly"
        }
      ];
      let userObject = _.toPlainObject(user);

      let newUser = {
        basic_Information: {
          id: userObject.basicInfo.id,
          name: userObject.basicInfo.name,
          lastName: userObject.basicInfo.lastName,
          age: userObject.basicInfo.age,
          email: userObject.basicInfo.email
        },
        extra_Information: {
          company: userObject.infoExtra.company,
          homepage: userObject.infoExtra.homepage,
          family: {
            sister: userObject.infoExtra.family.sister,
            brother: userObject.infoExtra.family.brother,
            mom: userObject.infoExtra.family.mom,
            dad: userObject.infoExtra.family.dad
          }
        },
        notes: {
          note: userObject.notes.note
        }
      };

      contacts_json.push(newUser);
      res.send(contacts_json);
    } else {
      res.status(200).send({
        success: false,
        message: "Not create - Verify personal information"
      });
    }
  });
});

//------------------------DELETE------------------------------

router.delete("/deleteById/:id", (req, res) => {
  let id = parseInt(req.params.id, 10);

  ContactDB.findOneAndDelete({ id: id }, (err, result) => {
    if (err)
      throw res.status(500).send({
        status: "500",
        success: false,
        message: "We can´t connect right now, try later",
        error: err
      });

    let response_json = [
      {
        status: "200",
        success: true,
        message: "We delete the choose contact successfuly"
      }
    ];

    let deleteContact = {
      id: result.basicInfo.id,
      name: result.basicInfo.name,
      lastName: result.basicInfo.lastName,
      age: result.basicInfo.age,
      email: result.basicInfo.email
    };

    response_json.push(deleteContact);

    if (response_json.length !== 1) {
      res.status(200).send(response_json);
    } else {
      response_json.push({ result: "Not found any contact whit that id" });

      res.status(200).send(response_json);
    }
  });
});

router.delete("/deleteAll", (req, res) => {
  ContactDB.deleteMany({}, (err, result) => {
    res
      .status(200)
      .send({ message: "jaujauajaua i delete all motherfuckers!" });
  });
});

//------------------------PUT------------------------------

router.put("/modifyById/:id/email/:email", (req, res) => {
  //Probar con siguiente logica: Si se envia un -1 en cualquier parametro (no id) no se modifica.

  let id_param = parseInt(req.params.id, 10);

  let email = req.params.email;

  ContactDB.findOneAndUpdate(
    { id: id_param },
    { email: email },
    (err, result) => {
      if (err)
        throw res.status(500).send({
          status: 500,
          success: false,
          message: "We can´t connect right now, try later",
          error: err
        });
      let result_json = [
        { status: 200, success: true, message: "Your updates were successful" }
      ];

      let updateContact = {
        id: result.id,
        name: result.name,
        lastName: result.lastName,
        age: result.age,
        email: result.email
      };

      result_json.push(updateContact);

      if (result_json.length !== 1) {
        res.status(200).send(result_json);
      } else {
        result_json.push({ result: "Not found any contact whit that id" });

        res.status(200).send(result_json);
      }
    }
  );
});

router.put("/edit/contact/:id", (req, res) => {
  let id = parseInt(req.params.id, 10);
  console.log(req.body.user_name);

  let res_json = [
    { status: 200, success: true, message: "The edition was complete" }
  ];

  ContactDBFull.findOne({ "basicInfo.id": id }, (err, contact) => {
    var editContact = {};
    console.log(contact);

    if (err)
      throw res.status(500).send({
        status: 500,
        success: false,
        message: "We can´t connect right now, try later",
        error: err
      });

    if (
      req.body.user_name !== "" &&
      req.body.user_name !== contact.basicInfo.name
    ) {
      editContact.basicInfo.name = req.body.user_name;
    }
    if (
      req.body.user_lastName !== "" &&
      req.body.user_lastName !== contact.basicInfo.lastName
    ) {
      editContact.basicInfo.lastName = req.body.user_lastName;
    }
    if (
      req.body.user_age !== null &&
      req.body.user_age !== contact.basicInfo.age
    ) {
      editContact.basicInfo.age = parseInt(req.body.user_age);
    }
    if (
      req.body.user_email !== "" &&
      req.body.user_email !== contact.basicInfo.email
    ) {
      editContact.basicInfo.email = req.body.user_email;
    }
    if (
      req.body.user_company !== "" &&
      req.body.user_company !== contact.infoExtra.company
    ) {
      editContact.InfoExtra.company = req.body.user_company;
    }
    if (
      req.body.user_homepage !== "" &&
      req.body.user_homepage !== contact.infoExtra.homepage
    ) {
      editContact.InfoExtra.homepage = req.body.user_homepage;
    }
    if (
      req.body.user_sister !== "" &&
      req.body.user_sister !== contact.infoExtra.family.sister
    ) {
      editContact.InfoExtra.family.sister = req.body.user_sister;
    }
    if (
      req.body.user_mom !== "" &&
      req.body.user_mom !== contact.infoExtra.family.mom
    ) {
      editContact.InfoExtra.family.mom = req.body.user_mom;
    }
    if (
      req.body_user_dad !== "" &&
      req.body.user_dad !== contact.infoExtra.family.dad
    ) {
      editContact.InfoExtra.family.dad = req.body.user_dad;
    }
    if (req.body.user_note != "" && req.body.user_note !== contact.notes.note) {
      editContact.notes.note = req.body.user_note;
    }

    console.log(editContact);

    ContactDBFull.findOneAndUpdate(
      { "basicInfo.id": id },
      { $set: editContact },
      (err, result) => {
        if (err)
          throw res.status(500).send({
            status: 500,
            success: false,
            message: "We can not save the changes",
            error: err
          });

        console.log(result);

        res_json.push(editContact);

        res.status(200).send(res_json);
      }
    );
  });
});

//console.log(util.inspect(contacts_json[2], false, null));
/*  console.log(util.inspect(`Edit contact ${editContact}\n -------------------------------------------------`,false,null))
    console.log(`En Edit aun: ${JSON.stringify(editContact)}`)
 */

/* ContactDBFull.findOneAndUpdate({'basicInfo.id': id},(err,result) => {

        if(err) throw res.status(500).send({status: 500 ,success: false,message:'We can´t connect right now, try later', error:err})


    

        console.log(`---------------------------------------------------------\nResult ${result}`)
    







           /* res_json.push({msn: 'Personal information update',editContact}) */

/*  res.status(200).send(res_json)
            
       

            res.status(500).send({status: 200 ,success: true ,message:'Nothing change', editContact}) */

module.exports = router;
