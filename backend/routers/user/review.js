const express = require('express')
const pool = require('../../database/db')
const auth = require('./middleware')

const review = express.Router()

const reivewQuery = 'insert into review (user_id, part_id, rating, comment) values ($1, $2, $3, $4)'


review.post("/", auth,async (req, res) => {
    try {
        const {part_id, rating, review} = req.body;
        const reviews = await pool.query(reivewQuery, [req.user_id, part_id, rating, review])
        if(reviews.command === 'INSERT'){
            return res.status(200).json({success : 1, message : "Successfully posted review"})
        }
        return res.status(200).json({success : 2, message : "Something went wrong"})
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

module.exports = review;