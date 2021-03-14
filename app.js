const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const bodyParser=require('body-parser')
const db=require('./db/database')
const categoryRoute = require('./routes/categoryRoute')

const app = express()

// app.get('/', (req,res)=>{
//     res.send('')
// })

//Middleware
app.use(bodyParser.json())
app.use(morgan('dev'))

//routes 
app.use('/api',categoryRoute);


const port = process.env.PORT || 5000

//Server

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})