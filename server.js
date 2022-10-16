require('dotenv').config()
const express = require('express') // to pull out the express library.
const app = express() // we can configure our server using app variable.
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology:true,
    useNewUrlParser: true})
const db = mongoose.connection
db.on('error',(error)=> console.error(error))
db.once('open',()=>console.log("connected to db"))

app.use(express.json()) //middleware to used to accept json as a body in requests

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000,()=>
    console.log('Server Started')
)