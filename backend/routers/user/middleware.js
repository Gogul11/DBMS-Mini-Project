const jwt = require('jsonwebtoken')
require('dotenv').config()

const secrectKey = process.env.SECRECT_KEY


const auth = async(req, res, next) => {
    const token = await req.header('Authorization')?.split(' ')[1]
    if(!token){
        return res.status(200).json({success : 2, message : "Permission Denied"})
    }

    try {
        const decoded = jwt.verify(token, secrectKey);
        req.user_id = decoded;
        next()
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
}

module.exports = auth;