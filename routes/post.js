/* import db from './../db/db';
 */
const express = require('express');
const router = express.Router();
const idValidation = require('./../public/JS/idValidation');
const db = require('../db/db')


router.get('/', (req,res)=>{
    res.render('post')
})

/* router.post('/create', (req,res)=>{

    const user = {
        
        id: db.length + 1,
        name: req.body.user_name,
        lastName: req.body.user_lastName,
        age: req.body.user_age,
        email: req.body.user_email
    }

    if(idValidation.isValid(user.name,user.lastName,user.age,user.email)){
        db.push(user);
        res.status(200).send({success:true,message:'The contact it been create successfuly',user});
    }else{
          res.status(200).send({success: false, message: 'Not create - Verify personal information'});
          
    }

    
}); */

module.exports = router;