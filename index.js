
require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const fs = require('fs')
const multer = require("multer")

const farijaRoutes = require("./routes/farijaRoutes")

const app = express()
//const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Mongoose Connected")
},
    e => console.error(e)
)

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


app.use('/user', farijaRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})