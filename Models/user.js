const mongoose = require("../Config/Dbconection/connectionDb");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    username : {type : String},
    password : { type : String}
});

let user = mongoose.model("User", userSchema);

module.exports = user;