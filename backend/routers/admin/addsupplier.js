const express = require('express')
const pool = require('../../database/db')

const addSupplier = express.Router()

addSupplier.get("/", async(req, res) =>{
    try {
        res.status(200).json({success : true})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

const addSupplierQuery = 'insert into supplier(supplier_name, email, phone_number, password, address) values ($1, $2, $3, $4, $5)'
const findSupplierName = 'select supplier_name from supplier where supplier_name = $1'
const findSupplierEmail = 'select email from supplier where email = $1'
const findSupplierPhone = 'select phone_number from supplier where phone_number = $1'

// addSupplier.post("/", async(req, res) => {
//     try {
//         const {suppliername, supplieremail, supplierphone, supplieraddress, password} = req.body;
//         const findName = await pool.query(findSupplierName, [ suppliername])
//         if(findName.rowCount > 0){
//             return res.status(200).json({success : 3, message : "Supplier with this name already exsits"})
//         }

//         const findEmail = await pool.query(findSupplierEmail, [ supplieremail])
//         if(findEmail.rowCount > 0){
//             return res.status(200).json({success : 4, message : "Supplier with this email already exsits"})
//         }

//         const findPhone = await pool.query(findSupplierPhone, [ supplierphone])
//         if(findPhone.rowCount > 0){
//             return res.status(200).json({success : 5, message : "Supplier with this mobile Number already exsits"})
//         }

//         const supplier = await pool.query(addSupplierQuery, [suppliername, supplieremail, supplierphone, password, supplieraddress]);
//         if (supplier.command = 'INSERT'){
//             return res.status(200).json({success : 1, message : `Succefully added the supplier ${suppliername}`})
//         }

//         return res.status(200).json({success : 2, message : "Some thing wentwrong", find : find})
//     } catch (error) {
//         res.status(404).json({success : false, message : error})
//     }
// })
addSupplier.post("/", async (req, res) => {
    try {
        const { suppliername, supplieremail, supplierphone, supplieraddress, password } = req.body;

        const supplier = await pool.query(addSupplierQuery, [
            suppliername, supplieremail, supplierphone, password, supplieraddress,
        ]);

        res.status(200).json({
            success: true,
            message: `Successfully added the supplier ${suppliername}`,
            data: supplier.rows[0],
        });
    } catch (error) {
        if (error.code === 'P0001') { // PostgreSQL exception for RAISE EXCEPTION
            res.status(409).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
});

module.exports = addSupplier;