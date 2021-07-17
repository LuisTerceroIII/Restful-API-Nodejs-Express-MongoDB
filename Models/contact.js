const mongoose = require("../Config/Dbconection/connectionDb");
const Schema = mongoose.Schema;

let contactSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name: {type: String},
    lastname: {type: String},
    phoneNumber: {type: String},
    age: {type: Number, min: 0},
    email: {type: String},
    company: {type: String},
    homepage: {type: String},
    note: {type: String}
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {Contact,contactSchema };
