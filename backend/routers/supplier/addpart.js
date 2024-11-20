const express = require('express')
const pool = require('../../database/db')

const addpart = express.Router()

addpart.get("/", async(req, res) =>{
    try {
        res.status(200).json({success : true})
    } catch (error) {
        res.status(404).json({success : false, message : error.message})
    }
})

const addPartQuery = 'insert into parts (name, description, price, category_id ) values ($1, $2, $3, $4)'
const insertIntoSupplied = 'insert into supplied (part_id, supplier_id) values ($1, $2)'
const findRecentlyAdded = 'select part_id from parts where name ilike $1'
const findCategoryId = 'select category_id from category where name ilike $1 '


addpart.post("/", async(req, res) => {
    try {
        const {category, partname, desc, price} = req.body;
        const id = await (await pool.query(findCategoryId, [category])).rows[0].category_id;
        const add = await pool.query(addPartQuery, [partname, desc, price, id])
        if(add.command === 'INSERT'){
            const partid = (await pool.query(findRecentlyAdded, [partname])).rows[0].part_id;
            await pool.query(insertIntoSupplied, [partid, 1])
            return res.status(200).json({success : 1,message : `Succesfully added the part ${partname}`})
        }
        return res.status(200).json({success : 2, message : "Some thing wentwrong"})
    } catch (error) {
        res.status(404).json({success : false, message : error})
    }
})

module.exports = addpart;