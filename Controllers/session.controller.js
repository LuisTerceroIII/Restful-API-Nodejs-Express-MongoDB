const express = require("express");
const UserDB = require("../Models/user");
const jwt = require('jsonwebtoken')
const {hashUserPass, verifyUserPass} = require("../Services/cryptoUserPass")

const createUser = (user,res) => {
    const newUser = new UserDB(user);
    newUser.save((err,createdUser)=>{
        if(err) {
            res.status(500).json({message: "Error in User creation",})
        } else {
            res.status(200).json({status: 200, message: "User created", createdUser})
        }
    })
}

const register = async (req,res,next) => {
    try {
        const reqUser = req.body;
        const users = await UserDB.find({email: reqUser?.email}).exec();
        const userNoExist = users[0] === undefined
        if (userNoExist) {
            const hashPass = await hashUserPass(reqUser?.password)
            const userWithHashPass = {
                name : reqUser.name,
                lastName : reqUser.lastName,
                email : reqUser.email,
                username : reqUser.username,
                password : hashPass
            }
            createUser(userWithHashPass,res)
        } else {
            res.status(200).json({message: "User exists"})
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const login = async (req,res,next) => {
    try {
        const {password, email,username} = req.body;
        const users = await UserDB.find({email: email}).exec();
        const userNoExist = users[0] === undefined

        if (userNoExist) {
            res.status(404).json('User not found');
        } else {
            const hashPass = users[0].password
            const correctPass = verifyUserPass(password,hashPass);
            if(correctPass) {
                const token =  await jwt.sign({username},process.env.SECRET_TOKEN_KEY,{expiresIn: "2 days"});
                res.status(200).json({login : true,token})
            } else {
                res.status(401).json({login : false,token : ''})
            }
        }
    } catch (e) {
        console.table(e)
        res.status(500).json(e);
    }
}

const getAllUsers = async (req,res,next) => {
    try {
        const users = await UserDB.find().exec();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    register,
    login,
    getAllUsers
};