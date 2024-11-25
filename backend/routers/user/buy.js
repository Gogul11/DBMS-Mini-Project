const express = require('express');
const pool = require('../../database/db');
const auth = require('./middleware');

const buy = express.Router()


const findPartById = 'select s.part_id, s.name as part_name, s.price,s.description, c.name as category_name from parts s, category c where s.category_id = c.category_id and part_id = $1'
const findSupplierName = 'select s.supplier_name from supplier s, supplied s2 where s.supplier_id = s2.supplier_id and s2.part_id = $1'

buy.get("/:partId", async(req, res) => {
    try {
        console.log(req.params.partId)
        const part = (await pool.query(findPartById, [req.params.partId]))
        const supp = (await pool.query(findSupplierName, [req.params.partId])).rows[0].supplier_name
        return res.status(200).json({success : true, part : part.rows, supp : supp});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

const orderPart = 'insert into orders(user_id, part_id, amount, status) values ($1, $2, $3, $4)'

buy.post("/", auth,async(req, res) => {
    try {
        const user_id = req.user_id;
        const {part_id, price, status} = req.body;
        const order = await pool.query(orderPart, [user_id, part_id ,price ,status])
        if(order.command === 'INSERT'){
            return res.status(200).json({success : 1, message : "Succesfully Ordered the part"});
        }
        return res.status(200).json({success : 2, message : "something went wrong during ordering"});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

module.exports = buy;