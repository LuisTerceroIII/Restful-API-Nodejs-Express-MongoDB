const mongoose = require('../Config/Dbconection/connectionDb')
const Schema = mongoose.Schema

let contactSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    lastName: {type: String},
    age: {type: Number , min: 0},
    email: {type: String}
})

contactSchema.methods.presentation = () => {
    let saludos = `Hello my name is ${this.name} ${this.lastName}, i have ${this.age} years old and my email is ${this.email}`
    console.log(saludos)
}

let Contacts = mongoose.model('Contact', contactSchema);






module.exports = Contacts;

