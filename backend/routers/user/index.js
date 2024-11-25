const express = require("express")
const cors = require("cors")



const login = require("./login")
const register = require("./register")
const parts = require("./parts")
const profile = require("./profile")
const buy = require("./buy")
const review = require('./review')

const user = express.Router()

user.use(cors())
user.use("/login", login)
user.use("/register", register)
user.use("/parts", parts)
user.use("/profile", profile)
user.use("/buy", buy)
user.use('/review', review)

user.get("/", (req, res) => {
    res.status(200).json({success : true});
})

module.exports = user;