const express = require('express')

const category = express.Router()

category.get("/", (req, res) => {
    try {
        
        return res.status(200).json({success : true});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

module.exports = category;