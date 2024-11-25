const express = require('express')
const pool = require('../../database/db')
const addSupplier = require('./addsupplier')
const supplier = require('./supplier')
const user = require('./user')
const profile = require('./profile')
const jwt  = require("jsonwebtoken")
const order = require('./order')
const part = require('./part')


const admin = express.Router()

const secrectKey = 'fe33d40866aae9c42f0a2c9377988463dbd23b7a7784a592473e54207687670c8c01f9e725faf33e6da0c5f38fe35dbf8ad89f58bf62fbb3209900a648cc8e96'


admin.use('/add-supplier',addSupplier)
admin.use('/supplier', supplier)
admin.use('/user', user)
admin.use('/profile', profile)
admin.use('/orders', order)
admin.use('/parts', part)


admin.get("/", (req, res) => {
    try {
        res.status(200).json({success : true})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

const findQuery = 'select admin_name,admin_id, password from admin where admin_name = $1'

admin.post("/", async(req, res) => {
    try {
        const {adminname, password} = req.body;
        console.log(adminname, password)
        const find = await pool.query(findQuery, [adminname])
        if(find.rowCount === 0){
            return res.status(200).json({success : 3, message : "Coundn't find the admin name"})
        }
        if(!(password === find.rows[0].password)){
            return res.status(200).json({success : 2, message : "Password doesn't match"})
        }
        const adminId = find.rows[0].admin_id;
        const token = jwt.sign(adminId, secrectKey)
        return res.status(200).json({success : 1, token : token});
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})
module.exports = admin;