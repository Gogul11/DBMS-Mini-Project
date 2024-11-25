const express = require('express')
const pool = require('../../database/db')

const user = express.Router()

const findUser = 'select user_id, username , email from users'

user.get("", async(req, res) => {
    try {
        const users = await pool.query(findUser);
        res.status(200).json({success : true, user : users.rows})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})


module.exports = user;