const jwt = require('jsonwebtoken')

const secrectKey = 'fe33d40866aae9c42f0a2c9377988463dbd23b7a7784a592473e54207687670c8c01f9e725faf33e6da0c5f38fe35dbf8ad89f58bf62fbb3209900a648cc8e96'


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