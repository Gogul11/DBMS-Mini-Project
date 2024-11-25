const express = require('express')
const pool = require('../../database/db')
const auth = require('../user/middleware')

const orders = express.Router()

const findOrderQuery = 'select o.order_id, o.status, o.amount,o.created_at, p.name, u.username, u.phone_number from orders o inner join supplied s on s.part_id = o.part_id inner join parts p on p.part_id = o.part_id inner join users u on u.user_id = o.user_id where s.supplier_id = $1;'

orders.get("/", auth,async(req, res) => {
    try {
        const ordersTaken = await pool.query(findOrderQuery, [req.user_id]);
        if(ordersTaken.rowCount >= 1){
            return res.status(200).json({success : 1, ordersTaken : ordersTaken.rows})
        }
        return res.status(200).json({success : 2, message : "You didn't supply any parts"})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

module.exports = orders;