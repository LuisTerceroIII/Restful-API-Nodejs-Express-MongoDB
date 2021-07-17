const UserDB = require("../Models/user");
const jwt = require('jsonwebtoken')
const normalizeUser = require('../Services/nomalizeUser')
const {hashUserPass, verifyUserPass} = require("../Services/cryptoUserPass")

const createUser = (user, res) => {
    const newUser = new UserDB(user);
    newUser.save((err, createdUser) => {
        if (err)
            res.status(500).json({message: "Error in User creation",})
         else
            res.status(200).json({status: 200, message: "User created", createdUser})
    })
}

const register = async (req, res, next) => {
    try {
        const newUser = await normalizeUser(req.body)
        const hashPass = await hashUserPass(newUser?.password)
        const userWithHashPass = {
            name: newUser.name,
            lastName: newUser.lastname,
            email: newUser.email,
            username: newUser.username,
            password: hashPass
        }
        createUser(userWithHashPass, res)
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const login = async (req, res, next) => {
    try {
        const {password, email, username} = req.body;
        const users = await UserDB.find({email: email}).exec();
        const userNoExist = users[0] === undefined
        if (userNoExist) {
            res.status(404).json('User not found');
        } else {
            const hashPass = users[0].password
            const correctPass = verifyUserPass(password, hashPass);
            if (correctPass) {
                const token = await jwt.sign({username}, process.env.SECRET_TOKEN_KEY, {expiresIn: "2 days"});
                res.status(200).json({login: true, token,user: users[0]})
            } else {
                res.status(401).json({login: false, token: ''})
            }
        }
    } catch (e) {
        res.status(500).json(e);
    }
}

const getAllUsers = async (req, res, next) => {
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