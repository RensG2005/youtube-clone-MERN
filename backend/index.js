const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
const port = 5402

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {useFindAndModify: false,useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
    console.log("connected to db")
})

app.use(express.json())
app.use(cors())
app.use("/videos", require("./routes/videosRoute"))


app.listen(port, () => {
    console.log(`app listening at ${port}`)
})