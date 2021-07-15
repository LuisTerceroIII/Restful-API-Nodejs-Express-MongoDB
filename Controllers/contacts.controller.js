const ContactDBFull = require("../Models/contactFull");

const getAll = async (req,res,next) => {
  try {
    const result = await ContactDBFull.find().exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const getById = async (req,res,next) => {
  let id = req.params.id;
  try {
    const result = await ContactDBFull.findOne({ _id: id }).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const createContact = async (req,res,next) => {
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

  console.log(req.body)

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
}

const deleteById = async (req,res,next) => {
  let id = req.params.id;
  try {
    const result = await ContactDBFull.findOneAndDelete({ _id: id }).exec();
    if (result !== null) res.status(200).json(result);
    else res.status(200).json({ message: "No valid id" });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const patchById = async (req,res,next) => {
  let id = req.params.id;
  try {
    const contact = await ContactDBFull.findOne({ _id: id }).exec();
    if(contact._id !== null) {
      const result = await ContactDBFull.findByIdAndUpdate({ _id: id },req.body).exec();
      res.status(200).json(result);
    } else {
      res.status(500).json("akhdjka")
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
