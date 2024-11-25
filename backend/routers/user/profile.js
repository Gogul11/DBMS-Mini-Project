const express = require('express')

const auth = require("./middleware")
const pool = require('../../database/db')

const profile = express.Router()

const findInfo = 'select username, email, phone_number from users where user_id = $1'
const noOfOrders = 'select count(o.order_id) from orders o inner join users u on u.user_id = o.user_id where u.user_id = $1'
const ordersQuery = 'SELECT p.part_id,p.name,o.order_id, o.amount, o.status, o.created_at FROM orders o INNER JOIN users u ON u.user_id = o.user_id INNER JOIN parts p ON o.part_id = p.part_id WHERE u.user_id = $1;'

profile.get("/",auth, async(req, res) => {
    try {
        const profInfo = await pool.query(findInfo, [req.user_id])
        const orders = await pool.query(noOfOrders, [req.user_id])
        const orderDetails = await pool.query(ordersQuery, [req.user_id])
        return res.status(200).json({success : true, user : profInfo.rows[0], orders : orders.rows[0].count, orderDetails : orderDetails.rows});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

module.exports = profile;