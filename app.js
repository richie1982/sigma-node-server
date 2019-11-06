const express = require("express")
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const port = 3001
const api = require('./services/api')
const authRoute = require('./routes/auth')

dotenv.config()

app.use(express.json())

mongoose.connect(process.env.DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
    console.log("DB Connected...")
})

// app.get('/', (req, res) => {
//     res.send("Sigma Client")
// })

app.use('/', authRoute)

// api.getData()

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
