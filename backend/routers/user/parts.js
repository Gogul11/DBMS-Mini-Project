const express = require('express')

const parts = express.Router()
const pool = require('../../database/db.js')

const findParts = 'select s.part_id, s.name as part_name, s.price, c.name as category_name from parts s, category c where s.category_id = c.category_id'
const findPartById = 'select s.part_id, s.name as part_name, s.price,s.description, c.name as category_name from parts s, category c where s.category_id = c.category_id and part_id = $1'
const findSupplierName = 'select s.supplier_name from supplier s, supplied s2 where s.supplier_id = s2.supplier_id and s2.part_id = $1'
const findPartByName = 'select s.part_id, s.name as part_name, s.price, c.name as category_name from parts s, category c where s.category_id = c.category_id and s.name ilike $1'

const findReviewQuery = 'select u.username, r.rating, r.created_at, r.comment from review r inner join users u on u.user_id = r.user_id where part_id = $1;'

parts.get("/", async(req, res) => {
    try {
        const parts = await pool.query(findParts)        
        return res.status(200).json({success : true, parts : parts.rows});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

parts.get("/info/:partId", async(req, res) => {
    try {
        const part = (await pool.query(findPartById, [req.params.partId]))
        const supp = (await pool.query(findSupplierName, [req.params.partId])).rows[0].supplier_name
        const review = await pool.query(findReviewQuery, [req.params.partId])
        return res.status(200).json({success : true, part : part.rows, supp : supp, review : review.rows});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

// parts.get("/", async(req, res) => {
//     try {
//         const part = await pool.query(findPartByName, [`%${req.query.name}%`])
//         return res.status(200).json({success : true, part : part.rows});
//     } catch (error) {
//         return res.status(404).json({success : false , message : error.message})
//     }
// })


module.exports = parts;