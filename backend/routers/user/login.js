const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../../database/db')

const secrectKey = 'fe33d40866aae9c42f0a2c9377988463dbd23b7a7784a592473e54207687670c8c01f9e725faf33e6da0c5f38fe35dbf8ad89f58bf62fbb3209900a648cc8e96'


const login = express.Router()

login.get("/", (req, res) => {
    try {
        
        return res.status(200).json({success : true});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

const findQuery = 'select username,user_id, password from users where username = $1'

login.post("/", async(req, res) => {
    try {
        const {username, password} = req.body;
        const findUser =await pool.query(findQuery, [username])

        if(findUser.rowCount === 0){
            return res.status(200).json({success : 3, message : "coudn't find User"})
        }

        const pass = findUser.rows[0].password
        const user = await bcrypt.compare(password, pass)

        if(user){
            const userId = findUser.rows[0].user_id;
            const token = jwt.sign(userId, secrectKey);
            return res.status(200).json({success : 1, token : token});
        }

        return res.status(200).json({success : 2, message : "Password is wrong"})

    }
    catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

module.exports = login;

//fe33d40866aae9c42f0a2c9377988463dbd23b7a7784a592473e54207687670c8c01f9e725faf33e6da0c5f38fe35dbf8ad89f58bf62fbb3209900a648cc8e96