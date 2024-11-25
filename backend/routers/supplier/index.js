const express = require("express")
const pool = require("../../database/db")
const supplier = express.Router()
const jwt  = require("jsonwebtoken")

const profile = require('./profile')
const addpart = require('./addpart')
const product = require('./products')
const orders = require("./orders")

const secrectKey = 'fe33d40866aae9c42f0a2c9377988463dbd23b7a7784a592473e54207687670c8c01f9e725faf33e6da0c5f38fe35dbf8ad89f58bf62fbb3209900a648cc8e96'


supplier.use("/profile", profile)
supplier.use("/add-product", addpart)
supplier.use("/products", product)
supplier.use("/orders", orders)

supplier.get("/", (req, res) => {
    try {
        res.status(200).json({success : true})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

const findQuery = 'select supplier_name,supplier_id, password from supplier where supplier_name = $1'

supplier.post("/", async(req, res) => {
    try {
        const {username, password} = req.body;
        const find = await pool.query(findQuery, [username])
        if(find.rowCount === 0){
            return res.status(200).json({success : 3, message : "Coundn't find the supplier name"})
        }
        if(!(password === find.rows[0].password)){
            return res.status(200).json({success : 2, message : "Password doesn't match"})
        }
        const supId = find.rows[0].supplier_id
        const token =  jwt.sign(supId, secrectKey)
        return res.status(200).json({success : 1, token : token});
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

module.exports = supplier;