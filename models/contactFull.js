const mongoose = require('../config/mongoose/connectionDb')
const Schema = mongoose.Schema

let contactFullSchema = new Schema({
    

        basicInfo : 
        {
            
            id: {type: Number},
            name: {type : String},
            lastName: {type : String},
            phoneNumber: {type : String},
            age: {type : Number},
            email: {type : String}
                    
        },

        infoExtra : 
        {

            company : {type :String},
            homepage : {type : String},
           /*  birthday : {type : Date}, */ // const birthday = new Date(`${moth} ${day}`)
            family : { sister : [{type: String}] , brother: [{type: String}] , mom : {type : String}, dad : {type : String}}

        },        

        notes :
         
            {

                /* date: {type: Date}, */
                note : {type: String}

            }
        
    }
)

let contactFull = mongoose.model('Contacts', contactFullSchema)

module.exports = contactFull;