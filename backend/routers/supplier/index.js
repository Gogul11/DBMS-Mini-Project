const express = require("express")
const pool = require("../../database/db")
const supplier = express.Router()

const profile = require('./profile')
const addpart = require('./addpart')
const product = require('./products')

supplier.use("/profile", profile)
supplier.use("/add-product", addpart)
supplier.use("/products", product)


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
        return res.status(200).json({success : 1});
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

module.exports = supplier;