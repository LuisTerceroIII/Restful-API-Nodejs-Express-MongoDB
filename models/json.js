import { Router } from "express"

let contact = 

    result = {

        basicInfo : {
                
            name: 'newName',
            lastName: 'newLastName',  
            phoneNumber: 'newNumber',
            age: 'newAge',
            email: 'newEmail'
                    
        },


        infoExtra : {

            company : 'newCompany',
            homepage : 'newHomePage',
            birthday : 'newBirthday',

            related : {

                sister : 'newSister',
                mom : 'newMom',
                dad : 'newDad',

            }
            
        },
                        
        notes : {

            note : 'newNote'
        }
    }


console.log(contact)


router.put('/edit/contact/:id', (req,res) =>{

    let id = parseInt(req.params.id, 10)

    let res_json = [{status: 200 , success : true , message : 'The edition was complete'}]

    let editContact  = {

     basicInfo : {

        id : id,
        name : req.body.user_name,
        lastName : req.body.user_lastName,
        age : req.body.user_age,
        email : req.body.user_email
    },

     infoExtra : {

        homepage : req.body.user_homepage,
        birthday : req.body.user_birthday,
        realte : {
            sister : req.body.user_sister,
            mom : req.body.user_mom,
            dad : req.body.user_dad
        }
    },

     notes : {

        note_0: {

            date : date(),
            message : req.body.note

        }  
    }
    }

    contactFull.findOne({id : id}, (err,result) => {

        if(err) throw res.status(500).send({status: '500',success: false,message:'We can´t connect right now, try later', error:err});

        let isChange = false
        
        if(result.basicInfo !== editContact.basicInfo){
            result.basicInfo = editContact.basicInfo
            res_json.push({msn: 'Personal information update'})
            isChange = true
        }
        if(result.infoExtra !== editContact.infoExtra){
            result.infoExtra = editContact.infoExtra
            res_json.push({msn: 'Personal information update'})
            isChange = true
        }
        if(result.notes !== editContact.notes){
            result.notes = editContact.notes
            res_json.push({msn: 'Personal information update'})
            isChange = true

        }

        if(isChange === true) {

            res.status(200).send(res_json)
            
        }else{

            res.status(500).send({status: 200 ,success: true ,message:'Nothing change', editContact})
            r
        }

    })
    


})