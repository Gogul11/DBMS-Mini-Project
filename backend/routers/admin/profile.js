const express = require('express')
const pool = require('../../database/db')
const auth = require('../user/middleware')

const profile = express.Router()

const findAdmin = 'select admin_id, admin_name , email, phone_number from admin where admin_id = $1'

profile.get("/", auth,async(req, res) => {
    try {
        const admins = await pool.query(findAdmin, [req.user_id]);
        res.status(200).json({success : true, profile : admins.rows[0]})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})


module.exports = profile;