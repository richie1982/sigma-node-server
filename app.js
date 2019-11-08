const express = require("express")
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')


//Middleware
dotenv.config()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3030

mongoose.connect(process.env.DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
    console.log("DB Connected...")
})

app.use('/', authRoute)
app.use('/', dataRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
