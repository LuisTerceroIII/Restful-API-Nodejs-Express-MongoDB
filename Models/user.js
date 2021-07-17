const mongoose = require("../Config/Dbconection/connectionDb");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String},
    lastname: {type: String},
    email: {type: String},
    username: {type: String},
    password: {type: String},
    contacts : [{type: mongoose.Schema.Types.ObjectId, ref : 'Contact'}]
});

userSchema.statics.addContact = (contact,user) => {
    user.contacts.push(contact._id)
    user.save()
}

const User = mongoose.model("User", userSchema);

module.exports = User;