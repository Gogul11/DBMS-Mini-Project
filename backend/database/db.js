const pg = require("pg")
require('dotenv').config()

const Pool = pg.Pool;

const pool = new Pool({
    user : process.env.USER,
    password : process.env.PASSWORD,
    host : process.env.HOST,
    port : process.env.PORT,
    database : process.env.DB
})

module.exports = pool;