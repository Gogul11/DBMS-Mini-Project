const pg = require("pg")

const Pool = pg.Pool;

const pool = new Pool({
    user : "postgres",
    password : "daredevil",
    host : "localhost",
    port : 5432,
    database : "sparehub"
})

module.exports = pool;