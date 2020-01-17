const mongoose = require("../config/mongoose/connectionDb");
const Schema = mongoose.Schema;

let contactFullSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  age: { type: Number },
  email: { type: String },

  company: { type: String },
  homepage: { type: String }, // const birthday = new Date(`${moth} ${day}`)
  /*  birthday : {type : Date}, */
  family: {
    sister: [{ type: String }],
    brother: [{ type: String }],
    mom: { type: String },
    dad: { type: String }
  },

  /* date: {type: Date}, */
  note: { type: String }
});

let contactFull = mongoose.model("Contacts", contactFullSchema);

module.exports = contactFull;
