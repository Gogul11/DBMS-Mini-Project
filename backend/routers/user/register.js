const express = require('express')
const bcrypt = require('bcrypt')
const pool = require('../../database/db')
const register = express.Router()

register.get("/", (req, res) => {
    try {
        
        return res.status(200).json({success : true});
    } catch (error) {
        return res.status(404).json({success : false , message : error.message})
    }
})

const insertQuery = 'insert into users (username, email, password, phone_number) values ($1, $2, $3, $4)'
const exsitingUser = 'select username from users where username = $1'
const exsitingMail = 'select email from users where email = $1'
const exsitingPhone = 'select phone_number from users where phone_number = $1'

// register.post("/", async(req, res) => {
//     try {
//         const {username, email, password, phone_number} = req.body;

//         const exsitingUsername = await pool.query(exsitingUser, [username])
//         if(exsitingUsername.rowCount >= 1){
//             return res.status(200).json({success : 2, message : "User already exsits with this username"})
//         }
//         const exsitingUserMail = await pool.query(exsitingMail, [email])
//         if(exsitingUserMail.rowCount >= 1){
//             return res.status(200).json({success : 3, message : "User already exsits with this email"})
//         }

//         const exsitingUsernumber = await pool.query(exsitingPhone, [phone_number])
//         if(exsitingUsernumber.rowCount >= 1){
//             return res.status(200).json({success : 4, message : "User already exsits with this mobile number"})
//         }
        


//         const salt = await bcrpypt.genSalt(10);
//         const hashedPassword = await bcrpypt.hash(password, salt)
//         await pool.query(insertQuery, [username, email, hashedPassword, phone_number]);
//         return res.status(201).json({success : 1 , message : "User Registered Successfully"});
//     } catch (error) {
//         return res.status(404).json({success : false , message : error.message})
//     }
// })

register.post("/", async (req, res) => {
    try {
        const { username, email, password, phone_number } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            'INSERT INTO users (username, email, password, phone_number) VALUES ($1, $2, $3, $4)',
            [username, email, hashedPassword, phone_number]
        );

        return res.status(201).json({ success: true, message: "User Registered Successfully" });
    } catch (error) {
        if (error.code === 'P0001') {       // Error code for PostgreSQL user-defined exception
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});


module.exports = register;