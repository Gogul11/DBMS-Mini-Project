const express = require('express')

const auth = require("./middleware")

const profile = express.Router()

profile.get("/:userId",auth, (req, res) => {
    try {
        
        return res.status(200).json({success : true, id : req.user_id});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

module.exports = profile;