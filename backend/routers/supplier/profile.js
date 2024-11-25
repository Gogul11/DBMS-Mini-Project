const express = require('express')
const pool = require('../../database/db')
const auth = require('../user/middleware')

const profile = express.Router()

const profileQuery = 'select supplier_name, email, phone_number, address from supplier where supplier_id = $1'
const noOfOrderQuery = 'select count(o.order_id) from orders o inner join supplied s on s.part_id = o.part_id where s.supplier_id = $1;'

profile.get("/", auth,async(req, res) => {
    try {
        const findMyProfile = await pool.query(profileQuery, [req.user_id])
        const ordersTaken = await pool.query(noOfOrderQuery, [req.user_id])
        if(findMyProfile.rowCount >= 1){
            const profile = {
                ...findMyProfile.rows[0],
                tot : ordersTaken.rows[0].count
            }
            return res.status(200).json({success : true, profile : profile})
        }
        return res.status(404).json({success : false})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

module.exports = profile;