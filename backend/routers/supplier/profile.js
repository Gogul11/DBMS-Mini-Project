const express = require('express')
const pool = require('../../database/db')

const profile = express.Router()

const profileQuery = 'select supplier_name, email, phone_number, address from supplier where supplier_id = $1'

profile.get("/", async(req, res) => {
    try {
        const findMyProfile = await pool.query(profileQuery, [1])
        if(findMyProfile.rowCount >= 1){
            return res.status(200).json({success : true, profile : findMyProfile.rows[0]})
        }
        return res.status(404).json({success : false})
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

module.exports = profile;