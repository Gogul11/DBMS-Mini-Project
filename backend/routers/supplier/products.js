const express = require('express')
const pool = require('../../database/db')
const auth = require('../user/middleware')

const product = express.Router()

const findSuppliedProductByCategory = 'select p.part_id, p.name, p.category_id, c.name as category_name, p.price, p.description from parts p inner join category c on p.category_id = c.category_id where p.part_id in (select s.part_id from supplied s where s.supplier_id = $1);'

product.get("/", auth,async(req, res) => {
    try {
        const partsSupplied = await pool.query(findSuppliedProductByCategory, [req.user_id]);
        if(partsSupplied.rowCount >= 1){
            return res.status(200).json({success : 1, suppliedParts : partsSupplied.rows})
        }
        return res.status(200).json({success : 2, message : "You didn't supply any parts"})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

module.exports = product;