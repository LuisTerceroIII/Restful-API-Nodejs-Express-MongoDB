const mongoose = require("../config/mongoose/connectionDb");
const Schema = mongoose.Schema;

let contactFullSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  age: { type: Number },
  email: { type: String },
  company: { type: String },
  homepage: { type: String }, 
  family: {
    sister: { type: String },
    brother: { type: String },
    mom: { type: String },
    dad: { type: String }
  },
  note: { type: String }
});

let contactFull = mongoose.model("Contacts", contactFullSchema);

module.exports = contactFull;
