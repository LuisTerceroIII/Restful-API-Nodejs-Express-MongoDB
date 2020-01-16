const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', (req,res) => { 
    
    let user = req.body.name


    res.render('delete')

})


module.exports = router;