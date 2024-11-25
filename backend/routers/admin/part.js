const express = require('express')
const pool = require('../../database/db')

const part = express.Router()

const findPart = 'select p.part_id, p.name as partname, p.price, c.name from parts p inner join category c on c.category_id = p.category_id'

part.get("/", async(req, res) => {
    try {
        const part = await pool.query(findPart);
        res.status(200).json({success : true, parts : part.rows})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})


module.exports = part;