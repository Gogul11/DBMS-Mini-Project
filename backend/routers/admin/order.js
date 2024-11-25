const express = require('express')
const pool = require('../../database/db')

const order = express.Router()

const findOrder = 'select user_id, part_id, order_id, amount from orders'

order.get("/", async(req, res) => {
    try {
        const orders = await pool.query(findOrder);
        res.status(200).json({success : true, order : orders.rows})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})


module.exports = order;