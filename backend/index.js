const express = require('express')
const cors = require('cors')
const app = express()

const pool = require("./database/db.js")
const user = require('./routers/user/index.js')
const supplier = require("./routers/supplier/index.js")

app.use(express.json())
app.use(cors())


app.use("/user",user);
app.use("/supplier", supplier)

app.listen(2000, () => {
    console.log("success");
})