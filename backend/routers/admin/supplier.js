const express = require('express')
const pool = require('../../database/db')

const supplier = express.Router()

const findSupplier = 'select supplier_id, supplier_name , email from supplier'

supplier.get("/", async(req, res) => {
    try {
        const suppliers = await pool.query(findSupplier);
        res.status(200).json({success : true, supplier : suppliers.rows})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})


module.exports = supplier;