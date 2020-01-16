const express = require('express');
const router = express.Router();
const db = require('../db/db');
const idValidation = require('./../public/JS/idValidation');
const mongoose = require('mongoose')
const ContactDB = require('./../models/contact')
const ContactDBFull = require('./../models/contactFull')
const _ = require('lodash')
const util = require('util')

//------------------------GET------------------------------


router.get('/', (req, res) => {

    ContactDBFull.find((err,contact)=>{

        if(err)throw res.status(500).send({status: '500',success: false,message:'We can´t connect right now, try later', error:err});
        
        let contacts_json = [{status: '200',success: true ,message:'We are connect right now!'}]

        contact.forEach((contact)=>{
            
            let userFull = {
                id: contact.basicInfo.id,
                name: contact.basicInfo.name,
                lastName : contact.basicInfo.lastName,
                age : contact.basicInfo.age,
                email : contact.basicInfo.email
            }

          
            /* if(user.name) */
            contacts_json.push(userFull)
        })

        res.status(200).send(contacts_json)

        
    })

})

router.get('/details', (req,res) => {


    let contacts_json = [{status: '200',success: true ,message:'We are connect right now!'}]

    ContactDBFull.find({},(err,contact)=> {

        if(err)throw res.status(500).send({status: '500',success: false,message:'We can´t connect right now, try later', error:err})

        contact.forEach(user => {

            let userFull = [

                basicInfo = {
    
                    id : user.basicInfo.id,
                    name : user.basicInfo.name,
                    lastName : user.basicInfo.lastName,
                    age : user.basicInfo.age,
                    email : user.basicInfo.email
                },
    
                infoExtra = {
                    
                    company : user.infoExtra.company,
                    homepage : user.infoExtra.homepage,
    
                    /* birthday : req.body.user_birthday, */
                family : {
                        sister : user.infoExtra.family.sister,
                        mom : user.infoExtra.family.mom,
                        dad : user.infoExtra.family.dad
                    }
                },
    
                notes = {
    
                    note: user.notes.note
                    
                }
            ]  

            contacts_json.push(userFull)
        })

        if(contacts_json.length > 1){ res.status(200).send(contacts_json)} else {res.status(200).send({status:200 ,success: true ,message:'Your collection is empty'})}
    })
        

})


router.get('/searchById/:id', (req, res) => {

    let id = parseInt(req.params.id, 10)
    ContactDBFull.find({'basicInfo.id': id}, async (err,contact)=>{
    
        if(err) throw res.status(500).send({status: 500,success: false,message:'We can´t connect right now, try later',error:err})
        let contacts_json = [{status: '200',success: true ,message:'We connect perfectly'}]
    
        contact.forEach(contact => {

            let userBasic = {

                id: contact.basicInfo.id,
                name: contact.basicInfo.name,
                lastName : contact.basicInfo.lastName,
                age : contact.basicInfo.age,
                email : contact.basicInfo.email

            }

            contacts_json.push(userBasic)
        })

        if(contacts_json.length !== 1){


            res.status(200).send(contacts_json)

        }else{

            contacts_json.push( {result: 'Not found any contact whit that id'})

            res.status(200).send(contacts_json)
        }
        
    })   
});


//------------------------POST------------------------------

router.post('/create', (req,res)=>{
  
    let len = () => {return ContactDBFull.countDocuments({}).then(result => {return result}).catch(err=>err)}

    len().then((result)=>{

        let user = new ContactDBFull({

                basicInfo : {
    
                    id : result + 1 ,
                    name : req.body.user_name,
                    lastName : req.body.user_lastName,
                    age : req.body.user_age,
                    email : req.body.user_email
                }
            
        })
        console.log(user.name)

        if(idValidation.isValid(user.basicInfo.name,user.basicInfo.lastName,user.basicInfo.age,user.basicInfo.email)){
        
            user.save((err)=>{
                if(err) throw err  
            })
            ContactDBFull.find(async (err,contact)=>{
    
                if(err) throw res.status(500).send({status: 500,success: false,message:'We can´t connect right now, try later',error:err})
                let contacts_json = [{status: '200',success: true ,message:'We create a new contact successfuly'}]
    
               contact.forEach(contact => {
                    let userFull = {
                        id: contact.basicInfo.id,
                        name: contact.basicInfo.name,
                        lastName: contact.basicInfo.lastName,
                        age: contact.basicInfo.age,
                        email: contact.basicInfo.email
                    };
                    contacts_json.push(userFull);
                })
                //console.log(util.inspect(contacts_json[2], false, null));
                if(contacts_json.length !== 1){

                    res.status(200).send(contacts_json)
            
                }else{

                    contacts_json.push( {result: 'Not found any contact whit that id'})

                    res.status(200).send(contacts_json)
                }
            }) 
        }
        else{
              res.status(200).send({success: false, message: 'Not create - Verify personal information'});  
        }
    })
});


router.post('/createFullContact', (req,res)=>{
  
    let len = () => {return ContactDB.countDocuments({}).then(result => {return result}).catch(err=>err)}

    len().then((result)=>{

        let user = new ContactDBFull({

            basicInfo : {

                id : result + 1 ,
                name : req.body.user_name,
                lastName : req.body.user_lastName,
                age : req.body.user_age,
                email : req.body.user_email
            },
        
             infoExtra : {
                
                company : req.body.user_company,
                homepage : req.body.user_homepage,

                /* birthday : req.body.user_birthday, */
                family : {
                    sister : req.body.user_sister ,
                    mom : req.body.user_mom,
                    dad : req.body.user_dad
                }
            },
        
             notes : {

                note: req.body.user_note
                
            }
        })

        if(idValidation.isValid(user.basicInfo.name,user.basicInfo.lastName,user.basicInfo.age,user.basicInfo.email)){
        
            user.save((err,userx)=>{
                if(err) throw err
            })
            
            let contacts_json = [{status: '200',success: true ,message:'We create a new contact successfuly'}]
            let userObject = _.toPlainObject(user)

            let newUser = {

                basic_Information :{
                    
                    id : userObject.basicInfo.id,
                    name : userObject.basicInfo.name,
                    lastName : userObject.basicInfo.lastName,
                    age : userObject.basicInfo.age,
                    email : userObject.basicInfo.email
                },
                extra_Information : {

                    company : userObject.infoExtra.company,
                    homepage : userObject.infoExtra.homepage,
                    family : {
                        sister : userObject.infoExtra.family.sister,
                        brother : userObject.infoExtra.family.brother,
                        mom : userObject.infoExtra.family.mom,
                        dad : userObject.infoExtra.family.dad
                    }

                },
                notes : {

                        note :userObject.notes.note 
                }

            }

            contacts_json.push(newUser)
            res.send(contacts_json)

            }
        else{
              res.status(200).send({success: false, message: 'Not create - Verify personal information'});  
        }
    })
});


//------------------------DELETE------------------------------

router.delete('/deleteById/:id', (req,res)=>{

    let id = parseInt(req.params.id, 10);

    ContactDB.findOneAndDelete({id:id},(err,result)=>{

        if(err) throw res.status(500).send({status: '500',success: false ,message:'We can´t connect right now, try later',error:err})

        let response_json = [{status: '200',success: true ,message:'We delete the choose contact successfuly'}]

        let deleteContact = {

            id: result.basicInfo.id,
            name: result.basicInfo.name,
            lastName: result.basicInfo.lastName,
            age: result.basicInfo.age,
            email: result.basicInfo.email
        }

        response_json.push(deleteContact)

        if(response_json.length !== 1){

            res.status(200).send(response_json)

        }else{

            response_json.push( {result: 'Not found any contact whit that id'})

            res.status(200).send(response_json)
        }

    })
    
})

router.delete('/deleteAll',(req,res)=>{
    ContactDB.deleteMany({},(err,result)=>{
        res.status(200).send({message : 'jaujauajaua i delete all motherfuckers!'})
    })
})

//------------------------PUT------------------------------

router.put('/modifyById/:id/email/:email', (req,res) => {//Probar con siguiente logica: Si se envia un -1 en cualquier parametro (no id) no se modifica.
    
    let id_param = parseInt(req.params.id, 10)

    let email = req.params.email

    ContactDB.findOneAndUpdate({id: id_param},{email: email},(err,result)=>{

        if(err) throw res.status(500).send({status: 500 ,success: false ,message:'We can´t connect right now, try later', error:err})
        let result_json = [{status: 200 ,success: true ,message:'Your updates were successful'}]

        let updateContact = {

        id: result.id,
        name: result.name,
        lastName: result.lastName,
        age: result.age,
        email: result.email

        }

         result_json.push(updateContact)
        
        if(result_json.length !== 1){

            res.status(200).send(result_json)
    
        }else{

            result_json.push( {result: 'Not found any contact whit that id'})

            res.status(200).send(result_json)
        }

    })
})

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
        company : req.body.user_company,
        homepage : req.body.user_homepage,
        /* birthday : req.body.user_birthday, */
        relative : {
            sister : req.body.user_sister,
            mom : req.body.user_mom,
            dad : req.body.user_dad
        }
    },

     notes : {

        note_0: {

            /* date : date(), */
            message : req.body.note

        }  
    }
    }

    console.log(editContact)

    ContactDBFull.findOneAndUpdate({'basicInfo.id': id},editContact,(err,result) => {

        if(err) throw res.status(500).send({status: 500 ,success: false,message:'We can´t connect right now, try later', error:err});

    

        console.log(result)
      







           /* res_json.push({msn: 'Personal information update',editContact}) */
            
           /*  res.status(200).send(res_json)
            
       

            res.status(500).send({status: 200 ,success: true ,message:'Nothing change', editContact}) */
            
        

    })
    


})



    


module.exports = router;